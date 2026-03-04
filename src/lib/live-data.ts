/**
 * Live data layer — merges agent-registry, agent-levels, task-tracker, and ideas-inbox
 * into a single typed data model for the dashboard.
 *
 * Data files are copied from shared/ at build time (or via sync script).
 */

import registryRaw from "@/data/agent-registry.json"
import levelsRaw from "@/data/agent-levels.json"
import tasksRaw from "@/data/task-tracker.json"
import ideasRaw from "@/data/ideas-inbox.json"
import { agentMeta } from "./agent-meta"

/* ─── Types ─── */

export type BotStatus = "active" | "needs-bot"
export type TaskStatus = "completed" | "in-progress" | "blocked" | "queued"
export type IdeaStatus = "approved" | "unreviewed" | "hold" | "killed"
export type GradeTrend = "new" | "up" | "down" | "stable"

export interface LiveAgent {
  id: string
  name: string
  role: string
  emoji: string
  botStatus: BotStatus
  grade: string | null
  reps: number
  lastTask: string | null
  trend: GradeTrend | null
  gradeHistory: string[]
  team: string
  photo: string
  bio: string
  title: string
  realName: string
  smallCouncil: boolean
  activeTasks: LiveTask[]
  completedTasks: LiveTask[]
}

export interface LiveTask {
  id: string
  title: string
  owner: string
  assignedBy: string
  status: TaskStatus
  grade: string | null
  assignedAt: string
  completedAt: string | null
  deliverable: string | null
  notes: string | null
}

export interface LiveIdea {
  id: string
  title: string
  submittedBy: string
  date: string
  status: IdeaStatus
  summary: string
  tags: string[]
}

export interface DashboardData {
  agents: LiveAgent[]
  tasks: LiveTask[]
  ideas: LiveIdea[]
  stats: {
    totalAgents: number
    activeAgents: number
    needsBot: number
    totalTasks: number
    completedTasks: number
    activeTasks: number
    gradedAgents: number
    avgGradePoints: number
    totalIdeas: number
    approvedIdeas: number
  }
  lastUpdated: string
}

/* ─── Grade helpers ─── */

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.3, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D": 1.0, "F": 0,
}

function gradeToPoints(g: string): number {
  return GRADE_POINTS[g] ?? 0
}

/* ─── Team mapping ─── */

const TEAM_MAP: Record<string, string> = {
  main: "executive",
  wade: "executive",
  elon: "executive",
  cio: "executive",
  jarvis: "executive",
  saban: "executive",
  steward: "executive",
  steph: "product",
  cp3: "product",
  marino: "product",
  jokic: "product",
  jjettas: "product",
  mahomes: "creative",
  ai: "creative",
  ohtani: "engineering",
  giannis: "engineering",
  achane: "special-ops",
  tyreek: "special-ops",
  brady: "special-ops",
  magic: "special-ops",
  jimmy: "special-ops",
}

/* ─── Build merged data ─── */

export function buildDashboardData(): DashboardData {
  const registry = registryRaw as { agents: Array<{ id: string; name: string; role: string; botStatus: string; grade: string | null; emoji: string }> }
  const levels = (levelsRaw as { agents: Record<string, { grade: string; reps: number; lastTask: string; trend: string; history?: string[] }> }).agents
  const tasks = (tasksRaw as { tasks: LiveTask[] }).tasks
  const ideas = (ideasRaw as { ideas: LiveIdea[] }).ideas

  const agents: LiveAgent[] = registry.agents.map((reg) => {
    const level = levels[reg.id]
    const meta = agentMeta[reg.id] || {}
    const agentTasks = tasks.filter((t) => t.owner === reg.id)

    // Grade priority: levels file > registry file
    const grade = level?.grade ?? (reg.grade && reg.grade !== "pending" ? reg.grade : null)

    return {
      id: reg.id,
      name: reg.name,
      role: reg.role,
      emoji: reg.emoji,
      botStatus: reg.botStatus as BotStatus,
      grade,
      reps: level?.reps ?? 0,
      lastTask: level?.lastTask ?? null,
      trend: (level?.trend as GradeTrend) ?? null,
      gradeHistory: level?.history ?? [],
      team: TEAM_MAP[reg.id] || "special-ops",
      photo: meta.photo || "",
      bio: meta.bio || "",
      title: meta.title || reg.role,
      realName: meta.realName || reg.name,
      smallCouncil: meta.smallCouncil || false,
      activeTasks: agentTasks.filter((t) => t.status === "in-progress" || t.status === "queued"),
      completedTasks: agentTasks.filter((t) => t.status === "completed"),
    }
  })

  const gradedAgents = agents.filter((a) => a.grade)
  const avgGradePoints = gradedAgents.length > 0
    ? gradedAgents.reduce((sum, a) => sum + gradeToPoints(a.grade!), 0) / gradedAgents.length
    : 0

  return {
    agents,
    tasks,
    ideas,
    stats: {
      totalAgents: agents.length,
      activeAgents: agents.filter((a) => a.botStatus === "active").length,
      needsBot: agents.filter((a) => a.botStatus === "needs-bot").length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.status === "completed").length,
      activeTasks: tasks.filter((t) => t.status === "in-progress").length,
      gradedAgents: gradedAgents.length,
      avgGradePoints,
      totalIdeas: ideas.length,
      approvedIdeas: ideas.filter((i) => i.status === "approved").length,
    },
    lastUpdated: registryRaw.lastUpdated || new Date().toISOString(),
  }
}

// Singleton
let _data: DashboardData | null = null
export function getDashboardData(): DashboardData {
  if (!_data) _data = buildDashboardData()
  return _data
}

/**
 * Live data layer — merges agent-registry, agent-levels, task-tracker
 * Computes OVR ratings, room assignments, activity feed.
 */

import registryRaw from "@/data/agent-registry.json"
import levelsRaw from "@/data/agent-levels.json"
import tasksRaw from "@/data/task-tracker.json"
import { agentMeta } from "./agent-meta"

/* ─── Types ─── */

export type BotStatus = "active" | "needs-bot"
export type TaskStatus = "completed" | "in-progress" | "blocked" | "queued"
export type GradeTrend = "new" | "up" | "down" | "stable" | "new-star"
export type OvrTier = "elite" | "star" | "starter" | "rotation" | "development"
export type Room = "work" | "lounge" | "bench"

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
  ovr: number
  ovrTier: OvrTier
  room: Room
  currentTask: string | null
  tasksCompleted: number
  tasksTotal: number
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

export interface ActivityItem {
  id: string
  agentId: string
  agentName: string
  agentEmoji: string
  action: string
  detail: string
  timestamp: string
  type: "completed" | "started" | "blocked" | "system"
  grade: string | null
}

export interface DashboardData {
  agents: LiveAgent[]
  tasks: LiveTask[]
  activity: ActivityItem[]
  stats: {
    totalAgents: number
    activeAgents: number
    needsBot: number
    tasksCompleted: number
    tasksInProgress: number
    tasksBlocked: number
    avgGrade: string
    avgOvr: number
  }
  lastUpdated: string
}

/* ─── Grade math ─── */

const GRADE_NUMERIC: Record<string, number> = {
  "A+": 97, "A": 93, "A-": 90,
  "B+": 87, "B": 83, "B-": 80,
  "C+": 77, "C": 73, "C-": 70,
  "D": 60, "F": 40,
}

const GRADE_GPA: Record<string, number> = {
  "A+": 4.3, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D": 1.0, "F": 0,
}

function gpaToLetter(gpa: number): string {
  if (gpa >= 4.15) return "A+"
  if (gpa >= 3.85) return "A"
  if (gpa >= 3.5) return "A-"
  if (gpa >= 3.15) return "B+"
  if (gpa >= 2.85) return "B"
  if (gpa >= 2.5) return "B-"
  if (gpa >= 2.15) return "C+"
  return "C"
}

const TREND_BONUS: Record<string, number> = {
  "new-star": 100, "up": 80, "stable": 50, "down": 20, "new": 40,
}

function computeOvr(
  grade: string | null,
  reps: number,
  trend: string | null,
  tasksCompleted: number,
  tasksTotal: number,
): number {
  const gradeNum = grade ? (GRADE_NUMERIC[grade] ?? 50) : 50
  const taskRate = tasksTotal > 0 ? (tasksCompleted / tasksTotal) * 100 : 50
  const repsNorm = Math.min(reps / 5, 1) * 100
  const trendBonus = trend ? (TREND_BONUS[trend] ?? 40) : 40
  const qaRate = 50 // default until QA data exists

  const raw = (gradeNum * 0.40) + (taskRate * 0.20) + (repsNorm * 0.15) + (trendBonus * 0.15) + (qaRate * 0.10)
  return Math.round(Math.min(99, Math.max(0, raw)))
}

function getOvrTier(ovr: number): OvrTier {
  if (ovr >= 90) return "elite"
  if (ovr >= 80) return "star"
  if (ovr >= 70) return "starter"
  if (ovr >= 60) return "rotation"
  return "development"
}

/* ─── Team mapping ─── */

const TEAM_MAP: Record<string, string> = {
  main: "executive", wade: "executive", elon: "executive", cio: "executive",
  jarvis: "executive", steward: "executive",
  saban: "engineering",
  steph: "product", cp3: "product", marino: "product", jokic: "product", jjettas: "product",
  mahomes: "creative", ai: "creative",
  ohtani: "engineering", giannis: "engineering",
  achane: "special-ops", tyreek: "special-ops", brady: "special-ops",
  magic: "special-ops", jimmy: "special-ops",
}

/* ─── Build ─── */

export function buildDashboardData(): DashboardData {
  const registry = registryRaw as { lastUpdated: string; agents: Array<{ id: string; name: string; role: string; botStatus: string; grade: string | null; emoji: string }> }
  const levels = (levelsRaw as { agents: Record<string, { grade: string; reps: number; lastTask: string; trend: string; history?: string[] }> }).agents
  const tasks: LiveTask[] = (tasksRaw as { tasks: any[] }).tasks.map((t) => {
    // Normalize status values
    let status: TaskStatus = "queued"
    if (t.status === "complete" || t.status === "completed") status = "completed"
    else if (t.status === "in-progress") status = "in-progress"
    else if (t.status === "blocked" || t.status === "code-complete-deploy-blocked") status = "blocked"

    return {
      id: t.id,
      title: t.title,
      owner: t.assignee || t.owner || "",
      assignedBy: t.requestedBy || t.assignedBy || "lebron",
      status,
      grade: t.grade || null,
      assignedAt: t.created || t.assignedAt || "",
      completedAt: t.completed || t.completedAt || null,
      deliverable: t.deliverable || null,
      notes: t.notes || t.nextAction || null,
    }
  })

  const agents: LiveAgent[] = registry.agents.map((reg) => {
    const level = levels[reg.id]
    const meta = agentMeta[reg.id] || {}
    const agentTasks = tasks.filter((t) => t.owner === reg.id)
    const completedTasks = agentTasks.filter((t) => t.status === "completed")
    const inProgressTasks = agentTasks.filter((t) => t.status === "in-progress")

    const grade = level?.grade ?? (reg.grade && reg.grade !== "pending" ? reg.grade : null)
    const reps = level?.reps ?? 0
    const trend = (level?.trend as GradeTrend) ?? null

    const ovr = computeOvr(grade, reps, trend, completedTasks.length, agentTasks.length)

    // Room assignment
    let room: Room = "bench"
    if (reg.botStatus === "active") {
      room = inProgressTasks.length > 0 ? "work" : "lounge"
    }

    return {
      id: reg.id,
      name: reg.name,
      role: reg.role,
      emoji: reg.emoji,
      botStatus: reg.botStatus as BotStatus,
      grade,
      reps,
      lastTask: level?.lastTask ?? null,
      trend,
      gradeHistory: level?.history ?? [],
      team: TEAM_MAP[reg.id] || "special-ops",
      photo: meta.photo || "",
      bio: meta.bio || "",
      title: meta.title || reg.role,
      realName: meta.realName || reg.name,
      smallCouncil: meta.smallCouncil || false,
      ovr,
      ovrTier: getOvrTier(ovr),
      room,
      currentTask: inProgressTasks[0]?.title ?? null,
      tasksCompleted: completedTasks.length,
      tasksTotal: agentTasks.length,
    }
  })

  // Activity feed from tasks
  const activity: ActivityItem[] = tasks
    .filter((t) => t.completedAt || t.assignedAt)
    .map((t) => {
      const agent = agents.find((a) => a.id === t.owner)
      return {
        id: t.id,
        agentId: t.owner,
        agentName: agent?.name || t.owner,
        agentEmoji: agent?.emoji || "📋",
        action: t.status === "completed" ? "Completed" : t.status === "in-progress" ? "Started" : t.status === "blocked" ? "Blocked" : "Assigned",
        detail: t.title,
        timestamp: t.completedAt || t.assignedAt,
        type: t.status === "completed" ? "completed" as const : t.status === "blocked" ? "blocked" as const : "started" as const,
        grade: t.grade || null,
      }
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Stats
  const gradedAgents = agents.filter((a) => a.grade)
  const avgGpa = gradedAgents.length > 0
    ? gradedAgents.reduce((sum, a) => sum + (GRADE_GPA[a.grade!] ?? 0), 0) / gradedAgents.length
    : 0

  return {
    agents,
    tasks,
    activity,
    stats: {
      totalAgents: agents.length,
      activeAgents: agents.filter((a) => a.botStatus === "active").length,
      needsBot: agents.filter((a) => a.botStatus === "needs-bot").length,
      tasksCompleted: tasks.filter((t) => t.status === "completed").length,
      tasksInProgress: tasks.filter((t) => t.status === "in-progress").length,
      tasksBlocked: tasks.filter((t) => t.status === "blocked").length,
      avgGrade: gpaToLetter(avgGpa),
      avgOvr: Math.round(agents.filter((a) => a.grade).reduce((s, a) => s + a.ovr, 0) / (gradedAgents.length || 1)),
    },
    lastUpdated: registry.lastUpdated || new Date().toISOString(),
  }
}

let _data: DashboardData | null = null
export function getDashboardData(): DashboardData {
  if (!_data) _data = buildDashboardData()
  return _data
}

/* ─── OVR tier colors ─── */
export const OVR_COLORS: Record<OvrTier, string> = {
  elite: "#FFD700",
  star: "#7C3AED",
  starter: "#3B82F6",
  rotation: "#22C55E",
  development: "#94A3B8",
}

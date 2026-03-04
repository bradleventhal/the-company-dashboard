"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getDashboardData } from "@/lib/live-data"
import type { LiveAgent, LiveTask, LiveIdea } from "@/lib/live-data"

const data = getDashboardData()

/* ─── Grade color helpers ─── */
function gradeColor(grade: string | null): string {
  if (!grade) return "#475569"
  if (grade.startsWith("A")) return "#22c55e"
  if (grade.startsWith("B")) return "#eab308"
  if (grade.startsWith("C")) return "#f97316"
  return "#ef4444"
}

function gradeBg(grade: string | null): string {
  if (!grade) return "rgba(71,85,105,0.15)"
  if (grade.startsWith("A")) return "rgba(34,197,94,0.12)"
  if (grade.startsWith("B")) return "rgba(234,179,8,0.12)"
  if (grade.startsWith("C")) return "rgba(249,115,22,0.12)"
  return "rgba(239,68,68,0.12)"
}

function trendIcon(trend: string | null): string {
  if (trend === "up") return "↑"
  if (trend === "down") return "↓"
  if (trend === "stable") return "→"
  return ""
}

function statusColor(status: string): string {
  if (status === "approved") return "#22c55e"
  if (status === "unreviewed") return "#eab308"
  if (status === "hold") return "#f97316"
  return "#ef4444"
}

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "America/New_York" }))
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York" }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-right">
      <p className="font-mono text-xl font-bold text-cyan-400 sm:text-2xl" style={{ textShadow: "0 0 12px rgba(0,212,255,0.4)" }}>{time}</p>
      <p className="text-[10px] text-cyan-500/30">{date}</p>
    </div>
  )
}

/* ─── Stats Strip ─── */
function StatsStrip() {
  const { stats } = data
  const items = [
    { label: "Agents", value: stats.totalAgents, icon: "👥", color: "#00d4ff" },
    { label: "Active", value: stats.activeAgents, icon: "⚡", color: "#22c55e" },
    { label: "Needs Bot", value: stats.needsBot, icon: "🔧", color: "#f97316" },
    { label: "Tasks", value: stats.completedTasks, icon: "✅", color: "#a855f7" },
    { label: "Graded", value: stats.gradedAgents, icon: "📊", color: "#eab308" },
    { label: "Ideas", value: stats.totalIdeas, icon: "💡", color: "#ff6b2b" },
  ]

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {items.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className="text-xs">{s.icon}</span>
          <div>
            <p className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] text-slate-600 uppercase tracking-wider">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Agent Mini Card ─── */
function AgentMini({ agent }: { agent: LiveAgent }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all hover:bg-white/5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="relative">
        {agent.photo ? (
          <div className="h-9 w-9 overflow-hidden rounded-full border border-cyan-500/30">
            <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-base">
            {agent.emoji}
          </div>
        )}
        {/* Bot status dot */}
        <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b1120] ${agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`}
          style={agent.botStatus === "active" ? { boxShadow: "0 0 6px #22c55e" } : {}} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-200 truncate">{agent.name}</span>
          {agent.grade && (
            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold"
              style={{ color: gradeColor(agent.grade), backgroundColor: gradeBg(agent.grade) }}>
              {agent.grade}
              {agent.trend && agent.trend !== "new" && (
                <span className="ml-0.5 text-[8px]">{trendIcon(agent.trend)}</span>
              )}
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-500 truncate">{agent.role}</p>
      </div>
      {agent.reps > 0 && (
        <span className="text-[9px] text-slate-600 font-mono">{agent.reps} rep{agent.reps !== 1 ? "s" : ""}</span>
      )}
    </div>
  )
}

/* ─── Task Row ─── */
function TaskRow({ task }: { task: LiveTask }) {
  const ownerAgent = data.agents.find((a) => a.id === task.owner)
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="text-base">{ownerAgent?.emoji || "📋"}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-300 truncate">{task.title}</p>
        <p className="text-[10px] text-slate-600">{ownerAgent?.name || task.owner} · {task.id}</p>
      </div>
      <div className="flex items-center gap-2">
        {task.grade && (
          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold"
            style={{ color: gradeColor(task.grade), backgroundColor: gradeBg(task.grade) }}>
            {task.grade}
          </span>
        )}
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
          task.status === "completed" ? "bg-green-500/10 text-green-400" :
          task.status === "in-progress" ? "bg-cyan-500/10 text-cyan-400" :
          "bg-slate-500/10 text-slate-400"
        }`}>{task.status}</span>
      </div>
    </div>
  )
}

/* ─── Idea Row ─── */
function IdeaRow({ idea }: { idea: LiveIdea }) {
  const submitter = data.agents.find((a) => a.id === idea.submittedBy)
  return (
    <div className="flex items-start gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="mt-0.5 text-base">{submitter?.emoji || "💡"}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-300 truncate">{idea.title}</p>
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase whitespace-nowrap"
            style={{ color: statusColor(idea.status), backgroundColor: `${statusColor(idea.status)}15` }}>
            {idea.status}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-2">{idea.summary}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[9px] text-slate-600">{submitter?.name || idea.submittedBy}</span>
          {idea.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded bg-slate-800 px-1.5 py-0.5 text-[8px] text-slate-500">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"

  const activeAgents = data.agents.filter((a) => a.botStatus === "active")
  const inactiveAgents = data.agents.filter((a) => a.botStatus === "needs-bot")

  return (
    <main className="relative min-h-[calc(100vh-52px)]">
      {/* Command Bar */}
      <div className="border-b border-cyan-500/10" style={{ background: "linear-gradient(135deg, #0d1424 0%, #0a1628 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-500/25">The Company · Command Center</p>
              <h1 className="text-base font-bold text-slate-200 sm:text-lg">{greeting}, <span className="text-cyan-400">Brad</span></h1>
            </div>
            <div className="hidden lg:block"><StatsStrip /></div>
            <LiveClock />
          </div>
          <div className="mt-2 lg:hidden overflow-x-auto"><StatsStrip /></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {/* ── Top KPI Cards ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Active Bots", value: data.stats.activeAgents, sub: `of ${data.stats.totalAgents}`, icon: "⚡", color: "#22c55e" },
            { label: "Tasks Done", value: data.stats.completedTasks, sub: `of ${data.stats.totalTasks}`, icon: "✅", color: "#a855f7" },
            { label: "Avg Grade", value: data.stats.avgGradePoints.toFixed(1), sub: `${data.stats.gradedAgents} graded`, icon: "📊", color: "#eab308" },
            { label: "Ideas", value: data.stats.totalIdeas, sub: `${data.stats.approvedIdeas} approved`, icon: "💡", color: "#ff6b2b" },
          ].map((card) => (
            <div key={card.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{card.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{card.label}</span>
              </div>
              <p className="mt-1 text-2xl font-bold font-mono" style={{ color: card.color }}>{card.value}</p>
              <p className="text-[10px] text-slate-600">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Left Column: Agent Roster ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Agents */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px #22c55e" }} />
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-green-400">Active Bots</h2>
                  <span className="text-[10px] text-slate-600">({activeAgents.length})</span>
                </div>
                <Link href="/agents" className="text-[10px] text-cyan-500/50 hover:text-cyan-400 transition-colors">
                  View all →
                </Link>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {activeAgents.map((a) => <AgentMini key={a.id} agent={a} />)}
              </div>
            </div>

            {/* Needs Bot */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-slate-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Needs Bot</h2>
                <span className="text-[10px] text-slate-600">({inactiveAgents.length})</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {inactiveAgents.map((a) => <AgentMini key={a.id} agent={a} />)}
              </div>
            </div>

            {/* Tasks */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-1 rounded-full bg-purple-400" style={{ boxShadow: "0 0 6px #a855f7" }} />
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-purple-400">Task Log</h2>
                  <span className="text-[10px] text-slate-600">({data.tasks.length})</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {data.tasks.slice(0, 10).map((t) => <TaskRow key={t.id} task={t} />)}
              </div>
            </div>
          </div>

          {/* ── Right Column: Ideas + Quick Links ── */}
          <div className="space-y-6">
            {/* Ideas Inbox */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-orange-400" style={{ boxShadow: "0 0 6px #ff6b2b" }} />
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400">Ideas Inbox</h2>
                <span className="text-[10px] text-slate-600">({data.ideas.length})</span>
              </div>
              <div className="space-y-2">
                {data.ideas.map((idea) => <IdeaRow key={idea.id} idea={idea} />)}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #00d4ff" }} />
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">Quick Links</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "📊 ETF Tool", href: "https://v0-fund-comparison-website.vercel.app", desc: "Fund comparison" },
                  { label: "👥 Full Roster", href: "/agents", desc: "All 21 agents" },
                  { label: "📡 Meetings", href: "/meetings", desc: "Schedule" },
                  { label: "🚀 Ventures", href: "/ventures", desc: "Business units" },
                ].map((link) => (
                  <Link key={link.label} href={link.href}
                    className="flex flex-col rounded-xl p-3 transition-all hover:bg-white/5 active:scale-95"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-sm font-semibold text-slate-200">{link.label}</span>
                    <span className="mt-0.5 text-[10px] text-cyan-500/50">{link.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Data freshness */}
            <div className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              <p className="text-[9px] text-slate-700">
                Data synced: {new Date(data.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

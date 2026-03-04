"use client"

import { useState, useEffect } from "react"
import { getDashboardData, OVR_COLORS } from "@/lib/live-data"
import type { LiveAgent, LiveTask, ActivityItem, OvrTier } from "@/lib/live-data"

const data = getDashboardData()

/* ═══════════════ HELPERS ═══════════════ */

function gradeColor(g: string | null): string {
  if (!g) return "#64748b"
  if (g.startsWith("A")) return "#22c55e"
  if (g.startsWith("B")) return "#eab308"
  if (g.startsWith("C")) return "#f97316"
  return "#ef4444"
}

function trendIcon(t: string | null): string {
  if (t === "up") return "↗"
  if (t === "down") return "↘"
  if (t === "stable") return "→"
  if (t === "new-star") return "⭐"
  if (t === "new") return "🆕"
  return ""
}

function ovrColor(tier: OvrTier): string { return OVR_COLORS[tier] }

function timeAgo(ts: string): string {
  if (!ts) return ""
  const d = new Date(ts)
  const now = new Date()
  const mins = Math.floor((now.getTime() - d.getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

/* ═══════════════ LIVE CLOCK ═══════════════ */

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York"
    }))
    update()
    const i = setInterval(update, 60000)
    return () => clearInterval(i)
  }, [])
  return <span className="font-mono text-sm text-cyan-400">{time}</span>
}

/* ═══════════════ AGENT AVATAR ═══════════════ */

function AgentAvatar({ agent, size = "md", showTask = false, onClick }: {
  agent: LiveAgent; size?: "sm" | "md" | "lg"; showTask?: boolean; onClick?: () => void
}) {
  const s = size === "sm" ? "h-10 w-10" : size === "lg" ? "h-16 w-16" : "h-12 w-12"
  const textSize = size === "sm" ? "text-[10px]" : "text-xs"
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform" onClick={onClick}
      style={{ minWidth: size === "sm" ? 64 : 80 }}>
      <div className="relative">
        {agent.photo ? (
          <div className={`${s} overflow-hidden rounded-full border-2`}
            style={{ borderColor: ovrColor(agent.ovrTier), boxShadow: agent.room === "work" ? `0 0 12px ${ovrColor(agent.ovrTier)}40` : "none" }}>
            <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
          </div>
        ) : (
          <div className={`${s} flex items-center justify-center rounded-full bg-slate-800 text-lg border-2`}
            style={{ borderColor: ovrColor(agent.ovrTier) }}>
            {agent.emoji}
          </div>
        )}
        {/* Status dot */}
        <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0a0f] ${
          agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"
        }`} style={agent.botStatus === "active" ? { boxShadow: "0 0 6px #22c55e" } : {}} />
        {/* OVR badge */}
        {agent.grade && (
          <div className="absolute -top-1 -right-1 rounded-full px-1 py-0.5 text-[9px] font-black leading-none"
            style={{ backgroundColor: ovrColor(agent.ovrTier), color: agent.ovrTier === "elite" ? "#000" : "#fff", minWidth: 20, textAlign: "center" }}>
            {agent.ovr}
          </div>
        )}
      </div>
      <span className={`${textSize} font-bold text-slate-200 text-center leading-tight`}>{agent.name}</span>
      {showTask && agent.currentTask && (
        <span className="text-[9px] text-cyan-500/60 text-center leading-tight line-clamp-2 max-w-[80px]">{agent.currentTask}</span>
      )}
      {showTask && !agent.currentTask && agent.lastTask && (
        <span className="text-[9px] text-slate-600 text-center leading-tight line-clamp-2 max-w-[80px]">{agent.lastTask}</span>
      )}
    </div>
  )
}

/* ═══════════════ AGENT PROFILE MODAL ═══════════════ */

function AgentProfile({ agent, onClose }: { agent: LiveAgent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-4 pb-2" style={{ background: "#111827" }}>
          <div className="flex items-center gap-3">
            {agent.photo ? (
              <div className="h-12 w-12 overflow-hidden rounded-full border-2" style={{ borderColor: ovrColor(agent.ovrTier) }}>
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-xl border-2"
                style={{ borderColor: ovrColor(agent.ovrTier) }}>{agent.emoji}</div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <span className={`h-2.5 w-2.5 rounded-full ${agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`} />
              </div>
              <p className="text-xs text-slate-500">{agent.realName} · {agent.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xl p-2">✕</button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* OVR + Grade */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl px-4 py-2 text-center" style={{ backgroundColor: `${ovrColor(agent.ovrTier)}15`, border: `1px solid ${ovrColor(agent.ovrTier)}30` }}>
              <p className="text-2xl font-black font-mono" style={{ color: ovrColor(agent.ovrTier) }}>{agent.ovr}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: ovrColor(agent.ovrTier) }}>OVR</p>
            </div>
            {agent.grade && (
              <div className="rounded-xl px-4 py-2 text-center" style={{ backgroundColor: `${gradeColor(agent.grade)}15` }}>
                <p className="text-2xl font-bold" style={{ color: gradeColor(agent.grade) }}>{agent.grade}</p>
                <p className="text-[9px] uppercase tracking-wider text-slate-500">Grade</p>
              </div>
            )}
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-sm font-bold text-cyan-400 font-mono">{agent.reps}</p>
                <p className="text-[8px] text-slate-600 uppercase">Reps</p>
              </div>
              <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-sm font-bold text-purple-400 font-mono">{agent.tasksCompleted}</p>
                <p className="text-[8px] text-slate-600 uppercase">Tasks</p>
              </div>
            </div>
          </div>

          {/* Grade history */}
          {agent.gradeHistory.length > 0 && (
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1.5">Grade History</p>
              <div className="flex gap-1.5 flex-wrap">
                {agent.gradeHistory.map((g, i) => (
                  <span key={i} className="rounded px-2 py-0.5 text-[11px] font-bold" style={{ color: gradeColor(g), backgroundColor: `${gradeColor(g)}15` }}>{g}</span>
                ))}
                {agent.grade && (
                  <span className="rounded px-2 py-0.5 text-[11px] font-bold border" style={{ color: gradeColor(agent.grade), backgroundColor: `${gradeColor(agent.grade)}15`, borderColor: `${gradeColor(agent.grade)}30` }}>{agent.grade} ←</span>
                )}
              </div>
            </div>
          )}

          {/* Bio */}
          <p className="text-xs text-slate-400 leading-relaxed">{agent.bio}</p>

          {/* Completed tasks */}
          {agent.tasksCompleted > 0 && (
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1.5">Completed Tasks</p>
              <div className="space-y-1">
                {data.tasks.filter((t) => t.owner === agent.id && t.status === "completed").map((t) => (
                  <div key={t.id} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="text-[10px] text-slate-600 font-mono shrink-0">{t.id}</span>
                    <span className="text-[11px] text-slate-400 flex-1 truncate">{t.title}</span>
                    {t.grade && <span className="text-[10px] font-bold shrink-0" style={{ color: gradeColor(t.grade) }}>{t.grade}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════ OFFICE TAB ═══════════════ */

function OfficeTab({ onSelect }: { onSelect: (a: LiveAgent) => void }) {
  const [benchOpen, setBenchOpen] = useState(false)
  const working = data.agents.filter((a) => a.room === "work")
  const lounging = data.agents.filter((a) => a.room === "lounge")
  const bench = data.agents.filter((a) => a.room === "bench")

  return (
    <div className="space-y-4">
      {/* Work Room */}
      <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(0,212,255,0.01))", border: "1px solid rgba(0,212,255,0.12)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-500/70">Work Room</span>
          <span className="text-[10px] text-slate-600">({working.length})</span>
        </div>
        {working.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-start">
            {working.map((a) => <AgentAvatar key={a.id} agent={a} showTask onClick={() => onSelect(a)} />)}
          </div>
        ) : (
          <p className="text-xs text-slate-700 italic">No agents currently working</p>
        )}
      </div>

      {/* Lounge */}
      <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-cyan-500/50" />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Lounge</span>
          <span className="text-[10px] text-slate-600">({lounging.length})</span>
        </div>
        {lounging.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-start">
            {lounging.map((a) => <AgentAvatar key={a.id} agent={a} showTask onClick={() => onSelect(a)} />)}
          </div>
        ) : (
          <p className="text-xs text-slate-700 italic">Everyone&apos;s working or on the bench</p>
        )}
      </div>

      {/* Bench */}
      <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
        <button onClick={() => setBenchOpen(!benchOpen)} className="flex items-center gap-2 w-full text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">📦 Bench</span>
          <span className="text-[10px] text-slate-700">({bench.length} pending)</span>
          <span className="ml-auto text-[10px] text-slate-700">{benchOpen ? "▼" : "▶"}</span>
        </button>
        {benchOpen && (
          <div className="mt-3 flex flex-wrap gap-3">
            {bench.map((a) => <AgentAvatar key={a.id} agent={a} size="sm" onClick={() => onSelect(a)} />)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════ ROSTER TAB ═══════════════ */

function RosterTab({ onSelect }: { onSelect: (a: LiveAgent) => void }) {
  const [filter, setFilter] = useState<"all" | "active" | "graded">("all")
  const [sort, setSort] = useState<"ovr" | "grade" | "name">("ovr")

  let agents = [...data.agents]
  if (filter === "active") agents = agents.filter((a) => a.botStatus === "active")
  if (filter === "graded") agents = agents.filter((a) => a.grade)

  agents.sort((a, b) => {
    if (sort === "ovr") return b.ovr - a.ovr
    if (sort === "grade") return (b.grade ? 1 : 0) - (a.grade ? 1 : 0) || b.ovr - a.ovr
    return a.name.localeCompare(b.name)
  })

  return (
    <div>
      {/* Filter + Sort */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["all", "active", "graded"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors"
            style={{
              background: filter === f ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
              color: filter === f ? "#00d4ff" : "#64748b",
              border: `1px solid ${filter === f ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.06)"}`,
            }}>
            {f === "all" ? `All (${data.agents.length})` : f === "active" ? `Active (${data.stats.activeAgents})` : `Graded (${data.agents.filter(a => a.grade).length})`}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          {(["ovr", "grade", "name"] as const).map((s) => (
            <button key={s} onClick={() => setSort(s)}
              className="rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase whitespace-nowrap"
              style={{ color: sort === s ? "#00d4ff" : "#475569" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Agent cards */}
      <div className="space-y-2">
        {agents.map((agent) => (
          <div key={agent.id} onClick={() => onSelect(agent)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer active:scale-[0.98] transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Avatar */}
            <div className="relative shrink-0">
              {agent.photo ? (
                <div className="h-11 w-11 overflow-hidden rounded-full border-2" style={{ borderColor: ovrColor(agent.ovrTier) }}>
                  <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                </div>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 text-lg border-2"
                  style={{ borderColor: ovrColor(agent.ovrTier) }}>{agent.emoji}</div>
              )}
              <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0f] ${
                agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`} />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-200">{agent.name}</span>
                {agent.smallCouncil && <span className="text-[7px] font-bold px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-500/50 uppercase">SC</span>}
              </div>
              <p className="text-[11px] text-slate-500 truncate">{agent.role}</p>
              {agent.lastTask && <p className="text-[10px] text-slate-600 truncate mt-0.5">{agent.lastTask}</p>}
            </div>

            {/* OVR + Grade */}
            <div className="flex items-center gap-2 shrink-0">
              {agent.grade && (
                <span className="text-xs font-bold" style={{ color: gradeColor(agent.grade) }}>
                  {agent.grade}
                  {agent.trend && <span className="ml-0.5 text-[10px]">{trendIcon(agent.trend)}</span>}
                </span>
              )}
              <div className="rounded-lg px-2 py-1 text-center min-w-[36px]"
                style={{ backgroundColor: `${ovrColor(agent.ovrTier)}15`, border: `1px solid ${ovrColor(agent.ovrTier)}25` }}>
                <span className="text-sm font-black font-mono" style={{ color: ovrColor(agent.ovrTier) }}>{agent.ovr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════ ACTIVITY TAB ═══════════════ */

function ActivityTab() {
  return (
    <div className="space-y-2">
      {data.activity.length === 0 && <p className="text-xs text-slate-700 text-center py-8">No activity yet</p>}
      {data.activity.map((item) => (
        <div key={item.id} className="rounded-xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{item.agentEmoji}</span>
            <span className="text-xs font-bold text-slate-300">{item.agentName}</span>
            <span className="text-[10px] text-slate-600 ml-auto">{timeAgo(item.timestamp)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase ${
              item.type === "completed" ? "text-green-400" :
              item.type === "blocked" ? "text-red-400" : "text-cyan-400"
            }`}>
              {item.type === "completed" ? "✅" : item.type === "blocked" ? "🚫" : "🔨"} {item.action}
            </span>
            {item.grade && <span className="text-[10px] font-bold" style={{ color: gradeColor(item.grade) }}>{item.grade}</span>}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════ TASKS TAB ═══════════════ */

function TasksTab() {
  const [showCompleted, setShowCompleted] = useState(false)
  const inProgress = data.tasks.filter((t) => t.status === "in-progress")
  const blocked = data.tasks.filter((t) => t.status === "blocked")
  const completed = data.tasks.filter((t) => t.status === "completed")

  const TaskCard = ({ task }: { task: LiveTask }) => {
    const agent = data.agents.find((a) => a.id === task.owner)
    return (
      <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono text-slate-600">{task.id}</span>
          <span className="text-[10px] text-slate-500">·</span>
          <span className="text-xs">{agent?.emoji}</span>
          <span className="text-xs font-semibold text-slate-400">{agent?.name || task.owner}</span>
          {task.grade && <span className="ml-auto text-xs font-bold" style={{ color: gradeColor(task.grade) }}>{task.grade}</span>}
        </div>
        <p className="text-sm font-semibold text-slate-200">{task.title}</p>
        {task.notes && <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{task.notes}</p>}
        {task.completedAt && <p className="text-[10px] text-slate-600 mt-1">{timeAgo(task.completedAt)}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* In Progress */}
      {inProgress.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">🔨 In Progress</span>
            <span className="text-[10px] text-slate-600">({inProgress.length})</span>
          </div>
          <div className="space-y-2">{inProgress.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </div>
      )}

      {/* Blocked */}
      {blocked.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-400">🚫 Blocked</span>
            <span className="text-[10px] text-slate-600">({blocked.length})</span>
          </div>
          <div className="space-y-2">{blocked.map((t) => <TaskCard key={t.id} task={t} />)}</div>
        </div>
      )}

      {/* Completed */}
      <div>
        <button onClick={() => setShowCompleted(!showCompleted)} className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-green-400">✅ Completed</span>
          <span className="text-[10px] text-slate-600">({completed.length})</span>
          <span className="text-[10px] text-slate-700 ml-1">{showCompleted ? "▼" : "▶"}</span>
        </button>
        {showCompleted && <div className="space-y-2">{completed.map((t) => <TaskCard key={t.id} task={t} />)}</div>}
        {!showCompleted && completed.length > 0 && (
          <div className="space-y-2">{completed.slice(0, 3).map((t) => <TaskCard key={t.id} task={t} />)}</div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════ MAIN PAGE ═══════════════ */

type TabId = "office" | "roster" | "activity" | "tasks"

export default function Home() {
  const [tab, setTab] = useState<TabId>("office")
  const [selectedAgent, setSelectedAgent] = useState<LiveAgent | null>(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening"

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "office", label: "Office", icon: "🏢" },
    { id: "roster", label: "Roster", icon: "👥" },
    { id: "activity", label: "Activity", icon: "📡" },
    { id: "tasks", label: "Tasks", icon: "📋" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0f" }}>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: "#0a0a0f", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-3xl px-4 pt-3 pb-2">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.15em] text-slate-300">The Company HQ</h1>
              <p className="text-[10px] text-slate-700">{greeting}, Brad</p>
            </div>
            <LiveClock />
          </div>

          {/* KPI Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {[
              { label: "Active", value: data.stats.activeAgents, color: "#22c55e", icon: "🟢" },
              { label: "Pending", value: data.stats.needsBot, color: "#64748b", icon: "⏸" },
              { label: "Done", value: data.stats.tasksCompleted, color: "#a855f7", icon: "📦" },
              { label: "Grade", value: data.stats.avgGrade, color: "#22c55e", icon: "📊" },
              { label: "Avg OVR", value: data.stats.avgOvr, color: "#FFD700", icon: "🏆" },
            ].map((kpi) => (
              <div key={kpi.label} className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px]">{kpi.icon}</span>
                <span className="text-xs font-bold font-mono" style={{ color: kpi.color }}>{kpi.value}</span>
                <span className="text-[9px] text-slate-700 uppercase">{kpi.label}</span>
              </div>
            ))}
          </div>

          {/* Tab Bar */}
          <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.04)" }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all"
                style={{
                  background: tab === t.id ? "rgba(0,212,255,0.12)" : "transparent",
                  color: tab === t.id ? "#00d4ff" : "#475569",
                  ...(tab === t.id ? { boxShadow: "0 0 12px rgba(0,212,255,0.1)" } : {}),
                }}>
                <span className="text-sm">{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Tab Content ─── */}
      <main className="mx-auto max-w-3xl px-4 py-4">
        {tab === "office" && <OfficeTab onSelect={setSelectedAgent} />}
        {tab === "roster" && <RosterTab onSelect={setSelectedAgent} />}
        {tab === "activity" && <ActivityTab />}
        {tab === "tasks" && <TasksTab />}

        {/* Data freshness */}
        <p className="text-center text-[9px] text-slate-800 mt-6 mb-2">
          Data synced: {new Date(data.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })}
        </p>
      </main>

      {/* ─── Profile Modal ─── */}
      {selectedAgent && <AgentProfile agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
    </div>
  )
}

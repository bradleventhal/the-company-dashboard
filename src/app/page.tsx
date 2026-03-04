"use client"

import { useState, useEffect } from "react"
import { getDashboardData, OVR_COLORS } from "@/lib/live-data"
import type { LiveAgent, LiveTask, ActivityItem, OvrTier } from "@/lib/live-data"
import { NPC } from "@/components/office/NPC"
import { Room } from "@/components/office/Room"
import type { Agent as NpcAgent } from "@/components/office/types"

const data = getDashboardData()

/* ═══════════════ HELPERS ═══════════════ */

function gradeColor(g: string | null): string {
  if (!g) return "#64748b"
  if (g.startsWith("A")) return "#22c55e"
  if (g.startsWith("B")) return "#eab308"
  if (g.startsWith("C")) return "#f97316"
  return "#ef4444"
}

function ovrColor(tier: OvrTier): string { return OVR_COLORS[tier] }

function trendIcon(t: string | null): string {
  if (t === "up") return "↗"; if (t === "down") return "↘"; if (t === "stable") return "→"
  if (t === "new-star") return "⭐"; if (t === "new") return "🆕"; return ""
}

function timeAgo(ts: string): string {
  if (!ts) return ""
  const mins = Math.floor((Date.now() - new Date(ts).getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

/* Map LiveAgent → OpenClawfice NPC Agent */
function toNpcAgent(a: LiveAgent): NpcAgent {
  // Team color mapping
  const teamColors: Record<string, string> = {
    executive: "#00d4ff", product: "#00ff88", creative: "#a855f7",
    engineering: "#ff6b2b", "special-ops": "#ff3b5c",
  }
  // Mood from OVR
  const mood = a.ovr >= 85 ? "great" as const : a.ovr >= 70 ? "good" as const : a.ovr >= 55 ? "okay" as const : "stressed" as const

  return {
    id: a.id,
    name: a.name,
    role: a.role,
    emoji: a.emoji,
    color: teamColors[a.team] || "#64748b",
    status: a.room === "work" ? "working" : "idle",
    mood,
    task: a.currentTask || a.lastTask || undefined,
    level: Math.min(99, a.ovr),
    xp: a.tasksCompleted * 100 + a.reps * 50,
    needs: { energy: 70, output: 80, collab: 60, queue: 40, focus: 75 },
    skills: [],
  }
}

/* ═══════════════ LIVE CLOCK ═══════════════ */

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York"
    }))
    u(); const i = setInterval(u, 60000); return () => clearInterval(i)
  }, [])
  return <span className="font-mono text-sm text-cyan-400" style={{ textShadow: "0 0 8px rgba(0,212,255,0.4)" }}>{time}</span>
}

/* ═══════════════ AGENT DETAIL PANEL ═══════════════ */

function AgentPanel({ agent, onClose }: { agent: LiveAgent; onClose: () => void }) {
  const tasks = data.tasks.filter(t => t.owner === agent.id)
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ background: `${ovrColor(agent.ovrTier)}15`, border: `2px solid ${ovrColor(agent.ovrTier)}30` }}>
              {agent.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <span className={`h-2.5 w-2.5 rounded-full ${agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`} />
              </div>
              <p className="text-xs text-slate-500">{agent.realName} · {agent.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-xl p-2 min-w-[44px] min-h-[44px]">✕</button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* OVR + Grade row */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl px-5 py-3 text-center" style={{ backgroundColor: `${ovrColor(agent.ovrTier)}15`, border: `1px solid ${ovrColor(agent.ovrTier)}30` }}>
              <p className="text-3xl font-black font-mono" style={{ color: ovrColor(agent.ovrTier) }}>{agent.ovr}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: ovrColor(agent.ovrTier) }}>OVR</p>
            </div>
            {agent.grade && (
              <div className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: `${gradeColor(agent.grade)}15` }}>
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
                {agent.grade && <span className="rounded px-2 py-0.5 text-[11px] font-bold border" style={{ color: gradeColor(agent.grade), backgroundColor: `${gradeColor(agent.grade)}15`, borderColor: `${gradeColor(agent.grade)}30` }}>{agent.grade} ←</span>}
              </div>
            </div>
          )}

          {/* Bio */}
          <p className="text-xs text-slate-400 leading-relaxed">{agent.bio}</p>

          {/* Current/last task */}
          {agent.lastTask && (
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Last Task</p>
              <p className="text-xs text-slate-400">{agent.lastTask} {agent.trend && trendIcon(agent.trend)}</p>
            </div>
          )}

          {/* Task history */}
          {tasks.length > 0 && (
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1.5">Deliverables</p>
              <div className="space-y-1">
                {tasks.map(t => (
                  <div key={t.id} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="text-[10px] text-slate-600 font-mono shrink-0">{t.id}</span>
                    <span className="text-[11px] text-slate-400 flex-1 truncate">{t.title}</span>
                    {t.grade && <span className="text-[10px] font-bold shrink-0" style={{ color: gradeColor(t.grade) }}>{t.grade}</span>}
                    <span className={`text-[9px] font-bold ${t.status === "completed" ? "text-green-400/60" : t.status === "blocked" ? "text-red-400/60" : "text-cyan-400/60"}`}>
                      {t.status === "completed" ? "✅" : t.status === "blocked" ? "🚫" : "🔨"}
                    </span>
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

/* ═══════════════ ACTIVITY DRAWER ═══════════════ */

function ActivityDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-sm h-full overflow-y-auto" style={{ background: "#0b1120", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3" style={{ background: "#0b1120", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-500/70">📡 Activity Feed</span>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-2 min-w-[44px] min-h-[44px]">✕</button>
        </div>
        <div className="p-3 space-y-2">
          {data.activity.map(item => (
            <div key={item.id} className="rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{item.agentEmoji}</span>
                <span className="text-xs font-bold text-slate-300">{item.agentName}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{timeAgo(item.timestamp)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold ${item.type === "completed" ? "text-green-400" : item.type === "blocked" ? "text-red-400" : "text-cyan-400"}`}>
                  {item.type === "completed" ? "✅" : item.type === "blocked" ? "🚫" : "🔨"} {item.action}
                </span>
                {item.grade && <span className="text-[10px] font-bold" style={{ color: gradeColor(item.grade) }}>{item.grade}</span>}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════ TASKS DRAWER ═══════════════ */

function TasksDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  const inProgress = data.tasks.filter(t => t.status === "in-progress")
  const blocked = data.tasks.filter(t => t.status === "blocked")
  const completed = data.tasks.filter(t => t.status === "completed")

  const Section = ({ title, icon, tasks, color }: { title: string; icon: string; tasks: LiveTask[]; color: string }) => (
    tasks.length > 0 ? (
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{icon} {title}</span>
          <span className="text-[10px] text-slate-600">({tasks.length})</span>
        </div>
        <div className="space-y-1.5">
          {tasks.map(t => {
            const agent = data.agents.find(a => a.id === t.owner)
            return (
              <div key={t.id} className="rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-slate-600">{t.id}</span>
                  <span className="text-xs">{agent?.emoji}</span>
                  <span className="text-[11px] font-semibold text-slate-400">{agent?.name}</span>
                  {t.grade && <span className="ml-auto text-[10px] font-bold" style={{ color: gradeColor(t.grade) }}>{t.grade}</span>}
                </div>
                <p className="text-xs text-slate-300">{t.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    ) : null
  )

  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-sm h-full overflow-y-auto" style={{ background: "#0b1120", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3" style={{ background: "#0b1120", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-500/70">📋 Task Tracker</span>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-2 min-w-[44px] min-h-[44px]">✕</button>
        </div>
        <div className="p-3 space-y-5">
          <Section title="In Progress" icon="🔨" tasks={inProgress} color="#00d4ff" />
          <Section title="Blocked" icon="🚫" tasks={blocked} color="#ef4444" />
          <Section title="Completed" icon="✅" tasks={completed} color="#22c55e" />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════ MAIN PAGE ═══════════════ */

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<LiveAgent | null>(null)
  const [activityOpen, setActivityOpen] = useState(false)
  const [tasksOpen, setTasksOpen] = useState(false)

  const working = data.agents.filter(a => a.room === "work")
  const lounging = data.agents.filter(a => a.room === "lounge")
  const bench = data.agents.filter(a => a.room === "bench")
  const [benchOpen, setBenchOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0f" }}>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30" style={{ backgroundColor: "#0a0a0fee", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <div className="mx-auto max-w-5xl px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.15em] text-slate-300" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
                The Company HQ
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* KPI chips */}
              <div className="flex items-center gap-2.5 text-[10px]">
                <span className="flex items-center gap-1"><span className="text-green-400 font-bold">{data.stats.activeAgents}</span><span className="text-slate-600">active</span></span>
                <span className="text-slate-800">·</span>
                <span className="flex items-center gap-1"><span className="text-purple-400 font-bold">{data.stats.tasksCompleted}</span><span className="text-slate-600">done</span></span>
                <span className="text-slate-800">·</span>
                <span className="flex items-center gap-1"><span className="font-bold" style={{ color: "#FFD700" }}>{data.stats.avgOvr}</span><span className="text-slate-600">OVR</span></span>
              </div>
              <LiveClock />
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 mt-1.5">
            <button onClick={() => setActivityOpen(true)}
              className="rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors min-h-[36px]"
              style={{ background: "rgba(0,212,255,0.08)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.15)" }}>
              📡 Activity ({data.activity.length})
            </button>
            <button onClick={() => setTasksOpen(true)}
              className="rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors min-h-[36px]"
              style={{ background: "rgba(168,85,247,0.08)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.15)" }}>
              📋 Tasks ({data.tasks.length})
            </button>
          </div>
        </div>
      </header>

      {/* ─── Office Floor ─── */}
      <main className="mx-auto max-w-5xl px-3 py-4 space-y-4">
        {/* Work Room */}
        <Room title={`Work Room (${working.length})`} icon="💻" color="rgba(0,212,255,0.04)" borderColor="rgba(0,212,255,0.2)" roomType="work">
          {working.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center py-4 px-2">
              {working.map(a => (
                <NPC key={a.id} agent={toNpcAgent(a)} size={1.2} onClick={() => setSelectedAgent(a)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>No agents currently working</p>
              <p className="text-[10px] text-slate-700 mt-1">Assign tasks via LeBron to see agents here</p>
            </div>
          )}
        </Room>

        {/* Lounge */}
        <Room title={`Lounge (${lounging.length})`} icon="☕" color="rgba(124,58,237,0.03)" borderColor="rgba(124,58,237,0.15)" roomType="lounge">
          {lounging.length > 0 ? (
            <div className="flex flex-wrap gap-5 justify-center py-4 px-2">
              {lounging.map(a => (
                <NPC key={a.id} agent={toNpcAgent(a)} size={1} onClick={() => setSelectedAgent(a)} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-700 text-center py-4">Everyone&apos;s busy or on the bench</p>
          )}
        </Room>

        {/* Bench */}
        <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <button onClick={() => setBenchOpen(!benchOpen)} className="flex items-center gap-2 w-full text-left min-h-[44px] px-2">
            <span className="text-sm">📦</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">Bench</span>
            <span className="text-[10px] text-slate-700">({bench.length} pending)</span>
            <span className="ml-auto text-[10px] text-slate-700">{benchOpen ? "▼" : "▶"}</span>
          </button>
          {benchOpen && (
            <div className="flex flex-wrap gap-4 justify-center py-3">
              {bench.map(a => (
                <NPC key={a.id} agent={toNpcAgent(a)} size={0.7} onClick={() => setSelectedAgent(a)} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[9px] text-slate-800 pb-2">
          Data: {new Date(data.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })}
        </p>
      </main>

      {/* ─── Overlays ─── */}
      {selectedAgent && <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
      <ActivityDrawer open={activityOpen} onClose={() => setActivityOpen(false)} />
      <TasksDrawer open={tasksOpen} onClose={() => setTasksOpen(false)} />
    </div>
  )
}

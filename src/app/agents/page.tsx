"use client"

import { useState } from "react"
import { getDashboardData } from "@/lib/live-data"
import type { LiveAgent } from "@/lib/live-data"

const data = getDashboardData()

const teamLabels: Record<string, string> = {
  executive: "Executive Suite",
  product: "Product & Strategy",
  creative: "Creative & Content",
  engineering: "Engineering",
  "special-ops": "Special Ops",
}

const teamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

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

/* ─── Agent Profile Panel ─── */
function AgentProfile({ agent, onClose }: { agent: LiveAgent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #111827, #0f172a)", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="relative h-28" style={{ background: `linear-gradient(135deg, ${teamColors[agent.team] || "#00d4ff"}20, transparent)` }}>
          <button onClick={onClose} className="absolute right-3 top-3 text-slate-500 hover:text-white text-lg">✕</button>
          <div className="absolute -bottom-8 left-5">
            {agent.photo ? (
              <div className="h-16 w-16 overflow-hidden rounded-xl border-2" style={{ borderColor: teamColors[agent.team] || "#00d4ff" }}>
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-800 text-2xl border-2" style={{ borderColor: teamColors[agent.team] || "#00d4ff" }}>
                {agent.emoji}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pt-12 pb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{agent.name}</h3>
            <span className={`h-2.5 w-2.5 rounded-full ${agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`}
              style={agent.botStatus === "active" ? { boxShadow: "0 0 6px #22c55e" } : {}} />
            {agent.grade && (
              <span className="rounded px-2 py-0.5 text-sm font-bold"
                style={{ color: gradeColor(agent.grade), backgroundColor: gradeBg(agent.grade) }}>
                {agent.grade}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">{agent.realName} · {agent.role}</p>
          <p className="text-[11px] text-slate-400 mt-1">{agent.title}</p>

          {/* Bio */}
          <p className="mt-3 text-xs text-slate-400 leading-relaxed">{agent.bio}</p>

          {/* Stats grid */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-sm font-bold text-cyan-400 font-mono">{agent.reps}</p>
              <p className="text-[9px] text-slate-600 uppercase">Reps</p>
            </div>
            <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-sm font-bold text-purple-400 font-mono">{agent.completedTasks.length}</p>
              <p className="text-[9px] text-slate-600 uppercase">Tasks</p>
            </div>
            <div className="rounded-lg p-2 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-sm font-bold font-mono" style={{ color: agent.botStatus === "active" ? "#22c55e" : "#64748b" }}>
                {agent.botStatus === "active" ? "ON" : "OFF"}
              </p>
              <p className="text-[9px] text-slate-600 uppercase">Status</p>
            </div>
          </div>

          {/* Grade history */}
          {agent.gradeHistory.length > 0 && (
            <div className="mt-3">
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Grade History</p>
              <div className="flex gap-1.5">
                {agent.gradeHistory.map((g, i) => (
                  <span key={i} className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ color: gradeColor(g), backgroundColor: gradeBg(g) }}>
                    {g}
                  </span>
                ))}
                <span className="rounded px-1.5 py-0.5 text-[10px] font-bold border"
                  style={{ color: gradeColor(agent.grade), backgroundColor: gradeBg(agent.grade), borderColor: `${gradeColor(agent.grade)}30` }}>
                  {agent.grade} ←
                </span>
              </div>
            </div>
          )}

          {/* Last task */}
          {agent.lastTask && (
            <div className="mt-3">
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Last Task</p>
              <p className="text-xs text-slate-400">{agent.lastTask}</p>
            </div>
          )}

          {/* Completed tasks */}
          {agent.completedTasks.length > 0 && (
            <div className="mt-3">
              <p className="text-[9px] text-slate-600 uppercase tracking-wider mb-1">Completed</p>
              <div className="space-y-1">
                {agent.completedTasks.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 rounded px-2 py-1" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span className="text-[10px] text-slate-500 font-mono">{t.id}</span>
                    <span className="text-[10px] text-slate-400 flex-1 truncate">{t.title}</span>
                    {t.grade && (
                      <span className="text-[10px] font-bold" style={{ color: gradeColor(t.grade) }}>{t.grade}</span>
                    )}
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

/* ─── Agent Card ─── */
function AgentCard({ agent, onClick }: { agent: LiveAgent; onClick: () => void }) {
  return (
    <div onClick={onClick}
      className="group flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all hover:bg-white/5 active:scale-[0.98]"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="relative shrink-0">
        {agent.photo ? (
          <div className="h-10 w-10 overflow-hidden rounded-full border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
            <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg">
            {agent.emoji}
          </div>
        )}
        <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0f1a] ${agent.botStatus === "active" ? "bg-green-400" : "bg-slate-600"}`}
          style={agent.botStatus === "active" ? { boxShadow: "0 0 6px #22c55e" } : {}} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-slate-200">{agent.name}</span>
          {agent.smallCouncil && (
            <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-500/60 uppercase tracking-wider">SC</span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 truncate">{agent.title}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        {agent.grade ? (
          <span className="rounded px-2 py-0.5 text-xs font-bold"
            style={{ color: gradeColor(agent.grade), backgroundColor: gradeBg(agent.grade) }}>
            {agent.grade}
            {agent.trend && agent.trend !== "new" && (
              <span className="ml-0.5 text-[9px]">{trendIcon(agent.trend)}</span>
            )}
          </span>
        ) : (
          <span className="text-[10px] text-slate-700">—</span>
        )}
        {agent.completedTasks.length > 0 && (
          <span className="text-[9px] text-slate-600 font-mono">{agent.completedTasks.length} task{agent.completedTasks.length !== 1 ? "s" : ""}</span>
        )}
        {agent.reps > 0 && (
          <span className="text-[9px] text-slate-600 font-mono">{agent.reps} rep{agent.reps !== 1 ? "s" : ""}</span>
        )}
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function AgentsPage() {
  const [selected, setSelected] = useState<LiveAgent | null>(null)
  const teams = Object.keys(teamLabels)

  // Small Council members
  const council = data.agents.filter((a) => a.smallCouncil)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-200">Agent Roster</h1>
        <p className="text-xs text-slate-600">{data.agents.length} agents across 5 teams · {data.stats.activeAgents} active bots · {data.stats.gradedAgents} graded · Tap for profile</p>
      </div>

      {/* Small Council */}
      <div className="mb-6 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(0,212,255,0.01))", border: "1px solid rgba(0,212,255,0.12)" }}>
        <div className="px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">👑</span>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-500/60">Small Council</p>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-4">
          {council.map((a) => (
            <div key={a.id} onClick={() => setSelected(a)}
              className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 cursor-pointer transition-all hover:bg-white/5 min-h-[44px]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-500/30">
                <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-200">{a.name}</p>
                  {a.grade && (
                    <span className="rounded px-1 py-0.5 text-[9px] font-bold"
                      style={{ color: gradeColor(a.grade), backgroundColor: gradeBg(a.grade) }}>
                      {a.grade}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-cyan-500/50">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-8">
        {teams.map((teamKey) => {
          const teamAgents = data.agents.filter((a) => a.team === teamKey)
          const teamColor = teamColors[teamKey] || "#00d4ff"
          return (
            <div key={teamKey}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full" style={{ backgroundColor: teamColor, boxShadow: `0 0 6px ${teamColor}40` }} />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em]" style={{ color: teamColor }}>
                  {teamLabels[teamKey]}
                </h2>
                <span className="text-[10px] text-slate-600">({teamAgents.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {teamAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Profile modal */}
      {selected && <AgentProfile agent={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}

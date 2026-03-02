"use client"

import { agents, teamLabels } from "@/lib/data"
import { AgentCard } from "@/components/agent-card"

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

export default function AgentsPage() {
  const teams = Object.keys(teamLabels)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-200">Agent Roster</h1>
        <p className="text-xs text-slate-600">{agents.length} agents across 5 teams · Tap any agent for full profile</p>
      </div>

      {/* Small Council Banner */}
      <div className="mb-6 overflow-hidden rounded-xl glow-cyan" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,212,255,0.02))", border: "1px solid rgba(0,212,255,0.15)" }}>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">👑</span>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-500/60">Small Council</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-600">The inner circle. Big decisions get debated here before reaching Brad.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-4">
          {agents.filter((a) => a.smallCouncil).map((a) => (
            <div key={a.id} className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 glass min-h-[44px]">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-500/30">
                <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">{a.name}</p>
                <p className="text-[10px] text-cyan-500/50">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-8">
        {teams.map((teamKey) => {
          const teamAgents = agents.filter((a) => a.team === teamKey)
          const teamColor = neonTeamColors[teamKey]
          return (
            <div key={teamKey}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full" style={{ backgroundColor: teamColor, boxShadow: `0 0 6px ${teamColor}40` }} />
                <h2 className="text-[12px] font-bold uppercase tracking-[0.15em]" style={{ color: teamColor }}>
                  {teamLabels[teamKey]}
                </h2>
                <span className="text-[10px] text-slate-600">({teamAgents.length})</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teamAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

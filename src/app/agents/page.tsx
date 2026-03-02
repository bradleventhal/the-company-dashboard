"use client"

import { agents, teamLabels, teamColors } from "@/lib/data"
import { AgentCard } from "@/components/agent-card"

export default function AgentsPage() {
  const teams = Object.keys(teamLabels)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">Agent Roster</h1>
        <p className="text-xs text-slate-400">{agents.length} agents across 5 teams · Click any agent for full profile</p>
      </div>

      {/* Small Council Banner */}
      <div className="mb-6 overflow-hidden rounded-xl" style={{ backgroundColor: "#0f3d6b" }}>
        <div className="px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">👑</span>
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Small Council</p>
          </div>
          <p className="mt-1 text-[11px] text-white/40">The inner circle. Big decisions get debated here before reaching Brad.</p>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-4">
          {agents.filter((a) => a.smallCouncil).map((a) => (
            <div key={a.id} className="flex shrink-0 items-center gap-2.5 rounded-lg bg-white/10 px-3 py-2 backdrop-blur">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white/20">
                <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{a.name}</p>
                <p className="text-[10px] text-white/50">{a.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teams */}
      <div className="space-y-8">
        {teams.map((teamKey) => {
          const teamAgents = agents.filter((a) => a.team === teamKey)
          return (
            <div key={teamKey}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-1 rounded-full" style={{ backgroundColor: teamColors[teamKey] }} />
                <h2 className="text-[12px] font-bold uppercase tracking-wider" style={{ color: teamColors[teamKey] }}>
                  {teamLabels[teamKey]}
                </h2>
                <span className="text-[10px] text-slate-400">({teamAgents.length})</span>
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

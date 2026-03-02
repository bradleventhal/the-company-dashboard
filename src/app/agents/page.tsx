import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, teamLabels, teamColors } from "@/lib/data"
import { StatusDot } from "@/components/status-dot"

export default function AgentsPage() {
  const teams = Object.keys(teamLabels)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">Agent Roster</h1>
        <p className="text-xs text-slate-400">19 agents across 5 teams</p>
      </div>

      {/* Org Chart - Small Council */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Small Council</p>
          <div className="flex flex-wrap gap-2">
            {agents.filter((a) => a.smallCouncil).map((a) => (
              <div key={a.id} className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: "#0f3d6b30", backgroundColor: "#f0f7ff" }}>
                <span className="text-lg">{a.avatar}</span>
                <div>
                  <p className="text-xs font-bold text-slate-900">{a.name}</p>
                  <p className="text-[10px] text-slate-500">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teams */}
      <div className="space-y-6">
        {teams.map((teamKey) => {
          const teamAgents = agents.filter((a) => a.team === teamKey)
          return (
            <div key={teamKey}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-1 rounded-full" style={{ backgroundColor: teamColors[teamKey] }} />
                <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: teamColors[teamKey] }}>
                  {teamLabels[teamKey]}
                </h2>
                <span className="text-[10px] text-slate-400">({teamAgents.length})</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {teamAgents.map((agent) => (
                  <Card key={agent.id} className="overflow-hidden">
                    <div className="h-1" style={{ backgroundColor: teamColors[agent.team] }} />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{agent.avatar}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                            <StatusDot status={agent.status} />
                            {agent.smallCouncil && (
                              <Badge variant="outline" className="text-[8px]" style={{ borderColor: "#d4af37", color: "#d4af37" }}>SC</Badge>
                            )}
                          </div>
                          <p className="text-xs font-semibold" style={{ color: teamColors[agent.team] }}>{agent.role}</p>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{agent.title}</p>

                          <div className="mt-3 border-t border-slate-50 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-400">Last task</span>
                              <span className="text-[10px] text-slate-400">{agent.lastActive}</span>
                            </div>
                            <p className="mt-0.5 truncate text-[11px] font-medium text-slate-600">{agent.lastTask}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

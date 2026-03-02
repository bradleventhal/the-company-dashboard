import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, ventures, teamColors } from "@/lib/data"

const statusColors: Record<string, string> = {
  active: "#0f3d6b",
  planning: "#7c3aed",
  paused: "#94a3b8",
}

export default function VenturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">Ventures</h1>
        <p className="text-xs text-slate-400">{ventures.length} business units — The Company's portfolio</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: "#0f3d6b" }}>{ventures.filter(v => v.status === "active").length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: "#7c3aed" }}>{ventures.filter(v => v.status === "planning").length}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Planning</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{new Set(ventures.flatMap(v => v.agents)).size}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Agents Assigned</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {ventures.map((venture) => {
          const ventureAgents = venture.agents.map((id) => agents.find((a) => a.id === id)).filter(Boolean)
          return (
            <Card key={venture.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-1.5" style={{ backgroundColor: statusColors[venture.status] }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{venture.name}</h2>
                      <Badge className="text-[10px]" style={{ backgroundColor: statusColors[venture.status], color: "#fff" }}>
                        {venture.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{venture.description}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-slate-400">Started</p>
                    <p className="text-sm font-semibold text-slate-700">{venture.startDate}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
                    <span className="text-sm font-bold text-slate-900">{venture.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.max(venture.progress, 1)}%`,
                        backgroundColor: statusColors[venture.status],
                        background: venture.progress > 0 ? `linear-gradient(90deg, ${statusColors[venture.status]}, ${statusColors[venture.status]}dd)` : statusColors[venture.status],
                      }}
                    />
                  </div>
                </div>

                {/* Assigned Team */}
                <div className="mt-4 border-t border-slate-50 pt-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Team</p>
                  <div className="flex flex-wrap gap-2">
                    {ventureAgents.map((agent) => agent && (
                      <div key={agent.id} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-2.5 py-1.5 transition-all hover:border-slate-200 hover:bg-slate-50">
                        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-slate-100">
                          <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-700">{agent.name}</span>
                          <span className="ml-1 text-[9px] text-slate-400">{agent.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {venture.revenue && (
                  <div className="mt-3 rounded-lg bg-green-50 p-2.5 text-center">
                    <p className="text-xs font-bold text-green-700">{venture.revenue}</p>
                    <p className="text-[9px] text-green-500">Revenue</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

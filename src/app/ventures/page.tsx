import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, ventures, teamColors } from "@/lib/data"

export default function VenturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-900">Ventures</h1>
        <p className="text-xs text-slate-400">{ventures.length} business units</p>
      </div>

      <div className="space-y-4">
        {ventures.map((venture) => {
          const ventureAgents = venture.agents.map((id) => agents.find((a) => a.id === id)).filter(Boolean)
          return (
            <Card key={venture.id} className="overflow-hidden">
              <div className="h-1" style={{ backgroundColor: venture.status === "active" ? "#0f3d6b" : venture.status === "planning" ? "#7c3aed" : "#94a3b8" }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{venture.name}</h2>
                      <Badge
                        variant={venture.status === "active" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {venture.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{venture.description}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Progress</span>
                    <span className="text-xs font-bold text-slate-900">{venture.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${venture.progress}%`, backgroundColor: "#0f3d6b" }}
                    />
                  </div>
                </div>

                {/* Assigned Agents */}
                <div className="mt-4 border-t border-slate-50 pt-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Agents</p>
                  <div className="flex flex-wrap gap-2">
                    {ventureAgents.map((agent) => agent && (
                      <div key={agent.id} className="flex items-center gap-1.5 rounded-md border border-slate-100 bg-slate-50/50 px-2 py-1">
                        <span className="text-sm">{agent.avatar}</span>
                        <span className="text-[11px] font-medium text-slate-700">{agent.name}</span>
                        <span className="text-[9px] text-slate-400">{agent.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

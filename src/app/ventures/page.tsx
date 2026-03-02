import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, ventures } from "@/lib/data"

const statusColors: Record<string, string> = {
  active: "#00d4ff",
  planning: "#a855f7",
  paused: "#475569",
}

export default function VenturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-slate-200">Ventures</h1>
        <p className="text-xs text-slate-600">{ventures.length} business units — The Company&apos;s portfolio</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { value: ventures.filter(v => v.status === "active").length, label: "Active", color: "#00d4ff" },
          { value: ventures.filter(v => v.status === "planning").length, label: "Planning", color: "#a855f7" },
          { value: new Set(ventures.flatMap(v => v.agents)).size, label: "Agents", color: "#00ff88" },
        ].map((stat) => (
          <Card key={stat.label} style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.04)" }}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {ventures.map((venture) => {
          const ventureAgents = venture.agents.map((id) => agents.find((a) => a.id === id)).filter(Boolean)
          const sColor = statusColors[venture.status]
          return (
            <Card key={venture.id} className="overflow-hidden" style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${sColor}, ${sColor}40)` }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-200">{venture.name}</h2>
                      <Badge className="text-[10px]" style={{ backgroundColor: `${sColor}15`, color: sColor, border: `1px solid ${sColor}30` }}>
                        {venture.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{venture.description}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-xs text-slate-600">Started</p>
                    <p className="text-sm font-semibold text-slate-400">{venture.startDate}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Progress</span>
                    <span className="font-mono text-sm font-bold" style={{ color: sColor }}>{venture.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.max(venture.progress, 1)}%`,
                        background: `linear-gradient(90deg, ${sColor}, ${sColor}80)`,
                        boxShadow: venture.progress > 0 ? `0 0 8px ${sColor}40` : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Assigned Team */}
                <div className="mt-4 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">Assigned Team</p>
                  <div className="flex flex-wrap gap-2">
                    {ventureAgents.map((agent) => agent && (
                      <div key={agent.id} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 glass min-h-[36px]">
                        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-cyan-500/20">
                          <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-300">{agent.name}</span>
                          <span className="ml-1 text-[9px] text-slate-600">{agent.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {venture.revenue && (
                  <div className="mt-3 rounded-lg p-2.5 text-center" style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
                    <p className="text-xs font-bold text-green-400">{venture.revenue}</p>
                    <p className="text-[9px] text-green-500/50">Revenue</p>
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

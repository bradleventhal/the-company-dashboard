import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, activities, ventures, teamLabels, teamColors } from "@/lib/data"
import { StatusDot } from "@/components/status-dot"
import Link from "next/link"

const activeAgents = agents.filter((a) => a.status === "working")
const idleAgents = agents.filter((a) => a.status === "idle")
const recentActivities = activities.slice(0, 6)

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Hero Stats */}
      <div className="mb-6 rounded-xl p-5" style={{ backgroundColor: "#0f3d6b" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Good Evening, Brad</h1>
            <p className="mt-0.5 text-xs text-white/50">The Company is online. Day 1.</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{activeAgents.length}/{agents.length}</p>
            <p className="text-[10px] text-white/50">Agents Active</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
            <p className="text-lg font-bold text-white">{agents.length}</p>
            <p className="text-[10px] text-white/50">Total Roster</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
            <p className="text-lg font-bold" style={{ color: "#22c55e" }}>{activeAgents.length}</p>
            <p className="text-[10px] text-white/50">Working</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
            <p className="text-lg font-bold text-white">{activities.length}</p>
            <p className="text-[10px] text-white/50">Tasks Today</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur">
            <p className="text-lg font-bold text-white">{ventures.filter((v) => v.status === "active").length}</p>
            <p className="text-[10px] text-white/50">Ventures</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Agents */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
                    <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                      <StatusDot status={agent.status} />
                    </div>
                    <p className="truncate text-[11px] text-slate-400">{agent.lastTask}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-3">
                <p className="text-[10px] font-medium text-slate-400">{idleAgents.length} agents standing by</p>
              </div>
            </CardContent>
          </Card>

          {/* Ventures */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ventures</CardTitle>
                <Link href="/ventures" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>View all →</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ventures.map((v) => (
                <div key={v.id}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                    <Badge variant={v.status === "active" ? "default" : "secondary"} className="text-[10px]">{v.status}</Badge>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(v.progress, 2)}%`, backgroundColor: v.status === "active" ? "#0f3d6b" : "#94a3b8" }} />
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">{v.progress}% · {v.agents.length} agents assigned</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Live Activity Feed</CardTitle>
                <Link href="/activity" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>View all →</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-100" />

                {recentActivities.map((activity) => {
                  const agent = agents.find((a) => a.id === activity.agentId)
                  return (
                    <div key={activity.id} className="relative flex gap-4 py-3">
                      {/* Avatar on timeline */}
                      <div className="relative z-10 h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm">
                        <img src={agent?.photo} alt={agent?.name} className="h-full w-full object-cover object-top" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{activity.agentName}</p>
                          <Badge variant="outline" className="text-[9px]" style={{
                            borderColor: activity.type === "task" ? "#0e7490" : activity.type === "alert" ? "#dc2626" : activity.type === "system" ? "#7c3aed" : "#64748b",
                            color: activity.type === "task" ? "#0e7490" : activity.type === "alert" ? "#dc2626" : activity.type === "system" ? "#7c3aed" : "#64748b",
                          }}>
                            {activity.type}
                          </Badge>
                          <span className="ml-auto shrink-0 text-[10px] text-slate-400">{activity.timestamp}</span>
                        </div>
                        <p className="mt-0.5 text-[13px] font-medium text-slate-700">{activity.action}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{activity.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Teams Grid */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Teams</CardTitle>
                <Link href="/agents" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>Full roster →</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(teamLabels).map(([key, label]) => {
                  const teamAgents = agents.filter((a) => a.team === key)
                  const active = teamAgents.filter((a) => a.status === "working").length
                  return (
                    <div key={key} className="rounded-lg border p-3 transition-all hover:shadow-md" style={{ borderColor: teamColors[key] + "30" }}>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: teamColors[key] }} />
                        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: teamColors[key] }}>{label}</p>
                      </div>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-lg font-bold text-slate-900">{teamAgents.length}</span>
                        <span className="text-[10px] text-slate-400">agents</span>
                        {active > 0 && (
                          <>
                            <span className="text-[10px] text-slate-300">·</span>
                            <span className="text-[10px] font-medium" style={{ color: "#22c55e" }}>{active} active</span>
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex -space-x-2">
                        {teamAgents.slice(0, 5).map((a) => (
                          <div key={a.id} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-slate-100" title={a.name}>
                            <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                          </div>
                        ))}
                        {teamAgents.length > 5 && (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-500">
                            +{teamAgents.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

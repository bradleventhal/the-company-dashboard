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
      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Agents</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{agents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Now</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: "#22c55e" }}>{activeAgents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tasks Today</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{activities.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Ventures</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{ventures.filter((v) => v.status === "active").length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Agents */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <span className="text-xl">{agent.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                      <StatusDot status={agent.status} />
                    </div>
                    <p className="truncate text-[11px] text-slate-400">{agent.lastTask}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]" style={{ borderColor: teamColors[agent.team], color: teamColors[agent.team] }}>
                    {agent.role}
                  </Badge>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-3">
                <p className="text-[10px] font-medium text-slate-400">{idleAgents.length} agents standing by</p>
              </div>
            </CardContent>
          </Card>

          {/* Ventures Quick */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ventures</CardTitle>
                <Link href="/ventures" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>View all →</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {ventures.map((v) => (
                <div key={v.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                    <Badge variant={v.status === "active" ? "default" : "secondary"} className="text-[10px]">
                      {v.status}
                    </Badge>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full transition-all" style={{ width: `${v.progress}%`, backgroundColor: "#0f3d6b" }} />
                  </div>
                  <p className="text-[10px] text-slate-400">{v.progress}% complete</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Recent Activity</CardTitle>
                <Link href="/activity" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>View all →</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {recentActivities.map((activity, i) => {
                  const agent = agents.find((a) => a.id === activity.agentId)
                  return (
                    <div key={activity.id} className="flex gap-3 border-b border-slate-50 py-3 last:border-0" >
                      <span className="mt-0.5 text-lg">{agent?.avatar || "?"}</span>
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

          {/* Team Overview */}
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(teamLabels).map(([key, label]) => {
                  const teamAgents = agents.filter((a) => a.team === key)
                  const active = teamAgents.filter((a) => a.status === "working").length
                  return (
                    <div key={key} className="rounded-lg border p-3" style={{ borderColor: teamColors[key] + "30" }}>
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
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {teamAgents.map((a) => (
                          <span key={a.id} className="text-sm" title={a.name}>{a.avatar}</span>
                        ))}
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

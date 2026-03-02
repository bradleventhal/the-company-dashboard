"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, activities, ventures, teamLabels, teamColors } from "@/lib/data"
import { StatusDot } from "@/components/status-dot"
import { AgentCard } from "@/components/agent-card"
import Link from "next/link"

const activeAgents = agents.filter((a) => a.status === "working")
const idleAgents = agents.filter((a) => a.status === "idle")

function LiveClock() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "America/New_York" }))
      setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-right">
      <p className="font-mono text-2xl font-bold text-white">{time}</p>
      <p className="text-[10px] text-white/40">{date}</p>
    </div>
  )
}

function LiveFeed() {
  const [visibleCount, setVisibleCount] = useState(3)
  const [expanded, setExpanded] = useState(false)

  const shown = expanded ? activities : activities.slice(0, visibleCount)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </div>
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Live Feed</CardTitle>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] font-medium transition-colors hover:underline"
            style={{ color: "#0f3d6b" }}
          >
            {expanded ? "Show less" : `Show all ${activities.length}`}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-100 to-transparent" />

          {shown.map((activity, i) => {
            const agent = agents.find((a) => a.id === activity.agentId)
            return (
              <div
                key={activity.id}
                className="relative flex gap-4 py-3 transition-all"
                style={{ opacity: i < 3 ? 1 : 0.7 + (0.3 * (1 - i / activities.length)) }}
              >
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
  )
}

function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {[
          { label: "📊 ETF Tool", href: "https://etf-tool.vercel.app", desc: "Fund comparison" },
          { label: "👥 Full Roster", href: "/agents", desc: "All 20 agents" },
          { label: "📈 Ventures", href: "/ventures", desc: "Business units" },
          { label: "📋 Activity Log", href: "/activity", desc: "Full history" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition-all hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm"
          >
            <span className="text-sm font-semibold text-slate-900">{action.label}</span>
            <span className="mt-0.5 text-[10px] text-slate-400">{action.desc}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Command Center Hero */}
      <div className="mb-6 overflow-hidden rounded-xl" style={{ backgroundColor: "#0f3d6b" }}>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">The Company · Command Center</p>
              <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">{greeting}, Brad</h1>
              <p className="mt-0.5 text-xs text-white/40">Day 1 · March 2, 2026</p>
            </div>
            <LiveClock />
          </div>

          {/* Status Grid */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur transition-all hover:bg-white/15">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm">👥</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{agents.length}</p>
                  <p className="text-[9px] text-white/40">Total Roster</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur transition-all hover:bg-white/15">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.2)" }}>
                  <StatusDot status="working" />
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: "#22c55e" }}>{activeAgents.length}</p>
                  <p className="text-[9px] text-white/40">Working Now</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur transition-all hover:bg-white/15">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{activities.length}</p>
                  <p className="text-[9px] text-white/40">Tasks Today</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur transition-all hover:bg-white/15">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm">🏢</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{ventures.length}</p>
                  <p className="text-[9px] text-white/40">Ventures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Agents Strip */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-white/30">Currently Working</p>
            <div className="flex gap-3">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white/20">
                    <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white">{agent.name}</p>
                    <p className="max-w-[120px] truncate text-[9px] text-white/40">{agent.lastTask}</p>
                  </div>
                  <StatusDot status="working" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-4 lg:col-span-2">
          <LiveFeed />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <QuickActions />

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
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                      <Badge variant={v.status === "active" ? "default" : "secondary"} className="text-[9px]">{v.status}</Badge>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{v.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(v.progress, 2)}%`, backgroundColor: v.status === "active" ? "#0f3d6b" : "#94a3b8" }} />
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <div className="flex -space-x-1.5">
                      {v.agents.slice(0, 4).map((id) => {
                        const a = agents.find((ag) => ag.id === id)
                        return a ? (
                          <div key={a.id} className="relative h-4 w-4 overflow-hidden rounded-full border border-white bg-slate-100" title={a.name}>
                            <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                          </div>
                        ) : null
                      })}
                    </div>
                    <span className="text-[9px] text-slate-400">{v.agents.length} agents</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Teams */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Teams</CardTitle>
                <Link href="/agents" className="text-[10px] font-medium" style={{ color: "#0f3d6b" }}>Full roster →</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(teamLabels).map(([key, label]) => {
                const teamAgents = agents.filter((a) => a.team === key)
                const active = teamAgents.filter((a) => a.status === "working").length
                return (
                  <div key={key} className="flex items-center justify-between rounded-lg border border-slate-50 p-2.5 transition-all hover:border-slate-100 hover:bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: teamColors[key] }} />
                      <span className="text-[11px] font-semibold text-slate-700">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {teamAgents.slice(0, 4).map((a) => (
                          <div key={a.id} className="relative h-5 w-5 overflow-hidden rounded-full border border-white bg-slate-100" title={a.name}>
                            <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                          </div>
                        ))}
                        {teamAgents.length > 4 && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-slate-100 text-[7px] font-bold text-slate-500">+{teamAgents.length - 4}</div>
                        )}
                      </div>
                      {active > 0 && <span className="text-[9px] font-medium" style={{ color: "#22c55e" }}>{active} active</span>}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

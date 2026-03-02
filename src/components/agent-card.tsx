"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusDot } from "@/components/status-dot"
import type { Agent } from "@/lib/data"

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

export function AgentCard({ agent }: { agent: Agent }) {
  const [open, setOpen] = useState(false)
  const teamColor = neonTeamColors[agent.team]
  const isWorking = agent.status === "working"

  return (
    <>
      <Card
        className="cursor-pointer overflow-hidden transition-all hover:-translate-y-0.5 min-h-[44px] active:scale-[0.98]"
        onClick={() => setOpen(true)}
        style={{
          background: "linear-gradient(135deg, rgba(15, 22, 41, 0.8), rgba(10, 14, 26, 0.9))",
          border: `1px solid ${isWorking ? `${teamColor}25` : "rgba(255,255,255,0.04)"}`,
          boxShadow: isWorking ? `0 0 15px ${teamColor}08` : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${teamColor}, ${teamColor}40)` }} />
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border sm:h-16 sm:w-16"
              style={{ borderColor: `${teamColor}30` }}
            >
              <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              {isWorking && (
                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 10px ${teamColor}15` }} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-200">{agent.name}</p>
                <StatusDot status={agent.status} />
                {agent.smallCouncil && (
                  <Badge variant="outline" className="text-[8px] px-1 border-amber-500/30 text-amber-400">SC</Badge>
                )}
              </div>
              <p className="text-xs font-semibold" style={{ color: teamColor }}>{agent.role}</p>
              <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{agent.title}</p>
            </div>
          </div>

          <div className="flex items-center border-t px-4 py-2" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-4 font-mono text-[10px] text-slate-600">
              <span>{agent.stats.tasksCompleted} tasks</span>
              <span>·</span>
              <span>{agent.stats.uptime}</span>
            </div>
            <span className="ml-auto font-mono text-[10px] text-slate-700">{agent.lastActive}</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" style={{ background: "#0d1424", border: `1px solid ${teamColor}20` }}>
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border"
                style={{ borderColor: `${teamColor}30`, boxShadow: `0 0 15px ${teamColor}15` }}
              >
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <DialogTitle className="text-lg text-white">{agent.name}</DialogTitle>
                <p className="text-xs text-slate-500">{agent.realName}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge className="text-[10px]" style={{ backgroundColor: `${teamColor}20`, color: teamColor, border: `1px solid ${teamColor}30` }}>
                    {agent.role}
                  </Badge>
                  <StatusDot status={agent.status} />
                  <span className="text-[10px] capitalize text-slate-500">{agent.status}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-2">
            <p className="text-sm leading-relaxed text-slate-400">{agent.bio}</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { value: agent.stats.tasksCompleted, label: "Tasks" },
              { value: agent.stats.uptime, label: "Uptime" },
              { value: agent.stats.specialty, label: "Specialty", small: true },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg p-3 text-center glass-card">
                <p className={`font-bold ${stat.small ? "text-[11px]" : "text-lg"}`} style={{ color: teamColor }}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {agent.lastTask && (
            <div className="mt-3 rounded-lg p-3" style={{ background: `${teamColor}08`, border: `1px solid ${teamColor}15` }}>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${teamColor}60` }}>Current / Last Task</p>
              <p className="mt-1 text-sm text-slate-300">{agent.lastTask}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

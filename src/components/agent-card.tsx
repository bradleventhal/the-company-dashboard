"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusDot } from "@/components/status-dot"
import { teamColors } from "@/lib/data"
import type { Agent } from "@/lib/data"

export function AgentCard({ agent }: { agent: Agent }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        className="cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
        onClick={() => setOpen(true)}
      >
        <div className="h-1.5" style={{ backgroundColor: teamColors[agent.team] }} />
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            {/* Photo */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <img
                src={agent.photo}
                alt={agent.name}
                className="h-full w-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl" style={{ display: 'none' }}>
                {agent.avatar}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900">{agent.name}</p>
                <StatusDot status={agent.status} />
                {agent.smallCouncil && (
                  <Badge variant="outline" className="text-[8px] px-1" style={{ borderColor: "#d4af37", color: "#d4af37" }}>SC</Badge>
                )}
              </div>
              <p className="text-xs font-semibold" style={{ color: teamColors[agent.team] }}>{agent.role}</p>
              <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{agent.title}</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center border-t border-slate-50 px-4 py-2">
            <div className="flex items-center gap-4 text-[10px] text-slate-400">
              <span>{agent.stats.tasksCompleted} tasks</span>
              <span>·</span>
              <span>{agent.stats.uptime} uptime</span>
            </div>
            <span className="ml-auto text-[10px] text-slate-300">{agent.lastActive}</span>
          </div>
        </CardContent>
      </Card>

      {/* Agent Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="h-full w-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div>
                <DialogTitle className="text-lg">{agent.name}</DialogTitle>
                <p className="text-xs text-slate-500">{agent.realName}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge style={{ backgroundColor: teamColors[agent.team], color: "#fff" }} className="text-[10px]">
                    {agent.role}
                  </Badge>
                  <StatusDot status={agent.status} />
                  <span className="text-[10px] capitalize text-slate-400">{agent.status}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Bio */}
          <div className="mt-2">
            <p className="text-sm leading-relaxed text-slate-600">{agent.bio}</p>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{agent.stats.tasksCompleted}</p>
              <p className="text-[10px] text-slate-400">Tasks</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-lg font-bold text-slate-900">{agent.stats.uptime}</p>
              <p className="text-[10px] text-slate-400">Uptime</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-[11px] font-bold text-slate-900">{agent.stats.specialty}</p>
              <p className="text-[10px] text-slate-400">Specialty</p>
            </div>
          </div>

          {/* Current Task */}
          {agent.lastTask && (
            <div className="mt-3 rounded-lg border border-slate-100 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current / Last Task</p>
              <p className="mt-1 text-sm text-slate-700">{agent.lastTask}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, activities } from "@/lib/data"

type FilterType = "all" | "task" | "communication" | "alert" | "system"

const typeColors: Record<string, string> = {
  task: "#00d4ff",
  alert: "#ff3b5c",
  system: "#a855f7",
  communication: "#64748b",
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-200">Activity Feed</h1>
          <p className="text-xs text-slate-600">{activities.length} events · March 2, 2026</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto">
        {(["all", "task", "communication", "system", "alert"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="rounded-full px-3 py-2 text-[11px] font-medium capitalize transition-all min-h-[44px]"
            style={{
              background: filter === type ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
              color: filter === type ? "#00d4ff" : "#64748b",
              border: `1px solid ${filter === type ? "rgba(0,212,255,0.3)" : "transparent"}`,
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <Card style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.04)" }}>
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.1), transparent)" }} />

            {filtered.map((activity) => {
              const agent = agents.find((a) => a.id === activity.agentId)
              return (
                <div key={activity.id} className="relative flex gap-4 border-b border-white/[0.02] px-4 py-4 last:border-0 transition-colors hover:bg-white/[0.02]">
                  <div className="relative z-10 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cyan-500/20 shadow-sm">
                    <img src={agent?.photo} alt={agent?.name} className="h-full w-full object-cover object-top" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-200">{activity.agentName}</p>
                      <Badge variant="outline" className="text-[9px]" style={{
                        borderColor: `${typeColors[activity.type]}40`,
                        color: typeColors[activity.type],
                      }}>
                        {activity.type}
                      </Badge>
                      <span className="ml-auto font-mono text-[10px] text-slate-700">{activity.timestamp}</span>
                    </div>
                    <p className="mt-0.5 text-[13px] font-medium text-slate-300">{activity.action}</p>
                    <p className="mt-0.5 text-[11px] text-slate-600">{activity.detail}</p>
                  </div>
                </div>
              )
            })}

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-slate-600">No activity matching this filter</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

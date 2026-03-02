"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agents, activities } from "@/lib/data"

type FilterType = "all" | "task" | "communication" | "alert" | "system"

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter)

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Activity Feed</h1>
          <p className="text-xs text-slate-400">{activities.length} events today</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-1.5">
        {(["all", "task", "communication", "system", "alert"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="rounded-full px-3 py-1.5 text-[11px] font-medium capitalize transition-colors"
            style={{
              backgroundColor: filter === type ? "#0f3d6b" : "#f1f5f9",
              color: filter === type ? "#fff" : "#64748b",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.map((activity) => {
            const agent = agents.find((a) => a.id === activity.agentId)
            return (
              <div key={activity.id} className="flex gap-3 border-b border-slate-50 px-4 py-4 last:border-0">
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
                    <span className="ml-auto text-[10px] text-slate-400">{activity.timestamp}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] font-medium text-slate-700">{activity.action}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{activity.detail}</p>
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-400">No activity matching this filter</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

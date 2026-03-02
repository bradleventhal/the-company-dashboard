"use client"

import { motion } from "framer-motion"
import { agents, activities } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const typeColors: Record<string, string> = {
  task: "#00d4ff",
  alert: "#ff3b5c",
  system: "#a855f7",
  communication: "#64748b",
}

export function LiveFeedPanel() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cyan-500/10 px-4 py-3">
        <div className="relative h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_#ff3b5c]" />
        </div>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Live Feed</h3>
        <span className="ml-auto font-mono text-[10px] text-slate-700">{activities.length}</span>
      </div>

      {/* Feed items */}
      <div className="flex-1 overflow-y-auto">
        {activities.map((activity, i) => {
          const agent = agents.find(a => a.id === activity.agentId)
          return (
            <motion.div
              key={activity.id}
              className="border-b border-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.02] cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-cyan-500/20 shadow-sm">
                  <img src={agent?.photo} alt={agent?.name} className="h-full w-full object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-300">{activity.agentName}</span>
                    <Badge
                      variant="outline"
                      className="text-[8px] py-0 px-1 h-3.5"
                      style={{
                        borderColor: `${typeColors[activity.type]}40`,
                        color: typeColors[activity.type],
                      }}
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400 leading-tight">{activity.action}</p>
                  <p className="mt-0.5 text-[10px] text-slate-600 leading-tight line-clamp-2">{activity.detail}</p>
                  <p className="mt-1 font-mono text-[9px] text-slate-700">{activity.timestamp}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

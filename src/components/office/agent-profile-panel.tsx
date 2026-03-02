"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { type Agent, activities, teamLabels, teamColors } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

interface AgentProfilePanelProps {
  agent: Agent | null
  onClose: () => void
}

export function AgentProfilePanel({ agent, onClose }: AgentProfilePanelProps) {
  const agentActivities = agent ? activities.filter(a => a.agentId === agent.id).slice(0, 5) : []

  return (
    <AnimatePresence>
      {agent && (
        <motion.div
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-slate-200 bg-white shadow-2xl sm:w-96"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="relative h-32 overflow-hidden" style={{ backgroundColor: teamColors[agent.team] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full bg-white/20 p-1.5 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 p-4">
              <div className="h-16 w-16 overflow-hidden rounded-full border-3 border-white shadow-lg">
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="pb-1">
                <h2 className="text-lg font-bold text-white">{agent.name}</h2>
                <p className="text-xs text-white/80">{agent.role} · {teamLabels[agent.team]}</p>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto p-4" style={{ height: "calc(100vh - 128px)" }}>
            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: agent.status === "working" ? "#22c55e" : agent.status === "idle" ? "#94a3b8" : "#ef4444",
                }}
              />
              <span className="text-sm font-semibold capitalize text-slate-700">{agent.status}</span>
              {agent.lastActive && (
                <span className="text-xs text-slate-400">· {agent.lastActive}</span>
              )}
            </div>

            {/* Current Task */}
            {agent.lastTask && (
              <div className="mb-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Task</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{agent.lastTask}</p>
              </div>
            )}

            {/* Bio */}
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">About</p>
              <p className="text-xs leading-relaxed text-slate-600">{agent.bio}</p>
            </div>

            {/* Stats */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                <p className="text-lg font-bold text-slate-800">{agent.stats.tasksCompleted}</p>
                <p className="text-[9px] text-slate-400">Tasks Done</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                <p className="text-sm font-bold text-slate-800">{agent.stats.uptime}</p>
                <p className="text-[9px] text-slate-400">Uptime</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                <p className="text-[10px] font-bold text-slate-800 leading-tight">{agent.stats.specialty}</p>
                <p className="text-[9px] text-slate-400">Specialty</p>
              </div>
            </div>

            {/* Small Council badge */}
            {agent.smallCouncil && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                <span className="text-sm">👑</span>
                <span className="text-xs font-semibold text-amber-800">Small Council Member</span>
              </div>
            )}

            {/* Recent Activity */}
            {agentActivities.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recent Activity</p>
                <div className="space-y-2">
                  {agentActivities.map((activity) => (
                    <div key={activity.id} className="rounded-lg border border-slate-100 p-2.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800">{activity.action}</p>
                        <Badge variant="outline" className="text-[8px]">{activity.type}</Badge>
                      </div>
                      <p className="mt-0.5 text-[10px] text-slate-500">{activity.detail}</p>
                      <p className="mt-1 text-[9px] text-slate-400">{activity.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

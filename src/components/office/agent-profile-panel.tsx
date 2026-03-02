"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { type Agent, activities, teamLabels } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

interface AgentProfilePanelProps {
  agent: Agent | null
  onClose: () => void
}

export function AgentProfilePanel({ agent, onClose }: AgentProfilePanelProps) {
  const agentActivities = agent ? activities.filter(a => a.agentId === agent.id).slice(0, 5) : []
  const teamColor = agent ? neonTeamColors[agent.team] : "#00d4ff"

  return (
    <AnimatePresence>
      {agent && (
        <motion.div
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:w-96"
          style={{
            background: "linear-gradient(180deg, #0d1424 0%, #0a0e1a 100%)",
            borderLeft: `1px solid ${teamColor}20`,
            boxShadow: `-10px 0 30px rgba(0,0,0,0.5), 0 0 15px ${teamColor}10`,
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="relative h-32 overflow-hidden" style={{ background: `linear-gradient(135deg, ${teamColor}20, ${teamColor}05)` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0e1a]" />
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-20 w-40 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: teamColor }} />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-full p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 transition-colors hover:text-white glass"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 p-4">
              <div
                className="h-16 w-16 overflow-hidden rounded-full border-2 shadow-lg"
                style={{ borderColor: teamColor, boxShadow: `0 0 15px ${teamColor}30` }}
              >
                <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="pb-1">
                <h2 className="text-lg font-bold text-white">{agent.name}</h2>
                <p className="text-xs" style={{ color: `${teamColor}99` }}>{agent.role} · {teamLabels[agent.team]}</p>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto p-4" style={{ height: "calc(100vh - 128px)" }}>
            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: agent.status === "working" ? "#00ff88" : "#475569",
                  boxShadow: agent.status === "working" ? "0 0 6px #00ff88" : "none",
                }}
              />
              <span className="text-sm font-semibold capitalize" style={{ color: agent.status === "working" ? "#00ff88" : "#64748b" }}>
                {agent.status}
              </span>
              {agent.lastActive && (
                <span className="text-xs text-slate-600">· {agent.lastActive}</span>
              )}
            </div>

            {/* Current Task */}
            {agent.lastTask && (
              <div className="mb-4 rounded-lg p-3" style={{ background: `${teamColor}08`, border: `1px solid ${teamColor}15` }}>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${teamColor}60` }}>Current Task</p>
                <p className="mt-1 text-sm font-medium text-slate-300">{agent.lastTask}</p>
              </div>
            )}

            {/* Bio */}
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">About</p>
              <p className="text-xs leading-relaxed text-slate-400">{agent.bio}</p>
            </div>

            {/* Stats */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                { value: agent.stats.tasksCompleted, label: "Tasks Done" },
                { value: agent.stats.uptime, label: "Uptime" },
                { value: agent.stats.specialty, label: "Specialty", small: true },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg p-2.5 text-center glass-card">
                  <p className={`font-bold ${stat.small ? "text-[10px] leading-tight" : "text-lg"}`} style={{ color: teamColor }}>
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Small Council badge */}
            {agent.smallCouncil && (
              <div className="mb-4 flex items-center gap-2 rounded-lg p-2.5" style={{ background: "#fbbf2410", border: "1px solid #fbbf2420" }}>
                <span className="text-sm">👑</span>
                <span className="text-xs font-semibold text-amber-400">Small Council Member</span>
              </div>
            )}

            {/* Recent Activity */}
            {agentActivities.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Recent Activity</p>
                <div className="space-y-2">
                  {agentActivities.map((activity) => (
                    <div key={activity.id} className="rounded-lg p-2.5 glass-card">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-300">{activity.action}</p>
                        <Badge variant="outline" className="text-[8px] border-slate-700 text-slate-500">{activity.type}</Badge>
                      </div>
                      <p className="mt-0.5 text-[10px] text-slate-500">{activity.detail}</p>
                      <p className="mt-1 text-[9px] text-slate-700">{activity.timestamp}</p>
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

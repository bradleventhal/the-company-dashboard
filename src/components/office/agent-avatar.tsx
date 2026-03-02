"use client"

import { motion } from "framer-motion"
import { type Agent } from "@/lib/data"
import { type AgentLocation } from "@/lib/office-layout"

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

interface AgentAvatarProps {
  agent: Agent
  position: { x: number; y: number }
  location: AgentLocation
  onClick: () => void
  isSelected: boolean
}

export function AgentAvatar({ agent, position, location, onClick, isSelected }: AgentAvatarProps) {
  const isWorking = agent.status === "working"
  const teamColor = neonTeamColors[agent.team]
  const statusColor = isWorking ? "#00ff88" : "#475569"

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: isSelected ? 50 : 10 }}
      initial={false}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        scale: isSelected ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.8 }}
      onClick={onClick}
      whileHover={{ scale: 1.15, zIndex: 40 }}
    >
      <div className="relative group">
        {/* Glow ring for working agents */}
        {isWorking && (
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ backgroundColor: `${teamColor}15`, boxShadow: `0 0 15px ${teamColor}25` }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* Selection ring */}
        {isSelected && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border-2"
            style={{ borderColor: "#00d4ff", boxShadow: "0 0 10px rgba(0,212,255,0.4)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Photo */}
        <div
          className="relative h-9 w-9 overflow-hidden rounded-full border-2 shadow-lg sm:h-10 sm:w-10"
          style={{
            borderColor: isWorking ? teamColor : "#1e293b",
            boxShadow: isWorking ? `0 0 10px ${teamColor}30` : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
        </div>

        {/* Status dot */}
        <div
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0e1a]"
          style={{
            backgroundColor: statusColor,
            boxShadow: isWorking ? `0 0 6px ${statusColor}` : "none",
          }}
        />

        {/* Name label */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className="rounded px-1 py-0.5 text-[8px] font-bold sm:text-[9px]"
            style={{
              backgroundColor: "rgba(10, 14, 26, 0.85)",
              color: isWorking ? teamColor : "#64748b",
              border: `1px solid ${isWorking ? `${teamColor}20` : "transparent"}`,
            }}
          >
            {agent.name}
          </span>
        </div>

        {/* Hover tooltip */}
        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-lg px-2.5 py-1.5 text-[10px] shadow-xl glass" style={{ boxShadow: `0 0 15px ${teamColor}15` }}>
            <p className="font-bold text-slate-200">{agent.name} · <span style={{ color: teamColor }}>{agent.role}</span></p>
            {agent.lastTask && <p className="mt-0.5 max-w-[200px] truncate text-slate-500">{agent.lastTask}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

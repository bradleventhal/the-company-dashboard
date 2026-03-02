"use client"

import { motion } from "framer-motion"
import { type Agent } from "@/lib/data"
import { type AgentLocation } from "@/lib/office-layout"

interface AgentAvatarProps {
  agent: Agent
  position: { x: number; y: number }
  location: AgentLocation
  onClick: () => void
  isSelected: boolean
}

export function AgentAvatar({ agent, position, location, onClick, isSelected }: AgentAvatarProps) {
  const statusColor = agent.status === "working" ? "#22c55e" : agent.status === "idle" ? "#94a3b8" : "#ef4444"

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
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.15, zIndex: 40 }}
    >
      {/* Hover tooltip */}
      <motion.div
        className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg"
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        style={{ opacity: 0 }}
      >
        <p className="font-bold">{agent.name} · {agent.role}</p>
        {agent.lastTask && <p className="mt-0.5 text-white/60 max-w-[180px] truncate">{agent.lastTask}</p>}
      </motion.div>

      {/* Avatar container */}
      <div className="relative group">
        {/* Pulse ring for working agents */}
        {agent.status === "working" && (
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{ backgroundColor: statusColor }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Selection ring */}
        {isSelected && (
          <motion.div
            className="absolute -inset-1.5 rounded-full border-2"
            style={{ borderColor: "#0f3d6b" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Photo */}
        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-md bg-slate-200 sm:h-10 sm:w-10">
          <img
            src={agent.photo}
            alt={agent.name}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Status dot */}
        <div
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white"
          style={{ backgroundColor: statusColor }}
        />

        {/* Name label */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="rounded bg-white/90 px-1 py-0.5 text-[8px] font-bold text-slate-700 shadow-sm backdrop-blur sm:text-[9px]">
            {agent.name}
          </span>
        </div>

        {/* Task indicator on hover */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-lg bg-slate-900/95 px-2.5 py-1.5 text-[10px] text-white shadow-xl backdrop-blur">
            <p className="font-bold">{agent.name} · {agent.role}</p>
            {agent.lastTask && <p className="mt-0.5 max-w-[200px] truncate text-white/60">{agent.lastTask}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

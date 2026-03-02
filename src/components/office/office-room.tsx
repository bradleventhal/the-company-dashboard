"use client"

import { motion } from "framer-motion"
import { type Room } from "@/lib/office-layout"

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

interface OfficeRoomProps {
  room: Room
  isActive?: boolean
  meetingTitle?: string
  attendeeCount?: number
}

const roomIcons: Record<string, string> = {
  "small-council": "👑",
  "all-hands": "🏢",
  "break-room": "☕",
  "team-executive": "💼",
  "team-product": "🎯",
  "team-creative": "🎨",
  "team-engineering": "⚙️",
  "team-special-ops": "🔥",
}

const roomColors: Record<string, string> = {
  meeting: "#00d4ff",
  break: "#00ff88",
  team: "#a855f7",
}

export function OfficeRoom({ room, isActive, meetingTitle, attendeeCount }: OfficeRoomProps) {
  const teamColor = room.team ? (neonTeamColors[room.team] || roomColors[room.type]) : roomColors[room.type]
  const icon = roomIcons[room.id] || "📍"

  return (
    <motion.div
      className="absolute rounded-xl"
      style={{
        left: `${room.position.x}%`,
        top: `${room.position.y}%`,
        width: `${room.width}%`,
        height: `${room.height}%`,
        border: `1px solid ${isActive ? `${teamColor}40` : "rgba(255,255,255,0.04)"}`,
        backgroundColor: isActive ? `${teamColor}06` : "rgba(255,255,255,0.01)",
        boxShadow: isActive ? `inset 0 0 20px ${teamColor}08, 0 0 15px ${teamColor}05` : "none",
      }}
      animate={isActive ? {
        borderColor: [`${teamColor}40`, `${teamColor}20`, `${teamColor}40`],
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Room label */}
      <div className="absolute left-2 top-1.5 flex items-center gap-1">
        <span className="text-[10px]">{icon}</span>
        <span
          className="text-[9px] font-bold uppercase tracking-wider sm:text-[10px]"
          style={{ color: isActive ? teamColor : "#334155" }}
        >
          {room.name}
        </span>
      </div>

      {/* Meeting indicator */}
      {isActive && meetingTitle && (
        <div className="absolute bottom-1.5 left-2 right-2">
          <div
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5"
            style={{ backgroundColor: `${teamColor}10` }}
          >
            <div className="relative h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: teamColor }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: teamColor, boxShadow: `0 0 4px ${teamColor}` }} />
            </div>
            <span className="truncate text-[8px] font-semibold" style={{ color: teamColor }}>
              {meetingTitle}
            </span>
            {attendeeCount && (
              <span className="ml-auto text-[8px] font-medium" style={{ color: `${teamColor}80` }}>
                {attendeeCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Capacity badge */}
      <div className="absolute right-2 top-1.5">
        <span className="text-[8px] font-medium text-slate-700">
          {room.capacity}
        </span>
      </div>
    </motion.div>
  )
}

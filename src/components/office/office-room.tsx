"use client"

import { motion } from "framer-motion"
import { type Room } from "@/lib/office-layout"
import { teamColors } from "@/lib/data"

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
  meeting: "#0f3d6b",
  break: "#059669",
  team: "#6366f1",
}

export function OfficeRoom({ room, isActive, meetingTitle, attendeeCount }: OfficeRoomProps) {
  const teamColor = room.team ? teamColors[room.team] : roomColors[room.type]
  const icon = roomIcons[room.id] || "📍"

  return (
    <motion.div
      className="absolute rounded-xl border-2 border-dashed"
      style={{
        left: `${room.position.x}%`,
        top: `${room.position.y}%`,
        width: `${room.width}%`,
        height: `${room.height}%`,
        borderColor: isActive ? teamColor : "rgba(148,163,184,0.3)",
        backgroundColor: isActive ? `${teamColor}08` : "rgba(248,250,252,0.5)",
      }}
      animate={isActive ? {
        borderColor: [teamColor, `${teamColor}80`, teamColor],
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {/* Room label */}
      <div className="absolute left-2 top-1.5 flex items-center gap-1">
        <span className="text-[10px]">{icon}</span>
        <span
          className="text-[9px] font-bold uppercase tracking-wider sm:text-[10px]"
          style={{ color: isActive ? teamColor : "#94a3b8" }}
        >
          {room.name}
        </span>
      </div>

      {/* Meeting indicator */}
      {isActive && meetingTitle && (
        <div className="absolute bottom-1.5 left-2 right-2">
          <div
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5"
            style={{ backgroundColor: `${teamColor}15` }}
          >
            <div className="relative h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: teamColor }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: teamColor }} />
            </div>
            <span className="truncate text-[8px] font-semibold" style={{ color: teamColor }}>
              {meetingTitle}
            </span>
            {attendeeCount && (
              <span className="ml-auto text-[8px] font-medium" style={{ color: `${teamColor}99` }}>
                {attendeeCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Capacity badge */}
      <div className="absolute right-2 top-1.5">
        <span className="text-[8px] font-medium text-slate-300">
          {room.capacity} seats
        </span>
      </div>
    </motion.div>
  )
}

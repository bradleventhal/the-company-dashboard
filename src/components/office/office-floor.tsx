"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { agents, type Agent, teamColors } from "@/lib/data"
import { rooms, desks, meetings, getAgentLocation, breakRoomPositions } from "@/lib/office-layout"
import { AgentAvatar } from "./agent-avatar"
import { OfficeRoom } from "./office-room"
import { AgentProfilePanel } from "./agent-profile-panel"

// Floor decorations: plants, water cooler, etc.
const decorations = [
  { emoji: "🪴", x: 33, y: 24 },
  { emoji: "🪴", x: 53, y: 24 },
  { emoji: "🪴", x: 72, y: 24 },
  { emoji: "🖨️", x: 70, y: 64 },
  { emoji: "🪴", x: 30, y: 64 },
  { emoji: "📋", x: 50, y: 64 },
]

export function OfficeFloor() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: true, timeZone: "America/New_York"
      }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const workingAgents = agents.filter(a => a.status === "working")
  const idleAgents = agents.filter(a => a.status === "idle")

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow-sm"
        style={{ paddingBottom: "65%" }}
      >
        <div className="absolute inset-0">
          {/* Grid pattern background */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f3d6b" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Floor label */}
          <div className="absolute left-4 top-3 z-20 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">The Company HQ</span>
            </div>
            <span className="text-[10px] text-slate-300">|</span>
            <span className="font-mono text-[10px] text-slate-400">{time} EST</span>
          </div>

          {/* Legend */}
          <div className="absolute right-4 top-3 z-20 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] text-slate-400">Working ({workingAgents.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="text-[9px] text-slate-400">Idle ({idleAgents.length})</span>
            </div>
          </div>

          {/* Desk area indicators */}
          {/* Executive zone */}
          <div className="absolute rounded-lg border border-dashed opacity-20"
            style={{ left: "4%", top: "24%", width: "26%", height: "42%", borderColor: teamColors.executive, backgroundColor: `${teamColors.executive}05` }}
          />
          <div className="absolute text-[8px] font-bold uppercase tracking-widest opacity-20"
            style={{ left: "6%", top: "62%", color: teamColors.executive }}>Executive</div>

          {/* Product zone */}
          <div className="absolute rounded-lg border border-dashed opacity-20"
            style={{ left: "32%", top: "24%", width: "18%", height: "42%", borderColor: teamColors.product, backgroundColor: `${teamColors.product}05` }}
          />
          <div className="absolute text-[8px] font-bold uppercase tracking-widest opacity-20"
            style={{ left: "34%", top: "62%", color: teamColors.product }}>Product</div>

          {/* Creative zone */}
          <div className="absolute rounded-lg border border-dashed opacity-20"
            style={{ left: "52%", top: "24%", width: "16%", height: "18%", borderColor: teamColors.creative, backgroundColor: `${teamColors.creative}05` }}
          />

          {/* Engineering zone */}
          <div className="absolute rounded-lg border border-dashed opacity-20"
            style={{ left: "52%", top: "36%", width: "16%", height: "18%", borderColor: teamColors.engineering, backgroundColor: `${teamColors.engineering}05` }}
          />

          {/* Special Ops zone */}
          <div className="absolute rounded-lg border border-dashed opacity-20"
            style={{ left: "70%", top: "32%", width: "26%", height: "32%", borderColor: teamColors["special-ops"], backgroundColor: `${teamColors["special-ops"]}05` }}
          />

          {/* Rooms */}
          {rooms.map((room) => {
            const activeMeeting = meetings.find(m => m.roomId === room.id && m.status === "active")
            return (
              <OfficeRoom
                key={room.id}
                room={room}
                isActive={!!activeMeeting}
                meetingTitle={activeMeeting?.title}
                attendeeCount={activeMeeting?.attendees.length}
              />
            )
          })}

          {/* Desk furniture (small rectangles under agents) */}
          {desks.map((desk) => (
            <div
              key={desk.id}
              className="absolute rounded-sm"
              style={{
                left: `${desk.position.x - 1.2}%`,
                top: `${desk.position.y + 4}%`,
                width: "2.8%",
                height: "1.8%",
                backgroundColor: "rgba(148,163,184,0.12)",
                border: "1px solid rgba(148,163,184,0.15)",
              }}
            />
          ))}

          {/* Decorations */}
          {decorations.map((d, i) => (
            <div
              key={i}
              className="absolute text-sm opacity-40"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              {d.emoji}
            </div>
          ))}

          {/* Hallway paths (subtle lines) */}
          <div className="absolute bg-slate-100" style={{ left: "2%", top: "70%", width: "96%", height: "1px" }} />
          <div className="absolute bg-slate-100" style={{ left: "2%", top: "22%", width: "96%", height: "1px" }} />

          {/* Agent avatars */}
          {agents.map((agent) => {
            const { location, position } = getAgentLocation(agent)
            return (
              <AgentAvatar
                key={agent.id}
                agent={agent}
                position={position}
                location={location}
                onClick={() => setSelectedAgent(agent)}
                isSelected={selectedAgent?.id === agent.id}
              />
            )
          })}
        </div>
      </div>

      {/* Agent Profile Slide-out */}
      <AgentProfilePanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />

      {/* Overlay for closing panel */}
      {selectedAgent && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedAgent(null)}
        />
      )}
    </>
  )
}

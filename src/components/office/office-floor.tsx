"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { agents, type Agent, teamColors } from "@/lib/data"
import { rooms, desks, meetings, getAgentLocation, breakRoomPositions } from "@/lib/office-layout"
import { AgentAvatar } from "./agent-avatar"
import { OfficeRoom } from "./office-room"
import { AgentProfilePanel } from "./agent-profile-panel"

const decorations = [
  { emoji: "🪴", x: 33, y: 24 },
  { emoji: "🪴", x: 53, y: 24 },
  { emoji: "🪴", x: 72, y: 24 },
  { emoji: "🖨️", x: 70, y: 64 },
  { emoji: "🪴", x: 30, y: 64 },
  { emoji: "📋", x: 50, y: 64 },
]

const neonTeamColors: Record<string, string> = {
  executive: "#00d4ff",
  product: "#00ff88",
  creative: "#a855f7",
  engineering: "#ff6b2b",
  "special-ops": "#ff3b5c",
}

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
      {/* Mobile: compact agent grid */}
      <div className="block lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-500/60">HQ Floor</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_4px_#00ff88]" />
              <span className="text-[9px] text-slate-500">Online ({workingAgents.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-slate-600" />
              <span className="text-[9px] text-slate-500">Idle ({idleAgents.length})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {agents.map((agent) => {
            const isWorking = agent.status === "working"
            const teamColor = neonTeamColors[agent.team]
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`relative flex flex-col items-center rounded-xl p-2 min-h-[44px] transition-all active:scale-95 ${
                  selectedAgent?.id === agent.id ? "ring-1 ring-cyan-400/50" : ""
                }`}
                style={{
                  background: isWorking
                    ? `linear-gradient(135deg, ${teamColor}15, ${teamColor}08)`
                    : "rgba(15, 22, 41, 0.5)",
                  border: `1px solid ${isWorking ? `${teamColor}30` : "rgba(255,255,255,0.04)"}`,
                }}
              >
                <div className="relative">
                  {isWorking && (
                    <div
                      className="absolute -inset-1 rounded-full animate-pulse-glow"
                      style={{ backgroundColor: `${teamColor}20`, boxShadow: `0 0 10px ${teamColor}30` }}
                    />
                  )}
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 sm:h-11 sm:w-11"
                    style={{ borderColor: isWorking ? teamColor : "#1e293b" }}
                  >
                    <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0e1a]"
                    style={{
                      backgroundColor: isWorking ? "#00ff88" : "#475569",
                      boxShadow: isWorking ? "0 0 6px #00ff88" : "none",
                    }}
                  />
                </div>
                <span className="mt-1.5 text-[9px] font-bold text-slate-400">{agent.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop: full office floor */}
      <div className="relative hidden w-full overflow-hidden rounded-2xl lg:block"
        style={{
          paddingBottom: "65%",
          background: "linear-gradient(135deg, #0b1120 0%, #0a0e1a 50%, #0d1224 100%)",
          border: "1px solid rgba(0, 212, 255, 0.1)",
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.05), inset 0 0 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="absolute inset-0">
          {/* Grid pattern - game map style */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.015] pointer-events-none">
            <div className="h-px w-full bg-cyan-400 animate-[scan-line_8s_linear_infinite]" />
          </div>

          {/* Floor label */}
          <div className="absolute left-4 top-3 z-20 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff] animate-pulse-glow" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-500/50">The Company HQ</span>
            </div>
            <span className="text-[10px] text-slate-700">│</span>
            <span className="font-mono text-[10px] text-cyan-500/40">{time} EST</span>
          </div>

          {/* Legend */}
          <div className="absolute right-4 top-3 z-20 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_4px_#00ff88]" />
              <span className="text-[9px] text-slate-500">Online ({workingAgents.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-slate-600" />
              <span className="text-[9px] text-slate-500">Idle ({idleAgents.length})</span>
            </div>
          </div>

          {/* Team zone indicators */}
          {[
            { team: "executive", left: "4%", top: "24%", width: "26%", height: "42%" },
            { team: "product", left: "32%", top: "24%", width: "18%", height: "42%" },
            { team: "creative", left: "52%", top: "24%", width: "16%", height: "18%" },
            { team: "engineering", left: "52%", top: "36%", width: "16%", height: "18%" },
            { team: "special-ops", left: "70%", top: "32%", width: "26%", height: "32%" },
          ].map((zone) => (
            <div key={zone.team}>
              <div
                className="absolute rounded-lg border border-dashed"
                style={{
                  left: zone.left, top: zone.top, width: zone.width, height: zone.height,
                  borderColor: `${neonTeamColors[zone.team]}15`,
                  backgroundColor: `${neonTeamColors[zone.team]}03`,
                }}
              />
              <div
                className="absolute text-[8px] font-bold uppercase tracking-[0.15em]"
                style={{
                  left: `calc(${zone.left} + 1%)`,
                  top: `calc(${zone.top} + ${zone.height} - 4%)`,
                  color: `${neonTeamColors[zone.team]}30`,
                }}
              >
                {zone.team.replace("-", " ")}
              </div>
            </div>
          ))}

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

          {/* Desk furniture */}
          {desks.map((desk) => (
            <div
              key={desk.id}
              className="absolute rounded-sm"
              style={{
                left: `${desk.position.x - 1.2}%`,
                top: `${desk.position.y + 4}%`,
                width: "2.8%",
                height: "1.8%",
                backgroundColor: `${neonTeamColors[desk.team]}08`,
                border: `1px solid ${neonTeamColors[desk.team]}15`,
              }}
            />
          ))}

          {/* Decorations */}
          {decorations.map((d, i) => (
            <div key={i} className="absolute text-sm opacity-20" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
              {d.emoji}
            </div>
          ))}

          {/* Hallway paths */}
          <div className="absolute" style={{ left: "2%", top: "70%", width: "96%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent)" }} />
          <div className="absolute" style={{ left: "2%", top: "22%", width: "96%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent)" }} />

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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedAgent(null)}
        />
      )}
    </>
  )
}

"use client"

import { agents } from "@/lib/data"
import { meetings, rooms } from "@/lib/office-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function MeetingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200">Meeting Schedule</h1>
        <p className="text-sm text-slate-600">All scheduled and active meetings across The Company</p>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => {
          const room = rooms.find(r => r.id === meeting.roomId)
          const attendeeAgents = meeting.attendees.map(id => agents.find(a => a.id === id)).filter(Boolean)

          return (
            <Card key={meeting.id} className="overflow-hidden" style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex">
                <div
                  className="flex w-20 shrink-0 flex-col items-center justify-center sm:w-24"
                  style={{
                    background: meeting.status === "active"
                      ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))"
                      : "rgba(255,255,255,0.02)",
                  }}
                >
                  <span className={`font-mono text-lg font-bold ${meeting.status === "active" ? "text-cyan-400" : "text-slate-400"}`}>
                    {meeting.time.split(" ")[0]}
                  </span>
                  <span className={`text-[10px] ${meeting.status === "active" ? "text-cyan-500/50" : "text-slate-600"}`}>
                    {meeting.time.split(" ")[1]}
                  </span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-200">{meeting.title}</h3>
                    <Badge
                      variant="outline"
                      className="text-[9px]"
                      style={{
                        borderColor: meeting.status === "active" ? "#00ff8840" : "#1e293b",
                        color: meeting.status === "active" ? "#00ff88" : "#64748b",
                      }}
                    >
                      {meeting.status}
                    </Badge>
                  </div>

                  <p className="mt-0.5 text-xs text-slate-600">
                    📍 {room?.name} · {room?.capacity} seats
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {attendeeAgents.map((agent) => agent && (
                      <div key={agent.id} className="flex items-center gap-1.5 rounded-full px-2 py-1 min-h-[36px] glass">
                        <div className="h-5 w-5 overflow-hidden rounded-full border border-cyan-500/20">
                          <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-300">{agent.name}</span>
                        <span className="text-[9px] text-slate-600">{agent.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Meeting Rooms */}
      <h2 className="mb-4 mt-10 text-lg font-bold text-slate-200">Meeting Rooms</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.filter(r => r.type === "meeting" || r.type === "team").map((room) => {
          const activeMeeting = meetings.find(m => m.roomId === room.id && m.status === "active")
          return (
            <Card key={room.id} style={{ background: "#0f1629", border: "1px solid rgba(255,255,255,0.04)" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200">{room.name}</h3>
                  <span className="text-[10px] text-slate-600">{room.capacity} seats</span>
                </div>
                {activeMeeting ? (
                  <div className="mt-2 flex items-center gap-1.5 rounded-md px-2 py-1" style={{ background: "rgba(0,255,136,0.06)" }}>
                    <div className="relative h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_4px_#00ff88]" />
                    </div>
                    <span className="text-[10px] font-semibold text-green-400">{activeMeeting.title}</span>
                  </div>
                ) : (
                  <p className="mt-2 text-[10px] text-slate-700">Available</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

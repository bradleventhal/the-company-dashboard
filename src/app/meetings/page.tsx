"use client"

import { agents, teamColors, teamLabels } from "@/lib/data"
import { meetings, rooms } from "@/lib/office-layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MeetingsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Meeting Schedule</h1>
        <p className="text-sm text-slate-500">All scheduled and active meetings across The Company</p>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => {
          const room = rooms.find(r => r.id === meeting.roomId)
          const attendeeAgents = meeting.attendees.map(id => agents.find(a => a.id === id)).filter(Boolean)

          return (
            <Card key={meeting.id} className="overflow-hidden">
              <div className="flex">
                {/* Time stripe */}
                <div
                  className="flex w-20 shrink-0 flex-col items-center justify-center sm:w-24"
                  style={{
                    backgroundColor: meeting.status === "active" ? "#0f3d6b" : meeting.status === "scheduled" ? "#f1f5f9" : "#f8fafc",
                  }}
                >
                  <span className={`text-lg font-bold ${meeting.status === "active" ? "text-white" : "text-slate-700"}`}>
                    {meeting.time.split(" ")[0]}
                  </span>
                  <span className={`text-[10px] ${meeting.status === "active" ? "text-white/60" : "text-slate-400"}`}>
                    {meeting.time.split(" ")[1]}
                  </span>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{meeting.title}</h3>
                    <Badge
                      variant={meeting.status === "active" ? "default" : "secondary"}
                      className="text-[9px]"
                    >
                      {meeting.status}
                    </Badge>
                  </div>

                  <p className="mt-0.5 text-xs text-slate-500">
                    📍 {room?.name} · {room?.capacity} seats
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {attendeeAgents.map((agent) => agent && (
                      <div key={agent.id} className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1">
                        <div className="h-5 w-5 overflow-hidden rounded-full border border-white shadow-sm">
                          <img src={agent.photo} alt={agent.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700">{agent.name}</span>
                        <span className="text-[9px] text-slate-400">{agent.role}</span>
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
      <h2 className="mb-4 mt-10 text-lg font-bold text-slate-900">Meeting Rooms</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.filter(r => r.type === "meeting" || r.type === "team").map((room) => {
          const activeMeeting = meetings.find(m => m.roomId === room.id && m.status === "active")
          return (
            <Card key={room.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{room.name}</h3>
                  <span className="text-[10px] text-slate-400">{room.capacity} seats</span>
                </div>
                {activeMeeting ? (
                  <div className="mt-2 flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1">
                    <div className="relative h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800">{activeMeeting.title}</span>
                  </div>
                ) : (
                  <p className="mt-2 text-[10px] text-slate-400">Available</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}

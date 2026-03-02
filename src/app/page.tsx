"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { agents, activities, ventures, teamColors, teamLabels } from "@/lib/data"
import { meetings } from "@/lib/office-layout"
import { OfficeFloor } from "@/components/office/office-floor"
import { LiveFeedPanel } from "@/components/office/live-feed-panel"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

function LiveClock() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "America/New_York" }))
      setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York" }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-right">
      <p className="font-mono text-xl font-bold text-white sm:text-2xl">{time}</p>
      <p className="text-[10px] text-white/40">{date}</p>
    </div>
  )
}

function StatsBar() {
  const working = agents.filter(a => a.status === "working").length
  const idle = agents.filter(a => a.status === "idle").length
  const activeMeetings = meetings.filter(m => m.status === "active").length

  const stats = [
    { label: "Agents", value: agents.length, icon: "👥" },
    { label: "Working", value: working, icon: "🟢", color: "#22c55e" },
    { label: "Idle", value: idle, icon: "💤" },
    { label: "Meetings", value: `${activeMeetings}/${meetings.length}`, icon: "📅" },
    { label: "Ventures", value: ventures.filter(v => v.status === "active").length, icon: "🚀" },
  ]

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className="text-xs">{s.icon}</span>
          <div>
            <p className="text-sm font-bold text-white" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] text-white/30 uppercase tracking-wider">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function MeetingTicker() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {meetings.map((m) => (
        <div
          key={m.id}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5"
        >
          <div className="relative h-1.5 w-1.5">
            {m.status === "active" ? (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </>
            ) : (
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white/30" />
            )}
          </div>
          <span className="text-[10px] font-semibold text-white">{m.title}</span>
          <span className="text-[9px] text-white/40">{m.time}</span>
          <div className="flex -space-x-1">
            {m.attendees.slice(0, 3).map(id => {
              const a = agents.find(ag => ag.id === id)
              return a ? (
                <div key={a.id} className="h-4 w-4 overflow-hidden rounded-full border border-white/30">
                  <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                </div>
              ) : null
            })}
            {m.attendees.length > 3 && (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[7px] font-bold text-white">
                +{m.attendees.length - 3}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [showFeed, setShowFeed] = useState(true)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"

  return (
    <main className="flex h-[calc(100vh-52px)] flex-col overflow-hidden">
      {/* Command Bar */}
      <div style={{ backgroundColor: "#0f3d6b" }}>
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/25">The Company · Virtual Office</p>
              <h1 className="text-base font-bold text-white sm:text-lg">{greeting}, Brad</h1>
            </div>
            <div className="hidden sm:block"><StatsBar /></div>
            <LiveClock />
          </div>
          {/* Mobile stats */}
          <div className="mt-2 sm:hidden"><StatsBar /></div>
          {/* Meeting ticker */}
          <div className="mt-2.5 border-t border-white/10 pt-2.5">
            <MeetingTicker />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Office Floor */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <OfficeFloor />

          {/* Quick links below floor on mobile */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: "📊 ETF Tool", href: "https://etf-tool.vercel.app", desc: "Fund comparison" },
              { label: "👥 Full Roster", href: "/agents", desc: "All 21 agents" },
              { label: "📅 Meetings", href: "/meetings", desc: "Schedule" },
              { label: "📈 Ventures", href: "/ventures", desc: "Business units" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col rounded-xl border border-slate-100 bg-white p-3 transition-all hover:border-slate-200 hover:shadow-sm"
              >
                <span className="text-sm font-semibold text-slate-900">{action.label}</span>
                <span className="mt-0.5 text-[10px] text-slate-400">{action.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Feed sidebar - desktop */}
        <motion.div
          className="hidden border-l border-slate-200 bg-white lg:block"
          initial={{ width: showFeed ? 320 : 0 }}
          animate={{ width: showFeed ? 320 : 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {showFeed && <LiveFeedPanel />}
        </motion.div>
      </div>
    </main>
  )
}

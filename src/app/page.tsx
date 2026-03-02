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
      <p className="font-mono text-xl font-bold text-cyan-400 sm:text-2xl neon-cyan">{time}</p>
      <p className="text-[10px] text-cyan-500/30">{date}</p>
    </div>
  )
}

function StatsBar() {
  const working = agents.filter(a => a.status === "working").length
  const idle = agents.filter(a => a.status === "idle").length
  const activeMeetings = meetings.filter(m => m.status === "active").length

  const stats = [
    { label: "Agents", value: agents.length, icon: "👥", color: "#00d4ff" },
    { label: "Online", value: working, icon: "⚡", color: "#00ff88" },
    { label: "Idle", value: idle, icon: "💤", color: "#64748b" },
    { label: "Meetings", value: `${activeMeetings}/${meetings.length}`, icon: "📡", color: "#a855f7" },
    { label: "Ventures", value: ventures.filter(v => v.status === "active").length, icon: "🚀", color: "#ff6b2b" },
  ]

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className="text-xs">{s.icon}</span>
          <div>
            <p className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[8px] text-slate-600 uppercase tracking-wider">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function MeetingTicker() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {meetings.map((m) => (
        <div
          key={m.id}
          className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 min-h-[44px] glass"
        >
          <div className="relative h-2 w-2">
            {m.status === "active" ? (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_#00ff88]" />
              </>
            ) : (
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-600" />
            )}
          </div>
          <span className="text-[11px] font-semibold text-slate-300">{m.title}</span>
          <span className="text-[10px] text-slate-600 font-mono">{m.time}</span>
          <div className="flex -space-x-1.5">
            {m.attendees.slice(0, 3).map(id => {
              const a = agents.find(ag => ag.id === id)
              return a ? (
                <div key={a.id} className="h-5 w-5 overflow-hidden rounded-full border border-cyan-500/30">
                  <img src={a.photo} alt={a.name} className="h-full w-full object-cover object-top" />
                </div>
              ) : null
            })}
            {m.attendees.length > 3 && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-[8px] font-bold text-cyan-400">
                +{m.attendees.length - 3}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* Floating particles background */
function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/20 animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [showFeed, setShowFeed] = useState(true)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"

  return (
    <main className="relative flex h-[calc(100vh-52px)] flex-col overflow-hidden">
      <Particles />

      {/* Command Bar */}
      <div className="relative z-10 border-b border-cyan-500/10" style={{ background: "linear-gradient(135deg, #0d1424 0%, #0a1628 100%)" }}>
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-500/25">The Company · Virtual Office</p>
              <h1 className="text-base font-bold text-slate-200 sm:text-lg">{greeting}, <span className="text-cyan-400">Brad</span></h1>
            </div>
            <div className="hidden sm:block"><StatsBar /></div>
            <LiveClock />
          </div>
          {/* Mobile stats */}
          <div className="mt-2 sm:hidden overflow-x-auto"><StatsBar /></div>
          {/* Meeting ticker */}
          <div className="mt-2.5 border-t border-cyan-500/10 pt-2.5">
            <MeetingTicker />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Office Floor */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <OfficeFloor />

          {/* Quick links below floor on mobile */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: "📊 ETF Tool", href: "https://etf-tool-three.vercel.app", desc: "Fund comparison", color: "#00d4ff" },
              { label: "👥 Full Roster", href: "/agents", desc: "All 21 agents", color: "#00ff88" },
              { label: "📡 Meetings", href: "/meetings", desc: "Schedule", color: "#a855f7" },
              { label: "🚀 Ventures", href: "/ventures", desc: "Business units", color: "#ff6b2b" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col rounded-xl p-3 min-h-[44px] transition-all glass-card hover:border-cyan-500/20 active:scale-95"
              >
                <span className="text-sm font-semibold text-slate-200">{action.label}</span>
                <span className="mt-0.5 text-[10px]" style={{ color: action.color }}>{action.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Feed sidebar - desktop */}
        <motion.div
          className="hidden border-l border-cyan-500/10 lg:block"
          style={{ backgroundColor: "#0b1120" }}
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

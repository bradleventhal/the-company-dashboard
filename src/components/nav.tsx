"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "🏢 Office" },
  { href: "/agents", label: "Agents" },
  { href: "/meetings", label: "Meetings" },
  { href: "/activity", label: "Activity" },
  { href: "/ventures", label: "Ventures" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="border-b border-cyan-500/10" style={{ background: "linear-gradient(180deg, #0d1424 0%, #0a0e1a 100%)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-cyan-400 animate-neon-flicker">THE COMPANY</span>
          <div className="hidden h-5 w-px bg-cyan-500/20 sm:block" />
          <span className="hidden text-xs font-medium text-cyan-500/40 sm:block">Command Center v5</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition-all min-h-[44px] flex items-center ${
                  active
                    ? "bg-cyan-500/15 text-cyan-400 glow-cyan"
                    : "text-slate-500 hover:text-cyan-400/70 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

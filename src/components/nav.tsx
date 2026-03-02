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
    <header style={{ backgroundColor: "#0f3d6b" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-white">THE COMPANY</span>
          <div className="hidden h-5 w-px bg-white/20 sm:block" />
          <span className="hidden text-xs font-medium text-white/50 sm:block">Command Center</span>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.6)",
                }}
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

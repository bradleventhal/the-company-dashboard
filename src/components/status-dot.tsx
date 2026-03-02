import type { AgentStatus } from "@/lib/data"

const colors: Record<AgentStatus, string> = {
  working: "#22c55e",
  idle: "#94a3b8",
  offline: "#ef4444",
}

export function StatusDot({ status }: { status: AgentStatus }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "working" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: colors[status] }} />
      )}
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[status] }} />
    </span>
  )
}

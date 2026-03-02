import type { AgentStatus } from "@/lib/data"

const colors: Record<AgentStatus, string> = {
  working: "#00ff88",
  idle: "#475569",
  offline: "#ff3b5c",
}

export function StatusDot({ status }: { status: AgentStatus }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "working" && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: colors[status] }}
        />
      )}
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{
          backgroundColor: colors[status],
          boxShadow: status === "working" ? `0 0 6px ${colors[status]}` : "none",
        }}
      />
    </span>
  )
}

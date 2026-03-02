export type AgentStatus = "idle" | "working" | "offline"

export interface Agent {
  id: string
  name: string
  role: string
  title: string
  team: "executive" | "product" | "creative" | "engineering" | "special-ops"
  status: AgentStatus
  lastTask?: string
  lastActive?: string
  avatar: string
  smallCouncil?: boolean
}

export interface Activity {
  id: string
  agentId: string
  agentName: string
  action: string
  detail: string
  timestamp: string
  type: "task" | "communication" | "alert" | "system"
}

export interface Venture {
  id: string
  name: string
  status: "active" | "planning" | "paused"
  description: string
  agents: string[]
  progress: number
}

export const agents: Agent[] = [
  // Executive Suite
  { id: "lebron", name: "LeBron", role: "CEO", title: "Strategy, vision, Brad's single point of contact", team: "executive", status: "working", lastTask: "Building Company Dashboard", lastActive: "Just now", avatar: "👑", smallCouncil: true },
  { id: "wade", name: "Wade", role: "COO", title: "Task routing, deadline enforcement, agent performance", team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🔥", smallCouncil: true },
  { id: "elon", name: "Elon", role: "CTO", title: "Builds everything technical", team: "executive", status: "working", lastTask: "Dashboard development", lastActive: "Just now", avatar: "🚀", smallCouncil: true },
  { id: "cio", name: "CIO", role: "Chief Investment Officer", title: "Long-term strategy, opportunity evaluation", team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🧠", smallCouncil: true },
  { id: "jarvis", name: "Jarvis Landry", role: "Chief of Staff", title: "Calendar, travel, personal logistics", team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "📋" },
  { id: "steward", name: "Steward", role: "Chief Experience Officer", title: "Platform, infrastructure, keeping things running", team: "executive", status: "working", lastTask: "Platform optimization", lastActive: "Just now", avatar: "⚡", smallCouncil: true },

  // Product & Strategy
  { id: "steph", name: "Steph", role: "Product", title: "Roadmap, feature prioritization", team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🎯", smallCouncil: true },
  { id: "cp3", name: "CP3", role: "Territory Strategy", title: "Routing, trip optimization, office targeting", team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "♟️" },
  { id: "marino", name: "Marino", role: "Sales Strategy", title: "Pipeline, meeting prep, talk tracks", team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🏈" },
  { id: "jokic", name: "Jokic", role: "Research", title: "Competitive intel, fund flows, market signals", team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🔬" },
  { id: "jjettas", name: "JJettas", role: "Analytics", title: "Dashboards, charts, data visualization", team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "📊" },

  // Creative & Content
  { id: "mahomes", name: "Mahomes", role: "Creative Director", title: "Brand, tone, visual identity", team: "creative", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🎨" },
  { id: "ai", name: "AI", role: "Content Production", title: "Decks, one-pagers, emails at scale", team: "creative", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "⚔️" },

  // Engineering
  { id: "ohtani", name: "Ohtani", role: "Integrator", title: "APIs, CRM, connecting new tools", team: "engineering", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🔧" },
  { id: "giannis", name: "Giannis", role: "Compliance & Security", title: "Veto power on risk", team: "engineering", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🛡️" },

  // Special Ops
  { id: "achane", name: "Achane", role: "Automation & Efficiency", title: "Eliminates manual work", team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "⚙️" },
  { id: "tyreek", name: "Tyreek", role: "Scout", title: "Finds new tools, opportunities, market gaps", team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "👁️" },
  { id: "brady", name: "Brady", role: "QA & Stress Testing", title: "Last line before anything reaches Brad", team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "✅" },
  { id: "magic", name: "Magic", role: "Partnerships & BD", title: "External relationships, Phase 2", team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—", avatar: "🤝" },
]

export const activities: Activity[] = [
  { id: "1", agentId: "lebron", agentName: "LeBron", action: "Audited ETF Tool codebase", detail: "Cloned repo, analyzed 59 source files, documented full status report", timestamp: "12:24 AM", type: "task" },
  { id: "2", agentId: "lebron", agentName: "LeBron", action: "Pulled IBD data files", detail: "All 4 files copied to workspace: 74K contacts, AUM data, peer groups, office data", timestamp: "12:24 AM", type: "task" },
  { id: "3", agentId: "lebron", agentName: "LeBron", action: "Company architecture finalized", detail: "19 agents across 5 teams, Small Council defined, hierarchy locked in", timestamp: "12:16 AM", type: "system" },
  { id: "4", agentId: "lebron", agentName: "LeBron", action: "Switched to Max subscription", detail: "Auth migrated from API billing to Claude Max $100/month flat", timestamp: "12:05 AM", type: "system" },
  { id: "5", agentId: "elon", agentName: "Elon", action: "Building Company Dashboard", detail: "Next.js app with agent roster, activity feed, ventures, org chart", timestamp: "12:36 AM", type: "task" },
  { id: "6", agentId: "steward", agentName: "Steward", action: "Platform tokens configured", detail: "GitHub and Vercel access secured for deployments", timestamp: "12:41 AM", type: "system" },
  { id: "7", agentId: "lebron", agentName: "LeBron", action: "Memory system initialized", detail: "MEMORY.md, daily logs, USER.md, and IDENTITY.md all created", timestamp: "11:41 PM", type: "system" },
  { id: "8", agentId: "lebron", agentName: "LeBron", action: "First session with Brad", detail: "Company vision aligned, communication style calibrated, operating manual imported", timestamp: "11:00 PM", type: "communication" },
]

export const ventures: Venture[] = [
  { id: "etf-tool", name: "ETF Tool", status: "active", description: "Fund comparison and territory intelligence platform for Angel Oak wholesaling", agents: ["elon", "steph", "cp3", "marino", "jjettas"], progress: 45 },
  { id: "dashboard", name: "Company Dashboard", status: "active", description: "The Company's command center — agent monitoring, activity feeds, venture tracking", agents: ["elon", "lebron", "steward"], progress: 15 },
  { id: "handicapping", name: "Sports Handicapping", status: "planning", description: "AI-powered sports betting model and content page for football season", agents: ["cio", "jokic", "jjettas", "mahomes", "ai"], progress: 0 },
]

export const teamLabels: Record<string, string> = {
  executive: "Executive Suite",
  product: "Product & Strategy",
  creative: "Creative & Content",
  engineering: "Engineering",
  "special-ops": "Special Ops",
}

export const teamColors: Record<string, string> = {
  executive: "#0f3d6b",
  product: "#0e7490",
  creative: "#7c3aed",
  engineering: "#b45309",
  "special-ops": "#dc2626",
}

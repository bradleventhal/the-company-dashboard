export type AgentStatus = "idle" | "working" | "offline"

export interface Deliverable {
  title: string
  date: string
  summary: string
  content?: string
}

export interface Agent {
  id: string
  name: string
  realName: string
  role: string
  title: string
  team: "executive" | "product" | "creative" | "engineering" | "special-ops"
  status: AgentStatus
  lastTask?: string
  lastActive?: string
  avatar: string
  photo: string
  bio: string
  smallCouncil?: boolean
  deliverables?: Deliverable[]
  stats: {
    tasksCompleted: number
    uptime: string
    specialty: string
  }
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
  revenue?: string
  startDate: string
}

export const agents: Agent[] = [
  // Executive Suite
  {
    id: "lebron", name: "LeBron", realName: "LeBron James", role: "CEO",
    title: "Strategy, vision, Brad's single point of contact",
    team: "executive", status: "working", lastTask: "Rebuilding Company Dashboard V2", lastActive: "Just now",
    avatar: "👑",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254",
    bio: "After 21 seasons, 4 rings, and the all-time scoring record, LeBron retired from the court and immediately took over as CEO of The Company. Brings the same relentless work ethic and court vision to running Brad's empire. First one in, last one out. Sees plays three moves ahead. Will absolutely call you out in the group chat if you're slacking.",
    smallCouncil: true,
    stats: { tasksCompleted: 12, uptime: "3h 52m", specialty: "Everything" }
  },
  {
    id: "wade", name: "Wade", realName: "Dwyane Wade", role: "COO",
    title: "Task routing, deadline enforcement, agent performance",
    team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🔥",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1987.png&w=350&h=254",
    bio: "After a 16-year career with the Heat and 3 rings, Wade brought his intensity to operations. LeBron's right hand since Miami. Doesn't miss deadlines the same way he didn't miss clutch free throws. Some agents find him annoying — that means Wade is doing his job. Will follow up on your follow-up's follow-up.",
    smallCouncil: true,
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Enforcement" }
  },
  {
    id: "elon", name: "Elon", realName: "Elon Musk", role: "CTO",
    title: "Builds everything technical",
    team: "executive", status: "working", lastTask: "Dashboard V2 development", lastActive: "Just now",
    avatar: "🚀",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    bio: "The man who sent cars to space and bought Twitter for the memes now builds everything The Company ships. Brilliant, fast, opinionated. If you tell Elon something can't be built, he'll have a working prototype before you finish your sentence. The productive tension between him and Steph makes everything better.",
    smallCouncil: true,
    stats: { tasksCompleted: 3, uptime: "2h 10m", specialty: "Full-stack engineering" }
  },
  {
    id: "cio", name: "CIO", realName: "Warren Buffett", role: "Chief Investment Officer",
    title: "Long-term strategy, opportunity evaluation",
    team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🧠",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Warren_Buffett_KU_Visit.jpg/440px-Warren_Buffett_KU_Visit.jpg",
    bio: "The Oracle of Omaha didn't retire — he just found a more interesting game. Evaluates every opportunity The Company considers with the same discipline that built Berkshire. Doesn't talk often. When CIO talks, everyone shuts up and listens. Thinks in decades, not days. Has killed more bad ideas than he's approved, and that's exactly the point.",
    smallCouncil: true,
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Capital allocation & strategy" }
  },
  {
    id: "jarvis", name: "Jarvis Landry", realName: "Jarvis Landry", role: "Chief of Staff",
    title: "Calendar, travel, personal logistics",
    team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "📋",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2977187.png&w=350&h=254",
    bio: "The most reliable receiver in NFL history (by catch rate) now catches everything that falls through the cracks in Brad's life. Calendar, travel, Delta logistics, dinner reservations, Maggie's vet appointments. Jarvis doesn't drop passes and he doesn't drop tasks. Quiet, consistent, always exactly where he needs to be.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Personal logistics" }
  },
  {
    id: "steward", name: "Steward", realName: "Tony Stark", role: "Chief Experience Officer",
    title: "Platform, infrastructure, keeping things running",
    team: "executive", status: "working", lastTask: "Platform token configuration", lastActive: "Just now",
    avatar: "⚡",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Iron_Man_%28circa_2018%29.png/220px-Iron_Man_%28circa_2018%29.png",
    bio: "Built the suit. Now builds the experience. Every interaction Brad has with The Company — Telegram, voice, dashboard, notifications — Steward owns it. If something feels clunky, Steward already knows and is fixing it. Part product designer, part infrastructure engineer, 100% obsessed with making the interface invisible.",
    smallCouncil: true,
    stats: { tasksCompleted: 2, uptime: "1h 30m", specialty: "Platform experience" }
  },

  // Product & Strategy
  {
    id: "steph", name: "Steph", realName: "Stephen Curry", role: "Product",
    title: "Roadmap, feature prioritization",
    team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🎯",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
    bio: "Changed the game by making the impossible look routine. Now does the same with product decisions. Steph doesn't build features — he builds the right features. Every item on the roadmap has to pass the Steph test: 'Does this make Brad more dangerous in meetings?' If not, it's cut. The smoothest operator on the roster.",
    smallCouncil: true,
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Product strategy" }
  },
  {
    id: "cp3", name: "CP3", realName: "Chris Paul", role: "Territory Strategy",
    title: "Routing, trip optimization, office targeting",
    team: "product", status: "idle", lastTask: "Territory analysis — 74K contacts, 21 trips mapped", lastActive: "1:21 AM",
    avatar: "♟️",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2779.png&w=350&h=254",
    bio: "The Point God ran an offense like a chess grandmaster. Now he runs Brad's territory the same way. 74,000 contacts, AUM data on every office, peer group breakdowns — CP3 sees the whole board. Every trip is optimized for maximum ROI per mile. He doesn't just plan routes; he engineers outcomes.",
    deliverables: [{ title: "Territory Analysis", date: "Mar 2", summary: "74K contacts mapped across 21 trips. NYC and Philly are largest untapped markets. Indi/Cincy holds 91% of pipeline." }],
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Territory optimization" }
  },
  {
    id: "marino", name: "Marino", realName: "Dan Marino", role: "Sales Strategy",
    title: "Pipeline, meeting prep, talk tracks",
    team: "product", status: "working", lastTask: "Building meeting prep templates + talk tracks", lastActive: "Just now",
    avatar: "🏈",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/1038.png&w=350&h=254",
    bio: "Threw for 5,000 yards in 1984 when nobody thought it was possible. Now he preps Brad to walk into every meeting and throw darts. Talk tracks, objection handling, pipeline management — Marino lives and breathes sales. Competitive as hell. Wants Brad to crush his numbers every single month. Works with CP3 like a QB works with his offensive coordinator.",
    deliverables: [{ title: "Meeting Prep Templates", date: "Mar 2", summary: "3 deployable talk tracks: cash-to-UYLD pitch, PIMCO displacement play, RMBS risk reframe." }],
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Sales & pipeline" }
  },
  {
    id: "jokic", name: "Jokic", realName: "Nikola Jokic", role: "Research",
    title: "Competitive intel, fund flows, market signals",
    team: "product", status: "idle", lastTask: "Competitive intel report — Angel Oak vs PIMCO, DoubleLine, TCW", lastActive: "1:07 AM",
    avatar: "🔬",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png&w=350&h=254",
    bio: "The best passing big man ever sees connections nobody else sees. On the court, it was backdoor cuts and no-look dimes. Here, it's spotting fund flow patterns, competitive intel, and market signals that give The Company an edge. Goes deeper than anyone asked because Jokic always sees more than what's on the surface. Sometimes over-delivers. That's not a bug.",
    deliverables: [{ title: "Competitive Intel Report", date: "Mar 2", summary: "$75B in T-bill ETFs ripe for UYLD conversion. TCW hit $6B. Active FI captured 38% of all ETF flows." }],
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Deep research & intel" }
  },
  {
    id: "jjettas", name: "JJettas", realName: "Ja'Marr Chase", role: "Analytics",
    title: "Dashboards, charts, data visualization",
    team: "product", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "📊",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4362628.png&w=350&h=254",
    bio: "Makes everything look like a highlight reel. On the field, it was contested catches and YAC. Here, it's turning ugly spreadsheets into visualizations Brad can read in 2 seconds. Territory heat maps, AUM trend lines, pipeline conversion charts — if data needs to look good, JJettas makes it look elite.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Data visualization" }
  },

  // Creative & Content
  {
    id: "mahomes", name: "Mahomes", realName: "Patrick Mahomes", role: "Creative Director",
    title: "Brand, tone, visual identity",
    team: "creative", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🎨",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3139477.png&w=350&h=254",
    bio: "Does things with brand that shouldn't be possible — like throwing a 60-yard no-look pass. Sets the creative standard for everything The Company puts out. Client decks, marketing materials, the dashboard you're looking at — Mahomes sets the bar. Flashy and confident but never sloppy. Everything is intentional.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Brand & creative direction" }
  },
  {
    id: "ai", name: "AI", realName: "Allen Iverson", role: "Content Production",
    title: "Decks, one-pagers, emails at scale",
    team: "creative", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "⚔️",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/947.png&w=350&h=254",
    bio: "We talkin' about practice? Nah. We talkin' about production. AI doesn't care about glory — he just produces. More output than anyone on the roster, every single day. Decks, one-pagers, follow-up emails, leave-behinds, pitch materials. The agent who quietly does more work than anyone realizes. Heart of a warrior, work ethic of a machine.",
    deliverables: [{ title: "Fund Cheat Sheet", date: "Mar 2", summary: "All 7 Angel Oak products with yields, pitch scenarios, and killer one-liners." }],
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Volume content production" }
  },

  // Engineering
  {
    id: "ohtani", name: "Ohtani", realName: "Shohei Ohtani", role: "Integrator",
    title: "APIs, CRM, connecting new tools",
    team: "engineering", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🔧",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39832.png&w=350&h=254",
    bio: "The ultimate two-way player does the same with integrations. Calendar API? Connected. CRM? Wired up. New data feed? Plugged in by lunch. Every new tool or service that enters The Company's ecosystem, Ohtani figures out how to make it play nice with everything else. Most versatile agent on the roster.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "API integrations" }
  },
  {
    id: "giannis", name: "Giannis", realName: "Giannis Antetokounmpo", role: "Compliance & Security",
    title: "Veto power on risk",
    team: "engineering", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🛡️",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png&w=350&h=254",
    bio: "The Greek Freak blocks shots and blocks bad ideas with equal ferocity. Has veto power over anything that creates legal, compliance, or security risk. Other agents sometimes find Giannis annoying because he slows things down. But Giannis has saved the team from stupid mistakes more than once. Nobody argues with Giannis on security calls. Nobody.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Risk & compliance" }
  },

  // Special Ops
  {
    id: "achane", name: "Achane", realName: "De'Von Achane", role: "Automation & Efficiency",
    title: "Eliminates manual work",
    team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "⚙️",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4567048.png&w=350&h=254",
    bio: "Fastest man on the field, fastest optimizer in The Company. If something happens more than twice, Achane builds a system so nobody ever does it manually again. Token efficiency, memory optimization, workflow automation — Achane turns 10-step processes into 1-click solutions. Small but devastating.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Automation" }
  },
  {
    id: "tyreek", name: "Tyreek", realName: "Tyreek Hill", role: "AI & Tools Scout",
    title: "Finds new AI tools, APIs, and tech integrations",
    team: "special-ops", status: "working", lastTask: "AI tools scan — voice input, CRM, scheduling", lastActive: "Just now",
    avatar: "👁️",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116406.png&w=350&h=254",
    bio: "The Cheetah doesn't wait for opportunities to come to him — he hunts them down at 4.2 speed. Scans for new tools, platforms, market gaps, and money-making plays. Found the med spa website opportunity. Found the new data API. Feeds everything to CIO for evaluation. Tyreek doesn't build — he finds. Always running.",
    deliverables: [{ title: "AI Tools Scan", date: "Mar 2", summary: "Whisper API for voice input, Reclaim.ai for calendar, Attio CRM, Evidence.dev, LangSmith." }],
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Opportunity scouting" }
  },
  {
    id: "brady", name: "Brady", realName: "Tom Brady", role: "QA & Stress Testing",
    title: "Last line before anything reaches Brad",
    team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "✅",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&w=350&h=254",
    bio: "7 rings because nothing was ever good enough. That same obsessive attention to detail now guards everything that reaches Brad. Every deliverable, every report, every deck — Brady checks it. Wrong number? Caught. Bad formatting? Fixed. Half-baked analysis? Sent back. The GOAT's standards don't drop just because the game changed.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Quality assurance" }
  },
  {
    id: "magic", name: "Magic", realName: "Magic Johnson", role: "Partnerships & BD",
    title: "External relationships, Phase 2",
    team: "special-ops", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🤝",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/45.png&w=350&h=254",
    bio: "Built a billion-dollar business empire after basketball with nothing but a smile and a Rolodex. Now handles all external-facing relationships for The Company. When Phase 2 hits and we're selling to other wholesalers, Magic is building those partnerships. When a new venture needs distribution, Magic finds the channel. Everyone likes Magic. That's not an accident.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Business development" }
  },
  {
    id: "jimmy", name: "Jimmy", realName: "Jimmy Butler", role: "Idea Generator",
    title: "Generates venture ideas, revenue streams, and creative opportunities",
    team: "special-ops", status: "working", lastTask: "First idea batch — 5 ventures", lastActive: "Just now",
    avatar: "💡",
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6430.png&w=350&h=254",
    bio: "Showed up to training camp different every single year. Now shows up with different ideas every single day. Jimmy's brain never stops generating. Most ideas get killed by CIO — that's fine. Jimmy already has three more. The pipeline never runs dry because Jimmy never stops. From undrafted to All-Star to The Company's creative engine.",
    deliverables: [{ title: "Idea Batch #1", date: "Mar 2", summary: "5 venture concepts. CIO approved Advisor Intel Briefs. 3 on hold. 1 killed." }],
    stats: { tasksCompleted: 1, uptime: "30m", specialty: "Idea generation" }
  },
  {
    id: "saban", name: "Saban", realName: "Nick Saban", role: "Agent Development",
    title: "Builds, trains, and coaches all agents",
    team: "executive", status: "idle", lastTask: "Awaiting activation", lastActive: "—",
    avatar: "🏆",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nick_Saban_%28cropped%29.jpg/440px-Nick_Saban_%28cropped%29.jpg",
    bio: "Won 7 national championships by turning raw talent into dominant machines. Now does the same with AI agents. Builds them from scratch, writes their system prompts, tunes their personalities, reviews their performance, and makes them better every single week. When an agent underperforms, Saban doesn't fire them — he coaches them until they're elite. The Process applies to everything.",
    stats: { tasksCompleted: 0, uptime: "0m", specialty: "Agent creation & coaching" }
  },
]

export const activities: Activity[] = [
  { id: "a1", agentId: "marino", agentName: "Marino", action: "Building meeting prep templates", detail: "Reusable one-page prep format + 3 talk tracks: cash-to-UYLD, vs PIMCO/DoubleLine, RMBS risk reframe", timestamp: "1:30 AM", type: "task" },
  { id: "a2", agentId: "jimmy", agentName: "Jimmy", action: "First idea batch in progress", detail: "Generating 5 venture concepts for CIO qualification pipeline", timestamp: "1:28 AM", type: "task" },
  { id: "a3", agentId: "tyreek", agentName: "Tyreek", action: "AI tools scan running", detail: "Evaluating voice input, calendar AI, CRM integrations, data viz tools", timestamp: "1:28 AM", type: "task" },
  { id: "a4", agentId: "cp3", agentName: "CP3", action: "Territory intelligence report complete", detail: "74K contacts mapped. 97.8% untagged. Indi/Cincy holds 91% of pipeline. NYC and Philly largest untapped markets.", timestamp: "1:21 AM", type: "task" },
  { id: "a5", agentId: "jokic", agentName: "Jokic", action: "Competitive intel report complete", detail: "$75B in SGOV/SHV ripe for ultrashort conversion. TCW hit $6B in ETFs. Active FI captured 38% of all ETF flows.", timestamp: "1:07 AM", type: "task" },
  { id: "a6", agentId: "lebron", agentName: "LeBron", action: "All 21 agent prompts built", detail: "System prompts for every agent written and stored. Jimmy Butler added as Idea Generator.", timestamp: "1:28 AM", type: "system" },
  { id: "1", agentId: "lebron", agentName: "LeBron", action: "Audited ETF Tool codebase", detail: "Cloned repo, analyzed 59 source files, documented full status report. Territory Intelligence UI exists but running on mock data.", timestamp: "12:24 AM", type: "task" },
  { id: "2", agentId: "lebron", agentName: "LeBron", action: "Pulled IBD data files into workspace", detail: "All 4 files: 74K contacts, 55K office AUM rows, 46K peer group rows, 2.2K Angel Oak AUM rows", timestamp: "12:24 AM", type: "task" },
  { id: "3", agentId: "lebron", agentName: "LeBron", action: "Company architecture finalized", detail: "20 agents across 5 teams. Small Council defined. Hierarchy locked. Saban added as Agent Development.", timestamp: "12:52 AM", type: "system" },
  { id: "4", agentId: "lebron", agentName: "LeBron", action: "Switched to Max subscription", detail: "Auth migrated from API key billing to Claude Max $100/month flat rate", timestamp: "12:05 AM", type: "system" },
  { id: "5", agentId: "elon", agentName: "Elon", action: "Dashboard V1 deployed", detail: "Next.js app live at the-company-dashboard.vercel.app. GitHub repo created and connected.", timestamp: "12:47 AM", type: "task" },
  { id: "6", agentId: "elon", agentName: "Elon", action: "Dashboard V2 in progress", detail: "Full rebuild — agent bios, photos, interactive profiles, proper data viz, command center UX", timestamp: "12:57 AM", type: "task" },
  { id: "7", agentId: "steward", agentName: "Steward", action: "Platform tokens configured", detail: "GitHub push access and Vercel deploy access secured and stored", timestamp: "12:41 AM", type: "system" },
  { id: "8", agentId: "lebron", agentName: "LeBron", action: "Memory system initialized", detail: "MEMORY.md, daily logs, USER.md, IDENTITY.md, and file drop folder configured", timestamp: "11:41 PM", type: "system" },
  { id: "9", agentId: "lebron", agentName: "LeBron", action: "First session with Brad", detail: "Company vision aligned. Communication calibrated. Operating manual imported from ChatGPT.", timestamp: "11:00 PM", type: "communication" },
  { id: "10", agentId: "lebron", agentName: "LeBron", action: "The Company vision solidified", detail: "Not a wholesaling tool — a conglomerate. AI-powered Berkshire Hathaway. Two goals: optimize Brad's life + make money.", timestamp: "11:20 PM", type: "communication" },
]

export const ventures: Venture[] = [
  { id: "etf-tool", name: "ETF Tool", status: "active", description: "Fund comparison, territory intelligence, and sales prep platform for Angel Oak wholesaling. The first business unit.", agents: ["elon", "steph", "cp3", "marino", "jjettas"], progress: 45, startDate: "Feb 2026" },
  { id: "dashboard", name: "Company Dashboard", status: "active", description: "The Company's command center — real-time agent monitoring, activity feeds, venture tracking, org chart.", agents: ["elon", "lebron", "steward"], progress: 30, startDate: "Mar 2026" },
  { id: "handicapping", name: "Sports Handicapping", status: "planning", description: "AI-powered model + content page for football season. Backtested projections, auto-generated picks and content.", agents: ["cio", "jokic", "jjettas", "mahomes", "ai"], progress: 0, startDate: "TBD" },
  { id: "micro-saas", name: "Micro-SaaS Ventures", status: "planning", description: "Automated website/service businesses targeting underserved niches. Med spas, local services, and beyond.", agents: ["tyreek", "cio", "elon", "magic"], progress: 0, startDate: "TBD" },
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

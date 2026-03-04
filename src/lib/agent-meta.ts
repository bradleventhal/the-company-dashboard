/**
 * Static agent metadata — bios, photos, titles, council membership.
 * Separated from live data so syncing registry/levels doesn't overwrite personality.
 */

interface AgentMeta {
  photo: string
  bio: string
  title: string
  realName: string
  smallCouncil?: boolean
}

export const agentMeta: Record<string, AgentMeta> = {
  main: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254",
    bio: "After 21 seasons, 4 rings, and the all-time scoring record, LeBron retired from the court and immediately took over as CEO. Brings the same relentless work ethic and court vision to running Brad's empire. First one in, last one out.",
    title: "Strategy, vision, Brad's single point of contact",
    realName: "LeBron James",
    smallCouncil: true,
  },
  wade: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1987.png&w=350&h=254",
    bio: "After 16 years and 3 rings, Wade brought his intensity to operations. LeBron's right hand since Miami. Will follow up on your follow-up's follow-up.",
    title: "Task routing, deadline enforcement, agent performance",
    realName: "Dwyane Wade",
    smallCouncil: true,
  },
  elon: {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    bio: "The man who sent cars to space now builds everything The Company ships. Brilliant, fast, opinionated. If you tell Elon something can't be built, he'll have a working prototype before you finish your sentence.",
    title: "Builds all code, infrastructure, and deployments",
    realName: "Elon Musk",
    smallCouncil: true,
  },
  cio: {
    photo: "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/league/gfh4gy2ywfuwkusjywia.jpg",
    bio: "Built a dynasty with The Process. Now applies the same systematic thinking to long-term strategy and opportunity evaluation. Doesn't talk often. When McVay talks, everyone shuts up.",
    title: "Long-term strategy, opportunity evaluation",
    realName: "Sean McVay",
    smallCouncil: true,
  },
  jarvis: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2977187.png&w=350&h=254",
    bio: "The most reliable receiver in NFL history (by catch rate) now catches everything that falls through the cracks. Calendar, travel, Delta logistics, dinner reservations. Doesn't drop tasks.",
    title: "Calendar, travel, personal logistics",
    realName: "Jarvis Landry",
  },
  steward: {
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Iron_Man_%28circa_2018%29.png/220px-Iron_Man_%28circa_2018%29.png",
    bio: "Built the suit. Now builds the experience. Every interaction Brad has with The Company — Telegram, voice, dashboard — Steward owns it. 100% obsessed with making the interface invisible.",
    title: "Platform, infrastructure, experience",
    realName: "Tony Stark",
    smallCouncil: true,
  },
  saban: {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nick_Saban_%28cropped%29.jpg/440px-Nick_Saban_%28cropped%29.jpg",
    bio: "Won 7 national championships by turning raw talent into dominant machines. Now does the same with AI agents. When an agent underperforms, Saban coaches them until they're elite. The Process applies to everything.",
    title: "Builds, trains, and coaches all agents",
    realName: "Nick Saban",
  },
  steph: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
    bio: "Changed the game by making the impossible look routine. Steph doesn't build features — he builds the right features. Every item passes the Steph test: 'Does this make Brad more dangerous in meetings?'",
    title: "Roadmap, feature prioritization, specs",
    realName: "Stephen Curry",
    smallCouncil: true,
  },
  cp3: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2779.png&w=350&h=254",
    bio: "The Point God ran an offense like a chess grandmaster. Now he runs Brad's territory the same way. 74K contacts, AUM data on every office — CP3 sees the whole board.",
    title: "Routing, trip optimization, office targeting",
    realName: "Chris Paul",
  },
  marino: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/1038.png&w=350&h=254",
    bio: "Threw for 5,000 yards in 1984 when nobody thought it was possible. Now preps Brad to walk into every meeting and throw darts. Talk tracks, objection handling, pipeline management.",
    title: "Pipeline, meeting prep, talk tracks",
    realName: "Dan Marino",
  },
  jokic: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3112335.png&w=350&h=254",
    bio: "The best passing big man ever sees connections nobody else sees. Spotting fund flow patterns, competitive intel, and market signals. Goes deeper than anyone asked because Jokic always sees more.",
    title: "Competitive intel, fund flows, market signals",
    realName: "Nikola Jokic",
  },
  jjettas: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4362628.png&w=350&h=254",
    bio: "Makes everything look like a highlight reel. Turns ugly spreadsheets into visualizations Brad can read in 2 seconds. Territory heat maps, AUM trends, pipeline charts — JJettas makes data look elite.",
    title: "Dashboards, charts, data visualization",
    realName: "Ja'Marr Chase",
  },
  mahomes: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3139477.png&w=350&h=254",
    bio: "Does things with brand that shouldn't be possible. Sets the creative standard for everything The Company puts out. Flashy and confident but never sloppy. Everything is intentional.",
    title: "Brand, tone, visual identity",
    realName: "Patrick Mahomes",
  },
  ai: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/947.png&w=350&h=254",
    bio: "We talkin' about practice? Nah. We talkin' about production. More output than anyone on the roster. Decks, one-pagers, follow-up emails, leave-behinds, pitch materials. Heart of a warrior.",
    title: "Decks, one-pagers, emails at scale",
    realName: "Allen Iverson",
  },
  ohtani: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/39832.png&w=350&h=254",
    bio: "The ultimate two-way player. Calendar API? Connected. CRM? Wired up. New data feed? Plugged in by lunch. Most versatile agent on the roster.",
    title: "APIs, CRM, connecting new tools",
    realName: "Shohei Ohtani",
  },
  giannis: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png&w=350&h=254",
    bio: "The Greek Freak blocks shots and blocks bad ideas with equal ferocity. Has veto power over anything that creates legal, compliance, or security risk. Nobody argues with Giannis on security calls.",
    title: "Veto power on risk",
    realName: "Giannis Antetokounmpo",
  },
  achane: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4567048.png&w=350&h=254",
    bio: "Fastest man on the field, fastest optimizer in The Company. If something happens more than twice, Achane builds a system so nobody does it manually again. Small but devastating.",
    title: "Eliminates manual work",
    realName: "De'Von Achane",
  },
  tyreek: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3116406.png&w=350&h=254",
    bio: "The Cheetah hunts opportunities at 4.2 speed. Scans for new tools, platforms, market gaps, and money-making plays. Tyreek doesn't build — he finds. Always running.",
    title: "Finds new AI tools, APIs, integrations",
    realName: "Tyreek Hill",
  },
  brady: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&w=350&h=254",
    bio: "7 rings because nothing was ever good enough. Every deliverable, every report, every deck — Brady checks it. Wrong number? Caught. Half-baked analysis? Sent back. The GOAT's standards don't drop.",
    title: "Last line before anything reaches Brad",
    realName: "Tom Brady",
  },
  magic: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/45.png&w=350&h=254",
    bio: "Built a billion-dollar empire after basketball with nothing but a smile and a Rolodex. Handles all external-facing relationships. Everyone likes Magic. That's not an accident.",
    title: "External relationships, Phase 2",
    realName: "Magic Johnson",
  },
  jimmy: {
    photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6430.png&w=350&h=254",
    bio: "Showed up different every single year. Now shows up with different ideas every single day. Most get killed by CIO — that's fine. Jimmy already has three more. The pipeline never runs dry.",
    title: "Venture ideas, revenue streams, creative opportunities",
    realName: "Jimmy Butler",
  },
}

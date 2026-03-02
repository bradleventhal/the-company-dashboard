import { agents, type Agent } from "./data"

export interface Position {
  x: number
  y: number
}

export interface Desk {
  id: string
  agentId: string
  position: Position
  team: string
}

export interface Room {
  id: string
  name: string
  type: "meeting" | "break" | "team"
  position: Position
  width: number
  height: number
  capacity: number
  team?: string
}

export interface Meeting {
  id: string
  roomId: string
  title: string
  attendees: string[]
  time: string
  status: "active" | "scheduled" | "completed"
}

// Office dimensions (percentage-based for responsiveness)
// Layout: rooms on top/sides, desks in the middle open floor

export const rooms: Room[] = [
  { id: "small-council", name: "Small Council Room", type: "meeting", position: { x: 2, y: 2 }, width: 22, height: 20, capacity: 6 },
  { id: "all-hands", name: "All Hands", type: "meeting", position: { x: 76, y: 2 }, width: 22, height: 28, capacity: 21 },
  { id: "break-room", name: "Break Room ☕", type: "break", position: { x: 38, y: 2 }, width: 18, height: 14, capacity: 10 },
  { id: "team-executive", name: "Executive Suite", type: "team", position: { x: 2, y: 76 }, width: 18, height: 22, capacity: 7 },
  { id: "team-product", name: "Product Lab", type: "team", position: { x: 22, y: 76 }, width: 18, height: 22, capacity: 5 },
  { id: "team-creative", name: "Creative Studio", type: "team", position: { x: 42, y: 76 }, width: 18, height: 22, capacity: 3 },
  { id: "team-engineering", name: "Engineering Bay", type: "team", position: { x: 62, y: 76 }, width: 18, height: 22, capacity: 3 },
  { id: "team-special-ops", name: "Special Ops", type: "team", position: { x: 82, y: 76 }, width: 16, height: 22, capacity: 5 },
]

// Desk positions on the open floor (center area)
export const desks: Desk[] = [
  // Executive row (top-left area)
  { id: "desk-lebron", agentId: "lebron", position: { x: 8, y: 28 }, team: "executive" },
  { id: "desk-wade", agentId: "wade", position: { x: 16, y: 28 }, team: "executive" },
  { id: "desk-elon", agentId: "elon", position: { x: 24, y: 28 }, team: "executive" },
  { id: "desk-cio", agentId: "cio", position: { x: 8, y: 40 }, team: "executive" },
  { id: "desk-jarvis", agentId: "jarvis", position: { x: 16, y: 40 }, team: "executive" },
  { id: "desk-steward", agentId: "steward", position: { x: 24, y: 40 }, team: "executive" },
  { id: "desk-saban", agentId: "saban", position: { x: 16, y: 52 }, team: "executive" },

  // Product row
  { id: "desk-steph", agentId: "steph", position: { x: 35, y: 28 }, team: "product" },
  { id: "desk-cp3", agentId: "cp3", position: { x: 43, y: 28 }, team: "product" },
  { id: "desk-marino", agentId: "marino", position: { x: 35, y: 40 }, team: "product" },
  { id: "desk-jokic", agentId: "jokic", position: { x: 43, y: 40 }, team: "product" },
  { id: "desk-jjettas", agentId: "jjettas", position: { x: 39, y: 52 }, team: "product" },

  // Creative
  { id: "desk-mahomes", agentId: "mahomes", position: { x: 55, y: 28 }, team: "creative" },
  { id: "desk-ai", agentId: "ai", position: { x: 63, y: 28 }, team: "creative" },

  // Engineering
  { id: "desk-ohtani", agentId: "ohtani", position: { x: 55, y: 40 }, team: "engineering" },
  { id: "desk-giannis", agentId: "giannis", position: { x: 63, y: 40 }, team: "engineering" },

  // Special Ops
  { id: "desk-achane", agentId: "achane", position: { x: 74, y: 38 }, team: "special-ops" },
  { id: "desk-tyreek", agentId: "tyreek", position: { x: 82, y: 38 }, team: "special-ops" },
  { id: "desk-brady", agentId: "brady", position: { x: 74, y: 50 }, team: "special-ops" },
  { id: "desk-magic", agentId: "magic", position: { x: 82, y: 50 }, team: "special-ops" },
  { id: "desk-jimmy", agentId: "jimmy", position: { x: 90, y: 44 }, team: "special-ops" },
]

// Break room positions for idle agents
export const breakRoomPositions: Position[] = [
  { x: 40, y: 5 }, { x: 44, y: 5 }, { x: 48, y: 5 },
  { x: 40, y: 10 }, { x: 44, y: 10 }, { x: 48, y: 10 },
  { x: 42, y: 8 }, { x: 46, y: 8 }, { x: 50, y: 8 },
  { x: 52, y: 5 },
]

// Meeting room seat positions
export const meetingSeats: Record<string, Position[]> = {
  "small-council": [
    { x: 5, y: 6 }, { x: 11, y: 6 }, { x: 17, y: 6 },
    { x: 5, y: 13 }, { x: 11, y: 13 }, { x: 17, y: 13 },
  ],
  "all-hands": [
    { x: 78, y: 5 }, { x: 82, y: 5 }, { x: 86, y: 5 }, { x: 90, y: 5 }, { x: 94, y: 5 },
    { x: 78, y: 11 }, { x: 82, y: 11 }, { x: 86, y: 11 }, { x: 90, y: 11 }, { x: 94, y: 11 },
    { x: 78, y: 17 }, { x: 82, y: 17 }, { x: 86, y: 17 }, { x: 90, y: 17 }, { x: 94, y: 17 },
    { x: 78, y: 23 }, { x: 82, y: 23 }, { x: 86, y: 23 }, { x: 90, y: 23 }, { x: 94, y: 23 },
    { x: 80, y: 26 },
  ],
}

export const meetings: Meeting[] = [
  {
    id: "m1",
    roomId: "small-council",
    title: "Morning Strategy Sync",
    attendees: ["lebron", "wade", "elon", "steph", "cio", "steward"],
    time: "9:00 AM",
    status: "scheduled",
  },
  {
    id: "m2",
    roomId: "team-product",
    title: "Territory Review",
    attendees: ["steph", "cp3", "marino", "jokic"],
    time: "10:30 AM",
    status: "scheduled",
  },
  {
    id: "m3",
    roomId: "all-hands",
    title: "Company All-Hands",
    attendees: agents.map(a => a.id),
    time: "2:00 PM",
    status: "scheduled",
  },
]

export type AgentLocation = "desk" | "break-room" | "meeting"

export function getAgentLocation(agent: Agent): { location: AgentLocation; position: Position } {
  const desk = desks.find(d => d.agentId === agent.id)

  if (agent.status === "working" && desk) {
    return { location: "desk", position: desk.position }
  }

  if (agent.status === "idle") {
    const idleIndex = agents.filter(a => a.status === "idle").indexOf(agent)
    const breakPos = breakRoomPositions[idleIndex % breakRoomPositions.length]
    return { location: "break-room", position: breakPos }
  }

  // Default to desk
  return { location: "desk", position: desk?.position || { x: 50, y: 50 } }
}

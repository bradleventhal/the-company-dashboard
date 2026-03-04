// Office component types — adapted from OpenClawfice

export type AgentStatus = 'working' | 'idle';
export type Mood = 'great' | 'good' | 'okay' | 'stressed';

export interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
  skinColor?: string;
  shirtColor?: string;
  hairColor?: string;
  status: AgentStatus;
  mood: Mood;
  task?: string;
  thought?: string;
  level: number;
  xp: number;
  needs: { energy: number; output: number; collab: number; queue: number; focus: number };
  skills: { name: string; level: number; icon: string }[];
}

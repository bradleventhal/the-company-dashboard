// Adapted from OpenClawfice utils.ts

import type { Agent, Mood } from './types';

export function randomColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 60%, 55%)`;
}

export function getQuirkyMoodMessage(agent: Agent): string {
  const { mood, status, task } = agent;
  const messages: Record<Mood, string[]> = {
    great: ['✨ In the zone!', '🎯 Peak performance!', '🚀 On fire today!', '💪 Crushing it!'],
    good: ['👍 Steady progress', '☕ Caffeinated & ready', '✅ Getting things done', '🔥 Productive flow'],
    okay: ['😐 Could use coffee', '🤔 Contemplating', '📊 Mildly motivated', '🎲 Rolling with it'],
    stressed: ['😰 Too many tabs open', '🔥 Everything is fine™', '😵 Context switching overload', '⚠️ Mental stack overflow'],
  };
  if (status === 'idle') return '😴 Chillin\' in the lounge';
  if (task) {
    if (task.toLowerCase().includes('bug')) return '🐛 Bug hunting mode';
    if (task.toLowerCase().includes('review')) return '👀 Critic mode activated';
    if (task.toLowerCase().includes('deploy')) return '🚀 Launch sequence initiated';
  }
  const pool = messages[mood];
  return pool[Math.floor(Math.random() * pool.length)];
}

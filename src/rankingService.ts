import { AnonymousRankingUser, RankingSummary } from './types';
import { getRankInfo } from './achievementsData';

const STORAGE_KEY_ANON_USER_ID = 'sentinela_anon_user_id_v1';
const STORAGE_KEY_ANON_NUMBER = 'sentinela_anon_number_v1';
const STORAGE_KEY_RANKING_CACHE = 'sentinela_ranking_cache_v1';
const STORAGE_KEY_COUNT_MILESTONES = 'sentinela_count_milestones_v1';
const STORAGE_KEY_LAST_COUNT_TIME = 'sentinela_last_count_time_v1';

export function formatAnonymousName(num: number): string {
  const padded = String(num).padStart(3, '0');
  return `Anônimo ${padded}`;
}

export function getOrCreateAnonymousIdentity(): { id: string; anonymousNumber: number; displayName: string } {
  let userId = '';
  let anonNum = 0;

  try {
    userId = localStorage.getItem(STORAGE_KEY_ANON_USER_ID) || '';
    const storedNum = localStorage.getItem(STORAGE_KEY_ANON_NUMBER);
    if (storedNum) {
      anonNum = parseInt(storedNum, 10);
    }
  } catch {
    // ignore
  }

  if (!userId) {
    userId = 'usr_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    try {
      localStorage.setItem(STORAGE_KEY_ANON_USER_ID, userId);
    } catch {
      // ignore
    }
  }

  if (!anonNum || isNaN(anonNum)) {
    // Default to 1 if not yet assigned, backend sync will assign an atomic counter or keep local
    anonNum = 1;
    try {
      localStorage.setItem(STORAGE_KEY_ANON_NUMBER, String(anonNum));
    } catch {
      // ignore
    }
  }

  return {
    id: userId,
    anonymousNumber: anonNum,
    displayName: formatAnonymousName(anonNum)
  };
}

export function saveAssignedAnonymousNumber(num: number) {
  try {
    localStorage.setItem(STORAGE_KEY_ANON_NUMBER, String(num));
  } catch {
    // ignore
  }
}

// Initial community participants for realistic school-wide ranking
export const INITIAL_COMMUNITY_PARTICIPANTS: AnonymousRankingUser[] = [
  {
    id: 'usr_seed_014',
    anonymousNumber: 14,
    displayName: 'Anônimo 014',
    unlockedCount: 20,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-15T14:22:10.000Z',
    rankTierTitle: '💎 Mestre Supremo do Bom Senso',
    rankTierEmoji: '💎'
  },
  {
    id: 'usr_seed_027',
    anonymousNumber: 27,
    displayName: 'Anônimo 027',
    unlockedCount: 19,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-16T09:45:00.000Z',
    rankTierTitle: '🔥 Senhor da Proteção & Respeito',
    rankTierEmoji: '🔥'
  },
  {
    id: 'usr_seed_003',
    anonymousNumber: 3,
    displayName: 'Anônimo 003',
    unlockedCount: 18,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-17T11:15:30.000Z',
    rankTierTitle: '💎 Mestre Supremo do Bom Senso',
    rankTierEmoji: '💎'
  },
  {
    id: 'usr_seed_021',
    anonymousNumber: 21,
    displayName: 'Anônimo 021',
    unlockedCount: 16,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-18T16:30:00.000Z',
    rankTierTitle: '💎 Mestre Supremo do Bom Senso',
    rankTierEmoji: '💎'
  },
  {
    id: 'usr_seed_008',
    anonymousNumber: 8,
    displayName: 'Anônimo 008',
    unlockedCount: 15,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-19T08:12:00.000Z',
    rankTierTitle: '💎 Mestre Supremo do Bom Senso',
    rankTierEmoji: '💎'
  },
  {
    id: 'usr_seed_019',
    anonymousNumber: 19,
    displayName: 'Anônimo 019',
    unlockedCount: 15,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-20T10:40:00.000Z', // Later than 008, so ranks after 008
    rankTierTitle: '💎 Mestre Supremo do Bom Senso',
    rankTierEmoji: '💎'
  },
  {
    id: 'usr_seed_005',
    anonymousNumber: 5,
    displayName: 'Anônimo 005',
    unlockedCount: 14,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-21T13:25:00.000Z',
    rankTierTitle: '👑 Lorde Sentinela da Mediação',
    rankTierEmoji: '👑'
  },
  {
    id: 'usr_seed_031',
    anonymousNumber: 31,
    displayName: 'Anônimo 031',
    unlockedCount: 13,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-22T17:05:00.000Z',
    rankTierTitle: '👑 Lorde Sentinela da Mediação',
    rankTierEmoji: '👑'
  },
  {
    id: 'usr_seed_011',
    anonymousNumber: 11,
    displayName: 'Anônimo 011',
    unlockedCount: 12,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-23T14:50:00.000Z',
    rankTierTitle: '👑 Lorde Sentinela da Mediação',
    rankTierEmoji: '👑'
  },
  {
    id: 'usr_seed_022',
    anonymousNumber: 22,
    displayName: 'Anônimo 022',
    unlockedCount: 11,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-24T11:20:00.000Z',
    rankTierTitle: '👑 Lorde Sentinela da Mediação',
    rankTierEmoji: '👑'
  },
  {
    id: 'usr_seed_002',
    anonymousNumber: 2,
    displayName: 'Anônimo 002',
    unlockedCount: 9,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-24T15:10:00.000Z',
    rankTierTitle: '🏆 Guardião da Convivência',
    rankTierEmoji: '🏆'
  },
  {
    id: 'usr_seed_037',
    anonymousNumber: 37,
    displayName: 'Anônimo 037',
    unlockedCount: 7,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-25T09:30:00.000Z',
    rankTierTitle: '🏆 Guardião da Convivência',
    rankTierEmoji: '🏆'
  },
  {
    id: 'usr_seed_042',
    anonymousNumber: 42,
    displayName: 'Anônimo 042',
    unlockedCount: 5,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-25T16:45:00.000Z',
    rankTierTitle: '⚡ Sentinela em Treinamento',
    rankTierEmoji: '⚡'
  },
  {
    id: 'usr_seed_050',
    anonymousNumber: 50,
    displayName: 'Anônimo 050',
    unlockedCount: 3,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: '2026-08-26T10:00:00.000Z',
    rankTierTitle: '⚡ Sentinela em Treinamento',
    rankTierEmoji: '⚡'
  }
];

/**
 * GOLDEN RULE DETERMINISTIC RANKING ALGORITHM
 * 1º Criterion: Total unlocked achievements (descending)
 * 2º Criterion: Timestamp when that achievement count was reached (ascending / earliest first)
 * 3º Criterion: Stable technical identifier (deterministic, never random)
 */
export function sortRankingUsers(users: AnonymousRankingUser[]): AnonymousRankingUser[] {
  return [...users].sort((a, b) => {
    // 1st: Total achievements count
    if (b.unlockedCount !== a.unlockedCount) {
      return b.unlockedCount - a.unlockedCount;
    }

    // 2nd: Earliest timestamp when this count was reached
    const timeA = a.lastCountReachedAt ? new Date(a.lastCountReachedAt).getTime() : Infinity;
    const timeB = b.lastCountReachedAt ? new Date(b.lastCountReachedAt).getTime() : Infinity;

    if (timeA !== timeB) {
      return timeA - timeB;
    }

    // 3rd: Deterministic tiebreaker by anonymous number or ID
    if (a.anonymousNumber !== b.anonymousNumber) {
      return a.anonymousNumber - b.anonymousNumber;
    }

    return (a.id || '').localeCompare(b.id || '');
  }).map((user, idx) => ({
    ...user,
    rankPosition: idx + 1
  }));
}

export function computeRankingSummary(
  allUsers: AnonymousRankingUser[],
  currentUserId: string
): RankingSummary {
  const sorted = sortRankingUsers(allUsers);
  const currentUserIndex = sorted.findIndex(u => u.id === currentUserId);
  const currentUser = currentUserIndex >= 0 ? sorted[currentUserIndex] : {
    id: currentUserId,
    displayName: 'Anônimo 001',
    anonymousNumber: 1,
    unlockedCount: 0,
    totalPossible: 23,
    unlockedAchievements: [],
    lastCountReachedAt: new Date().toISOString(),
    rankPosition: sorted.length + 1
  };

  const topTen = sorted.slice(0, 10).map(u => ({
    ...u,
    isCurrentUser: u.id === currentUserId
  }));

  return {
    totalParticipants: sorted.length,
    currentUserPosition: currentUserIndex >= 0 ? currentUserIndex + 1 : sorted.length + 1,
    topTen,
    currentUser: {
      ...currentUser,
      isCurrentUser: true,
      rankPosition: currentUserIndex >= 0 ? currentUserIndex + 1 : sorted.length + 1
    },
    allRankings: sorted.map(u => ({
      ...u,
      isCurrentUser: u.id === currentUserId
    })),
    lastUpdated: new Date().toISOString()
  };
}

export function getStoredMilestones(): { milestones: Record<number, string>; lastCountTime: string } {
  try {
    const rawMilestones = localStorage.getItem(STORAGE_KEY_COUNT_MILESTONES);
    const milestones = rawMilestones ? JSON.parse(rawMilestones) : {};
    const lastCountTime = localStorage.getItem(STORAGE_KEY_LAST_COUNT_TIME) || new Date().toISOString();
    return { milestones, lastCountTime };
  } catch {
    return { milestones: {}, lastCountTime: new Date().toISOString() };
  }
}

export function updateStoredMilestone(newCount: number): { milestones: Record<number, string>; lastCountTime: string } {
  const { milestones } = getStoredMilestones();
  const now = new Date().toISOString();
  
  if (!milestones[newCount]) {
    milestones[newCount] = now;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY_COUNT_MILESTONES, JSON.stringify(milestones));
    localStorage.setItem(STORAGE_KEY_LAST_COUNT_TIME, now);
  } catch {
    // ignore
  }

  return { milestones, lastCountTime: now };
}

export function getCachedRanking(): AnonymousRankingUser[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RANKING_CACHE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return null;
}

export function setCachedRanking(ranking: AnonymousRankingUser[]) {
  try {
    localStorage.setItem(STORAGE_KEY_RANKING_CACHE, JSON.stringify(ranking));
  } catch {
    // ignore
  }
}

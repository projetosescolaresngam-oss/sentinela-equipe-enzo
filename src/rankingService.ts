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

// Initial community participants - empty list for real user-only tracking
export const INITIAL_COMMUNITY_PARTICIPANTS: AnonymousRankingUser[] = [];

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
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const realUsersOnly = parsed.filter(u => u && u.id && !u.id.startsWith('usr_seed_'));
        return realUsersOnly;
      }
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

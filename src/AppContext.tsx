import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  IncidentReport, 
  AdminNotification, 
  ChatMessage, 
  BullyingCategory, 
  IncidentFrequency, 
  SchoolShift, 
  ReporterRole, 
  UrgencyLevel, 
  ReportStatus,
  Achievement,
  AchievementId,
  EducationalActivityProgress,
  UserQuizProgress,
  AppTab,
  SimulationChoiceTone,
  OutcomeType,
  AnonymousRankingUser,
  RankingSummary,
  UserGamificationProfile,
  LevelInfo,
  DailyMission,
  WeeklyMission,
  XpActivityType,
  UserCosmeticsProfile,
  CosmeticRewardItem,
  CosmeticCategory
} from './types';
import { INITIAL_REPORTS, INITIAL_NOTIFICATIONS } from './initialData';
import { INITIAL_ACHIEVEMENTS, INITIAL_EDUCATIONAL_PROGRESS, getRankInfo } from './achievementsData';
import { 
  DEFAULT_USER_COSMETICS, 
  computeUnlockedCosmeticIds, 
  getCosmeticById, 
  ALL_COSMETIC_REWARDS 
} from './cosmeticsRewards';
import { 
  getOrCreateAnonymousIdentity, 
  saveAssignedAnonymousNumber, 
  updateStoredMilestone, 
  getStoredMilestones, 
  computeRankingSummary, 
  INITIAL_COMMUNITY_PARTICIPANTS, 
  getCachedRanking, 
  setCachedRanking,
  formatAnonymousName
} from './rankingService';
import {
  getLevelDetails,
  getTodayDateString,
  getCurrentWeekKey,
  generateDefaultDailyMissions,
  generateDefaultWeeklyMissions,
  computeBaselineXp,
  MAX_LEVEL
} from './levelProgression';

interface AppContextType {
  reports: IncidentReport[];
  notifications: AdminNotification[];
  chatMessages: ChatMessage[];
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedCategoryDetail: BullyingCategory | null;
  setSelectedCategoryDetail: (cat: BullyingCategory | null) => void;
  lastGeneratedProtocol: string | null;
  setLastGeneratedProtocol: (protocol: string | null) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (auth: boolean) => void;
  isBreathingModalOpen: boolean;
  setIsBreathingModalOpen: (open: boolean) => void;
  isLoadingScreen: boolean;
  setIsLoadingScreen: (loading: boolean) => void;
  
  // Anonymous Profile & Gamification
  userGamificationProfile: UserGamificationProfile;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  profileModalInitialTab: 'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize';
  setProfileModalInitialTab: (tab: 'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize') => void;
  openProfileWithTab: (tab: 'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize') => void;
  newLevelUnlocked: LevelInfo | null;
  dismissLevelUpModal: () => void;
  awardXp: (amount: number, activity: XpActivityType, detail?: string) => void;

  // 🎁 Virtual Rewards & Cosmetics System
  cosmeticsProfile: UserCosmeticsProfile;
  equipCosmetic: (category: CosmeticCategory, itemId: string) => void;
  rewardNotificationQueue: CosmeticRewardItem[];
  dismissRewardNotification: () => void;
  equipRewardFromNotification: (reward: CosmeticRewardItem) => void;

  // Anonymous Ranking System
  rankingSummary: RankingSummary | null;
  anonymousIdentity: { id: string; anonymousNumber: number; displayName: string };
  userRankPosition: number;
  syncUserRanking: (targetAchievements?: Achievement[]) => Promise<void>;
  rankingToast: { show: boolean; title: string; subtitle: string; oldRank?: number; newRank?: number } | null;
  dismissRankingToast: () => void;

  // Achievements & Educational Progress
  achievements: Achievement[];
  educationalProgress: EducationalActivityProgress;
  latestUnlockedAchievement: Achievement | null;
  dismissAchievementModal: () => void;
  markActivityCompleted: (
    activity: 
      | 'viewedLaws' 
      | 'completedQuiz' 
      | 'exploredBullyingType' 
      | 'completedRespectModule' 
      | 'completedBreathingSession'
      | 'interactedWithChat'
      | 'checkedOrCopiedProtocol'
      | 'submittedOrViewedReport',
    param?: string
  ) => void;
  recordQuizCompletion: (
    quizId: string,
    score: number,
    totalQuestions: number
  ) => { isNewRecord: boolean; percentage: number };
  
  // Simulations Progress Actions
  recordSimulationChoice: (
    scenarioId: string, 
    choiceTone: SimulationChoiceTone
  ) => void;
  recordSimulationOutcome: (
    scenarioId: string, 
    outcomeId: string, 
    outcomeType: OutcomeType,
    isSpecialSecret?: boolean
  ) => void;
  
  // Actions
  submitReport: (params: {
    types: BullyingCategory[];
    frequency: IncidentFrequency;
    location: string;
    shift: SchoolShift;
    role: ReporterRole;
    urgency: UrgencyLevel;
    description?: string;
    targetGrade?: string;
    hasEvidenceAttachment?: boolean;
  }) => string; // Returns protocol ID
  
  getReportByProtocol: (protocolId: string) => IncidentReport | undefined;
  addMessageToProtocol: (reportId: string, text: string, sender: 'conselho' | 'estudante', authorRoleTitle?: string) => void;
  updateReportStatus: (reportId: string, status: ReportStatus, adminNotes?: string) => void;
  markNotificationAsRead: (notifId: string) => void;
  sendChatMessage: (content: string) => void;
  clearChat: () => void;
  deleteReport: (reportId: string) => void;
  deleteAllReports: () => void;
  exportReportsCSV: () => void;
  resetAllDataToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_REPORTS = 'sentinela_reports_v3';
const STORAGE_KEY_NOTIFS = 'sentinela_notifs_v3';
const STORAGE_KEY_CHAT = 'sentinela_chat_v3';
const STORAGE_KEY_ACHIEVEMENTS = 'sentinela_achievements_v1';
const STORAGE_KEY_PROGRESS = 'sentinela_edu_progress_v1';
const STORAGE_KEY_GAMIFICATION = 'sentinela_gamification_profile_v2';
const STORAGE_KEY_COSMETICS = 'sentinela_cosmetics_profile_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedCategoryDetail, setSelectedCategoryDetail] = useState<BullyingCategory | null>(null);
  const [lastGeneratedProtocol, setLastGeneratedProtocol] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState<boolean>(false);
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(true);

  // Profile modal and Level Up celebration
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [profileModalInitialTab, setProfileModalInitialTab] = useState<'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize'>('overview');
  const [newLevelUnlocked, setNewLevelUnlocked] = useState<LevelInfo | null>(null);

  const openProfileWithTab = useCallback((tab: 'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize') => {
    setProfileModalInitialTab(tab);
    setIsProfileModalOpen(true);
  }, []);

  const dismissLevelUpModal = useCallback(() => {
    setNewLevelUnlocked(null);
  }, []);

  // 🎁 Cosmetics & Virtual Rewards Profile
  const [cosmeticsProfile, setCosmeticsProfile] = useState<UserCosmeticsProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COSMETICS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_USER_COSMETICS,
          ...parsed,
          unlockedRewardIds: Array.from(new Set([
            ...(DEFAULT_USER_COSMETICS.unlockedRewardIds || []),
            ...(parsed.unlockedRewardIds || [])
          ]))
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_USER_COSMETICS;
  });

  const [rewardNotificationQueue, setRewardNotificationQueue] = useState<CosmeticRewardItem[]>([]);

  // Persist cosmetics
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COSMETICS, JSON.stringify(cosmeticsProfile));
    } catch {
      // ignore
    }
  }, [cosmeticsProfile]);

  // Initialize Achievements from LocalStorage or Default
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial data in case new badges were added
        return INITIAL_ACHIEVEMENTS.map(initialBadge => {
          const found = parsed.find((p: Achievement) => p.id === initialBadge.id);
          return found ? { ...initialBadge, ...found } : initialBadge;
        });
      }
    } catch {
      // ignore
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Initialize Educational Activity Progress
  const [educationalProgress, setEducationalProgress] = useState<EducationalActivityProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_EDUCATIONAL_PROGRESS;
  });

  // Gamification Profile (XP, 20 Levels, Daily and Weekly Missions)
  const [userGamificationProfile, setUserGamificationProfile] = useState<UserGamificationProfile>(() => {
    const today = getTodayDateString();
    const currentWeek = getCurrentWeekKey();

    try {
      const saved = localStorage.getItem(STORAGE_KEY_GAMIFICATION);
      if (saved) {
        const parsed = JSON.parse(saved);
        let dailyMissions = parsed.dailyMissions || [];
        let weeklyMissions = parsed.weeklyMissions || [];

        // Daily reset
        if (parsed.lastDailyResetDate !== today || !dailyMissions.length) {
          dailyMissions = generateDefaultDailyMissions(today);
        }

        // Weekly reset
        if (parsed.lastWeeklyResetKey !== currentWeek || !weeklyMissions.length) {
          weeklyMissions = generateDefaultWeeklyMissions(currentWeek);
        }

        const totalXp = Math.max(0, parsed.totalXp || 0);
        const levelDetails = getLevelDetails(totalXp);

        return {
          totalXp,
          currentLevel: levelDetails.level,
          currentLevelTitle: levelDetails.levelInfo.title,
          currentLevelBadgeEmoji: levelDetails.levelInfo.badgeEmoji,
          xpInCurrentLevel: levelDetails.xpInLevel,
          xpNeededForNextLevel: levelDetails.xpNeededForNext,
          progressPercentInLevel: levelDetails.progressPercent,
          isMaxLevel: levelDetails.isMaxLevel,
          dailyMissions,
          weeklyMissions,
          lastDailyResetDate: today,
          lastWeeklyResetKey: currentWeek,
          xpHistoryCount: parsed.xpHistoryCount || {}
        };
      }
    } catch {
      // ignore
    }

    // Baseline calculation from existing progress so user keeps prior efforts
    const initialBaselineXp = computeBaselineXp(INITIAL_ACHIEVEMENTS, INITIAL_EDUCATIONAL_PROGRESS);
    const initialDetails = getLevelDetails(initialBaselineXp);

    return {
      totalXp: initialBaselineXp,
      currentLevel: initialDetails.level,
      currentLevelTitle: initialDetails.levelInfo.title,
      currentLevelBadgeEmoji: initialDetails.levelInfo.badgeEmoji,
      xpInCurrentLevel: initialDetails.xpInLevel,
      xpNeededForNextLevel: initialDetails.xpNeededForNext,
      progressPercentInLevel: initialDetails.progressPercent,
      isMaxLevel: initialDetails.isMaxLevel,
      dailyMissions: generateDefaultDailyMissions(today),
      weeklyMissions: generateDefaultWeeklyMissions(currentWeek),
      lastDailyResetDate: today,
      lastWeeklyResetKey: currentWeek,
      xpHistoryCount: {}
    };
  });

  // Modal for celebrating latest unlocked badge
  const [latestUnlockedAchievement, setLatestUnlockedAchievement] = useState<Achievement | null>(null);

  const dismissAchievementModal = () => {
    setLatestUnlockedAchievement(null);
  };

  // Initialize reports from LocalStorage or Seed (empty)
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      // Clean legacy caches
      localStorage.removeItem('sentinela_reports_v2');
      localStorage.removeItem('sentinela_reports');
      const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_REPORTS;
  });

  // Initialize notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      // Clean legacy caches
      localStorage.removeItem('sentinela_notifs_v2');
      localStorage.removeItem('sentinela_notifs');
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Initialize emotional chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome-msg',
        sender: 'apoio_ia',
        content: 'Olá! Eu sou a Sentinela, seu assistente de acolhimento e suporte emocional confidencial. Este é um espaço seguro onde você pode desabafar, aprender a se acalmar ou entender seus sentimentos. Como você está se sentindo hoje?',
        timestamp: new Date().toISOString(),
        quickOptions: [
          'Estou muito ansioso(a)',
          'Sofri bullying hoje',
          'Quero fazer um exercício de respiração',
          'Como falar com o Conselho Escolar?'
        ]
      }
    ];
  });

  // Anonymous Ranking Identity & State
  const [anonymousIdentity, setAnonymousIdentity] = useState<{ id: string; anonymousNumber: number; displayName: string }>(() => {
    return getOrCreateAnonymousIdentity();
  });

  const [rankingSummary, setRankingSummary] = useState<RankingSummary | null>(() => {
    const cached = getCachedRanking();
    const identity = getOrCreateAnonymousIdentity();
    const baseList = cached && cached.length > 0 ? cached : INITIAL_COMMUNITY_PARTICIPANTS;
    return computeRankingSummary(baseList, identity.id);
  });

  const [userRankPosition, setUserRankPosition] = useState<number>(() => {
    const cached = getCachedRanking();
    const identity = getOrCreateAnonymousIdentity();
    const baseList = cached && cached.length > 0 ? cached : INITIAL_COMMUNITY_PARTICIPANTS;
    const summary = computeRankingSummary(baseList, identity.id);
    return summary.currentUserPosition;
  });

  const [rankingToast, setRankingToast] = useState<{ show: boolean; title: string; subtitle: string; oldRank?: number; newRank?: number } | null>(null);

  const dismissRankingToast = useCallback(() => {
    setRankingToast(null);
  }, []);

  // Sync User Ranking with Backend API or fallback local store
  const syncUserRanking = useCallback(async (targetAchievements?: Achievement[]) => {
    const currentAchievements = targetAchievements || achievements;
    const unlockedList = currentAchievements.filter(a => a.isUnlocked);
    const count = unlockedList.length;
    const { milestones, lastCountTime } = getStoredMilestones();
    const rankInfo = getRankInfo(count);

    const payload = {
      userId: anonymousIdentity.id,
      anonymousNumber: anonymousIdentity.anonymousNumber,
      unlockedCount: count,
      totalPossible: currentAchievements.length,
      unlockedAchievements: unlockedList.map(a => ({ id: a.id, unlockedAt: a.unlockedAt || lastCountTime })),
      lastCountReachedAt: milestones[count] || lastCountTime,
      countMilestones: milestones,
      rankTierTitle: rankInfo.title,
      rankTierEmoji: rankInfo.badgeEmoji
    };

    try {
      const response = await fetch('/api/ranking/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.assignedIdentity) {
          setAnonymousIdentity(data.assignedIdentity);
          saveAssignedAnonymousNumber(data.assignedIdentity.anonymousNumber);
        }

        const summary: RankingSummary = {
          totalParticipants: data.totalParticipants,
          currentUserPosition: data.currentUserPosition,
          topTen: data.topTen,
          currentUser: {
            id: anonymousIdentity.id,
            displayName: data.assignedIdentity?.displayName || anonymousIdentity.displayName,
            anonymousNumber: data.assignedIdentity?.anonymousNumber || anonymousIdentity.anonymousNumber,
            unlockedCount: count,
            totalPossible: currentAchievements.length,
            unlockedAchievements: payload.unlockedAchievements,
            lastCountReachedAt: payload.lastCountReachedAt,
            rankPosition: data.currentUserPosition,
            rankTierTitle: rankInfo.title,
            rankTierEmoji: rankInfo.badgeEmoji,
            isCurrentUser: true
          },
          allRankings: data.allRankings,
          lastUpdated: data.lastUpdated || new Date().toISOString()
        };

        setRankingSummary(summary);
        setUserRankPosition(data.currentUserPosition);
        setCachedRanking(data.allRankings);
        return;
      }
    } catch {
      // Offline fallback
    }

    // Fallback compute locally
    const cached = getCachedRanking() || INITIAL_COMMUNITY_PARTICIPANTS;
    const updatedList = cached.filter(u => u.id !== anonymousIdentity.id);
    updatedList.push({
      id: anonymousIdentity.id,
      displayName: anonymousIdentity.displayName,
      anonymousNumber: anonymousIdentity.anonymousNumber,
      unlockedCount: count,
      totalPossible: currentAchievements.length,
      unlockedAchievements: payload.unlockedAchievements,
      lastCountReachedAt: payload.lastCountReachedAt,
      rankTierTitle: rankInfo.title,
      rankTierEmoji: rankInfo.badgeEmoji,
      isCurrentUser: true
    });

    const localSummary = computeRankingSummary(updatedList, anonymousIdentity.id);
    setRankingSummary(localSummary);
    setUserRankPosition(localSummary.currentUserPosition);
    setCachedRanking(localSummary.allRankings);
  }, [achievements, anonymousIdentity]);

  // Initial sync on mount
  useEffect(() => {
    syncUserRanking();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
    } catch {
      // ignore
    }
  }, [achievements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(educationalProgress));
    } catch {
      // ignore
    }
  }, [educationalProgress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
    } catch {
      // ignore
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(chatMessages));
    } catch {
      // ignore
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GAMIFICATION, JSON.stringify(userGamificationProfile));
    } catch {
      // ignore
    }
  }, [userGamificationProfile]);

  // 🎁 Check & Award Cosmetic Rewards
  const checkAndAwardCosmetics = useCallback((currentLevel: number, currentAchievements: Achievement[], isInitialSilentCheck = false) => {
    const eligibleUnlockedIds = computeUnlockedCosmeticIds(currentLevel, currentAchievements);
    
    setCosmeticsProfile(prev => {
      const alreadyUnlocked = new Set(prev.unlockedRewardIds || []);
      const newItemsToUnlock: CosmeticRewardItem[] = [];

      eligibleUnlockedIds.forEach(id => {
        if (!alreadyUnlocked.has(id)) {
          alreadyUnlocked.add(id);
          const item = getCosmeticById(id);
          if (item) {
            newItemsToUnlock.push(item);
          }
        }
      });

      if (newItemsToUnlock.length > 0) {
        if (!isInitialSilentCheck) {
          setRewardNotificationQueue(q => [...q, ...newItemsToUnlock]);
        }
        return {
          ...prev,
          unlockedRewardIds: Array.from(alreadyUnlocked)
        };
      }
      return prev;
    });
  }, []);

  // Run initial silent check on mount to ensure user has all eligible cosmetics unlocked
  useEffect(() => {
    checkAndAwardCosmetics(userGamificationProfile.currentLevel, achievements, true);
  }, []);

  // Equip a cosmetic item
  const equipCosmetic = useCallback((category: CosmeticCategory, itemId: string) => {
    setCosmeticsProfile(prev => {
      if (!prev.unlockedRewardIds.includes(itemId)) return prev;
      
      switch (category) {
        case 'frame':
          return { ...prev, equippedFrameId: itemId };
        case 'icon':
          return { ...prev, equippedIconId: itemId };
        case 'title':
          return { ...prev, equippedTitleId: itemId };
        case 'badge':
          return { ...prev, equippedBadgeId: itemId };
        case 'effect':
          return { ...prev, equippedEffectId: itemId };
        case 'theme':
          return { ...prev, equippedThemeId: itemId };
        default:
          return prev;
      }
    });
  }, []);

  // Dismiss reward notification from queue
  const dismissRewardNotification = useCallback(() => {
    setRewardNotificationQueue(prev => prev.slice(1));
  }, []);

  // Equip directly from reward popup and advance queue
  const equipRewardFromNotification = useCallback((reward: CosmeticRewardItem) => {
    equipCosmetic(reward.category, reward.id);
    dismissRewardNotification();
  }, [equipCosmetic, dismissRewardNotification]);

  // Award XP and advance missions + check level ups
  const awardXp = useCallback((amount: number, activity: XpActivityType, _detail?: string) => {
    if (amount <= 0) return;

    setUserGamificationProfile(prev => {
      const oldLevel = prev.currentLevel;
      const today = getTodayDateString();
      const currentWeek = getCurrentWeekKey();

      let dailyMissions = prev.dailyMissions;
      if (prev.lastDailyResetDate !== today || !dailyMissions.length) {
        dailyMissions = generateDefaultDailyMissions(today);
      }

      let weeklyMissions = prev.weeklyMissions;
      if (prev.lastWeeklyResetKey !== currentWeek || !weeklyMissions.length) {
        weeklyMissions = generateDefaultWeeklyMissions(currentWeek);
      }

      let missionBonusXp = 0;

      const updatedDaily = dailyMissions.map(m => {
        if (m.isCompleted) return m;

        let matches = false;
        if (activity === 'quiz_completed' && m.category === 'quiz') matches = true;
        else if (activity === 'simulation_completed' && m.category === 'simulation') matches = true;
        else if (activity === 'education_explored' && m.category === 'education') matches = true;
        else if (activity === 'breathing_session' && m.category === 'breathing') matches = true;

        if (matches) {
          const nextCount = m.currentCount + 1;
          const isNowCompleted = nextCount >= m.targetCount;
          if (isNowCompleted) {
            missionBonusXp += m.rewardXp;
          }
          return {
            ...m,
            currentCount: nextCount,
            isCompleted: isNowCompleted,
            completedAt: isNowCompleted ? new Date().toISOString() : undefined
          };
        }
        return m;
      });

      const updatedWeekly = weeklyMissions.map(wm => {
        if (wm.isCompleted) return wm;

        let matches = false;
        if (activity === 'quiz_completed' && wm.category === 'quiz') matches = true;
        else if (activity === 'simulation_completed' && wm.category === 'simulation') matches = true;
        else if (activity === 'achievement_unlocked' && wm.category === 'achievement') matches = true;

        if (matches) {
          const nextCount = wm.currentCount + 1;
          const isNowCompleted = nextCount >= wm.targetCount;
          if (isNowCompleted) {
            missionBonusXp += wm.rewardXp;
          }
          return {
            ...wm,
            currentCount: nextCount,
            isCompleted: isNowCompleted,
            completedAt: isNowCompleted ? new Date().toISOString() : undefined
          };
        }
        return wm;
      });

      const finalTotalXp = prev.totalXp + amount + missionBonusXp;
      const finalLevelDetails = getLevelDetails(finalTotalXp);

      // Trigger level-up celebratory modal if user stepped up to a higher level
      if (finalLevelDetails.level > oldLevel) {
        setNewLevelUnlocked(finalLevelDetails.levelInfo);
        // Check for newly unlocked cosmetics for this level
        setTimeout(() => {
          checkAndAwardCosmetics(finalLevelDetails.level, achievements);
        }, 300);
      }

      const updatedHistory = {
        ...(prev.xpHistoryCount || {}),
        [activity]: (prev.xpHistoryCount?.[activity] || 0) + 1
      };

      return {
        totalXp: finalTotalXp,
        currentLevel: finalLevelDetails.level,
        currentLevelTitle: finalLevelDetails.levelInfo.title,
        currentLevelBadgeEmoji: finalLevelDetails.levelInfo.badgeEmoji,
        xpInCurrentLevel: finalLevelDetails.xpInLevel,
        xpNeededForNextLevel: finalLevelDetails.xpNeededForNext,
        progressPercentInLevel: finalLevelDetails.progressPercent,
        isMaxLevel: finalLevelDetails.isMaxLevel,
        dailyMissions: updatedDaily,
        weeklyMissions: updatedWeekly,
        lastDailyResetDate: today,
        lastWeeklyResetKey: currentWeek,
        xpHistoryCount: updatedHistory
      };
    });
  }, [achievements, checkAndAwardCosmetics]);

  // Recalculate Achievements Progress and Trigger Unlocks
  const evaluateAchievements = useCallback((progress: EducationalActivityProgress) => {
    setAchievements(prevAchievements => {
      let newlyUnlocked: Achievement | null = null;

      // Count completed quizzes
      const quizzesList = (Object.values(progress.quizzesProgress || {}) as UserQuizProgress[]);
      const completedQuizzesCount = quizzesList.filter(q => q.completed).length;
      
      // Count quizzes with >= 80% accuracy
      const highAccuracyQuizzesCount = quizzesList.filter(
        q => q.completed && q.totalQuestions > 0 && (q.bestScore / q.totalQuestions) >= 0.8
      ).length;

      // Check if any quiz has 100% (perfect score)
      const hasPerfectScoreQuiz = quizzesList.some(
        q => q.completed && q.totalQuestions > 0 && q.bestScore === q.totalQuestions
      );

      // Check Cyberbullying quiz (>=80%)
      const cyberQuiz = progress.quizzesProgress?.['quiz-cyberbullying-digital'];
      const hasCyberHighAccuracy = !!(cyberQuiz && cyberQuiz.completed && cyberQuiz.totalQuestions > 0 && (cyberQuiz.bestScore / cyberQuiz.totalQuestions) >= 0.8);

      // Check Empathy quiz (>=80%)
      const empathyQuiz = progress.quizzesProgress?.['quiz-empatia-respeito'];
      const hasEmpathyHighAccuracy = !!(empathyQuiz && empathyQuiz.completed && empathyQuiz.totalQuestions > 0 && (empathyQuiz.bestScore / empathyQuiz.totalQuestions) >= 0.8);

      // Total questions answered
      const totalQuestionsAnswered = progress.totalQuestionsAnswered || (quizzesList.reduce((sum, q) => sum + (q.attempts * q.totalQuestions), 0));

      // Explored types count
      const exploredTypesCount = progress.exploredBullyingTypes?.length || 0;

      // Breathing sessions count
      const breathingCount = progress.breathingSessionsCount || (progress.completedBreathingSession ? 1 : 0);

      // Count how many badges are already unlocked (for the collector badge)
      const alreadyUnlockedCount = prevAchievements.filter(b => b.id !== 'colecionador_supremo' && b.isUnlocked).length;

      const updated = prevAchievements.map(badge => {
        let currentProgress = badge.currentProgress;
        let isUnlocked = badge.isUnlocked;

        switch (badge.id) {
          case 'conhecedor_direitos': {
            // Calouro Anti-Treta: 1 quiz ou leitura de leis
            const hasCompleted = completedQuizzesCount >= 1 || progress.viewedLaws;
            currentProgress = hasCompleted ? 1 : 0;
            if (hasCompleted && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'aliado_escola_segura': {
            // Trio Parada Firme da Paz: 3 quizzes concluídos
            currentProgress = Math.min(3, completedQuizzesCount);
            if (currentProgress >= 3 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'especialista_respeito': {
            // Cérebro Galáctico do Respeito: 3 quizzes com >= 80%
            currentProgress = Math.min(3, highAccuracyQuizzesCount);
            if (currentProgress >= 3 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'protetor_comunidade': {
            // Gabaritador Lendário: 5 quizzes concluídos
            currentProgress = Math.min(5, completedQuizzesCount);
            if (currentProgress >= 5 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'gabarito_perfeito': {
            // Oráculo do 100%: 1 quiz com 100%
            currentProgress = hasPerfectScoreQuiz ? 1 : 0;
            if (hasPerfectScoreQuiz && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'speedrunner_sabedoria': {
            // Detetive Cibernético: quiz cyberbullying >= 80%
            currentProgress = hasCyberHighAccuracy ? 1 : 0;
            if (hasCyberHighAccuracy && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'enciclopedia_viva': {
            // Maratonista de Neurônios: 20 questões respondidas
            currentProgress = Math.min(20, totalQuestionsAnswered);
            if (currentProgress >= 20 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'explorador_matriz': {
            // Curioso Nível Hard: 7 tipos explorados
            currentProgress = Math.min(7, exploredTypesCount);
            if (currentProgress >= 7 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'advogado_do_bem': {
            // Doutor em Não-Vacilo: Leis lidas
            currentProgress = progress.viewedLaws ? 1 : 0;
            if (progress.viewedLaws && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'coracao_de_ouro': {
            // Embaixador da Empatia: Módulo de Respeito concluído
            currentProgress = progress.completedRespectModule ? 1 : 0;
            if (progress.completedRespectModule && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'campeao_inclusao': {
            // Radar Anti-Exclusão Social: Quiz empatia >= 80%
            currentProgress = hasEmpathyHighAccuracy ? 1 : 0;
            if (hasEmpathyHighAccuracy && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'mente_tranquila': {
            // Monge Zen: 1 sessão de respiração
            currentProgress = progress.completedBreathingSession ? 1 : 0;
            if (progress.completedBreathingSession && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'mestre_zen': {
            // Pulmão de Aço da Serenidade: 3 sessões de respiração
            currentProgress = Math.min(3, breathingCount);
            if (currentProgress >= 3 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'desabafo_seguro': {
            // Coração Leve, Mente Clara: Interação com chat
            currentProgress = progress.interactedWithChat ? 1 : 0;
            if (progress.interactedWithChat && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'guardiao_digital': {
            // Agente Secreto do Protocolo: Consulta ou cópia
            currentProgress = progress.checkedOrCopiedProtocol ? 1 : 0;
            if (progress.checkedOrCopiedProtocol && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'radar_antizueira': {
            // Escudo Guardião Ativado: Relato ou consulta
            currentProgress = progress.submittedOrViewedReport ? 1 : 0;
            if (progress.submittedOrViewedReport && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'sentinela_noturno': {
            // Sentinela Noturno da Paz: Atividade na plataforma
            currentProgress = 1;
            if (!isUnlocked) isUnlocked = true;
            break;
          }
          case 'primeiro_passo_simulacao': {
            // Protagonista da Empatia: 1 simulação concluída
            const simCount = progress.completedSimulations?.length || 0;
            currentProgress = Math.min(1, simCount);
            if (simCount >= 1 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'olhar_empatico': {
            // Coração de Escudo & Acolhimento: 3 escolhas de empatia
            const empCount = progress.empathyChoicesCount || 0;
            currentProgress = Math.min(3, empCount);
            if (empCount >= 3 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'decisao_segura': {
            // Estrategista da Proteção: 3 simulações voltadas à segurança
            const safeCount = progress.safetyChoicesCount || 0;
            currentProgress = Math.min(3, safeCount);
            if (safeCount >= 3 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'pensador_estrategico': {
            // Mestre do Multiverso Escolar: 2 ou mais finais explorados em um mesmo cenário
            const stratCount = progress.strategicExplorationsCount || 0;
            currentProgress = Math.min(2, stratCount > 0 ? 2 : 0);
            if (stratCount >= 1 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'guardiao_comunidade_sim': {
            // Guardião Supremo da Convivência: 10 simulações concluídas
            const totalSims = progress.completedSimulations?.length || 0;
            currentProgress = Math.min(10, totalSims);
            if (totalSims >= 10 && !isUnlocked) isUnlocked = true;
            break;
          }
          case 'colecionador_supremo': {
            // Lorde Supremo dos Distintivos: 10 badges
            currentProgress = Math.min(10, alreadyUnlockedCount);
            if (currentProgress >= 10 && !isUnlocked) isUnlocked = true;
            break;
          }
          default:
            break;
        }

        // If newly unlocked in this run
        if (isUnlocked && !badge.isUnlocked) {
          const unlockedBadge: Achievement = {
            ...badge,
            isUnlocked: true,
            currentProgress,
            unlockedAt: new Date().toISOString()
          };
          if (!newlyUnlocked) {
            newlyUnlocked = unlockedBadge;
          }
          return unlockedBadge;
        }

        return {
          ...badge,
          currentProgress,
          isUnlocked
        };
      });

      if (newlyUnlocked) {
        setLatestUnlockedAchievement(newlyUnlocked);
        const unlockedCount = updated.filter(a => a.isUnlocked).length;
        updateStoredMilestone(unlockedCount);
        // Award XP for badge unlock (+50 XP)
        awardXp(50, 'achievement_unlocked', newlyUnlocked.id);
        // Check for newly unlocked cosmetic items linked to this achievement
        setTimeout(() => {
          checkAndAwardCosmetics(userGamificationProfile.currentLevel, updated);
        }, 300);
        // Trigger rank sync asynchronously
        setTimeout(() => {
          syncUserRanking(updated);
        }, 100);
      }

      return updated;
    });
  }, [syncUserRanking, awardXp, checkAndAwardCosmetics, userGamificationProfile.currentLevel]);

  // Action to record quiz completion with score calculation & best score tracking
  const recordQuizCompletion = (
    quizId: string,
    score: number,
    totalQuestions: number
  ): { isNewRecord: boolean; percentage: number } => {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    let isNewRecord = false;

    setEducationalProgress(prev => {
      const existing = prev.quizzesProgress?.[quizId];
      const previousBest = existing ? existing.bestScore : 0;
      isNewRecord = !existing || score > previousBest;

      const updatedQuizRecord = {
        quizId,
        completed: true,
        attempts: (existing?.attempts || 0) + 1,
        lastScore: score,
        bestScore: Math.max(previousBest, score),
        totalQuestions,
        lastCompletedAt: new Date().toISOString()
      };

      const updatedQuizzesProgress = {
        ...(prev.quizzesProgress || {}),
        [quizId]: updatedQuizRecord
      };

      const totalCompleted = (Object.values(updatedQuizzesProgress) as UserQuizProgress[]).filter(q => q.completed).length;

      const nextProgress: EducationalActivityProgress = {
        ...prev,
        completedQuiz: true,
        quizzesProgress: updatedQuizzesProgress,
        totalQuizzesCompleted: totalCompleted,
        totalQuestionsAnswered: (prev.totalQuestionsAnswered || 0) + totalQuestions
      };

      evaluateAchievements(nextProgress);
      return nextProgress;
    });

    // Award +50 XP for quiz completion
    awardXp(50, 'quiz_completed', quizId);

    return { isNewRecord, percentage };
  };

  // Action to mark educational activities
  const markActivityCompleted = (
    activity: 
      | 'viewedLaws' 
      | 'completedQuiz' 
      | 'exploredBullyingType' 
      | 'completedRespectModule' 
      | 'completedBreathingSession'
      | 'interactedWithChat'
      | 'checkedOrCopiedProtocol'
      | 'submittedOrViewedReport',
    param?: string
  ) => {
    setEducationalProgress(prev => {
      let next = { ...prev };
      if (activity === 'viewedLaws') {
        next.viewedLaws = true;
        awardXp(30, 'education_explored', 'laws');
      } else if (activity === 'completedQuiz') {
        next.completedQuiz = true;
      } else if (activity === 'exploredBullyingType' && param) {
        if (!next.exploredBullyingTypes.includes(param)) {
          next.exploredBullyingTypes = [...next.exploredBullyingTypes, param];
          awardXp(30, 'education_explored', param);
        }
      } else if (activity === 'completedRespectModule') {
        next.completedRespectModule = true;
        awardXp(30, 'education_explored', 'respect_module');
      } else if (activity === 'completedBreathingSession') {
        next.completedBreathingSession = true;
        next.breathingSessionsCount = (next.breathingSessionsCount || 0) + 1;
        awardXp(30, 'breathing_session', 'breathing');
      } else if (activity === 'interactedWithChat') {
        next.interactedWithChat = true;
        awardXp(10, 'chat_reflection', 'chat');
      } else if (activity === 'checkedOrCopiedProtocol') {
        next.checkedOrCopiedProtocol = true;
      } else if (activity === 'submittedOrViewedReport') {
        next.submittedOrViewedReport = true;
        awardXp(20, 'report_drafted', 'report');
      }
      
      evaluateAchievements(next);
      return next;
    });
  };

  // Record simulation individual choices
  const recordSimulationChoice = (
    _scenarioId: string,
    choiceTone: SimulationChoiceTone
  ) => {
    setEducationalProgress(prev => {
      const isEmpathy = choiceTone === 'empatia' || choiceTone === 'apoio';
      const isSafety = choiceTone === 'seguranca' || choiceTone === 'reflexao';

      const next: EducationalActivityProgress = {
        ...prev,
        totalSimulationChoicesMade: (prev.totalSimulationChoicesMade || 0) + 1,
        empathyChoicesCount: (prev.empathyChoicesCount || 0) + (isEmpathy ? 1 : 0),
        safetyChoicesCount: (prev.safetyChoicesCount || 0) + (isSafety ? 1 : 0)
      };
      evaluateAchievements(next);
      return next;
    });
  };

  // Record simulation scenario completion and outcome discovery
  const recordSimulationOutcome = (
    scenarioId: string,
    outcomeId: string,
    _outcomeType: OutcomeType,
    isSpecialSecret?: boolean
  ) => {
    setEducationalProgress(prev => {
      const prevCompleted = prev.completedSimulations || [];
      const isNewCompletion = !prevCompleted.includes(scenarioId);
      const nextCompleted = isNewCompletion ? [...prevCompleted, scenarioId] : prevCompleted;

      const prevOutcomesMap = prev.exploredSimulationOutcomes || {};
      const currentScenarioOutcomes = prevOutcomesMap[scenarioId] || [];
      const isNewOutcome = !currentScenarioOutcomes.includes(outcomeId);
      const nextScenarioOutcomes = isNewOutcome 
        ? [...currentScenarioOutcomes, outcomeId] 
        : currentScenarioOutcomes;

      const nextOutcomesMap = {
        ...prevOutcomesMap,
        [scenarioId]: nextScenarioOutcomes
      };

      // Check how many scenarios have >= 2 outcomes explored (strategic thinking)
      const scenariosWithMultipleOutcomes = (Object.values(nextOutcomesMap) as string[][]).filter(
        outcomes => outcomes && outcomes.length >= 2
      ).length;

      const secretBonus = (isSpecialSecret && isNewOutcome) ? 1 : 0;

      const next: EducationalActivityProgress = {
        ...prev,
        completedSimulations: nextCompleted,
        exploredSimulationOutcomes: nextOutcomesMap,
        strategicExplorationsCount: scenariosWithMultipleOutcomes,
        discoveredSecretOutcomesCount: (prev.discoveredSecretOutcomesCount || 0) + secretBonus
      };

      evaluateAchievements(next);
      return next;
    });

    // Award +40 XP for simulation completion
    awardXp(40, 'simulation_completed', scenarioId);
  };

  // Submit anonymous report
  const submitReport = (params: {
    types: BullyingCategory[];
    frequency: IncidentFrequency;
    location: string;
    shift: SchoolShift;
    role: ReporterRole;
    urgency: UrgencyLevel;
    description?: string;
    targetGrade?: string;
    hasEvidenceAttachment?: boolean;
  }): string => {
    // Generate unique anonymous protocol ID (e.g. SEC-2026-X841)
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const protocolId = `SEC-2026-${letter}${randomHex}`;

    const newReport: IncidentReport = {
      id: protocolId,
      types: params.types,
      frequency: params.frequency,
      location: params.location,
      shift: params.shift,
      role: params.role,
      urgency: params.urgency,
      description: params.description || '',
      targetGrade: params.targetGrade || 'Não informado',
      hasEvidenceAttachment: !!params.hasEvidenceAttachment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'novo',
      messages: []
    };

    setReports(prev => [newReport, ...prev]);
    setLastGeneratedProtocol(protocolId);
    markActivityCompleted('submittedOrViewedReport');

    // Create admin notification
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      reportId: protocolId,
      title: params.urgency === 'critica_sos' 
        ? '⚠️ ALERTA SOS: Denúncia de Emergência Registrada' 
        : `Nova Denúncia #${protocolId}`,
      message: `Incidente de ${params.types.join(', ')} relatado em ${params.location}.`,
      urgency: params.urgency,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);

    return protocolId;
  };

  const getReportByProtocol = (protocolId: string): IncidentReport | undefined => {
    const cleanId = protocolId.trim().toUpperCase();
    const found = reports.find(r => r.id.toUpperCase() === cleanId);
    if (found) {
      markActivityCompleted('checkedOrCopiedProtocol');
    }
    return found;
  };

  const addMessageToProtocol = (
    reportId: string, 
    text: string, 
    sender: 'conselho' | 'estudante',
    authorRoleTitle?: string
  ) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender,
          authorRoleTitle: sender === 'conselho' ? (authorRoleTitle || 'Conselho Escolar') : undefined,
          text,
          timestamp: new Date().toISOString()
        };
        return {
          ...rep,
          updatedAt: new Date().toISOString(),
          messages: [...rep.messages, newMsg]
        };
      }
      return rep;
    }));
  };

  const updateReportStatus = (reportId: string, status: ReportStatus, adminNotes?: string) => {
    setReports(prev => prev.map(rep => {
      if (rep.id === reportId) {
        return {
          ...rep,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : rep.adminNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return rep;
    }));
  };

  const markNotificationAsRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const sendChatMessage = async (userContent: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'usuario',
      content: userContent,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    markActivityCompleted('interactedWithChat');

    const fallbackResponse = (text: string): { reply: string; quickOptions: string[] } => {
      const lower = text.toLowerCase();
      if (lower.includes('ansios') || lower.includes('medo') || lower.includes('nervos') || lower.includes('panico')) {
        return {
          reply: 'É perfeitamente compreensível você se sentir assim. Respire fundo: você está seguro(a) aqui e não está sozinho(a). Gostaria de fazer uma breve pausa com nosso exercício de respiração guiada ou prefere que eu te oriente sobre como relatar o que aconteceu?',
          quickOptions: ['Fazer exercício de respiração', 'Quero denunciar anonimamente', 'Como falar com o CVV 188?']
        };
      } else if (lower.includes('respir') || lower.includes('calma') || lower.includes('exercicio')) {
        setIsBreathingModalOpen(true);
        return {
          reply: 'Excelente escolha. A técnica de respiração 4-7-8 ajuda a desacelerar seus batimentos e trazer alívio para a mente. Você pode abrir o exercício interativo clicando no botão abaixo ou nas ferramentas rápidas!',
          quickOptions: ['Abrir Respiração Guiada', 'Fazer Denúncia Anônima', 'Ver Tipos de Bullying']
        };
      } else if (lower.includes('denunci') || lower.includes('conselho') || lower.includes('fazer')) {
        return {
          reply: 'Você pode registrar uma denúncia totalmente anônima clicando na aba "Fazer Denúncia". O sistema gera um código de protocolo secreto que só você tem acesso, permitindo receber respostas do conselho escolar sem ninguém saber quem você é.',
          quickOptions: ['Ir para Formulário de Denúncia', 'Como funciona o sigilo?', 'Ver Tipos de Bullying']
        };
      } else if (lower.includes('cvv') || lower.includes('188') || lower.includes('ajuda') || lower.includes('morrer') || lower.includes('suicid')) {
        return {
          reply: 'Sua vida e seu bem-estar são preciosos. Se você estiver passando por um momento de grande dor ou desespero, por favor ligue agora mesmo para o CVV no número 188 (ligação gratuita 24h) ou busque a sala de orientação da escola. Há pessoas prontas para te ouvir com carinho e respeito.',
          quickOptions: ['Ligar para o CVV 188', 'Fazer Denúncia Anônima', 'Conversar mais']
        };
      }
      return {
        reply: 'Estou ouvindo você. Lembre-se: você tem direito a um ambiente escolar onde seja respeitado(a) e valorizado(a). Se algo estiver te machucando ou a algum colega, o Sentinela Escolar existe exatamente para te apoiar com total sigilo.',
        quickOptions: ['Fazer Denúncia Anônima', 'Identificar se é Bullying', 'Exercício de Respiração']
      };
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userContent,
          history: chatMessages.slice(-6)
        })
      });

      if (!response.ok) {
        throw new Error('Falha no endpoint da IA');
      }

      const data = await response.json();
      if (data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'apoio_ia',
          content: data.reply,
          timestamp: new Date().toISOString(),
          quickOptions: data.quickOptions || ['Fazer Denúncia Anônima', 'Acompanhar Protocolo', 'Exercício de Respiração']
        };
        setChatMessages(prev => [...prev, botMsg]);
        return;
      }
    } catch {
      // Fallback gracioso offline/local
      const fallback = fallbackResponse(userContent);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'apoio_ia',
        content: fallback.reply,
        timestamp: new Date().toISOString(),
        quickOptions: fallback.quickOptions
      };
      setChatMessages(prev => [...prev, botMsg]);
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'apoio_ia',
        content: 'Conversa reiniciada. Como posso te apoiar neste momento?',
        timestamp: new Date().toISOString(),
        quickOptions: [
          'Estou muito ansioso(a)',
          'Sofri bullying hoje',
          'Quero fazer um exercício de respiração'
        ]
      }
    ]);
  };

  const exportReportsCSV = () => {
    const headers = ['Protocolo', 'Tipos', 'Frequência', 'Local', 'Turno', 'Papel', 'Urgência', 'Status', 'Data_Criacao', 'Descricao'];
    const rows = reports.map(r => [
      r.id,
      `"${r.types.join('; ')}"`,
      r.frequency,
      `"${r.location}"`,
      r.shift,
      r.role,
      r.urgency,
      r.status,
      r.createdAt,
      `"${(r.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_estatistico_bullying_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    setNotifications(prev => prev.filter(n => n.reportId !== reportId));
  };

  const deleteAllReports = () => {
    setReports([]);
    setNotifications([]);
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
  };

  const resetAllDataToDefault = () => {
    setReports(INITIAL_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setEducationalProgress(INITIAL_EDUCATIONAL_PROGRESS);
    clearChat();
    localStorage.removeItem(STORAGE_KEY_REPORTS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
    localStorage.removeItem(STORAGE_KEY_CHAT);
    localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
  };

  return (
    <AppContext.Provider value={{
      reports,
      notifications,
      chatMessages,
      activeTab,
      setActiveTab,
      selectedCategoryDetail,
      setSelectedCategoryDetail,
      lastGeneratedProtocol,
      setLastGeneratedProtocol,
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      isBreathingModalOpen,
      setIsBreathingModalOpen,
      isLoadingScreen,
      setIsLoadingScreen,
      userGamificationProfile,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileModalInitialTab,
      setProfileModalInitialTab,
      openProfileWithTab,
      newLevelUnlocked,
      dismissLevelUpModal,
      awardXp,
      cosmeticsProfile,
      equipCosmetic,
      rewardNotificationQueue,
      dismissRewardNotification,
      equipRewardFromNotification,
      rankingSummary,
      anonymousIdentity,
      userRankPosition,
      syncUserRanking,
      rankingToast,
      dismissRankingToast,
      achievements,
      educationalProgress,
      latestUnlockedAchievement,
      dismissAchievementModal,
      markActivityCompleted,
      recordQuizCompletion,
      recordSimulationChoice,
      recordSimulationOutcome,
      submitReport,
      getReportByProtocol,
      addMessageToProtocol,
      updateReportStatus,
      markNotificationAsRead,
      sendChatMessage,
      clearChat,
      deleteReport,
      deleteAllReports,
      exportReportsCSV,
      resetAllDataToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};


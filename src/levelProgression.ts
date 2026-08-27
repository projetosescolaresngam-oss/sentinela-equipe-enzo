import { LevelInfo, DailyMission, WeeklyMission, UserGamificationProfile, EducationalActivityProgress, Achievement } from './types';

export const LEVEL_PROGRESSION_TIERS: LevelInfo[] = [
  {
    level: 1,
    title: 'Iniciante do Sentinela',
    badgeEmoji: '🌱',
    minXp: 0,
    maxXp: 100,
    description: 'Iniciando a jornada com curiosidade e dando os primeiros passos na cultura de paz.',
    cardColor: 'from-emerald-500 to-teal-600',
    gradientBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    level: 2,
    title: 'Aprendiz da Proteção',
    badgeEmoji: '🔰',
    minXp: 100,
    maxXp: 250,
    description: 'Aprendendo a identificar atitudes de respeito e os pilares de uma convivência saudável.',
    cardColor: 'from-teal-500 to-cyan-600',
    gradientBadge: 'bg-teal-100 text-teal-900 border-teal-300'
  },
  {
    level: 3,
    title: 'Explorador da Segurança',
    badgeEmoji: '🧭',
    minXp: 250,
    maxXp: 450,
    description: 'Navegando pelos canais de apoio, legislação e ferramentas de prevenção escolar.',
    cardColor: 'from-cyan-500 to-blue-600',
    gradientBadge: 'bg-cyan-100 text-cyan-900 border-cyan-300'
  },
  {
    level: 4,
    title: 'Aliado do Respeito',
    badgeEmoji: '🤝',
    minXp: 450,
    maxXp: 700,
    description: 'Fortalecendo os laços de companheirismo e recusando participar de zombarias.',
    cardColor: 'from-blue-500 to-indigo-600',
    gradientBadge: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    level: 5,
    title: 'Guardião do Conhecimento',
    badgeEmoji: '📚',
    minXp: 700,
    maxXp: 1000,
    description: 'Domina os conceitos da Lei Anti-Bullying e sabe orientar quem precisa de ajuda.',
    cardColor: 'from-indigo-500 to-purple-600',
    gradientBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300'
  },
  {
    level: 6,
    title: 'Sentinela Atento',
    badgeEmoji: '👁️',
    minXp: 1000,
    maxXp: 1350,
    description: 'Percebe sinais sutis de exclusão e não deixa ninguém invisível na turma.',
    cardColor: 'from-purple-500 to-fuchsia-600',
    gradientBadge: 'bg-purple-100 text-purple-900 border-purple-300'
  },
  {
    level: 7,
    title: 'Mestre da Empatia',
    badgeEmoji: '💖',
    minXp: 1350,
    maxXp: 1750,
    description: 'Coloca-se no lugar do outro e usa palavras que acolhem em vez de ferir.',
    cardColor: 'from-pink-500 to-rose-600',
    gradientBadge: 'bg-pink-100 text-pink-900 border-pink-300'
  },
  {
    level: 8,
    title: 'Defensor da Escola',
    badgeEmoji: '🛡️',
    minXp: 1750,
    maxXp: 2200,
    description: 'Postura firme contra a intimidação e exemplo de cidadania nos corredores.',
    cardColor: 'from-rose-500 to-amber-600',
    gradientBadge: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    level: 9,
    title: 'Guardião Escolar',
    badgeEmoji: '🏫',
    minXp: 2200,
    maxXp: 2700,
    description: 'Defende a segurança coletiva e incentiva o uso de canais éticos e sigilosos.',
    cardColor: 'from-amber-500 to-orange-600',
    gradientBadge: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    level: 10,
    title: 'Sentinela Veterano',
    badgeEmoji: '⚡',
    minXp: 2700,
    maxXp: 3250,
    description: 'Experiência comprovada em resolução pacífica e desarmamento de tensões.',
    cardColor: 'from-orange-500 to-purple-700',
    gradientBadge: 'bg-orange-100 text-orange-950 border-orange-300'
  },
  {
    level: 11,
    title: 'Protetor de Elite',
    badgeEmoji: '⚔️',
    minXp: 3250,
    maxXp: 3850,
    description: 'Agilidade moral e liderança positiva em situações de conflito ou cyberbullying.',
    cardColor: 'from-violet-600 to-purple-800',
    gradientBadge: 'bg-violet-100 text-violet-950 border-violet-300'
  },
  {
    level: 12,
    title: 'Sentinela de Elite',
    badgeEmoji: '🌟',
    minXp: 3850,
    maxXp: 4500,
    description: 'Reconhecimento exemplar da comunidade escolar por atitudes éticas constantes.',
    cardColor: 'from-purple-600 to-indigo-800',
    gradientBadge: 'bg-purple-100 text-purple-950 border-purple-400'
  },
  {
    level: 13,
    title: 'Guardião Supremo',
    badgeEmoji: '👑',
    minXp: 4500,
    maxXp: 5200,
    description: 'Referência em acolhimento e inteligência socioemocional em toda a escola.',
    cardColor: 'from-indigo-600 to-blue-800',
    gradientBadge: 'bg-indigo-100 text-indigo-950 border-indigo-300'
  },
  {
    level: 14,
    title: 'Sentinela Avançado',
    badgeEmoji: '🔮',
    minXp: 5200,
    maxXp: 5950,
    description: 'Capacidade analítica avançada em tomada de decisões e mediação escolar.',
    cardColor: 'from-blue-600 to-cyan-800',
    gradientBadge: 'bg-blue-100 text-blue-950 border-blue-300'
  },
  {
    level: 15,
    title: 'Mestre da Proteção',
    badgeEmoji: '🔥',
    minXp: 5950,
    maxXp: 6750,
    description: 'Chama acesa da justiça escolar, blindando colegas contra covardia e preconceito.',
    cardColor: 'from-rose-600 to-amber-700',
    gradientBadge: 'bg-rose-100 text-rose-950 border-rose-300'
  },
  {
    level: 16,
    title: 'Sentinela Lendário',
    badgeEmoji: '🦅',
    minXp: 6750,
    maxXp: 7600,
    description: 'Visão panorâmica e espírito de equipe que transformam o clima da escola.',
    cardColor: 'from-teal-600 to-emerald-800',
    gradientBadge: 'bg-teal-100 text-teal-950 border-teal-300'
  },
  {
    level: 17,
    title: 'Guardião Diamante',
    badgeEmoji: '💎',
    minXp: 7600,
    maxXp: 8500,
    description: 'Inquebrável compromisso com a verdade, com o sigilo e com a dignidade de todos.',
    cardColor: 'from-cyan-600 to-blue-900',
    gradientBadge: 'bg-cyan-100 text-cyan-950 border-cyan-400'
  },
  {
    level: 18,
    title: 'Herói da Comunidade',
    badgeEmoji: '🏆',
    minXp: 8500,
    maxXp: 9450,
    description: 'Inspiração diária para estudantes e educadores na construção de um espaço seguro.',
    cardColor: 'from-amber-600 to-yellow-600',
    gradientBadge: 'bg-amber-100 text-amber-950 border-amber-400'
  },
  {
    level: 19,
    title: 'Mestre dos Sentinelas',
    badgeEmoji: '🌌',
    minXp: 9450,
    maxXp: 10500,
    description: 'Sabedoria estelar em ética, cidadania digital e empatia sem fronteiras.',
    cardColor: 'from-purple-800 to-indigo-950',
    gradientBadge: 'bg-purple-200 text-purple-950 border-purple-500'
  },
  {
    level: 20,
    title: 'Lenda do Sentinela',
    badgeEmoji: '👑✨',
    minXp: 10500,
    maxXp: 10500, // Max Level
    description: 'Nível Máximo! Atingiu o topo absoluto da sabedoria, respeito e proteção escolar.',
    cardColor: 'from-amber-500 via-yellow-400 to-purple-600',
    gradientBadge: 'bg-gradient-to-r from-amber-300 to-yellow-300 text-amber-950 border-amber-400'
  }
];

export const MAX_LEVEL = 20;

/**
 * Returns formatted level calculation based on Total XP
 */
export function getLevelDetails(totalXp: number): {
  level: number;
  levelInfo: LevelInfo;
  xpInLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
  isMaxLevel: boolean;
} {
  const safeXp = Math.max(0, Math.round(totalXp));

  // Check if reached level 20 max
  const maxTier = LEVEL_PROGRESSION_TIERS[LEVEL_PROGRESSION_TIERS.length - 1];
  if (safeXp >= maxTier.minXp) {
    return {
      level: MAX_LEVEL,
      levelInfo: maxTier,
      xpInLevel: safeXp - maxTier.minXp,
      xpNeededForNext: 0,
      progressPercent: 100,
      isMaxLevel: true
    };
  }

  // Find level tier
  for (let i = LEVEL_PROGRESSION_TIERS.length - 2; i >= 0; i--) {
    const tier = LEVEL_PROGRESSION_TIERS[i];
    if (safeXp >= tier.minXp) {
      const xpInLevel = safeXp - tier.minXp;
      const xpNeededForNext = tier.maxXp - tier.minXp;
      const progressPercent = Math.min(100, Math.max(0, Math.round((xpInLevel / xpNeededForNext) * 100)));
      return {
        level: tier.level,
        levelInfo: tier,
        xpInLevel,
        xpNeededForNext,
        progressPercent,
        isMaxLevel: false
      };
    }
  }

  const defaultTier = LEVEL_PROGRESSION_TIERS[0];
  return {
    level: 1,
    levelInfo: defaultTier,
    xpInLevel: safeXp,
    xpNeededForNext: defaultTier.maxXp,
    progressPercent: Math.min(100, Math.round((safeXp / defaultTier.maxXp) * 100)),
    isMaxLevel: false
  };
}

/**
 * Helper to get date string formatted YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Helper to get ISO week key formatted YYYY-Wxx
 */
export function getCurrentWeekKey(): string {
  const date = new Date();
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Generates verified in-platform Daily Missions
 */
export function generateDefaultDailyMissions(dateStr: string): DailyMission[] {
  return [
    {
      id: `daily_quiz_${dateStr}`,
      title: 'Desafio do Conhecimento',
      description: 'Conclua 1 quiz educativo sobre prevenção ao bullying ou direitos.',
      rewardXp: 50,
      iconName: 'trophy',
      category: 'quiz',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false
    },
    {
      id: `daily_simulation_${dateStr}`,
      title: 'Tomada de Decisão',
      description: 'Conclua 1 cenário nas Simulações Interativas com atitude ética.',
      rewardXp: 40,
      iconName: 'sparkles',
      category: 'simulation',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false
    },
    {
      id: `daily_education_${dateStr}`,
      title: 'Explorador da Matriz',
      description: 'Estude 1 tipo de bullying ou módulo legal na aba Guia Educativo.',
      rewardXp: 30,
      iconName: 'book',
      category: 'education',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false
    },
    {
      id: `daily_breathing_${dateStr}`,
      title: 'Mente Serena',
      description: 'Pratique 1 exercício de respiração guiada para autocuidado.',
      rewardXp: 30,
      iconName: 'wind',
      category: 'breathing',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false
    }
  ];
}

/**
 * Generates verified in-platform Weekly Missions
 */
export function generateDefaultWeeklyMissions(weekKey: string): WeeklyMission[] {
  return [
    {
      id: `weekly_quizzes_3_${weekKey}`,
      title: '🏆 Mestre dos Quizzes',
      description: 'Conclua 3 quizzes educativos ao longo da semana escolar.',
      rewardXp: 100,
      iconName: 'trophy',
      category: 'quiz',
      targetCount: 3,
      currentCount: 0,
      isCompleted: false
    },
    {
      id: `weekly_simulations_3_${weekKey}`,
      title: '🎭 Maratonista de Decisões',
      description: 'Explore 3 desfechos em cenários de simulações interativas.',
      rewardXp: 100,
      iconName: 'sparkles',
      category: 'simulation',
      targetCount: 3,
      currentCount: 0,
      isCompleted: false
    },
    {
      id: `weekly_achievement_1_${weekKey}`,
      title: '⭐ Caçador de Distintivos',
      description: 'Desbloqueie ou avance no progresso de qualquer conquista.',
      rewardXp: 100,
      iconName: 'award',
      category: 'achievement',
      targetCount: 1,
      currentCount: 0,
      isCompleted: false
    }
  ];
}

/**
 * Computes baseline XP from achievements and existing educational progress
 * so users don't start at 0 if they already explored or unlocked badges.
 */
export function computeBaselineXp(
  achievements: Achievement[],
  progress: EducationalActivityProgress
): number {
  let xp = 0;

  // Unlocked achievements: +50 XP each
  const unlockedBadges = achievements.filter(a => a.isUnlocked).length;
  xp += unlockedBadges * 50;

  // Completed quizzes: +50 XP each unique quiz
  const quizzesList = Object.values(progress.quizzesProgress || {});
  const completedQuizzes = quizzesList.filter(q => q.completed).length;
  xp += completedQuizzes * 50;

  // Completed simulation scenarios: +40 XP each
  const completedSims = progress.completedSimulations?.length || 0;
  xp += completedSims * 40;

  // Explored bullying types: +30 XP each
  const exploredTypes = progress.exploredBullyingTypes?.length || 0;
  xp += Math.min(7, exploredTypes) * 30;

  // Laws and Respect module
  if (progress.viewedLaws) xp += 30;
  if (progress.completedRespectModule) xp += 30;

  // Breathing sessions
  const breathingCount = progress.breathingSessionsCount || (progress.completedBreathingSession ? 1 : 0);
  xp += Math.min(5, breathingCount) * 20;

  return xp;
}

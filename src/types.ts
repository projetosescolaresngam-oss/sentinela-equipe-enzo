export type BullyingCategory =
  | 'verbal'          // Apelidos, insultos, zombarias
  | 'fisico'          // Agressões, empurrões, chutes
  | 'moral'           // Calúnias, fofocas deliberadas, difamação
  | 'psicologico'     // Ameaças, intimidação, chantagens, perseguição
  | 'social'          // Exclusão, isolamento, ignorar deliberadamente
  | 'material'        // Furto, estrago ou quebra de materiais
  | 'cyberbullying'   // Mensagens hostis, prints expostos, memes ofensivos
  | 'sexual';         // Insinuações, toques indesejados, assédio

export type IncidentFrequency =
  | 'primeira_vez'
  | '2_a_3_vezes'
  | 'semanal'
  | 'diario'
  | 'ha_meses';

export type UrgencyLevel = 'baixa' | 'media' | 'alta' | 'critica_sos';

export type ReportStatus = 'novo' | 'em_analise' | 'acao_em_andamento' | 'resolvido';

export type SchoolShift = 'manha' | 'tarde' | 'integral' | 'noite' | 'virtual';

export type ReporterRole = 'vitima' | 'testemunha' | 'responsavel' | 'outro';

export interface ProtocolMessage {
  id: string;
  sender: 'conselho' | 'estudante';
  authorRoleTitle?: string;
  text: string;
  timestamp: string;
}

export interface IncidentReport {
  id: string; // Ex: SEC-2026-8941
  types: BullyingCategory[];
  frequency: IncidentFrequency;
  location: string;
  shift: SchoolShift;
  role: ReporterRole;
  urgency: UrgencyLevel;
  description?: string;
  targetGrade?: string; // ex: "9º Ano", "1º Ano EM"
  hasEvidenceAttachment?: boolean;
  createdAt: string;
  updatedAt: string;
  status: ReportStatus;
  adminNotes?: string;
  messages: ProtocolMessage[];
}

export interface ChatMessage {
  id: string;
  sender: 'usuario' | 'apoio_ia' | 'sistema';
  content: string;
  timestamp: string;
  quickOptions?: string[];
  isCrisisAlert?: boolean;
}

export interface BullyingTypeInfo {
  id: BullyingCategory;
  name: string;
  iconName: string;
  color: string;
  shortDesc: string;
  fullDesc: string;
  examples: string[];
  signs: string[];
  howToReactVictim: string[];
  howToReactWitness: string[];
  legalReference: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: number;
    category?: BullyingCategory;
  }[];
}

export interface AdminNotification {
  id: string;
  reportId: string;
  title: string;
  message: string;
  urgency: UrgencyLevel;
  timestamp: string;
  read: boolean;
}

export type AppTab = 'home' | 'education' | 'simulations' | 'achievements' | 'ranking' | 'report' | 'tracker' | 'support' | 'admin' | 'guide';

export interface AnonymousRankingUser {
  id: string; // internal stable technical identifier (uuid/hash)
  displayName: string; // "Anônimo 001", "Anônimo 014", etc.
  anonymousNumber: number; // 1, 14, etc.
  unlockedCount: number; // e.g. 18
  totalPossible: number; // 23
  unlockedAchievements: {
    id: string;
    unlockedAt: string; // ISO string
  }[];
  lastCountReachedAt: string; // ISO string of when current unlockedCount was reached
  countMilestones?: Record<number, string>; // count -> ISO string
  rankTierTitle?: string;
  rankTierEmoji?: string;
  isCurrentUser?: boolean;
  rankPosition?: number; // 1, 2, 3...
}

export interface RankingSummary {
  totalParticipants: number;
  currentUserPosition: number;
  topTen: AnonymousRankingUser[];
  currentUser: AnonymousRankingUser;
  allRankings: AnonymousRankingUser[];
  lastUpdated: string;
}

export type AchievementId = 
  | 'conhecedor_direitos'
  | 'aliado_escola_segura'
  | 'especialista_respeito'
  | 'protetor_comunidade'
  | 'gabarito_perfeito'
  | 'speedrunner_sabedoria'
  | 'enciclopedia_viva'
  | 'explorador_matriz'
  | 'advogado_do_bem'
  | 'coracao_de_ouro'
  | 'mente_tranquila'
  | 'mestre_zen'
  | 'desabafo_seguro'
  | 'guardiao_digital'
  | 'radar_antizueira'
  | 'colecionador_supremo'
  | 'sentinela_noturno'
  | 'campeao_inclusao'
  // Novas conquistas de Simulações Interativas:
  | 'primeiro_passo_simulacao'
  | 'olhar_empatico'
  | 'decisao_segura'
  | 'pensador_estrategico'
  | 'guardiao_comunidade_sim';

export type AchievementCategory = 'sabedoria' | 'detetive' | 'empatia' | 'zen' | 'escudo';
export type AchievementTier = 'bronze' | 'prata' | 'ouro' | 'lendario';

export interface Achievement {
  id: AchievementId;
  title: string;
  subtitle?: string;
  description: string;
  unlockedDescription: string;
  funnyQuote?: string;
  funnySticker: string;
  category: AchievementCategory;
  tier: AchievementTier;
  iconType: 
    | 'trophy' 
    | 'shield' 
    | 'handshake' 
    | 'heart' 
    | 'wind' 
    | 'book' 
    | 'target' 
    | 'sparkles' 
    | 'award' 
    | 'zap' 
    | 'bot' 
    | 'scale' 
    | 'eye' 
    | 'smile' 
    | 'compass' 
    | 'crown';
  isUnlocked: boolean;
  unlockedAt?: string;
  currentProgress: number;
  maxProgress: number;
  progressUnit?: string;
  requirementHint: string;
  isSecret?: boolean;
}

export type QuizOptionLetter = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: QuizOptionLetter;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface EducationalQuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  conceptTag?: string;
}

export interface EducationalQuiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: BullyingCategory | 'geral' | 'direitos' | 'empatia';
  iconType: 'shield' | 'smartphone' | 'users' | 'heart' | 'book';
  questions: EducationalQuizQuestion[];
}

export interface UserQuizProgress {
  quizId: string;
  completed: boolean;
  attempts: number;
  lastScore: number;
  bestScore: number;
  totalQuestions: number;
  lastCompletedAt?: string;
}

export interface EducationalActivityProgress {
  viewedLaws: boolean;
  completedQuiz: boolean;
  exploredBullyingTypes: string[]; // ids of types explored
  completedRespectModule: boolean;
  completedBreathingSession: boolean;
  breathingSessionsCount: number;
  interactedWithChat: boolean;
  checkedOrCopiedProtocol: boolean;
  submittedOrViewedReport: boolean;
  accessedPlatformNightOrDay: boolean;
  quizzesProgress: Record<string, UserQuizProgress>;
  totalQuestionsAnswered: number;
  totalQuizzesCompleted: number;
  
  // Progresso das Simulações Interativas
  completedSimulations: string[]; // IDs de simulações com pelo menos 1 final alcançado
  exploredSimulationOutcomes: Record<string, string[]>; // scenarioId -> outcomeIds[]
  totalSimulationChoicesMade: number;
  empathyChoicesCount: number;
  safetyChoicesCount: number;
  strategicExplorationsCount: number; // cenários onde >= 2 caminhos/finais foram explorados
  discoveredSecretOutcomesCount?: number;
}

// Tipos das Simulações Interativas
export type SimulationTheme = 
  | 'inclusao_empatia'
  | 'cyberbullying'
  | 'respeito_limites'
  | 'privacidade_digital'
  | 'responsabilidade_boatos'
  | 'acolhimento'
  | 'desescalada_conflito'
  | 'pressao_colegas'
  | 'seguranca_ameacas'
  | 'testemunha_ativa';

export type OutcomeType = 'positivo' | 'aprendizado' | 'atencao' | 'alerta' | 'especial';

export type SimulationChoiceTone = 
  | 'empatia' 
  | 'seguranca' 
  | 'neutro' 
  | 'arriscado' 
  | 'impulso' 
  | 'omissao' 
  | 'apoio'
  | 'reflexao';

export interface SimulationCharacter {
  name: string;
  role: string; // ex: "Colega de turma", "Professor de História", "Orientadora Pedagógica"
  avatarEmoji: string;
  color: string;
  personality?: string;
}

export interface SimulationDialogue {
  characterName: string;
  text: string;
  isUser?: boolean;
  avatarEmoji?: string;
}

export interface SimulationChoice {
  id: string;
  text: string;
  iconEmoji?: string; // 🟢, 🟡, 🔵, 🔴, ⭐, 🟣
  tone: SimulationChoiceTone;
  attitudeLabel?: string; // ex: "Atitude Segura", "Atitude Empática", "Atitude Impulsiva", "Omissão"
  consequenceText: string;
  nextNodeId: string; // ID do próximo nó (ou ID do outcome final se terminar)
  metricImpact?: {
    decision?: number;
    empathy?: number;
    safety?: number;
  };
}

export interface SimulationNode {
  id: string;
  stepNumber: number;
  totalStepsEstimated?: number;
  title?: string;
  narrative: string;
  locationTag: string; // ex: "Pátio do Recreio", "Grupo de Mensagens", "Corredor da Escola"
  dialogues?: SimulationDialogue[];
  promptQuestion: string; // "O que você faz agora?"
  choices: SimulationChoice[];
}

export interface SimulationOutcome {
  id: string;
  type: OutcomeType;
  title: string;
  badgeLabel: string;
  badgeColor: string;
  narrativeResult: string;
  whatHappened: string;
  whyChoicesLedHere: string;
  saferBehaviorAdvice: string;
  coreLearning: string;
  isSpecialSecret?: boolean;
  secretDiscoveryTitle?: string;
  bonusXp?: number;
  metrics: {
    decision: number; // 0-100%
    empathy: number;  // 0-100%
    safety: number;   // 0-100%
  };
}

export interface SimulationScenario {
  id: string;
  scenarioNumber: number;
  title: string;
  subtitle: string;
  theme: SimulationTheme;
  themeLabel: string;
  estimatedMinutes: number;
  iconName: string;
  accentColor: string;
  coverGradient: string;
  summary: string;
  characters: SimulationCharacter[];
  initialNodeId: string;
  nodes: Record<string, SimulationNode>;
  outcomes: Record<string, SimulationOutcome>;
  totalPossibleOutcomes: number;
}

export interface RankTierInfo {
  minAchievements: number;
  title: string;
  badgeEmoji: string;
  description: string;
  color: string;
  levelNumber: number;
}

// 20-Level Progression System
export interface LevelInfo {
  level: number;
  title: string;
  badgeEmoji: string;
  minXp: number;
  maxXp: number; // XP threshold for next level
  description: string;
  cardColor: string;
  gradientBadge: string;
}

export type XpActivityType = 
  | 'quiz_completed'
  | 'simulation_completed'
  | 'education_explored'
  | 'breathing_session'
  | 'achievement_unlocked'
  | 'daily_mission'
  | 'weekly_mission'
  | 'report_drafted'
  | 'chat_reflection';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  iconName: string;
  category: 'quiz' | 'simulation' | 'education' | 'breathing';
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface WeeklyMission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  iconName: string;
  category: 'quiz' | 'simulation' | 'achievement' | 'general';
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface UserGamificationProfile {
  totalXp: number;
  currentLevel: number;
  currentLevelTitle: string;
  currentLevelBadgeEmoji: string;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  progressPercentInLevel: number;
  isMaxLevel: boolean;
  dailyMissions: DailyMission[];
  weeklyMissions: WeeklyMission[];
  lastDailyResetDate: string; // YYYY-MM-DD
  lastWeeklyResetKey: string; // YYYY-Wxx
  xpHistoryCount: Record<string, number>;
}

// ==========================================
// 🎁 RECOMPENSAS VIRTUAIS & COSMÉTICOS
// ==========================================
export type CosmeticCategory = 'frame' | 'icon' | 'title' | 'badge' | 'effect' | 'theme';
export type CosmeticRarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario' | 'mitico' | 'supremo';

export interface CosmeticUnlockCondition {
  type: 'default' | 'level' | 'achievement' | 'quiz_count' | 'simulation_count' | 'perfect_quiz_count' | 'breathing_count' | 'total_achievements' | 'secret';
  minLevel?: number;
  achievementId?: AchievementId;
  minCount?: number;
  description: string;
}

export interface CosmeticUnlockRequirement {
  label: string;
  currentProgressKey: 'level' | 'achievements' | 'quizzes' | 'simulations' | 'breathing' | 'perfect_quizzes' | 'days';
  target: number;
  icon?: string;
}

export interface CosmeticLoreDetail {
  icon: string;
  title: string;
  desc: string;
}

export interface CosmeticRewardItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  rarity: CosmeticRarity;
  iconPreview: string; // emoji or identifier
  unlockCondition: CosmeticUnlockCondition;
  isEquipped?: boolean;
  isUnlocked?: boolean;
  unlockedAt?: string;
  isSecret?: boolean;
  secretClue?: string;
  customTitleText?: string;
  loreQuote?: string;
  loreDetails?: CosmeticLoreDetail[];
  unlockRequirementsList?: CosmeticUnlockRequirement[];
  themeStyle?: {
    cardGradient: string;
    borderHighlight: string;
    glowColor: string;
    accentBadge: string;
    textColor?: string;
  };
  frameStyle?: {
    borderClass: string;
    glowClass?: string;
    outerRingClass?: string;
    badgeAccent?: string;
    svgOverlay?: 'cosmic' | 'fenix' | 'sombrio' | 'ondas' | 'eco' | 'palhacada' | 'gamer' | 'portal_vortex' | 'espartano' | 'caos_meme' | 'comida_delicia' | 'dragao_fogo' | 'dragao_gelo' | 'coroa_suprema' | 'electric' | 'fire' | 'stars' | 'ice' | 'eclipse' | 'imperial' | 'owl' | 'ninja' | 'shades' | 'cyber' | 'rainbow' | 'runic' | 'supreme' | 'aurora' | 'none';
  };
  badgeStyle?: {
    badgeGradient: string;
    badgeBorder: string;
    badgeShadow?: string;
    ribbonText?: string;
    crestType?: 'shield' | 'wings' | 'star' | 'crown' | 'hexagon' | 'flame' | 'diamond' | 'owl' | 'ninja' | 'infinity' | 'trophy' | 'orb' | 'sparkle' | 'sword' | 'feather' | 'book' | 'compass' | 'leaf' | 'water' | 'phoenix';
  };
  effectStyle?: {
    animationClass: string;
    glowClass: string;
    particleEmoji?: string;
  };
}

export interface UserCosmeticsProfile {
  equippedFrameId: string;
  equippedIconId: string;
  equippedTitleId: string;
  equippedBadgeId: string;
  equippedEffectId: string;
  equippedThemeId: string;
  unlockedRewardIds: string[];
}





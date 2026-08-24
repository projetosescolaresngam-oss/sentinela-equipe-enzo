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
  | 'campeao_inclusao';

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
}


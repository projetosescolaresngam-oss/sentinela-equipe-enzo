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

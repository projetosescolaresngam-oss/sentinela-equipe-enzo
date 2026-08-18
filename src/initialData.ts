import { IncidentReport, AdminNotification } from './types';

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: 'SEC-2026-7841',
    types: ['cyberbullying', 'verbal'],
    frequency: 'diario',
    location: 'Grupos de WhatsApp & Pátio Central',
    shift: 'manha',
    role: 'vitima',
    urgency: 'alta',
    description: 'Criaram uma conta de fofoca no Instagram e grupos no WhatsApp compartilhando fotos minhas tiradas escondidas na sala com piadas ofensivas sobre meu peso.',
    targetGrade: '9º Ano B',
    hasEvidenceAttachment: true,
    createdAt: '2026-08-14T09:30:00Z',
    updatedAt: '2026-08-16T14:20:00Z',
    status: 'acao_em_andamento',
    adminNotes: 'Acionada a coordenação do Ensino Fundamental II e psicopedagoga. Reunião de mediação e conscientização digital marcada com as turmas.',
    messages: [
      {
        id: 'msg-1',
        sender: 'conselho',
        authorRoleTitle: 'Orientação Psicopedagógica',
        text: 'Olá. Seu relato foi recebido com sigilo absoluto. Já identificamos o canal digital mencionado e iniciamos os protocolos protetivos. Você não está sozinho(a). Como você está se sentindo hoje?',
        timestamp: '2026-08-14T11:15:00Z'
      },
      {
        id: 'msg-2',
        sender: 'estudante',
        text: 'Obrigado por responderem tão rápido. Hoje no recreio eles pararam de rir quando viram a inspetora por perto. Estou me sentindo mais calmo.',
        timestamp: '2026-08-15T10:45:00Z'
      },
      {
        id: 'msg-3',
        sender: 'conselho',
        authorRoleTitle: 'Coordenação Escolar',
        text: 'Excelente. A inspetoria manterá vigilância ativa em todos os intervalos. Se houver qualquer nova mensagem, avise-nos por este mesmo protocolo.',
        timestamp: '2026-08-16T14:20:00Z'
      }
    ]
  },
  {
    id: 'SEC-2026-8912',
    types: ['fisico', 'material'],
    frequency: 'semanal',
    location: 'Banheiro Masculino - Bloco C',
    shift: 'tarde',
    role: 'testemunha',
    urgency: 'critica_sos',
    description: 'Dois alunos do 1º ano do EM cercam um garoto mais novo nos fundos do banheiro, jogam a mochila dele dentro da pia e ameaçam bater se ele contar.',
    targetGrade: '7º Ano A',
    hasEvidenceAttachment: false,
    createdAt: '2026-08-15T15:40:00Z',
    updatedAt: '2026-08-16T16:00:00Z',
    status: 'em_analise',
    adminNotes: 'Caso de urgência crítica. Escala de inspetores reforçada no Bloco C. Vítima em processo de identificação discreta para acolhimento.',
    messages: [
      {
        id: 'msg-101',
        sender: 'conselho',
        authorRoleTitle: 'Direção Escolar',
        text: 'Agradecemos enormemente por agir como testemunha protetora. A equipe de segurança já intensificou as rondas no Bloco C.',
        timestamp: '2026-08-15T16:10:00Z'
      }
    ]
  },
  {
    id: 'SEC-2026-6430',
    types: ['social', 'psicologico'],
    frequency: 'ha_meses',
    location: 'Refeitório e Sala de Aula',
    shift: 'integral',
    role: 'vitima',
    urgency: 'media',
    description: 'Desde o início do semestre, um grupo combinou de não falar comigo. Toda vez que sento perto, eles se levantam. Em trabalhos em grupo ninguém me aceita.',
    targetGrade: '8º Ano C',
    hasEvidenceAttachment: false,
    createdAt: '2026-08-10T13:20:00Z',
    updatedAt: '2026-08-16T10:00:00Z',
    status: 'resolvido',
    adminNotes: 'Professores orientados para dinamizar formação mista de grupos. Atividades socioemocionais aplicadas na turma.',
    messages: [
      {
        id: 'msg-201',
        sender: 'conselho',
        authorRoleTitle: 'Psicóloga Escolar',
        text: 'Trabalhamos dinâmicas de acolhimento e empatia com a turma. Como tem sido a integração nos últimos dias?',
        timestamp: '2026-08-12T14:00:00Z'
      },
      {
        id: 'msg-202',
        sender: 'estudante',
        text: 'A professora de ciências montou os grupos por sorteio e consegui fazer amizade com dois colegas novos. Foi muito melhor.',
        timestamp: '2026-08-16T09:40:00Z'
      }
    ]
  },
  {
    id: 'SEC-2026-9104',
    types: ['verbal'],
    frequency: '2_a_3_vezes',
    location: 'Quadra Poliesportiva',
    shift: 'manha',
    role: 'vitima',
    urgency: 'baixa',
    description: 'Durante a aula de educação física, ficam rindo e gritando apelidos pejorativos quando erro a jogada no vôlei.',
    targetGrade: '6º Ano A',
    hasEvidenceAttachment: false,
    createdAt: '2026-08-16T11:00:00Z',
    updatedAt: '2026-08-16T11:00:00Z',
    status: 'novo',
    adminNotes: 'Encaminhar aviso ao professor de Educação Física para mediação de postura esportiva inclusiva.',
    messages: []
  },
  {
    id: 'SEC-2026-5219',
    types: ['moral', 'cyberbullying'],
    frequency: 'primeira_vez',
    location: 'Redes Sociais (TikTok / Reels)',
    shift: 'virtual',
    role: 'responsavel',
    urgency: 'media',
    description: 'Gravaram um vídeo com IA imitando a voz da aluna inventando fofocas falsas e postaram em perfil anônimo da escola.',
    targetGrade: '2º Ano EM',
    hasEvidenceAttachment: true,
    createdAt: '2026-08-17T08:15:00Z',
    updatedAt: '2026-08-17T08:15:00Z',
    status: 'novo',
    adminNotes: 'Notificação extrajudicial preparada para remoção de conteúdo nas plataformas conforme Marco Civil da Internet.',
    messages: []
  }
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    reportId: 'SEC-2026-8912',
    title: 'Alerta SOS: Incidente Físico Crítico',
    message: 'Testemunha reportou intimidação física e dano patrimonial no Bloco C.',
    urgency: 'critica_sos',
    timestamp: '2026-08-15T15:40:00Z',
    read: false
  },
  {
    id: 'notif-2',
    reportId: 'SEC-2026-7841',
    title: 'Nova Denúncia de Cyberbullying',
    message: 'Perfil anônimo em rede social disseminando conteúdo ofensivo no 9º Ano B.',
    urgency: 'alta',
    timestamp: '2026-08-14T09:30:00Z',
    read: true
  },
  {
    id: 'notif-3',
    reportId: 'SEC-2026-5219',
    title: 'Denúncia por Responsável',
    message: 'Uso indevido de imagem/voz de aluna em aplicativo de vídeos.',
    urgency: 'media',
    timestamp: '2026-08-17T08:15:00Z',
    read: false
  }
];

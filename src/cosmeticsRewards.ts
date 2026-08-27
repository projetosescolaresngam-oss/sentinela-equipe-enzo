import { 
  CosmeticRewardItem, 
  CosmeticCategory, 
  Achievement, 
  UserCosmeticsProfile,
  EducationalActivityProgress,
  CosmeticRarity
} from './types';

export const ALL_COSMETIC_REWARDS: CosmeticRewardItem[] = [
  // =========================================================================
  // 🖼️ 1. MOLDURAS DE PERFIL (FRAMES) — Ricas, Trabalhadas e com Efeitos Visuais
  // =========================================================================
  
  // COMUNS & INCOMUNS
  {
    id: 'frame_sentinela_classica',
    category: 'frame',
    name: 'Moldura Sentinela Clássica',
    description: 'Moldura inicial discreta com gradiente suave em tons roxos institucionais.',
    rarity: 'comum',
    iconPreview: '🖼️',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-purple-400',
      glowClass: 'shadow-sm',
      outerRingClass: 'border-2 border-purple-300'
    }
  },
  {
    id: 'frame_aprendiz_ciano',
    category: 'frame',
    name: 'Moldura Aprendiz Ciano',
    description: 'Moldura em tons de turquesa e ciano que celebra o início dos aprendizados de proteção.',
    rarity: 'comum',
    iconPreview: '🔷',
    unlockCondition: {
      type: 'level',
      minLevel: 2,
      description: 'Desbloqueado ao atingir o Nível 2'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-teal-400 via-cyan-500 to-blue-400',
      glowClass: 'shadow-cyan-500/20 shadow-md',
      outerRingClass: 'border-2 border-cyan-300'
    }
  },
  {
    id: 'frame_aliado_azul',
    category: 'frame',
    name: 'Moldura Aliado Celeste',
    description: 'Aro em azul safira que destaca o espírito de companheirismo e lealdade na turma.',
    rarity: 'incomum',
    iconPreview: '💠',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-blue-500 via-sky-400 to-indigo-500',
      glowClass: 'shadow-blue-500/30 shadow-md',
      outerRingClass: 'border-2 border-sky-300'
    }
  },
  {
    id: 'frame_sentinela_roxa',
    category: 'frame',
    name: 'Moldura Sentinela Roxa',
    description: 'Moldura vibrante em ametista profunda que simboliza a autoridade do conhecimento.',
    rarity: 'incomum',
    iconPreview: '🟣',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-600',
      glowClass: 'shadow-purple-500/40 shadow-lg',
      outerRingClass: 'border-2 border-fuchsia-300'
    }
  },

  // RAROS
  {
    id: 'frame_guardiao_dourado',
    category: 'frame',
    name: 'Moldura Guardião Dourado',
    description: 'Borda com acabamento em ouro nobre para quem atua ativamente pela paz escolar.',
    rarity: 'raro',
    iconPreview: '🟡',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600',
      glowClass: 'shadow-amber-500/40 shadow-lg ring-1 ring-amber-300',
      outerRingClass: 'border-2 border-amber-300'
    }
  },
  {
    id: 'frame_nevoa_roxa',
    category: 'frame',
    name: 'Moldura Névoa Roxa',
    description: 'Textura de energia etérea e névoa violeta pulsante com micro-partículas de serenidade.',
    rarity: 'raro',
    iconPreview: '🌫️',
    unlockCondition: {
      type: 'breathing_count',
      minCount: 3,
      description: 'Complete 3 sessões de respiração na plataforma'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-indigo-900',
      glowClass: 'shadow-purple-600/50 shadow-xl ring-2 ring-purple-400/80',
      outerRingClass: 'border-2 border-purple-400/60',
      svgOverlay: 'stars'
    }
  },
  {
    id: 'frame_conhecimento_quiz',
    category: 'frame',
    name: 'Moldura Conhecimento Vivo',
    description: 'Borda em esmeralda e ouro lapidado conquistada ao dominar os fundamentos dos direitos.',
    rarity: 'raro',
    iconPreview: '🌿',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'conhecedor_direitos',
      description: 'Conquiste a insígnia "Calouro Anti-Treta"'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300',
      glowClass: 'shadow-emerald-500/40 shadow-lg',
      outerRingClass: 'border-2 border-emerald-300'
    }
  },
  {
    id: 'frame_empatia_coracao',
    category: 'frame',
    name: 'Moldura Escudo da Empatia',
    description: 'Acabamento em rubi e rosa suave simbolizando coragem para acolher colegas.',
    rarity: 'raro',
    iconPreview: '💖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'coracao_de_ouro',
      description: 'Conquiste a insígnia "Embaixador da Empatia"'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-purple-600',
      glowClass: 'shadow-rose-500/40 shadow-lg',
      outerRingClass: 'border-2 border-pink-300'
    }
  },
  {
    id: 'frame_zen_harmonia',
    category: 'frame',
    name: 'Moldura Harmonia Zen',
    description: 'Moldura suave com gradiente turquesa e prata, refletindo uma mente tranquila.',
    rarity: 'raro',
    iconPreview: '🧘',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mestre_zen',
      description: 'Conquiste a insígnia "Pulmão de Aço da Serenidade"'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-teal-400 via-emerald-300 to-cyan-500',
      glowClass: 'shadow-teal-500/40 shadow-lg',
      outerRingClass: 'border-2 border-teal-200'
    }
  },

  // ÉPICOS
  {
    id: 'frame_guardiao_cosmico',
    category: 'frame',
    name: 'Moldura Guardião Cósmico',
    description: 'Forjada com energia cósmica, essa moldura representa aqueles que protegem, acolhem e iluminam o caminho dos outros.',
    rarity: 'epico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste feitos notáveis na comunidade escolar'
    },
    loreQuote: '"Um verdadeiro guardião não usa poder para dominar, mas para proteger."',
    loreDetails: [
      {
        icon: '🔮',
        title: 'Cristal de Ametista Cósmica',
        desc: 'Engastado em ouro puro no topo, canaliza foco, clareza mental e serenidade.'
      },
      {
        icon: '🛡️',
        title: 'Brasão Guardião & Louros',
        desc: 'Simboliza as mãos unidas da turma acolhendo e blindando quem sofre injustiças.'
      },
      {
        icon: '💫',
        title: 'Anéis Orbitais Estelares',
        desc: 'Trajetórias douradas com esferas astrais que giram em harmonia protetora.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 20',
        currentProgressKey: 'level',
        target: 20,
        icon: '🎯'
      },
      {
        label: 'Conquistas Desbloqueadas',
        currentProgressKey: 'achievements',
        target: 8,
        icon: '🏆'
      },
      {
        label: 'Atividades / Quizzes',
        currentProgressKey: 'quizzes',
        target: 5,
        icon: '📚'
      }
    ],
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-300 via-purple-600 to-indigo-700',
      glowClass: 'shadow-purple-500/70 shadow-2xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-amber-400',
      svgOverlay: 'cosmic'
    }
  },
  {
    id: 'frame_veterano_trovao',
    category: 'frame',
    name: 'Moldura Trovão & Energia',
    description: 'Acabamento elétrico com reflexos violeta e arcos de energia para sentinelas experientes.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    },
    loreQuote: '"A velocidade em estender a mão a quem precisa é a maior força de um líder."',
    loreDetails: [
      {
        icon: '⚡',
        title: 'Descargas de Alta Voltagem',
        desc: 'Faíscas e arcos dinâmicos que representam ação rápida e posicionamento corajoso.'
      },
      {
        icon: '🟣',
        title: 'Aço Temperado Violeta',
        desc: 'Resistência máxima contra pressões e ofensas externas.'
      },
      {
        icon: '✨',
        title: 'Brilho Eletrostático',
        desc: 'Ilumina a foto de perfil com pulsação de energia constante.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 10',
        currentProgressKey: 'level',
        target: 10,
        icon: '🎯'
      },
      {
        label: 'Quizzes Completados',
        currentProgressKey: 'quizzes',
        target: 3,
        icon: '📝'
      }
    ],
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-indigo-500 via-amber-300 to-purple-600',
      glowClass: 'shadow-indigo-500/50 shadow-xl ring-2 ring-purple-400',
      outerRingClass: 'border-2 border-indigo-400',
      svgOverlay: 'electric'
    }
  },
  {
    id: 'frame_sobrecarga_eletrica',
    category: 'frame',
    name: 'Moldura Sobrecarga Elétrica',
    description: 'Arco de alta voltagem com descargas de plasma ciano e faíscas estilizadas.',
    rarity: 'epico',
    iconPreview: '🔌',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 3,
      minLevel: 9,
      description: 'Complete 3 quizzes e alcance o Nível 9'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600',
      glowClass: 'shadow-cyan-400/60 shadow-2xl ring-2 ring-cyan-200 animate-pulse',
      outerRingClass: 'border-2 border-cyan-400',
      svgOverlay: 'electric'
    }
  },
  {
    id: 'frame_cosmos_estelar',
    category: 'frame',
    name: 'Moldura Cosmos Estelar',
    description: 'Textura de nebulosa profunda com estrelas cintilantes e poeira astral luminosa.',
    rarity: 'epico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-fuchsia-600 via-cyan-400 to-purple-700',
      glowClass: 'shadow-fuchsia-500/50 shadow-xl ring-2 ring-cyan-300',
      outerRingClass: 'border-2 border-cyan-400',
      svgOverlay: 'stars'
    }
  },
  {
    id: 'frame_guardiao_fogo',
    category: 'frame',
    name: 'Moldura Guardião de Fogo',
    description: 'Brasas de coragem inabalável e chamas estilizadas que protegem quem precisa.',
    rarity: 'epico',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 5,
      description: 'Complete todos os 5 quizzes da jornada'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400',
      glowClass: 'shadow-orange-500/60 shadow-xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-orange-500',
      svgOverlay: 'fire'
    }
  },
  {
    id: 'frame_esquadrao_radical',
    category: 'frame',
    name: 'Moldura Esquadrão Atitude',
    description: 'Inspirada na postura confiante e firme: aro em ciano e neon com detalhe de óculos escuros.',
    rarity: 'epico',
    iconPreview: '🕶️',
    unlockCondition: {
      type: 'perfect_quiz_count',
      minCount: 1,
      description: 'Obtenha 100% de acerto em qualquer quiz educativo'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-teal-400',
      glowClass: 'shadow-cyan-500/50 shadow-xl ring-2 ring-cyan-300',
      outerRingClass: 'border-2 border-sky-400',
      svgOverlay: 'shades'
    }
  },
  {
    id: 'frame_mestre_protecao',
    category: 'frame',
    name: 'Moldura Mestre da Proteção',
    description: 'Moldura reforçada em titânio e rubi para defensores exemplares da convivência.',
    rarity: 'epico',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-rose-500 via-amber-400 to-purple-700',
      glowClass: 'shadow-rose-500/50 shadow-2xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-amber-400'
    }
  },

  // LENDÁRIOS
  {
    id: 'frame_cristal_glacial',
    category: 'frame',
    name: 'Moldura Cristal Glacial',
    description: 'Estrutura geométrica de gelo puro com reflexos prismáticos que refratam a luz da verdade.',
    rarity: 'lendario',
    iconPreview: '❄️',
    unlockCondition: {
      type: 'level',
      minLevel: 14,
      description: 'Desbloqueado ao atingir o Nível 14'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-sky-400 via-cyan-200 to-indigo-500',
      glowClass: 'shadow-cyan-400/70 shadow-2xl ring-2 ring-white',
      outerRingClass: 'border-2 border-cyan-200',
      svgOverlay: 'ice'
    }
  },
  {
    id: 'frame_eclipse_obscuro',
    category: 'frame',
    name: 'Moldura Eclipse Solar',
    description: 'Coroa de luz dourada circundando o anel de obsidiana estelar de um eclipse total.',
    rarity: 'lendario',
    iconPreview: '🌑',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 5,
      minLevel: 16,
      description: 'Conclua 5 simulações e atinja o Nível 16'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-slate-950 via-amber-500 to-purple-950',
      glowClass: 'shadow-amber-500/60 shadow-2xl ring-2 ring-amber-400/80',
      outerRingClass: 'border-2 border-amber-400',
      svgOverlay: 'eclipse'
    }
  },
  {
    id: 'frame_diamante_safira',
    category: 'frame',
    name: 'Moldura Diamante & Safira',
    description: 'Facetas cristalinas brilhantes inspiradas em diamantes e safiras nobres.',
    rarity: 'lendario',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-cyan-300 via-blue-500 to-indigo-600',
      glowClass: 'shadow-cyan-400/60 shadow-2xl ring-2 ring-cyan-200',
      outerRingClass: 'border-2 border-cyan-300',
      svgOverlay: 'ice'
    }
  },
  {
    id: 'frame_imperial_dourada',
    category: 'frame',
    name: 'Moldura Imperial Dourada',
    description: 'Detalhes em ouro maciço barroco com gemas de rubi lapidadas dignas de um líder nato.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 8,
      minLevel: 17,
      description: 'Conquiste 8 insígnias e alcance o Nível 17'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-600',
      glowClass: 'shadow-amber-400/70 shadow-2xl ring-2 ring-yellow-100 animate-pulse',
      outerRingClass: 'border-2 border-yellow-300',
      svgOverlay: 'imperial'
    }
  },
  {
    id: 'frame_lorde_supremo',
    category: 'frame',
    name: 'Moldura Lorde Supremo',
    description: 'Aura máxima dourada e púrpura para quem alcançou o topo da liderança positiva escolar.',
    rarity: 'lendario',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível Máximo (20)'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-400 via-fuchsia-500 to-purple-800',
      glowClass: 'shadow-amber-500/70 shadow-2xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-amber-300',
      svgOverlay: 'imperial'
    }
  },

  // MÍTICOS
  {
    id: 'frame_coruja_vigilante',
    category: 'frame',
    name: 'Moldura Coruja da Vigilância',
    description: 'Inspirada no guardião alado noturno: plumagem blindada afiada com contornos neon magenta e violeta.',
    rarity: 'mitico',
    iconPreview: '🦉',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'sentinela_noturno',
      minLevel: 15,
      description: 'Desbloqueie a insígnia secreta "Sentinela Noturno" e alcance o Nível 15'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-fuchsia-600 via-purple-900 to-pink-500',
      glowClass: 'shadow-fuchsia-500/80 shadow-2xl ring-2 ring-pink-400',
      outerRingClass: 'border-2 border-fuchsia-300',
      svgOverlay: 'owl'
    }
  },
  {
    id: 'frame_ninja_espectral',
    category: 'frame',
    name: 'Moldura Sentinela Espectral',
    description: 'Inspirada no lendário guerreiro encapuzado: lâminas de proteção e aura ciano neon que repelem toda agressão.',
    rarity: 'mitico',
    iconPreview: '🥷',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 10,
      description: 'Conclua todas as 10 simulações interativas na plataforma'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-cyan-400 via-slate-900 to-teal-500',
      glowClass: 'shadow-cyan-400/80 shadow-2xl ring-2 ring-cyan-300',
      outerRingClass: 'border-2 border-cyan-400',
      svgOverlay: 'ninja'
    }
  },
  {
    id: 'frame_cyber_matrix',
    category: 'frame',
    name: 'Moldura Matrix Cibernética',
    description: 'Malha cibernética de alta tecnologia com fluxo contínuo de dados e circuitos luminosos de respeito.',
    rarity: 'mitico',
    iconPreview: '🤖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'speedrunner_sabedoria',
      minLevel: 17,
      description: 'Conquiste "Detetive Cibernético" e atinja o Nível 17'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-emerald-400 via-cyan-500 to-indigo-900',
      glowClass: 'shadow-emerald-400/70 shadow-2xl ring-2 ring-emerald-300',
      outerRingClass: 'border-2 border-emerald-400',
      svgOverlay: 'cyber'
    }
  },

  // SUPREMOS & SECRETOS
  {
    id: 'frame_reliquia_primordial',
    category: 'frame',
    name: 'Moldura Relíquia Primordial',
    description: 'Monólito ancestral esculpido com runas de honra e levitação de pedras de quartzo dourado.',
    rarity: 'supremo',
    iconPreview: '🏛️',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e desbloqueie pelo menos 10 insígnias'
    },
    frameStyle: {
      borderClass: 'p-2.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600',
      glowClass: 'shadow-amber-300/80 shadow-2xl ring-3 ring-amber-200 animate-pulse',
      outerRingClass: 'border-2 border-amber-300',
      svgOverlay: 'runic'
    }
  },
  {
    id: 'frame_prisma_supremo',
    category: 'frame',
    name: 'Moldura Prisma Supremo',
    description: 'Aurora policromática iridescente que refrata os 7 raios da fraternidade e respeito humano.',
    rarity: 'supremo',
    iconPreview: '🌈',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao completar a jornada suprema de Nível 20'
    },
    frameStyle: {
      borderClass: 'p-2.5 bg-gradient-to-r from-red-500 via-yellow-400 via-emerald-400 via-cyan-400 via-indigo-500 to-purple-600',
      glowClass: 'shadow-fuchsia-400/80 shadow-2xl ring-3 ring-white',
      outerRingClass: 'border-2 border-white',
      svgOverlay: 'rainbow'
    }
  },
  {
    id: 'frame_secreta_vazio',
    category: 'frame',
    name: 'Moldura do Vórtice Sombrio',
    description: 'Relíquia oculta descoberta por quem explorou as profundezas do conhecimento ético.',
    rarity: 'mitico',
    isSecret: true,
    secretClue: 'A coruja da noite sabe o caminho secreto da serenidade...',
    iconPreview: '🗝️',
    unlockCondition: {
      type: 'secret',
      achievementId: 'sentinela_noturno',
      description: 'Descubra a insígnia secreta da Sentinela Noturna'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950',
      glowClass: 'shadow-purple-700/80 shadow-2xl ring-2 ring-purple-500',
      outerRingClass: 'border-2 border-purple-500',
      svgOverlay: 'stars'
    }
  },

  // =========================================================================
  // 🛡️ 2. EMBLEMAS & BADGES DE VIDEOGAME
  // =========================================================================
  {
    id: 'badge_nenhum',
    category: 'badge',
    name: 'Nenhum Emblema',
    description: 'Não exibir nenhum emblema adicional no cabeçalho.',
    rarity: 'comum',
    iconPreview: '⚪',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'badge_guardiao_respeito',
    category: 'badge',
    name: 'Guardião do Respeito',
    description: 'Escudo de ferro trabalhado com o brasão da harmonia escolar.',
    rarity: 'incomum',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    },
    badgeStyle: {
      badgeGradient: 'from-slate-700 via-slate-800 to-slate-900',
      badgeBorder: 'border-slate-400',
      ribbonText: 'DEFESA',
      crestType: 'shield'
    }
  },
  {
    id: 'badge_embaixador_paz',
    category: 'badge',
    name: 'Embaixador da Paz',
    description: 'Distintivo em ouro nobre que simboliza liderança na mediação pacífica de conflitos.',
    rarity: 'raro',
    iconPreview: '🕊️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'coracao_de_ouro',
      description: 'Conquiste a insígnia "Embaixador da Empatia"'
    },
    badgeStyle: {
      badgeGradient: 'from-emerald-700 via-teal-800 to-emerald-950',
      badgeBorder: 'border-emerald-400',
      ribbonText: 'PAZ',
      crestType: 'wings'
    }
  },
  {
    id: 'badge_mestre_conhecimento_ouro',
    category: 'badge',
    name: 'Mestre do Conhecimento',
    description: 'Cérebro em relevo de bronze nobre com louros cravados por acertos em quizzes.',
    rarity: 'raro',
    iconPreview: '🧠',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 3,
      description: 'Conclua pelo menos 3 quizzes educativos'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-600 via-yellow-700 to-amber-900',
      badgeBorder: 'border-amber-400',
      ribbonText: 'SABER',
      crestType: 'star'
    }
  },
  {
    id: 'badge_sentinela_relampago',
    category: 'badge',
    name: 'Sentinela Relâmpago',
    description: 'Raio de titânio estilizado para quem responde rápido e com assertividade.',
    rarity: 'raro',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    },
    badgeStyle: {
      badgeGradient: 'from-indigo-700 via-blue-800 to-indigo-950',
      badgeBorder: 'border-cyan-400',
      ribbonText: 'VELOZ',
      crestType: 'flame'
    }
  },
  {
    id: 'badge_atitude_radical',
    category: 'badge',
    name: 'Atitude & Respeito',
    description: 'Inspirado na postura inabalável de quem não aceita o bullying em nenhuma circunstância.',
    rarity: 'raro',
    iconPreview: '🕶️',
    unlockCondition: {
      type: 'perfect_quiz_count',
      minCount: 1,
      description: 'Gabarite 1 quiz com 100% de aproveitamento'
    },
    badgeStyle: {
      badgeGradient: 'from-cyan-700 via-blue-800 to-indigo-950',
      badgeBorder: 'border-cyan-300',
      ribbonText: 'ATITUDE',
      crestType: 'hexagon'
    }
  },
  {
    id: 'badge_coracao_protetor',
    category: 'badge',
    name: 'Coração Protetor',
    description: 'Escudo com gema de rubi lapidada que protege os que precisam de apoio.',
    rarity: 'raro',
    iconPreview: '💖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'olhar_empatico',
      description: 'Conquiste a insígnia "Coração de Escudo & Acolhimento"'
    },
    badgeStyle: {
      badgeGradient: 'from-rose-700 via-pink-800 to-rose-950',
      badgeBorder: 'border-rose-400',
      ribbonText: 'EMPATIA',
      crestType: 'shield'
    }
  },
  {
    id: 'badge_mente_serena',
    category: 'badge',
    name: 'Mente Serena',
    description: 'Emblema da flor de lótus de platina que mantém a tranquilidade e clareza mental.',
    rarity: 'raro',
    iconPreview: '🪷',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mente_tranquila',
      description: 'Conquiste a insígnia "Monge da Respiração Zen"'
    },
    badgeStyle: {
      badgeGradient: 'from-teal-700 via-emerald-800 to-teal-950',
      badgeBorder: 'border-teal-300',
      ribbonText: 'CALMA',
      crestType: 'wings'
    }
  },
  {
    id: 'badge_protetor_comunidade',
    category: 'badge',
    name: 'Protetor da Comunidade',
    description: 'Asas prateadas envolvendo o monograma da escola segura.',
    rarity: 'epico',
    iconPreview: '🌟',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 5,
      description: 'Complete 5 simulações com tomadas de decisão conscientes'
    },
    badgeStyle: {
      badgeGradient: 'from-purple-700 via-indigo-800 to-purple-950',
      badgeBorder: 'border-purple-300',
      ribbonText: 'UNIÃO',
      crestType: 'wings'
    }
  },
  {
    id: 'badge_oraculo_sabedoria',
    category: 'badge',
    name: 'Oráculo da Sabedoria',
    description: 'Olho radiante de discernimento capaz de desvendar todas as fakes e mitos.',
    rarity: 'epico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'gabarito_perfeito',
      description: 'Conquiste a insígnia "Oráculo do 100% Sem Chute"'
    },
    badgeStyle: {
      badgeGradient: 'from-violet-700 via-fuchsia-800 to-purple-950',
      badgeBorder: 'border-fuchsia-300',
      ribbonText: 'VISÃO',
      crestType: 'star'
    }
  },
  {
    id: 'badge_coruja_noturna',
    category: 'badge',
    name: 'Coruja da Vigilância',
    description: 'Brasão esportivo da coruja de combate com olhos penetrantes e plumagem de aço.',
    rarity: 'epico',
    iconPreview: '🦉',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'sentinela_noturno',
      description: 'Conquiste a insígnia secreta "Sentinela Noturno da Paz"'
    },
    badgeStyle: {
      badgeGradient: 'from-fuchsia-800 via-purple-900 to-slate-950',
      badgeBorder: 'border-fuchsia-400',
      ribbonText: 'VIGILANTE',
      crestType: 'owl'
    }
  },
  {
    id: 'badge_campeao_jornada',
    category: 'badge',
    name: 'Campeão da Jornada',
    description: 'Troféu forjado em ouro e safira com flâmula de consagração máxima.',
    rarity: 'lendario',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-500 via-yellow-600 to-amber-900',
      badgeBorder: 'border-yellow-300',
      ribbonText: 'CAMPEÃO',
      crestType: 'crown'
    }
  },
  {
    id: 'badge_guardiao_supremo',
    category: 'badge',
    name: 'Guardião Supremo',
    description: 'Coroa tríplice com brasão heráldico de proteção perpétua à juventude.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-600 via-orange-600 to-purple-900',
      badgeBorder: 'border-amber-300',
      ribbonText: 'SUPREMO',
      crestType: 'crown'
    }
  },
  {
    id: 'badge_diamante_resiliencia',
    category: 'badge',
    name: 'Diamante Inquebrável',
    description: 'Gema lapidada de dureza máxima imune a qualquer provocação maldosa.',
    rarity: 'lendario',
    iconPreview: '💎',
    unlockCondition: {
      type: 'breathing_count',
      minCount: 5,
      minLevel: 14,
      description: 'Complete 5 sessões de respiração e atinja o Nível 14'
    },
    badgeStyle: {
      badgeGradient: 'from-cyan-600 via-sky-700 to-blue-900',
      badgeBorder: 'border-cyan-300',
      ribbonText: 'FORTE',
      crestType: 'diamond'
    }
  },
  {
    id: 'badge_sombra_protetora',
    category: 'badge',
    name: 'Sentinela das Sombras',
    description: 'Máscara e capuz com lâminas protetoras cruzadas inspiradas no guerreiro invisível da paz.',
    rarity: 'mitico',
    iconPreview: '🥷',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'decisao_segura',
      minLevel: 16,
      description: 'Conquiste "Estrategista da Proteção" e alcance o Nível 16'
    },
    badgeStyle: {
      badgeGradient: 'from-slate-900 via-cyan-950 to-slate-950',
      badgeBorder: 'border-cyan-400',
      ribbonText: 'SOMBRA',
      crestType: 'ninja'
    }
  },
  {
    id: 'badge_sentinela_cosmico',
    category: 'badge',
    name: 'Sentinela Cósmico',
    description: 'Galáxia inteira em miniatura encapsulada em cristal estelar eterno.',
    rarity: 'mitico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    },
    badgeStyle: {
      badgeGradient: 'from-purple-900 via-indigo-950 to-slate-950',
      badgeBorder: 'border-purple-300',
      ribbonText: 'ASTRAL',
      crestType: 'star'
    }
  },
  {
    id: 'badge_reliquia_eterna',
    category: 'badge',
    name: 'Relíquia Eterna',
    description: 'Símbolo do infinito em ouro forjado com fogueira celestial reservado aos maiores defensores.',
    rarity: 'supremo',
    iconPreview: '♾️',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Desbloqueie 10 conquistas e alcance o Nível 20'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-400 via-rose-600 to-purple-900',
      badgeBorder: 'border-amber-200',
      ribbonText: 'ETERNO',
      crestType: 'infinity'
    }
  },
  {
    id: 'badge_guardiao_segredos',
    category: 'badge',
    name: 'Chave do Cofre Secreto',
    description: 'Chave ancestral forjada para proteger a confidencialidade e segurança total de todos.',
    rarity: 'mitico',
    isSecret: true,
    secretClue: 'Acompanhe seu código de protocolo seguro...',
    iconPreview: '🗝️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'guardiao_digital',
      description: 'Conquiste a insígnia "Agente Secreto do Protocolo"'
    },
    badgeStyle: {
      badgeGradient: 'from-slate-900 via-indigo-950 to-purple-950',
      badgeBorder: 'border-amber-400',
      ribbonText: 'SEGREDO',
      crestType: 'shield'
    }
  },

  // =========================================================================
  // 🔵 3. ÍCONES DE AVATAR (ICONS)
  // =========================================================================
  {
    id: 'icon_anonimo_padrao',
    category: 'icon',
    name: 'Silhueta Clássica',
    description: 'Ícone anônimo neutro padrão com foco na privacidade absoluta.',
    rarity: 'comum',
    iconPreview: '👤',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'icon_escudo_aprendiz',
    category: 'icon',
    name: 'Escudo Aprendiz',
    description: 'Símbolo clássico de defesa e compromisso com o ambiente escolar seguro.',
    rarity: 'comum',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 2,
      description: 'Desbloqueado ao atingir o Nível 2'
    }
  },
  {
    id: 'icon_compass_explorador',
    category: 'icon',
    name: 'Bússola Guia',
    description: 'Direcionamento ético e clareza para tomar decisões justas.',
    rarity: 'incomum',
    iconPreview: '🧭',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    }
  },
  {
    id: 'icon_pomba_paz',
    category: 'icon',
    name: 'Pomba da Paz',
    description: 'Símbolo universal de convivência fraterna e diálogo construtivo.',
    rarity: 'incomum',
    iconPreview: '🕊️',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    }
  },
  {
    id: 'icon_estrela_guia',
    category: 'icon',
    name: 'Estrela Guia',
    description: 'Referência positiva que inspira colegas de classe a agirem com respeito.',
    rarity: 'raro',
    iconPreview: '⭐',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    }
  },
  {
    id: 'icon_livro_sabedoria',
    category: 'icon',
    name: 'Livro do Conhecimento',
    description: 'Sabedoria sobre leis, direitos fundamentais e cidadania escolar.',
    rarity: 'raro',
    iconPreview: '📖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'conhecedor_direitos',
      description: 'Conquiste a insígnia "Calouro Anti-Treta"'
    }
  },
  {
    id: 'icon_coracao_empatia',
    category: 'icon',
    name: 'Coração Empático',
    description: 'Sensibilidade para se colocar no lugar do outro e estender a mão.',
    rarity: 'raro',
    iconPreview: '❤️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'coracao_de_ouro',
      description: 'Conquiste a insígnia "Embaixador da Empatia"'
    }
  },
  {
    id: 'icon_zen_lotus',
    category: 'icon',
    name: 'Lótus da Serenidade',
    description: 'Flor que floresce na calma e não se abala com tempestades ou zombarias.',
    rarity: 'raro',
    iconPreview: '🪷',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mente_tranquila',
      description: 'Conquiste a insígnia "Monge da Respiração Zen"'
    }
  },
  {
    id: 'icon_raio_acao',
    category: 'icon',
    name: 'Raio de Ação',
    description: 'Prontidão e agilidade para frear o desrespeito no primeiro sinal.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    }
  },
  {
    id: 'icon_oculos_radical',
    category: 'icon',
    name: 'Óculos da Atitude',
    description: 'Inspirado na atitude firme e inabalável que encara preconceitos com estilo e respeito.',
    rarity: 'epico',
    iconPreview: '🕶️',
    unlockCondition: {
      type: 'perfect_quiz_count',
      minCount: 1,
      description: 'Gabarite 1 quiz com 100% de aproveitamento'
    }
  },
  {
    id: 'icon_chama_coragem',
    category: 'icon',
    name: 'Chama da Coragem',
    description: 'Energia acolhedora que quebra o ciclo de silêncio e impunidade.',
    rarity: 'epico',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Desbloqueado ao atingir o Nível 11'
    }
  },
  {
    id: 'icon_cerebro_sabio',
    category: 'icon',
    name: 'Mente Perspicaz',
    description: 'Capacidade analítica superior para mediar e resolver atritos com ética.',
    rarity: 'epico',
    iconPreview: '🧠',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    }
  },
  {
    id: 'icon_trofeu_campeao',
    category: 'icon',
    name: 'Troféu do Campeão',
    description: 'Consagração de uma trajetória de aprendizado e apoio comunitário.',
    rarity: 'lendario',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    }
  },
  {
    id: 'icon_diamante_resiliencia',
    category: 'icon',
    name: 'Diamante Nobre',
    description: 'Brilho e pureza de intenções no cuidado com cada colega.',
    rarity: 'lendario',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 17,
      description: 'Desbloqueado ao atingir o Nível 17'
    }
  },
  {
    id: 'icon_coroa_sabedoria',
    category: 'icon',
    name: 'Coroa Imperial',
    description: 'Autoridade moral e liderança na promoção de um ambiente acolhedor.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    }
  },
  {
    id: 'icon_ninja_sentinela',
    category: 'icon',
    name: 'Guerreiro Encapuzado',
    description: 'Sentinela com capuz e olhar iluminado ciano que atua em silêncio pela justiça.',
    rarity: 'mitico',
    iconPreview: '🥷',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 10,
      description: 'Complete todas as 10 simulações interativas'
    }
  },
  {
    id: 'icon_coruja_guerreira',
    category: 'icon',
    name: 'Coruja Guerreira',
    description: 'Ícone estilizado de coruja com armadura tribal e olhos luminosos de sabedoria.',
    rarity: 'mitico',
    iconPreview: '🦉',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'sentinela_noturno',
      minLevel: 15,
      description: 'Conquiste a insígnia secreta "Sentinela Noturno" e alcance Nível 15'
    }
  },
  {
    id: 'icon_ciborgue_visor',
    category: 'icon',
    name: 'Visor Cibernético',
    description: 'Visor tático futurista de varredura contra cyberbullying e ataques digitais.',
    rarity: 'mitico',
    iconPreview: '🤖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'speedrunner_sabedoria',
      description: 'Conquiste a insígnia "Detetive Cibernético"'
    }
  },
  {
    id: 'icon_lenda_suprema',
    category: 'icon',
    name: 'Lenda Suprema',
    description: 'O ápice da jornada: brilho estelar infinito que irradia paz por onde passa.',
    rarity: 'supremo',
    iconPreview: '✨',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    }
  },

  // =========================================================================
  // 🏷️ 4. TÍTULOS COSMÉTICOS (TITLES)
  // =========================================================================
  {
    id: 'title_nivel_dinamico',
    category: 'title',
    name: 'Título Dinâmico do Nível',
    description: 'Exibe automaticamente o título correspondente ao seu nível atual (1 a 20).',
    rarity: 'comum',
    iconPreview: '🏷️',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'title_explorador_sentinela',
    category: 'title',
    name: 'Explorador do Sentinela',
    customTitleText: 'Explorador do Sentinela',
    description: 'Título para quem começou a desbravar as ferramentas da plataforma.',
    rarity: 'comum',
    iconPreview: '🧭',
    unlockCondition: {
      type: 'level',
      minLevel: 2,
      description: 'Desbloqueado ao atingir o Nível 2'
    }
  },
  {
    id: 'title_guardiao_escolar',
    category: 'title',
    name: 'Guardião Escolar',
    customTitleText: 'Guardião Escolar',
    description: 'Título para protetores ativos da boa convivência e respeito mútuo.',
    rarity: 'incomum',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    }
  },
  {
    id: 'title_sentinela_atento',
    category: 'title',
    name: 'Sentinela Atento',
    customTitleText: 'Sentinela Atento',
    description: 'Título que destaca uma postura vigilante e prestativa no dia a dia.',
    rarity: 'incomum',
    iconPreview: '👁️',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    }
  },
  {
    id: 'title_sentinela_elite',
    category: 'title',
    name: 'Sentinela de Elite',
    customTitleText: 'Sentinela de Elite',
    description: 'Título concedido a alunos que se destacam pela dedicação ética exemplar.',
    rarity: 'raro',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    }
  },
  {
    id: 'title_guardiao_empatia',
    category: 'title',
    name: 'Guardião da Empatia',
    customTitleText: 'Guardião da Empatia',
    description: 'Título para quem prioriza o acolhimento, escuta ativa e gentileza.',
    rarity: 'raro',
    iconPreview: '🤝',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'olhar_empatico',
      description: 'Conquiste a insígnia "Coração de Escudo & Acolhimento"'
    }
  },
  {
    id: 'title_pacificador_escolar',
    category: 'title',
    name: 'Pacificador Escolar',
    customTitleText: 'Pacificador Escolar',
    description: 'Título para especialistas em desarmar conflitos e promover a união.',
    rarity: 'raro',
    iconPreview: '🕊️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'coracao_de_ouro',
      description: 'Conquiste a insígnia "Embaixador da Empatia"'
    }
  },
  {
    id: 'title_mestre_protecao',
    category: 'title',
    name: 'Mestre da Proteção',
    customTitleText: 'Mestre da Proteção',
    description: 'Título para quem possui domínio tático sobre apoio a vítimas e segurança.',
    rarity: 'epico',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Desbloqueado ao atingir o Nível 11'
    }
  },
  {
    id: 'title_oraculo_empatia',
    category: 'title',
    name: 'Oráculo da Empatia',
    customTitleText: 'Oráculo da Empatia',
    description: 'Título para quem alcançou maestria absoluta nas simulações com escolhas empáticas.',
    rarity: 'epico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 6,
      description: 'Conclua pelo menos 6 simulações interativas'
    }
  },
  {
    id: 'title_mestre_convivencia',
    category: 'title',
    name: 'Mestre da Convivência',
    customTitleText: 'Mestre da Convivência',
    description: 'Título honorífico para estudantes que transformam positivamente sua turma.',
    rarity: 'epico',
    iconPreview: '🎓',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    }
  },
  {
    id: 'title_campeao_inclusao',
    category: 'title',
    name: 'Campeão da Inclusão',
    customTitleText: 'Campeão da Inclusão',
    description: 'Título de prestígio para quem não permite que ninguém fique isolado.',
    rarity: 'epico',
    iconPreview: '🌟',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'campeao_inclusao',
      description: 'Conquiste a insígnia "Radar Anti-Exclusão Social"'
    }
  },
  {
    id: 'title_lenda_sentinela',
    category: 'title',
    name: 'Lenda do Sentinela',
    customTitleText: 'Lenda do Sentinela',
    description: 'Título lendário reconhecido por toda a comunidade escolar.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 16,
      description: 'Desbloqueado ao atingir o Nível 16'
    }
  },
  {
    id: 'title_lorde_protetor',
    category: 'title',
    name: 'Lorde Protetor',
    customTitleText: 'Lorde Protetor',
    description: 'Título supremo de liderança pacífica e respeito perpétuo.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    }
  },
  {
    id: 'title_soberano_paz',
    category: 'title',
    name: 'Soberano da Paz',
    customTitleText: 'Soberano da Paz',
    description: 'Título mítico reservado a quem demonstrou sabedoria e coragem inabaláveis.',
    rarity: 'mitico',
    iconPreview: '🕊️',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    }
  },
  {
    id: 'title_caminhante_sombras',
    category: 'title',
    name: 'Caminhante das Sombras',
    customTitleText: 'Caminhante das Sombras',
    description: 'Título secreto para o guardião que protege os vulneráveis sem buscar holofotes.',
    rarity: 'mitico',
    isSecret: true,
    secretClue: 'Apenas os sentinelas da noite conhecem essa alcunha...',
    iconPreview: '🥷',
    unlockCondition: {
      type: 'secret',
      achievementId: 'sentinela_noturno',
      description: 'Conquiste a insígnia secreta da Sentinela Noturna'
    }
  },
  {
    id: 'title_sentinela_supremo',
    category: 'title',
    name: 'Sentinela Supremo',
    customTitleText: '👑 Sentinela Supremo 👑',
    description: 'O título mais alto de todo o ecossistema Sentinela Escolar. Glória eterna!',
    rarity: 'supremo',
    iconPreview: '🌈',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste pelo menos 10 insígnias'
    }
  },

  // =========================================================================
  // ✨ 5. EFEITOS VISUAIS & AURAS (EFFECTS)
  // =========================================================================
  {
    id: 'effect_nenhum',
    category: 'effect',
    name: 'Nenhum Efeito',
    description: 'Sem partículas ou auras especiais ao redor do avatar.',
    rarity: 'comum',
    iconPreview: '⚪',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'effect_brilho_roxo',
    category: 'effect',
    name: 'Aura Violeta Suave',
    description: 'Brilho roxo acolhedor que pulsa discretamente atrás do avatar.',
    rarity: 'incomum',
    iconPreview: '🟣',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-purple-500/25 blur-md'
    }
  },
  {
    id: 'effect_pulso_zen',
    category: 'effect',
    name: 'Pulso de Respiração Zen',
    description: 'Efeito relaxante que expande e contrai simulando um ciclo calmo de respiração.',
    rarity: 'raro',
    iconPreview: '🫁',
    unlockCondition: {
      type: 'breathing_count',
      minCount: 2,
      description: 'Complete 2 sessões de respiração'
    },
    effectStyle: {
      animationClass: 'animate-ping duration-1000',
      glowClass: 'bg-teal-400/20 blur-sm',
      particleEmoji: '🪷'
    }
  },
  {
    id: 'effect_faiscas_eletricas',
    category: 'effect',
    name: 'Faíscas Elétricas',
    description: 'Micro-faíscas e energia estática pulsando ao redor do aro de proteção.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-indigo-500/40 blur-md',
      particleEmoji: '⚡'
    }
  },
  {
    id: 'effect_estrelas_cadentes',
    category: 'effect',
    name: 'Brilho Astral Estelar',
    description: 'Pequenas estrelas e cintilações que giram no perímetro do perfil.',
    rarity: 'epico',
    iconPreview: '✨',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    },
    effectStyle: {
      animationClass: 'animate-spin duration-3000',
      glowClass: 'bg-cyan-400/30 blur-md',
      particleEmoji: '✨'
    }
  },
  {
    id: 'effect_aura_dourada',
    category: 'effect',
    name: 'Aura Solar Radiante',
    description: 'Brilho dourado majestoso digno de guardiões veteranos.',
    rarity: 'lendario',
    iconPreview: '☀️',
    unlockCondition: {
      type: 'level',
      minLevel: 14,
      description: 'Desbloqueado ao atingir o Nível 14'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-amber-400/50 blur-lg',
      particleEmoji: '🌟'
    }
  },
  {
    id: 'effect_chama_ardente',
    category: 'effect',
    name: 'Chama Protetora',
    description: 'Fogo eterno de coragem que ilumina o caminho da empatia.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 17,
      description: 'Desbloqueado ao atingir o Nível 17'
    },
    effectStyle: {
      animationClass: 'animate-bounce duration-700',
      glowClass: 'bg-orange-500/45 blur-lg',
      particleEmoji: '🔥'
    }
  },
  {
    id: 'effect_matrix_cyber',
    category: 'effect',
    name: 'Feixe Matrix Cibernético',
    description: 'Linhas holográficas ciano e glifos luminosos de varredura.',
    rarity: 'mitico',
    iconPreview: '🤖',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'speedrunner_sabedoria',
      minLevel: 15,
      description: 'Conquiste "Detetive Cibernético" e alcance o Nível 15'
    },
    effectStyle: {
      animationClass: 'animate-pulse duration-500',
      glowClass: 'bg-cyan-400/60 blur-xl',
      particleEmoji: '💠'
    }
  },
  {
    id: 'effect_prisma_divino',
    category: 'effect',
    name: 'Prisma da Concórdia',
    description: 'Aura holográfica multicor que reflete a mais nobre harmonia humana.',
    rarity: 'supremo',
    iconPreview: '🌈',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-gradient-to-r from-red-500/40 via-amber-400/40 via-cyan-400/40 to-purple-600/40 blur-xl',
      particleEmoji: '👑'
    }
  },

  // =========================================================================
  // 🎨 6. TEMAS DE CARTÃO DE PERFIL (THEMES)
  // =========================================================================
  {
    id: 'theme_sentinela_classico',
    category: 'theme',
    name: 'Sentinela Clássico',
    description: 'Tema padrão elegante com gradiente em tons profundos de ametista e índigo.',
    rarity: 'comum',
    iconPreview: '🟣',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    },
    themeStyle: {
      cardGradient: 'from-purple-900 via-purple-800 to-indigo-950',
      borderHighlight: 'border-purple-400/60',
      glowColor: 'bg-purple-500/20',
      accentBadge: 'bg-purple-500/30 text-purple-200'
    }
  },
  {
    id: 'theme_galaxia_noturna',
    category: 'theme',
    name: 'Galáxia Noturna',
    description: 'Fundo espacial em azul marinho cósmico com poeira estelar e ciano luminoso.',
    rarity: 'incomum',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    },
    themeStyle: {
      cardGradient: 'from-slate-950 via-indigo-950 to-blue-950',
      borderHighlight: 'border-cyan-400/50',
      glowColor: 'bg-cyan-500/20',
      accentBadge: 'bg-cyan-500/30 text-cyan-200'
    }
  },
  {
    id: 'theme_acolhimento_quente',
    category: 'theme',
    name: 'Acolhimento Quente',
    description: 'Tons acolhedores de vinho, rosa chá e rubi que transmitem empatia e segurança.',
    rarity: 'raro',
    iconPreview: '💖',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    },
    themeStyle: {
      cardGradient: 'from-rose-950 via-purple-950 to-pink-900',
      borderHighlight: 'border-rose-400/50',
      glowColor: 'bg-rose-500/20',
      accentBadge: 'bg-rose-500/30 text-rose-200'
    }
  },
  {
    id: 'theme_floresta_serena',
    category: 'theme',
    name: 'Floresta Serena',
    description: 'Gradiente em esmeralda profundo e verde menta para uma atmosfera de paz natural.',
    rarity: 'raro',
    iconPreview: '🌲',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    },
    themeStyle: {
      cardGradient: 'from-emerald-950 via-teal-950 to-slate-950',
      borderHighlight: 'border-emerald-400/50',
      glowColor: 'bg-emerald-500/20',
      accentBadge: 'bg-emerald-500/30 text-emerald-200'
    }
  },
  {
    id: 'theme_cyber_synthwave',
    category: 'theme',
    name: 'Cyber Synthwave Neon',
    description: 'Estética futurista vibrante em magenta neon, índigo profundo e bordas ciano.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    },
    themeStyle: {
      cardGradient: 'from-fuchsia-950 via-purple-900 to-cyan-950',
      borderHighlight: 'border-fuchsia-400/60',
      glowColor: 'bg-fuchsia-500/25',
      accentBadge: 'bg-fuchsia-500/30 text-fuchsia-200'
    }
  },
  {
    id: 'theme_ouro_campeao',
    category: 'theme',
    name: 'Ouro Nobre do Campeão',
    description: 'Ouro maciço, âmbar e bronze imperial para perfis de alta conquista.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 16,
      description: 'Desbloqueado ao atingir o Nível 16'
    },
    themeStyle: {
      cardGradient: 'from-amber-950 via-yellow-950 to-slate-950',
      borderHighlight: 'border-amber-400/70',
      glowColor: 'bg-amber-500/30',
      accentBadge: 'bg-amber-500/30 text-amber-200'
    }
  },
  {
    id: 'theme_ametista_real',
    category: 'theme',
    name: 'Ametista Real & Safira',
    description: 'Gradiente de luxo em violeta escuro, rubi e safira lapidada.',
    rarity: 'lendario',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    },
    themeStyle: {
      cardGradient: 'from-purple-950 via-indigo-900 to-rose-950',
      borderHighlight: 'border-purple-300/70',
      glowColor: 'bg-purple-500/30',
      accentBadge: 'bg-purple-400/30 text-purple-200'
    }
  },
  {
    id: 'theme_prisma_infinito',
    category: 'theme',
    name: 'Prisma Infinito dos Guardiões',
    description: 'Gradiente holográfico dinâmico dos 7 raios da sabedoria para mestres supremos.',
    rarity: 'supremo',
    iconPreview: '🌈',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível Máximo (20)'
    },
    themeStyle: {
      cardGradient: 'from-indigo-950 via-purple-900 via-rose-950 to-slate-950',
      borderHighlight: 'border-amber-300',
      glowColor: 'bg-amber-400/30',
      accentBadge: 'bg-amber-400/30 text-amber-200'
    }
  },
  {
    id: 'theme_sombra_sentinela',
    category: 'theme',
    name: 'Cofre das Sombras',
    description: 'Preto ônix militar com detalhes luminosos em ciano cibernético e sigilo total.',
    rarity: 'mitico',
    isSecret: true,
    secretClue: 'A chave confidencial do protocolo desbloqueia a escuridão protetora...',
    iconPreview: '🥷',
    unlockCondition: {
      type: 'secret',
      achievementId: 'guardiao_digital',
      description: 'Conquiste a insígnia "Agente Secreto do Protocolo"'
    },
    themeStyle: {
      cardGradient: 'from-slate-950 via-zinc-950 to-cyan-950',
      borderHighlight: 'border-cyan-500/60',
      glowColor: 'bg-cyan-500/20',
      accentBadge: 'bg-cyan-500/30 text-cyan-200'
    }
  }
];

// ==========================================
// 🛠️ FUNÇÕES AUXILIARES DE DESBLOQUEIO & DADOS
// ==========================================

export const DEFAULT_USER_COSMETICS: UserCosmeticsProfile = {
  equippedFrameId: 'frame_sentinela_classica',
  equippedIconId: 'icon_anonimo_padrao',
  equippedTitleId: 'title_nivel_dinamico',
  equippedBadgeId: 'badge_nenhum',
  equippedEffectId: 'effect_nenhum',
  equippedThemeId: 'theme_sentinela_classico',
  unlockedRewardIds: [
    'frame_sentinela_classica',
    'icon_anonimo_padrao',
    'title_nivel_dinamico',
    'badge_nenhum',
    'effect_nenhum',
    'theme_sentinela_classico'
  ]
};

/**
 * Check if a single cosmetic reward meets its unlock conditions
 */
export function isCosmeticUnlocked(
  item: CosmeticRewardItem, 
  currentLevel: number, 
  achievements: Achievement[],
  educationalProgress?: EducationalActivityProgress
): boolean {
  const cond = item.unlockCondition;
  if (cond.type === 'default') return true;
  
  if (cond.type === 'level') {
    return currentLevel >= (cond.minLevel || 1);
  }
  
  if (cond.type === 'achievement' && cond.achievementId) {
    const ach = achievements.find(a => a.id === cond.achievementId);
    const isAchDone = !!(ach && ach.isUnlocked);
    if (cond.minLevel) {
      return isAchDone && currentLevel >= cond.minLevel;
    }
    return isAchDone;
  }

  if (cond.type === 'quiz_count') {
    const minCount = cond.minCount || 1;
    const completedQuizzes = educationalProgress
      ? Object.values(educationalProgress.quizzesProgress || {}).filter(q => q.completed).length
      : 0;
    const isCountMet = completedQuizzes >= minCount;
    if (cond.minLevel) {
      return isCountMet && currentLevel >= cond.minLevel;
    }
    return isCountMet;
  }

  if (cond.type === 'perfect_quiz_count') {
    const minCount = cond.minCount || 1;
    const perfectCount = educationalProgress
      ? Object.values(educationalProgress.quizzesProgress || {}).filter(
          q => q.completed && q.totalQuestions > 0 && q.bestScore === q.totalQuestions
        ).length
      : 0;
    const isCountMet = perfectCount >= minCount;
    if (cond.minLevel) {
      return isCountMet && currentLevel >= cond.minLevel;
    }
    return isCountMet;
  }

  if (cond.type === 'simulation_count') {
    const minCount = cond.minCount || 1;
    const simCount = educationalProgress?.completedSimulations?.length || 0;
    const isCountMet = simCount >= minCount;
    if (cond.minLevel) {
      return isCountMet && currentLevel >= cond.minLevel;
    }
    return isCountMet;
  }

  if (cond.type === 'breathing_count') {
    const minCount = cond.minCount || 1;
    const count = educationalProgress?.breathingSessionsCount || (educationalProgress?.completedBreathingSession ? 1 : 0);
    const isCountMet = count >= minCount;
    if (cond.minLevel) {
      return isCountMet && currentLevel >= cond.minLevel;
    }
    return isCountMet;
  }

  if (cond.type === 'total_achievements') {
    const minCount = cond.minCount || 5;
    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    const isCountMet = unlockedCount >= minCount;
    if (cond.minLevel) {
      return isCountMet && currentLevel >= cond.minLevel;
    }
    return isCountMet;
  }

  if (cond.type === 'secret') {
    if (cond.achievementId) {
      const ach = achievements.find(a => a.id === cond.achievementId);
      return !!(ach && ach.isUnlocked);
    }
    return achievements.filter(a => a.isUnlocked).length >= 6 && currentLevel >= 8;
  }

  return false;
}

/**
 * Evaluates all items against current user state, returning the full list of unlocked IDs
 */
export function computeUnlockedCosmeticIds(
  currentLevel: number, 
  achievements: Achievement[],
  educationalProgress?: EducationalActivityProgress
): string[] {
  const unlockedIds: string[] = [];
  for (const item of ALL_COSMETIC_REWARDS) {
    if (isCosmeticUnlocked(item, currentLevel, achievements, educationalProgress)) {
      unlockedIds.push(item.id);
    }
  }
  return unlockedIds;
}

/**
 * Find cosmetic item by ID
 */
export function getCosmeticById(id: string): CosmeticRewardItem | undefined {
  return ALL_COSMETIC_REWARDS.find(item => item.id === id);
}

/**
 * Format category label in Portuguese
 */
export function getCategoryLabel(category: CosmeticCategory): string {
  switch (category) {
    case 'frame': return 'Molduras de Perfil';
    case 'icon': return 'Ícones de Avatar';
    case 'title': return 'Títulos Cosméticos';
    case 'badge': return 'Emblemas Especiais';
    case 'effect': return 'Efeitos Visuais';
    case 'theme': return 'Temas de Cartão';
    default: return 'Recompensas';
  }
}

/**
 * Get category icon emoji
 */
export function getCategoryEmoji(category: CosmeticCategory): string {
  switch (category) {
    case 'frame': return '🖼️';
    case 'icon': return '🛡️';
    case 'title': return '🏷️';
    case 'badge': return '🏅';
    case 'effect': return '✨';
    case 'theme': return '🎨';
    default: return '🎁';
  }
}

/**
 * Format rarity badge style (7 Tiers)
 */
export function getRarityBadge(rarity: CosmeticRarity | string): { 
  label: string; 
  bgClass: string; 
  textClass: string; 
  borderClass: string;
  glowClass?: string;
  order: number;
} {
  switch (rarity) {
    case 'supremo':
      return { 
        label: '🌈 Supremo', 
        bgClass: 'bg-gradient-to-r from-amber-200 via-pink-200 to-indigo-200', 
        textClass: 'text-purple-950 font-black', 
        borderClass: 'border-amber-400 shadow-xs',
        glowClass: 'shadow-amber-400/40 shadow-md',
        order: 7
      };
    case 'mitico':
      return { 
        label: '🔴 Mítico', 
        bgClass: 'bg-rose-100', 
        textClass: 'text-rose-950 font-black', 
        borderClass: 'border-rose-400 shadow-xs',
        glowClass: 'shadow-rose-500/30 shadow-sm',
        order: 6
      };
    case 'lendario':
      return { 
        label: '🟠 Lendário', 
        bgClass: 'bg-amber-100', 
        textClass: 'text-amber-950 font-black', 
        borderClass: 'border-amber-400 shadow-xs',
        glowClass: 'shadow-amber-500/30 shadow-sm',
        order: 5
      };
    case 'epico':
      return { 
        label: '🟣 Épico', 
        bgClass: 'bg-purple-100', 
        textClass: 'text-purple-950 font-black', 
        borderClass: 'border-purple-400',
        order: 4
      };
    case 'raro':
      return { 
        label: '🔵 Raro', 
        bgClass: 'bg-blue-100', 
        textClass: 'text-blue-950 font-bold', 
        borderClass: 'border-blue-400',
        order: 3
      };
    case 'incomum':
      return { 
        label: '🟢 Incomum', 
        bgClass: 'bg-emerald-100', 
        textClass: 'text-emerald-950 font-bold', 
        borderClass: 'border-emerald-300',
        order: 2
      };
    case 'comum':
    default:
      return { 
        label: '⚪ Comum', 
        bgClass: 'bg-slate-100', 
        textClass: 'text-slate-800 font-semibold', 
        borderClass: 'border-slate-300',
        order: 1
      };
  }
}

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
    id: 'frame_codigo_secreto',
    category: 'frame',
    name: 'Moldura Matriz do Código Secreto',
    description: 'Moldura cibernética com glifos decodificados e runas luminosas douradas e violetas.',
    rarity: 'lendario',
    iconPreview: '🔐',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_codigo_secreto',
      description: 'Desbloqueie a conquista secreta "Código Secreto"'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-amber-400 via-purple-600 to-indigo-700',
      glowClass: 'shadow-amber-500/50 shadow-xl ring-2 ring-amber-400/70',
      outerRingClass: 'border-2 border-amber-300'
    }
  },
  {
    id: 'frame_aura_empatia_secreta',
    category: 'frame',
    name: 'Moldura Aura da Empatia',
    description: 'Aura fluida em violeta e rubi radiante que envolve o perfil em acolhimento e proteção fraterna.',
    rarity: 'epico',
    iconPreview: '💜',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_sentinela_empatia',
      description: 'Desbloqueie a conquista secreta "Sentinela da Empatia"'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-400',
      glowClass: 'shadow-pink-500/40 shadow-lg ring-1 ring-pink-300',
      outerRingClass: 'border-2 border-pink-300'
    }
  },
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
    id: 'guardiao-cosmico',
    category: 'frame',
    name: 'Guardião Cósmico',
    description: 'Forjada com energia cósmica, essa moldura representa aqueles que protegem, acolhem e iluminam o caminho dos outros.',
    rarity: 'epico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'guardiao_cosmico',
      minLevel: 20,
      minEpicAchievements: 8,
      minStreakDays: 30,
      description: 'Alcance o Nível 20, 8 Conquistas Épicas e Sequência de 30 Dias'
    },
    loreQuote: '"Forjada com energia cósmica, essa moldura representa aqueles que protegem, acolhem e iluminam o caminho dos outros."',
    loreDetails: [
      {
        icon: '🔮',
        title: 'Cristal Estelar Superior',
        desc: 'Lapidado em ametista viva com facetas radiantes que canalizam sabedoria, foco e discernimento ético.'
      },
      {
        icon: '🛡️',
        title: 'Emblema Guardião Sagrado',
        desc: 'Escudo inferior forjado em ouro cósmico e ladeado por asas, honrando a proteção e união da comunidade.'
      },
      {
        icon: '🪐',
        title: 'Órbitas & Energia Cósmica',
        desc: 'Planetas astrais e órbitas celestes luminosas que giram em torno do sentinela em perfeita harmonia.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcançar o Nível 20',
        currentProgressKey: 'level',
        target: 20,
        icon: '👑'
      },
      {
        label: '8 Conquistas Épicas',
        currentProgressKey: 'epic_achievements',
        target: 8,
        icon: '🏆'
      },
      {
        label: 'Sequência de 30 Dias',
        currentProgressKey: 'days',
        target: 30,
        icon: '🔥'
      }
    ],
    frameStyle: {
      borderClass: 'p-0 bg-transparent',
      glowClass: 'shadow-purple-500/60 shadow-2xl',
      svgOverlay: 'guardiao_cosmico'
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

  // NOVIDADES EXPANSÃO: MOLDURAS TEMÁTICAS DE ALTO NÍVEL
  {
    id: 'frame_fenix_dourada',
    category: 'frame',
    name: 'Moldura Fênix Dourada',
    description: 'Renascida das cinzas, representa a força de quem nunca desiste e sempre volta ainda mais forte.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Alcance o Nível 18 e complete os módulos educativos'
    },
    loreQuote: '"Das cinzas da adversidade ergue-se o guardião inquebrantável que jamais recua diante do ódio."',
    loreDetails: [
      {
        icon: '🪽',
        title: 'Asas da Fênix em Ouro Solar',
        desc: 'Penas forjadas em ouro ardente que envolvem as laterais com proteção incondicional.'
      },
      {
        icon: '💎',
        title: 'Gema Rubi Solar Lapidada',
        desc: 'No ápice da coroa, reflete determinação e coragem para intervir em momentos críticos.'
      },
      {
        icon: '🛡️',
        title: 'Brasão Alado do Renascimento',
        desc: 'Coração de fogo eterno que simboliza superação e acolhimento perene.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 18',
        currentProgressKey: 'level',
        target: 18,
        icon: '🎯'
      },
      {
        label: 'Quizzes Concluídos',
        currentProgressKey: 'quizzes',
        target: 5,
        icon: '📚'
      },
      {
        label: 'Conquistas Desbloqueadas',
        currentProgressKey: 'achievements',
        target: 6,
        icon: '🏆'
      }
    ],
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600',
      glowClass: 'shadow-orange-500/70 shadow-2xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-amber-400',
      svgOverlay: 'fenix'
    }
  },
  {
    id: 'frame_guardiao_sombrio',
    category: 'frame',
    name: 'Moldura Guardião Sombrio',
    description: 'Poucos alcançam essa moldura. A energia sombria a torna símbolo de mistério, estratégia e poder incomparável.',
    rarity: 'mitico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Alcance o Nível 19 e conquiste 8 insígnias lendárias'
    },
    loreQuote: '"Nas sombras do anonimato seguro, a sentinela vigia com paciência de predador e coração de protetor."',
    loreDetails: [
      {
        icon: '⚡',
        title: 'Espigões de Cristal Obsidiana',
        desc: 'Estruturas pontiagudas de quartzo negro e violeta que interceptam ataques virtuais.'
      },
      {
        icon: '👑',
        title: 'Coroa Lapidada das Sombras',
        desc: 'Cristal ametista escuro engastado em ferro negro temperado.'
      },
      {
        icon: '🧭',
        title: 'Bússola Estelar da Noite',
        desc: 'Estrela de quatro pontas que aponta a rota ética mesmo na escuridão.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 19',
        currentProgressKey: 'level',
        target: 19,
        icon: '🎯'
      },
      {
        label: 'Conquistas Desbloqueadas',
        currentProgressKey: 'achievements',
        target: 8,
        icon: '🏆'
      },
      {
        label: 'Simulações Interativas',
        currentProgressKey: 'simulations',
        target: 6,
        icon: '🎭'
      }
    ],
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-purple-900 via-fuchsia-800 to-indigo-950',
      glowClass: 'shadow-purple-700/80 shadow-2xl ring-2 ring-purple-400',
      outerRingClass: 'border-2 border-purple-500',
      svgOverlay: 'sombrio'
    }
  },
  {
    id: 'frame_ondas_amizade',
    category: 'frame',
    name: 'Moldura Ondas da Amizade',
    description: 'Inspirada no mar da empatia, essa moldura celebra laços verdadeiros e atitudes que fazem a diferença na vida dos outros.',
    rarity: 'raro',
    iconPreview: '🌊',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Alcance o Nível 10 e pratique exercícios de serenidade'
    },
    loreQuote: '"Como o oceano que abraça a praia suavemente, acolha quem precisa com calmaria e respeito."',
    loreDetails: [
      {
        icon: '🌊',
        title: 'Cristas Oceânicas de Espuma',
        desc: 'Ondas em azul safira e ciano que circundam o avatar com fluidez contínua.'
      },
      {
        icon: '⭐',
        title: 'Estrela-do-Mar da Concórdia',
        desc: 'Adorno náutico dourado que representa união entre diferentes personalidades.'
      },
      {
        icon: '💧',
        title: 'Lágrima de Safira das Profundezas',
        desc: 'Gema líquida lapidada que limpa preconceitos e desentendimentos.'
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
        label: 'Sessões de Respiração',
        currentProgressKey: 'breathing',
        target: 2,
        icon: '🫁'
      }
    ],
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600',
      glowClass: 'shadow-cyan-400/60 shadow-xl ring-2 ring-cyan-200',
      outerRingClass: 'border-2 border-sky-300',
      svgOverlay: 'ondas'
    }
  },
  {
    id: 'frame_eco_sentinela',
    category: 'frame',
    name: 'Moldura Eco Sentinela',
    description: 'Tecnologia e natureza juntas para lembrar que pequenas atitudes podem transformar o mundo.',
    rarity: 'incomum',
    iconPreview: '🌱',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    },
    loreQuote: '"Grandes florestas nascem de pequenas mudas; grandes culturas de paz nascem de gestos gentis diários."',
    loreDetails: [
      {
        icon: '🪨',
        title: 'Aro em Pedra Rúnica Antiga',
        desc: 'Base sólida entalhada com rebites de bronze e sulcos ancestrais.'
      },
      {
        icon: '🌿',
        title: 'Hera da Regeneração',
        desc: 'Folhas verde-esmeralda vivas que crescem contornando o aro de proteção.'
      },
      {
        icon: '🤖',
        title: 'Robô Mascote Eco',
        desc: 'Amigo cibernético sustentável segurando um broto de esperança no canto inferior.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 6',
        currentProgressKey: 'level',
        target: 6,
        icon: '🎯'
      },
      {
        label: 'Dias de Sequência',
        currentProgressKey: 'days',
        target: 2,
        icon: '🔥'
      }
    ],
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-600',
      glowClass: 'shadow-emerald-500/40 shadow-lg ring-1 ring-emerald-300',
      outerRingClass: 'border-2 border-emerald-300',
      svgOverlay: 'eco'
    }
  },
  {
    id: 'frame_palhacada_divertida',
    category: 'frame',
    name: 'Moldura Palhaçada Divertida',
    description: 'Para quem usa o humor como arma do bem! Espalhe alegria, respeito e boas risadas.',
    rarity: 'lendario',
    iconPreview: '🤡',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 3,
      minLevel: 13,
      description: 'Conclua 3 simulações interativas e alcance o Nível 13'
    },
    loreQuote: '"O riso sincero desarma os conflitos mais difíceis e une quem parecia distante."',
    loreDetails: [
      {
        icon: '🎩',
        title: 'Gorro Tricolor de Bobo da Corte',
        desc: 'Chapéu festivo com guizos dourados de circo que tilintam a cada vitória.'
      },
      {
        icon: '🕶️',
        title: 'Disfarce Clássico de Meme',
        desc: 'Óculos escuros 8-bit com nariz de batata e bigodinho cômico inconfundível.'
      },
      {
        icon: '🐔',
        title: 'Galinha de Borracha Estratégica',
        desc: 'A sentinela mais ruidosa e carismática de todos os tempos.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 13',
        currentProgressKey: 'level',
        target: 13,
        icon: '🎯'
      },
      {
        label: 'Simulações Concluídas',
        currentProgressKey: 'simulations',
        target: 3,
        icon: '🎭'
      }
    ],
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-400 via-yellow-300 to-rose-500',
      glowClass: 'shadow-amber-400/60 shadow-2xl ring-2 ring-yellow-200',
      outerRingClass: 'border-2 border-amber-400',
      svgOverlay: 'palhacada'
    }
  },
  {
    id: 'frame_gamer_sentinela',
    category: 'frame',
    name: 'Moldura Gamer Sentinela',
    description: 'Play, evolua e seja um herói dentro e fora das telas. Cada missão conta!',
    rarity: 'epico',
    iconPreview: '🎮',
    unlockCondition: {
      type: 'level',
      minLevel: 14,
      description: 'Alcance o Nível 14 e conclua 4 quizzes educativos'
    },
    loreQuote: '"Um verdadeiro pro player sabe que o fair play e o respeito à equipe valem mais que qualquer vitória."',
    loreDetails: [
      {
        icon: '🎧',
        title: 'Headset Pro com Orelhas de Gato Neon',
        desc: 'Acabamento em magenta e ciano luminoso com microfone retrátil de comando.'
      },
      {
        icon: '👾',
        title: 'Corações & Controles 8-Bit',
        desc: 'Partículas retro-pixel flutuando ao redor das laterais do perfil.'
      },
      {
        icon: '⭐',
        title: 'Estrela Dourada do Arcade',
        desc: 'Medalha central retro que certifica o status de jogador exemplar.'
      }
    ],
    unlockRequirementsList: [
      {
        label: 'Alcance o Nível 14',
        currentProgressKey: 'level',
        target: 14,
        icon: '🎯'
      },
      {
        label: 'Quizzes Completados',
        currentProgressKey: 'quizzes',
        target: 4,
        icon: '🕹️'
      }
    ],
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-cyan-400',
      glowClass: 'shadow-fuchsia-500/60 shadow-xl ring-2 ring-cyan-300',
      outerRingClass: 'border-2 border-fuchsia-400',
      svgOverlay: 'gamer'
    }
  },
  {
    id: 'frame_coroa_sentinela',
    category: 'frame',
    name: 'Moldura Coroa do Sentinela',
    description: 'A majestade absoluta da liderança escolar. Apenas os sentinelas mais lendários usam essa coroa imperial.',
    rarity: 'supremo',
    iconPreview: '👑',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
    },
    frameStyle: {
      borderClass: 'p-2.5 bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-600',
      glowClass: 'shadow-amber-400/80 shadow-2xl ring-3 ring-amber-300',
      outerRingClass: 'border-2 border-yellow-300',
      svgOverlay: 'coroa_suprema'
    }
  },
  {
    id: 'frame_guardiao_dragao',
    category: 'frame',
    name: 'Moldura Guardião Dragão',
    description: 'Escamas de dragão ancestral e chamas que incineram bullying e intolerância.',
    rarity: 'mitico',
    iconPreview: '🐉',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Alcance o Nível 18'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-red-700 via-amber-500 to-orange-800',
      glowClass: 'shadow-orange-600/70 shadow-2xl ring-2 ring-amber-400',
      outerRingClass: 'border-2 border-red-500',
      svgOverlay: 'dragao_fogo'
    }
  },
  {
    id: 'frame_vortice_dimensional',
    category: 'frame',
    name: 'Moldura Vórtice Dimensional',
    description: 'Energia quântica em espiral que viaja através das dimensões da sabedoria.',
    rarity: 'epico',
    iconPreview: '🌀',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Alcance o Nível 11'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-teal-400 via-indigo-600 to-purple-700',
      glowClass: 'shadow-teal-400/50 shadow-xl ring-2 ring-purple-300',
      outerRingClass: 'border-2 border-teal-300',
      svgOverlay: 'portal_vortex'
    }
  },
  {
    id: 'frame_lanche_lendario',
    category: 'frame',
    name: 'Moldura Lanche Lendário',
    description: 'Porque ninguém salva o colégio de estômago vazio! Pizza, taco e lanches da cantina.',
    rarity: 'raro',
    iconPreview: '🍕',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Alcance o Nível 7'
    },
    frameStyle: {
      borderClass: 'p-1 bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-500',
      glowClass: 'shadow-amber-400/40 shadow-md ring-1 ring-amber-300',
      outerRingClass: 'border-2 border-amber-400',
      svgOverlay: 'comida_delicia'
    }
  },
  {
    id: 'frame_caos_meme',
    category: 'frame',
    name: 'Moldura 100% Sem Paciência',
    description: 'Para aqueles dias de provas consecutivas e grupos de trabalho que não entregam nada no prazo!',
    rarity: 'epico',
    iconPreview: '💢',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Alcance o Nível 12'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-rose-600 via-amber-500 to-red-700',
      glowClass: 'shadow-rose-500/60 shadow-xl ring-2 ring-amber-300',
      outerRingClass: 'border-2 border-rose-500',
      svgOverlay: 'caos_meme'
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
    id: 'badge_detetive_sentinela',
    category: 'badge',
    name: 'Emblema Lupa Dourada do Detetive',
    description: 'Insígnia de ouro reluzente concedida a quem desvendou a trilha investigativa e preventiva.',
    rarity: 'raro',
    iconPreview: '🕵️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_detetive_sentinela',
      description: 'Desbloqueie a conquista secreta "Detetive do Sentinela"'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-600 via-yellow-700 to-amber-950',
      badgeBorder: 'border-amber-300',
      ribbonText: 'DETETIVE',
      crestType: 'shield'
    }
  },
  {
    id: 'badge_precisao_absoluta',
    category: 'badge',
    name: 'Emblema Alvo Radiante Cósmico',
    description: 'Comenda de precisão máxima por gabaritar múltiplos quizzes e decisões com excelência.',
    rarity: 'lendario',
    iconPreview: '🎯',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_precisao_absoluta',
      description: 'Desbloqueie a conquista secreta "Precisão Absoluta"'
    },
    badgeStyle: {
      badgeGradient: 'from-purple-800 via-rose-700 to-amber-600',
      badgeBorder: 'border-amber-300',
      ribbonText: 'PRECISÃO',
      crestType: 'star'
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

  // NOVIDADES EXPANSÃO: EMBLEMAS TEMÁTICOS DE VIDEOGAME
  {
    id: 'badge_escudo_guardiao',
    category: 'badge',
    name: 'Escudo do Guardião da Honra',
    description: 'Forjado em prata reluzente e safira, concedido a quem sempre defende os colegas.',
    rarity: 'raro',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Alcance o Nível 7'
    },
    badgeStyle: {
      badgeGradient: 'from-blue-700 via-indigo-800 to-slate-900',
      badgeBorder: 'border-cyan-300',
      ribbonText: 'HONRA',
      crestType: 'shield'
    }
  },
  {
    id: 'badge_nucleo_energia',
    category: 'badge',
    name: 'Núcleo de Plasma da Sentinela',
    description: 'Orbe pulsar de alta voltagem que irradia energia e proatividade.',
    rarity: 'epico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Alcance o Nível 11'
    },
    badgeStyle: {
      badgeGradient: 'from-fuchsia-700 via-purple-800 to-indigo-950',
      badgeBorder: 'border-fuchsia-400',
      ribbonText: 'ENERGIA',
      crestType: 'orb'
    }
  },
  {
    id: 'badge_coroa_suprema',
    category: 'badge',
    name: 'Coroa Soberana dos Campeões',
    description: 'A mais alta comenda estudantil, conferida à nobreza do caráter e da integridade.',
    rarity: 'supremo',
    iconPreview: '👑',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-400 via-yellow-500 to-amber-700',
      badgeBorder: 'border-yellow-200',
      ribbonText: 'SOBERANO',
      crestType: 'crown'
    }
  },
  {
    id: 'badge_fragmento_cosmico',
    category: 'badge',
    name: 'Fragmento Astral Cósmico',
    description: 'Estrela cadente cristalizada que brilha com a imensidão da sabedoria escolar.',
    rarity: 'lendario',
    iconPreview: '⭐',
    unlockCondition: {
      type: 'level',
      minLevel: 16,
      description: 'Alcance o Nível 16'
    },
    badgeStyle: {
      badgeGradient: 'from-indigo-800 via-purple-900 to-slate-950',
      badgeBorder: 'border-cyan-300',
      ribbonText: 'COSMOS',
      crestType: 'star'
    }
  },
  {
    id: 'badge_chama_fenix',
    category: 'badge',
    name: 'Brasão da Fênix Ardente',
    description: 'Símbolo do renascimento e da coragem indomável em superar qualquer adversidade.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 17,
      description: 'Alcance o Nível 17'
    },
    badgeStyle: {
      badgeGradient: 'from-orange-600 via-amber-600 to-red-800',
      badgeBorder: 'border-amber-300',
      ribbonText: 'FÊNIX',
      crestType: 'phoenix'
    }
  },
  {
    id: 'badge_cristal_serenidade',
    category: 'badge',
    name: 'Cristal da Serenidade Viva',
    description: 'Gema translúcida lapidada que traz clareza mental e tranquilidade em momentos tensos.',
    rarity: 'raro',
    iconPreview: '💎',
    unlockCondition: {
      type: 'breathing_count',
      minCount: 3,
      description: 'Complete 3 sessões de respiração'
    },
    badgeStyle: {
      badgeGradient: 'from-teal-600 via-cyan-700 to-emerald-900',
      badgeBorder: 'border-teal-300',
      ribbonText: 'SERENO',
      crestType: 'gem'
    }
  },
  {
    id: 'badge_mente_estrategica',
    category: 'badge',
    name: 'Coruja Tática dos Quizzes',
    description: 'Insígnia heráldica para quem analisa situações com lógica afiada e discernimento.',
    rarity: 'epico',
    iconPreview: '🦉',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 4,
      minLevel: 10,
      description: 'Complete 4 quizzes e atinja o Nível 10'
    },
    badgeStyle: {
      badgeGradient: 'from-purple-800 via-indigo-900 to-slate-950',
      badgeBorder: 'border-indigo-300',
      ribbonText: 'TÁTICA',
      crestType: 'owl'
    }
  },
  {
    id: 'badge_trofeu_excelencia',
    category: 'badge',
    name: 'Taça da Excelência Ética',
    description: 'Troféu áureo concedido aos maiores exemplos de conduta, cidadania e coleguismo.',
    rarity: 'lendario',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Alcance o Nível 19'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-500 via-yellow-600 to-amber-800',
      badgeBorder: 'border-yellow-200',
      ribbonText: 'GLÓRIA',
      crestType: 'trophy'
    }
  },
  {
    id: 'badge_mascara_teatral',
    category: 'badge',
    name: 'Máscara Teatral da Empatia',
    description: 'Para quem sabe se colocar no lugar do outro e compreender seus sentimentos.',
    rarity: 'raro',
    iconPreview: '🎭',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 4,
      description: 'Complete 4 simulações interativas'
    },
    badgeStyle: {
      badgeGradient: 'from-rose-700 via-purple-800 to-indigo-900',
      badgeBorder: 'border-rose-300',
      ribbonText: 'EMPATIA',
      crestType: 'mask'
    }
  },
  {
    id: 'badge_eco_natureza',
    category: 'badge',
    name: 'Broto Tecnológico Eco',
    description: 'Medalha em bronze e esmeralda para os guardiões do bem-estar e da sustentabilidade.',
    rarity: 'incomum',
    iconPreview: '🌱',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    },
    badgeStyle: {
      badgeGradient: 'from-emerald-700 via-green-800 to-teal-950',
      badgeBorder: 'border-emerald-400',
      ribbonText: 'ECO',
      crestType: 'leaf'
    }
  },
  {
    id: 'badge_ondas_oceano',
    category: 'badge',
    name: 'Mar Profundo da Amizade',
    description: 'Gotas e marés cristalinas que acolhem e integram todos na turma.',
    rarity: 'raro',
    iconPreview: '🌊',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    },
    badgeStyle: {
      badgeGradient: 'from-cyan-700 via-sky-800 to-blue-950',
      badgeBorder: 'border-sky-300',
      ribbonText: 'AMIZADE',
      crestType: 'water'
    }
  },
  {
    id: 'badge_gamer_retro',
    category: 'badge',
    name: 'Controle Dourado Arcade',
    description: 'Certificado de honra para o gamer consciente que joga limpo e repele toxicidade.',
    rarity: 'epico',
    iconPreview: '🎮',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    },
    badgeStyle: {
      badgeGradient: 'from-fuchsia-700 via-purple-800 to-indigo-900',
      badgeBorder: 'border-fuchsia-300',
      ribbonText: 'ARCADE',
      crestType: 'sparkle'
    }
  },
  {
    id: 'badge_riso_dourado',
    category: 'badge',
    name: 'Guizo Dourado do Riso',
    description: 'Para quem alegra o dia de todos com bom humor respeitoso e inteligência cómica.',
    rarity: 'lendario',
    iconPreview: '🤡',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    },
    badgeStyle: {
      badgeGradient: 'from-amber-400 via-rose-500 to-yellow-600',
      badgeBorder: 'border-amber-200',
      ribbonText: 'ALEGRIA',
      crestType: 'crown'
    }
  },

  // =========================================================================
  // 🔵 3. ÍCONES DE AVATAR (ICONS)
  // =========================================================================
  {
    id: 'icon_raio_sabedoria',
    category: 'icon',
    name: 'Raio Cósmico da Sabedoria',
    description: 'Ícone elétrico dourado pulsante concedido pelo combo contínuo de aprendizado.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_combo_conhecimento',
      description: 'Desbloqueie a conquista secreta "Combo do Conhecimento"'
    }
  },
  {
    id: 'icon_bussola_astral',
    category: 'icon',
    name: 'Bússola Astral do Explorador',
    description: 'Instrumento náutico místico que guiou o desbravamento de todas as áreas pedagógicas.',
    rarity: 'raro',
    iconPreview: '🌙',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_explorador_noturno_areas',
      description: 'Desbloqueie a conquista secreta "Explorador Oculto"'
    }
  },
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

  // NOVIDADES EXPANSÃO: ÍCONES EXCLUSIVOS DE VIDEOGAME
  {
    id: 'icon_robo_eco',
    category: 'icon',
    name: 'Robô Eco Sustentável',
    description: 'Mascote cibernético que cultiva atitudes saudáveis e cuida do ambiente escolar.',
    rarity: 'incomum',
    iconPreview: '🤖',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    }
  },
  {
    id: 'icon_sentinela_radical',
    category: 'icon',
    name: 'Sentinela Radical da Atitude',
    description: 'Óculos de sol pixelados para encarar desafios com estilo, confiança e respeito.',
    rarity: 'incomum',
    iconPreview: '🕶️',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    }
  },
  {
    id: 'icon_fatia_pizza',
    category: 'icon',
    name: 'Fatia Quente da Amizade',
    description: 'Porque a melhor hora do intervalo é compartilhar o lanche sem deixar ninguém de fora!',
    rarity: 'incomum',
    iconPreview: '🍕',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    }
  },
  {
    id: 'icon_alien_amigavel',
    category: 'icon',
    name: 'Alienígena da Paz Cósmica',
    description: 'Visitante interestelar com grandes olhos curiosos que celebra a diversidade de todas as espécies.',
    rarity: 'raro',
    iconPreview: '👽',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    }
  },
  {
    id: 'icon_controle_gamer',
    category: 'icon',
    name: 'Controle Retrô Gamer',
    description: 'Game pad retrô com botões dourados que comanda a vitória do fair play.',
    rarity: 'epico',
    iconPreview: '🎮',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 3,
      minLevel: 12,
      description: 'Complete 3 quizzes e alcance o Nível 12'
    }
  },
  {
    id: 'icon_gato_gamer',
    category: 'icon',
    name: 'Gatinho Gamer Pro',
    description: 'Felino streamer com headset de orelhinhas luminosas que não aceita grosserias no chat.',
    rarity: 'epico',
    iconPreview: '🐱',
    unlockCondition: {
      type: 'level',
      minLevel: 14,
      description: 'Desbloqueado ao atingir o Nível 14'
    }
  },
  {
    id: 'icon_mago_arcano',
    category: 'icon',
    name: 'Mago Arcano da Sabedoria',
    description: 'Capuz estrelado e cajado arcano com feitiços contra notícias falsas e boatos.',
    rarity: 'epico',
    iconPreview: '🧙',
    unlockCondition: {
      type: 'perfect_quiz_count',
      minCount: 2,
      description: 'Acerte 100% em pelo menos 2 quizzes'
    }
  },
  {
    id: 'icon_frango_comico',
    category: 'icon',
    name: 'Frango Cômico da Paz',
    description: 'A sentinela de borracha que faz barulho estridente contra injustiças e faz a turma rir.',
    rarity: 'lendario',
    iconPreview: '🐔',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 5,
      description: 'Complete 5 simulações interativas'
    }
  },
  {
    id: 'icon_elmo_espartano',
    category: 'icon',
    name: 'Elmo do Defensor Espartano',
    description: 'Elmo de bronze dourado com crista escarlate de coragem inabalável.',
    rarity: 'lendario',
    iconPreview: '🪖',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    }
  },
  {
    id: 'icon_dragao_mistico',
    category: 'icon',
    name: 'Dragão Místico Protetor',
    description: 'Criatura mítica de olhos incandescentes que protege o colégio com suas asas de fogo.',
    rarity: 'mitico',
    iconPreview: '🐉',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    }
  },
  {
    id: 'icon_ampulheta',
    category: 'icon',
    name: 'Ampulheta Cósmica do Tempo',
    description: 'Artefato ancestral que flui areia estelar ensinando que a paciência resolve qualquer impasse.',
    rarity: 'mitico',
    iconPreview: '⏳',
    unlockCondition: {
      type: 'breathing_count',
      minCount: 4,
      minLevel: 16,
      description: 'Complete 4 sessões de respiração e alcance o Nível 16'
    }
  },
  {
    id: 'icon_portal_dimensional',
    category: 'icon',
    name: 'Vórtice Dimensional Infinito',
    description: 'Singularidade cósmica que conecta todas as dimensões da sabedoria e do conhecimento humano.',
    rarity: 'supremo',
    iconPreview: '🌀',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
    }
  },

  // =========================================================================
  // 🏷️ 4. TÍTULOS COSMÉTICOS (TITLES)
  // =========================================================================
  {
    id: 'title_lenda_oculta',
    category: 'title',
    name: '✦ Lenda Oculta ✦',
    customTitleText: '✦ Lenda Oculta ✦',
    description: 'O título mais misterioso e respeitado de todo o ecossistema Sentinela Escolar.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_lenda_oculta',
      description: 'Desbloqueie a conquista secreta "Lenda Oculta"'
    }
  },
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

  // NOVIDADES EXPANSÃO: TÍTULOS DIVERTIDOS, GAMER E ÉPICOS
  {
    id: 'title_rei_do_quiz',
    category: 'title',
    name: 'Rei do Quiz',
    customTitleText: 'Rei do Quiz',
    description: 'Para quem domina as perguntas com rapidez cirúrgica e sem pestanejar.',
    rarity: 'incomum',
    iconPreview: '🎯',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 3,
      description: 'Conclua 3 quizzes educativos'
    }
  },
  {
    id: 'title_lenda_wifi',
    category: 'title',
    name: 'Lenda do Wi-Fi Escolar',
    customTitleText: 'Lenda do Wi-Fi',
    description: 'Sempre conectado e o primeiro a saber das novidades da turma.',
    rarity: 'incomum',
    iconPreview: '📶',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    }
  },
  {
    id: 'title_eco_guardiao',
    category: 'title',
    name: 'Eco-Guardião da Terra',
    customTitleText: 'Eco-Guardião',
    description: 'Protetor fervoroso do meio ambiente e da sustentabilidade na escola.',
    rarity: 'incomum',
    iconPreview: '🌱',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    }
  },
  {
    id: 'title_so_mais_uma',
    category: 'title',
    name: 'Mestre do "Só Mais Uma"',
    customTitleText: 'Só Mais Uma Partida',
    description: 'A clássica promessa de quem nunca quer parar antes de fechar o desafio com perfeição.',
    rarity: 'raro',
    iconPreview: '🎮',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    }
  },
  {
    id: 'title_cacador_xp',
    category: 'title',
    name: 'Caçador Insaciável de XP',
    customTitleText: 'Caçador de XP',
    description: 'Ganha pontos em tudo o que faz e lidera o placar com orgulho.',
    rarity: 'raro',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    }
  },
  {
    id: 'title_memeiro_oficial',
    category: 'title',
    name: 'Memeiro Oficial da Turma',
    customTitleText: 'Memeiro Oficial',
    description: 'Usa piadas saudáveis para aliviar o estresse da galera antes das provas.',
    rarity: 'raro',
    iconPreview: '🤡',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 3,
      description: 'Conclua 3 simulações interativas'
    }
  },
  {
    id: 'title_comandante_amizade',
    category: 'title',
    name: 'Comandante da Amizade',
    customTitleText: 'Comandante da Amizade',
    description: 'Oceano de empatia que acolhe novos colegas e não deixa ninguém solitário.',
    rarity: 'raro',
    iconPreview: '🌊',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    }
  },
  {
    id: 'title_sem_sono',
    category: 'title',
    name: 'Sentinela Sem Sono',
    customTitleText: 'Sentinela Sem Sono',
    description: 'Movido a foco, dedicação e litros de entusiasmo para aprender.',
    rarity: 'raro',
    iconPreview: '☕',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Desbloqueado ao atingir o Nível 11'
    }
  },
  {
    id: 'title_sem_paciencia',
    category: 'title',
    name: '100% Sem Paciência para Bullying',
    customTitleText: '100% Sem Paciência',
    description: 'Tolerância zero absoluta para fofocas, injustiças e covardias!',
    rarity: 'epico',
    iconPreview: '💢',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    }
  },
  {
    id: 'title_devorador_quizzes',
    category: 'title',
    name: 'Devorador de Quizzes',
    customTitleText: 'Devorador de Quizzes',
    description: 'Completou todas as trilhas com sede inabalável de saber.',
    rarity: 'epico',
    iconPreview: '📚',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 5,
      minLevel: 14,
      description: 'Conclua todos os 5 quizzes e atinja o Nível 14'
    }
  },
  {
    id: 'title_fenix_imortal',
    category: 'title',
    name: 'Fênix Imortal das Cinzas',
    customTitleText: 'Fênix Imortal',
    description: 'A prova viva de que podemos recomeçar e nos tornar mais fortes a cada obstáculo.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 17,
      description: 'Desbloqueado ao atingir o Nível 17'
    }
  },
  {
    id: 'title_guardiao_absoluto',
    category: 'title',
    name: 'Guardião Absoluto da Honra',
    customTitleText: 'Guardião Absoluto',
    description: 'Escudo inquebrantável respeitado por professores e colegas.',
    rarity: 'lendario',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    }
  },
  {
    id: 'title_entidade_conhecimento',
    category: 'title',
    name: 'Entidade do Conhecimento',
    customTitleText: 'Entidade do Saber',
    description: 'Nível mitológico de discernimento e lucidez ética.',
    rarity: 'mitico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    }
  },
  {
    id: 'title_soberano_cosmico',
    category: 'title',
    name: '✦ Soberano Cósmico ✦',
    customTitleText: '✦ Soberano Cósmico ✦',
    description: 'O universo da convivência e do respeito em sua expressão mais pura e magnífica.',
    rarity: 'supremo',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
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
    id: 'effect_mente_atenta_aurora',
    category: 'effect',
    name: 'Aurora Boreal da Mente Atenta',
    description: 'Ondas boreais em azul celeste e esmeralda emanando do avatar em foco pleno.',
    rarity: 'epico',
    iconPreview: '🧠',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'secret_mente_atenta',
      description: 'Desbloqueie a conquista secreta "Mente Atenta"'
    },
    effectStyle: {
      animationClass: 'animate-pulse duration-700',
      glowClass: 'bg-gradient-to-tr from-cyan-400/40 via-teal-300/40 to-indigo-500/40 blur-lg',
      particleEmoji: '✨'
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

  // NOVIDADES EXPANSÃO: EFEITOS VISUAIS E AURAS DINÂMICAS
  {
    id: 'effect_folhas_eco',
    category: 'effect',
    name: 'Espiral de Folhas Eco',
    description: 'Folhas verdes suaves e brotos que giram ao redor do perfil trazendo frescor.',
    rarity: 'incomum',
    iconPreview: '🍃',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    },
    effectStyle: {
      animationClass: 'animate-spin duration-3000',
      glowClass: 'bg-emerald-500/25 blur-sm',
      particleEmoji: '🍃'
    }
  },
  {
    id: 'effect_ondas_oceano',
    category: 'effect',
    name: 'Bolhas & Marés da Amizade',
    description: 'Bolhas azuis translúcidas que sobem suavemente pelo avatar em clima de calmaria.',
    rarity: 'raro',
    iconPreview: '🫧',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    },
    effectStyle: {
      animationClass: 'animate-bounce duration-1000',
      glowClass: 'bg-cyan-400/30 blur-md',
      particleEmoji: '🫧'
    }
  },
  {
    id: 'effect_pixels_gamer',
    category: 'effect',
    name: 'Pixels Flutuantes Retrô Gamer',
    description: 'Partículas 8-bit e coraçõezinhos pixelados que sobem com estilo arcade.',
    rarity: 'epico',
    iconPreview: '👾',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Desbloqueado ao atingir o Nível 11'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-fuchsia-500/40 blur-md',
      particleEmoji: '👾'
    }
  },
  {
    id: 'effect_raios_trovao',
    category: 'effect',
    name: 'Arcos de Plasma do Trovão',
    description: 'Descargas de energia ciano e violeta que pulsam em alta velocidade.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'quiz_count',
      minCount: 3,
      minLevel: 13,
      description: 'Complete 3 quizzes e alcance o Nível 13'
    },
    effectStyle: {
      animationClass: 'animate-ping duration-700',
      glowClass: 'bg-sky-400/45 blur-lg',
      particleEmoji: '⚡'
    }
  },
  {
    id: 'effect_labaredas_fenix',
    category: 'effect',
    name: 'Labaredas da Fênix Solar',
    description: 'Chamas douradas ardentes que emanam calor, coragem e renovação constante.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 16,
      description: 'Desbloqueado ao atingir o Nível 16'
    },
    effectStyle: {
      animationClass: 'animate-bounce duration-500',
      glowClass: 'bg-amber-400/50 blur-lg',
      particleEmoji: '🔥'
    }
  },
  {
    id: 'effect_confete_festivo',
    category: 'effect',
    name: 'Chuva de Confete & Risadas',
    description: 'Festa de cores e alegria contagiante para quem espalha bom humor.',
    rarity: 'lendario',
    iconPreview: '🎉',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 4,
      minLevel: 15,
      description: 'Complete 4 simulações e atinja o Nível 15'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-yellow-400/40 blur-md',
      particleEmoji: '🎉'
    }
  },
  {
    id: 'effect_nevoa_espectral',
    category: 'effect',
    name: 'Névoa Sombria Espectral',
    description: 'Gases etéreos em violeta escuro e ametista que envolvem o avatar em mistério.',
    rarity: 'mitico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    },
    effectStyle: {
      animationClass: 'animate-pulse duration-1000',
      glowClass: 'bg-purple-800/60 blur-xl',
      particleEmoji: '🔮'
    }
  },
  {
    id: 'effect_constelacao_cosmica',
    category: 'effect',
    name: 'Constelação Cósmica Giratória',
    description: 'Órbitas estelares em espiral com poeira galáctica cintilante.',
    rarity: 'mitico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'speedrunner_sabedoria',
      minLevel: 18,
      description: 'Conquiste "Detetive Cibernético" e alcance Nível 18'
    },
    effectStyle: {
      animationClass: 'animate-spin duration-[4000ms]',
      glowClass: 'bg-indigo-500/50 blur-xl',
      particleEmoji: '✨'
    }
  },
  {
    id: 'effect_brilho_diamante',
    category: 'effect',
    name: 'Resplendor Supremo de Diamante',
    description: 'Feixes prismáticos de luz branca e dourada de pura majestade.',
    rarity: 'supremo',
    iconPreview: '💎',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'bg-cyan-200/60 blur-xl ring-2 ring-white',
      particleEmoji: '💎'
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
  },

  // NOVIDADES EXPANSÃO: TEMAS DE PERFIL COM TEMÁTICAS DE VIDEOGAME
  {
    id: 'theme_eco_natureza',
    category: 'theme',
    name: 'Eco Floresta Tecnológica',
    description: 'Gradiente revigorante em verde musgo, esmeralda e detalhes em jade luminoso.',
    rarity: 'incomum',
    iconPreview: '🌱',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    },
    themeStyle: {
      cardGradient: 'from-emerald-950 via-teal-900 to-green-950',
      borderHighlight: 'border-emerald-400/60',
      glowColor: 'bg-emerald-500/25',
      accentBadge: 'bg-emerald-500/30 text-emerald-200'
    }
  },
  {
    id: 'theme_ondas_oceano',
    category: 'theme',
    name: 'Oceano Profundo da Amizade',
    description: 'Tons marinhos de azul abissal, ciano turquesa e reflexos de madrepérola.',
    rarity: 'raro',
    iconPreview: '🌊',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    },
    themeStyle: {
      cardGradient: 'from-sky-950 via-cyan-900 to-blue-950',
      borderHighlight: 'border-cyan-400/60',
      glowColor: 'bg-cyan-500/25',
      accentBadge: 'bg-cyan-500/30 text-cyan-200'
    }
  },
  {
    id: 'theme_gamer_arcade',
    category: 'theme',
    name: 'Gamer Arcade Cyberpunk',
    description: 'Fundo escuro tecnológico com realces neon em violeta, fúcsia e ciano elétrico.',
    rarity: 'epico',
    iconPreview: '🎮',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    },
    themeStyle: {
      cardGradient: 'from-fuchsia-950 via-purple-950 to-indigo-950',
      borderHighlight: 'border-fuchsia-400/70',
      glowColor: 'bg-fuchsia-500/30',
      accentBadge: 'bg-fuchsia-500/30 text-fuchsia-200'
    }
  },
  {
    id: 'theme_palhacada_carnaval',
    category: 'theme',
    name: 'Carnaval Dourado & Risos',
    description: 'Gradiente festivo em ouro, rubi e âmbar quente que celebra o alto astral.',
    rarity: 'lendario',
    iconPreview: '🤡',
    unlockCondition: {
      type: 'simulation_count',
      minCount: 4,
      minLevel: 14,
      description: 'Conclua 4 simulações e alcance o Nível 14'
    },
    themeStyle: {
      cardGradient: 'from-amber-950 via-rose-950 to-yellow-950',
      borderHighlight: 'border-amber-400/70',
      glowColor: 'bg-amber-500/30',
      accentBadge: 'bg-amber-500/30 text-amber-200'
    }
  },
  {
    id: 'theme_fenix_solar',
    category: 'theme',
    name: 'Fênix Solar & Fogo Eterno',
    description: 'Gradiente incandescente em rubi solar, laranja magma e ouro brilhante.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 17,
      description: 'Desbloqueado ao atingir o Nível 17'
    },
    themeStyle: {
      cardGradient: 'from-red-950 via-orange-950 to-amber-950',
      borderHighlight: 'border-orange-400/70',
      glowColor: 'bg-orange-500/30',
      accentBadge: 'bg-orange-500/30 text-orange-200'
    }
  },
  {
    id: 'theme_guardiao_sombrio',
    category: 'theme',
    name: 'Noite Eterna das Sombras',
    description: 'Preto obsidiana profundo com linhas de força em ametista e névoa violeta.',
    rarity: 'mitico',
    iconPreview: '🔮',
    unlockCondition: {
      type: 'level',
      minLevel: 19,
      description: 'Desbloqueado ao atingir o Nível 19'
    },
    themeStyle: {
      cardGradient: 'from-purple-950 via-slate-950 to-indigo-950',
      borderHighlight: 'border-purple-400/70',
      glowColor: 'bg-purple-600/30',
      accentBadge: 'bg-purple-500/30 text-purple-200'
    }
  },
  {
    id: 'theme_coroa_suprema',
    category: 'theme',
    name: 'Suprema Majestade Imperial',
    description: 'O ápice estético: gradiente em ouro imperial, platina e auréola cósmica.',
    rarity: 'supremo',
    iconPreview: '👑',
    unlockCondition: {
      type: 'total_achievements',
      minCount: 10,
      minLevel: 20,
      description: 'Alcance o Nível 20 e conquiste 10 insígnias'
    },
    themeStyle: {
      cardGradient: 'from-amber-950 via-purple-950 via-indigo-950 to-slate-950',
      borderHighlight: 'border-amber-300',
      glowColor: 'bg-amber-400/40',
      accentBadge: 'bg-amber-400/30 text-amber-200'
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
  educationalProgress?: EducationalActivityProgress,
  streakDays: number = 1
): boolean {
  const cond = item.unlockCondition;
  if (cond.type === 'default') return true;

  // Requisitos específicos de Guardião Cósmico
  if (cond.type === 'guardiao_cosmico' || item.id === 'guardiao-cosmico' || item.id === 'frame_guardiao_cosmico') {
    const minLevel = cond.minLevel ?? 20;
    const minEpic = cond.minEpicAchievements ?? 8;
    const minStreak = cond.minStreakDays ?? 30;

    const epicCount = achievements.filter(
      a => (a.isUnlocked || (a as any).unlocked) && (a.tier === 'ouro' || a.tier === 'lendario' || (a as any).rarity === 'epico')
    ).length;

    return currentLevel >= minLevel && epicCount >= minEpic && streakDays >= minStreak;
  }
  
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
  educationalProgress?: EducationalActivityProgress,
  streakDays: number = 1
): string[] {
  const unlockedIds: string[] = [];
  for (const item of ALL_COSMETIC_REWARDS) {
    if (isCosmeticUnlocked(item, currentLevel, achievements, educationalProgress, streakDays)) {
      unlockedIds.push(item.id);
    }
  }
  return unlockedIds;
}

/**
 * Find cosmetic item by ID
 */
export function getCosmeticById(id: string): CosmeticRewardItem | undefined {
  if (id === 'guardiao-cosmico' || id === 'frame_guardiao_cosmico') {
    return ALL_COSMETIC_REWARDS.find(item => item.id === 'guardiao-cosmico' || item.id === 'frame_guardiao_cosmico');
  }
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

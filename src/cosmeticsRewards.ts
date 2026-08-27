import { CosmeticRewardItem, CosmeticCategory, Achievement, UserCosmeticsProfile } from './types';

export const ALL_COSMETIC_REWARDS: CosmeticRewardItem[] = [
  // ==========================================
  // 🖼️ 1. MOLDURAS DE PERFIL (FRAMES)
  // ==========================================
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
    rarity: 'comum',
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
    rarity: 'raro',
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
    id: 'frame_veterano_trovao',
    category: 'frame',
    name: 'Moldura Trovão & Energia',
    description: 'Acabamento elétrico com reflexos violeta para sentinelas experientes.',
    rarity: 'epico',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-indigo-500 via-amber-300 to-purple-600',
      glowClass: 'shadow-indigo-500/50 shadow-xl ring-2 ring-purple-400',
      outerRingClass: 'border-2 border-indigo-400'
    }
  },
  {
    id: 'frame_estelar_cosmica',
    category: 'frame',
    name: 'Moldura Estelar Cósmica',
    description: 'Aro com gradiente estelar multicor e brilho que reflete uma mente perspicaz.',
    rarity: 'epico',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-fuchsia-500 via-cyan-400 to-purple-600',
      glowClass: 'shadow-fuchsia-500/50 shadow-xl ring-2 ring-cyan-300',
      outerRingClass: 'border-2 border-cyan-400'
    }
  },
  {
    id: 'frame_mestre_protecao',
    category: 'frame',
    name: 'Moldura Mestre da Proteção',
    description: 'Moldura reforçada em titânio e rubi para defensores exemplares.',
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
  {
    id: 'frame_diamante_safira',
    category: 'frame',
    name: 'Moldura Diamante & Safira',
    description: 'Facetas cristalinas brilhantes inspiradas em diamantes e pedras preciosas.',
    rarity: 'lendario',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-cyan-300 via-blue-500 to-indigo-300',
      glowClass: 'shadow-cyan-400/60 shadow-2xl ring-2 ring-cyan-200',
      outerRingClass: 'border-2 border-cyan-300'
    }
  },
  {
    id: 'frame_lendaria_suprema',
    category: 'frame',
    name: 'Moldura Lendária Suprema',
    description: 'A moldura máxima do Sentinela Escolar. Acabamento solar, partículas e borda dourada suprema.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20 (Nível Máximo)'
    },
    frameStyle: {
      borderClass: 'p-2 bg-gradient-to-tr from-amber-300 via-rose-400 to-amber-500 animate-pulse',
      glowClass: 'shadow-amber-400/70 shadow-2xl ring-4 ring-amber-300',
      outerRingClass: 'border-3 border-amber-300'
    }
  },
  {
    id: 'frame_conquistas_ouro',
    category: 'frame',
    name: 'Moldura Coroa de Conquistas',
    description: 'Concedida aos alunos que desbloquearam a prestigiada medalha Colecionador Supremo.',
    rarity: 'lendario',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'colecionador_supremo',
      description: 'Desbloqueada com a conquista Colecionador Supremo'
    },
    frameStyle: {
      borderClass: 'p-1.5 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-600',
      glowClass: 'shadow-amber-500/60 shadow-xl ring-2 ring-amber-400',
      outerRingClass: 'border-2 border-yellow-300'
    }
  },

  // ==========================================
  // 🛡️ 2. ÍCONES DE PERFIL (ICONS)
  // ==========================================
  {
    id: 'icon_anonimo_padrao',
    category: 'icon',
    name: 'Silhueta Anônima',
    description: 'Ícone clássico e neutro de silhueta estudantil 100% anônima.',
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
    name: 'Escudo Sentinela',
    description: 'Símbolo clássico de proteção, segurança e vigilância ética.',
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
    name: 'Bússola da Paz',
    description: 'Mostra o norte moral e a orientação correta para resolver desentendimentos.',
    rarity: 'comum',
    iconPreview: '🧭',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    }
  },
  {
    id: 'icon_estrela_guia',
    category: 'icon',
    name: 'Estrela Guia',
    description: 'Ilumina o caminho e serve de bom exemplo para a turma.',
    rarity: 'comum',
    iconPreview: '⭐',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    }
  },
  {
    id: 'icon_livro_sabedoria',
    category: 'icon',
    name: 'Livro da Consciência',
    description: 'Representa a Lei Anti-Bullying e o conhecimento das regras de boa convivência.',
    rarity: 'comum',
    iconPreview: '📚',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    }
  },
  {
    id: 'icon_coracao_empatia',
    category: 'icon',
    name: 'Coração da Empatia',
    description: 'Símbolo máximo de acolhimento, escuta atenta e sensibilidade humana.',
    rarity: 'raro',
    iconPreview: '💜',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    }
  },
  {
    id: 'icon_trofeu_campeao',
    category: 'icon',
    name: 'Troféu Sentinela',
    description: 'Reconhece o esforço em participar de quizzes e atividades preventivas.',
    rarity: 'raro',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    }
  },
  {
    id: 'icon_raio_acao',
    category: 'icon',
    name: 'Raio da Ação',
    description: 'Atitude ágil e firme diante de injustiças ou atitudes desrespeitosas.',
    rarity: 'raro',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 11,
      description: 'Desbloqueado ao atingir o Nível 11'
    }
  },
  {
    id: 'icon_chama_coragem',
    category: 'icon',
    name: 'Chama da Coragem',
    description: 'Aquece os corações com bravura para recusar atitudes de intimidação.',
    rarity: 'epico',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    }
  },
  {
    id: 'icon_cerebro_sabio',
    category: 'icon',
    name: 'Mente Brilhante',
    description: 'Pensamento crítico e reflexivo para tomada de decisões inteligentes.',
    rarity: 'epico',
    iconPreview: '🧠',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    }
  },
  {
    id: 'icon_diamante_resiliencia',
    category: 'icon',
    name: 'Diamante da Resiliência',
    description: 'Inquebrável sob pressão e com brilho inconfundível.',
    rarity: 'epico',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 16,
      description: 'Desbloqueado ao atingir o Nível 16'
    }
  },
  {
    id: 'icon_coroa_sabedoria',
    category: 'icon',
    name: 'Coroa da Sabedoria',
    description: 'Distinção nobre de quem lidera pelo exemplo de empatia e fraternidade.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    }
  },
  {
    id: 'icon_lenda_suprema',
    category: 'icon',
    name: 'Astro Lendário',
    description: 'Ícone lendário que celebra a maestria completa em todas as jornadas escolares.',
    rarity: 'lendario',
    iconPreview: '🌟',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    }
  },
  {
    id: 'icon_pomba_paz',
    category: 'icon',
    name: 'Pomba da Paz',
    description: 'Ícone concedido a quem desarmou tensões e promoveu a conciliação.',
    rarity: 'raro',
    iconPreview: '🕊️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'advogado_do_bem',
      description: 'Desbloqueado com a conquista Advogado do Bem'
    }
  },
  {
    id: 'icon_zen_lotus',
    category: 'icon',
    name: 'Flor de Lótus Zen',
    description: 'Símbolo de serenidade e autocontrole emocional em momentos desafiadores.',
    rarity: 'raro',
    iconPreview: '🧘',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mestre_zen',
      description: 'Desbloqueado com a conquista Mestre Zen'
    }
  },

  // ==========================================
  // 🏷️ 3. TÍTULOS DE PERFIL (TITLES)
  // ==========================================
  {
    id: 'title_nivel_dinamico',
    category: 'title',
    name: 'Título Oficial do Nível',
    description: 'Exibe automaticamente o título conquistado na sua trilha de nível atual.',
    rarity: 'comum',
    iconPreview: '🏷️',
    customTitleText: 'Oficial do Nível',
    unlockCondition: {
      type: 'default',
      description: 'Padrão da plataforma'
    }
  },
  {
    id: 'title_guardiao_empatia',
    category: 'title',
    name: 'Guardião da Empatia',
    description: 'Destaca uma pessoa atenta às emoções dos colegas e disposta a apoiar.',
    rarity: 'comum',
    iconPreview: '🛡️',
    customTitleText: 'Guardião da Empatia',
    unlockCondition: {
      type: 'level',
      minLevel: 3,
      description: 'Desbloqueado ao atingir o Nível 3'
    }
  },
  {
    id: 'title_defensor_respeito',
    category: 'title',
    name: 'Defensor do Respeito',
    description: 'Compromisso público com a dignidade e inclusão de todos os estudantes.',
    rarity: 'raro',
    iconPreview: '💜',
    customTitleText: 'Defensor do Respeito',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    }
  },
  {
    id: 'title_sentinela_paz',
    category: 'title',
    name: 'Sentinela da Paz',
    description: 'Vigia constante que transforma o ambiente ao redor em um espaço seguro.',
    rarity: 'raro',
    iconPreview: '⭐',
    customTitleText: 'Sentinela da Paz',
    unlockCondition: {
      type: 'level',
      minLevel: 9,
      description: 'Desbloqueado ao atingir o Nível 9'
    }
  },
  {
    id: 'title_mestre_desafios',
    category: 'title',
    name: 'Mestre dos Desafios',
    description: 'Para quem superou cenários complexos com sabedoria e empatia.',
    rarity: 'epico',
    iconPreview: '🔥',
    customTitleText: 'Mestre dos Desafios',
    unlockCondition: {
      type: 'level',
      minLevel: 13,
      description: 'Desbloqueado ao atingir o Nível 13'
    }
  },
  {
    id: 'title_mente_sentinela',
    category: 'title',
    name: 'Mente Sentinela',
    description: 'Conhecimento aprofundado dos direitos de proteção e convivência ética.',
    rarity: 'epico',
    iconPreview: '🧠',
    customTitleText: 'Mente Sentinela',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    }
  },
  {
    id: 'title_heroi_comunidade',
    category: 'title',
    name: 'Herói da Comunidade',
    description: 'Reconhecimento comunitário por anos de postura exemplar e solidária.',
    rarity: 'lendario',
    iconPreview: '🌟',
    customTitleText: 'Herói da Comunidade',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    }
  },
  {
    id: 'title_lenda_escolar',
    category: 'title',
    name: 'Lenda Escolar',
    description: 'O título de maior prestígio do Sentinela Escolar. Referência absoluta.',
    rarity: 'lendario',
    iconPreview: '👑',
    customTitleText: 'Lenda Escolar',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    }
  },
  {
    id: 'title_pacificator_ativo',
    category: 'title',
    name: 'Pacificador Ativo',
    description: 'Desbloqueado por atos de bondade comprovados na jornada.',
    rarity: 'raro',
    iconPreview: '🕊️',
    customTitleText: 'Pacificador Ativo',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'coracao_de_ouro',
      description: 'Desbloqueado com a conquista Coração de Ouro'
    }
  },
  {
    id: 'title_mestre_estrategia',
    category: 'title',
    name: 'Mestre das Decisões',
    description: 'Para quem explorou múltiplos caminhos e compreendeu as consequências de cada escolha.',
    rarity: 'epico',
    iconPreview: '🎯',
    customTitleText: 'Mestre das Decisões',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'pensador_estrategico',
      description: 'Desbloqueado com a conquista Pensador Estratégico'
    }
  },
  {
    id: 'title_escudo_digital',
    category: 'title',
    name: 'Guardião Digital',
    description: 'Especialista em proteção contra cyberbullying e privacidade na internet.',
    rarity: 'raro',
    iconPreview: '🌐',
    customTitleText: 'Guardião Digital',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'guardiao_digital',
      description: 'Desbloqueado com a conquista Guardião Digital'
    }
  },
  {
    id: 'title_amigo_leal',
    category: 'title',
    name: 'Campeão da Inclusão',
    description: 'Garante que ninguém fique isolado ou excluído nas atividades da turma.',
    rarity: 'epico',
    iconPreview: '🤝',
    customTitleText: 'Campeão da Inclusão',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'campeao_inclusao',
      description: 'Desbloqueado com a conquista Campeão da Inclusão'
    }
  },

  // ==========================================
  // 🏅 4. EMBLEMAS ESPECIAIS (BADGES)
  // ==========================================
  {
    id: 'badge_nenhum',
    category: 'badge',
    name: 'Sem Emblema Extra',
    description: 'Exibição padrão focada apenas no nível oficial.',
    rarity: 'comum',
    iconPreview: '⭕',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'badge_mestre_quizzes',
    category: 'badge',
    name: 'Mestre dos Quizzes',
    description: 'Emblema que comprova excelente pontuação nos testes educativos.',
    rarity: 'raro',
    iconPreview: '🏆',
    unlockCondition: {
      type: 'level',
      minLevel: 5,
      description: 'Desbloqueado ao atingir o Nível 5'
    }
  },
  {
    id: 'badge_defensor_escola',
    category: 'badge',
    name: 'Defensor da Escola',
    description: 'Emblema com escudo de aço que sinaliza compromisso com a segurança coletiva.',
    rarity: 'raro',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 8,
      description: 'Desbloqueado ao atingir o Nível 8'
    }
  },
  {
    id: 'badge_mestre_empatia',
    category: 'badge',
    name: 'Mestre da Empatia',
    description: 'Emblema em coração cintilante concedido a quem pratica acolhimento real.',
    rarity: 'raro',
    iconPreview: '💜',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    }
  },
  {
    id: 'badge_guardiao_seguranca',
    category: 'badge',
    name: 'Guardião da Segurança',
    description: 'Emblema que destaca vigilância ativa contra situações de perigo e preconceito.',
    rarity: 'epico',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    }
  },
  {
    id: 'badge_explorador_conhecimento',
    category: 'badge',
    name: 'Explorador do Conhecimento',
    description: 'Emblema com estrela estelar para estudantes de mente curiosa.',
    rarity: 'epico',
    iconPreview: '⭐',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    }
  },
  {
    id: 'badge_lenda_sentinela',
    category: 'badge',
    name: 'Lenda do Sentinela',
    description: 'O emblema mais raro de toda a instituição escolar. Um marco honorífico.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    }
  },
  {
    id: 'badge_mente_zen',
    category: 'badge',
    name: 'Mestre Zen & Equilíbrio',
    description: 'Emblema que destaca maestria no autocuidado e técnicas de respiração.',
    rarity: 'raro',
    iconPreview: '🌬️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mestre_zen',
      description: 'Desbloqueado com a conquista Mestre Zen'
    }
  },
  {
    id: 'badge_mente_sentinela',
    category: 'badge',
    name: 'Mente Sentinela',
    description: 'Emblema honorífico por dominar a enciclopédia completa de prevenção.',
    rarity: 'epico',
    iconPreview: '🧠',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'enciclopedia_viva',
      description: 'Desbloqueado com a conquista Enciclopédia Viva'
    }
  },

  // ==========================================
  // ✨ 5. EFEITOS VISUAIS DE PERFIL (EFFECTS)
  // ==========================================
  {
    id: 'effect_nenhum',
    category: 'effect',
    name: 'Sem Efeito Visual',
    description: 'Perfil limpo e sem auras visuais extras.',
    rarity: 'comum',
    iconPreview: '⚪',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    }
  },
  {
    id: 'effect_brilho_suave',
    category: 'effect',
    name: 'Brilho Suave Roxo',
    description: 'Uma luz suave em tom púrpura ao redor do avatar que pulsa discretamente.',
    rarity: 'comum',
    iconPreview: '✨',
    unlockCondition: {
      type: 'level',
      minLevel: 4,
      description: 'Desbloqueado ao atingir o Nível 4'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-2 ring-purple-400/50 shadow-purple-500/30 shadow-md',
      particleEmoji: '✨'
    }
  },
  {
    id: 'effect_aura_escudo',
    category: 'effect',
    name: 'Aura Protetora Escolar',
    description: 'Halo protetor com reflexos azul-celeste transmitindo serenidade e segurança.',
    rarity: 'raro',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'level',
      minLevel: 7,
      description: 'Desbloqueado ao atingir o Nível 7'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-2 ring-blue-400/70 shadow-blue-500/40 shadow-lg',
      particleEmoji: '🛡️'
    }
  },
  {
    id: 'effect_particulas_energia',
    category: 'effect',
    name: 'Faíscas de Energia',
    description: 'Pequenos relâmpagos e centelhas amarelas pulsando suavemente.',
    rarity: 'raro',
    iconPreview: '⚡',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    },
    effectStyle: {
      animationClass: 'animate-bounce',
      glowClass: 'ring-2 ring-amber-300/80 shadow-amber-400/40 shadow-lg',
      particleEmoji: '⚡'
    }
  },
  {
    id: 'effect_aura_elite',
    category: 'effect',
    name: 'Aura de Elite Cintilante',
    description: 'Halo violeta com reflexos cintilantes que confere aspecto sofisticado ao perfil.',
    rarity: 'epico',
    iconPreview: '💜',
    unlockCondition: {
      type: 'level',
      minLevel: 12,
      description: 'Desbloqueado ao atingir o Nível 12'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-3 ring-purple-400 shadow-fuchsia-500/50 shadow-xl',
      particleEmoji: '💜'
    }
  },
  {
    id: 'effect_brilho_estelar',
    category: 'effect',
    name: 'Brilho Estelar Dourado',
    description: 'Partículas estelares radiantes com reflexos dourados suaves ao redor do avatar.',
    rarity: 'epico',
    iconPreview: '🌟',
    unlockCondition: {
      type: 'level',
      minLevel: 15,
      description: 'Desbloqueado ao atingir o Nível 15'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-3 ring-amber-300 shadow-yellow-400/60 shadow-xl',
      particleEmoji: '⭐'
    }
  },
  {
    id: 'effect_radiacao_lendaria',
    category: 'effect',
    name: 'Resplendor Lendário Dourado',
    description: 'A aura visual mais espetacular e distinta da plataforma para o nível 20.',
    rarity: 'lendario',
    iconPreview: '🔥',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-4 ring-amber-400 shadow-amber-500/80 shadow-2xl',
      particleEmoji: '👑'
    }
  },
  {
    id: 'effect_ondas_calma',
    category: 'effect',
    name: 'Ondas Suaves de Calma',
    description: 'Efeito tranquilo com ondulações em tom de água cristalina.',
    rarity: 'raro',
    iconPreview: '🌊',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'mente_tranquila',
      description: 'Desbloqueado com a conquista Mente Tranquila'
    },
    effectStyle: {
      animationClass: 'animate-pulse',
      glowClass: 'ring-2 ring-teal-300/80 shadow-teal-400/40 shadow-lg',
      particleEmoji: '💧'
    }
  },

  // ==========================================
  // 🎨 6. TEMAS DE PERFIL (THEMES)
  // ==========================================
  {
    id: 'theme_sentinela_classico',
    category: 'theme',
    name: 'Tema Sentinela Roxo Clássico',
    description: 'O tema institucional clássico em tons de roxo escuro, índigo e bordas discretas.',
    rarity: 'comum',
    iconPreview: '🟣',
    unlockCondition: {
      type: 'default',
      description: 'Disponível desde o Nível 1'
    },
    themeStyle: {
      cardGradient: 'from-purple-900 via-purple-800 to-indigo-950',
      borderHighlight: 'border-purple-500/40 hover:border-purple-400/90',
      glowColor: 'from-purple-500/20 to-indigo-500/20',
      accentBadge: 'bg-purple-700/60 text-purple-200 border-purple-500/30',
      textColor: 'text-white'
    }
  },
  {
    id: 'theme_noite_estrelada',
    category: 'theme',
    name: 'Tema Noite & Guardião',
    description: 'Um cartão escuro em tons de azul da meia-noite e constelações sutis.',
    rarity: 'raro',
    iconPreview: '🌌',
    unlockCondition: {
      type: 'level',
      minLevel: 6,
      description: 'Desbloqueado ao atingir o Nível 6'
    },
    themeStyle: {
      cardGradient: 'from-slate-950 via-blue-950 to-indigo-950',
      borderHighlight: 'border-blue-500/40 hover:border-blue-300/90',
      glowColor: 'from-blue-500/30 to-cyan-500/20',
      accentBadge: 'bg-blue-800/60 text-blue-200 border-blue-400/40',
      textColor: 'text-blue-50'
    }
  },
  {
    id: 'theme_galaxia_cosmica',
    category: 'theme',
    name: 'Tema Galáxia Profunda',
    description: 'Gradiente interestelar mesclando fúcsia, violeta e preto cósmico.',
    rarity: 'raro',
    iconPreview: '🪐',
    unlockCondition: {
      type: 'level',
      minLevel: 10,
      description: 'Desbloqueado ao atingir o Nível 10'
    },
    themeStyle: {
      cardGradient: 'from-purple-950 via-fuchsia-950 to-slate-950',
      borderHighlight: 'border-fuchsia-500/50 hover:border-fuchsia-300/90',
      glowColor: 'from-fuchsia-500/30 to-purple-500/30',
      accentBadge: 'bg-fuchsia-900/60 text-fuchsia-200 border-fuchsia-400/40',
      textColor: 'text-fuchsia-50'
    }
  },
  {
    id: 'theme_aurora_esmeralda',
    category: 'theme',
    name: 'Tema Aurora & Esperança',
    description: 'Inspiração na aurora boreal com tons refrescantes de esmeralda e turquesa.',
    rarity: 'epico',
    iconPreview: '🟢',
    unlockCondition: {
      type: 'level',
      minLevel: 14,
      description: 'Desbloqueado ao atingir o Nível 14'
    },
    themeStyle: {
      cardGradient: 'from-emerald-950 via-teal-950 to-slate-950',
      borderHighlight: 'border-emerald-500/50 hover:border-emerald-300/90',
      glowColor: 'from-emerald-500/30 to-teal-500/30',
      accentBadge: 'bg-emerald-900/60 text-emerald-200 border-emerald-400/40',
      textColor: 'text-emerald-50'
    }
  },
  {
    id: 'theme_diamante_safira',
    category: 'theme',
    name: 'Tema Diamante & Safira',
    description: 'Estilo nobre com brilhos azuis límpidos e contrastes translúcidos de alta fidelidade.',
    rarity: 'epico',
    iconPreview: '💎',
    unlockCondition: {
      type: 'level',
      minLevel: 18,
      description: 'Desbloqueado ao atingir o Nível 18'
    },
    themeStyle: {
      cardGradient: 'from-sky-950 via-blue-950 to-cyan-950',
      borderHighlight: 'border-cyan-400/60 hover:border-cyan-200',
      glowColor: 'from-cyan-500/40 to-blue-400/30',
      accentBadge: 'bg-cyan-900/70 text-cyan-200 border-cyan-300/50',
      textColor: 'text-cyan-50'
    }
  },
  {
    id: 'theme_lenda_dourada',
    category: 'theme',
    name: 'Tema Lenda Dourada Suprema',
    description: 'Cartão régio em ouro escuro, âmbar e detalhes dourados para os alunos do Nível 20.',
    rarity: 'lendario',
    iconPreview: '👑',
    unlockCondition: {
      type: 'level',
      minLevel: 20,
      description: 'Desbloqueado ao atingir o Nível 20'
    },
    themeStyle: {
      cardGradient: 'from-amber-950 via-yellow-950 to-purple-950',
      borderHighlight: 'border-amber-400/70 hover:border-yellow-200',
      glowColor: 'from-amber-500/40 to-yellow-400/40',
      accentBadge: 'bg-amber-900/80 text-amber-200 border-amber-400/60',
      textColor: 'text-amber-50'
    }
  },
  {
    id: 'theme_heroi_comunidade',
    category: 'theme',
    name: 'Tema Herói da Comunidade',
    description: 'Tema honorífico concedido aos protetores ativos da comunidade escolar.',
    rarity: 'epico',
    iconPreview: '🛡️',
    unlockCondition: {
      type: 'achievement',
      achievementId: 'protetor_comunidade',
      description: 'Desbloqueado com a conquista Protetor da Comunidade'
    },
    themeStyle: {
      cardGradient: 'from-indigo-950 via-rose-950 to-purple-950',
      borderHighlight: 'border-rose-400/50 hover:border-rose-300/90',
      glowColor: 'from-rose-500/30 to-purple-500/30',
      accentBadge: 'bg-rose-900/60 text-rose-200 border-rose-400/40',
      textColor: 'text-rose-50'
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
  achievements: Achievement[]
): boolean {
  const cond = item.unlockCondition;
  if (cond.type === 'default') return true;
  if (cond.type === 'level') {
    return currentLevel >= (cond.minLevel || 1);
  }
  if (cond.type === 'achievement' && cond.achievementId) {
    const ach = achievements.find(a => a.id === cond.achievementId);
    return !!(ach && ach.isUnlocked);
  }
  return false;
}

/**
 * Evaluates all items against current user state, returning the full list of unlocked IDs
 */
export function computeUnlockedCosmeticIds(
  currentLevel: number, 
  achievements: Achievement[]
): string[] {
  const unlockedIds: string[] = [];
  for (const item of ALL_COSMETIC_REWARDS) {
    if (isCosmeticUnlocked(item, currentLevel, achievements)) {
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
 * Format rarity badge style
 */
export function getRarityBadge(rarity: string): { label: string; bgClass: string; textClass: string; borderClass: string } {
  switch (rarity) {
    case 'lendario':
      return { label: 'Lendário', bgClass: 'bg-amber-100', textClass: 'text-amber-900', borderClass: 'border-amber-300' };
    case 'epico':
      return { label: 'Épico', bgClass: 'bg-purple-100', textClass: 'text-purple-900', borderClass: 'border-purple-300' };
    case 'raro':
      return { label: 'Raro', bgClass: 'bg-blue-100', textClass: 'text-blue-900', borderClass: 'border-blue-300' };
    case 'comum':
    default:
      return { label: 'Comum', bgClass: 'bg-slate-100', textClass: 'text-slate-800', borderClass: 'border-slate-300' };
  }
}

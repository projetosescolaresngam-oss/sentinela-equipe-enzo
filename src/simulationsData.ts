import { SimulationScenario } from './types';

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'sim_colega_excluido',
    scenarioNumber: 1,
    title: 'O Colega Isolado no Recreio',
    subtitle: 'Uma atitude acolhedora pode transformar a rotina de quem se sente invisível.',
    theme: 'inclusao_empatia',
    themeLabel: 'Inclusão & Empatia',
    estimatedMinutes: 4,
    iconName: 'HeartHandshake',
    accentColor: 'from-purple-500 to-indigo-600',
    coverGradient: 'from-purple-900/90 via-indigo-900/80 to-slate-900',
    summary: 'Durante o intervalo, você nota que Lucas, um aluno novo, senta sozinho todos os dias perto da arquibancada. Um grupo de alunos combina de deixá-lo de fora das brincadeiras.',
    characters: [
      {
        name: 'Lucas',
        role: 'Colega Novo da Turma',
        avatarEmoji: '🎒',
        color: 'bg-blue-100 text-blue-900 border-blue-300',
        personality: 'Tímido, reservado, gosta de desenhar e jogos de estratégia.'
      },
      {
        name: 'Rodrigo',
        role: 'Líder do Grupo do Futebol',
        avatarEmoji: '⚽',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        personality: 'Popular, competitivo, às vezes impaciente com quem não conhece.'
      },
      {
        name: 'Professora Helena',
        role: 'Supervisora do Pátio',
        avatarEmoji: '👩‍🏫',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        personality: 'Atenta, acolhedora e mediadora de conflitos.'
      }
    ],
    initialNodeId: 'node_1_observacao',
    totalPossibleOutcomes: 5,
    nodes: {
      'node_1_observacao': {
        id: 'node_1_observacao',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Pátio e o Silêncio',
        locationTag: 'Pátio Central — Intervalo',
        narrative: 'O sino do recreio acabou de tocar. Os corredores estão barulhentos e movimentados. Perto das árvores da arquibancada, Lucas segura seu lanche com o olhar baixo, fingindo mexer no caderno para não parecer sozinho. Perto dali, Rodrigo e mais três colegas comentam em voz baixa: "Nem chama ele pro jogo hoje, ele é esquisito e nem fala nada."',
        dialogues: [
          {
            characterName: 'Rodrigo',
            avatarEmoji: '⚽',
            text: 'Galera, já fechou o time do vôlei. Nem inventem de convidar o Lucas, ele vai estragar o jogo.'
          },
          {
            characterName: 'Lucas (pensamento)',
            avatarEmoji: '🎒',
            text: '...Acho que vou ficar aqui no meu canto até o sinal tocar de novo.'
          }
        ],
        promptQuestion: 'Qual é a sua primeira atitude ao presenciar a combinação de exclusão?',
        choices: [
          {
            id: 'c1_aproximar_lucas',
            text: 'Ir direto até Lucas, sentar ao lado dele e puxar uma conversa amigável.',
            iconEmoji: '🟢',
            tone: 'empatia',
            attitudeLabel: 'Acolhimento Direto',
            consequenceText: 'Você quebra o isolamento de Lucas imediatamente e demonstra que ele é bem-vindo.',
            nextNodeId: 'node_2_conversa_lucas',
            metricImpact: { decision: 90, empathy: 95, safety: 85 }
          },
          {
            id: 'c1_questionar_rodrigo',
            text: 'Questionar Rodrigo calmamente: "Por que não chamamos ele? Todo mundo pode jogar."',
            iconEmoji: '🔵',
            tone: 'seguranca',
            attitudeLabel: 'Posicionamento Ético no Grupo',
            consequenceText: 'Você confronta a exclusão com serenidade sem gerar briga aberta.',
            nextNodeId: 'node_2_desafio_grupo',
            metricImpact: { decision: 85, empathy: 80, safety: 90 }
          },
          {
            id: 'c1_chamar_professora',
            text: 'Comentar discretamente com a Professora Helena para ela propor uma atividade coletiva.',
            iconEmoji: '🟣',
            tone: 'apoio',
            attitudeLabel: 'Mediação Institucional',
            consequenceText: 'Você aciona um adulto responsável para integrar a turma sem constranger Lucas.',
            nextNodeId: 'node_2_mediacao_adulta',
            metricImpact: { decision: 80, empathy: 75, safety: 95 }
          },
          {
            id: 'c1_ignorar_ficar_neutro',
            text: 'Achar chato, mas não fazer nada para não ficar mal visto pelos colegas do time.',
            iconEmoji: '🔴',
            tone: 'omissao',
            attitudeLabel: 'Omissão por Pressão Social',
            consequenceText: 'O silêncio valida a exclusão e Lucas se sente ainda mais desamparado.',
            nextNodeId: 'outcome_isolamento_perpetuado',
            metricImpact: { decision: 30, empathy: 20, safety: 40 }
          }
        ]
      },

      'node_2_conversa_lucas': {
        id: 'node_2_conversa_lucas',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Aproximação Genuína',
        locationTag: 'Arquibancada do Pátio',
        narrative: 'Você se aproxima e senta a um metro de Lucas, cumprimentando-o com um sorriso amigável. Ele se surpreende, fecha o caderno com timidez, mas seus olhos brilham de alívio por alguém ter se dirigido a ele.',
        dialogues: [
          {
            characterName: 'Você',
            avatarEmoji: '👋',
            text: 'E aí, Lucas! Tudo bem? Vi que você curte desenhar, seus traços são muito legais. Você tá afim de dar uma volta ou prefere ficar por aqui?',
            isUser: true
          },
          {
            characterName: 'Lucas',
            avatarEmoji: '🎒',
            text: 'Oi... obrigado! Eu gosto de jogos de tabuleiro e ilustração. Achei que ninguém aqui curtia essas coisas...'
          }
        ],
        promptQuestion: 'Como você deseja dar o próximo passo nessa integração?',
        choices: [
          {
            id: 'c2_convidar_projeto_xadrez',
            text: 'Descobrir que ambos curtem jogos de raciocínio e propor criar um clube de xadrez/desenho na biblioteca.',
            iconEmoji: '⭐',
            tone: 'reflexao',
            attitudeLabel: 'Iniciativa Criativa & Conexão Profunda',
            consequenceText: 'Vocês criam um espaço onde outros alunos tímidos também se sentem pertencentes!',
            nextNodeId: 'outcome_clube_xadrez_secreto',
            metricImpact: { decision: 100, empathy: 100, safety: 95 }
          },
          {
            id: 'c2_levar_para_o_grupo',
            text: 'Convidar Lucas para ir até o time: "Vem comigo, vou te apresentar a galera do vôlei com calma."',
            iconEmoji: '🟢',
            tone: 'empatia',
            attitudeLabel: 'Ponte de Socialização',
            consequenceText: 'Com o seu apoio direto ao lado dele, o grupo o recebe com muito mais respeito.',
            nextNodeId: 'outcome_inclusao_exemplar',
            metricImpact: { decision: 90, empathy: 95, safety: 90 }
          },
          {
            id: 'c2_apenas_ficar_ali',
            text: 'Passar o restante do recreio conversando apenas ali com Lucas, tornando-se bons amigos.',
            iconEmoji: '🔵',
            tone: 'apoio',
            attitudeLabel: 'Amizade Individual Protetora',
            consequenceText: 'Lucas ganha um porto seguro na escola e não se sente mais rejeitado.',
            nextNodeId: 'outcome_amigo_leal',
            metricImpact: { decision: 85, empathy: 90, safety: 85 }
          }
        ]
      },

      'node_2_desafio_grupo': {
        id: 'node_2_desafio_grupo',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'O Diálogo com o Grupo',
        locationTag: 'Quadra Esportiva',
        narrative: 'Ao ouvir seu questionamento sereno, Rodrigo hesita. Dois colegas da quadra concordam com você: "É verdade, cara, sobra espaço no time de trás. A gente nem conhece ele direito ainda."',
        dialogues: [
          {
            characterName: 'Rodrigo',
            avatarEmoji: '⚽',
            text: 'Ah, sei lá... ele nunca fala nada, achei que ele nem queria jogar.'
          },
          {
            characterName: 'Você',
            avatarEmoji: '🤝',
            text: 'Ele é novo na escola, Rodrigo. Se a gente não der espaço, ele vai continuar com vergonha. Vamos chamar ele juntos!',
            isUser: true
          }
        ],
        promptQuestion: 'Como fechar essa atitude coletiva com sucesso?',
        choices: [
          {
            id: 'c2_chamar_em_grupo',
            text: 'Ir junto com Rodrigo até a arquibancada e fazer um convite leve e sem pressão a Lucas.',
            iconEmoji: '🟢',
            tone: 'seguranca',
            attitudeLabel: 'Liderança Positiva & Resolução Coletiva',
            consequenceText: 'O grupo quebra o gelo e a cultura de acolhimento se espalha por toda a turma.',
            nextNodeId: 'outcome_inclusao_exemplar',
            metricImpact: { decision: 95, empathy: 90, safety: 95 }
          },
          {
            id: 'c2_insistir_com_firmeza',
            text: 'Fazer o convite você mesmo e colocá-lo no seu time para garantir que ninguém seja injusto.',
            iconEmoji: '🔵',
            tone: 'apoio',
            attitudeLabel: 'Garantia Direta de Participação',
            consequenceText: 'O jogo acontece normalmente e Lucas tem seu primeiro dia participativo na turma.',
            nextNodeId: 'outcome_circulo_expandido',
            metricImpact: { decision: 85, empathy: 85, safety: 85 }
          }
        ]
      },

      'node_2_mediacao_adulta': {
        id: 'node_2_mediacao_adulta',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'A Intervenção da Professora',
        locationTag: 'Pátio — Próximo aos Bancos',
        narrative: 'A Professora Helena agradece muito o seu aviso sutil e compreende perfeitamente a dinâmica. Em vez de dar uma bronca no grupo, ela organiza uma dinâmica recreativa integradora com rodízio de duplas.',
        dialogues: [
          {
            characterName: 'Professora Helena',
            avatarEmoji: '👩‍🏫',
            text: 'Muito obrigada pelo seu olhar atento. Acolher quem chega é responsabilidade de toda a comunidade escolar.'
          }
        ],
        promptQuestion: 'Qual postura você adota durante a atividade da professora?',
        choices: [
          {
            id: 'c2_fazer_dupla_lucas',
            text: 'Oferecer-se com naturalidade para ser a dupla de Lucas durante a dinâmica.',
            iconEmoji: '🟢',
            tone: 'empatia',
            attitudeLabel: 'Engajamento Empático Voluntário',
            consequenceText: 'A dinâmica é um sucesso e Lucas se sente acolhido naturalmente.',
            nextNodeId: 'outcome_circulo_expandido',
            metricImpact: { decision: 90, empathy: 90, safety: 95 }
          }
        ]
      }
    },
    outcomes: {
      'outcome_inclusao_exemplar': {
        id: 'outcome_inclusao_exemplar',
        type: 'positivo',
        title: 'Acolhimento Exemplar & Integração Total',
        badgeLabel: '🏆 Final Exemplar da Paz',
        badgeColor: 'bg-emerald-500 text-white',
        narrativeResult: 'Com sua iniciativa equilibrada e corajosa, a barreira da timidez foi quebrada. Lucas se sentiu valorizado, participou das conversas e o grupo percebeu que rotular alguém sem conhecer era um grande erro.',
        whatHappened: 'Você interveio antes que a exclusão se consolidasse como bullying sistemático, mudando a atitude de Rodrigo e acolhendo Lucas com dignidade.',
        whyChoicesLedHere: 'Sua escolha combinou empatia com o colega novo e comunicação não violenta com os demais colegas, sem gerar agressividade.',
        saferBehaviorAdvice: 'O isolamento no recreio é um dos primeiros sinais de vulnerabilidade. Tomar a iniciativa de convidar e escutar desarticula a exclusão pela raiz.',
        coreLearning: 'Pequenos gestos de acolhimento desarmam preconceitos e constroem um ambiente escolar seguro para todos.',
        metrics: { decision: 95, empathy: 95, safety: 90 }
      },
      'outcome_clube_xadrez_secreto': {
        id: 'outcome_clube_xadrez_secreto',
        type: 'especial',
        title: 'Desfecho Especial: O Clube de Estratégia e Artes',
        badgeLabel: '⭐ Final Secreto Lendário',
        badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
        isSpecialSecret: true,
        secretDiscoveryTitle: 'Descoberta do Clube Secreto',
        bonusXp: 150,
        narrativeResult: 'Sua conversa profunda com Lucas revelou talentos incríveis. A ideia do Clube de Xadrez e Ilustração cresceu tanto que outros 12 alunos que também ficavam tímidos no recreio encontraram um refúgio acolhedor e estimulante na biblioteca!',
        whatHappened: 'Você transformou um momento de potencial sofrimento em um polo de criatividade e novas amizades que mudou a dinâmica da escola inteira.',
        whyChoicesLedHere: 'Você foi além do óbvio: escutou com profundidade os interesses de Lucas e teve visão construtiva para criar um espaço inclusivo.',
        saferBehaviorAdvice: 'Incentivar hobbies compartilhados é uma das ferramentas mais poderosas de saúde mental e prevenção ao isolamento na escola.',
        coreLearning: 'A verdadeira liderança não apenas resolve um problema, mas cria oportunidades para que outros também prosperem.',
        metrics: { decision: 100, empathy: 100, safety: 95 }
      },
      'outcome_circulo_expandido': {
        id: 'outcome_circulo_expandido',
        type: 'positivo',
        title: 'Círculo de Respeito Expandido',
        badgeLabel: '✨ Final Positivo de Cooperação',
        badgeColor: 'bg-indigo-500 text-white',
        narrativeResult: 'A mediação e a participação compartilhada permitiram que Lucas jogasse sem ser julgado. Ele ganhou confiança para os próximos dias.',
        whatHappened: 'A situação foi conduzida com cooperação e respeito, integrando o novo aluno com segurança.',
        whyChoicesLedHere: 'Você buscou alternativas seguras para garantir que a exclusão não prosperasse no pátio.',
        saferBehaviorAdvice: 'Sempre que presenciar exclusão, envolver o grupo com argumentos éticos e buscar apoio da equipe pedagógica é uma atitude exemplar.',
        coreLearning: 'Respeito é um exercício diário: garantir espaço para todos fortalece a união da turma.',
        metrics: { decision: 88, empathy: 88, safety: 92 }
      },
      'outcome_amigo_leal': {
        id: 'outcome_amigo_leal',
        type: 'aprendizado',
        title: 'O Poder de uma Amizade Genuína',
        badgeLabel: '🤝 Final de Apoio Individual',
        badgeColor: 'bg-blue-500 text-white',
        narrativeResult: 'Lucas encontrou em você alguém em quem confiar. Embora o restante da turma ainda precise amadurecer, ter um único amigo leal salvou o dia dele.',
        whatHappened: 'Você ofereceu apoio direto a quem precisava, reduzindo o impacto negativo do isolamento.',
        whyChoicesLedHere: 'Sua empatia pessoal fez a diferença no momento em que Lucas mais se sentia desamparado.',
        saferBehaviorAdvice: 'No futuro, tente também dialogar com os demais colegas para que a inclusão seja coletiva e permanente.',
        coreLearning: 'Nunca subestime o alívio que uma conversa sincera traz para quem está se sentindo invisível.',
        metrics: { decision: 82, empathy: 90, safety: 85 }
      },
      'outcome_isolamento_perpetuado': {
        id: 'outcome_isolamento_perpetuado',
        type: 'alerta',
        title: 'A Armadilha do Silêncio e da Omissão',
        badgeLabel: '⚠️ Final de Alerta & Reflexão',
        badgeColor: 'bg-rose-500 text-white',
        narrativeResult: 'Lucas passou o recreio inteiro de cabeça baixa. A sensação de rejeição aumentou e o grupo se acostumou com a ideia de que ninguém se importa em excluí-lo.',
        whatHappened: 'Ao não intervir por receio de julgamento alheio, a exclusão silenciosa se fortaleceu.',
        whyChoicesLedHere: 'A omissão diante da injustiça transmite a falsa mensagem de que a atitude do grupo é aceitável.',
        saferBehaviorAdvice: 'Você não precisa brigar para fazer a diferença: um simples "vem cá sentar com a gente" já quebra o ciclo sem qualquer risco para você.',
        coreLearning: 'Quem presencia e não age acaba, sem querer, permitindo que o sofrimento do outro continue. Pequenas atitudes éticas transformam realidades.',
        metrics: { decision: 35, empathy: 30, safety: 40 }
      }
    }
  },

  {
    id: 'sim_foto_grupo_zap',
    scenarioNumber: 2,
    title: 'A Foto Editada no Grupo de Mensagens',
    subtitle: 'Prints, piadas ofensivas e a linha tênue entre diversão e cyberbullying.',
    theme: 'cyberbullying',
    themeLabel: 'Cidadania Digital & Cyberbullying',
    estimatedMinutes: 5,
    iconName: 'Smartphone',
    accentColor: 'from-blue-600 to-indigo-700',
    coverGradient: 'from-slate-900 via-blue-950 to-indigo-950',
    summary: 'Uma foto constrangedora de Mariana, tirada durante a aula de educação física, foi editada com legendas humilhantes e enviada no grupo de mensagens da turma com mais de 35 alunos.',
    characters: [
      {
        name: 'Mariana',
        role: 'Colega Vítima do Boato',
        avatarEmoji: '📱',
        color: 'bg-rose-100 text-rose-900 border-rose-300',
        personality: 'Dedicada aos estudos, discreta, muito abalada com a exposição digital.'
      },
      {
        name: 'Pedro',
        role: 'Autor do Meme Ofensivo',
        avatarEmoji: '🤡',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        personality: 'Gosta de atenção, impulsivo na internet, não mede consequências.'
      },
      {
        name: 'Coordenação Escolar',
        role: 'Equipe de Acompanhamento',
        avatarEmoji: '🛡️',
        color: 'bg-purple-100 text-purple-900 border-purple-300',
        personality: 'Focada no bem-estar discente e na aplicação da Lei 14.811/2024.'
      }
    ],
    initialNodeId: 'node_1_mensagem_notificacao',
    totalPossibleOutcomes: 4,
    nodes: {
      'node_1_mensagem_notificacao': {
        id: 'node_1_mensagem_notificacao',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Notificação no Celular',
        locationTag: 'Aplicativo de Mensagens — Grupo da Sala',
        narrative: 'Seu celular vibra sem parar após o horário de aula. No grupo da sala, Pedro acabou de postar uma montagem depreciativa de Mariana tropeçando na quadra, acompanhada de figurinhas zombeteiras. Alguns alunos respondem com risadas ("kkkkk"), enquanto Mariana sai do grupo logo em seguida sem dizer nenhuma palavra.',
        dialogues: [
          {
            characterName: 'Pedro',
            avatarEmoji: '🤡',
            text: 'Olha a Mariana tentando correr kkkk parece um pato desgovernado! Compartilhem aí galera!'
          },
          {
            characterName: 'Sistema',
            avatarEmoji: '⚙️',
            text: 'Mariana saiu do grupo.'
          }
        ],
        promptQuestion: 'Diante do cyberbullying em tempo real, qual é o seu primeiro movimento?',
        choices: [
          {
            id: 'c1_salvar_provas_privado',
            text: 'Tirar print da conversa (com data/horário/número), enviar mensagem de apoio a Mariana no privado e não repassar a imagem.',
            iconEmoji: '🟢',
            tone: 'seguranca',
            attitudeLabel: 'Protocolo de Proteção & Detetive Digital',
            consequenceText: 'Você resguarda provas jurídicas essenciais e acolhe a colega no momento mais difícil.',
            nextNodeId: 'node_2_acolhimento_privado',
            metricImpact: { decision: 95, empathy: 95, safety: 100 }
          },
          {
            id: 'c1_posicionar_no_grupo',
            text: 'Mandar mensagem firme no grupo: "Pessoal, isso não é engraçado. É falta de respeito e cyberbullying. Parem de compartilhar."',
            iconEmoji: '🔵',
            tone: 'empatia',
            attitudeLabel: 'Intervenção Pública Ética',
            consequenceText: 'Você quebra o efeito manada das risadas e impõe limite moral no grupo.',
            nextNodeId: 'node_2_impacto_grupo',
            metricImpact: { decision: 90, empathy: 90, safety: 85 }
          },
          {
            id: 'c1_repassar_rir',
            text: 'Rir no grupo e repassar a figurinha para outro grupo de amigos.',
            iconEmoji: '🔴',
            tone: 'impulso',
            attitudeLabel: 'Cumplicidade com Cyberbullying (Crime)',
            consequenceText: 'A humilhação ganha proporções incontroláveis e você se torna corresponsável pelo dano.',
            nextNodeId: 'outcome_cumplicidade_digital',
            metricImpact: { decision: 10, empathy: 10, safety: 15 }
          }
        ]
      },

      'node_2_acolhimento_privado': {
        id: 'node_2_acolhimento_privado',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'O Acolhimento & O Canal Seguro',
        locationTag: 'Conversa Privada',
        narrative: 'Mariana responde sua mensagem chorando muito. Ela diz que está com vergonha de ir para a escola no dia seguinte e que não sabe o que fazer.',
        dialogues: [
          {
            characterName: 'Mariana',
            avatarEmoji: '📱',
            text: 'Eu tô com tanta vergonha... Todo mundo tá rindo de mim. Não quero mais pisar nessa escola.'
          },
          {
            characterName: 'Você',
            avatarEmoji: '🛡️',
            text: 'Mariana, você não fez nada de errado. Já guardei os prints com horário. A culpa é de quem expôs. Você quer que eu te ajude a relatar pelo Sentinela Escolar de forma protegida?',
            isUser: true
          }
        ],
        promptQuestion: 'Como orientar Mariana para garantir a segurança e punição dos responsáveis?',
        choices: [
          {
            id: 'c2_relatar_sentinela_juntos',
            text: 'Ajudá-la a registrar um relato seguro com os prints no Sentinela Escolar e avisar os pais/coordenação com calma.',
            iconEmoji: '⭐',
            tone: 'seguranca',
            attitudeLabel: 'Uso Perfeito das Ferramentas de Proteção',
            consequenceText: 'A coordenação age com discrição absoluta, apaga o conteúdo e presta suporte psicológico imediato.',
            nextNodeId: 'outcome_detetive_cibernetico_secreto',
            metricImpact: { decision: 100, empathy: 100, safety: 100 }
          },
          {
            id: 'c2_acompanhar_presencialmente',
            text: 'Combinar de ir com ela até a sala da coordenação na manhã seguinte para conversar com um orientador de confiança.',
            iconEmoji: '🟢',
            tone: 'apoio',
            attitudeLabel: 'Solidariedade Presencial',
            consequenceText: 'Mariana não se sente desamparada e a escola toma as providências restaurativas.',
            nextNodeId: 'outcome_escudo_digital_ativado',
            metricImpact: { decision: 90, empathy: 95, safety: 90 }
          }
        ]
      },

      'node_2_impacto_grupo': {
        id: 'node_2_impacto_grupo',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'A Quebra do Efeito Manada',
        locationTag: 'Grupo da Sala',
        narrative: 'Sua mensagem fez com que as risadas parassem de imediato. Outros 4 colegas mandaram mensagens apoiando sua fala: "O Pedro passou do ponto mesmo", "Apaga isso, Pedro". Pedro ficou sem graça e acabou apagando a imagem.',
        dialogues: [
          {
            characterName: 'Pedro',
            avatarEmoji: '🤡',
            text: 'Foi mal aí gente, era só uma brincadeira... Já apaguei.'
          }
        ],
        promptQuestion: 'Mesmo com a mensagem apagada, qual deve ser a providência seguinte?',
        choices: [
          {
            id: 'c2_chamar_mariana_e_pedro_reflexao',
            text: 'Conferir se Mariana está bem e garantir que Pedro entenda que o print já pode ter circulado e precisa de retratação sincera.',
            iconEmoji: '🟢',
            tone: 'reflexao',
            attitudeLabel: 'Cultura de Responsabilização Restaurativa',
            consequenceText: 'Pedro pede desculpas no privado para Mariana e a turma aprende o limite do respeito digital.',
            nextNodeId: 'outcome_escudo_digital_ativado',
            metricImpact: { decision: 92, empathy: 90, safety: 92 }
          }
        ]
      }
    },
    outcomes: {
      'outcome_detetive_cibernetico_secreto': {
        id: 'outcome_detetive_cibernetico_secreto',
        type: 'especial',
        title: 'Desfecho Especial: O Guardião Cibernético Exemplar',
        badgeLabel: '⭐ Final Especial de Proteção Digital',
        badgeColor: 'bg-gradient-to-r from-blue-600 to-teal-500 text-white',
        isSpecialSecret: true,
        secretDiscoveryTitle: 'Mestre da Cidadania Digital',
        bonusXp: 160,
        narrativeResult: 'Sua atitude de salvar os registros digitais com rigor técnico e acolher Mariana evitou que o conteúdo se espalhasse fora da escola. A direção interveio pedagogicamente, os responsáveis foram notificados e Mariana recuperou sua segurança e dignidade!',
        whatHappened: 'Você seguiu o protocolo exato de combate ao cyberbullying (Lei 14.811/2024): preservou provas, não propagou o material e acolheu a vítima.',
        whyChoicesLedHere: 'Você uniu conhecimento técnico de proteção digital com sensibilidade emocional impecável.',
        saferBehaviorAdvice: 'Salvar prints com URL, data e número antes que a mensagem seja apagada é o procedimento correto recomendado pela perícia digital.',
        coreLearning: 'No ambiente virtual, a nossa voz e as nossas provas têm poder real para estancar injustiças e proteger vidas.',
        metrics: { decision: 100, empathy: 100, safety: 100 }
      },
      'outcome_escudo_digital_ativado': {
        id: 'outcome_escudo_digital_ativado',
        type: 'positivo',
        title: 'Escudo Ético e Quebra da Humilhação',
        badgeLabel: '🛡️ Final Positivo de Coragem',
        badgeColor: 'bg-blue-600 text-white',
        narrativeResult: 'Você impediu que a fofoca digital se normalizasse. A vítima sentiu que não estava sozinha no mundo e a turma recebeu um alerta fundamental sobre limites.',
        whatHappened: 'A intervenção direta paralisou a cadeia de compartilhamentos e colocou a empatia em primeiro lugar.',
        whyChoicesLedHere: 'Você não teve medo de ir contra o grupo quando percebeu que uma injustiça estava sendo cometida.',
        saferBehaviorAdvice: 'Quando vir um meme depreciativo de um colega, nunca reaja com risadas. O silêncio da aprovação alimenta quem agride.',
        coreLearning: 'A verdadeira coragem nas redes sociais é usar sua visibilidade para proteger e não para humilhar.',
        metrics: { decision: 92, empathy: 92, safety: 90 }
      },
      'outcome_cumplicidade_digital': {
        id: 'outcome_cumplicidade_digital',
        type: 'alerta',
        title: 'A Gravidade da Propagação Digital',
        badgeLabel: '🚨 Final de Alerta Máximo (Lei 14.811)',
        badgeColor: 'bg-rose-600 text-white',
        narrativeResult: 'A montagem chegou a alunos de outras escolas. Mariana teve crises de pânico e precisou ser afastada das aulas. A polícia civil foi acionada pela família e todos que repassaram foram identificados.',
        whatHappened: 'O ato de compartilhar fotos constrangedoras sem consentimento é caracterizado como violência psicológica e cyberbullying por lei.',
        whyChoicesLedHere: 'Tratar a dor do outro como entretenimento passageiro gera danos irreversíveis à saúde mental da vítima.',
        saferBehaviorAdvice: 'Nunca compartilhe imagens íntimas ou constrangedoras. Se receber, avise quem mandou que aquilo é crime e acolha quem foi exposto.',
        coreLearning: 'Na internet, um único clique pode destruir a paz de alguém. Responsabilidade digital é uma obrigação ética de todos.',
        metrics: { decision: 10, empathy: 10, safety: 15 }
      }
    }
  },

  {
    id: 'sim_provocacao_corredor',
    scenarioNumber: 3,
    title: 'A Provocação no Corredor e a Desescalada',
    subtitle: 'Como responder a deboches sem perder a calma nem cair em armadilhas de agressão.',
    theme: 'desescalada_conflito',
    themeLabel: 'Comunicação Não Violenta & Limites',
    estimatedMinutes: 4,
    iconName: 'Sparkles',
    accentColor: 'from-amber-500 to-orange-600',
    coverGradient: 'from-amber-950 via-slate-900 to-purple-950',
    summary: 'No corredor entre as aulas, um aluno conhecido por piadas ácidas esbarra de propósito na mochila de Gabriel e faz comentários depreciativos sobre o tênis dele na frente de várias pessoas.',
    characters: [
      {
        name: 'Gabriel',
        role: 'Colega Provocado',
        avatarEmoji: '👟',
        color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        personality: 'Pacífico, prestativo, mas ficando muito irritado com as ofensas repetidas.'
      },
      {
        name: 'Vitor',
        role: 'Provocador',
        avatarEmoji: '⚡',
        color: 'bg-orange-100 text-orange-900 border-orange-300',
        personality: 'Testa limites para parecer durão diante dos colegas.'
      }
    ],
    initialNodeId: 'node_1_provocacao_mochila',
    totalPossibleOutcomes: 4,
    nodes: {
      'node_1_provocacao_mochila': {
        id: 'node_1_provocacao_mochila',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Encontro no Corredor',
        locationTag: 'Corredor do 2º Andar',
        narrative: 'O corredor está cheio na troca de professores. Vitor esbarra com o ombro na mochila de Gabriel, derrubando o estojo no chão, e dispara rindo alto: "Opa, cuidado aí com esse tênis rasgado, vai que desmonta no caminho!" Gabriel fecha os punhos, respira fundo com o rosto vermelho e parece prestes a partir para a briga física.',
        dialogues: [
          {
            characterName: 'Vitor',
            avatarEmoji: '⚡',
            text: 'Ih, olhou feio por quê? Não aguenta brincadeira não?'
          },
          {
            characterName: 'Gabriel',
            avatarEmoji: '👟',
            text: 'Cala a boca, Vitor! Você vai ver só...'
          }
        ],
        promptQuestion: 'Você está a dois passos deles. Qual é a melhor intervenção imediata?',
        choices: [
          {
            id: 'c1_ajudar_juntar_desviar',
            text: 'Abaixar-se imediatamente para ajudar Gabriel a pegar o estojo, fazendo contato visual calmo e dizendo: "Deixa pra lá, Gabriel, vem cá me ajudar com a apostila de química."',
            iconEmoji: '🟢',
            tone: 'seguranca',
            attitudeLabel: 'Desescalada Inteligente & Foco na Vítima',
            consequenceText: 'Você quebra a tensão dramática, tira o palco do provocador e protege Gabriel da agressão física.',
            nextNodeId: 'node_2_acalmando_gabriel',
            metricImpact: { decision: 95, empathy: 95, safety: 95 }
          },
          {
            id: 'c1_confrontar_agressivo',
            text: 'Empurrar Vitor de volta e gritar com ele para defender Gabriel.',
            iconEmoji: '🔴',
            tone: 'impulso',
            attitudeLabel: 'Intervenção Reativa Violenta',
            consequenceText: 'A situação explode em briga generalizada no corredor e todos são levados à diretoria.',
            nextNodeId: 'outcome_briga_generalizada',
            metricImpact: { decision: 25, empathy: 40, safety: 20 }
          },
          {
            id: 'c1_falar_firme_vitor',
            text: 'Olhar nos olhos de Vitor com postura ereta e dizer com calma e firmeza: "Vitor, já deu. Isso não tem graça nenhuma."',
            iconEmoji: '🔵',
            tone: 'reflexao',
            attitudeLabel: 'Firmeza Serena sem Agressão',
            consequenceText: 'Vitor percebe que ninguém está achando graça e perde a postura provocadora.',
            nextNodeId: 'node_2_limite_sem_briga',
            metricImpact: { decision: 90, empathy: 85, safety: 90 }
          }
        ]
      },

      'node_2_acalmando_gabriel': {
        id: 'node_2_acalmando_gabriel',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Acalmando os Ânimos',
        locationTag: 'Bebedouro do Corredor',
        narrative: 'Ao desviar o foco, Gabriel se afasta com você em direção ao bebedouro. O coração dele bate rápido, mas aos poucos ele solta os punhos e bebe água gelada, aliviado por não ter sido suspenso por briga.',
        dialogues: [
          {
            characterName: 'Gabriel',
            avatarEmoji: '👟',
            text: 'Valeu mesmo, cara... Eu ia dar um soco nele. Já é a terceira vez essa semana que ele implica comigo.'
          }
        ],
        promptQuestion: 'Como transformar esse episódio em uma solução duradoura?',
        choices: [
          {
            id: 'c2_orientar_registro_comissao',
            text: 'Praticar com ele uma técnica de respiração rápida 4-7-8 e sugerir formalizar o relato no Sentinela para que a mediação aconteça sem exposição.',
            iconEmoji: '⭐',
            tone: 'seguranca',
            attitudeLabel: 'Mediação Preventiva Completa',
            consequenceText: 'Gabriel aprende a dominar suas emoções e o comportamento de Vitor é abordado pela equipe pedagógica.',
            nextNodeId: 'outcome_mestre_desescalada_secreto',
            metricImpact: { decision: 100, empathy: 100, safety: 100 }
          },
          {
            id: 'c2_apenas_conversar',
            text: 'Conversar com ele durante o intervalo e ficar junto nas próximas trocas de sala para dar apoio.',
            iconEmoji: '🟢',
            tone: 'apoio',
            attitudeLabel: 'Apoio de Presença & Amizade',
            consequenceText: 'Vitor desiste de provocar ao notar que Gabriel não anda mais desacompanhado.',
            nextNodeId: 'outcome_desescalada_sucesso',
            metricImpact: { decision: 88, empathy: 90, safety: 90 }
          }
        ]
      },

      'node_2_limite_sem_briga': {
        id: 'node_2_limite_sem_briga',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'O Recuo do Provocador',
        locationTag: 'Porta da Sala de Aula',
        narrative: 'Sem plateia para aplaudir suas piadas, Vitor dá de ombros, recolhe a mochila e entra na sala resmungando. Gabriel recupera o estojo e agradece a intervenção pontual.',
        dialogues: [
          {
            characterName: 'Gabriel',
            avatarEmoji: '👟',
            text: 'Obrigado por falar aquilo. Quando ninguém fala nada, parece que todo mundo concorda com ele.'
          }
        ],
        promptQuestion: 'Qual reflexão você compartilha com Gabriel?',
        choices: [
          {
            id: 'c2_reflexao_coletiva',
            text: '"Quem provoca quer reação e plateia. Tirando isso com firmeza, a provocação morre sozinha."',
            iconEmoji: '🟢',
            tone: 'reflexao',
            attitudeLabel: 'Ensino de Autonomia Emocional',
            consequenceText: 'Gabriel ganha maturidade para não cair em provocações futuras.',
            nextNodeId: 'outcome_desescalada_sucesso',
            metricImpact: { decision: 92, empathy: 90, safety: 92 }
          }
        ]
      }
    },
    outcomes: {
      'outcome_mestre_desescalada_secreto': {
        id: 'outcome_mestre_desescalada_secreto',
        type: 'especial',
        title: 'Desfecho Especial: Mestre Zen da Mediação de Conflitos',
        badgeLabel: '⭐ Final Especial da Inteligência Emocional',
        badgeColor: 'bg-gradient-to-r from-amber-500 to-emerald-600 text-white',
        isSpecialSecret: true,
        secretDiscoveryTitle: 'Desarmador Pacífico de Conflitos',
        bonusXp: 150,
        narrativeResult: 'Sua presença de espírito evitou uma agressão física grave que resultaria em punições duras para Gabriel. Mais do que isso: você ensinou auto-regulação e usou os canais certos de apoio escolar para resolver a perseguição de forma definitiva.',
        whatHappened: 'Você desarmou a armadilha do provocador (que busca provocar uma reação descontrolada da vítima) e redirecionou a energia para o autocuidado.',
        whyChoicesLedHere: 'Você agiu com rapidez, serenidade e foco no bem-estar da pessoa mais vulnerável na cena.',
        saferBehaviorAdvice: 'Ajudar a vítima fisicamente (recolhendo objetos) e mudando o foco da conversa é a técnica mais recomendada por psicólogos para desarmar discussões.',
        coreLearning: 'Responder à provocação com inteligência e apoio fraterno é mil vezes mais forte do que responder com socos.',
        metrics: { decision: 100, empathy: 100, safety: 100 }
      },
      'outcome_desescalada_sucesso': {
        id: 'outcome_desescalada_sucesso',
        type: 'positivo',
        title: 'Conflito Desarmado com Sucesso',
        badgeLabel: '🕊️ Final Positivo da Serenidade',
        badgeColor: 'bg-emerald-600 text-white',
        narrativeResult: 'O corredor voltou à normalidade e Gabriel se sentiu protegido. O provocador aprendeu que a turma não tolera humilhações gratuitas.',
        whatHappened: 'A intervenção calma quebrou a dinâmica de agressão sem colocar ninguém em perigo físico.',
        whyChoicesLedHere: 'Você impôs limites com serenidade e ofereceu companhia leal ao colega.',
        saferBehaviorAdvice: 'Quando testemunhar provocações, posicione-se calmamente ao lado da vítima. A presença de um aliado inibe 80% das agressões.',
        coreLearning: 'A união dos que prezam pela paz é o maior antídoto contra a covardia.',
        metrics: { decision: 90, empathy: 92, safety: 92 }
      },
      'outcome_briga_generalizada': {
        id: 'outcome_briga_generalizada',
        type: 'alerta',
        title: 'A Explosão Violenta e Suas Consequências',
        badgeLabel: '🚨 Final de Conflito & Advertência',
        badgeColor: 'bg-rose-600 text-white',
        narrativeResult: 'O empurrão gerou socos e quedas no corredor. A inspetora teve que intervir, Gabriel machucou a mão e todos receberam advertência formal e convocação de responsáveis.',
        whatHappened: 'Tentar combater agressão verbal com violência física ampliou o problema e colocou a vítima em situação de punição disciplinar.',
        whyChoicesLedHere: 'A raiva impulsiva cegou a tomada de decisão estratégica.',
        saferBehaviorAdvice: 'Nunca use a força física para intervir em discussões verbais. Proteja a vítima afastando-a do agressor e chame a supervisão.',
        coreLearning: 'Violência nunca resolve violência; apenas multiplica o prejuízo para todos os envolvidos.',
        metrics: { decision: 25, empathy: 40, safety: 20 }
      }
    }
  },

  {
    id: 'sim_trabalho_em_grupo',
    scenarioNumber: 4,
    title: 'O Trabalho Escolar e o Combinado Injusto',
    subtitle: 'Cooperação justa, empatia com imprevistos e superação de rivalidades acadêmicas.',
    theme: 'respeito_limites',
    themeLabel: 'Justiça & Cooperação Acadêmica',
    estimatedMinutes: 4,
    iconName: 'Users',
    accentColor: 'from-teal-500 to-emerald-700',
    coverGradient: 'from-slate-900 via-teal-950 to-indigo-950',
    summary: 'Em um trabalho que vale metade da nota bimestral, Beatriz faltou no dia da montagem por motivo de tratamento de saúde. Dois integrantes propõem retirar o nome dela da capa sem ouvi-la.',
    characters: [
      {
        name: 'Beatriz',
        role: 'Integrante do Grupo',
        avatarEmoji: '📚',
        color: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        personality: 'Responsável, passando por um momento delicado de saúde na família.'
      },
      {
        name: 'Camila',
        role: 'Líder do Trabalho',
        avatarEmoji: '📋',
        color: 'bg-amber-100 text-amber-900 border-amber-300',
        personality: 'Perfeccionista, ansiosa com prazos e notas, às vezes intolerante.'
      }
    ],
    initialNodeId: 'node_1_reuniao_grupo',
    totalPossibleOutcomes: 3,
    nodes: {
      'node_1_reuniao_grupo': {
        id: 'node_1_reuniao_grupo',
        stepNumber: 1,
        totalStepsEstimated: 2,
        title: 'A Discussão na Biblioteca',
        locationTag: 'Mesa de Estudos da Biblioteca',
        narrative: 'Faltam 30 minutos para a entrega final do projeto de Biologia. Camila fecha o cartaz e diz irritada: "A Beatriz nem apareceu hoje cedo. Eu não vou dar nota de graça pra ninguém. Vamos tirar o nome dela e pronto."',
        dialogues: [
          {
            characterName: 'Camila',
            avatarEmoji: '📋',
            text: 'Quem não veio não merece nota. Todo mundo concorda em tirar o nome dela?'
          }
        ],
        promptQuestion: 'Como agir com justiça ética e empatia nessa decisão?',
        choices: [
          {
            id: 'c1_investigar_motivo_propor_divisao',
            text: 'Intervir com ponderação: "Calma, Camila. A Beatriz mandou mensagem avisando que precisou fazer exames médicos. Ela fez a parte da pesquisa em casa. Vamos integrar o texto dela e conversar com o professor."',
            iconEmoji: '🟢',
            tone: 'empatia',
            attitudeLabel: 'Defesa da Verdade & Equidade',
            consequenceText: 'Você evita uma injustiça grave e resguarda o esforço real que a colega realizou.',
            nextNodeId: 'outcome_justica_coletiva',
            metricImpact: { decision: 95, empathy: 95, safety: 95 }
          },
          {
            id: 'c1_propor_pacto_honra',
            text: 'Propor uma reunião rápida online com Beatriz para alinhar a apresentação e garantir que ela apresente a parte teórica amanhã.',
            iconEmoji: '⭐',
            tone: 'seguranca',
            attitudeLabel: 'Solução Colaborativa Perfeita',
            consequenceText: 'O grupo entrega um trabalho impecável e se torna o mais unido da classe.',
            nextNodeId: 'outcome_pacto_honra_secreto',
            metricImpact: { decision: 100, empathy: 100, safety: 100 }
          },
          {
            id: 'c1_tirar_nome_sem_falar',
            text: 'Concordar com Camila e riscar o nome de Beatriz da folha.',
            iconEmoji: '🔴',
            tone: 'omissao',
            attitudeLabel: 'Exclusão Injusta sem Diálogo',
            consequenceText: 'Beatriz fica com nota zero injustamente e o clima no grupo se torna hostil e tóxico.',
            nextNodeId: 'outcome_injustica_academica',
            metricImpact: { decision: 30, empathy: 20, safety: 40 }
          }
        ]
      }
    },
    outcomes: {
      'outcome_pacto_honra_secreto': {
        id: 'outcome_pacto_honra_secreto',
        type: 'especial',
        title: 'Desfecho Especial: Pacto de Honra e Excelência Coletiva',
        badgeLabel: '⭐ Final Especial da Cooperação',
        badgeColor: 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white',
        isSpecialSecret: true,
        secretDiscoveryTitle: 'Líder Colaborativo',
        bonusXp: 140,
        narrativeResult: 'Sua habilidade de propor soluções em vez de punições transformou um momento de estresse em uma apresentação premiada pelo professor. Beatriz se sentiu imensamente grata e Camila aprendeu o valor da flexibilidade humana.',
        whatHappened: 'Você transformou um potencial conflito de exclusão em uma oportunidade de trabalho em equipe genuíno.',
        whyChoicesLedHere: 'Você uniu respeito aos prazos com sensibilidade pelas condições humanas de cada integrante.',
        saferBehaviorAdvice: 'Antes de tomar qualquer decisão sobre notas de terceiros, dialogue diretamente e consulte a coordenação.',
        coreLearning: 'Trabalho em equipe de verdade não é sobre cobrar com frieza, mas sobre apoiar o outro para que todos alcancem o melhor resultado.',
        metrics: { decision: 100, empathy: 100, safety: 100 }
      },
      'outcome_justica_coletiva': {
        id: 'outcome_justica_coletiva',
        type: 'positivo',
        title: 'Resolução Justa e Transparente',
        badgeLabel: '⚖️ Final Positivo da Justiça',
        badgeColor: 'bg-emerald-600 text-white',
        narrativeResult: 'A parte de Beatriz foi incluída com justiça e o professor elogiou a honestidade e a maturidade do grupo.',
        whatHappened: 'Você impediu que o preconceito por ausência justificada prejudicasse uma aluna dedicada.',
        whyChoicesLedHere: 'Você apresentou fatos concretos com serenidade.',
        saferBehaviorAdvice: 'Transparência e comunicação evitam 95% dos desentendimentos em trabalhos escolares.',
        coreLearning: 'Justiça é dar a cada um o que é seu por direito, com respeito e diálogo.',
        metrics: { decision: 92, empathy: 92, safety: 92 }
      },
      'outcome_injustica_academica': {
        id: 'outcome_injustica_academica',
        type: 'alerta',
        title: 'O Prejuízo da Exclusão Desumana',
        badgeLabel: '⚠️ Final de Alerta & Prejuízo Coletivo',
        badgeColor: 'bg-rose-600 text-white',
        narrativeResult: 'Beatriz apresentou os atestados médicos e as versões salvas no computador à direção. O grupo foi advertido por falta de ética e a nota foi revisada.',
        whatHappened: 'Agir pelas costas de um colega sem ouvir seus motivos é uma atitude desleal que fere a convivência escolar.',
        whyChoicesLedHere: 'A intolerância com imprevistos alheios gerou um problema disciplinar para todos.',
        saferBehaviorAdvice: 'Sempre ouça os dois lados antes de qualquer julgamento em grupo.',
        coreLearning: 'O sucesso acadêmico só tem valor real quando é construído com integridade e honestidade.',
        metrics: { decision: 30, empathy: 20, safety: 40 }
      }
    }
  }
];

export function getScenarioById(id: string): SimulationScenario | undefined {
  return SIMULATION_SCENARIOS.find(s => s.id === id);
}

export function getTotalSimulationsCount(): number {
  return SIMULATION_SCENARIOS.length;
}

export function getTotalSecretOutcomesCount(): number {
  let count = 0;
  SIMULATION_SCENARIOS.forEach(sc => {
    Object.values(sc.outcomes).forEach(out => {
      if (out.isSpecialSecret) count++;
    });
  });
  return count;
}

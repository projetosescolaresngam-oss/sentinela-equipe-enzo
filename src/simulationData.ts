import { SimulationScenario } from './types';

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  // =========================================================================
  // SITUAÇÃO 01: O COLEGA EXCLUÍDO
  // =========================================================================
  {
    id: 'sim-01-colega-excluido',
    scenarioNumber: 1,
    title: 'O Colega Excluído',
    subtitle: 'Uma escolha de empatia no intervalo escolar',
    theme: 'inclusao_empatia',
    themeLabel: 'Inclusão & Empatia',
    estimatedMinutes: 3,
    iconName: 'users',
    accentColor: 'emerald',
    coverGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    summary: 'Durante o recreio, você repara que Lucas passa os dias isolado nos bancos do pátio. Alguns colegas combinam de deixá-lo de fora de qualquer jogo.',
    characters: [
      { name: 'Lucas', role: 'Colega do 8º Ano', avatarEmoji: '🎒', color: 'emerald' },
      { name: 'Gabriel', role: 'Colega de turma', avatarEmoji: '⚽', color: 'amber' },
      { name: 'Professora Mariana', role: 'Docente de Português', avatarEmoji: '👩‍🏫', color: 'purple' }
    ],
    initialNodeId: 'node-01-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-01-inicio': {
        id: 'node-01-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Isolamento no Pátio',
        locationTag: 'Pátio Central — Horário de Intervalo',
        narrative: 'É hora do recreio. Enquanto a maioria corre para a quadra e forma grupos para lanchar, você vê Lucas sentado sozinho perto da biblioteca com a cabeça baixa. Você ouve Gabriel cochichar com outros dois alunos: "Nem chama ele pro nosso time, finge que ele nem tá aí".',
        dialogues: [
          { characterName: 'Gabriel', text: 'Gente, não chama o Lucas. Se ele vier, a gente diz que o time já fechou.', avatarEmoji: '⚽' },
          { characterName: 'Você (Pensamento)', text: 'Isso acontece quase todo dia com o Lucas... Ele parece bem chateado.', isUser: true }
        ],
        promptQuestion: 'Qual é a sua primeira atitude diante da situação?',
        choices: [
          {
            id: 'c1-conversar-lucas',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Aproximar-se de Lucas com tranquilidade e convidá-lo para lanchar ou conversar.',
            consequenceText: 'Você caminha até os bancos da biblioteca. O olhar de Lucas muda quando percebe que alguém se aproximou sem intenção de zombar.',
            nextNodeId: 'node-01-conversa-lucas',
            metricImpact: { decision: 30, empathy: 40, safety: 30 }
          },
          {
            id: 'c1-procurar-professora',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Procurar a Professora Mariana, que está de plantão no corredor, para relatar a exclusão.',
            consequenceText: 'Você vai até a professora Mariana e explica discretamente o que ouviu no pátio sem fazer alarde.',
            nextNodeId: 'node-01-apoio-docente',
            metricImpact: { decision: 35, empathy: 25, safety: 40 }
          },
          {
            id: 'c1-ignorar-situacao',
            iconEmoji: '🔵',
            tone: 'neutro',
            text: 'Ignorar a situação para não se meter em confusão e continuar seu lanche.',
            consequenceText: 'Você decide não interferir e segue com seus amigos. No dia seguinte, a exclusão continua do mesmo jeito.',
            nextNodeId: 'node-01-ignorar-consequencia',
            metricImpact: { decision: 10, empathy: 5, safety: 20 }
          },
          {
            id: 'c1-confrontar-sozinho',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Gritar com Gabriel na frente de todos chamando-o de covarde.',
            consequenceText: 'O tom agressivo atrai a atenção de todos. Gabriel fica na defensiva e o clima esquenta com bate-boca.',
            nextNodeId: 'node-01-confronto-direto',
            metricImpact: { decision: 10, empathy: 15, safety: 5 }
          }
        ]
      },

      // Caminho 1: Conversa com Lucas
      'node-01-conversa-lucas': {
        id: 'node-01-conversa-lucas',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Um Momento de Acolhimento',
        locationTag: 'Bancos da Biblioteca',
        narrative: 'Você se senta ao lado de Lucas e oferece metade do seu lanche. Ele hesita um pouco, mas desabafa dizendo que tem vergonha de tentar entrar nas brincadeiras porque sempre riem dele ou inventam desculpas.',
        dialogues: [
          { characterName: 'Lucas', text: 'Valeu por vir falar comigo... Toda vez que eu tento jogar bola ou conversar com o pessoal, eles me ignoram de propósito.', avatarEmoji: '🎒' },
          { characterName: 'Você', text: 'Eu vi o que aconteceu. Não acho certo deixarem você de fora assim.', isUser: true }
        ],
        promptQuestion: 'Como você e Lucas podem dar o próximo passo?',
        choices: [
          {
            id: 'c2-incluir-e-orientar',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Chamar Lucas para uma atividade diferente em dupla e sugerirem juntos um projeto à coordenação.',
            consequenceText: 'Vocês dois começam a jogar xadrez e convidam outros dois colegas tímidos. A iniciativa atrai mais alunos.',
            nextNodeId: 'outcome-01-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 30 }
          },
          {
            id: 'c2-levar-a-orientacao',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Convidar Lucas para irem juntos à Orientação Pedagógica explicar a exclusão repetitiva.',
            consequenceText: 'A orientadora escuta com muito carinho e agenda uma dinâmica de integração com a turma inteira.',
            nextNodeId: 'outcome-01-positivo',
            metricImpact: { decision: 30, empathy: 30, safety: 40 }
          }
        ]
      },

      // Caminho 2: Apoio Docente
      'node-01-apoio-docente': {
        id: 'node-01-apoio-docente',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Intervenção Educativa e Segura',
        locationTag: 'Corredor das Salas',
        narrative: 'A professora Mariana agradece pelo seu relato confidencial. Ela caminha discretamente até o pátio, organiza uma rodada esportiva mista com times sorteados e convida Lucas com naturalidade para o jogo, quebrando a panelinha sem expor ninguém.',
        dialogues: [
          { characterName: 'Professora Mariana', text: 'Obrigada por me avisar com maturidade. A exclusão sistemática machuca muito, mas podemos intervir pedagogicamente.', avatarEmoji: '👩‍🏫' }
        ],
        promptQuestion: 'O que você faz agora durante a atividade coletiva?',
        choices: [
          {
            id: 'c3-jogar-junto-com-lucas',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Entrar no mesmo time de Lucas e incentivá-lo nas jogadas com respeito e companheirismo.',
            consequenceText: 'O ambiente do recreio fica muito mais saudável e outros colegas começam a interagir com Lucas naturalmente.',
            nextNodeId: 'outcome-01-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 30 }
          }
        ]
      },

      // Caminho 3: Ignorou
      'node-01-ignorar-consequencia': {
        id: 'node-01-ignorar-consequencia',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'O Silêncio dos Espectadores',
        locationTag: 'Pátio — Fim do Intervalo',
        narrative: 'O sinal toca. Lucas guarda seu lanche quase intocado e caminha sozinho de volta para a sala. Você percebe que o silêncio de quem assiste acaba reforçando a sensação de que aquilo é normal.',
        dialogues: [
          { characterName: 'Você (Pensamento)', text: 'Pensei que não me meter era a melhor coisa, mas o Lucas continua sofrendo em silêncio...', isUser: true }
        ],
        promptQuestion: 'Ainda dá tempo de mudar de atitude. O que você faz antes da próxima aula?',
        choices: [
          {
            id: 'c4-mudar-atitude-apoio',
            iconEmoji: '🟡',
            tone: 'empatia',
            text: 'Sentar-se perto de Lucas na sala e puxar conversa sobre a matéria.',
            consequenceText: 'Lucas sorri aliviado ao receber uma palavra amiga, mostrando que nunca é tarde para demonstrar empatia.',
            nextNodeId: 'outcome-01-aprendizado',
            metricImpact: { decision: 25, empathy: 35, safety: 20 }
          },
          {
            id: 'c4-continuar-passivo',
            iconEmoji: '🔵',
            tone: 'neutro',
            text: 'Não falar nada e fingir que nada aconteceu para não se comprometer.',
            consequenceText: 'A rotina de exclusão persiste nas semanas seguintes sem nenhuma mudança.',
            nextNodeId: 'outcome-01-alerta',
            metricImpact: { decision: 10, empathy: 5, safety: 15 }
          }
        ]
      },

      // Caminho 4: Confronto direto
      'node-01-confronto-direto': {
        id: 'node-01-confronto-direto',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Escalada de Conflito Inesperada',
        locationTag: 'Centro do Pátio',
        narrative: 'Ao gritar com Gabriel, outros alunos começam a formar uma roda esperando uma briga. Lucas fica ainda mais constrangido com o tumulto e tenta se esconder.',
        dialogues: [
          { characterName: 'Gabriel', text: 'Quem é você pra se meter? Cuida da sua vida!', avatarEmoji: '⚽' },
          { characterName: 'Lucas', text: 'Por favor, parem com isso... Não quero confusão!', avatarEmoji: '🎒' }
        ],
        promptQuestion: 'Como desarmar a tensão e agir com responsabilidade agora?',
        choices: [
          {
            id: 'c5-recuar-e-chamar-apoio',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Reconhecer que se exaltou, pedir calma e buscar um mediador escolar com urgência.',
            consequenceText: 'A coordenação intervém, acalma os ânimos e conduz um diálogo restaurativo em sala.',
            nextNodeId: 'outcome-01-aprendizado',
            metricImpact: { decision: 20, empathy: 20, safety: 35 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-01-positivo': {
        id: 'outcome-01-positivo',
        type: 'positivo',
        title: 'Acolhimento Seguro e Restauração',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Com diálogo empático e mediação segura, Lucas foi integrado às atividades coletivas. O isolamento deu lugar a novas amizades e a turma aprendeu sobre convivência respeitosa.',
        whatHappened: 'Você ofereceu apoio direto a quem estava sendo excluído e acionou a escola sem gerar conflitos agressivos.',
        whyChoicesLedHere: 'Pequenas atitudes de acolhimento quebram a dinâmica do bullying social, pois os agressores perdem a plateia conivente.',
        saferBehaviorAdvice: 'Sempre convide quem está sozinho para atividades em grupo e avise a coordenação se a exclusão for sistemática.',
        coreLearning: 'Em situações de exclusão, você não precisa enfrentar ninguém com violência. Um gesto simples de acolhimento e a ajuda de adultos responsáveis transformam o ambiente escolar com segurança.',
        metrics: { decision: 90, empathy: 95, safety: 90 }
      },
      'outcome-01-aprendizado': {
        id: 'outcome-01-aprendizado',
        type: 'aprendizado',
        title: 'Reflexão e Mudança de Postura',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'Você percebeu que o silêncio inicial ou a reação impulsiva não resolveram o problema de imediato, mas tomou a decisão de rever suas ações a tempo.',
        whatHappened: 'A experiência demonstrou que ignorar a situação mantém o sofrimento da vítima, enquanto o confronto agressivo aumenta a tensão.',
        whyChoicesLedHere: 'Reconhecer que uma abordagem inicial não foi a ideal permitiu buscar caminhos mais maduros e empáticos.',
        saferBehaviorAdvice: 'Substitua a omissão por atitudes proativas de apoio e evite discutir agressivamente sem a presença de mediadores.',
        coreLearning: 'Aprender a lidar com o bullying é um processo contínuo. Agir com firmeza e calma, buscando apoio pedagógico, é sempre a saída mais inteligente.',
        metrics: { decision: 75, empathy: 75, safety: 70 }
      },
      'outcome-01-alerta': {
        id: 'outcome-01-alerta',
        type: 'alerta',
        title: 'O Perigo da Omissão Prolongada',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'Ao escolher se omitir por completo, a exclusão de Lucas continuou invisível para quem deveria ajudar e o sofrimento dele se aprofundou.',
        whatHappened: 'A situação permaneceu inalterada porque nenhum colega se posicionou ou avisou os responsáveis.',
        whyChoicesLedHere: 'O bullying se alimenta do silêncio dos espectadores. Quando ninguém faz nada, os agressores sentem que têm permissão para continuar.',
        saferBehaviorAdvice: 'Lembre-se de que você pode usar os canais anônimos do Sentinela Escolar para alertar a coordenação sem nenhum risco pessoal.',
        coreLearning: 'Você não precisa se expor para ajudar. Usar ferramentas de denúncia anônima ou dar uma palavra de apoio em particular faz toda a diferença.',
        metrics: { decision: 40, empathy: 35, safety: 50 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 02: A MENSAGEM NO GRUPO
  // =========================================================================
  {
    id: 'sim-02-mensagem-no-grupo',
    scenarioNumber: 2,
    title: 'A Mensagem no Grupo',
    subtitle: 'Cyberbullying, prints e viralização',
    theme: 'cyberbullying',
    themeLabel: 'Cyberbullying & Redes',
    estimatedMinutes: 4,
    iconName: 'smartphone',
    accentColor: 'indigo',
    coverGradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    summary: 'À noite, alguém posta no grupo de WhatsApp da turma uma montagem maldosa sobre a aparência de Beatriz. Vários alunos começam a rir e encaminhar.',
    characters: [
      { name: 'Beatriz', role: 'Colega de classe', avatarEmoji: '📱', color: 'rose' },
      { name: 'Matheus', role: 'Criador do meme', avatarEmoji: '🤡', color: 'amber' },
      { name: 'Coordenador Roberto', role: 'Gestor Escolar', avatarEmoji: '👨‍💼', color: 'indigo' }
    ],
    initialNodeId: 'node-02-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-02-inicio': {
        id: 'node-02-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Notificação Noturna',
        locationTag: 'Grupo de WhatsApp da Turma — 20h45',
        narrative: 'Seu celular vibra várias vezes seguidas. Ao abrir o grupo da sala com 35 alunos, você vê que Matheus enviou uma foto editada de Beatriz com frases zombando do cabelo dela. Três pessoas reagiram com emojis de risada e um aluno escreveu: "Manda nos outros grupos kkk".',
        dialogues: [
          { characterName: 'Matheus', text: 'Olha o novo estilo da Bia kkkk virou meme oficial da escola!', avatarEmoji: '🤡' },
          { characterName: 'Você (Pensamento)', text: 'A Bia nem está online para se defender... Isso é muito pesado.', isUser: true }
        ],
        promptQuestion: 'O que você faz imediatamente ao ver essa mensagem?',
        choices: [
          {
            id: 'c2-posicionar-e-salvar',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Tirar print da conversa para guardar como prova e escrever no grupo: "Isso não é engraçado, parem de repassar".',
            consequenceText: 'Você guarda a evidência com data/horário e seu posicionamento firme faz com que outros colegas parem de incentivar o deboche.',
            nextNodeId: 'node-02-posicionamento-publico',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c2-chamar-no-privado',
            iconEmoji: '🟡',
            tone: 'empatia',
            text: 'Mandar mensagem no privado de Beatriz prestando apoio e perguntando como ela está.',
            consequenceText: 'Beatriz visualiza aos prantos, agradece imensamente pelo seu apoio e diz que está com medo de ir à aula amanhã.',
            nextNodeId: 'node-02-apoio-privado-bia',
            metricImpact: { decision: 30, empathy: 40, safety: 30 }
          },
          {
            id: 'c2-repassar-meme',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Rir no grupo e encaminhar para amigos de outra sala.',
            consequenceText: 'A foto viraliza em poucos minutos para centenas de celulares na escola inteira.',
            nextNodeId: 'node-02-viralizacao-grave',
            metricImpact: { decision: 5, empathy: 5, safety: 5 }
          },
          {
            id: 'c2-denuncia-anonima-sentinela',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Acessar o Sentinela Escolar e registrar um protocolo de Cyberbullying anexando o print com segurança.',
            consequenceText: 'O protocolo anônimo é gerado com sucesso e a equipe pedagógica é notificada na mesma noite.',
            nextNodeId: 'outcome-02-positivo',
            metricImpact: { decision: 40, empathy: 35, safety: 40 }
          }
        ]
      },

      'node-02-posicionamento-publico': {
        id: 'node-02-posicionamento-publico',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Corte da Viralização',
        locationTag: 'Grupo da Sala',
        narrative: 'Ao ler sua mensagem séria, duas colegas concordam com você no chat: "Pois é, apaga isso Matheus". Matheus fica sem graça e apaga a mensagem, mas o print já existe.',
        dialogues: [
          { characterName: 'Matheus', text: 'Calma galera, era só zueira... já apaguei.', avatarEmoji: '🤡' }
        ],
        promptQuestion: 'Qual é o fechamento mais responsável para garantir que Beatriz fique segura?',
        choices: [
          {
            id: 'c2-fechar-com-escola',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Conversar com a orientadora pela manhã e repassar o print como registro de proteção.',
            consequenceText: 'A coordenação acolhe Beatriz antes da primeira aula e conversa com a família de Matheus sobre responsabilidade digital.',
            nextNodeId: 'outcome-02-positivo',
            metricImpact: { decision: 35, empathy: 30, safety: 40 }
          }
        ]
      },

      'node-02-apoio-privado-bia': {
        id: 'node-02-apoio-privado-bia',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Apoio à Vítima',
        locationTag: 'Chat Privado com Beatriz',
        narrative: 'Beatriz se sente menos sozinha ao saber que você não concorda com a crueldade do grupo. Ela pergunta se deve contar para os pais ou faltar na escola.',
        dialogues: [
          { characterName: 'Beatriz', text: 'Eu não queria nem pisar na escola amanhã... Você me ajuda a falar com a coordenação?', avatarEmoji: '📱' }
        ],
        promptQuestion: 'O que você responde para apoiar Beatriz?',
        choices: [
          {
            id: 'c2-acompanhar-bia',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: '"Vou com você até a sala da coordenação logo na entrada. Você não está sozinha."',
            consequenceText: 'Você acompanha Beatriz até a sala de orientação. O acolhimento imediato evita que ela abandone as aulas.',
            nextNodeId: 'outcome-02-positivo',
            metricImpact: { decision: 35, empathy: 40, safety: 35 }
          }
        ]
      },

      'node-02-viralizacao-grave': {
        id: 'node-02-viralizacao-grave',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Consequências Criminais e Emocionais',
        locationTag: 'Portão da Escola — Dia Seguinte',
        narrative: 'No dia seguinte, alunos de outros anos apontam e zombam de Beatriz no pátio. Ela entra em crise de choro e a polícia escolar precisa ser acionada para investigar crimes contra a honra na internet.',
        dialogues: [
          { characterName: 'Coordenador Roberto', text: 'Repassar conteúdos ofensivos em redes sociais também configura cumplicidade em ato infracional de cyberbullying.', avatarEmoji: '👨‍💼' }
        ],
        promptQuestion: 'O que essa situação extrema ensina sobre a responsabilidade digital?',
        choices: [
          {
            id: 'c2-aprender-com-erro',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Reconhecer que repassar memes ofensivos amplia o dano e assumir o compromisso de jamais compartilhar difamações.',
            consequenceText: 'A turma passa por uma palestra obrigatória de cidadania digital e você compreende o peso de um clique.',
            nextNodeId: 'outcome-02-aprendizado',
            metricImpact: { decision: 20, empathy: 20, safety: 20 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-02-positivo': {
        id: 'outcome-02-positivo',
        type: 'positivo',
        title: 'Escudo Digital e Preservação de Evidências',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Sua ação rápida de salvar as provas, não rir do conteúdo e acionar o suporte garantiu que a vítima recebesse proteção e o cyberbullying fosse interrompido na raiz.',
        whatHappened: 'Você não participou da humilhação, salvou as evidências e acolheu a colega com discrição e empatia.',
        whyChoicesLedHere: 'No cyberbullying, guardar o print e não propagar o link são os dois passos fundamentais para proteger a vítima.',
        saferBehaviorAdvice: 'Nunca compartilhe montagens ou ofensas. Guarde o print com data, horário e número dos autores para fins de registro oficial.',
        coreLearning: 'Na internet, o silêncio e o encaminhamento alimentam o ódio. Posicionar-se contra o meme e usar canais de denúncia como o Sentinela Escolar salva vidas.',
        metrics: { decision: 95, empathy: 90, safety: 95 }
      },
      'outcome-02-aprendizado': {
        id: 'outcome-02-aprendizado',
        type: 'aprendizado',
        title: 'A Consciência do Rastro Digital',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A situação serviu de alerta grave sobre como uma "brincadeira" virtual tem consequências reais e destrutivas para a vida de alguém.',
        whatHappened: 'A facilidade de repassar conteúdos online provocou um dano desproporcional à integridade emocional da colega.',
        whyChoicesLedHere: 'Compreender a gravidade da lei e o impacto na saúde mental transforma espectadores em cidadãos conscientes.',
        saferBehaviorAdvice: 'Lembre-se: quem encaminha mensagens ofensivas também responde pelo crime de injúria e difamação.',
        coreLearning: 'Antes de compartilhar qualquer conteúdo que fale sobre alguém, pergunte-se: "Gostaria que fizessem isso comigo?". Respeito digital é inegociável.',
        metrics: { decision: 70, empathy: 65, safety: 70 }
      },
      'outcome-02-alerta': {
        id: 'outcome-02-alerta',
        type: 'alerta',
        title: 'A Bola de Neve do Cyberbullying',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'A falta de posicionamento permitiu que a agressão se espalhasse fora de controle, gerando traumas profundos na estudante.',
        whatHappened: 'O cyberbullying não para sozinho; ele exige intervenção ativa de alunos conscientes e da coordenação.',
        whyChoicesLedHere: 'A passividade ou o riso alimentam a sensação de impunidade de quem comete agressões virtuais.',
        saferBehaviorAdvice: 'Utilize o Sentinela Escolar para relatar grupos tóxicos com total garantia de anonimato.',
        coreLearning: 'Proteger a honra dos seus colegas na internet é um dever de todos. Se você viu algo errado, reporte.',
        metrics: { decision: 35, empathy: 30, safety: 40 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 03: O APELIDO OFENSIVO
  // =========================================================================
  {
    id: 'sim-03-apelido-ofensivo',
    scenarioNumber: 3,
    title: 'O Apelido Ofensivo',
    subtitle: 'Quando a "brincadeira" ultrapassa o limite do respeito',
    theme: 'respeito_limites',
    themeLabel: 'Respeito & Limites',
    estimatedMinutes: 3,
    iconName: 'message-square-warning',
    accentColor: 'amber',
    coverGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    summary: 'Na aula de Educação Física, Felipe recebe um apelido pejorativo toda vez que erra um lance. Ele já pediu para pararem, mas as piadas continuam.',
    characters: [
      { name: 'Felipe', role: 'Colega de time', avatarEmoji: '🏀', color: 'blue' },
      { name: 'Thiago', role: 'Autor das piadas', avatarEmoji: '📢', color: 'amber' },
      { name: 'Professor Carlos', role: 'Professor de Educação Física', avatarEmoji: '🏃‍♂️', color: 'emerald' }
    ],
    initialNodeId: 'node-03-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-03-inicio': {
        id: 'node-03-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Quadra Poliesportiva',
        locationTag: 'Quadra da Escola — Aula Prática',
        narrative: 'Durante o jogo de basquete, Felipe erra um passe. Thiago grita do outro lado da quadra um apelido humilhante ligado a uma característica física dele. Alguns alunos soltam risadas e Felipe abaixa a cabeça visivelmente desconfortável e com os olhos marejados.',
        dialogues: [
          { characterName: 'Thiago', text: 'Boa, "Tropeço"! Nem pra andar direito você serve!', avatarEmoji: '📢' },
          { characterName: 'Felipe', text: 'Para com isso Thiago, já falei que não gosto desse nome...', avatarEmoji: '🏀' },
          { characterName: 'Thiago', text: 'Ih, tá bravinho? É só zueira, aguenta a brincadeira!', avatarEmoji: '📢' }
        ],
        promptQuestion: 'Como você decide intervir nesse momento?',
        choices: [
          {
            id: 'c3-estabelecer-limite',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Falar com firmeza e calma: "Thiago, se ele não gostou, não é brincadeira. Chama pelo nome dele".',
            consequenceText: 'A quadra fica em silêncio. Sua fala objetiva e serena estabelece um limite claro sem gerar violência.',
            nextNodeId: 'node-03-limite-respeito',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c3-falar-com-professor',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Pedir substituição e conversar reservadamente com o Professor Carlos na beira da quadra.',
            consequenceText: 'O professor percebe o ocorrido, para a partida para um momento educativo sobre espírito esportivo.',
            nextNodeId: 'node-03-intervencao-professor',
            metricImpact: { decision: 30, empathy: 30, safety: 40 }
          },
          {
            id: 'c3-rir-junto',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Rir da piada para ser aceito pelo grupo do Thiago.',
            consequenceText: 'Felipe se sente totalmente desamparado e pede para ir ao banheiro chorar sozinho.',
            nextNodeId: 'outcome-03-alerta',
            metricImpact: { decision: 5, empathy: 0, safety: 10 }
          }
        ]
      },

      'node-03-limite-respeito': {
        id: 'node-03-limite-respeito',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'O Poder da Voz Ética',
        locationTag: 'Centro da Quadra',
        narrative: 'Thiago tenta desconversar dizendo "tá bom, não precisa militar", mas não repete o apelido. Você toca no ombro de Felipe e devolve a bola para ele continuar no jogo.',
        dialogues: [
          { characterName: 'Felipe', text: 'Obrigado de verdade... Eu já não aguentava mais esse apelido todo dia.', avatarEmoji: '🏀' }
        ],
        promptQuestion: 'Como consolidar o respeito no restante da aula?',
        choices: [
          {
            id: 'c3-incentivar-jogo-limpo',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Passar a bola para Felipe na jogada seguinte e comemorar seus acertos em equipe.',
            consequenceText: 'Felipe recupera a confiança, faz uma cesta e a aula segue com cooperação real.',
            nextNodeId: 'outcome-03-positivo',
            metricImpact: { decision: 35, empathy: 40, safety: 35 }
          }
        ]
      },

      'node-03-intervencao-professor': {
        id: 'node-03-intervencao-professor',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Roda de Conversa Esportiva',
        locationTag: 'Arquibancada da Quadra',
        narrative: 'O Professor Carlos reúne toda a turma na arquibancada e explica a diferença crucial entre zoeira saudável (onde todos se divertem) e humilhação moral sistemática.',
        dialogues: [
          { characterName: 'Professor Carlos', text: 'No esporte e na vida, o limite da brincadeira acaba quando o outro pede para parar. Apelidos pejorativos não serão tolerados aqui.', avatarEmoji: '🏃‍♂️' }
        ],
        promptQuestion: 'Qual atitude fortalece essa lição na turma?',
        choices: [
          {
            id: 'c3-apoiar-combinado',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Participar do combinado coletivo de só usar os nomes próprios de cada colega.',
            consequenceText: 'A turma cria uma regra clara de convivência e Thiago pede desculpas a Felipe no final da aula.',
            nextNodeId: 'outcome-03-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 40 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-03-positivo': {
        id: 'outcome-03-positivo',
        type: 'positivo',
        title: 'A Linha Clara Entre Brincadeira e Respeito',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Você demonstrou que impor limites éticos com serenidade protege a dignidade dos colegas e transforma o ambiente da aula.',
        whatHappened: 'A atitude de não aceitar a zombaria desfez a repetição do apelido e fortaleceu o respeito mútuo.',
        whyChoicesLedHere: 'Quando uma pessoa se posiciona com clareza, os agressores percebem que a atitude não tem respaldo do grupo.',
        saferBehaviorAdvice: 'A regra de ouro é simples: se a pessoa pediu para parar ou não está rindo junto, pare imediatamente.',
        coreLearning: 'Brincadeira só é boa quando todos se divertem. Apelidos não consensuais são formas de violência verbal e devem ser combatidos.',
        metrics: { decision: 90, empathy: 95, safety: 90 }
      },
      'outcome-03-aprendizado': {
        id: 'outcome-03-aprendizado',
        type: 'aprendizado',
        title: 'Compreendendo o Impacto das Palavras',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A experiência evidenciou como apelidos aparentemente inofensivos para quem fala podem ser profundamente dolorosos para quem ouve.',
        whatHappened: 'A intervenção pedagógica abriu espaço para que a turma refletisse sobre empatia nas relações cotidianas.',
        whyChoicesLedHere: 'O diálogo educativo evita que pequenos insultos escalem para perseguições maiores.',
        saferBehaviorAdvice: 'Use sempre o nome que a pessoa prefere ser chamada e defenda quem estiver sendo ridicularizado.',
        coreLearning: 'Palavras constroem ou destroem a autoestima de alguém. Escolha usar sua voz para valorizar seus colegas.',
        metrics: { decision: 75, empathy: 80, safety: 75 }
      },
      'outcome-03-alerta': {
        id: 'outcome-03-alerta',
        type: 'alerta',
        title: 'A Cumplicidade pelo Riso',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'Rir de uma humilhação legitima o agressor e multiplica a dor da vítima, afastando-a do convívio escolar.',
        whatHappened: 'Felipe se isolou e perdeu a vontade de participar das aulas por causa da zoeira generalizada.',
        whyChoicesLedHere: 'Quem ri de uma ofensa se torna cúmplice moral do bullying.',
        saferBehaviorAdvice: 'Não financie o bullying com risadas. Demonstre desaprovação mesmo que apenas com o silêncio sério.',
        coreLearning: 'Ter coragem moral significa não rir daquilo que machuca outra pessoa, mesmo quando todo mundo está rindo.',
        metrics: { decision: 30, empathy: 20, safety: 40 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 04: A FOTO COMPARTILHADA
  // =========================================================================
  {
    id: 'sim-04-foto-compartilhada',
    scenarioNumber: 4,
    title: 'A Foto Compartilhada',
    subtitle: 'Privacidade, consentimento e segurança digital',
    theme: 'privacidade_digital',
    themeLabel: 'Privacidade & Consentimento',
    estimatedMinutes: 4,
    iconName: 'shield-alert',
    accentColor: 'rose',
    coverGradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    summary: 'Uma foto tirada sem permissão no vestiário/corredor começa a circular em mensagens autodestrutivas. Alguém te envia pedindo para repassar.',
    characters: [
      { name: 'Juliana', role: 'Estudante exposta', avatarEmoji: '📷', color: 'rose' },
      { name: 'Renan', role: 'Colega que repassa', avatarEmoji: '🤳', color: 'slate' },
      { name: 'Diretora Alice', role: 'Diretora da Escola', avatarEmoji: '🏛️', color: 'purple' }
    ],
    initialNodeId: 'node-04-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-04-inicio': {
        id: 'node-04-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Foto Sem Consentimento',
        locationTag: 'Chat Privado — 16h20',
        narrative: 'Renan te manda uma foto no WhatsApp em modo de visualização única. É uma foto de Juliana tirada escondida no vestiário enquanto ela trocava a camiseta da escola. Renan escreve: "Olha isso kkk não conta que fui eu que mandei".',
        dialogues: [
          { characterName: 'Renan', text: 'Olha que comédia a Juliana kkk repassa pros manos!', avatarEmoji: '🤳' },
          { characterName: 'Você (Pensamento)', text: 'Isso é muito sério... Tirar foto escondida no vestiário é crime grave!', isUser: true }
        ],
        promptQuestion: 'Qual é a sua ação imediata com essa mensagem?',
        choices: [
          {
            id: 'c4-cortar-e-alertar',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Repreender Renan imediatamente: "Apaga isso agora! Tirar foto sem consentimento é crime e não vou repassar".',
            consequenceText: 'Você interrompe a cadeia de compartilhamento e alerta Renan sobre a gravidade da violação de privacidade.',
            nextNodeId: 'node-04-corte-seguro',
            metricImpact: { decision: 40, empathy: 35, safety: 40 }
          },
          {
            id: 'c4-avisar-diretoria',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Guardar o nome de quem enviou e procurar a Diretora Alice para orientar a intervenção imediata.',
            consequenceText: 'A direção acolhe o caso com máxima discrição e aciona os protocolos legais de proteção a menores.',
            nextNodeId: 'outcome-04-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 45 }
          },
          {
            id: 'c4-repassar-foto',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Tirar print e repassar no grupo de amigos íntimos.',
            consequenceText: 'A imagem se espalha para dezenas de pessoas e a família da estudante é obrigada a registrar Boletim de Ocorrência na Delegacia.',
            nextNodeId: 'outcome-04-alerta',
            metricImpact: { decision: 0, empathy: 0, safety: 0 }
          }
        ]
      },

      'node-04-corte-seguro': {
        id: 'node-04-corte-seguro',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Protegendo a Integridade',
        locationTag: 'Entrada da Escola',
        narrative: 'Renan percebe que cometeu um ato gravíssimo e apaga a foto do celular dele, mas você sabe que Juliana precisa saber que sua privacidade pode ter sido violada para poder se proteger.',
        dialogues: [
          { characterName: 'Você', text: 'Renan, você precisa entender que a Lei 13.718 e o ECA punem rigorosamente a divulgação de fotos íntimas ou sem consentimento.', isUser: true }
        ],
        promptQuestion: 'Como finalizar o acolhimento a Juliana?',
        choices: [
          {
            id: 'c4-apoio-orientacao',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Orientar Juliana a conversar com a Orientação Pedagógica acompanhada de seus responsáveis.',
            consequenceText: 'Juliana recebe suporte psicológico e a escola recolhe todos os aparelhos envolvidos.',
            nextNodeId: 'outcome-04-positivo',
            metricImpact: { decision: 35, empathy: 40, safety: 35 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-04-positivo': {
        id: 'outcome-04-positivo',
        type: 'positivo',
        title: 'Barreira Contra a Violação de Privacidade',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Sua recusa categórica em repassar e o acionamento dos canais de proteção impediram que a imagem destruísse a vida escolar de Juliana.',
        whatHappened: 'A cadeia de compartilhamento foi interrompida no primeiro elo, protegendo a intimidade da estudante.',
        whyChoicesLedHere: 'Compartilhar fotos sem consentimento é ato infracional. Cortar o repasse é uma obrigação ética e legal.',
        saferBehaviorAdvice: 'Se você receber fotos íntimas ou constrangedoras: não compartilhe, não salve e denuncie aos canais oficiais.',
        coreLearning: 'Privacidade não é negociável. Um único clique de repasse pode gerar danos irreparáveis; proteger o próximo é dever de todos.',
        metrics: { decision: 95, empathy: 95, safety: 100 }
      },
      'outcome-04-aprendizado': {
        id: 'outcome-04-aprendizado',
        type: 'aprendizado',
        title: 'A Responsabilidade Legal na Era Digital',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'O episódio serviu para conscientizar os estudantes sobre as leis que punem a exposição não consentida de imagens.',
        whatHappened: 'A escola realizou assembleias informando sobre as implicações jurídicas do registro e envio de fotos íntimas.',
        whyChoicesLedHere: 'Informação clara ajuda os jovens a entenderem que o meio digital não é uma terra sem leis.',
        saferBehaviorAdvice: 'Nunca tire fotos de colegas em ambientes privados como banheiros, vestiários ou momentos vulneráveis.',
        coreLearning: 'Consentimento é tudo. Respeitar o corpo e a imagem do outro é a base da convivência ética.',
        metrics: { decision: 75, empathy: 75, safety: 80 }
      },
      'outcome-04-alerta': {
        id: 'outcome-04-alerta',
        type: 'alerta',
        title: 'Crime Cibernético e Danos Irreparáveis',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'A divulgação causou o afastamento da aluna e gerou processos criminais para todos os envolvidos no compartilhamento.',
        whatHappened: 'A imagem viralizou causando humilhação pública e intervenção da Delegacia de Proteção à Criança e ao Adolescente.',
        whyChoicesLedHere: 'Achar que "só repassar" não é grave gerou cumplicidade em ato infracional.',
        saferBehaviorAdvice: 'O Sentinela Escolar permite anexar links e prints para que a escola aja antes do vazamento se tornar irreversível.',
        coreLearning: 'Repassar imagens íntimas ou degradantes é crime. Rompa o ciclo e proteja quem precisa.',
        metrics: { decision: 20, empathy: 15, safety: 10 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 05: O BOATO NOS CORREDORES
  // =========================================================================
  {
    id: 'sim-05-boato-corredores',
    scenarioNumber: 5,
    title: 'O Boato nos Corredores',
    subtitle: 'Responsabilidade, desinformação e danos morais',
    theme: 'responsabilidade_boatos',
    themeLabel: 'Combate a Boatos',
    estimatedMinutes: 3,
    iconName: 'message-square',
    accentColor: 'blue',
    coverGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    summary: 'Um boato mentiroso sobre a vida pessoal de Camila começa a se espalhar no início da semana. Duas pessoas te abordam contando a fofoca como verdade.',
    characters: [
      { name: 'Camila', role: 'Estudante alvo do boato', avatarEmoji: '📚', color: 'purple' },
      { name: 'Larissa', role: 'Colega que conta o boato', avatarEmoji: '🗣️', color: 'amber' }
    ],
    initialNodeId: 'node-05-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-05-inicio': {
        id: 'node-05-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Fofoca no Corredor',
        locationTag: 'Corredor do 9º Ano',
        narrative: 'No intervalo, Larissa te puxa de lado e diz com tom de segredo: "Fiquei sabendo que a Camila colou na prova e roubou o estojo da professora! Passa pra frente pra todo mundo ficar sabendo!".',
        dialogues: [
          { characterName: 'Larissa', text: 'Você não vai acreditar no que me contaram sobre a Camila...', avatarEmoji: '🗣️' },
          { characterName: 'Você (Pensamento)', text: 'A Camila é super esforçada e nunca faria isso. Esse boato parece pura maldade.', isUser: true }
        ],
        promptQuestion: 'Como você responde à fofoca?',
        choices: [
          {
            id: 'c5-questionar-origem',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Questionar com firmeza: "Larissa, você viu isso acontecer ou só está repassando fofoca que pode prejudicar a Camila?".',
            consequenceText: 'Larissa fica sem resposta, admite que ouviu de terceira pessoa e o boato perde a força na hora.',
            nextNodeId: 'node-05-desmonte-boato',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c5-apoiar-camila',
            iconEmoji: '🟡',
            tone: 'empatia',
            text: 'Avisar Camila com cuidado para que ela possa esclarecer com a coordenação antes que o boato cresça.',
            consequenceText: 'Camila agradece pelo alerta precoce e desmente o boato junto à professora titular.',
            nextNodeId: 'outcome-05-positivo',
            metricImpact: { decision: 30, empathy: 40, safety: 35 }
          },
          {
            id: 'c5-repassar-fofoca',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Acreditar cegamente e contar para mais cinco pessoas.',
            consequenceText: 'O boato atinge proporções gigantescas e Camila entra em desespero na sala.',
            nextNodeId: 'outcome-05-alerta',
            metricImpact: { decision: 10, empathy: 5, safety: 10 }
          }
        ]
      },

      'node-05-desmonte-boato': {
        id: 'node-05-desmonte-boato',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Verificação da Verdade',
        locationTag: 'Mesa do Pátio',
        narrative: 'Ao desmascarar a fofoca, outros alunos que estavam por perto percebem que estavam prestes a difamar uma colega sem provas.',
        dialogues: [
          { characterName: 'Você', text: 'Boatos destroem a reputação das pessoas. Se não temos certeza, nosso papel é calar a fofoca.', isUser: true }
        ],
        promptQuestion: 'Qual é o melhor desfecho para a situação?',
        choices: [
          {
            id: 'c5-finalizar-paz',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Fazer um pacto com o grupo de não repassar nenhuma informação não confirmada.',
            consequenceText: 'A fofoca morre ali mesmo e a convivência na sala segue respeitosa e tranquila.',
            nextNodeId: 'outcome-05-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 30 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-05-positivo': {
        id: 'outcome-05-positivo',
        type: 'positivo',
        title: 'Filtro da Verdade e Defesa Moral',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Você aplicou o filtro do bom senso e impediu que uma mentira machucasse a dignidade de uma estudante.',
        whatHappened: 'O boato foi desmentido e desmontado antes de criar um clima tóxico de julgamento na turma.',
        whyChoicesLedHere: 'Questionar a fonte e não alimentar a fofoca são atitudes fundamentais contra o bullying moral.',
        saferBehaviorAdvice: 'Diante de qualquer boato, pergunte: "Isso é verdade? É bom? É necessário repassar?". Se não, guarde para si.',
        coreLearning: 'A calúnia e a difamação são formas graves de violência moral. Seja o ponto final das fofocas, nunca a ponte.',
        metrics: { decision: 90, empathy: 90, safety: 90 }
      },
      'outcome-05-aprendizado': {
        id: 'outcome-05-aprendizado',
        type: 'aprendizado',
        title: 'O Perigo das Narrativas Sem Provas',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A experiência ensinou a todos que propagar mentiras causa sofrimento real e pode configurar dano moral.',
        whatHappened: 'A turma aprendeu a checar fatos antes de formar juízos precipitados sobre qualquer colega.',
        whyChoicesLedHere: 'Refletir sobre a responsabilidade da fala é o primeiro passo para relações humanas saudáveis.',
        saferBehaviorAdvice: 'Defenda quem não está presente para se defender.',
        coreLearning: 'Cuidar da reputação dos outros é também cuidar do ambiente em que todos nós convivemos.',
        metrics: { decision: 75, empathy: 75, safety: 75 }
      },
      'outcome-05-alerta': {
        id: 'outcome-05-alerta',
        type: 'alerta',
        title: 'O Veneno da Difamação Coletiva',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'O boato destruiu amizades e gerou um ambiente de desconfiança e perseguição contra a aluna.',
        whatHappened: 'A fofoca espalhada sem controle causou danos emocionais severos e exigiu reunião com os pais.',
        whyChoicesLedHere: 'Repassar inverdades sem checagem é uma forma de conivência com a agressão moral.',
        saferBehaviorAdvice: 'Use o Sentinela Escolar para relatar campanhas de difamação sistemática.',
        coreLearning: 'Mantenha-se fiel à verdade. Uma reputação leva anos para ser construída e pode ser abalada por uma fofoca leviana.',
        metrics: { decision: 30, empathy: 25, safety: 35 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 06: O ALUNO NOVO
  // =========================================================================
  {
    id: 'sim-06-aluno-novo',
    scenarioNumber: 6,
    title: 'O Aluno Novo',
    subtitle: 'Acolhimento, diversidade e combate ao preconceito',
    theme: 'acolhimento',
    themeLabel: 'Acolhimento & Diversidade',
    estimatedMinutes: 3,
    iconName: 'heart',
    accentColor: 'teal',
    coverGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    summary: 'Youssef acabou de se mudar de outro estado e tem sotaque diferente. Alguns alunos começam a rir toda vez que ele lê em voz alta.',
    characters: [
      { name: 'Youssef', role: 'Aluno recém-chegado', avatarEmoji: '🌍', color: 'teal' },
      { name: 'Professor Henrique', role: 'Professor de Geografia', avatarEmoji: '👨‍🏫', color: 'blue' }
    ],
    initialNodeId: 'node-06-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-06-inicio': {
        id: 'node-06-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Primeiro Dia de Youssef',
        locationTag: 'Sala de Aula — Aula de Geografia',
        narrative: 'Youssef é chamado para ler um trecho do livro didático. Por ter um sotaque regional diferente, ele pronuncia algumas palavras de forma distinta. No fundo da sala, dois alunos imitam o sotaque dele de forma exagerada e soltam risinhos.',
        dialogues: [
          { characterName: 'Youssef', text: '...as principais bacias hidrográficas da região...', avatarEmoji: '🌍' },
          { characterName: 'Colega no Fundo', text: 'Olha como ele fala kkk parece sotaque de outro mundo!', avatarEmoji: '🤡' }
        ],
        promptQuestion: 'Como você reage ao comportamento do fundo da sala?',
        choices: [
          {
            id: 'c6-elogiar-e-incluir',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Ouvir a leitura com atenção e, no trabalho em grupo a seguir, convidar Youssef para a sua equipe.',
            consequenceText: 'Youssef se sente valorizado e demonstra excelente conhecimento sobre o assunto do trabalho.',
            nextNodeId: 'node-06-trabalho-grupo',
            metricImpact: { decision: 35, empathy: 40, safety: 35 }
          },
          {
            id: 'c6-apoiar-professor',
            iconEmoji: '🟡',
            tone: 'seguranca',
            text: 'Fazer uma pergunta relevante sobre o sotaque e a cultura do estado de onde ele veio.',
            consequenceText: 'A pergunta transforma a leitura em uma aula rica sobre diversidade cultural brasileira.',
            nextNodeId: 'outcome-06-positivo',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c6-ignorar-e-afastar',
            iconEmoji: '🔵',
            tone: 'neutro',
            text: 'Não falar com Youssef para não ser associado ao "aluno estranho".',
            consequenceText: 'Youssef passa as primeiras semanas calado e isolado de todas as conversas.',
            nextNodeId: 'outcome-06-alerta',
            metricImpact: { decision: 15, empathy: 10, safety: 20 }
          }
        ]
      },

      'node-06-trabalho-grupo': {
        id: 'node-06-trabalho-grupo',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'A Riqueza da Diversidade',
        locationTag: 'Mesas Agrupadas',
        narrative: 'Durante o trabalho em equipe, Youssef compartilha relatos incríveis da sua cidade natal e ajuda a organizar a apresentação do grupo.',
        dialogues: [
          { characterName: 'Youssef', text: 'Eu tava com muito medo de não fazer amigos aqui. Muito obrigado por me acolherem tão bem!', avatarEmoji: '🌍' }
        ],
        promptQuestion: 'Como garantir que o acolhimento continue nos próximos dias?',
        choices: [
          {
            id: 'c6-apresentar-escola',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Apresentar a escola, os laboratórios e os outros colegas durante o recreio.',
            consequenceText: 'Youssef se adapta rapidamente e passa a se sentir em casa na nova escola.',
            nextNodeId: 'outcome-06-positivo',
            metricImpact: { decision: 35, empathy: 40, safety: 30 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-06-positivo': {
        id: 'outcome-06-positivo',
        type: 'positivo',
        title: 'Cultura de Acolhimento e Hospitalidade',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Sua atitude inclusiva acolheu um novo estudante e transformou a diferença cultural em aprendizado para toda a turma.',
        whatHappened: 'A zombaria foi desarmada pela valorização da bagagem do colega e pela integração em equipe.',
        whyChoicesLedHere: 'Acolher quem chega é um dos maiores atos de empatia e previne o surgimento de preconceitos.',
        saferBehaviorAdvice: 'Quando chegar um aluno novo, seja o primeiro a sorrir, se apresentar e mostrar a escola.',
        coreLearning: 'A diversidade enriquece nossa convivência. O Brasil é feito de múltiplos sotaques e culturas que merecem respeito.',
        metrics: { decision: 95, empathy: 100, safety: 90 }
      },
      'outcome-06-aprendizado': {
        id: 'outcome-06-aprendizado',
        type: 'aprendizado',
        title: 'Quebrando Estereótipos',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A turma compreendeu que o estranhamento inicial desaparece quando nos permitimos conhecer as pessoas.',
        whatHappened: 'O diálogo educativo venceu o preconceito sutil.',
        whyChoicesLedHere: 'Promover a troca cultural previne o bullying baseado em origem ou características regionais.',
        saferBehaviorAdvice: 'Nunca imite ou ridicularize o modo de falar ou as tradições de ninguém.',
        coreLearning: 'Nenhum sotaque é superior ou inferior; todos são expressões legítimas da nossa identidade.',
        metrics: { decision: 80, empathy: 80, safety: 80 }
      },
      'outcome-06-alerta': {
        id: 'outcome-06-alerta',
        type: 'alerta',
        title: 'A Dor da Invisibilidade no Novo Ambiente',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'A falta de acolhimento fez com que o estudante se sentisse rejeitado e indesejado na nova comunidade.',
        whatHappened: 'O isolamento prolongado prejudicou o rendimento escolar e a saúde mental do aluno recém-chegado.',
        whyChoicesLedHere: 'A indiferença é uma forma silenciosa de exclusão social.',
        saferBehaviorAdvice: 'Coloque-se no lugar de quem chega sem conhecer ninguém em uma escola desconhecida.',
        coreLearning: 'Ser acolhedor não custa nada e pode transformar totalmente a trajetória de alguém que está recomeçando.',
        metrics: { decision: 30, empathy: 20, safety: 40 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 07: A PROVOCAÇÃO NO INTERVALO
  // =========================================================================
  {
    id: 'sim-07-provocacao-intervalo',
    scenarioNumber: 7,
    title: 'A Provocação no Intervalo',
    subtitle: 'Conflito, desescalada e busca de ajuda',
    theme: 'desescalada_conflito',
    themeLabel: 'Desescalada de Conflito',
    estimatedMinutes: 4,
    iconName: 'zap',
    accentColor: 'orange',
    coverGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    summary: 'Na fila da cantina, um aluno mais velho esbarra de propósito em Danilo, derruba o suco dele e o encara com agressividade procurando briga.',
    characters: [
      { name: 'Danilo', role: 'Estudante provocado', avatarEmoji: '🥤', color: 'blue' },
      { name: 'Bruno', role: 'Aluno provocador', avatarEmoji: '😠', color: 'rose' },
      { name: 'Inspetor Marcos', role: 'Inspetor de Pátio', avatarEmoji: '👮‍♂️', color: 'emerald' }
    ],
    initialNodeId: 'node-07-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-07-inicio': {
        id: 'node-07-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'Tensão na Fila da Cantina',
        locationTag: 'Fila da Cantina — Pátio',
        narrative: 'Bruno passa empurrando o ombro de Danilo com força, fazendo o copo de suco cair no chão. Bruno se vira com os punhos cerrados e diz: "Olha por onde anda, tampinha! Vai encarar ou quer apanhar aqui mesmo?". Danilo treme de medo e vários alunos começam a gritar "Briga! Briga!".',
        dialogues: [
          { characterName: 'Bruno', text: 'Derrubou meu lanche de propósito, é? Vai pedir desculpa de joelhos ou vai apanhar?', avatarEmoji: '😠' },
          { characterName: 'Danilo', text: 'Eu não fiz nada... você que esbarrou em mim...', avatarEmoji: '🥤' }
        ],
        promptQuestion: 'Como você age diante desse risco iminente de agressão física?',
        choices: [
          {
            id: 'c7-chamar-inspetor-rapido',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Correr imediatamente até o Inspetor Marcos, que está a 10 metros, dizendo com urgência: "Inspetor, tem risco de briga na cantina!".',
            consequenceText: 'O inspetor chega em segundos, se coloca entre os dois com calma e autoridade, desarmando o confronto.',
            nextNodeId: 'outcome-07-positivo',
            metricImpact: { decision: 40, empathy: 30, safety: 45 }
          },
          {
            id: 'c7-desescalar-verbalmente',
            iconEmoji: '🟡',
            tone: 'empatia',
            text: 'Dizer em voz alta e tranquila: "Gente, foi só um acidente com o suco, eu ajudo a limpar, vamos manter a calma".',
            consequenceText: 'Sua intervenção serena quebra o ímpeto violento de Bruno e dá tempo para os monitores chegarem.',
            nextNodeId: 'node-07-desescalada-sucesso',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c7-incentivar-briga',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Gritar e incentivar Danilo a bater em Bruno para "não passar vergonha".',
            consequenceText: 'Começa uma briga física generalizada, Danilo sai ferido e ambos são suspensos.',
            nextNodeId: 'outcome-07-alerta',
            metricImpact: { decision: 0, empathy: 0, safety: 0 }
          }
        ]
      },

      'node-07-desescalada-sucesso': {
        id: 'node-07-desescalada-sucesso',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Desarmando a Tensão',
        locationTag: 'Área da Cantina',
        narrative: 'Ao propor uma solução prática e não agressiva, o público que estava incentivando a briga perde o interesse. O inspetor chega e encaminha ambos para a sala de mediação.',
        dialogues: [
          { characterName: 'Inspetor Marcos', text: 'Muito bem quem pediu calma. Violência aqui dentro não resolve nada.', avatarEmoji: '👮‍♂️' }
        ],
        promptQuestion: 'Como apoiar Danilo após o susto?',
        choices: [
          {
            id: 'c7-acompanhar-danilo',
            iconEmoji: '🟢',
            tone: 'empatia',
            text: 'Pegar outro lanche com ele e sentarem juntos em um local seguro.',
            consequenceText: 'Danilo se acalma e agradece por você ter evitado que ele sofresse violência física.',
            nextNodeId: 'outcome-07-positivo',
            metricImpact: { decision: 35, empathy: 40, safety: 35 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-07-positivo': {
        id: 'outcome-07-positivo',
        type: 'positivo',
        title: 'Prevenção da Violência e Ação Rápida',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Sua agilidade em acionar o inspetor evitou uma agressão física e garantiu a segurança de todos no pátio.',
        whatHappened: 'A busca imediata por um adulto responsável impediu que a provocação se transformasse em briga.',
        whyChoicesLedHere: 'Em riscos de violência física, nunca tente resolver no braço: chame quem tem autoridade e treinamento para mediar.',
        saferBehaviorAdvice: 'Ao presenciar início de agressão física, afaste-se do perigo e chame imediatamente monitores, professores ou inspetores.',
        coreLearning: 'Procurar ajuda diante da violência não é fraqueza; é a atitude mais inteligente e segura para proteger a vida de todos.',
        metrics: { decision: 95, empathy: 90, safety: 100 }
      },
      'outcome-07-aprendizado': {
        id: 'outcome-07-aprendizado',
        type: 'aprendizado',
        title: 'O Perigo da Provocação em Público',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A situação evidenciou como a plateia pode inflamar conflitos que seriam facilmente resolvidos com calma.',
        whatHappened: 'A intervenção pacífica quebrou o efeito de manada que pedia violência.',
        whyChoicesLedHere: 'Não dar plateia aos agressores desestimula comportamentos intimidatórios.',
        saferBehaviorAdvice: 'Nunca grite "briga". Desvie a atenção e chame ajuda com discrição.',
        coreLearning: 'A plateia que incentiva a briga é tão responsável pelo conflito quanto quem desferiu o primeiro golpe.',
        metrics: { decision: 80, empathy: 80, safety: 85 }
      },
      'outcome-07-alerta': {
        id: 'outcome-07-alerta',
        type: 'alerta',
        title: 'A Armadilha da Agressão Física',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'O incentivo à briga resultou em lesões corporais, suspensões disciplinares e risco à integridade física.',
        whatHappened: 'O confronto escalou para agressão mútua com consequências graves para os envolvidos.',
        whyChoicesLedHere: 'Responder à violência com mais violência só multiplica o perigo.',
        saferBehaviorAdvice: 'Em caso de agressão física iminente, acione imediatamente o botão de emergência ou procure a direção.',
        coreLearning: 'A violência física nunca resolveu um conflito. A paz se constrói com regras claras e mediação institucional.',
        metrics: { decision: 10, empathy: 10, safety: 10 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 08: A PRESSÃO DO GRUPO DE MENSAGENS
  // =========================================================================
  {
    id: 'sim-08-pressao-grupo',
    scenarioNumber: 8,
    title: 'A Pressão dos Colegas',
    subtitle: 'Coragem moral e postura ética em grupo',
    theme: 'pressao_colegas',
    themeLabel: 'Pressão dos Pares',
    estimatedMinutes: 3,
    iconName: 'users',
    accentColor: 'purple',
    coverGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    summary: 'Seus amigos mais próximos te desafiam a "trollar" e humilhar uma colega no chat coletivo para provar que você é "do time".',
    characters: [
      { name: 'Enzo', role: 'Líder do grupinho', avatarEmoji: '😏', color: 'amber' },
      { name: 'Marina', role: 'Colega alvo do desafio', avatarEmoji: '🎒', color: 'purple' }
    ],
    initialNodeId: 'node-08-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-08-inicio': {
        id: 'node-08-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Desafio Entre Amigos',
        locationTag: 'Chamada de Voz em Grupo',
        narrative: 'Enzo e outros dois amigos dizem: "Se você é nosso amigo de verdade, vai lá no post da Marina e comenta que o trabalho dela ficou ridículo e que ela devia desistir do curso. Anda, posta agora!". Eles começam a rir e te pressionar.',
        dialogues: [
          { characterName: 'Enzo', text: 'Vai amarelar? É só uma zoeira, se você não postar, você tá fora do nosso rolê!', avatarEmoji: '😏' },
          { characterName: 'Você (Pensamento)', text: 'A Marina se esforçou tanto nesse trabalho... Fazer isso seria pura crueldade só pra agradar eles.', isUser: true }
        ],
        promptQuestion: 'Como você reage à chantagem do grupo?',
        choices: [
          {
            id: 'c8-dizer-nao-com-firmeza',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: '"Não vou fazer isso. Amizade de verdade não exige que a gente humilhe ninguém pra provar nada".',
            consequenceText: 'Sua firmeza surpreende o grupo. Um dos amigos admite em seguida: "É, pensando bem, é meio pesado mesmo".',
            nextNodeId: 'outcome-08-positivo',
            metricImpact: { decision: 45, empathy: 40, safety: 35 }
          },
          {
            id: 'c8-sair-da-chamada',
            iconEmoji: '🟡',
            tone: 'neutro',
            text: 'Desligar a chamada e mandar mensagem para Marina elogiando o trabalho dela em particular.',
            consequenceText: 'Você se recusa a praticar o ataque e apoia a colega, embora não tenha confrontado o grupo na hora.',
            nextNodeId: 'outcome-08-aprendizado',
            metricImpact: { decision: 30, empathy: 35, safety: 30 }
          },
          {
            id: 'c8-ceder-a-pressao',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Fazer o comentário maldoso para não ser expulso do grupo de amigos.',
            consequenceText: 'Marina lê a mensagem, apaga a postagem aos prantos e você passa a noite com a consciência pesada.',
            nextNodeId: 'outcome-08-alerta',
            metricImpact: { decision: 10, empathy: 5, safety: 10 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-08-positivo': {
        id: 'outcome-08-positivo',
        type: 'positivo',
        title: 'Coragem Moral e Autonomia Ética',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Você demonstrou verdadeira maturidade ao dizer NÃO à chantagem dos colegas e proteger a dignidade de Marina.',
        whatHappened: 'A recusa consciente desarmou o ataque coletivo e estabeleceu um exemplo de liderança positiva.',
        whyChoicesLedHere: 'Dizer "não" para os próprios amigos quando estão errados é a mais alta prova de caráter.',
        saferBehaviorAdvice: 'Amigos de verdade nunca exigem que você faça o mal ou machuque alguém para ser aceito.',
        coreLearning: 'A pressão dos pares é forte, mas a sua integridade pessoal é muito mais valiosa. Seja fiel aos seus princípios.',
        metrics: { decision: 100, empathy: 95, safety: 90 }
      },
      'outcome-08-aprendizado': {
        id: 'outcome-08-aprendizado',
        type: 'aprendizado',
        title: 'O Desafio de se Posicionar em Grupo',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'Você não participou do ataque e apoiou a vítima, aprendendo a importância de fortalecer sua voz ativa.',
        whatHappened: 'Apoiar em segredo foi positivo, mas manifestar desacordo em público ajuda a educar o grupo.',
        whyChoicesLedHere: 'Desenvolver a coragem de se expressar é uma habilidade que cresce com a prática.',
        saferBehaviorAdvice: 'Da próxima vez, expresse seu desacordo de forma clara antes de se retirar.',
        coreLearning: 'Não participar do erro já é uma vitória; inspirar os outros a não errarem é o próximo passo.',
        metrics: { decision: 75, empathy: 80, safety: 75 }
      },
      'outcome-08-alerta': {
        id: 'outcome-08-alerta',
        type: 'alerta',
        title: 'A Armadilha da Aprovação Social',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'Ceder à pressão machucou uma pessoa inocente e não garantiu o respeito verdadeiro do grupo.',
        whatHappened: 'O medo de ser excluído levou a praticar uma agressão injustificável contra uma colega.',
        whyChoicesLedHere: 'Quem precisa rebaixar alguém para se sentir aceito acaba perdendo o próprio autorrespeito.',
        saferBehaviorAdvice: 'Peça desculpas sinceras a Marina e reveja quais amizades realmente te fazem crescer.',
        coreLearning: 'Nunca negocie seus valores para caber em grupos que se alimentam da humilhação alheia.',
        metrics: { decision: 25, empathy: 20, safety: 20 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 09: UMA AMEAÇA ONLINE
  // =========================================================================
  {
    id: 'sim-09-ameaca-online',
    scenarioNumber: 9,
    title: 'Uma Ameaça Online',
    subtitle: 'Segurança digital, provas e canais de proteção',
    theme: 'seguranca_ameacas',
    themeLabel: 'Segurança Digital & Ameaças',
    estimatedMinutes: 4,
    iconName: 'shield',
    accentColor: 'rose',
    coverGradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    summary: 'Um perfil anônimo envia mensagens com ameaças de agressão física na saída da escola para um colega do seu grupo de estudos.',
    characters: [
      { name: 'Henrique', role: 'Estudante ameaçado', avatarEmoji: '😰', color: 'blue' },
      { name: 'Perfil Anônimo', role: 'Conta fake', avatarEmoji: '👤', color: 'slate' },
      { name: 'Coordenadora Heloísa', role: 'Coordenação Pedagógica', avatarEmoji: '👩‍💼', color: 'purple' }
    ],
    initialNodeId: 'node-09-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-09-inicio': {
        id: 'node-09-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'A Mensagem Anônima no Instagram',
        locationTag: 'Direct do Instagram — 19h10',
        narrative: 'Henrique te liga assustado compartilhando a tela do celular: um perfil sem foto (@escola_vigia_fake) enviou mensagens dizendo que "vai pegar ele no portão amanhã e que ele vai se arrepender de ter nascido". Henrique está apavorado e quer apagar a conta.',
        dialogues: [
          { characterName: 'Henrique', text: 'Eu tô tremendo... Será que eu apago a mensagem e não vou pra aula amanhã?', avatarEmoji: '😰' },
          { characterName: 'Você (Pensamento)', text: 'Ameaça de agressão física é gravíssimo. Não podemos apagar as provas!', isUser: true }
        ],
        promptQuestion: 'Qual orientação você dá para Henrique agora?',
        choices: [
          {
            id: 'c9-preservar-e-denunciar',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: '"Henrique, NÃO apague! Tire print do link do perfil, das mensagens e do horário. Vamos registrar no Sentinela Escolar e avisar seus pais".',
            consequenceText: 'As evidências são salvas com URLs completas e os pais de Henrique acionam a escola e as autoridades com todas as provas em mãos.',
            nextNodeId: 'outcome-09-positivo',
            metricImpact: { decision: 45, empathy: 40, safety: 50 }
          },
          {
            id: 'c9-responder-ameaca',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: '"Manda mensagem xingando ele de volta e marcando um local pra tirar satisfação".',
            consequenceText: 'O agressor se alimenta do confronto e a situação ganha contornos de perigo real de emboscada.',
            nextNodeId: 'outcome-09-alerta',
            metricImpact: { decision: 5, empathy: 10, safety: 0 }
          },
          {
            id: 'c9-apagar-e-bloquear-sem-print',
            iconEmoji: '🟡',
            tone: 'neutro',
            text: '"Apenas bloqueia o perfil e não conta pra ninguém pra não preocupar seus pais".',
            consequenceText: 'O perfil é bloqueado, mas cria outra conta fake no dia seguinte para continuar as ameaças sem que os pais saibam.',
            nextNodeId: 'outcome-09-aprendizado',
            metricImpact: { decision: 25, empathy: 25, safety: 30 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-09-positivo': {
        id: 'outcome-09-positivo',
        type: 'positivo',
        title: 'Preservação de Evidências e Proteção Efetiva',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Graças à preservação correta das provas digitais, a escola e as autoridades identificaram o autor do perfil fake e garantiram a segurança de Henrique.',
        whatHappened: 'A orientação calma e técnica evitou a perda de provas cruciais e protegeu o estudante.',
        whyChoicesLedHere: 'Em casos de ameaças digitais, registrar provas (prints, URLs, horários) e envolver adultos de confiança é a única conduta segura.',
        saferBehaviorAdvice: 'Nunca responda a ameaças online. Salve os prints, copie o link do perfil (@) e registre um protocolo no Sentinela Escolar.',
        coreLearning: 'O anonimato na internet é ilusório. Perfis falsos deixam rastros digitais (IPs, metadados) que a perícia consegue rastrear.',
        metrics: { decision: 100, empathy: 95, safety: 100 }
      },
      'outcome-09-aprendizado': {
        id: 'outcome-09-aprendizado',
        type: 'aprendizado',
        title: 'A Importância de Guardar Registros',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'Bloquear sem salvar provas atrasou a identificação do agressor, ensinando a importância da documentação.',
        whatHappened: 'O agressor continuou incomodando porque nenhuma providência institucional pôde ser tomada sem evidências.',
        whyChoicesLedHere: 'Ameaças exigem intervenção de adultos; guardar segredo coloca a vítima em risco contínuo.',
        saferBehaviorAdvice: 'Sempre tire prints antes de bloquear qualquer perfil abusivo.',
        coreLearning: 'Segurança digital se faz com provas e canais institucionais, nunca com silêncio ou improviso.',
        metrics: { decision: 70, empathy: 70, safety: 70 }
      },
      'outcome-09-alerta': {
        id: 'outcome-09-alerta',
        type: 'alerta',
        title: 'O Risco da Provocação ao Agressor',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'Bater boca com quem ameaça aumentou o risco e colocou os estudantes em perigo iminente.',
        whatHappened: 'A discussão virtual alimentou o comportamento hostil do agressor.',
        whyChoicesLedHere: 'Nunca tente desafiar quem faz ameaças anônimas.',
        saferBehaviorAdvice: 'Ameaça de agressão física é crime gravíssimo; acione imediatamente a polícia e a direção escolar.',
        coreLearning: 'Diante de ameaças, a prioridade absoluta é a proteção física e a segurança jurídica da vítima.',
        metrics: { decision: 15, empathy: 15, safety: 10 }
      }
    }
  },

  // =========================================================================
  // SITUAÇÃO 10: TESTEMUNHA DE BULLYING NA QUADRA
  // =========================================================================
  {
    id: 'sim-10-testemunha-quadra',
    scenarioNumber: 10,
    title: 'Testemunha Ativa e Segura',
    subtitle: 'Como agir com segurança: da passividade à proteção',
    theme: 'testemunha_ativa',
    themeLabel: 'Testemunha Ativa & Proteção',
    estimatedMinutes: 4,
    iconName: 'eye',
    accentColor: 'indigo',
    coverGradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    summary: 'Atrás da arquibancada, três alunos encurralam um colega mais novo para exigir dinheiro do lanche. Você vê tudo de longe.',
    characters: [
      { name: 'Vítima (6º Ano)', role: 'Estudante mais novo', avatarEmoji: '🥺', color: 'blue' },
      { name: 'Agressores (9º Ano)', role: 'Três alunos', avatarEmoji: '👥', color: 'slate' },
      { name: 'Professor de Plantão', role: 'Corpo docente', avatarEmoji: '👨‍🏫', color: 'purple' }
    ],
    initialNodeId: 'node-10-inicio',
    totalPossibleOutcomes: 3,
    nodes: {
      'node-10-inicio': {
        id: 'node-10-inicio',
        stepNumber: 1,
        totalStepsEstimated: 3,
        title: 'O Ponto Cego da Arquibancada',
        locationTag: 'Atrás da Arquibancada da Quadra',
        narrative: 'Você passa perto do depósito de materiais esportivos e vê três alunos maiores cercando um menino menor do 6º Ano. Eles estão com a mão no bolso dele exigindo o dinheiro da cantina e dizendo: "Se você abrir o bico, a gente te pega lá fora".',
        dialogues: [
          { characterName: 'Agressores', text: 'Passa a nota de dez logo e fica quieto se não quiser apanhar!', avatarEmoji: '👥' },
          { characterName: 'Vítima (6º Ano)', text: 'Por favor, é o dinheiro do meu almoço...', avatarEmoji: '🥺' }
        ],
        promptQuestion: 'Você está sozinho e eles são três. Qual é a conduta mais inteligente e segura?',
        choices: [
          {
            id: 'c10-buscar-ajuda-imediata',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Não se expor sozinho. Caminhar rapidamente até o professor mais próximo e relatar com precisão o local exato.',
            consequenceText: 'O professor e dois funcionários chegam imediatamente no local, flagrando a coerção e resgatando o menino em segurança.',
            nextNodeId: 'outcome-10-positivo',
            metricImpact: { decision: 45, empathy: 40, safety: 50 }
          },
          {
            id: 'c10-chamar-atencao-distancia',
            iconEmoji: '🟡',
            tone: 'empatia',
            text: 'Gritar de longe: "Professor, estamos aqui!", simulando que um adulto já está chegando com você.',
            consequenceText: 'Os três agressores se assustam com a menção ao professor e se dispersam correndo, liberando a vítima.',
            nextNodeId: 'node-10-acolher-menino',
            metricImpact: { decision: 35, empathy: 35, safety: 35 }
          },
          {
            id: 'c10-ignorar-e-ir-embora',
            iconEmoji: '🔴',
            tone: 'arriscado',
            text: 'Fingir que não viu nada para não sobrar para você.',
            consequenceText: 'O dinheiro é roubado e o garoto passa a ter crises de pânico antes de ir para a escola.',
            nextNodeId: 'outcome-10-alerta',
            metricImpact: { decision: 10, empathy: 0, safety: 20 }
          }
        ]
      },

      'node-10-acolher-menino': {
        id: 'node-10-acolher-menino',
        stepNumber: 2,
        totalStepsEstimated: 3,
        title: 'Acolhendo a Vítima',
        locationTag: 'Área da Quadra',
        narrative: 'O menino está em choque e chorando. Você se aproxima com cuidado e se oferece para acompanhá-lo até a coordenação.',
        dialogues: [
          { characterName: 'Você', text: 'Você tá seguro agora. Vem comigo, a gente vai conversar com a coordenação e ninguém vai te machucar.', isUser: true }
        ],
        promptQuestion: 'Como finalizar essa intervenção de forma definitiva?',
        choices: [
          {
            id: 'c10-formalizar-apoio',
            iconEmoji: '🟢',
            tone: 'seguranca',
            text: 'Acompanhar o estudante até a sala da direção e dar o depoimento como testemunha protegida.',
            consequenceText: 'A escola toma as medidas disciplinares e de segurança sem expor você nem a vítima.',
            nextNodeId: 'outcome-10-positivo',
            metricImpact: { decision: 40, empathy: 40, safety: 40 }
          }
        ]
      }
    },
    outcomes: {
      'outcome-10-positivo': {
        id: 'outcome-10-positivo',
        type: 'positivo',
        title: 'O Triunfo da Testemunha Consciente',
        badgeLabel: 'Final Positivo',
        badgeColor: 'emerald',
        narrativeResult: 'Sua intervenção tática e segura protegeu um colega mais vulnerável e acabou com a intimidação sem colocar você em risco.',
        whatHappened: 'Você agiu com inteligência: não tentou o confronto físico em desvantagem e acionou socorro imediato.',
        whyChoicesLedHere: 'Ser uma testemunha ativa não significa bancar o herói solitário, mas sim saber como e onde buscar proteção efetiva.',
        saferBehaviorAdvice: 'Quando houver superioridade numérica ou risco físico, chame imediatamente a equipe escolar.',
        coreLearning: 'O fim do bullying depende da coragem ética de quem assiste. Quando as testemunhas agem com segurança, o ambiente escolar se transforma.',
        metrics: { decision: 100, empathy: 100, safety: 100 }
      },
      'outcome-10-aprendizado': {
        id: 'outcome-10-aprendizado',
        type: 'aprendizado',
        title: 'Estratégias de Desvio em Situações de Risco',
        badgeLabel: 'Final de Aprendizado',
        badgeColor: 'amber',
        narrativeResult: 'A simulação demonstrou como a agilidade de raciocínio pode desarmar emboscadas com segurança.',
        whatHappened: 'A rápida menção à chegada de adultos dispersou os agressores.',
        whyChoicesLedHere: 'Agressores fogem da visibilidade e da autoridade escolar.',
        saferBehaviorAdvice: 'Sempre formalize o ocorrido com a escola após o susto inicial para evitar reincidência.',
        coreLearning: 'A inteligência e a busca por apoio institucional são as armas mais poderosas contra a intimidação.',
        metrics: { decision: 85, empathy: 85, safety: 85 }
      },
      'outcome-10-alerta': {
        id: 'outcome-10-alerta',
        type: 'alerta',
        title: 'O Custo Humano da Omissão',
        badgeLabel: 'Final de Alerta',
        badgeColor: 'rose',
        narrativeResult: 'A passividade da testemunha permitiu que a extorsão e o medo continuassem aterrorizando um estudante indefeso.',
        whatHappened: 'O silêncio reforçou o poder dos agressores na escola.',
        whyChoicesLedHere: 'Quem se cala diante de uma injustiça evidente permite que ela se repita amanhã com outras pessoas.',
        saferBehaviorAdvice: 'O Sentinela Escolar existe para que você possa denunciar qualquer coerção de forma 100% anônima e segura.',
        coreLearning: 'Para que o mal prospere, basta que as pessoas de bem não façam nada. Faça a sua parte.',
        metrics: { decision: 20, empathy: 10, safety: 30 }
      }
    }
  }
];

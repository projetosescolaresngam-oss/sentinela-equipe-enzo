import { BullyingTypeInfo, QuizQuestion } from './types';

export const BULLYING_TYPES_INFO: BullyingTypeInfo[] = [
  {
    id: 'verbal',
    name: 'Bullying Verbal',
    iconName: 'MessageSquareWarning',
    color: 'amber',
    shortDesc: 'Insultos, apelidos pejorativos, zombarias repetitivas e humilhações públicas.',
    fullDesc: 'Manifesta-se através do uso intencional e repetitivo da palavra falada para rebaixar, humilhar, ridicularizar a aparência, sotaque, origem, crença ou características de uma pessoa.',
    examples: [
      'Colocar apelidos constrangedores que o colega pediu para parar',
      'Fazer piadas depreciativas sobre características físicas ou roupas',
      'Provocações constantes para fazer a pessoa perder a paciência na sala',
      'Xingamentos e ofensas direcionadas nos corredores'
    ],
    signs: [
      'Tristeza repentina após o término das aulas',
      'Vontade de não ir para a escola sem motivo aparente',
      'Baixa autoestima e isolamento durante os intervalos'
    ],
    howToReactVictim: [
      'Não responda com agressão: mantenha a calma e afaste-se com postura confiante.',
      'Diga com firmeza: "Isso não tem graça e eu quero que pare agora".',
      'Não guarde para você: conte imediatamente para um professor, coordenador ou seus responsáveis.',
      'Use o formulário anônimo desta plataforma para registrar os fatos.'
    ],
    howToReactWitness: [
      'Não ria nem apoie a zombaria; seu silêncio pode encorajar o agressor.',
      'Chame o colega para perto de você e ofereça acolhimento.',
      'Avise a coordenação ou registre uma denúncia anônima como testemunha.'
    ],
    legalReference: 'Lei Federal 13.185/2015 - Art. 2º, Inciso I (Intimidação Verbal)'
  },
  {
    id: 'cyberbullying',
    name: 'Cyberbullying (Digital)',
    iconName: 'Smartphone',
    color: 'indigo',
    shortDesc: 'Ataques virtuais, vazamento de prints, criação de memes ofensivos e exclusão em grupos.',
    fullDesc: 'Uso de redes sociais, WhatsApp, jogos online ou plataformas digitais para espalhar mentiras, ameaças, expor fotos/conversas privadas ou hostilizar uma pessoa 24 horas por dia.',
    examples: [
      'Criar perfis falsos ou páginas de "fofoca da escola" para difamar alunos',
      'Vazar fotos íntimas ou conversas particulares sem autorização',
      'Espalhar figurinhas (stickers) e memes ofensivos em grupos de turma',
      'Excluir propositalmente colegas de trabalhos em grupo e canais da turma'
    ],
    signs: [
      'Ansiedade ou nervosismo excessivo ao receber notificações no celular',
      'Desativar repentinamente contas em redes sociais',
      'Queda abrupta no rendimento escolar e insônia'
    ],
    howToReactVictim: [
      'Guarde todas as provas: tire prints de tela com datas, horários e números/perfis.',
      'Não responda nem alimente discussões nos chats ou redes.',
      'Bloqueie o agressor e denuncie o perfil na própria plataforma e na escola.',
      'Procure a delegacia de crimes cibernéticos acompanhado de um responsável caso haja ameaça grave.'
    ],
    howToReactWitness: [
      'Não compartilhe nem reencaminhe prints, vídeos ou figurinhas difamatórias.',
      'Comente pedindo respeito ou denuncie o conteúdo aos administradores do grupo.',
      'Apoie a vítima e ajude-a a guardar os registros para a escola agir.'
    ],
    legalReference: 'Lei 14.811/2024 (Art. 146-A do Código Penal - Intimidação Sistemática Virtual)'
  },
  {
    id: 'fisico',
    name: 'Bullying Físico',
    iconName: 'ShieldAlert',
    color: 'rose',
    shortDesc: 'Agressões, empurrões, socos, tropeções intencionais e restrição da liberdade.',
    fullDesc: 'Qualquer contato físico indesejado, violento ou intimidador com o objetivo de causar dor física, medo ou submissão à vítima no ambiente escolar ou no trajeto.',
    examples: [
      'Empurrões propositais nas escadas ou corredores',
      'Tropeções forçados, socos ou tapas "disfarçados de brincadeira"',
      'Cercar o aluno impedindo sua passagem até que ele faça algo humilhante',
      'Puxões de cabelo ou beliscões constantes'
    ],
    signs: [
      'Roupas rasgadas, manchas ou marcas roxas no corpo sem explicação clara',
      'Caminhos alternativos ou medo evidente nos horários de entrada e saída',
      'Queixas frequentes de dor de cabeça ou mal-estar antes de sair de casa'
    ],
    howToReactVictim: [
      'Sua segurança física é prioridade: procure imediatamente um local com adultos e câmeras.',
      'Grite por ajuda caso esteja sendo cercado ou agredido.',
      'Relate o fato no mesmo dia à equipe gestora e aos seus responsáveis.',
      'Lembre-se: autodefesa e busca por socorro são direitos seus, a culpa NUNCA é sua.'
    ],
    howToReactWitness: [
      'Se houver perigo físico iminente, busque o inspetor ou professor mais próximo imediatamente.',
      'Não filme nem incentive brigas; sua intervenção rápida pode salvar um colega.',
      'Preste depoimento à direção para proteger quem foi agredido.'
    ],
    legalReference: 'Lei Federal 13.185/2015 - Art. 2º, Inciso II (Intimidação Física)'
  },
  {
    id: 'psicologico',
    name: 'Bullying Psicológico e Moral',
    iconName: 'Brain',
    color: 'purple',
    shortDesc: 'Ameaças veladas, chantagens, terror emocional, calúnias e fofocas deliberadas.',
    fullDesc: 'Práticas sutis ou explícitas que visam desestabilizar emocionalmente a vítima, destruindo sua autoconfiança, reputação ou gerando medo constante de punição/represália.',
    examples: [
      'Dizer que "algo ruim vai acontecer" se a vítima contar a alguém',
      'Inventar boatos graves sobre a conduta ou família do colega',
      'Chantagens exigindo lanches, dinheiro ou resolução de tarefas escolares',
      'Perseguição com olhares ameaçadores e risinhos combinados'
    ],
    signs: [
      'Crises de choro, pânico ou ansiedade antes de ir à escola',
      'Constante sensação de vigilância e desconfiança de todos',
      'Perda de apetite ou dificuldades de concentração'
    ],
    howToReactVictim: [
      'Entenda que o agressor usa o medo para te silenciar; quebrar o silêncio é sua maior força.',
      'Anote datas, locais e nomes das testemunhas para dar solidez ao relato.',
      'Converse com a orientação psicopedagógica para criar um plano de acolhimento seguro.',
      'Busque apoio emocional imediato no chat desta plataforma ou pelo CVV 188.'
    ],
    howToReactWitness: [
      'Acolha o colega e mostre que ele não está sozinho ou desamparado.',
      'Desminta boatos quando escutá-los: "Isso é fofoca e prejudica as pessoas".',
      'Envie um informe confidencial pelo Sentinela Escolar.'
    ],
    legalReference: 'Lei Federal 13.185/2015 - Art. 2º, Incisos III e IV (Intimidação Moral e Psicológica)'
  },
  {
    id: 'social',
    name: 'Bullying Social e Relacional',
    iconName: 'Users',
    color: 'blue',
    shortDesc: 'Exclusão deliberada, isolamento forçado, combinar de não falar com a pessoa.',
    fullDesc: 'Ações orquestradas por um grupo para isolar socialmente a vítima, fazendo com que ninguém converse, sente perto ou realize atividades com ela no colégio.',
    examples: [
      'Fazer combinações em grupo para ninguém sentar ao lado do aluno',
      'Proibir os outros de brincar ou conversar com determinado estudante',
      'Sair da mesa do refeitório assim que a pessoa se aproxima',
      'Não escolher o colega para nenhuma equipe propositadamente'
    ],
    signs: [
      'Passar todos os intervalos sozinho nos cantos ou no banheiro',
      'Expressar sentimento de que "ninguém gosta de mim na escola"',
      'Apatia generalizada e recusa em participar de eventos da turma'
    ],
    howToReactVictim: [
      'Procure grupos com interesses em comum fora do ciclo dos agressores (grêmio, teatro, esportes).',
      'Comunique o professor para que a formação de grupos seja mediada pedagogicamente.',
      'Fortaleça seus laços com amigos leais e familiares.',
      'Utilize o canal seguro do Sentinela para relatar a dinâmica de isolamento.'
    ],
    howToReactWitness: [
      'Seja a pessoa que quebra o ciclo: convide o colega isolado para o seu grupo.',
      'Recuse-se a participar de pactos de silêncio ou exclusão.',
      'Um simples "Oi, quer sentar aqui?" pode mudar o dia de alguém.'
    ],
    legalReference: 'Lei Federal 13.185/2015 - Art. 2º, Inciso V (Intimidação Social)'
  },
  {
    id: 'material',
    name: 'Bullying Material / Patrimonial',
    iconName: 'PackageX',
    color: 'emerald',
    shortDesc: 'Furto, sumiço proposital, destruição ou sujeira em cadernos, mochilas e materiais.',
    fullDesc: 'Danos intencionais, ocultação ou apropriação indevida dos pertences do estudante para gerar prejuízo financeiro, humilhação ou desespero.',
    examples: [
      'Esconder a mochila ou estojo do colega no lixo ou vaso sanitário',
      'Rasgar folhas de cadernos ou quebrar lápis e réguas de propósito',
      'Derrubar água ou comida intencionalmente sobre os materiais do outro',
      'Exigir dinheiro ou pertences sob ameaça de agressão'
    ],
    signs: [
      'Materiais escolares frequentemente estragados ou perdidos',
      'Pedidos repentinos de reposição de itens e dinheiro aos pais',
      'Medo de deixar a mochila na sala durante a troca de aulas'
    ],
    howToReactVictim: [
      'Fotografe ou registre o estado dos materiais danificados.',
      'Comunique o professor da aula e o coordenador de disciplina no ato.',
      'Evite levar itens de alto valor para a escola enquanto a situação for apurada.'
    ],
    howToReactWitness: [
      'Se vir alguém mexendo na mochila de outro, avise imediatamente um inspetor.',
      'Ajude o colega a recolher e preservar os pertences danificados como prova.'
    ],
    legalReference: 'Lei Federal 13.185/2015 - Art. 2º, Inciso VI (Intimidação Material)'
  },
  {
    id: 'sexual',
    name: 'Assédio e Bullying Sexual',
    iconName: 'HeartHandshake',
    color: 'pink',
    shortDesc: 'Comentários invasivos sobre o corpo, toques indesejados e piadas com teor sexual.',
    fullDesc: 'Qualquer comportamento verbal, não-verbal ou físico de natureza sexual não consensual, piadas desrespeitosas sobre o corpo ou orientação, e toques invasivos.',
    examples: [
      'Fazer comentários desrespeitosos sobre o corpo ou desenvolvimento físico do colega',
      'Puxar roupas íntimas ou tentar levantar saias/roupas sem autorização',
      'Espalhar boatos sobre a vida íntima de alguém',
      'Chantagem para envio de fotos íntimas ou favores sexuais'
    ],
    signs: [
      'Medo intenso e aversão a determinados locais ou pessoas na escola',
      'Uso de roupas excessivamente largas para disfarçar o corpo por insegurança',
      'Mudança brusca de comportamento e isolamento total'
    ],
    howToReactVictim: [
      'Você tem direito ao respeito total ao seu corpo. Diga alto e claro: "NÃO toque em mim".',
      'Conte imediatamente a uma pessoa de confiança na escola ou aos seus pais.',
      'Este tipo de situação é crime grave: a escola tomará providências protetivas imediatas.',
      'Em casos urgentes, disque 100 (Direitos Humanos) ou acione o Conselho Tutelar.'
    ],
    howToReactWitness: [
      'Intervenha imediatamente se for seguro ou chame um adulto com urgência.',
      'Nunca normalize piadas ou toques invasivos como "brincadeira de idade".',
      'Dê apoio integral à pessoa afetada.'
    ],
    legalReference: 'Estatuto da Criança e do Adolescente (Lei 8.069/90) e Lei 14.811/2024'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Com que frequência você ou alguém próximo tem sido alvo de apelidos ofensivos ou zombarias na escola?',
    options: [
      { text: 'Nunca ou muito raramente em situações pontuais resolvidas', points: 0 },
      { text: 'Já aconteceu 1 ou 2 vezes esporadicamente', points: 1, category: 'verbal' },
      { text: 'Acontece semanalmente por parte dos mesmos colegas', points: 3, category: 'verbal' },
      { text: 'Acontece todos os dias e me sinto acuado(a)', points: 5, category: 'verbal' }
    ]
  },
  {
    id: 2,
    question: 'Você já notou pessoas cochichando, rindo ou combinando para excluir você ou outro estudante de conversas e grupos?',
    options: [
      { text: 'Não, o ambiente de turma costuma ser acolhedor', points: 0 },
      { text: 'Já me senti deixado(a) de lado em algum trabalho', points: 1, category: 'social' },
      { text: 'Sim, há um isolamento combinado e ninguém senta por perto', points: 3, category: 'social' },
      { text: 'Sim, e criaram grupos em redes sociais exclusivamente para difamação', points: 5, category: 'cyberbullying' }
    ]
  },
  {
    id: 3,
    question: 'Já ocorreram ameaças veladas, chantagens ou medo de agressão física nos corredores, pátio ou saída?',
    options: [
      { text: 'Não, me sinto fisicamente seguro(a) na escola', points: 0 },
      { text: 'Houve discussões acaloradas normais sem ameaça posterior', points: 1 },
      { text: 'Já recebi avisos de que "iria apanhar" ou para entregar pertences', points: 3, category: 'psicologico' },
      { text: 'Já sofri empurrões, chutes ou fui cercado(a) por um grupo', points: 5, category: 'fisico' }
    ]
  },
  {
    id: 4,
    question: 'Como você se sente nos dias em que precisa ir para o colégio?',
    options: [
      { text: 'Tranquilo(a) e motivado(a) para encontrar meus amigos', points: 0 },
      { text: 'Às vezes com preguiça normal de acordar cedo', points: 0 },
      { text: 'Frequentemente angustiado(a) e com dor de barriga/cabeça', points: 3, category: 'psicologico' },
      { text: 'Com pânico constante e vontade desesperada de não ir', points: 5, category: 'psicologico' }
    ]
  }
];

export const CRISIS_CONTACTS = [
  {
    title: 'CVV - Centro de Valorização da Vida',
    phone: '188',
    desc: 'Apoio emocional gratuito e prevenção do suicídio. 24h por dia, sigiloso.',
    badge: 'Ligação Gratuita 24h',
    color: 'emerald'
  },
  {
    title: 'Disque 100 - Direitos Humanos & Infância',
    phone: '100',
    desc: 'Denúncias e proteção a crianças e adolescentes vítimas de violência.',
    badge: 'Nacional Oficial',
    color: 'blue'
  },
  {
    title: 'Polícia Militar (Emergência Imediata)',
    phone: '190',
    desc: 'Para situações de perigo físico iminente ou agressão armada.',
    badge: 'Emergência 190',
    color: 'rose'
  },
  {
    title: 'Orientação Educacional da Escola',
    phone: 'Ramal 204',
    desc: 'Equipe psicopedagógica de plantão no bloco administrativo.',
    badge: 'Plantão Escolar',
    color: 'indigo'
  }
];

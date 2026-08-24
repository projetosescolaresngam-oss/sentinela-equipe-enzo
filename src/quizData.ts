import { EducationalQuiz } from './types';

export const EDUCATIONAL_QUIZZES: EducationalQuiz[] = [
  {
    id: 'quiz-bullying-fundamentos',
    title: 'Quiz Anti-Bullying: Fundamentos e Prevenção',
    description: 'Teste seus conhecimentos sobre o que caracteriza o bullying, a diferença para conflitos comuns e como prevenir a intimidação sistemática.',
    questionCount: 5,
    difficulty: 'Iniciante',
    category: 'geral',
    iconType: 'shield',
    questions: [
      {
        id: 'fund-q1',
        question: 'O que caracteriza essencialmente uma situação de bullying escolar?',
        conceptTag: 'Definição de Bullying',
        options: [
          {
            id: 'A',
            text: 'Um desentendimento pontual onde as duas partes expressam suas opiniões livremente.',
            isCorrect: false,
            explanation: 'Essa alternativa não é a mais correta. Desentendimentos pontuais são conflitos comuns e não configuram bullying, que exige repetição e assimetria de poder.'
          },
          {
            id: 'B',
            text: 'Atos repetitivos de intimidação, humilhação ou violência intencional com desequilíbrio de poder.',
            isCorrect: true,
            explanation: 'Resposta correta! O bullying é definido pela intencionalidade, repetitividade e pela vulnerabilidade ou desequilíbrio de força entre agressor e vítima.'
          },
          {
            id: 'C',
            text: 'Uma discordância passageira sobre regras de um jogo no recreio.',
            isCorrect: false,
            explanation: 'Essa alternativa descreve um conflito natural do convívio diário, e não uma intimidação sistemática prolongada.'
          },
          {
            id: 'D',
            text: 'Qualquer brincadeira divertida onde todos os participantes dão risada juntos.',
            isCorrect: false,
            explanation: 'Quando todos se divertem sem constrangimento, trata-se de uma brincadeira saudável. No bullying, uma pessoa sofre enquanto outra obtém poder.'
          }
        ]
      },
      {
        id: 'fund-q2',
        question: 'Qual destas formas corresponde ao chamado "bullying social ou relacional"?',
        conceptTag: 'Tipos de Bullying',
        options: [
          {
            id: 'A',
            text: 'Isolar deliberadamente um colega, incentivando o grupo a excluí-lo e ignorá-lo.',
            isCorrect: true,
            explanation: 'Resposta correta! O bullying social ocorre através da exclusão premeditada, isolamento forçado e disseminação de fofocas para afastar a vítima de seus pares.'
          },
          {
            id: 'B',
            text: 'Danificar fisicamente o estojo ou caderno de outra pessoa.',
            isCorrect: false,
            explanation: 'Danificar ou esconder pertences caracteriza o bullying material, enquanto o social envolve relações grupais.'
          },
          {
            id: 'C',
            text: 'Chamar um colega para sentar junto na hora do almoço.',
            isCorrect: false,
            explanation: 'Essa é uma atitude exemplar de empatia e acolhimento escolar.'
          },
          {
            id: 'D',
            text: 'Enviar mensagens desrespeitosas em redes sociais.',
            isCorrect: false,
            explanation: 'Ataques por meios digitais caracterizam cyberbullying.'
          }
        ]
      },
      {
        id: 'fund-q3',
        question: 'Por que o apelido pejorativo que causa desconforto NÃO deve ser considerado "apenas uma brincadeira"?',
        conceptTag: 'Impacto Psicológico',
        options: [
          {
            id: 'A',
            text: 'Porque se a pessoa que recebe o apelido se sente ofendida e constrangida, há desrespeito à sua dignidade.',
            isCorrect: true,
            explanation: 'Resposta correta! Em um ambiente saudável, o limite da brincadeira é o bem-estar do outro. Se causa vergonha e sofrimento repetido, trata-se de agressão verbal.'
          },
          {
            id: 'B',
            text: 'Porque ninguém na escola pode ter qualquer tipo de apelido afetuoso.',
            isCorrect: false,
            explanation: 'Apelidos carinhosos aceitos mutuamente são normais. O problema são rótulos ofensivos impostos contra a vontade da pessoa.'
          },
          {
            id: 'C',
            text: 'Porque apelidos só são proibidos se forem falados dentro da sala de aula.',
            isCorrect: false,
            explanation: 'O respeito deve existir em todos os espaços: sala, pátio, corredores, transporte e internet.'
          },
          {
            id: 'D',
            text: 'Porque a vítima deve aprender a devolver com outro apelido pior.',
            isCorrect: false,
            explanation: 'Revidar com ofensas não resolve a situação e pode aumentar o ciclo de hostilidade.'
          }
        ]
      },
      {
        id: 'fund-q4',
        question: 'Qual é a principal atitude que uma pessoa vítima de intimidação sistemática deve tomar?',
        conceptTag: 'Busca de Ajuda',
        options: [
          {
            id: 'A',
            text: 'Guardar segredo por vergonha e esperar que os agressores cansem com o tempo.',
            isCorrect: false,
            explanation: 'O silêncio infelizmente costuma fortalecer o agressor. A vítima não tem culpa e merece acolhimento imediato.'
          },
          {
            id: 'B',
            text: 'Romper o silêncio e relatar a situação a um adulto de confiança ou pelo canal anônimo da escola.',
            isCorrect: true,
            explanation: 'Resposta correta! Comunicar orientadores, pais, professores ou usar o canal confidencial é o passo mais seguro para interromper a violência.'
          },
          {
            id: 'C',
            text: 'Faltar às aulas todos os dias sem avisar a coordenação.',
            isCorrect: false,
            explanation: 'O isolamento prejudica a vida acadêmica e emocional da vítima. A escola deve intervir para garantir sua permanência segura.'
          },
          {
            id: 'D',
            text: 'Marcar um confronto físico fora dos portões da escola.',
            isCorrect: false,
            explanation: 'Confrontos físicos geram riscos graves à integridade física e agravam o problema.'
          }
        ]
      },
      {
        id: 'fund-q5',
        question: 'Qual é o papel da comunidade escolar na prevenção do bullying?',
        conceptTag: 'Cultura de Paz',
        options: [
          {
            id: 'A',
            text: 'Fingir que não vê até que alguém se machuque gravemente.',
            isCorrect: false,
            explanation: 'A omissão permite que as agressões aumentem. A intervenção precoce é fundamental.'
          },
          {
            id: 'B',
            text: 'Criar um ambiente de diálogo, escuta atenta, respeito às diferenças e canais seguros de acolhimento.',
            isCorrect: true,
            explanation: 'Resposta correta! Uma escola segura constrói protocolos claros de proteção, estimula a empatia e assegura que ninguém fique desamparado.'
          },
          {
            id: 'C',
            text: 'Punir apenas com agressividade sem investigar as causas da convivência.',
            isCorrect: false,
            explanation: 'Ações pedagógicas, mediação e responsabilização educativa são mais eficazes para transformar o clima escolar.'
          },
          {
            id: 'D',
            text: 'Transferir toda a responsabilidade exclusivamente para os alunos resolverem sozinhos.',
            isCorrect: false,
            explanation: 'Direção, corpo docente, famílias e estudantes devem atuar juntos como uma rede integrada de proteção.'
          }
        ]
      }
    ]
  },
  {
    id: 'quiz-cyberbullying-digital',
    title: 'Quiz Cyberbullying: Convivência e Segurança Digital',
    description: 'Aprenda a reconhecer a violência no ambiente virtual, proteger sua privacidade e utilizar as redes com responsabilidade ética.',
    questionCount: 5,
    difficulty: 'Intermediário',
    category: 'cyberbullying',
    iconType: 'smartphone',
    questions: [
      {
        id: 'cyber-q1',
        question: 'Qual das seguintes situações representa um caso claro de cyberbullying?',
        conceptTag: 'Definição de Cyberbullying',
        options: [
          {
            id: 'A',
            text: 'Criar um grupo ou página para divulgar montagens, figurinhas vexatórias e difamações sobre um colega.',
            isCorrect: true,
            explanation: 'Resposta correta! O cyberbullying utiliza mídias digitais para humilhar, expor, ameaçar ou constranger pessoas de forma sistemática.'
          },
          {
            id: 'B',
            text: 'Enviar mensagens no grupo da turma para tirar dúvidas sobre o trabalho de matemática.',
            isCorrect: false,
            explanation: 'Isso é uma interação colaborativa e saudável entre estudantes.'
          },
          {
            id: 'C',
            text: 'Configurar a privacidade do próprio perfil para que apenas amigos próximos vejam as fotos.',
            isCorrect: false,
            explanation: 'Configurar a privacidade é uma prática recomendada de segurança cibernética pessoal.'
          },
          {
            id: 'D',
            text: 'Curtir a foto de um projeto de ciências publicado na página oficial da escola.',
            isCorrect: false,
            explanation: 'Essa atitude é um apoio positivo aos projetos dos colegas.'
          }
        ]
      },
      {
        id: 'cyber-q2',
        question: 'Ao receber uma foto ou vídeo íntimo/humilhante de um colega em um grupo, qual é a atitude correta e ética?',
        conceptTag: 'Quebra de Cadeia de Compartilhamento',
        options: [
          {
            id: 'A',
            text: 'Repassar para outros grupos e amigos para que todos fiquem sabendo.',
            isCorrect: false,
            explanation: 'Repassar conteúdos ofensivos multiplica o dano emocional da vítima e configura cumplicidade no crime cibernético.'
          },
          {
            id: 'B',
            text: 'Não repassar, não curtir, alertar que o ato é criminoso e avisar a coordenação escolar ou adultos de confiança.',
            isCorrect: true,
            explanation: 'Resposta correta! Interromper o compartilhamento e comunicar autoridades escolares quebra o ciclo de humilhação e protege a vítima.'
          },
          {
            id: 'C',
            text: 'Comentar com emojis de risada para se enturmar com quem postou.',
            isCorrect: false,
            explanation: 'Rir de publicações ofensivas valida a agressão e incentiva os praticantes a continuarem.'
          },
          {
            id: 'D',
            text: 'Salvar a imagem para usar como chantagem no futuro.',
            isCorrect: false,
            explanation: 'Chantagem e armazenamento de conteúdo íntimo de menores constituem infrações graves previstas na legislação.'
          }
        ]
      },
      {
        id: 'cyber-q3',
        question: 'Por que o uso de perfis anônimos ou "fakes" na internet NÃO garante impunidade?',
        conceptTag: 'Rastro Digital e Lei',
        options: [
          {
            id: 'A',
            text: 'Porque todas as atividades digitais deixam registros de IP, data, hora e metadados que podem ser rastreados judicialmente.',
            isCorrect: true,
            explanation: 'Resposta correta! A internet não é anônima para a perícia policial. Provedores e redes sociais guardam registros de conexão e entregam dados mediante ordem judicial.'
          },
          {
            id: 'B',
            text: 'Porque redes sociais apagam todas as mensagens automaticamente após 24 horas.',
            isCorrect: false,
            explanation: 'Mesmo conteúdos temporários deixam logs técnicos em servidores e podem ser preservados via ata notarial ou capturas.'
          },
          {
            id: 'C',
            text: 'Porque perfis falsos são proibidos de se conectar ao Wi-Fi escolar.',
            isCorrect: false,
            explanation: 'O rastreamento vai muito além da rede local da escola, abrangendo operadoras de telefonia e servidores globais.'
          },
          {
            id: 'D',
            text: 'Porque a legislação brasileira só responsabiliza quem usa seu nome real na internet.',
            isCorrect: false,
            explanation: 'A Lei nº 14.811/2024 pune expressamente o cyberbullying cometido sob qualquer disfarce virtual.'
          }
        ]
      },
      {
        id: 'cyber-q4',
        question: 'Se você estiver sofrendo cyberbullying, qual é o primeiro passo para guardar evidências seguras?',
        conceptTag: 'Preservação de Provas',
        options: [
          {
            id: 'A',
            text: 'Apagar tudo imediatamente sem salvar e fingir que nada aconteceu.',
            isCorrect: false,
            explanation: 'Apagar as mensagens sem registrar pode dificultar a comprovação do ocorrido para a coordenação ou autoridades.'
          },
          {
            id: 'B',
            text: 'Tirar prints com data, hora, links das postagens, perfis dos agressores e buscar apoio de um adulto.',
            isCorrect: true,
            explanation: 'Resposta correta! Salvar capturas de tela com cabeçalhos completos, links e números de telefone é essencial para demonstrar a conduta e acionar medidas protetivas.'
          },
          {
            id: 'C',
            text: 'Xingar os familiares do agressor na mesma rede social.',
            isCorrect: false,
            explanation: 'Revidar digitalmente pode gerar confusão de responsabilidades e piorar a exposição.'
          },
          {
            id: 'D',
            text: 'Excluir sua própria conta e se isolar totalmente de qualquer amigo.',
            isCorrect: false,
            explanation: 'Você não deve perder seus laços saudáveis por causa da conduta errada de terceiros. Busque ajuda e bloqueie os agressores.'
          }
        ]
      },
      {
        id: 'cyber-q5',
        question: 'O que diz o Código Penal Brasileiro (Art. 146-A, Parágrafo Único) sobre o cyberbullying?',
        conceptTag: 'Legislação e Penalidades',
        options: [
          {
            id: 'A',
            text: 'Considera crime com pena de reclusão de 2 a 4 anos e multa quando cometido em redes sociais ou ambiente virtual.',
            isCorrect: true,
            explanation: 'Resposta correta! A Lei 14.811/2024 incluiu expressamente o crime de intimidação sistemática virtual no Código Penal com penas rigorosas.'
          },
          {
            id: 'B',
            text: 'Considera que ofensas na internet são apenas mal-entendidos sem consequência jurídica.',
            isCorrect: false,
            explanation: 'A lei brasileira agora trata crimes digitais com alta prioridade e rigor.'
          },
          {
            id: 'C',
            text: 'Prevê punição somente se a vítima tiver mais de 18 anos.',
            isCorrect: false,
            explanation: 'Pelo contrário, quando cometido contra crianças e adolescentes a proteção legal é ainda mais prioritária (ECA).'
          },
          {
            id: 'D',
            text: 'Permite que o agressor peça desculpas em privado para anular qualquer investigação.',
            isCorrect: false,
            explanation: 'Casos graves de difamação e assédio virtual geram responsabilidade cível (indenização) e criminal para os envolvidos.'
          }
        ]
      }
    ]
  },
  {
    id: 'quiz-testemunha-ativa',
    title: 'Quiz Testemunha Ativa: Como Ajudar com Segurança',
    description: 'Descubra como colegas que presenciam atos de intimidação podem transformar o clima escolar sem se colocar em risco.',
    questionCount: 5,
    difficulty: 'Iniciante',
    category: 'empatia',
    iconType: 'users',
    questions: [
      {
        id: 'test-q1',
        question: 'Qual é o papel das testemunhas (espectadores) em episódios de bullying?',
        conceptTag: 'Efeito Espectador',
        options: [
          {
            id: 'A',
            text: 'Apenas assistir em silêncio, pois não têm nenhuma relação com o que está acontecendo.',
            isCorrect: false,
            explanation: 'O silêncio da maioria muitas vezes é interpretado pelo agressor como aprovação ou permissão para continuar.'
          },
          {
            id: 'B',
            text: 'Têm papel decisivo: quando se posicionam de forma segura ou acolhem a vítima, reduzem drasticamente as agressões.',
            isCorrect: true,
            explanation: 'Resposta correta! Estudos comprovam que quando testemunhas acolhem a vítima e acionam a escola, mais de 50% dos casos são interrompidos.'
          },
          {
            id: 'C',
            text: 'Filmar para postar em páginas de fofoca da escola.',
            isCorrect: false,
            explanation: 'Filmar agressões para viralizar é uma atitude prejudicial que aumenta o sofrimento da pessoa agredida.'
          },
          {
            id: 'D',
            text: 'Aplaudir quem agride para não ser a próxima vítima.',
            isCorrect: false,
            explanation: 'Incentivar o agressor enfraquece o ambiente coletivo e torna a escola insegura para todos.'
          }
        ]
      },
      {
        id: 'test-q2',
        question: 'Qual destas é uma forma SEGURA e eficiente de ajudar alguém que você viu sofrer bullying no intervalo?',
        conceptTag: 'Acolhimento Prático',
        options: [
          {
            id: 'A',
            text: 'Aproximar-se da vítima após o ocorrido, oferecer companhia, ouvi-la com empatia e encorajá-la a buscar a coordenação.',
            isCorrect: true,
            explanation: 'Resposta correta! O acolhimento entre pares tira a vítima da sensação de isolamento e dá forças para que ela busque a mediação dos educadores.'
          },
          {
            id: 'B',
            text: 'Começar uma briga física contra o agressor no meio do pátio.',
            isCorrect: false,
            explanation: 'Confrontos físicos geram riscos à segurança de todos e desviam o foco da resolução ética.'
          },
          {
            id: 'C',
            text: 'Dizer à vítima que ela tem culpa por ser tímida ou diferente.',
            isCorrect: false,
            explanation: 'Nunca culpe a vítima. A responsabilidade da agressão é exclusivamente de quem pratica o bullying.'
          },
          {
            id: 'D',
            text: 'Divulgar o nome da vítima em todas as salas de aula.',
            isCorrect: false,
            explanation: 'A privacidade e a dignidade da vítima devem ser preservadas com discrição e respeito.'
          }
        ]
      },
      {
        id: 'test-q3',
        question: 'O que diferencia "dedurar/fofocar" de "relatar/denunciar para proteger alguém"?',
        conceptTag: 'Denúncia vs Fofoca',
        options: [
          {
            id: 'A',
            text: 'Fofoca busca prejudicar alguém por vaidade; relatar uma agressão busca cessar o sofrimento e proteger a integridade de alguém.',
            isCorrect: true,
            explanation: 'Resposta correta! Buscar ajuda para defender um colega de violências é um ato nobre de cidadania e solidariedade, não uma delação vazia.'
          },
          {
            id: 'B',
            text: 'Não há diferença alguma, qualquer aviso a professores é errado.',
            isCorrect: false,
            explanation: 'Essa crença errônea é usada por quem agride para manter as vítimas e testemunhas com medo.'
          },
          {
            id: 'C',
            text: 'Denunciar só é válido se a pessoa for da sua família.',
            isCorrect: false,
            explanation: 'Todos os membros da comunidade escolar merecem segurança e proteção mútua.'
          },
          {
            id: 'D',
            text: 'Relatar é permitido apenas para alunos que tiram notas altas.',
            isCorrect: false,
            explanation: 'A proteção à vida e aos direitos é universal para todos os estudantes.'
          }
        ]
      },
      {
        id: 'test-q4',
        question: 'Se um grupo começar a fazer piadas cruéis sobre a aparência de um colega, como você pode agir na hora?',
        conceptTag: 'Postura Ativa Desarmadora',
        options: [
          {
            id: 'A',
            text: 'Não rir, não validar o comentário e dizer com calma: "Essa piada não tem graça, vamos parar".',
            isCorrect: true,
            explanation: 'Resposta correta! Demonstrar desaprovação sem violência retira o palco do agressor e demonstra que a turma não apoia aquele comportamento.'
          },
          {
            id: 'B',
            text: 'Rir alto para que pensem que você é corajoso.',
            isCorrect: false,
            explanation: 'Rir alimenta o ciclo de humilhação e machuca profundamente quem é alvo da ofensa.'
          },
          {
            id: 'C',
            text: 'Jogar água no agressor para iniciar uma briga.',
            isCorrect: false,
            explanation: 'Atitudes agressivas pioram o clima e podem gerar suspensão disciplinar.'
          },
          {
            id: 'D',
            text: 'Incentivar que façam piadas com outras pessoas também.',
            isCorrect: false,
            explanation: 'Espalhar ofensas contamina ainda mais as relações da turma.'
          }
        ]
      },
      {
        id: 'test-q5',
        question: 'Como utilizar o canal anônimo Sentinela Escolar se você presenciar uma intimidação grave?',
        conceptTag: 'Uso do Canal Seguro',
        options: [
          {
            id: 'A',
            text: 'Acessar a aba "Fazer Denúncia", descrever os fatos com respeito e precisão, sem precisar se identificar.',
            isCorrect: true,
            explanation: 'Resposta correta! O canal anônimo permite informar local, turno e detalhes para que a coordenação atue preventivamente com total sigilo.'
          },
          {
            id: 'B',
            text: 'Fazer denúncias falsas para brincar com amigos.',
            isCorrect: false,
            explanation: 'Canais de proteção devem ser usados com responsabilidade para atender quem realmente precisa.'
          },
          {
            id: 'C',
            text: 'Colocar dados pessoais da vítima em redes públicas antes de avisar a escola.',
            isCorrect: false,
            explanation: 'A exposição pública gera danos secundários à vítima. Use sempre o canal institucional seguro.'
          },
          {
            id: 'D',
            text: 'Aguardar que a vítima faça tudo sozinha, mesmo estando muito assustada.',
            isCorrect: false,
            explanation: 'Testemunhas podem e devem ser a voz de apoio quando a vítima está paralisada pelo medo.'
          }
        ]
      }
    ]
  },
  {
    id: 'quiz-empatia-respeito',
    title: 'Quiz Empatia & Convivência Escolar Saudável',
    description: 'Avalie como pequenas atitudes de acolhimento, escuta e valorização das diferenças constroem uma escola onde todos se sentem bem.',
    questionCount: 5,
    difficulty: 'Intermediário',
    category: 'empatia',
    iconType: 'heart',
    questions: [
      {
        id: 'emp-q1',
        question: 'O que significa praticar a verdadeira EMPATIA no contexto escolar?',
        conceptTag: 'Conceito de Empatia',
        options: [
          {
            id: 'A',
            text: 'Esforçar-se para compreender os sentimentos e a perspectiva do colega, tratando-o com respeito e dignidade.',
            isCorrect: true,
            explanation: 'Resposta correta! Empatia é a capacidade de se colocar no lugar do outro, reconhecendo sua humanidade e acolhendo suas vulnerabilidades.'
          },
          {
            id: 'B',
            text: 'Concordar obrigatoriamente com todas as opiniões dos outros sem pensar.',
            isCorrect: false,
            explanation: 'Empatia não significa anular suas opiniões, mas sim respeitar a outra pessoa mesmo em momentos de divergência.'
          },
          {
            id: 'C',
            text: 'Sentir pena de alguém mas não fazer nada para incluir essa pessoa.',
            isCorrect: false,
            explanation: 'A empatia ativa vai além da pena: ela se traduz em atitudes práticas de acolhimento e inclusão.'
          },
          {
            id: 'D',
            text: 'Exigir que todos na turma se vistam e falem do mesmo jeito.',
            isCorrect: false,
            explanation: 'A diversidade enriquece o ambiente escolar; padronizar pessoas é o oposto do respeito às diferenças.'
          }
        ]
      },
      {
        id: 'emp-q2',
        question: 'Um aluno novo transferido de outra cidade senta sozinho e parece deslocado. Qual atitude demonstra empatia?',
        conceptTag: 'Inclusão de Novos Alunos',
        options: [
          {
            id: 'A',
            text: 'Convidadá-lo para sentar com seu grupo no intervalo e apresentar os espaços da escola.',
            isCorrect: true,
            explanation: 'Resposta correta! Pequenos gestos de boas-vindas reduzem a ansiedade de adaptação e previnem o isolamento social.'
          },
          {
            id: 'B',
            text: 'Fazer piada com o sotaque ou jeito de falar dele.',
            isCorrect: false,
            explanation: 'Zombar de peculiaridades regionais ou culturais é uma forma de preconceito e bullying verbal.'
          },
          {
            id: 'C',
            text: 'Esperar que ele procure todo mundo primeiro sem ninguém falar nada.',
            isCorrect: false,
            explanation: 'Dar o primeiro passo para acolher alguém novo demonstra maturidade e espírito comunitário.'
          },
          {
            id: 'D',
            text: 'Ignorar a existência dele porque seu grupo de amigos já está completo.',
            isCorrect: false,
            explanation: 'Formar "panelinhas" impenetráveis gera sentimentos de rejeição desnecessários.'
          }
        ]
      },
      {
        id: 'emp-q3',
        question: 'Quando surge uma divergência de opiniões em um trabalho em grupo, como resolver de forma saudável?',
        conceptTag: 'Comunicação Não-Violenta',
        options: [
          {
            id: 'A',
            text: 'Praticar a escuta atenta, expor seus argumentos com calma e buscar um consenso onde todos colaborem.',
            isCorrect: true,
            explanation: 'Resposta correta! A comunicação não-violenta e a cooperação constroem aprendizado sem ferir relacionamentos.'
          },
          {
            id: 'B',
            text: 'Gritar mais alto que os outros para impor sua ideia à força.',
            isCorrect: false,
            explanation: 'Agressividade gera bloqueio de comunicação e ressentimentos no grupo.'
          },
          {
            id: 'C',
            text: 'Abandonar o trabalho e falar mal dos colegas pelas costas.',
            isCorrect: false,
            explanation: 'Fofocas corroem a confiança mútua e não resolvem a tarefa acadêmica.'
          },
          {
            id: 'D',
            text: 'Excluir o nome do colega do trabalho sem avisar o professor.',
            isCorrect: false,
            explanation: 'Decisões sobre notas e participação devem ser mediadas pelo professor com transparência.'
          }
        ]
      },
      {
        id: 'emp-q4',
        question: 'Por que o respeito às diferenças étnicas, religiosas, físicas e socioeconômicas é fundamental na escola?',
        conceptTag: 'Diversidade e Direitos Humanos',
        options: [
          {
            id: 'A',
            text: 'Porque cada indivíduo é único e possui valor inalienável, e a convivência plural enriquece toda a sociedade.',
            isCorrect: true,
            explanation: 'Resposta correta! O respeito aos direitos humanos e à pluralidade cultural é a base de uma cidadania consciente e justa.'
          },
          {
            id: 'B',
            text: 'Apenas porque existe uma regra escrita no regulamento da escola.',
            isCorrect: false,
            explanation: 'O respeito vai além de obrigações formais: é um princípio ético fundamental para a convivência humana.'
          },
          {
            id: 'C',
            text: 'Porque todas as pessoas pensam exatamente da mesma forma.',
            isCorrect: false,
            explanation: 'A beleza da convivência está na troca de experiências entre pessoas com origens e vivências distintas.'
          },
          {
            id: 'D',
            text: 'Para evitar apenas que os pais sejam chamados na direção.',
            isCorrect: false,
            explanation: 'A motivação para o respeito deve vir da consideração sincera pelo próximo, e não do mero medo de castigo.'
          }
        ]
      },
      {
        id: 'emp-q5',
        question: 'O que fazer ao perceber que você mesmo teve uma atitude inadequada que magoou um colega?',
        conceptTag: 'Autorresponsabilidade e Reparação',
        options: [
          {
            id: 'A',
            text: 'Reconhecer o erro, pedir desculpas sinceras, perguntar como pode reparar a situação e mudar de comportamento.',
            isCorrect: true,
            explanation: 'Resposta correta! Ter a coragem de assumir falhas e pedir desculpas genuínas é uma das maiores demonstrações de maturidade e respeito.'
          },
          {
            id: 'B',
            text: 'Culpar o colega dizendo que ele é "sensível demais".',
            isCorrect: false,
            explanation: 'Desqualificar a dor alheia ("mimimi") agrava o sofrimento e impede seu próprio crescimento moral.'
          },
          {
            id: 'C',
            text: 'Fingir que nada aconteceu e nunca mais falar com a pessoa.',
            isCorrect: false,
            explanation: 'Ignorar o erro deixa feridas abertas no convívio diário.'
          },
          {
            id: 'D',
            text: 'Inventar mentiras para a turma acreditar que você tinha razão.',
            isCorrect: false,
            explanation: 'Manipular os fatos destrói sua credibilidade e agrava as injustiças.'
          }
        ]
      }
    ]
  },
  {
    id: 'quiz-direitos-legislacao',
    title: 'Quiz Direitos, Legislação e Proteção Escolar',
    description: 'Conheça o marco legal brasileiro de proteção à infância e juventude, os deveres das instituições de ensino e os canais públicos de socorro.',
    questionCount: 5,
    difficulty: 'Avançado',
    category: 'direitos',
    iconType: 'book',
    questions: [
      {
        id: 'dir-q1',
        question: 'Qual é o principal objetivo da Lei Federal nº 13.185/2015 no Brasil?',
        conceptTag: 'Marco Legal do Bullying',
        options: [
          {
            id: 'A',
            text: 'Instituir o Programa de Combate à Intimidação Sistemática (Bullying), promovendo conscientização, prevenção e diagnóstico.',
            isCorrect: true,
            explanation: 'Resposta correta! A Lei 13.185/2015 obriga escolas e clubes a manterem programas ativos de prevenção e enfrentamento ao bullying.'
          },
          {
            id: 'B',
            text: 'Autorizar que alunos resolvam conflitos por conta própria sem intervenção da escola.',
            isCorrect: false,
            explanation: 'A lei estabelece que a escola tem o dever legal explícito de intervir e manter ambiente seguro.'
          },
          {
            id: 'C',
            text: 'Proibir qualquer tipo de trabalho em grupo nas instituições de ensino.',
            isCorrect: false,
            explanation: 'A lei busca incentivar relações saudáveis e cooperação pedagógica, sem proibir dinâmicas coletivas.'
          },
          {
            id: 'D',
            text: 'Permitir castigos físicos públicos aos agressores.',
            isCorrect: false,
            explanation: 'A legislação brasileira veda expressamente castigos físicos (Lei Menino Bernardo) e foca em medidas socioeducativas.'
          }
        ]
      },
      {
        id: 'dir-q2',
        question: 'Segundo o Estatuto da Criança e do Adolescente (ECA), qual é o direito assegurado a todo estudante no ambiente escolar?',
        conceptTag: 'Estatuto da Criança e do Adolescente',
        options: [
          {
            id: 'A',
            text: 'Direito a ser respeitado por seus educadores e pares, em ambiente livre de qualquer forma de violência ou humilhação.',
            isCorrect: true,
            explanation: 'Resposta correta! O ECA (Lei 8.069/1990) garante a absoluta prioridade na proteção à integridade física, psicológica e moral de crianças e jovens.'
          },
          {
            id: 'B',
            text: 'Direito de fazer o que quiser sem seguir nenhum regimento escolar.',
            isCorrect: false,
            explanation: 'Direitos vêm acompanhados de deveres cívicos de respeito mútuo e preservação do espaço comum.'
          },
          {
            id: 'C',
            text: 'Direito de agredir quem discordar de seus gostos pessoais.',
            isCorrect: false,
            explanation: 'Nenhuma lei concede o direito de violar a dignidade alheia.'
          },
          {
            id: 'D',
            text: 'Direito de ter notas altas sem realizar nenhuma avaliação.',
            isCorrect: false,
            explanation: 'O ECA assegura acesso à educação de qualidade e respeito pedagógico, e não privilégios acadêmicos.'
          }
        ]
      },
      {
        id: 'dir-q3',
        question: 'Qual é o número de telefone do canal nacional gratuito para denúncias de violações de Direitos Humanos no Brasil?',
        conceptTag: 'Canais Oficiais de Proteção',
        options: [
          {
            id: 'A',
            text: 'Disque 100 (Disque Direitos Humanos).',
            isCorrect: true,
            explanation: 'Resposta correta! O Disque 100 funciona 24 horas por dia, 7 dias por semana, é gratuito, anônimo e atende casos de violência contra crianças e adolescentes.'
          },
          {
            id: 'B',
            text: 'Número 0800 do correio.',
            isCorrect: false,
            explanation: 'O canal oficial do Governo Federal para proteção de direitos é o Disque 100.'
          },
          {
            id: 'C',
            text: 'Disque 190 (Polícia Militar apenas para crimes em flagrante emergencial).',
            isCorrect: false,
            explanation: 'O 190 é para emergências policiais imediatas, enquanto o Disque 100 é o canal especializado em violações de Direitos Humanos.'
          },
          {
            id: 'D',
            text: 'Disque 192 (SAMU para urgências médicas).',
            isCorrect: false,
            explanation: 'O 192 é o serviço médico de emergência.'
          }
        ]
      },
      {
        id: 'dir-q4',
        question: 'O que o Centro de Valorização da Vida (CVV - Ligue 188) oferece a estudantes que estão em sofrimento emocional?',
        conceptTag: 'Apoio Emocional',
        options: [
          {
            id: 'A',
            text: 'Apoio emocional e prevenção do suicídio de forma gratuita, confidencial e sem julgamentos por telefone e chat.',
            isCorrect: true,
            explanation: 'Resposta correta! O CVV (188) é uma linha de apoio humanizado disponível 24h para quem precisa desabafar e ser acolhido com sigilo.'
          },
          {
            id: 'B',
            text: 'Consultoria para processos judiciais com advogados.',
            isCorrect: false,
            explanation: 'O CVV é um serviço voltado para a escuta acolhedora e suporte emocional voluntário.'
          },
          {
            id: 'C',
            text: 'Aulas particulares de reforço escolar.',
            isCorrect: false,
            explanation: 'O foco do 188 é o bem-estar psicológico e a valorização da vida.'
          },
          {
            id: 'D',
            text: 'Venda de medicamentos calmantes.',
            isCorrect: false,
            explanation: 'O CVV não comercializa produtos nem prescreve medicamentos; atua exclusivamente com escuta fraterna.'
          }
        ]
      },
      {
        id: 'dir-q5',
        question: 'Qual é a obrigação legal dos pais e responsáveis em relação a atos de cyberbullying cometidos por menores sob sua guarda?',
        conceptTag: 'Responsabilidade Civil e Parental',
        options: [
          {
            id: 'A',
            text: 'Podem responder civilmente na Justiça por danos morais e materiais causados pelos filhos, além de orientá-los eticamente.',
            isCorrect: true,
            explanation: 'Resposta correta! O Código Civil Brasileiro estabelece que pais são responsáveis pela reparação de danos causados por filhos menores de idade sob sua autoridade.'
          },
          {
            id: 'B',
            text: 'Não possuem nenhuma responsabilidade porque a internet é livre.',
            isCorrect: false,
            explanation: 'A responsabilidade parental sobre o uso consciente da tecnologia é dever legal e moral da família.'
          },
          {
            id: 'C',
            text: 'Apenas a escola responde por tudo o que o aluno faz em casa pelo celular.',
            isCorrect: false,
            explanation: 'A responsabilidade pelo comportamento digital fora do horário escolar recai diretamente sobre os responsáveis legais.'
          },
          {
            id: 'D',
            text: 'Basta desligar a internet por uma hora para anular qualquer dever de indenização.',
            isCorrect: false,
            explanation: 'Acontecimentos ilícitos na internet geram deveres legais de reparação e acompanhamento socioeducativo.'
          }
        ]
      }
    ]
  }
];

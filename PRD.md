# Documento de Requisitos de Produto (PRD)
## Projeto: Sentinela Escolar - Plataforma Anti-Bullying e Apoio Integral

### 1. Visão Geral e Propósito
O **Sentinela Escolar** é uma plataforma institucional e comunitária voltada à prevenção, identificação, acolhimento e combate sistemático ao bullying e cyberbullying no ecossistema escolar. O sistema alia **sigilo e privacidade extrema** para os alunos com **inteligência estatística e administrativa** para a equipe gestora, em plena conformidade com a **Lei Federal nº 13.185/2015** (Programa de Combate à Intimidação Sistemática) e **Lei nº 14.811/2024**.

---

### 2. Personas e Casos de Uso

| Persona | Dores e Desafios | Necessidade no Sistema |
| :--- | :--- | :--- |
| **Estudante (Vítima/Testemunha)** | Medo de retaliação, vergonha, incerteza sobre se o ocorrido configura bullying, sensação de isolamento. | Anonimato absoluto, linguagem acolhedora, formulário simplificado com tipologias claras, canal para retorno do conselho sem revelar dados pessoais e apoio emocional imediato. |
| **Equipe Psicopedagógica / Orientadores** | Dificuldade em tomar conhecimento precoce de abusos, falta de canal seguro para orientar vítimas relutantes. | Acesso ordenado por nível de urgência, histórico categorizado e canal bidirecional anônimo por protocolo. |
| **Conselho Escolar & Direção** | Ausência de métricas confiáveis para tomada de decisão preventiva e exigência legal de relatórios institucionais. | Dashboard analítico com mapas de calor (locais/turnos), gráficos de frequência e relatórios consolidados exportáveis. |

---

### 3. Matriz Detalhada de Requisitos Funcionais (RF)

#### Módulo 1: Educação, Conscientização e Identificação
* **RF-01.1 - Guia Interativo de Tipos de Bullying:** Apresentação clara com cards interativos das 7 tipologias canônicas (Verbal, Moral, Físico, Psicológico, Social/Relacional, Material/Patrimonial e Cyberbullying).
* **RF-01.2 - Matriz de Como Reagir com Segurança:** Orientações práticas e psicologicamente validadas de como a vítima e a testemunha (espectador ativo) devem proceder.
* **RF-01.3 - Teste Rápido de Autoavaliação:** Questionário empático para ajudar o estudante a identificar se está vivenciando intimidação sistemática.

#### Módulo 2: Canal de Denúncia Anônima Criptografada
* **RF-02.1 - Formulário Sem Fricção:**
  * Seleção múltipla de tipologias de bullying.
  * Recorrência/Frequência temporal (1ª vez, 2 a 3 vezes, semanalmente, diariamente, há meses).
  * Local do incidente (Sala de Aula, Banheiro, Pátio/Recreio, Corredor, Redes Sociais/WhatsApp, Entrada/Saída, Transporte Escolar).
  * Turno (Manhã, Tarde, Noite, Integral, Online).
  * Papel do denunciante (Vítima, Testemunha, Responsável/Colega).
  * Nível de Urgência autodeclarado (Baixa, Média, Alta, Iminência de Violência Física).
  * Campo narrativo opcional com criptografia de ponta e orientações de segurança.
* **RF-02.2 - Geração de Protocolo Anônimo Criptográfico:** O sistema gera uma chave privada única (ex: `#SEC-2026-X89K`), permitindo que o aluno acompanhe o andamento sem nunca digitar e-mail, telefone ou nome.

#### Módulo 3: Canal Direto com o Conselho Escolar (Acompanhamento por Protocolo)
* **RF-03.1 - Consulta de Status:** O estudante insere o código do protocolo e visualiza: status da apuração (`Recebido`, `Em Análise Psicopedagógica`, `Ação Preventiva Iniciada`, `Concluído/Acolhido`).
* **RF-03.2 - Mensagens Confidenciais:** Troca de orientações entre o Conselho Escolar e o estudante por meio do protocolo, mantendo anonimato inviolável.

#### Módulo 4: Central de Acolhimento e Suporte Emocional (Chat em Tempo Real)
* **RF-04.1 - Assistente Empático de Descompressão:** Chat com respostas humanizadas, validação de sentimentos e técnicas guiadas de alívio de estresse e ansiedade (Técnica de Respiração 4-7-8 e Grounding 5-4-3-2-1).
* **RF-04.2 - Botão SOS & Discagem Rápida:** Atalhos de emergência para linhas oficiais gratuitas de proteção e apoio emocional (CVV 188, Disque 100 dos Direitos Humanos, 190).

#### Módulo 5: Painel Administrativo & Gestão Psicopedagógica
* **RF-05.1 - Autenticação Segura de Gestores:** Acesso restrito para equipe de mediação de conflitos e direção.
* **RF-05.2 - Visão Analítica em Tempo Real:**
  * Quantitativo total de denúncias e taxa de resolução.
  * Gráfico de ocorrência por tipo de bullying.
  * Gráfico de frequência temporal e zonas críticas (locais de maior risco na escola).
  * Indicadores de tendência mensal.
* **RF-05.3 - Feed de Alertas Críticos:** Notificações em destaque e sinalizadores visuais para casos com risco iminente.
* **RF-05.4 - Ações do Gestor:** Atualizar status, atribuir notas internas confidenciais e responder à vítima via protocolo.

#### Módulo 6: Relatórios Estatísticos e Conformidade Legal
* **RF-06.1 - Exportação de Relatórios Mensais:** Geração de balanço consolidado e anonimizado em formato imprimível / PDF / CSV para conselhos tutelares, reuniões pedagógicas e auditorias da Lei 13.185/2015.

---

### 4. Requisitos Não Funcionais (RNF)
* **RNF-01 - Privacidade Total (Zero-Knowledge Identity):** Nenhum dado identificador obrigatório (IP, nome, telefone) é armazenado atrelado à denúncia.
* **RNF-02 - Usabilidade Universal:** Interface clara, amigável para crianças do ensino fundamental até adolescentes e educadores, com alto contraste e acessibilidade.
* **RNF-03 - Performance:** Carregamento ultra-rápido, responsivo em smartphones, tablets e desktops.

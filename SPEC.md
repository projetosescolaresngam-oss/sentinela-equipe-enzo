# Especificação Técnica de Engenharia e Arquitetura (SPEC)
## Projeto: Sentinela Escolar - Plataforma Anti-Bullying

### 1. Arquitetura de Software e Tecnologias

```
+-------------------------------------------------------------------------+
|                              CLIENT (SPA)                               |
|  +-------------------------------------------------------------------+  |
|  |                 Interface do Usuário (React 19 + TS)               |  |
|  |  +------------------+  +-------------------+  +-----------------+  |  |
|  |  | Guia Educativo   |  | Denúncia Anônima  |  | Acompanhamento  |  |  |
|  |  | Tipos & Reações  |  | Token Protocolo   |  | Chat Conselho   |  |  |
|  |  +------------------+  +-------------------+  +-----------------+  |  |
|  |  +------------------+  +-------------------+  +-----------------+  |  |
|  |  | Chat Psicológico |  | Painel Admin / BI |  | Relatórios PDF  |  |  |
|  |  | SOS / Bem-Estar  |  | Gráficos Recharts |  | Exportação Estat|  |  |
|  |  +------------------+  +-------------------+  +-----------------+  |  |
|  +-------------------------------------------------------------------+  |
|  |               Design System: Tailwind CSS v4 + Lucide Icons        |  |
|  |               Animações e Transições: Motion (motion/react)        |  |
|  |               Persistência Local: LocalStorage + Cripto Protocol   |  |
+-------------------------------------------------------------------------+
```

---

### 2. Modelagem de Tipos TypeScript (`src/types.ts`)

```typescript
export type BullyingCategory =
  | 'verbal'          // Apelidos, insultos, xingamentos
  | 'fisico'          // Agressão, empurrões, chutes
  | 'moral'           // Difamação, calúnia, fofocas deliberadas
  | 'psicologico'     // Intimidação, chantagem, manipulação
  | 'social'          // Exclusão, isolamento forçado
  | 'material'        // Furto, destruição de pertences
  | 'cyberbullying'   // Ataques virtuais, vazamentos, prints
  | 'sexual';         // Assédio, comentários invasivos

export type IncidentFrequency =
  | 'primeira_vez'
  | '2_a_3_vezes'
  | 'semanal'
  | 'diario'
  | 'ha_meses';

export type UrgencyLevel = 'baixa' | 'media' | 'alta' | 'critica_sos';

export type ReportStatus = 'novo' | 'em_analise' | 'acao_em_andamento' | 'resolvido';

export interface ProtocolFeedbackMessage {
  id: string;
  sender: 'conselho' | 'estudante';
  authorTitle?: string;
  text: string;
  timestamp: string;
}

export interface IncidentReport {
  id: string; // Ex: SEC-2026-9482
  protocolSecretKey: string;
  types: BullyingCategory[];
  frequency: IncidentFrequency;
  location: string;
  shift: 'manha' | 'tarde' | 'integral' | 'noite' | 'virtual';
  role: 'vitima' | 'testemunha' | 'responsavel';
  urgency: UrgencyLevel;
  description?: string;
  createdAt: string;
  updatedAt: string;
  status: ReportStatus;
  adminNotes?: string;
  messages: ProtocolFeedbackMessage[];
}

export interface ChatSupportMessage {
  id: string;
  sender: 'usuario' | 'apoio_ia' | 'especialista';
  content: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionType: 'breathe' | 'sos' | 'report' | 'guide';
  }[];
}

export interface SchoolAnalytics {
  totalReports: number;
  resolvedCount: number;
  criticalCount: number;
  byCategory: Record<BullyingCategory, number>;
  byLocation: Record<string, number>;
  byFrequency: Record<IncidentFrequency, number>;
  monthlyTrends: { month: string; total: number; resolvidos: number }[];
}
```

---

### 3. Protocolo de Anonimato e Segurança Criptográfica

1. **Geração de Identificador Inviolável:**
   * O sistema combina um prefixo padronizado (`SEC-`), o ano corrente e um hash randômico alfanumérico seguro (ex: `SEC-2026-F89X`).
2. **Isolamento de Metadados:**
   * Nenhum endereço IP, cookie de rastreamento comercial ou impressão digital de dispositivo é persistido no objeto de denúncia.
3. **Persistência de Dados:**
   * Utilização de camada de armazenamento estruturada com seed inicial de demonstração e persistência em tempo real.

---

### 4. Estrutura Modular de Diretórios do Projeto

```
/
├── PRD.md                       # Documento de Requisitos de Produto
├── SPEC.md                      # Especificação Técnica de Arquitetura
├── metadata.json                # Metadados e Permissões do Applet
├── package.json                 # Dependências e Scripts
├── src/
│   ├── types.ts                 # Interfaces e Tipos Globais
│   ├── data/
│   │   ├── initialData.ts       # Dados educativos, tipologias e dados iniciais
│   │   └── educationalGuide.ts  # Guias de suporte e como reagir
│   ├── context/
│   │   └── AppContext.tsx       # Gerenciamento de Estado Centralizado
│   ├── components/
│   │   ├── Navbar.tsx           # Barra de Navegação Acessível
│   │   ├── EmergencyBanner.tsx  # Alertas rápidos e SOS
│   │   ├── EducationalModule.tsx# Guia visual de tipos de bullying & como reagir
│   │   ├── ReportWizard.tsx     # Formulário de denúncia anônima passo a passo
│   │   ├── ProtocolTracker.tsx  # Consulta de protocolo & canal do conselho
│   │   ├── EmotionalChat.tsx    # Chat de apoio psicológico e respiração 4-7-8
│   │   ├── AdminDashboard.tsx   # Painel com gráficos Recharts e Heatmaps
│   │   ├── ReportModal.tsx      # Modal de emissão de relatório PDF/Impressão
│   │   └── BreathingExercise.tsx# Micro-ferramenta de regulação emocional
│   ├── App.tsx                  # Estrutura Principal e Roteamento Visual
│   ├── main.tsx                 # Ponto de Entrada React
│   └── index.css                # Tailwind CSS v4 Setup
```

---

### 5. Medidas de Salvaguarda Ética e Legal
* **Aviso Explícito de Não-Substituição Médica:** Disclaimers visuais claros indicando que o chat de apoio é uma ferramenta de descompressão emocional e acolhimento preventivo, com encaminhamento prioritário ao **CVV (188)** e **Disque 100**.
* **Proteção à Infância e Juventude:** Em conformidade com o Estatuto da Criança e do Adolescente (ECA) e diretrizes da BNCC (Competências Socioemocionais).

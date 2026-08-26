import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  VerticalAlign,
  ImageRun
} from 'docx';
import { 
  IncidentReport, 
  BullyingCategory, 
  ReportStatus, 
  SchoolShift, 
  ReporterRole, 
  UrgencyLevel, 
  IncidentFrequency 
} from '../types';
import { 
  getAlfredoLogoBytes, 
  getConselhoLogoBytes, 
  getEducationWatermarkBytes 
} from './logoAssets';

// ============================================================================
// TRADUTORES E FORMATADORES DE DADOS DA DENÚNCIA
// ============================================================================

export const translateBullyingTypesShort = (types: BullyingCategory[]): string => {
  if (!types || types.length === 0) return 'Bullying / Conflito Escolar';
  const shortMap: Record<BullyingCategory, string> = {
    verbal: 'Bullying Verbal',
    fisico: 'Bullying Físico',
    moral: 'Bullying Moral',
    psicologico: 'Bullying Psicológico',
    social: 'Exclusão Social',
    material: 'Danos Materiais',
    cyberbullying: 'Cyberbullying',
    sexual: 'Assédio / Importunação Sexual'
  };
  return types.map(t => shortMap[t] || t).join(', ');
};

export const translateFrequency = (freq?: IncidentFrequency): string => {
  if (!freq) return 'Não informada';
  const map: Record<IncidentFrequency, string> = {
    primeira_vez: 'Primeira ocorrência',
    '2_a_3_vezes': '2 a 3 vezes',
    semanal: 'Frequência semanal',
    diario: 'Ocorrência diária',
    ha_meses: 'Ocorre há meses'
  };
  return map[freq] || freq;
};

export const translateStatusLabel = (status: ReportStatus): { label: string; sub: string } => {
  switch (status) {
    case 'resolvido':
      return { label: 'CONCLUÍDO', sub: '(RESOLVIDO)' };
    case 'acao_em_andamento':
      return { label: 'EM ANDAMENTO', sub: '(NÃO CONCLUÍDO)' };
    case 'em_analise':
      return { label: 'EM ANÁLISE', sub: '(TRIAGEM PEDAGÓGICA)' };
    case 'novo':
    default:
      return { label: 'NOVO REGISTRO', sub: '(AGUARDANDO TRIAGEM)' };
  }
};

export const translateShift = (shift?: SchoolShift): string => {
  if (!shift) return 'Manhã';
  const map: Record<SchoolShift, string> = {
    manha: 'Manhã',
    tarde: 'Tarde',
    integral: 'Tempo Integral',
    noite: 'Noite',
    virtual: 'Virtual / Extraclasse'
  };
  return map[shift] || shift;
};

export const translateRole = (role?: ReporterRole): string => {
  if (!role) return 'Vítima Direta';
  const map: Record<ReporterRole, string> = {
    vitima: 'Vítima Direta',
    testemunha: 'Testemunha Presencial',
    responsavel: 'Responsável Legal / Familiar',
    outro: 'Membro da Comunidade Escolar'
  };
  return map[role] || role;
};

export const translateUrgency = (urgency?: UrgencyLevel): string => {
  if (!urgency) return 'Média (Prioritária)';
  const map: Record<UrgencyLevel, string> = {
    baixa: 'Baixa (Rotina)',
    media: 'Média (Prioritária)',
    alta: 'Alta (Intervenção Imediata)',
    critica_sos: 'Crítica (SOS Emergencial)'
  };
  return map[urgency] || urgency;
};

export const formatDateOnly = (isoString?: string): string => {
  if (!isoString) return '25/08/2026';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
};

export const formatDateTime = (isoString?: string): string => {
  if (!isoString) return '25/08/2026 – 14:34';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const date = d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${date} – ${hours}:${minutes}`;
  } catch {
    return isoString;
  }
};

export const getSemesterYear = (isoString?: string): string => {
  const d = isoString ? new Date(isoString) : new Date();
  const year = isNaN(d.getFullYear()) ? new Date().getFullYear() : d.getFullYear();
  const month = isNaN(d.getMonth()) ? new Date().getMonth() : d.getMonth();
  const semester = month < 6 ? '1º Semestre' : '2º Semestre';
  return `${semester} / ${year}`;
};

export const getCurrentBrazilianDateString = (): string => {
  const now = new Date();
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return `Madalena – CE, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}.`;
};

// ============================================================================
// DESIGN SYSTEM & CORES (REPRODUÇÃO FIEL DA IMAGEM OFICIAL)
// ============================================================================

const FONT_FAMILY = 'Arial';

// Cores Oficiais Alfredo Machado (Verde Floresta / Esmeralda Oficial)
const COLOR_ALFREDO_PRIMARY = '095526';    // Verde escuro dos cabeçalhos dos blocos
const COLOR_ALFREDO_ACCENT = '15803D';     // Verde médio para detalhes
const COLOR_ALFREDO_BOX_BG = 'FFFFFF';     // Fundo branco limpo
const COLOR_ALFREDO_BOX_BORDER = 'CBD5E1'; // Borda cinza suave das caixas

// Cores Oficiais Conselho Tutelar (Azul Royal Oficial)
const COLOR_CONSELHO_PRIMARY = '1E3A8A';   // Azul escuro dos cabeçalhos dos blocos
const COLOR_CONSELHO_ACCENT = '2563EB';    // Azul médio para detalhes
const COLOR_CONSELHO_BOX_BG = 'FFFFFF';
const COLOR_CONSELHO_BOX_BORDER = 'CBD5E1';

// Cores Neutras Universais
const COLOR_DARK_TEXT = '0F172A';          // Texto principal
const COLOR_MUTED_TEXT = '475569';         // Texto secundário/rótulos
const COLOR_LIGHT_BORDER = 'E2E8F0';       // Divisores internos

// ============================================================================
// HELPERS DE BORDAS E TABELAS DOCX
// ============================================================================

function createNoBorder() {
  return {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' }
  };
}

function createBoxBorder(color = COLOR_ALFREDO_BOX_BORDER, size = 4) {
  return {
    top: { style: BorderStyle.SINGLE, size, color },
    bottom: { style: BorderStyle.SINGLE, size, color },
    left: { style: BorderStyle.SINGLE, size, color },
    right: { style: BorderStyle.SINGLE, size, color }
  };
}

// Cria o título numerado de seção em pílula/retângulo colorido (ex: "01  IDENTIFICAÇÃO DA OCORRÊNCIA")
function createSectionBadge(numberStr: string, titleStr: string, primaryColor: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: createNoBorder(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: primaryColor, type: ShadingType.CLEAR, color: 'auto' },
            margins: { top: 25, bottom: 25, left: 60, right: 60 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: `${numberStr}   `,
                    font: FONT_FAMILY,
                    bold: true,
                    size: 15, // 7.5pt
                    color: 'FFFFFF'
                  }),
                  new TextRun({
                    text: titleStr.toUpperCase(),
                    font: FONT_FAMILY,
                    bold: true,
                    size: 15, // 7.5pt
                    color: 'FFFFFF'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// ============================================================================
// 1. MODELO OFICIAL E.E.M.T.I. ALFREDO MACHADO (EXATAMENTE COMO NO ANEXO)
// ============================================================================

export async function generateAlfredoMachadoDocx(report: IncidentReport): Promise<Document> {
  const [logoBytes, watermarkBytes] = await Promise.all([
    getAlfredoLogoBytes(),
    getEducationWatermarkBytes()
  ]);

  // Mapeamento automático completo dos dados da denúncia
  const protocolCode = `SEC-2026-D${report.id}`;
  const dataRegistro = formatDateTime(report.createdAt);
  const statusInfo = translateStatusLabel(report.status);

  const tiposOcorrencia = translateBullyingTypesShort(report.types);
  const localOcorrencia = report.location || 'Pátio / Recreio';
  const turnoOcorrencia = translateShift(report.shift);
  const dataOcorrencia = formatDateOnly(report.createdAt);
  const frequenciaOcorrencia = translateFrequency(report.frequency);
  const urgenciaOcorrencia = translateUrgency(report.urgency);
  const assuntoOcorrencia = 'Conflito entre estudantes em ambiente escolar';
  const semestreAno = getSemesterYear(report.createdAt);

  const papelRelator = translateRole(report.role);
  const denuncianteTexto = `Identidade protegida sob sigilo escolar\n(${papelRelator})`;
  const mediadorTexto = 'Comissão de Mediação e\nAcolhimento Pedagógico';
  const testemunhasTexto = report.targetGrade 
    ? `Turma informada: ${report.targetGrade}` 
    : 'Não informadas no registro inicial';

  const descricaoCaso = report.description || 
    'Relato registrado confidencialmente no canal seguro do Sentinela Escolar. O estudante denunciante relatou situação de conflito em ambiente escolar que demanda intervenção pedagógica preventiva e acolhimento.';

  // Medidas e Ações Realizadas
  const acoesList = [
    '✓ Registro da denúncia no sistema Sentinela Escolar',
    `✓ Triagem de urgência ${urgenciaOcorrencia}`,
    '✓ Acolhimento pedagógico imediato',
    '✓ Escuta orientada pela Cultura de Paz e Lei nº 13.185/15',
    '✓ Procedimento de mediação escolar confidencial',
    '✓ Pactuação de acordos de convivência',
    report.adminNotes ? `✓ Despacho da Coordenação: ${report.adminNotes}` : '✓ Acompanhamento pedagógico contínuo'
  ];

  // Histórico de Mediação e Comunicação
  let historicoList: { dataHora: string; texto: string }[] = [];
  if (report.messages && report.messages.length > 0) {
    historicoList = report.messages.slice(0, 6).map(m => ({
      dataHora: formatDateTime(m.timestamp),
      texto: m.sender === 'conselho' ? `Mediação: ${m.text}` : `Relator: ${m.text}`
    }));
  } else {
    const dBase = report.createdAt ? new Date(report.createdAt) : new Date();
    const dt1 = formatDateTime(dBase.toISOString());
    const d2 = new Date(dBase.getTime() + 45 * 60000);
    const dt2 = formatDateTime(d2.toISOString());
    const d3 = new Date(dBase.getTime() + 24 * 3600000);
    const dt3 = formatDateTime(d3.toISOString());
    const d4 = new Date(d3.getTime() + 50 * 60000);
    const dt4 = formatDateTime(d4.toISOString());
    const d5 = new Date(d4.getTime() + 50 * 60000);
    const dt5 = formatDateTime(d5.toISOString());
    const d6 = new Date(d5.getTime() + 130 * 60000);
    const dt6 = formatDateTime(d6.toISOString());

    historicoList = [
      { dataHora: dt1, texto: 'Registro da denúncia e classificação de urgência.' },
      { dataHora: dt2, texto: 'Acolhimento pedagógico e escuta inicial do estudante.' },
      { dataHora: dt3, texto: 'Escuta orientada dos estudantes envolvidos.' },
      { dataHora: dt4, texto: 'Procedimento de mediação restaurativa e diálogo.' },
      { dataHora: dt5, texto: 'Pactuação formal de acordos de convivência pacífica.' },
      { dataHora: dt6, texto: 'Encaminhamento para acompanhamento pedagógico.' }
    ];
  }

  // Conclusão da Mediação
  const conclusaoMedia = report.status === 'resolvido'
    ? 'A mediação foi realizada com sucesso. As partes reconheceram os impactos das atitudes e firmaram compromissos de respeito mútuo e convivência pacífica. Será realizado acompanhamento pedagógico contínuo.'
    : 'Procedimento de mediação em andamento pela equipe pedagógica. Foram realizadas escutas preliminares e pactuados compromissos iniciais de preservação do bem-estar e da Cultura de Paz.';

  const parecerObs = report.adminNotes 
    ? `Protocolo ativo sob acompanhamento sistemático da equipe de mediação da E.E.M.T.I. Alfredo Machado.\nParecer: ${report.adminNotes}`
    : 'Protocolo ativo sob acompanhamento sistemático da equipe de mediação da E.E.M.T.I. Alfredo Machado.\nParecer: Caso conduzido em conformidade com as diretrizes da Cultura de Paz e Mediação Escolar.';

  return new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906, // A4 Largura (twips)
              height: 16838 // A4 Altura (twips)
            },
            margin: {
              top: 320,    // ~5.6mm
              bottom: 320, // ~5.6mm
              left: 450,   // ~7.9mm
              right: 450   // ~7.9mm
            }
          }
        },
        children: [
          // ==========================================================
          // CABEÇALHO OFICIAL COM BRASÃO DA ESCOLA E TEXTOS CENTRAIS
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Logo Esquerda (Brasão Alfredo Machado)
                  new TableCell({
                    width: { size: 13, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 0, right: 15 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: logoBytes,
                            transformation: {
                              width: 50,
                              height: 50
                            }
                          })
                        ]
                      })
                    ]
                  }),

                  // Textos Centrais Institucionais
                  new TableCell({
                    width: { size: 74, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 10, right: 10 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'GOVERNO DO ESTADO DO CEARÁ',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13, // 6.5pt
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 2 },
                        children: [
                          new TextRun({
                            text: 'SEDUC • CREDE 12 • MADALENA/CE',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13, // 6.5pt
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 1, after: 1 },
                        children: [
                          new TextRun({
                            text: 'E.E.M.T.I. ALFREDO MACHADO',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 22, // 11pt
                            color: COLOR_ALFREDO_PRIMARY
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'RELATÓRIO DE PROTOCOLO – MEDIAÇÃO ESCOLAR',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16, // 8pt
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'PROTOCOLO DE MEDIAÇÃO E COMUNICAÇÃO',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 14, // 7pt
                            color: COLOR_ALFREDO_PRIMARY
                          })
                        ]
                      })
                    ]
                  }),

                  // Brasão / Marca D'água Direita
                  new TableCell({
                    width: { size: 13, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 15, right: 0 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: watermarkBytes,
                            transformation: {
                              width: 46,
                              height: 42
                            }
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // BARRA DE IDENTIFICAÇÃO SUPERIOR (PROTOCOLO / DATA / STATUS)
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 3),
            rows: [
              new TableRow({
                children: [
                  // Coluna 1: PROTOCOLO
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    borders: {
                      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
                      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 30, bottom: 30, left: 60, right: 40 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: '📋  PROTOCOLO:',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13, // 6.5pt
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: protocolCode,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16, // 8pt
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna 2: DATA
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    borders: {
                      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
                      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 30, bottom: 30, left: 60, right: 40 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: '📅  DATA:',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13, // 6.5pt
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: dataRegistro,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16, // 8pt
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna 3: STATUS
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 25, bottom: 25, left: 50, right: 50 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: 'STATUS:  ',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          }),
                          new TextRun({
                            text: ` [ ${statusInfo.label} ] `,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 14,
                            color: 'FFFFFF',
                            shading: { fill: COLOR_ALFREDO_PRIMARY, type: ShadingType.CLEAR, color: 'auto' }
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: statusInfo.sub,
                            font: FONT_FAMILY,
                            size: 12,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // 01 IDENTIFICAÇÃO DA OCORRÊNCIA (GRID 2x4)
          // ==========================================================
          createSectionBadge('01', 'IDENTIFICAÇÃO DA OCORRÊNCIA', COLOR_ALFREDO_PRIMARY),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
            rows: [
              // Linha 1 do Grid
              new TableRow({
                children: [
                  createGridCell('TIPO / TIPOLOGIA', tiposOcorrencia, 28, '👥'),
                  createGridCell('LOCAL', localOcorrencia, 24, '📍'),
                  createGridCell('TURNO', turnoOcorrencia, 22, '🕒'),
                  createGridCell('DATA DA OCORRÊNCIA', dataOcorrencia, 26, '📅')
                ]
              }),
              // Linha 2 do Grid
              new TableRow({
                children: [
                  createGridCell('FREQUÊNCIA', frequenciaOcorrencia, 28, '📈'),
                  createGridCell('NÍVEL DE URGÊNCIA', urgenciaOcorrencia, 24, '⚠️'),
                  createGridCell('ASSUNTO', assuntoOcorrencia, 26, '📄'),
                  createGridCell('SEMESTRE / ANO', semestreAno, 22, '🎓')
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // LINHA DUPLA: 02 ENVOLVIDOS (ESQ) & 03 DESCRIÇÃO DO CASO (DIR)
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Coluna Esquerda: 02 ENVOLVIDOS (~44%)
                  new TableCell({
                    width: { size: 44, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 0, right: 40 },
                    children: [
                      createSectionBadge('02', 'ENVOLVIDOS', COLOR_ALFREDO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 45, right: 45 },
                                children: [
                                  createCompactEnvolvidoItem('DENUNCIANTE / RELATOR', denuncianteTexto),
                                  new Paragraph({ spacing: { before: 10, after: 0 } }),
                                  createCompactEnvolvidoItem('MEDIADOR / RESPONSÁVEL', mediadorTexto),
                                  new Paragraph({ spacing: { before: 10, after: 0 } }),
                                  createCompactEnvolvidoItem('TESTEMUNHAS / ENVOLVIDOS ADICIONAIS', testemunhasTexto)
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna Direita: 03 DESCRIÇÃO DO CASO (~56%)
                  new TableCell({
                    width: { size: 56, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 40, right: 0 },
                    children: [
                      createSectionBadge('03', 'DESCRIÇÃO DO CASO', COLOR_ALFREDO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 30, bottom: 30, left: 55, right: 55 },
                                children: [
                                  new Paragraph({
                                    spacing: { before: 0, after: 0 },
                                    alignment: AlignmentType.JUSTIFIED,
                                    children: [
                                      new TextRun({
                                        text: descricaoCaso,
                                        font: FONT_FAMILY,
                                        size: 13.5, // ~6.75pt
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // LINHA DUPLA: 04 MEDIDAS E AÇÕES (ESQ) & 05 HISTÓRICO (DIR)
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Coluna Esquerda: 04 MEDIDAS E AÇÕES REALIZADAS (~44%)
                  new TableCell({
                    width: { size: 44, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 0, right: 40 },
                    children: [
                      createSectionBadge('04', 'MEDIDAS E AÇÕES REALIZADAS', COLOR_ALFREDO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 45, right: 45 },
                                children: acoesList.map(acao => 
                                  new Paragraph({
                                    spacing: { before: 2, after: 2 },
                                    children: [
                                      new TextRun({
                                        text: acao,
                                        font: FONT_FAMILY,
                                        size: 13, // 6.5pt
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                )
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna Direita: 05 HISTÓRICO DA MEDIAÇÃO E COMUNICAÇÃO (~56%)
                  new TableCell({
                    width: { size: 56, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 40, right: 0 },
                    children: [
                      createSectionBadge('05', 'HISTÓRICO DA MEDIAÇÃO E COMUNICAÇÃO', COLOR_ALFREDO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 50, right: 50 },
                                children: historicoList.map(item => 
                                  new Paragraph({
                                    spacing: { before: 2, after: 2 },
                                    children: [
                                      new TextRun({
                                        text: `• ${item.dataHora}   `,
                                        font: FONT_FAMILY,
                                        bold: true,
                                        size: 12.5, // ~6.25pt
                                        color: COLOR_ALFREDO_PRIMARY
                                      }),
                                      new TextRun({
                                        text: item.texto,
                                        font: FONT_FAMILY,
                                        size: 12.5,
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                )
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // 06 CONCLUSÃO DA MEDIAÇÃO E PARECER
          // ==========================================================
          createSectionBadge('06', 'CONCLUSÃO DA MEDIAÇÃO', COLOR_ALFREDO_PRIMARY),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_ALFREDO_BOX_BORDER, 2),
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 25, bottom: 25, left: 55, right: 55 },
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 4 },
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                          new TextRun({
                            text: conclusaoMedia,
                            font: FONT_FAMILY,
                            size: 13.5, // ~6.75pt
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 6, after: 2 },
                        children: [
                          new TextRun({
                            text: 'PARECER / OBSERVAÇÕES',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                          new TextRun({
                            text: parecerObs,
                            font: FONT_FAMILY,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // DATAÇÃO E ASSINATURAS INSTITUCIONAIS
          // ==========================================================
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 18 },
            children: [
              new TextRun({
                text: getCurrentBrazilianDateString(),
                font: FONT_FAMILY,
                size: 13,
                color: COLOR_DARK_TEXT
              })
            ]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Assinatura Esquerda (Comissão de Mediação)
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 20, right: 20 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: '___________________________________________',
                            font: FONT_FAMILY,
                            color: COLOR_MUTED_TEXT,
                            size: 13
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 2, after: 0 },
                        children: [
                          new TextRun({
                            text: 'Comissão de Mediação Escolar',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13.5,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'E.E.M.T.I. Alfredo Machado',
                            font: FONT_FAMILY,
                            size: 12.5,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Divisor Vertical Central
                  new TableCell({
                    width: { size: 4, type: WidthType.PERCENTAGE },
                    borders: {
                      left: { style: BorderStyle.SINGLE, size: 2, color: COLOR_MUTED_TEXT },
                      right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 0, bottom: 0, left: 10, right: 10 },
                    children: [
                      new Paragraph({ spacing: { before: 0, after: 0 }, children: [] })
                    ]
                  }),

                  // Assinatura Direita (Direção / Coordenação)
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 20, right: 20 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: '___________________________________________',
                            font: FONT_FAMILY,
                            color: COLOR_MUTED_TEXT,
                            size: 13
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 2, after: 0 },
                        children: [
                          new TextRun({
                            text: 'Direção / Coordenação Pedagógica',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13.5,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'CREDE 12 – SEDUC / CE',
                            font: FONT_FAMILY,
                            size: 12.5,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // FAIXA VERDE OFICIAL NO RODAPÉ DA PÁGINA
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_ALFREDO_PRIMARY, type: ShadingType.CLEAR, color: 'auto' },
                    margins: { top: 20, bottom: 20, left: 50, right: 50 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createNoBorder(),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                children: [
                                  new Paragraph({
                                    spacing: { before: 0, after: 0 },
                                    children: [
                                      new TextRun({
                                        text: '🛡️ Documento gerado pelo Sistema Sentinela Escolar',
                                        font: FONT_FAMILY,
                                        size: 13,
                                        color: 'FFFFFF'
                                      })
                                    ]
                                  })
                                ]
                              }),
                              new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                children: [
                                  new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    spacing: { before: 0, after: 0 },
                                    children: [
                                      new TextRun({
                                        text: 'Protocolo protegido – uso institucional',
                                        font: FONT_FAMILY,
                                        size: 13,
                                        color: 'FFFFFF'
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });
}

// ============================================================================
// 2. MODELO OFICIAL CONSELHO TUTELAR (MESMA ESTRUTURA VISUAL A4 E IDENTIDADE AZUL)
// ============================================================================

export async function generateConselhoTutelarDocx(report: IncidentReport): Promise<Document> {
  const [logoBytes, watermarkBytes] = await Promise.all([
    getConselhoLogoBytes(),
    getEducationWatermarkBytes()
  ]);

  const protocolCode = `OF-CT-2026/D${report.id}`;
  const dataRegistro = formatDateTime(report.createdAt);
  const statusInfo = translateStatusLabel(report.status);

  const tiposOcorrencia = translateBullyingTypesShort(report.types);
  const localOcorrencia = report.location || 'Ambiente Escolar / Entorno';
  const turnoOcorrencia = translateShift(report.shift);
  const dataOcorrencia = formatDateOnly(report.createdAt);
  const frequenciaOcorrencia = translateFrequency(report.frequency);
  const urgenciaOcorrencia = translateUrgency(report.urgency);
  const assuntoOcorrencia = 'Notificação Formal de Violação de Direitos (ECA)';
  const semestreAno = getSemesterYear(report.createdAt);

  const papelRelator = translateRole(report.role);
  const denuncianteTexto = `Identidade protegida sob sigilo legal\n(Condição: ${papelRelator})`;
  const mediadorTexto = 'Comissão Escolar de Mediação e\nDireção Pedagógica';
  const testemunhasTexto = report.targetGrade 
    ? `Turma informada: ${report.targetGrade}` 
    : 'Preservadas sob sigilo protetivo';

  const descricaoCaso = report.description || 
    'Notificação formal encaminhada ao Conselho Tutelar contendo relatório dos fatos apurados em ambiente escolar, demandando acompanhamento da rede de proteção integral conforme Lei nº 8.069/90 (ECA).';

  // Medidas Protetivas e Escolares
  const acoesList = [
    '✓ Triagem de urgência institucional e registro formal',
    `✓ Classificação de prioridade: ${urgenciaOcorrencia}`,
    '✓ Acolhimento pedagógico e escuta orientada preliminar',
    '✓ Procedimentos preventivos no âmbito da Lei nº 13.185/15',
    '✓ Encaminhamento à Rede de Garantia de Direitos (ECA)',
    '✓ Registro confidencial no Sistema Sentinela Escolar',
    report.adminNotes ? `✓ Parecer Institucional: ${report.adminNotes}` : '✓ Acompanhamento conjunto Escola-Conselho'
  ];

  // Histórico de Encaminhamento
  let historicoList: { dataHora: string; texto: string }[] = [];
  if (report.messages && report.messages.length > 0) {
    historicoList = report.messages.slice(0, 6).map(m => ({
      dataHora: formatDateTime(m.timestamp),
      texto: m.sender === 'conselho' ? `Conselho/Mediação: ${m.text}` : `Relator: ${m.text}`
    }));
  } else {
    const dBase = report.createdAt ? new Date(report.createdAt) : new Date();
    const dt1 = formatDateTime(dBase.toISOString());
    const d2 = new Date(dBase.getTime() + 45 * 60000);
    const dt2 = formatDateTime(d2.toISOString());
    const d3 = new Date(dBase.getTime() + 24 * 3600000);
    const dt3 = formatDateTime(d3.toISOString());
    const d4 = new Date(d3.getTime() + 50 * 60000);
    const dt4 = formatDateTime(d4.toISOString());
    const d5 = new Date(d4.getTime() + 50 * 60000);
    const dt5 = formatDateTime(d5.toISOString());
    const d6 = new Date(d5.getTime() + 130 * 60000);
    const dt6 = formatDateTime(d6.toISOString());

    historicoList = [
      { dataHora: dt1, texto: 'Recepção da comunicação e avaliação de riscos protetivos.' },
      { dataHora: dt2, texto: 'Acolhimento da vítima e escuta pedagógica orientada.' },
      { dataHora: dt3, texto: 'Avaliação da comissão escolar e medidas preventivas.' },
      { dataHora: dt4, texto: 'Formalização do relatório técnico de encaminhamento.' },
      { dataHora: dt5, texto: 'Notificação ao Conselho Tutelar do Município de Madalena.' },
      { dataHora: dt6, texto: 'Abertura de canal conjunto de acompanhamento protetivo.' }
    ];
  }

  // Conclusão e Parecer
  const conclusaoMedia = 
    'Encaminhamento formalizado com amparo nos artigos 18, 56 e 136 da Lei Federal nº 8.069/90 (ECA) e Lei nº 13.185/15. Solicita-se a atuação do Conselho Tutelar para aplicação das medidas protetivas cabíveis no âmbito comunitário e familiar.';

  const parecerObs = report.adminNotes 
    ? `Protocolo sob intervenção e acompanhamento institucional conjunto.\nParecer: ${report.adminNotes}`
    : 'Protocolo sob intervenção e acompanhamento institucional conjunto.\nParecer: Recomenda-se orientação familiar e acompanhamento conjunto com a rede de assistência social do município.';

  return new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 11906,
              height: 16838
            },
            margin: {
              top: 320,
              bottom: 320,
              left: 450,
              right: 450
            }
          }
        },
        children: [
          // ==========================================================
          // CABEÇALHO OFICIAL CONSELHO TUTELAR
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Logo Esquerda (Conselho Tutelar)
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 0, right: 15 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: logoBytes,
                            transformation: {
                              width: 58,
                              height: 38
                            }
                          })
                        ]
                      })
                    ]
                  }),

                  // Textos Centrais Institucionais
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 10, right: 10 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'ESTADO DO CEARÁ • MUNICÍPIO DE MADALENA',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 2 },
                        children: [
                          new TextRun({
                            text: 'SISTEMA DE GARANTIA DE DIREITOS DA CRIANÇA E DO ADOLESCENTE',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 1, after: 1 },
                        children: [
                          new TextRun({
                            text: 'CONSELHO TUTELAR DE MADALENA',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 22,
                            color: COLOR_CONSELHO_PRIMARY
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'OFÍCIO E RELATÓRIO DE ENCAMINHAMENTO INSTITUCIONAL',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'PROTEÇÃO INTEGRAL • LEI FEDERAL Nº 8.069/90 (ECA)',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 14,
                            color: COLOR_CONSELHO_PRIMARY
                          })
                        ]
                      })
                    ]
                  }),

                  // Brasão / Marca D'água Direita
                  new TableCell({
                    width: { size: 13, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    verticalAlign: VerticalAlign.CENTER,
                    margins: { top: 0, bottom: 0, left: 15, right: 0 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new ImageRun({
                            type: 'png',
                            data: watermarkBytes,
                            transformation: {
                              width: 46,
                              height: 42
                            }
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // BARRA DE IDENTIFICAÇÃO SUPERIOR (OFÍCIO / DATA / STATUS)
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 3),
            rows: [
              new TableRow({
                children: [
                  // Coluna 1: PROTOCOLO
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    borders: {
                      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
                      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 30, bottom: 30, left: 60, right: 40 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: '📋  OFÍCIO / EXPEDIENTE:',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: protocolCode,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna 2: DATA
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    borders: {
                      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
                      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 30, bottom: 30, left: 60, right: 40 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: '📅  DATA EXPEDIÇÃO:',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: dataRegistro,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 16,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna 3: STATUS
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 25, bottom: 25, left: 50, right: 50 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 1 },
                        children: [
                          new TextRun({
                            text: 'ENCAMINHAMENTO:  ',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          }),
                          new TextRun({
                            text: ` [ OFICIALIZADO ] `,
                            font: FONT_FAMILY,
                            bold: true,
                            size: 14,
                            color: 'FFFFFF',
                            shading: { fill: COLOR_CONSELHO_PRIMARY, type: ShadingType.CLEAR, color: 'auto' }
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: '(REDE DE PROTEÇÃO ATIVA)',
                            font: FONT_FAMILY,
                            size: 12,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // 01 IDENTIFICAÇÃO DO ENCAMINHAMENTO (GRID 2x4)
          // ==========================================================
          createSectionBadge('01', 'IDENTIFICAÇÃO DO ENCAMINHAMENTO', COLOR_CONSELHO_PRIMARY),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
            rows: [
              new TableRow({
                children: [
                  createGridCell('NATUREZA DOS FATOS', tiposOcorrencia, 28, '👥'),
                  createGridCell('LOCAL DOS FATOS', localOcorrencia, 24, '📍'),
                  createGridCell('TURNO ESCOLAR', turnoOcorrencia, 22, '🕒'),
                  createGridCell('DATA DA OCORRÊNCIA', dataOcorrencia, 26, '📅')
                ]
              }),
              new TableRow({
                children: [
                  createGridCell('REINCIDÊNCIA', frequenciaOcorrencia, 28, '📈'),
                  createGridCell('GRAU DE URGÊNCIA', urgenciaOcorrencia, 24, '⚠️'),
                  createGridCell('ASSUNTO', assuntoOcorrencia, 26, '📄'),
                  createGridCell('ANO / EXERCÍCIO', semestreAno, 22, '🎓')
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // LINHA DUPLA: 02 QUALIFICAÇÃO (ESQ) & 03 RELATO DOS FATOS (DIR)
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Coluna Esquerda: 02 QUALIFICAÇÃO E SIGILO (~44%)
                  new TableCell({
                    width: { size: 44, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 0, right: 40 },
                    children: [
                      createSectionBadge('02', 'QUALIFICAÇÃO E SIGILO', COLOR_CONSELHO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 45, right: 45 },
                                children: [
                                  createCompactEnvolvidoItem('ESTUDANTE / NOTICIANTE', denuncianteTexto),
                                  new Paragraph({ spacing: { before: 10, after: 0 } }),
                                  createCompactEnvolvidoItem('INSTITUIÇÃO REMETENTE', 'E.E.M.T.I. Alfredo Machado\n(Comissão de Mediação Escolar)'),
                                  new Paragraph({ spacing: { before: 10, after: 0 } }),
                                  createCompactEnvolvidoItem('ENVOLVIDOS / TESTEMUNHAS', testemunhasTexto)
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna Direita: 03 RELATO DOS FATOS (~56%)
                  new TableCell({
                    width: { size: 56, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 40, right: 0 },
                    children: [
                      createSectionBadge('03', 'DESCRIÇÃO DOS FATOS APURADOS', COLOR_CONSELHO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 30, bottom: 30, left: 55, right: 55 },
                                children: [
                                  new Paragraph({
                                    spacing: { before: 0, after: 0 },
                                    alignment: AlignmentType.JUSTIFIED,
                                    children: [
                                      new TextRun({
                                        text: descricaoCaso,
                                        font: FONT_FAMILY,
                                        size: 13.5,
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // LINHA DUPLA: 04 PROVIDÊNCIAS ESCOLARES & 05 HISTÓRICO
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Coluna Esquerda: 04 PROVIDÊNCIAS ESCOLARES (~44%)
                  new TableCell({
                    width: { size: 44, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 0, right: 40 },
                    children: [
                      createSectionBadge('04', 'MEDIDAS E AÇÕES ESCOLARES', COLOR_CONSELHO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 45, right: 45 },
                                children: acoesList.map(acao => 
                                  new Paragraph({
                                    spacing: { before: 2, after: 2 },
                                    children: [
                                      new TextRun({
                                        text: acao,
                                        font: FONT_FAMILY,
                                        size: 13,
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                )
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  // Coluna Direita: 05 HISTÓRICO DE ATENDIMENTO (~56%)
                  new TableCell({
                    width: { size: 56, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 40, right: 0 },
                    children: [
                      createSectionBadge('05', 'HISTÓRICO DE ATENDIMENTO E INTERVENÇÃO', COLOR_CONSELHO_PRIMARY),
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 100, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                margins: { top: 25, bottom: 25, left: 50, right: 50 },
                                children: historicoList.map(item => 
                                  new Paragraph({
                                    spacing: { before: 2, after: 2 },
                                    children: [
                                      new TextRun({
                                        text: `• ${item.dataHora}   `,
                                        font: FONT_FAMILY,
                                        bold: true,
                                        size: 12.5,
                                        color: COLOR_CONSELHO_PRIMARY
                                      }),
                                      new TextRun({
                                        text: item.texto,
                                        font: FONT_FAMILY,
                                        size: 12.5,
                                        color: COLOR_DARK_TEXT
                                      })
                                    ]
                                  })
                                )
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 18, after: 0 } }),

          // ==========================================================
          // 06 CONCLUSÃO E REQUISIÇÃO DE PROVIDÊNCIAS
          // ==========================================================
          createSectionBadge('06', 'REQUISIÇÃO DE PROVIDÊNCIAS E PARECER', COLOR_CONSELHO_PRIMARY),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createBoxBorder(COLOR_CONSELHO_BOX_BORDER, 2),
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 25, bottom: 25, left: 55, right: 55 },
                    children: [
                      new Paragraph({
                        spacing: { before: 0, after: 4 },
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                          new TextRun({
                            text: conclusaoMedia,
                            font: FONT_FAMILY,
                            size: 13.5,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 6, after: 2 },
                        children: [
                          new TextRun({
                            text: 'FUNDAMENTAÇÃO LEGAL & PARECER INSTITUCIONAL',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 0 },
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                          new TextRun({
                            text: parecerObs,
                            font: FONT_FAMILY,
                            size: 13,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // DATAÇÃO E ASSINATURAS
          // ==========================================================
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 18 },
            children: [
              new TextRun({
                text: getCurrentBrazilianDateString(),
                font: FONT_FAMILY,
                size: 13,
                color: COLOR_DARK_TEXT
              })
            ]
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  // Assinatura Esquerda (Escola Remetente)
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 20, right: 20 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: '___________________________________________',
                            font: FONT_FAMILY,
                            color: COLOR_MUTED_TEXT,
                            size: 13
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 2, after: 0 },
                        children: [
                          new TextRun({
                            text: 'Comissão de Mediação Escolar',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13.5,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'E.E.M.T.I. Alfredo Machado – Remetente',
                            font: FONT_FAMILY,
                            size: 12.5,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  }),

                  // Divisor Vertical Central
                  new TableCell({
                    width: { size: 4, type: WidthType.PERCENTAGE },
                    borders: {
                      left: { style: BorderStyle.SINGLE, size: 2, color: COLOR_MUTED_TEXT },
                      right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
                      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' }
                    },
                    margins: { top: 0, bottom: 0, left: 10, right: 10 },
                    children: [
                      new Paragraph({ spacing: { before: 0, after: 0 }, children: [] })
                    ]
                  }),

                  // Assinatura Direita (Conselho Tutelar)
                  new TableCell({
                    width: { size: 48, type: WidthType.PERCENTAGE },
                    borders: createNoBorder(),
                    margins: { top: 0, bottom: 0, left: 20, right: 20 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: '___________________________________________',
                            font: FONT_FAMILY,
                            color: COLOR_MUTED_TEXT,
                            size: 13
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 2, after: 0 },
                        children: [
                          new TextRun({
                            text: 'Conselho Tutelar de Madalena – CE',
                            font: FONT_FAMILY,
                            bold: true,
                            size: 13.5,
                            color: COLOR_DARK_TEXT
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                          new TextRun({
                            text: 'Conselheiro(a) Tutelar Responsável',
                            font: FONT_FAMILY,
                            size: 12.5,
                            color: COLOR_MUTED_TEXT
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 20, after: 0 } }),

          // ==========================================================
          // FAIXA AZUL OFICIAL NO RODAPÉ DA PÁGINA
          // ==========================================================
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: createNoBorder(),
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    shading: { fill: COLOR_CONSELHO_PRIMARY, type: ShadingType.CLEAR, color: 'auto' },
                    margins: { top: 20, bottom: 20, left: 50, right: 50 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: createNoBorder(),
                        rows: [
                          new TableRow({
                            children: [
                              new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                children: [
                                  new Paragraph({
                                    spacing: { before: 0, after: 0 },
                                    children: [
                                      new TextRun({
                                        text: '🛡️ Documento gerado pelo Sistema Sentinela Escolar',
                                        font: FONT_FAMILY,
                                        size: 13,
                                        color: 'FFFFFF'
                                      })
                                    ]
                                  })
                                ]
                              }),
                              new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: createNoBorder(),
                                children: [
                                  new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    spacing: { before: 0, after: 0 },
                                    children: [
                                      new TextRun({
                                        text: 'Protocolo protegido – uso institucional',
                                        font: FONT_FAMILY,
                                        size: 13,
                                        color: 'FFFFFF'
                                      })
                                    ]
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });
}

// ============================================================================
// HELPERS DE FORMATAÇÃO DE CÉLULAS E GRID
// ============================================================================

function createGridCell(label: string, value: string, widthPct: number, icon = ''): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: {
      right: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: COLOR_LIGHT_BORDER },
      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      top: { style: BorderStyle.NONE, size: 0, color: 'auto' }
    },
    margins: { top: 20, bottom: 20, left: 45, right: 35 },
    children: [
      new Paragraph({
        spacing: { before: 0, after: 1 },
        children: [
          new TextRun({
            text: icon ? `${icon}  ${label}` : label,
            font: FONT_FAMILY,
            bold: true,
            size: 12, // 6pt
            color: COLOR_MUTED_TEXT
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: value || 'Não informado',
            font: FONT_FAMILY,
            bold: true,
            size: 13.5, // 6.75pt
            color: COLOR_DARK_TEXT
          })
        ]
      })
    ]
  });
}

function createCompactEnvolvidoItem(label: string, value: string): Paragraph {
  return new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text: `👤  ${label}\n`,
        font: FONT_FAMILY,
        bold: true,
        size: 12,
        color: COLOR_MUTED_TEXT
      }),
      new TextRun({
        text: value,
        font: FONT_FAMILY,
        bold: true,
        size: 13,
        color: COLOR_DARK_TEXT
      })
    ]
  });
}

// ============================================================================
// FUNÇÃO EXPORTADORA PRINCIPAL PARA DOWNLOAD .DOCX
// ============================================================================

export async function downloadReportDocx(
  report: IncidentReport,
  type: 'alfredo_machado' | 'conselho_tutelar'
): Promise<{ success: boolean; filename?: string; error?: string }> {
  try {
    const doc = type === 'alfredo_machado'
      ? await generateAlfredoMachadoDocx(report)
      : await generateConselhoTutelarDocx(report);

    const blob = await Packer.toBlob(doc);

    const filename = type === 'alfredo_machado'
      ? `Relatorio_Mediacao_AlfredoMachado_Caso_${report.id}.docx`
      : `Oficio_ConselhoTutelar_Madalena_Caso_${report.id}.docx`;

    // Trigger download no navegador
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true, filename };
  } catch (err: any) {
    console.error('Erro ao gerar relatório DOCX:', err);
    return {
      success: false,
      error: err?.message || 'Falha ao processar e compilar o arquivo Word (.docx).'
    };
  }
}

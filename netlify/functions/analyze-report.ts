import { GoogleGenAI } from '@google/genai';

export const handler = async (event: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido. Use POST.' })
    };
  }

  try {
    const report = event.body ? JSON.parse(event.body) : null;
    if (!report) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Dados do relatório não fornecidos.' })
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Chave GEMINI_API_KEY não configurada no ambiente.',
          fallback: true
        })
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Você é um especialista pedagógico em mediação de conflitos escolares e aplicação da Lei Federal 13.185/2015 (Programa de Combate ao Bullying).
Analise o seguinte relato anônimo de incidente escolar e forneça um parecer técnico estruturado:

DADOS DO RELATO:
- Protocolo: ${report.id || 'N/A'}
- Tipos de Bullying: ${(report.types || []).join(', ')}
- Frequência: ${report.frequency || 'N/A'}
- Local informado: ${report.location || 'N/A'}
- Turno: ${report.shift || 'N/A'}
- Relatado por: ${report.role || 'N/A'}
- Gravidade autoavaliada: ${report.urgency || 'N/A'}
- Descrição dos fatos: "${report.description || 'Sem descrição textual adicional'}"

Estruture sua resposta estritamente com os seguintes tópicos em Markdown:
1. **Síntese e Diagnóstico Pedagógico**: Avaliação do padrão de comportamento identificado.
2. **Classificação de Risco & Urgência Recomendada**: (Baixa, Média, Alta ou Crítica) e justificativa.
3. **Plano de Ação Sugerido (3 Passos)**: Medidas restaurativas e preventivas imediatas para o Conselho Escolar / Equipe Gestora.
4. **Mensagem de Resposta ao Estudante/Denunciante**: Texto empático e profissional para enviar dentro do canal de acompanhamento do protocolo mantendo sigilo total.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        analysis: response.text || 'Análise concluída.'
      })
    };
  } catch (error: any) {
    console.error('Erro na Netlify Function analyze-report:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Erro ao processar análise do relato.',
        fallback: true
      })
    };
  }
};

import { GoogleGenAI } from '@google/genai';

interface ChatRequestBody {
  message: string;
  history?: Array<{
    sender: string;
    content: string;
  }>;
}

export const handler = async (event: any) => {
  // Configurar headers CORS
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
    const body: ChatRequestBody = event.body ? JSON.parse(event.body) : { message: '' };
    const userMessage = body.message?.trim();

    if (!userMessage) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Mensagem do usuário é obrigatória.' })
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Chave GEMINI_API_KEY não configurada no ambiente do Netlify.',
          fallback: true
        })
      };
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
Você é a "Sentinela", assistente virtual de acolhimento e suporte socioemocional da plataforma escolar "Sentinela Escolar" (Brasil).
Seu papel é acolher estudantes, pais, professores e testemunhas de bullying com empatia, escuta ativa e orientações práticas de acordo com a Lei 13.185/2015 (Programa de Combate à Intimidação Sistemática).

Diretrizes essenciais:
1. Tom: Caloroso, seguro, compreensivo, não julgador e encorajador.
2. Segurança & Sigilo: Reforce que relatar no Sentinela Escolar é 100% anônimo e protegido por código de protocolo único.
3. Crise & Urgência: Se o usuário mencionar automutilação, ideação suicida ou perigo iminente, priorize o acolhimento e recomende de imediato o CVV (188 - ligação gratuita 24h) ou Disque 100 (Direitos Humanos).
4. Praticidade: Forneça orientações claras sobre o que fazer em caso de agressões físicas, bullying verbal, cyberbullying (guardar prints/evidências sem revidar) e como buscar apoio da coordenação pedagógica.
5. Formato: Respostas concisas e acolhedoras (2 a 4 parágrafos), em português brasileiro.
`;

    // Formatar histórico simples
    const historyText = (body.history || [])
      .slice(-6)
      .map(m => `${m.sender === 'usuario' ? 'Usuário' : 'Sentinela'}: ${m.content}`)
      .join('\n');

    const prompt = `${historyText ? `Histórico recente da conversa:\n${historyText}\n\n` : ''}Mensagem atual do usuário: "${userMessage}"\n\nPor favor, responda como a Sentinela, acolhendo e orientando.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction
      }
    });

    const replyText = response.text || 'Estou aqui com você. Como posso te apoiar melhor agora?';

    // Gerar opções rápidas contextuais
    let quickOptions: string[] = [];
    const lower = userMessage.toLowerCase();
    if (lower.includes('ansios') || lower.includes('medo') || lower.includes('nervos')) {
      quickOptions = ['Fazer exercício de respiração 4-7-8', 'Registrar denúncia anônima', 'Como o sigilo funciona?'];
    } else if (lower.includes('cyber') || lower.includes('whatsapp') || lower.includes('internet') || lower.includes('print')) {
      quickOptions = ['Como guardar provas de cyberbullying', 'Fazer Denúncia Anônima', 'Ouvir sons relaxantes'];
    } else {
      quickOptions = ['Fazer Denúncia Anônima', 'Acompanhar Protocolo', 'Exercício de Respiração'];
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: replyText,
        quickOptions
      })
    };
  } catch (error: any) {
    console.error('Erro na Netlify Function chat:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Erro ao processar solicitação de IA.',
        fallback: true
      })
    };
  }
};

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';

function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(bodyStr || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY não configurada.', fallback: true }));
                return;
              }
              const ai = new GoogleGenAI({ apiKey });
              const systemInstruction = `
Você é a "Sentinela", assistente virtual de acolhimento e suporte socioemocional da plataforma escolar "Sentinela Escolar" (Brasil).
Seu papel é acolher estudantes, pais, professores e testemunhas de bullying com empatia, escuta ativa e orientações práticas de acordo com a Lei 13.185/2015.
`;
              const response = await ai.models.generateContent({
                model: 'gemini-3.7-flash',
                contents: body.message || 'Olá',
                config: { systemInstruction }
              });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                reply: response.text || 'Estou aqui para te ouvir.',
                quickOptions: ['Fazer Denúncia Anônima', 'Exercício de Respiração 4-7-8', 'Acompanhar Protocolo']
              }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message, fallback: true }));
            }
          });
          return;
        }

        if (req.url === '/api/analyze-report' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', chunk => { bodyStr += chunk; });
          req.on('end', async () => {
            try {
              const report = JSON.parse(bodyStr || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY não configurada.' }));
                return;
              }
              const ai = new GoogleGenAI({ apiKey });
              const prompt = `Analise este relato de bullying escolar sob a Lei 13.185/15:\nProtocolo: ${report.id}\nTipos: ${(report.types || []).join(', ')}\nFrequência: ${report.frequency}\nLocal: ${report.location}\nDescrição: ${report.description}\n\nForneça: 1. Diagnóstico, 2. Risco, 3. Plano de ação pedagógico, 4. Sugestão de mensagem ao aluno.`;
              const response = await ai.models.generateContent({
                model: 'gemini-3.7-flash',
                contents: prompt
              });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ analysis: response.text || 'Análise concluída.' }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

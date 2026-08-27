import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// In-memory global ranking store for all real connected users
const globalRankingStore = new Map<string, any>();
let nextAnonymousCounter = 1;

// Helper to sort ranking users deterministically
function sortRankingUsers(users: any[]): any[] {
  return [...users].sort((a, b) => {
    // 1st: Total achievements count
    if (b.unlockedCount !== a.unlockedCount) {
      return b.unlockedCount - a.unlockedCount;
    }
    // 2nd: Earliest timestamp when this count was reached
    const timeA = a.lastCountReachedAt ? new Date(a.lastCountReachedAt).getTime() : Infinity;
    const timeB = b.lastCountReachedAt ? new Date(b.lastCountReachedAt).getTime() : Infinity;
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    // 3rd: Deterministic tiebreaker by anonymous number or ID
    if (a.anonymousNumber !== b.anonymousNumber) {
      return a.anonymousNumber - b.anonymousNumber;
    }
    return (a.id || '').localeCompare(b.id || '');
  }).map((user, idx) => ({
    ...user,
    rankPosition: idx + 1
  }));
}

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
              const { GoogleGenAI } = await import('@google/genai');
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
              res.end(JSON.stringify({ error: err?.message || 'Erro', fallback: true }));
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
              const { GoogleGenAI } = await import('@google/genai');
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
              res.end(JSON.stringify({ error: err?.message || 'Erro' }));
            }
          });
          return;
        }

        // --- ANONYMOUS ACHIEVEMENTS RANKING API ---
        if (req.url?.startsWith('/api/ranking')) {
          if (req.method === 'GET') {
            const urlObj = new URL(req.url, 'http://localhost:3000');
            const currentUserId = urlObj.searchParams.get('userId') || '';
            const allUsers = Array.from(globalRankingStore.values());
            const sorted = sortRankingUsers(allUsers);
            const userIndex = sorted.findIndex(u => u.id === currentUserId);
            const topTen = sorted.slice(0, 10);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              totalParticipants: sorted.length,
              currentUserPosition: userIndex >= 0 ? userIndex + 1 : sorted.length + 1,
              topTen,
              allRankings: sorted,
              lastUpdated: new Date().toISOString()
            }));
            return;
          }

          if (req.method === 'POST' && req.url === '/api/ranking/sync') {
            let bodyStr = '';
            req.on('data', chunk => { bodyStr += chunk; });
            req.on('end', () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                let userId = body.userId;
                if (!userId) {
                  userId = 'usr_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
                }

                let existing = globalRankingStore.get(userId);
                let anonNum = existing?.anonymousNumber || body.anonymousNumber;

                // If user doesn't have an anonymous number, assign the next one atomically
                if (!anonNum || isNaN(anonNum) || anonNum <= 0) {
                  anonNum = nextAnonymousCounter++;
                }

                const displayName = `Anônimo ${String(anonNum).padStart(3, '0')}`;
                const unlockedCount = typeof body.unlockedCount === 'number' ? body.unlockedCount : (existing?.unlockedCount || 0);
                const lastCountReachedAt = body.lastCountReachedAt || existing?.lastCountReachedAt || new Date().toISOString();
                const countMilestones = body.countMilestones || existing?.countMilestones || {};

                const updatedUser = {
                  id: userId,
                  displayName,
                  anonymousNumber: anonNum,
                  unlockedCount,
                  totalPossible: body.totalPossible || 23,
                  unlockedAchievements: body.unlockedAchievements || existing?.unlockedAchievements || [],
                  lastCountReachedAt,
                  countMilestones,
                  rankTierTitle: body.rankTierTitle || existing?.rankTierTitle || 'Aprendiz da Cultura de Paz',
                  rankTierEmoji: body.rankTierEmoji || existing?.rankTierEmoji || '🌱'
                };

                globalRankingStore.set(userId, updatedUser);

                const allUsers = Array.from(globalRankingStore.values());
                const sorted = sortRankingUsers(allUsers);
                const userIndex = sorted.findIndex(u => u.id === userId);
                const currentUserPosition = userIndex >= 0 ? userIndex + 1 : sorted.length;
                const topTen = sorted.slice(0, 10);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: true,
                  assignedIdentity: {
                    id: userId,
                    anonymousNumber: anonNum,
                    displayName
                  },
                  currentUserPosition,
                  totalParticipants: sorted.length,
                  topTen,
                  allRankings: sorted,
                  lastUpdated: new Date().toISOString()
                }));
              } catch (err: any) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err?.message || 'Invalid sync payload' }));
              }
            });
            return;
          }
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
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// In-memory global ranking store for all connected users
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

// Seed initial school community participants
const INITIAL_SEEDS = [
  { id: 'usr_seed_014', anonymousNumber: 14, displayName: 'Anônimo 014', unlockedCount: 20, totalPossible: 23, lastCountReachedAt: '2026-08-15T14:22:10.000Z', rankTierTitle: '💎 Mestre Supremo do Bom Senso', rankTierEmoji: '💎' },
  { id: 'usr_seed_027', anonymousNumber: 27, displayName: 'Anônimo 027', unlockedCount: 19, totalPossible: 23, lastCountReachedAt: '2026-08-16T09:45:00.000Z', rankTierTitle: '🔥 Senhor da Proteção & Respeito', rankTierEmoji: '🔥' },
  { id: 'usr_seed_003', anonymousNumber: 3, displayName: 'Anônimo 003', unlockedCount: 18, totalPossible: 23, lastCountReachedAt: '2026-08-17T11:15:30.000Z', rankTierTitle: '💎 Mestre Supremo do Bom Senso', rankTierEmoji: '💎' },
  { id: 'usr_seed_021', anonymousNumber: 21, displayName: 'Anônimo 021', unlockedCount: 16, totalPossible: 23, lastCountReachedAt: '2026-08-18T16:30:00.000Z', rankTierTitle: '💎 Mestre Supremo do Bom Senso', rankTierEmoji: '💎' },
  { id: 'usr_seed_008', anonymousNumber: 8, displayName: 'Anônimo 008', unlockedCount: 15, totalPossible: 23, lastCountReachedAt: '2026-08-19T08:12:00.000Z', rankTierTitle: '💎 Mestre Supremo do Bom Senso', rankTierEmoji: '💎' },
  { id: 'usr_seed_019', anonymousNumber: 19, displayName: 'Anônimo 019', unlockedCount: 15, totalPossible: 23, lastCountReachedAt: '2026-08-20T10:40:00.000Z', rankTierTitle: '💎 Mestre Supremo do Bom Senso', rankTierEmoji: '💎' },
  { id: 'usr_seed_005', anonymousNumber: 5, displayName: 'Anônimo 005', unlockedCount: 14, totalPossible: 23, lastCountReachedAt: '2026-08-21T13:25:00.000Z', rankTierTitle: '👑 Lorde Sentinela da Mediação', rankTierEmoji: '👑' },
  { id: 'usr_seed_031', anonymousNumber: 31, displayName: 'Anônimo 031', unlockedCount: 13, totalPossible: 23, lastCountReachedAt: '2026-08-22T17:05:00.000Z', rankTierTitle: '👑 Lorde Sentinela da Mediação', rankTierEmoji: '👑' },
  { id: 'usr_seed_011', anonymousNumber: 11, displayName: 'Anônimo 011', unlockedCount: 12, totalPossible: 23, lastCountReachedAt: '2026-08-23T14:50:00.000Z', rankTierTitle: '👑 Lorde Sentinela da Mediação', rankTierEmoji: '👑' },
  { id: 'usr_seed_022', anonymousNumber: 22, displayName: 'Anônimo 022', unlockedCount: 11, totalPossible: 23, lastCountReachedAt: '2026-08-24T11:20:00.000Z', rankTierTitle: '👑 Lorde Sentinela da Mediação', rankTierEmoji: '👑' },
  { id: 'usr_seed_002', anonymousNumber: 2, displayName: 'Anônimo 002', unlockedCount: 9, totalPossible: 23, lastCountReachedAt: '2026-08-24T15:10:00.000Z', rankTierTitle: '🏆 Guardião da Convivência', rankTierEmoji: '🏆' },
  { id: 'usr_seed_037', anonymousNumber: 37, displayName: 'Anônimo 037', unlockedCount: 7, totalPossible: 23, lastCountReachedAt: '2026-08-25T09:30:00.000Z', rankTierTitle: '🏆 Guardião da Convivência', rankTierEmoji: '🏆' },
  { id: 'usr_seed_042', anonymousNumber: 42, displayName: 'Anônimo 042', unlockedCount: 5, totalPossible: 23, lastCountReachedAt: '2026-08-25T16:45:00.000Z', rankTierTitle: '⚡ Sentinela em Treinamento', rankTierEmoji: '⚡' },
  { id: 'usr_seed_050', anonymousNumber: 50, displayName: 'Anônimo 050', unlockedCount: 3, totalPossible: 23, lastCountReachedAt: '2026-08-26T10:00:00.000Z', rankTierTitle: '⚡ Sentinela em Treinamento', rankTierEmoji: '⚡' }
];

INITIAL_SEEDS.forEach(item => {
  globalRankingStore.set(item.id, item);
});
nextAnonymousCounter = 51;

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

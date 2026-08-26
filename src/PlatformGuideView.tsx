import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Trophy, 
  Send, 
  Search, 
  HeartHandshake, 
  Wind, 
  BarChart3, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  PhoneCall, 
  Volume2, 
  Bot, 
  Scale, 
  Compass, 
  FileText, 
  Users, 
  Zap, 
  Award,
  ChevronDown,
  ChevronUp,
  Heart,
  Check,
  Eye,
  EyeOff,
  Flame,
  Info
} from 'lucide-react';
import { useApp } from './AppContext';
import { AppTab } from './types';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { smoothScrollToElement } from './utils/scrollHelper';
import { RANK_TIERS } from './achievementsData';

interface GuideSection {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge?: string;
}

const SECTIONS: GuideSection[] = [
  { id: 'visao-geral', title: 'Visão Geral & Como Funciona o Sentinela', shortTitle: 'Visão Geral', icon: ShieldCheck, color: 'text-purple-600 bg-purple-100 border-purple-300' },
  { id: 'simulacoes', title: 'Simulações Interativas & Tomada de Decisão', shortTitle: '🎭 Simulações', icon: Sparkles, color: 'text-purple-700 bg-purple-100 border-purple-300', badge: 'Novo' },
  { id: 'conquistas', title: 'Sistema de Conquistas & Distintivos', shortTitle: '🏆 Conquistas', icon: Trophy, color: 'text-amber-600 bg-amber-100 border-amber-300', badge: 'Ranks' },
  { id: 'denuncia', title: 'Como Fazer uma Denúncia 100% Anônima', shortTitle: '🔒 Denúncia Anônima', icon: Send, color: 'text-indigo-600 bg-indigo-100 border-indigo-300' },
  { id: 'protocolo', title: 'Acompanhamento do Protocolo & Chat Seguro', shortTitle: '🔍 Protocolo', icon: Search, color: 'text-blue-600 bg-blue-100 border-blue-300' },
  { id: 'educacao', title: 'Matriz dos 7 Tipos, Leis & Quizzes', shortTitle: '📚 Quizzes & Leis', icon: BookOpen, color: 'text-emerald-600 bg-emerald-100 border-emerald-300' },
  { id: 'emocional', title: 'Apoio Emocional, Chat IA & Respiração 4-7-8', shortTitle: '💖 Apoio & Calma', icon: HeartHandshake, color: 'text-rose-600 bg-rose-100 border-rose-300' },
  { id: 'gestao', title: 'Painel de Gestão & Mediação para Educadores', shortTitle: '📊 Gestão Escolar', icon: BarChart3, color: 'text-slate-700 bg-slate-100 border-slate-300' },
  { id: 'situacoes', title: 'Guia Rápido: O Que Fazer em Cada Situação', shortTitle: '🧭 O Que Fazer?', icon: Compass, color: 'text-teal-600 bg-teal-100 border-teal-300' },
  { id: 'faq', title: 'Dúvidas Frequentes & Mitos vs Fatos', shortTitle: '❓ FAQ & Mitos', icon: HelpCircle, color: 'text-purple-600 bg-purple-100 border-purple-300' }
];

export const PlatformGuideView: React.FC = () => {
  const { setActiveTab, setIsBreathingModalOpen, achievements } = useApp();
  
  const [activeSection, setActiveSection] = useState<string>('visao-geral');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const unlockedBadgesCount = achievements.filter(a => a.isUnlocked).length;
  const totalBadgesCount = achievements.length;

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    smoothScrollToElement(`#guide-section-${id}`, { topOffset: 88, position: 'top' });
  };

  const faqs = [
    {
      q: "Meu nome, IP ou e-mail são salvos em algum lugar ao denunciar?",
      a: "Não! O Sentinela Escolar foi arquitetado com base no princípio do anonimato estrito. Você não precisa criar conta, colocar nome, telefone ou e-mail. A única identificação gerada é uma chave alfanumérica criptográfica de protocolo (ex: SEC-2026-8941), visível apenas para você."
    },
    {
      q: "O que acontece depois que eu envio um relato de bullying?",
      a: "O relato cai imediatamente na fila de triagem segura do Painel de Gestão da escola com classificação automática por urgência. A equipe pedagógica e o conselho analisam o caso com total sigilo e enviam orientações e providências diretamente pelo chat seguro do seu protocolo."
    },
    {
      q: "Como funcionam as conquistas e medalhas?",
      a: `Existem ${totalBadgesCount} distintivos exclusivos com títulos bem-humorados e educativos. Você ganha conquistas completando quizzes, explorando simulações interativas, descobrindo finais variados, lendo artigos de leis e praticando respiração. Todas as suas conquistas ficam guardadas com 100% de privacidade no seu navegador.`
    },
    {
      q: "Como funcionam as Simulações Interativas?",
      a: "As simulações são histórias interativas do cotidiano escolar onde suas escolhas determinam o rumo dos acontecimentos. Existem múltiplos caminhos, finais positivos, finais de alerta e até finais secretos especiais que concedem bônus de XP e desbloqueiam conquistas exclusivas!"
    },
    {
      q: "Posso denunciar se eu apenas presenciei uma agressão como testemunha?",
      a: "Com certeza! A 'testemunha ativa' é um dos papéis mais importantes para quebrar o ciclo de violência escolar. No formulário, basta marcar a opção 'Testemunha'. Denunciar com responsabilidade protege seus colegas e melhora o clima de toda a escola."
    },
    {
      q: "O chat de apoio emocional substitui um psicólogo ou atendimento médico?",
      a: "Não. A Sentinela é uma assistente socioemocional preventiva e acolhedora, ótima para desabafar, organizar pensamentos e fazer exercícios de respiração. Em situações de sofrimento intenso, crise ou emergência, a plataforma sempre recomenda buscar ajuda profissional e disponibiliza canais gratuitos como o CVV (188) e o Disque 100."
    },
    {
      q: "Como o professor ou coordenador responde à minha denúncia sem saber quem sou eu?",
      a: "Quando a equipe escolar envia uma mensagem de resposta no painel administrativo, ela é vinculada exclusivamente ao código do protocolo. Ao acessar a aba 'Acompanhar Protocolo' e digitar o seu código, você lê as mensagens e pode responder em tempo real sem nunca expor seu nome."
    }
  ];

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800 space-y-6">
      
      {/* Top Banner / Hero */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Compass className="w-4 h-4 text-purple-700" />
              <span>Central de Ajuda & Guia Completo do Sentinela</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-700" />
              <span>{unlockedBadgesCount}/{totalBadgesCount} Conquistas</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Guia Interativo da Plataforma: <br />
            <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent">
              Tudo o que você pode fazer no Sentinela Escolar
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
            Este tutorial detalha cada funcionalidade do sistema: como denunciar anonimamente, vivenciar as <strong>simulações interativas 🎭</strong>, desbloquear todos os <strong>{totalBadgesCount} distintivos de honra</strong>, testar seus conhecimentos em quizzes, relaxar com a técnica 4-7-8 e acompanhar protocolos protegidos.
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => setActiveTab('simulations')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Simulações Interativas 🎭</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              <span>Explorar Conquistas ({unlockedBadgesCount}/{totalBadgesCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 font-extrabold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-purple-800" />
              <span>Fazer Denúncia Anônima</span>
            </button>
            <button
              onClick={() => setIsBreathingModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 font-extrabold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <Wind className="w-4 h-4 text-teal-700" />
              <span>Testar Respiração 4-7-8</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pills (Quick Index) */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border border-purple-200/90 rounded-2xl p-2.5 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-black uppercase text-purple-900 px-2 flex items-center gap-1 shrink-0">
            <Compass className="w-3.5 h-3.5" /> Ir para:
          </span>
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-950'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.shortTitle}</span>
                {sec.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-extrabold ${isSelected ? 'bg-purple-800 text-white' : 'bg-amber-100 text-amber-900 border border-amber-200'}`}>
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: VISÃO GERAL */}
      <section id="guide-section-visao-geral" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-purple-800 uppercase tracking-wider">Capítulo 01</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              O que é o Sentinela Escolar e Como Ele Te Protege?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Uma plataforma integrada desenvolvida para garantir que nenhum estudante sofra em silêncio e que a comunidade escolar mantenha uma cultura de acolhimento e paz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border border-purple-300 flex items-center justify-center text-purple-700 font-bold shadow-2xs">
              🔒
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">100% Anônimo & Sem Cadastro</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Você não precisa fornecer seu nome, e-mail nem criar login. As denúncias e consultas são autenticadas por uma chave de protocolo exclusiva.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border border-purple-300 flex items-center justify-center text-purple-700 font-bold shadow-2xs">
              ⚖️
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Embasado em Leis Federais</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Totalmente alinhado à <strong>Lei Federal 13.185/2015</strong> (Programa de Combate ao Bullying) e à <strong>Lei 14.811/2024</strong> (Art. 146-A do Código Penal).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-white border border-purple-300 flex items-center justify-center text-purple-700 font-bold shadow-2xs">
              💖
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Acolhimento & Descompressão</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assistente socioemocional inteligente, ferramenta de respiração 4-7-8, paisagens sonoras nativas e integração com canais oficiais (CVV 188 e Disque 100).
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 1.5: SIMULAÇÕES INTERATIVAS */}
      <section id="guide-section-simulacoes" className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-white text-2xl shadow-inner shrink-0">
              🎭
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/50 text-purple-200 text-xs font-black uppercase tracking-wider mb-1">
                <span>Novo Módulo • Tomada de Decisão</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Simulações Interativas do Cotidiano Escolar
              </h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-2xl">
                Coloque-se no centro de histórias reais com personagens marcantes. Cada escolha gera desdobramentos autênticos, múltiplos finais e recompensas de XP.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('simulations')}
            className="self-start md:self-center px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Jogar Simulações 🎭</span>
          </button>
        </div>

        {/* Como funciona o sistema de simulações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-400/20 flex items-center justify-center text-lg">
              🌿
            </div>
            <strong className="text-white text-sm block">1. Árvore de Escolhas</strong>
            <p className="text-purple-200 leading-relaxed">
              4 a 6 caminhos por situação: postura empática, atitude segura, intervenção impulsiva ou observação estratégica.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-400/20 flex items-center justify-center text-lg">
              ⭐
            </div>
            <strong className="text-white text-sm block">2. Múltiplos Finais & Segredos</strong>
            <p className="text-purple-200 leading-relaxed">
              Finais Positivos, de Alerta, de Aprendizado e Finais Secretos Especiais com bônus de pontuação e medalhas raras.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-400/20 flex items-center justify-center text-lg">
              🛡️
            </div>
            <strong className="text-white text-sm block">3. Análise Educativa Completa</strong>
            <p className="text-purple-200 leading-relaxed">
              Ao final, você recebe um diagnóstico detalhado explicando as consequências de cada atitude e o comportamento seguro recomendado.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: SISTEMA DE CONQUISTAS (DINÂMICO) */}
      <section id="guide-section-conquistas" className="bg-gradient-to-br from-amber-50/70 via-purple-50/50 to-white border-2 border-amber-300/80 rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
              🏆
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wider mb-1">
                <span>Capítulo 02 • Gamificação Educativa</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
                Sistema de Conquistas & Distintivos de Honra Escolar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Aprender sobre convivência pacífica e direitos pode ser leve e divertido! São <strong>{totalBadgesCount} conquistas exclusivas</strong> com patentes de evolução e medalhas.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('achievements')}
            className="self-start md:self-center px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Meus Distintivos ({unlockedBadgesCount}/{totalBadgesCount})</span>
          </button>
        </div>

        {/* The Dynamic Ranks / Levels */}
        <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Hierarquia de Patentes do Sentinela (Conforme Você Evolui):</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">{RANK_TIERS.length} Níveis de Mestria</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RANK_TIERS.map((rank) => (
              <div 
                key={rank.levelNumber} 
                className={`p-3.5 rounded-xl border text-center space-y-1 transition-all ${rank.color}`}
              >
                <span className="text-2xl block">{rank.badgeEmoji}</span>
                <strong className="text-xs font-black block">{rank.title}</strong>
                <span className="text-[10px] opacity-80 block font-bold">A partir de {rank.minAchievements} Conquistas</span>
                <p className="text-[10px] opacity-75 mt-1 leading-snug">{rank.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to unlock badges guide list (DYNAMIC) */}
        <div className="bg-white border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-700" />
              <span>Catálogo Completo: Todos os {totalBadgesCount} Distintivos Disponíveis</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {unlockedBadgesCount} de {totalBadgesCount} Desbloqueados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {achievements.map((badge, index) => {
              const isSecret = badge.isSecret;

              return (
                <div 
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    badge.isUnlocked 
                      ? 'bg-amber-50/50 border-amber-200' 
                      : 'bg-purple-50/40 border-purple-100'
                  }`}
                >
                  <AchievementBadgeFrame 
                    achievementId={badge.id} 
                    tier={badge.tier} 
                    isUnlocked={badge.isUnlocked} 
                    size={48} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <strong className="text-slate-900 font-black truncate">
                        {index + 1}. {badge.title}
                      </strong>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-black uppercase ${
                        badge.tier === 'lendario' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        badge.tier === 'ouro' ? 'bg-yellow-100 text-yellow-900 border border-yellow-300' :
                        badge.tier === 'prata' ? 'bg-slate-200 text-slate-800' :
                        'bg-amber-100/70 text-amber-900'
                      }`}>
                        {badge.tier}
                      </span>
                      {isSecret && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-200 text-purple-900 font-black">
                          🔒 Secreta
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {isSecret && !badge.isUnlocked 
                        ? '‘Descubra uma das sequências ocultas ou desfechos especiais da plataforma.’'
                        : badge.requirementHint}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sound and interactive feature callout */}
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950">
          <Volume2 className="w-5 h-5 text-amber-700 shrink-0" />
          <p>
            <strong>Toque sonoro comemorativo:</strong> Ao entrar na aba de Conquistas, clicar em qualquer distintivo conquistado toca um acorde melódico e exibe uma animação comemorativa!
          </p>
        </div>

      </section>

      {/* SECTION 3: DENÚNCIA ANÔNIMA */}
      <section id="guide-section-denuncia" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-300 flex items-center justify-center text-indigo-800 shrink-0 shadow-2xs">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-indigo-800 uppercase tracking-wider">Capítulo 03</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Passo a Passo: Como Fazer uma Denúncia Anônima Segura
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              O formulário é estruturado em etapas simples, rápidas e protegidas para você relatar o ocorrido com total discrição.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">1</span>
            <h3 className="font-extrabold text-sm text-slate-900">Tipologia da Agressão</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Selecione se o fato envolve agressão verbal, física, cyberbullying, fofocas morais, exclusão social ou danos materiais.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">2</span>
            <h3 className="font-extrabold text-sm text-slate-900">Contexto & Local</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informe o turno (manhã, tarde, noite), local (pátio, sala, redes sociais) e frequência com que as agressões acontecem.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">3</span>
            <h3 className="font-extrabold text-sm text-slate-900">Detalhes & Urgência</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Escreva o que aconteceu em suas próprias palavras e escolha o nível de gravidade (Baixa, Média, Alta ou SOS Crítico).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-300 space-y-2 relative">
            <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">4</span>
            <h3 className="font-extrabold text-sm text-indigo-950">Chave de Protocolo</h3>
            <p className="text-xs text-indigo-900 leading-relaxed">
              O sistema gera um código seguro (ex: <code>SEC-2026-8941</code>). Guarde ou copie esse código para acompanhar a resposta!
            </p>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-purple-50 border border-purple-200">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-purple-700 shrink-0" />
            <span className="text-xs text-purple-950 font-medium">
              Pronto para fazer um relato confidencial ou ajudar um amigo?
            </span>
          </div>
          <button
            onClick={() => setActiveTab('report')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-2xs"
          >
            <span>Ir para Denúncia Anônima</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 4: PROTOCOLO & CHAT SEGURO */}
      <section id="guide-section-protocolo" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800 shrink-0 shadow-2xs">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-blue-800 uppercase tracking-wider">Capítulo 04</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Como Acompanhar seu Protocolo e Trocar Mensagens com a Escola
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              O Sentinela permite diálogo anônimo contínuo entre você e a coordenação pedagógica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Status lifecycle */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-purple-700" />
              <span>Significado dos Status do Protocolo:</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-black text-[10px]">NOVO</span>
                <span className="text-slate-600">Relato recebido pelo sistema aguardando primeira triagem da equipe escolar.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-black text-[10px]">EM ANÁLISE</span>
                <span className="text-slate-600">A equipe pedagógica ou conselho já leu e está averiguando o contexto.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-black text-[10px]">AÇÃO EM ANDAMENTO</span>
                <span className="text-slate-600">Providências de mediação, rodas de conversa ou medidas de proteção estão ativas.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-black text-[10px]">RESOLVIDO</span>
                <span className="text-slate-600">Situação mediada com sucesso e arquivada com registro de encerramento seguro.</span>
              </div>
            </div>
          </div>

          {/* Secure 2-way chat */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-blue-950 flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-blue-700" />
                <span>Canal de Mensagens Direto e Confidencial</span>
              </h3>
              <p className="text-xs text-blue-900 leading-relaxed mb-3">
                Dentro do seu protocolo, você pode enviar mensagens adicionais (como novos fatos ou atualizações) e ler respostas enviadas pelos orientadores da escola.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Você não precisa se identificar no chat.</li>
                <li>Pode tirar dúvidas sobre como a situação está sendo conduzida.</li>
                <li>O conselho envia mensagens de acolhimento e orientações práticas.</li>
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('tracker')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs mt-3"
            >
              <Search className="w-4 h-4" />
              <span>Consultar um Código de Protocolo</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: EDUCAÇÃO & QUIZZES */}
      <section id="guide-section-educacao" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 shadow-2xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">Capítulo 05</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Central Educativa: Matriz dos 7 Tipos, Legislação & Quizzes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Conhecimento é a ferramenta mais poderosa para prevenir a intimidação sistemática.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-2xl mb-1">🔍</div>
            <h3 className="font-extrabold text-sm text-slate-900">Matriz dos 7 Tipos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exemplos reais, sinais de alerta e orientações para vítima e testemunha sobre: Verbal, Físico, Moral, Psicológico, Social, Material, Cyberbullying e Sexual.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-2xl mb-1">⚖️</div>
            <h3 className="font-extrabold text-sm text-slate-900">Legislação & Direitos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explicação descomplicada da Lei 13.185/15 e do Art. 146-A da Lei 14.811/24, que enquadra o bullying e o cyberbullying na legislação penal brasileira.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="text-2xl mb-1">🎯</div>
            <h3 className="font-extrabold text-sm text-emerald-950">5 Quizzes Interativos</h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Quizzes rápidos de 5 perguntas cada com feedback imediato. Acerte 80%+ ou 100% para destravar conquistas como <strong>Oráculo do 100%</strong> e <strong>Cérebro Galáctico</strong>!
            </p>
          </div>

        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setActiveTab('education')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <span>Acessar Guia Educativo & Quizzes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 6: APOIO EMOCIONAL & RESPIRAÇÃO */}
      <section id="guide-section-emocional" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-800 shrink-0 shadow-2xs">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-rose-800 uppercase tracking-wider">Capítulo 06</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Apoio Emocional, Chat IA, Sons Relaxantes & Respiração 4-7-8
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ferramentas imediatas para momentos de ansiedade, estresse ou quando você só precisa desabafar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
            <span className="text-2xl">💬</span>
            <h3 className="font-extrabold text-sm text-rose-950">Chat Confidencial com a Sentinela</h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              Converse com a assistente de apoio para organizar ideias, receber palavras de acolhimento e entender como agir diante de uma situação desconfortável.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-3">
            <span className="text-2xl">🧘‍♂️</span>
            <h3 className="font-extrabold text-sm text-teal-950">Respiração Guiada 4-7-8</h3>
            <p className="text-xs text-teal-900 leading-relaxed">
              Inspire por 4 segundos, segure o ar por 7 e solte em 8. Essa técnica cientificamente comprovada acalma os batimentos cardíacos e reduz a ansiedade em minutos.
            </p>
            <button
              onClick={() => setIsBreathingModalOpen(true)}
              className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Abrir Exercício de Respiração</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <span className="text-2xl">🌧️</span>
            <h3 className="font-extrabold text-sm text-indigo-950">Paisagens Sonoras Nativas</h3>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Sons sintetizados em tempo real pelo navegador (sem carregar arquivos pesados): Chuva Calma, Floresta Encantada, Ondas do Mar Suave e Sino Tibetano Zen.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 7: O QUE FAZER EM CADA SITUAÇÃO (DECISION MAP) */}
      <section id="guide-section-situacoes" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 shrink-0 shadow-2xs">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-teal-800 uppercase tracking-wider">Capítulo 07</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Guia Prático: O Que Fazer em Cada Situação?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Caminhos recomendados para agir com segurança e inteligência emocional.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xl mb-1">🚨</div>
              <h3 className="font-black text-sm text-slate-900">"Estou sofrendo bullying"</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Não reaja com violência física. Salve mensagens ou prints se for online, conte para um adulto de confiança e envie um relato seguro com protocolo.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('report')}
              className="mt-3 w-full py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 transition-all"
            >
              Fazer Relato Anônimo
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xl mb-1">👀</div>
              <h3 className="font-black text-sm text-slate-900">"Vi um colega sofrendo"</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Não ria nem repasse piadas tóxicas. Chame o colega para perto, ofereça companhia no recreio e faça uma denúncia como 'Testemunha'.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('report')}
              className="mt-3 w-full py-2 rounded-xl bg-indigo-600 text-white font-black text-xs hover:bg-indigo-700 transition-all"
            >
              Relatar como Testemunha
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xl mb-1">📱</div>
              <h3 className="font-black text-sm text-slate-900">"Vazaram prints ou memes"</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Tire print com data e horário antes que apaguem. Não responda com ofensas. Bloqueie agressores e reporte o cyberbullying com evidências.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('education')}
              className="mt-3 w-full py-2 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all"
            >
              Ver Dicas de Cyberbullying
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-xl mb-1">😮‍💨</div>
              <h3 className="font-black text-sm text-slate-900">"Estou muito ansioso(a)"</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Faça a respiração 4-7-8, coloque sons de chuva no fone e converse com a Sentinela no chat confidencial para desabafar.
              </p>
            </div>
            <button
              onClick={() => setIsBreathingModalOpen(true)}
              className="mt-3 w-full py-2 rounded-xl bg-teal-600 text-white font-black text-xs hover:bg-teal-700 transition-all"
            >
              Acalmar com Respiração
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 8: FAQ & MITOS VS FATOS */}
      <section id="guide-section-faq" className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 shrink-0 shadow-2xs">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-purple-800 uppercase tracking-wider">Capítulo 08</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Perguntas Frequentes (FAQ) & Mitos vs. Fatos
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tire todas as suas dúvidas sobre segurança, sigilo e funcionamento da plataforma.
            </p>
          </div>
        </div>

        {/* Accordion FAQs */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="border border-purple-200/80 rounded-2xl overflow-hidden transition-all bg-purple-50/20"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-xs sm:text-sm text-slate-900 hover:bg-purple-50/80 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 text-xs flex items-center justify-center font-black shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.q}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-purple-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100 pt-3 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Emergency Footnote */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-red-950">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <strong className="block font-black">Canais Gratuitos de Ajuda Imediata:</strong>
              <span>CVV 188 (Apoio Emocional 24h) • Disque 100 (Direitos Humanos) • Polícia 190 (Emergências)</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('support')}
            className="px-4 py-2 rounded-xl bg-red-600 text-white font-black text-xs hover:bg-red-700 transition-all shrink-0 cursor-pointer"
          >
            Acessar Rede de Apoio
          </button>
        </div>

      </section>

    </div>
  );
};

function ClockIcon(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

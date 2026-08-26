import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Send, 
  Search, 
  HeartHandshake, 
  BarChart3, 
  Wind, 
  PhoneCall, 
  CheckCircle, 
  ArrowRight,
  Lock,
  Sparkles,
  Heart,
  MessageSquareWarning,
  Trophy,
  Award,
  Compass
} from 'lucide-react';
import { useApp } from './AppContext';

export const HomeHero: React.FC = () => {
  const { setActiveTab, setIsLoadingScreen, achievements } = useApp();
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800">
      
      {/* Hero Header */}
      <div className="text-center max-w-5xl mx-auto mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>Plataforma Oficial de Acolhimento e Prevenção Escolar</span>
          </div>

          <button
            onClick={() => setActiveTab('guide')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 hover:bg-purple-200 border border-purple-300 text-purple-950 text-xs font-extrabold shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Ver o Guia e Tutorial completo do site"
          >
            <Compass className="w-3.5 h-3.5 text-purple-700" />
            <span>Guia do Site & Conquistas</span>
          </button>

          <button
            onClick={() => setIsLoadingScreen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Assistir à animação ilustrada de acolhimento"
          >
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
            <span>Ver Animação da Solidariedade</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
          Sua voz protegida. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent">
            Um ambiente escolar seguro para todos.
          </span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl lg:max-w-4xl mx-auto mb-10 font-normal">
          Identifique diferentes tipos de agressão, denuncie com <strong>sigilo absoluto e sem cadastro</strong>, receba acolhimento emocional em tempo real e acompanhe as respostas da coordenação escolar.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => setActiveTab('simulations')}
            className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base px-7 py-4 rounded-2xl flex items-center gap-2.5 shadow-md shadow-purple-500/25 transition-all active:scale-95 cursor-pointer ring-2 ring-purple-300/60"
          >
            <Sparkles className="w-5 h-5 text-purple-200" />
            <span>Simulações Interativas 🎭</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className="bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-sm sm:text-base px-7 py-4 rounded-2xl flex items-center gap-2.5 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-5 h-5 text-purple-300" />
            <span>Fazer Denúncia Anônima</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className="bg-purple-100/90 hover:bg-purple-200 text-purple-950 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl flex items-center gap-2 border border-purple-300 shadow-xs transition-all cursor-pointer"
          >
            <Compass className="w-5 h-5 text-purple-800" />
            <span>Guia & Como Usar</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className="bg-white hover:bg-purple-50 text-slate-800 font-bold text-sm sm:text-base px-6 py-4 rounded-2xl flex items-center gap-2 border border-purple-200 shadow-xs transition-all cursor-pointer"
          >
            <HeartHandshake className="w-5 h-5 text-purple-600" />
            <span>Apoio Emocional</span>
          </button>
        </div>
      </div>

      {/* Feature Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14 w-full max-w-full">
        
        {/* Card 1: Education */}
        <div 
          onClick={() => setActiveTab('education')}
          className="bg-white hover:bg-purple-50/40 border border-purple-200/90 hover:border-purple-400 rounded-3xl p-6 transition-all group cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between min-w-0"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-purple-800 transition-colors">
              Guia & Quizzes Educativos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Aprenda a reconhecer os 7 tipos de bullying, teste seus conhecimentos nos Quizzes Anti-Bullying, conheça as leis e desbloqueie conquistas na plataforma.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 pt-2 border-t border-purple-100">
            <span>Explorar Guia & Quizzes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Anonymous Report & Protocol */}
        <div 
          onClick={() => setActiveTab('report')}
          className="bg-white hover:bg-purple-50/40 border border-purple-200/90 hover:border-purple-400 rounded-3xl p-6 transition-all group cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-800 mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-purple-800 transition-colors">
              Denúncia 100% Anônima
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Escolha as tipologias de agressão, frequência temporal e local do incidente. Você recebe uma chave privada de protocolo para dialogar com o conselho escolar.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 pt-2 border-t border-purple-100">
            <span>Abrir Formulário Protegido</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Support & Analytics */}
        <div 
          onClick={() => setActiveTab('support')}
          className="bg-white hover:bg-purple-50/40 border border-purple-200/90 hover:border-purple-400 rounded-3xl p-6 transition-all group cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-purple-700 mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-purple-800 transition-colors">
              Acolhimento & Descompressão
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Chat empático com assistente socioemocional, sons relaxantes sintetizados (chuva, ondas, vento, sino zen), ferramenta de respiração guiada 4-7-8 e redes de proteção (CVV 188).
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 pt-2 border-t border-purple-100">
            <span>Conversar Agora</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Achievements Incentive Strip */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-base text-slate-900">
                Sistema de Conquistas Educativas & Badges
              </h4>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                {unlockedCount}/{totalCount} Desbloqueadas
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Aprenda sobre direitos, segurança escolar, empatia e autocuidado para conquistar insígnias e fortalecer nossa comunidade.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('achievements')}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-xs flex items-center justify-center gap-2 shrink-0 border border-purple-300 transition-all active:scale-95 cursor-pointer"
        >
          <Award className="w-4 h-4 text-purple-800" />
          <span>Ver Minhas Conquistas</span>
        </button>
      </div>

      {/* Quick Protocol Lookup Strip */}
      <div className="bg-gradient-to-r from-purple-100/70 via-indigo-50/80 to-purple-100/70 border border-purple-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-200/80 text-purple-900 flex items-center justify-center flex-shrink-0 shadow-xs">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
              Já fez uma denúncia? Acompanhe o Protocolo
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Verifique as medidas adotadas pela equipe pedagógica e troque mensagens em sigilo.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('tracker')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center gap-2 flex-shrink-0 shadow-xs transition-all active:scale-95"
        >
          <Search className="w-4 h-4" />
          <span>Consultar Meu Protocolo</span>
        </button>
      </div>

      {/* Trust & Legal Banner Footer */}
      <div className="mt-12 pt-8 border-t border-purple-200 text-center text-xs text-slate-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5 text-slate-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Em conformidade com a <strong>Lei Federal nº 13.185/2015</strong> e <strong>Lei nº 14.811/2024</strong> (Tipificação do Bullying e Cyberbullying).</span>
        </p>
        <p className="text-[11px] text-slate-500">
          Protegido por protocolos de anonimato inviolável. Não rastreamos endereços IP ou identificadores de aparelho.
        </p>
      </div>

    </div>
  );
};

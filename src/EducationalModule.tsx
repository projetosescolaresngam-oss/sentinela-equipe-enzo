import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  MessageSquareWarning, 
  Smartphone, 
  ShieldAlert, 
  Brain, 
  Users, 
  PackageX, 
  HeartHandshake, 
  CheckCircle, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle,
  ArrowRight,
  Send,
  Trophy,
  CheckCircle2,
  Sparkles,
  Heart,
  Target,
  Play
} from 'lucide-react';
import { BULLYING_TYPES_INFO } from './educationalData';
import { EDUCATIONAL_QUIZZES } from './quizData';
import { BullyingCategory, UserQuizProgress } from './types';
import { useApp } from './AppContext';
import { AchievementsView } from './AchievementsView';
import { QuizModule } from './QuizModule';
import { smoothScrollToElement } from './utils/scrollHelper';
import { useScrollIntoView } from './hooks/useScrollIntoView';

export const EducationalModule: React.FC = () => {
  const { 
    setActiveTab, 
    achievements, 
    educationalProgress, 
    markActivityCompleted 
  } = useApp();

  const { center } = useScrollIntoView({ topOffset: 80, behavior: 'smooth' });

  const [selectedType, setSelectedType] = useState<BullyingCategory>('verbal');
  const [activeTabSub, setActiveTabSub] = useState<'types' | 'quiz' | 'legislation' | 'achievements'>('types');
  const [selectedQuizId, setSelectedQuizId] = useState<string | undefined>(undefined);

  const totalAchievements = achievements.length;
  const unlockedAchievementsCount = achievements.filter(a => a.isUnlocked).length;

  const quizzesProgress = educationalProgress.quizzesProgress || {};
  const totalCompletedQuizzes = (Object.values(quizzesProgress) as UserQuizProgress[]).filter(q => q.completed).length;
  const totalAvailableQuizzes = EDUCATIONAL_QUIZZES.length;

  const currentTypeInfo = BULLYING_TYPES_INFO.find(t => t.id === selectedType) || BULLYING_TYPES_INFO[0];

  // Automatically register explored type
  useEffect(() => {
    markActivityCompleted('exploredBullyingType', selectedType);
  }, [selectedType]);

  const getIcon = (id: BullyingCategory) => {
    switch (id) {
      case 'verbal': return <MessageSquareWarning className="w-5 h-5" />;
      case 'cyberbullying': return <Smartphone className="w-5 h-5" />;
      case 'fisico': return <ShieldAlert className="w-5 h-5" />;
      case 'psicologico': return <Brain className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      case 'material': return <PackageX className="w-5 h-5" />;
      case 'sexual': return <HeartHandshake className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleCompleteLaws = () => {
    markActivityCompleted('viewedLaws');
  };

  const handleCompleteRespectModule = () => {
    markActivityCompleted('completedRespectModule');
  };

  const handleOpenSpecificQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setActiveTabSub('quiz');
    smoothScrollToElement('#educational-subtab-container', { position: 'top', delay: 50 });
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-purple-700" />
          Guia Educativo e Conscientização
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Identifique os Tipos de Bullying e Saiba Como Reagir
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Conhecimento é a primeira linha de defesa. Entenda as diferentes formas de agressão sistemática, teste seus conhecimentos nos quizzes educativos, conheça seus direitos e desbloqueie conquistas.
        </p>

        {/* Sub Navigation */}
        <div id="educational-subtab-container" className="flex justify-center mt-6 overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex bg-white border border-purple-200/90 p-1.5 rounded-2xl gap-1 shrink-0 shadow-xs">
            <button
              onClick={() => {
                setActiveTabSub('types');
                setSelectedQuizId(undefined);
                smoothScrollToElement('#educational-subtab-container', { position: 'top', delay: 40 });
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTabSub === 'types'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
              }`}
            >
              Matriz dos 7 Tipos
            </button>

            <button
              onClick={() => {
                setActiveTabSub('quiz');
                setSelectedQuizId(undefined);
                smoothScrollToElement('#educational-subtab-container', { position: 'top', delay: 40 });
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTabSub === 'quiz'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-950 bg-purple-50/80 hover:bg-purple-100'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-purple-700" />
              <span>Quiz Anti-Bullying</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTabSub === 'quiz' ? 'bg-white/20 text-white' : 'bg-purple-200 text-purple-900'
              }`}>
                {totalCompletedQuizzes}/{totalAvailableQuizzes}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTabSub('legislation');
                setSelectedQuizId(undefined);
                smoothScrollToElement('#educational-subtab-container', { position: 'top', delay: 40 });
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTabSub === 'legislation'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
              }`}
            >
              Leis e Proteção Legal
            </button>

            <button
              onClick={() => {
                setActiveTabSub('achievements');
                setSelectedQuizId(undefined);
                smoothScrollToElement('#educational-subtab-container', { position: 'top', delay: 40 });
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTabSub === 'achievements'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-900 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Minhas Conquistas</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTabSub === 'achievements' ? 'bg-white/20 text-white' : 'bg-purple-200 text-purple-900'
              }`}>
                {unlockedAchievementsCount}/{totalAchievements}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTabSub === 'types' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full">
          
          {/* Category Selector */}
          <div className="lg:col-span-4 bg-white p-3.5 rounded-3xl border border-purple-200/90 shadow-xs min-w-0 max-w-full overflow-hidden">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Categorias de Bullying:
              </span>
              <span className="text-[10px] text-purple-800 font-bold lg:hidden">
                ← Deslize para ver todas as 7 abas →
              </span>
            </div>

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory touch-pan-x w-full max-w-full">
              {BULLYING_TYPES_INFO.map((item) => {
                const isSelected = selectedType === item.id;
                const isExplored = educationalProgress.exploredBullyingTypes.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedType(item.id);
                      center('#bullying-type-detail-card', 30);
                    }}
                    className={`snap-start shrink-0 lg:w-full min-w-[210px] sm:min-w-[240px] lg:min-w-0 text-left p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-100/90 border-purple-400 text-slate-950 font-bold shadow-xs ring-1 ring-purple-400/50'
                        : 'bg-purple-50/40 border-purple-100 text-slate-700 hover:bg-purple-100/50 hover:text-slate-900'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isSelected ? 'bg-purple-600 text-white font-black' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {getIcon(item.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-xs sm:text-sm truncate text-slate-900">{item.name}</h3>
                        {isExplored && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-label="Módulo explorado" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{item.shortDesc}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-purple-800 translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Card */}
          <div id="bullying-type-detail-card" className="lg:col-span-8 bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs min-w-0 max-w-full overflow-hidden">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-800 shadow-2xs">
                  {getIcon(currentTypeInfo.id)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {currentTypeInfo.name}
                  </h2>
                  <span className="text-xs text-purple-800 font-bold">{currentTypeInfo.legalReference}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('report')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Denunciar este Tipo</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">O que define este tipo de bullying:</h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-purple-50/50 p-4 rounded-2xl border border-purple-200/60">
                {currentTypeInfo.fullDesc}
              </p>
            </div>

            {/* Examples & Warning Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50/60 border border-purple-200/70 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-purple-900 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-purple-700" />
                  Exemplos Comuns no Dia a Dia:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentTypeInfo.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/70 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-rose-900 flex items-center gap-2 mb-3">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  Sinais de Alerta e Impactos:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentTypeInfo.signs.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Matrix: How to React */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-100/50 border border-purple-300/60 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-purple-800" />
                  Como Você (Vítima) Deve Agir:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentTypeInfo.howToReactVictim.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-700 mt-0.5 flex-shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-2 mb-3">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  Como Você (Testemunha/Colega) Pode Ajudar:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {currentTypeInfo.howToReactWitness.map((wit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{wit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Quiz Integration Strip for this Module */}
            <div className="bg-gradient-to-r from-purple-100/90 via-indigo-50/90 to-purple-100/90 border border-purple-300/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-purple-800" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-purple-950">
                    Teste Seus Conhecimentos no Quiz
                  </h4>
                  <p className="text-xs text-slate-600">
                    Responda ao quiz sobre {currentTypeInfo.name.toLowerCase()} para reforçar o aprendizado e avançar em suas conquistas.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenSpecificQuiz(
                  currentTypeInfo.id === 'cyberbullying' 
                    ? 'quiz-cyberbullying-digital' 
                    : 'quiz-bullying-fundamentos'
                )}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Fazer Quiz Deste Tema</span>
              </button>
            </div>

            {/* Respect & Empathy Module Banner with Achievement Trigger */}
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-purple-950">
                    Módulo de Respeito, Empatia e Convivência
                  </h4>
                  <p className="text-xs text-slate-600">
                    Entendeu como acolher colegas e intervir com segurança como testemunha ativa?
                  </p>
                </div>
              </div>

              <button
                onClick={handleCompleteRespectModule}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  educationalProgress.completedRespectModule
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs active:scale-95'
                }`}
              >
                {educationalProgress.completedRespectModule ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Concluído ✅</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Marcar como Lido e Compreendido</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Quiz Tab */}
      {activeTabSub === 'quiz' && (
        <QuizModule
          initialQuizId={selectedQuizId}
          onGoToAchievements={() => {
            setActiveTabSub('achievements');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToTab={(tab) => {
            setActiveTabSub(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Legislation & Rights Tab */}
      {activeTabSub === 'legislation' && (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header Action / Status */}
          <div className="bg-gradient-to-r from-purple-100/90 via-indigo-50/90 to-purple-100/90 border border-purple-300/80 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-purple-950">
                  Módulo de Legislação e Direitos Protegidos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Conheça seus direitos fundamentais e o que diz a lei brasileira contra o bullying.
                </p>
              </div>
            </div>

            <button
              onClick={handleCompleteLaws}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                educationalProgress.viewedLaws
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-2xs'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs active:scale-95'
              }`}
            >
              {educationalProgress.viewedLaws ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Leitura de Direitos Concluída ✅</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Marcar Módulo como Lido</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            <h3 className="text-xl font-extrabold text-purple-950 mb-2">Lei Federal nº 13.185/2015</h3>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Institui o <strong>Programa de Combate à Intimidação Sistemática (Bullying)</strong> em todo o território nacional. A lei estabelece que as instituições de ensino têm o dever legal de implementar medidas de conscientização, prevenção, diagnose e combate à violência e à intimidação sistemática.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
                <span className="text-slate-900 font-bold block mb-1">Dever da Escola</span>
                Garantir canais confidenciais e ações educativas interdisciplinares.
              </div>
              <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
                <span className="text-slate-900 font-bold block mb-1">Sem Punição Retaliatória</span>
                Foco no acolhimento da vítima e na reeducação social do agressor.
              </div>
            </div>
          </div>

          <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
            <h3 className="text-xl font-extrabold text-purple-950 mb-2">Lei nº 14.811/2024 (Código Penal)</h3>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Tipifica expressamente o <strong>Bullying</strong> (Art. 146-A) e o <strong>Cyberbullying</strong> (Art. 146-A, Parágrafo Único) no Código Penal Brasileiro, prevendo penas severas para crimes cometidos por meio de redes sociais, transmissões em tempo real ou ambientes virtuais de acesso público.
            </p>
            <div className="bg-purple-100/60 border border-purple-300/80 p-4 rounded-2xl text-xs text-purple-950 font-medium leading-relaxed mb-6">
              O ambiente virtual <strong>não é terra sem lei</strong>. Publicações difamatórias, figurinhas ofensivas e ataques em grupos deixam rastros digitais auditáveis e acarretam responsabilização dos envolvidos e de seus responsáveis legais.
            </div>

            {/* Quick Quiz Shortcut */}
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Quiz de Leis e Direitos</h4>
                <p className="text-xs text-slate-600">Teste seus conhecimentos sobre o marco legal e canais de proteção.</p>
              </div>
              <button
                onClick={() => handleOpenSpecificQuiz('quiz-direitos-legislacao')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Fazer Quiz de Legislação</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Achievements Sub Tab */}
      {activeTabSub === 'achievements' && (
        <AchievementsView 
          onNavigateToTab={(tab) => {
            setActiveTabSub(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      )}

    </div>
  );
};

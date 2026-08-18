import React, { useState } from 'react';
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
  Send
} from 'lucide-react';
import { BULLYING_TYPES_INFO, QUIZ_QUESTIONS } from './educationalData';
import { BullyingCategory } from './types';
import { useApp } from './AppContext';

export const EducationalModule: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedType, setSelectedType] = useState<BullyingCategory>('verbal');
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [activeTabSub, setActiveTabSub] = useState<'types' | 'quiz' | 'legislation'>('types');

  const currentTypeInfo = BULLYING_TYPES_INFO.find(t => t.id === selectedType) || BULLYING_TYPES_INFO[0];

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

  const handleQuizAnswer = (points: number) => {
    const newScore = quizScore + points;
    setQuizScore(newScore);
    if (quizStep + 1 < QUIZ_QUESTIONS.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-purple-950 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-purple-700" />
          Guia Educativo e Conscientização
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Identifique os Tipos de Bullying e Saiba Como Reagir
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Conhecimento é a primeira linha de defesa. Entenda as diferentes formas de agressão sistemática, conheça seus direitos e aprenda estratégias seguras para se proteger e apoiar seus colegas.
        </p>

        {/* Sub Navigation */}
        <div className="flex justify-center mt-6 overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex bg-white border border-purple-200/90 p-1.5 rounded-2xl gap-1 shrink-0 shadow-xs">
            <button
              onClick={() => setActiveTabSub('types')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTabSub === 'types'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
              }`}
            >
              Matriz dos 7 Tipos
            </button>
            <button
              onClick={() => setActiveTabSub('quiz')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTabSub === 'quiz'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
              }`}
            >
              Autoavaliação Rápida
            </button>
            <button
              onClick={() => setActiveTabSub('legislation')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTabSub === 'legislation'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-purple-50'
              }`}
            >
              Leis e Proteção Legal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTabSub === 'types' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full max-w-full">
          
          {/* Category Selector (Horizontal Scroll Row on Mobile & Sidebar on Desktop) */}
          <div className="lg:col-span-4 bg-white p-3.5 rounded-3xl border border-purple-200/90 shadow-xs min-w-0 max-w-full overflow-hidden">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Categorias de Bullying:
              </span>
              <span className="text-[10px] text-purple-800 font-bold lg:hidden">
                ← Deslize para ver todas as 7 abas →
              </span>
            </div>

            {/* Responsive Row (Horizontal on Mobile / Vertical on Desktop) */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none snap-x snap-mandatory touch-pan-x w-full max-w-full">
              {BULLYING_TYPES_INFO.map((item) => {
                const isSelected = selectedType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedType(item.id)}
                    className={`snap-start shrink-0 lg:w-full min-w-[210px] sm:min-w-[240px] lg:min-w-0 text-left p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${
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
                      <h3 className="font-bold text-xs sm:text-sm truncate text-slate-900">{item.name}</h3>
                      <p className="text-[11px] text-slate-500 truncate">{item.shortDesc}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-purple-800 translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-8 bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs min-w-0 max-w-full overflow-hidden">
            
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

              <button
                onClick={() => setActiveTab('report')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-xs active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Denunciar este Tipo</span>
              </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          </div>

        </div>
      )}

      {/* Quiz Tab */}
      {activeTabSub === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-xs">
          {!quizCompleted ? (
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100">
                <div className="flex items-center gap-2 text-purple-800 text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-purple-700" />
                  <span>Pergunta {quizStep + 1} de {QUIZ_QUESTIONS.length}</span>
                </div>
                <div className="w-32 bg-purple-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full transition-all duration-300"
                    style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-6 text-slate-900">
                {QUIZ_QUESTIONS[quizStep].question}
              </h3>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt.points)}
                    className="w-full text-left p-4 rounded-2xl bg-purple-50/50 hover:bg-purple-100/70 border border-purple-200 text-slate-800 transition-all text-sm flex items-center justify-between group shadow-2xs"
                  >
                    <span className="font-medium">{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-800 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-900 mx-auto mb-4 shadow-2xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">Resultado da Avaliação</h3>
              
              {quizScore >= 6 ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6 text-left">
                  <h4 className="font-bold text-rose-900 text-sm mb-1">
                    ⚠️ Sinais Claros de Intimidação Sistemática (Bullying)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Suas respostas indicam que você está vivenciando situações repetitivas de sofrimento ou hostilidade que violam seus direitos. É fundamental registrar um relato anônimo para que a escola possa agir e oferecer proteção imediata.
                  </p>
                </div>
              ) : quizScore >= 2 ? (
                <div className="bg-purple-50 border border-purple-300 rounded-2xl p-5 mb-6 text-left">
                  <h4 className="font-bold text-purple-900 text-sm mb-1">
                    ⚠️ Conflitos Pontuais com Risco de Agravamento
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Você relatou episódios que merecem atenção preventiva antes que se tornem recorrentes. Converse com um orientador ou envie uma denúncia anônima para mediação pacífica.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 text-left">
                  <h4 className="font-bold text-emerald-900 text-sm mb-1">
                    ✅ Ambiente Geralmente Seguro
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Não foram identificados padrões crônicos de bullying no momento. Continue sendo um parceiro ativo e acolha os colegas que precisarem de apoio.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setActiveTab('report')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Fazer Denúncia Anônima Agora</span>
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors border border-purple-300"
                >
                  Refazer Avaliação
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Legislation & Rights Tab */}
      {activeTabSub === 'legislation' && (
        <div className="max-w-4xl mx-auto space-y-6">
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
            <div className="bg-purple-100/60 border border-purple-300/80 p-4 rounded-2xl text-xs text-purple-950 font-medium leading-relaxed">
              O ambiente virtual <strong>não é terra sem lei</strong>. Publicações difamatórias, figurinhas ofensivas e ataques em grupos deixam rastros digitais auditáveis e acarretam responsabilização dos envolvidos e de seus responsáveis legais.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

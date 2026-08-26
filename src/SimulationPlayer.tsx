import React, { useState, useEffect } from 'react';
import { 
  SimulationScenario, 
  SimulationNode, 
  SimulationChoice, 
  SimulationOutcome,
  OutcomeType 
} from './types';
import { useApp } from './AppContext';
import { 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Brain, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  MessageSquare,
  Award,
  ChevronRight,
  HelpCircle,
  Clock,
  Eye,
  Shield,
  Layers,
  Sparkle
} from 'lucide-react';
import { smoothScrollToElement } from './utils/scrollHelper';

interface SimulationPlayerProps {
  scenario: SimulationScenario;
  onBackToList: () => void;
  onScenarioCompleted?: () => void;
}

export const SimulationPlayer: React.FC<SimulationPlayerProps> = ({
  scenario,
  onBackToList,
  onScenarioCompleted
}) => {
  const { 
    educationalProgress, 
    recordSimulationChoice, 
    recordSimulationOutcome 
  } = useApp();

  // Navigation / Node state
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.initialNodeId);
  const [historySteps, setHistorySteps] = useState<{
    node: SimulationNode;
    selectedChoice: SimulationChoice;
  }[]>([]);
  const [currentOutcome, setCurrentOutcome] = useState<SimulationOutcome | null>(null);

  // Animation / Transition state
  const [activeConsequence, setActiveConsequence] = useState<{
    text: string;
    choice: SimulationChoice;
    nextNodeId: string;
  } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Cumulative metrics for current run
  const [currentRunMetrics, setCurrentRunMetrics] = useState<{
    decision: number;
    empathy: number;
    safety: number;
  }>({
    decision: 0,
    empathy: 0,
    safety: 0
  });

  const currentNode = scenario.nodes[currentNodeId];
  const exploredOutcomes = educationalProgress.exploredSimulationOutcomes?.[scenario.id] || [];

  // Reset to initial state
  const handleRestart = () => {
    setCurrentNodeId(scenario.initialNodeId);
    setHistorySteps([]);
    setCurrentOutcome(null);
    setActiveConsequence(null);
    setCurrentRunMetrics({ decision: 0, empathy: 0, safety: 0 });
    smoothScrollToElement('#simulation-stage-card', { position: 'top', delay: 40 });
  };

  // Handle user making a choice
  const handleSelectChoice = (choice: SimulationChoice) => {
    if (isTransitioning || activeConsequence) return;

    // Record in global AppContext
    recordSimulationChoice(scenario.id, choice.tone);

    // Update current run metrics
    const delta = choice.metricImpact || { decision: 25, empathy: 25, safety: 25 };
    setCurrentRunMetrics(prev => ({
      decision: Math.min(100, prev.decision + (delta.decision || 20)),
      empathy: Math.min(100, prev.empathy + (delta.empathy || 20)),
      safety: Math.min(100, prev.safety + (delta.safety || 20))
    }));

    // Show consequence banner briefly with smooth step
    setActiveConsequence({
      text: choice.consequenceText,
      choice,
      nextNodeId: choice.nextNodeId
    });

    smoothScrollToElement('#consequence-transition-banner', { position: 'center', delay: 50 });
  };

  // Advance to next step or final outcome
  const handleProceedAfterConsequence = () => {
    if (!activeConsequence) return;

    setIsTransitioning(true);
    const { choice, nextNodeId } = activeConsequence;

    if (currentNode) {
      setHistorySteps(prev => [...prev, { node: currentNode, selectedChoice: choice }]);
    }

    // Check if nextNodeId is an outcome or another node
    if (scenario.outcomes[nextNodeId]) {
      // Reached an outcome
      const outcome = scenario.outcomes[nextNodeId];
      setCurrentOutcome(outcome);
      setActiveConsequence(null);
      setIsTransitioning(false);

      // Record final outcome in AppContext
      recordSimulationOutcome(scenario.id, outcome.id, outcome.type);
      if (onScenarioCompleted) {
        onScenarioCompleted();
      }

      smoothScrollToElement('#simulation-outcome-card', { position: 'top', delay: 60 });
    } else if (scenario.nodes[nextNodeId]) {
      // Advance to next question node
      setCurrentNodeId(nextNodeId);
      setActiveConsequence(null);
      setIsTransitioning(false);

      smoothScrollToElement('#simulation-stage-card', { position: 'top', delay: 60 });
    } else {
      // Fallback: pick first outcome if id not found
      const firstOutcome = Object.values(scenario.outcomes)[0] as SimulationOutcome | undefined;
      if (firstOutcome) {
        setCurrentOutcome(firstOutcome);
        setActiveConsequence(null);
        setIsTransitioning(false);
        recordSimulationOutcome(scenario.id, firstOutcome.id, firstOutcome.type);
      }
    }
  };

  const getToneBadge = (tone: SimulationChoice['tone']) => {
    switch (tone) {
      case 'empatia':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-full">
            <Heart className="w-3 h-3 fill-emerald-500 text-emerald-600" />
            Empatia & Acolhimento
          </span>
        );
      case 'seguranca':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-100/90 border border-indigo-300 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-indigo-600" />
            Segurança & Apoio
          </span>
        );
      case 'arriscado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100/90 border border-rose-300 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            Risco & Impulso
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full">
            <Compass className="w-3 h-3 text-slate-500" />
            Neutro / Observação
          </span>
        );
    }
  };

  const getOutcomeTheme = (type: OutcomeType) => {
    switch (type) {
      case 'positivo':
        return {
          bgBadge: 'bg-emerald-100 border-emerald-300 text-emerald-900',
          cardBorder: 'border-emerald-300 shadow-emerald-500/10',
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
          titleColor: 'text-emerald-950',
          gradientBg: 'from-emerald-500/15 via-teal-500/5 to-white',
          badgeText: '🟢 Final Positivo: Solução Segura & Empática'
        };
      case 'aprendizado':
        return {
          bgBadge: 'bg-amber-100 border-amber-300 text-amber-900',
          cardBorder: 'border-amber-300 shadow-amber-500/10',
          icon: <Info className="w-6 h-6 text-amber-600" />,
          titleColor: 'text-amber-950',
          gradientBg: 'from-amber-500/15 via-orange-500/5 to-white',
          badgeText: '🟡 Final de Aprendizado: Reflexão & Mudança'
        };
      case 'alerta':
        return {
          bgBadge: 'bg-rose-100 border-rose-300 text-rose-900',
          cardBorder: 'border-rose-300 shadow-rose-500/10',
          icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
          titleColor: 'text-rose-950',
          gradientBg: 'from-rose-500/15 via-red-500/5 to-white',
          badgeText: '🔴 Final de Alerta: Consequências & Prevenção'
        };
    }
  };

  const currentStepNum = historySteps.length + 1;
  const estimatedTotalSteps = currentNode?.totalStepsEstimated || 3;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in text-slate-800">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-200/80">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-slate-700 hover:text-purple-900 font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-purple-700" />
          <span>Voltar para Todas as Simulações</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-purple-50/80 px-3 py-1.5 rounded-xl border border-purple-200/60">
            <Layers className="w-3.5 h-3.5 text-purple-700" />
            <span>Finais Descobertos:</span>
            <strong className="text-purple-950 font-bold">
              {exploredOutcomes.length} de {scenario.totalPossibleOutcomes}
            </strong>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
            title="Reiniciar esta simulação desde o início"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Scenario Title Header */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-5 sm:p-7 shadow-xs mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl from-purple-200/40 via-indigo-100/20 to-transparent pointer-events-none rounded-tr-3xl" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider">
                Situação {scenario.scenarioNumber.toString().padStart(2, '0')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                {scenario.themeLabel}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {scenario.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              {scenario.subtitle}
            </p>
          </div>

          {/* Stepper Progress indicator */}
          {!currentOutcome && (
            <div className="bg-purple-50/90 border border-purple-200/80 px-4 py-3 rounded-2xl flex flex-col items-center sm:items-end justify-center shrink-0">
              <div className="flex items-center gap-1.5 mb-1.5">
                {[...Array(Math.max(3, estimatedTotalSteps))].map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i + 1 < currentStepNum
                        ? 'bg-purple-600 scale-100'
                        : i + 1 === currentStepNum
                        ? 'bg-purple-700 ring-4 ring-purple-200 scale-110'
                        : 'bg-purple-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-purple-950">
                Decisão {currentStepNum} de ~{estimatedTotalSteps}
              </span>
            </div>
          )}
        </div>

        {/* Characters involved bar */}
        <div className="mt-4 pt-4 border-t border-purple-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Personagens:</span>
          {scenario.characters.map((char, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700"
            >
              <span>{char.avatarEmoji}</span>
              <strong className="font-bold text-slate-900">{char.name}</strong>
              <span className="text-[10px] text-slate-500">({char.role})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE STAGE / INTERACTIVE NODE */}
      {/* ========================================================================= */}
      {!currentOutcome && currentNode && (
        <div id="simulation-stage-card" className="space-y-6">
          
          {/* Main Narrative Card */}
          <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-100/90 border border-purple-300 px-3 py-1 rounded-full">
                <Compass className="w-3.5 h-3.5 text-purple-700" />
                {currentNode.locationTag}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Etapa {currentNode.stepNumber}
              </span>
            </div>

            {/* Narrative text */}
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal mb-6">
              {currentNode.narrative}
            </p>

            {/* Dialogues section if present */}
            {currentNode.dialogues && currentNode.dialogues.length > 0 && (
              <div className="space-y-3 mb-6 bg-purple-50/40 border border-purple-100 p-4 sm:p-5 rounded-2xl">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                  Diálogos no Momento
                </div>
                {currentNode.dialogues.map((dlg, dIdx) => (
                  <div
                    key={dIdx}
                    className={`flex items-start gap-3 ${
                      dlg.isUser ? 'flex-row-reverse text-right' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-purple-200 flex items-center justify-center text-base shrink-0 shadow-2xs">
                      {dlg.avatarEmoji || '💬'}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${
                        dlg.isUser
                          ? 'bg-purple-600 text-white rounded-tr-none font-medium'
                          : 'bg-white border border-purple-200 text-slate-800 rounded-tl-none font-normal shadow-2xs'
                      }`}
                    >
                      <div
                        className={`text-[11px] font-bold mb-1 ${
                          dlg.isUser ? 'text-purple-200' : 'text-purple-900'
                        }`}
                      >
                        {dlg.characterName}
                      </div>
                      <p>{dlg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prompt Question */}
            <div className="pt-4 border-t border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-800 font-black text-xs">
                  ?
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {currentNode.promptQuestion}
                </h3>
              </div>

              {/* Choices Interactive Cards */}
              {!activeConsequence ? (
                <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                  {currentNode.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice)}
                      className="group text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-purple-50/70 border border-purple-200/90 hover:border-purple-500 shadow-2xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-start gap-3.5 relative overflow-hidden"
                    >
                      <span className="text-xl sm:text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {choice.iconEmoji || '🔘'}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          {getToneBadge(choice.tone)}
                        </div>
                        <p className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-purple-950 transition-colors leading-relaxed">
                          {choice.text}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                    </button>
                  ))}
                </div>
              ) : (
                /* Consequence Interstitial Banner */
                <div
                  id="consequence-transition-banner"
                  className="bg-purple-50 border-2 border-purple-400/90 rounded-2xl p-5 sm:p-6 animate-fade-in shadow-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-950 mb-3">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    <span>Consequência da Sua Escolha</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-purple-200 text-xs sm:text-sm text-slate-800 mb-4 font-semibold leading-relaxed">
                    <span className="text-slate-500 font-medium block mb-1 text-[11px]">
                      Sua decisão:
                    </span>
                    "{activeConsequence.choice.text}"
                  </div>

                  <div className="p-4 rounded-xl bg-purple-100/90 border border-purple-300 text-purple-950 text-xs sm:text-base font-bold leading-relaxed mb-5">
                    {activeConsequence.text}
                  </div>

                  <button
                    onClick={handleProceedAfterConsequence}
                    className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Continuar a História</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* History of Previous Choices (Scannable Path) */}
          {historySteps.length > 0 && (
            <div className="bg-white/70 border border-purple-100 rounded-2xl p-4 sm:p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-700" />
                <span>Caminho Percorrido Até Aqui:</span>
              </div>
              <div className="space-y-2">
                {historySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-slate-700 bg-white border border-purple-100 p-2.5 rounded-xl"
                  >
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-500 font-medium truncate max-w-[200px] sm:max-w-none">
                      {step.node.locationTag}:
                    </span>
                    <strong className="text-slate-900 truncate flex-1 font-semibold">
                      {step.selectedChoice.text}
                    </strong>
                    {getToneBadge(step.selectedChoice.tone)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* FINAL OUTCOME & PEDAGOGICAL DEBRIEF */}
      {/* ========================================================================= */}
      {currentOutcome && (
        <div id="simulation-outcome-card" className="space-y-6 animate-fade-in">
          
          {/* Main Outcome Card */}
          {(() => {
            const theme = getOutcomeTheme(currentOutcome.type);
            return (
              <div
                className={`bg-white border-2 ${theme.cardBorder} rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden`}
              >
                <div
                  className={`absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl ${theme.gradientBg} pointer-events-none rounded-tr-3xl`}
                />

                {/* Outcome Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider ${theme.bgBadge}`}
                    >
                      {theme.icon}
                      {theme.badgeText}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      🎭 Simulação Concluída
                    </span>
                  </div>

                  <h2
                    className={`text-2xl sm:text-4xl font-black ${theme.titleColor} tracking-tight mb-3`}
                  >
                    {currentOutcome.title}
                  </h2>

                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                    {currentOutcome.narrativeResult}
                  </p>
                </div>

                {/* 4 Pillars of Pedagogical Debrief */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  
                  {/* 1. O que aconteceu */}
                  <div className="bg-slate-50/90 border border-slate-200/90 p-4 sm:p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                      <span className="text-base">📌</span>
                      <span>O Que Aconteceu</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {currentOutcome.whatHappened}
                    </p>
                  </div>

                  {/* 2. Por que suas escolhas tiveram essas consequências */}
                  <div className="bg-purple-50/70 border border-purple-200/80 p-4 sm:p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-purple-950 uppercase tracking-wider mb-2">
                      <span className="text-base">🧠</span>
                      <span>Por Que Suas Escolhas Tiveram Esse Efeito</span>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-normal">
                      {currentOutcome.whyChoicesLedHere}
                    </p>
                  </div>

                  {/* 3. Qual comportamento é considerado mais seguro */}
                  <div className="bg-indigo-50/70 border border-indigo-200/80 p-4 sm:p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950 uppercase tracking-wider mb-2">
                      <span className="text-base">🛡️</span>
                      <span>Comportamento Mais Seguro Recomendado</span>
                    </div>
                    <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-normal">
                      {currentOutcome.saferBehaviorAdvice}
                    </p>
                  </div>

                  {/* 4. O que você aprendeu */}
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950 uppercase tracking-wider mb-2">
                      <span className="text-base">🤝</span>
                      <span>O Que Você Aprendeu (Síntese)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal">
                      {currentOutcome.coreLearning}
                    </p>
                  </div>
                </div>

                {/* Discrete Personal Growth Indicators (No rankings, no competition) */}
                <div className="bg-purple-950 text-white rounded-2xl p-5 sm:p-6 mb-8 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-purple-300" />
                        <span>Seus Indicadores Pessoais Nesta Simulação</span>
                      </h4>
                      <p className="text-[11px] text-purple-300">
                        Indicadores individuais de autodesenvolvimento e reflexão ética.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-200 bg-purple-900/80 px-3 py-1 rounded-full border border-purple-700/60 self-start">
                      Foco no Crescimento
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Decision metric */}
                    <div className="bg-purple-900/60 border border-purple-800 p-3.5 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-purple-200">
                        <span className="flex items-center gap-1.5">
                          <span>🧠</span>
                          Tomada de Decisão
                        </span>
                        <span className="text-purple-100 font-extrabold">
                          {currentOutcome.metrics.decision}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full transition-all duration-500"
                          style={{ width: `${currentOutcome.metrics.decision}%` }}
                        />
                      </div>
                    </div>

                    {/* Empathy metric */}
                    <div className="bg-purple-900/60 border border-purple-800 p-3.5 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-purple-200">
                        <span className="flex items-center gap-1.5">
                          <span>🤝</span>
                          Empatia & Acolhimento
                        </span>
                        <span className="text-purple-100 font-extrabold">
                          {currentOutcome.metrics.empathy}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                          style={{ width: `${currentOutcome.metrics.empathy}%` }}
                        />
                      </div>
                    </div>

                    {/* Safety metric */}
                    <div className="bg-purple-900/60 border border-purple-800 p-3.5 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-purple-200">
                        <span className="flex items-center gap-1.5">
                          <span>🛡️</span>
                          Segurança & Mediação
                        </span>
                        <span className="text-purple-100 font-extrabold">
                          {currentOutcome.metrics.safety}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-500"
                          style={{ width: `${currentOutcome.metrics.safety}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multiverse / Alternative Routes Callout */}
                <div className="bg-purple-50 border border-purple-200 p-4 sm:p-5 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-purple-950 flex items-center gap-1.5 mb-1">
                      <Layers className="w-4 h-4 text-purple-700" />
                      <span>
                        Você descobriu {exploredOutcomes.length} de {scenario.totalPossibleOutcomes} finais possíveis nesta situação.
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Que tal jogar novamente e testar outras decisões para ver caminhos e consequências diferentes?
                    </p>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Explorar Outro Caminho</span>
                  </button>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-purple-100">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-600" />
                    <span>Jogar Novamente Esta Situação</span>
                  </button>

                  <button
                    onClick={onBackToList}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-950 font-black text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
                  >
                    <span>Ver Outras Simulações</span>
                    <ChevronRight className="w-4 h-4 text-purple-800" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

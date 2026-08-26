import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Smartphone, 
  Users, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Trophy, 
  ChevronRight, 
  Compass, 
  Star,
  Info,
  HelpCircle,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';
import { 
  SimulationScenario, 
  SimulationNode, 
  SimulationChoice, 
  SimulationOutcome,
  OutcomeType
} from './types';
import { SIMULATION_SCENARIOS, getScenarioById } from './simulationsData';
import { useApp } from './AppContext';
import { soundEngine } from './relaxingAudio';

interface InteractiveSimulationsViewProps {
  onNavigateToAchievements?: () => void;
}

export const InteractiveSimulationsView: React.FC<InteractiveSimulationsViewProps> = ({
  onNavigateToAchievements
}) => {
  const { 
    educationalProgress, 
    recordSimulationChoice, 
    recordSimulationOutcome, 
    setActiveTab 
  } = useApp();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [historyTrail, setHistoryTrail] = useState<{ node: SimulationNode; choice: SimulationChoice }[]>([]);
  const [activeOutcome, setActiveOutcome] = useState<SimulationOutcome | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [themeFilter, setThemeFilter] = useState<string>('all');

  const currentScenario = useMemo(() => {
    if (!selectedScenarioId) return null;
    return getScenarioById(selectedScenarioId) || null;
  }, [selectedScenarioId]);

  const currentNode = useMemo(() => {
    if (!currentScenario || !currentNodeId) return null;
    return currentScenario.nodes[currentNodeId] || null;
  }, [currentScenario, currentNodeId]);

  // Start a scenario
  const handleStartScenario = (scenario: SimulationScenario) => {
    setSelectedScenarioId(scenario.id);
    setCurrentNodeId(scenario.initialNodeId);
    setHistoryTrail([]);
    setActiveOutcome(null);
    if (!isAudioMuted) soundEngine.playPop();

    // Scroll to top of scenario stage smoothly
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Reset current scenario
  const handleRestartScenario = () => {
    if (!currentScenario) return;
    setCurrentNodeId(currentScenario.initialNodeId);
    setHistoryTrail([]);
    setActiveOutcome(null);
    if (!isAudioMuted) soundEngine.playPop();
  };

  // Exit back to scenario catalogue
  const handleExitToCatalogue = () => {
    setSelectedScenarioId(null);
    setCurrentNodeId(null);
    setHistoryTrail([]);
    setActiveOutcome(null);
  };

  // Choose an action
  const handleSelectChoice = (choice: SimulationChoice) => {
    if (!currentScenario || !currentNode) return;

    // Record progress in AppContext
    recordSimulationChoice(currentScenario.id, choice.tone);

    if (!isAudioMuted) {
      if (choice.tone === 'empatia' || choice.tone === 'apoio') {
        soundEngine.playChimeSuccess();
      } else if (choice.tone === 'seguranca' || choice.tone === 'reflexao') {
        soundEngine.playPop();
      } else {
        soundEngine.playPop();
      }
    }

    setHistoryTrail(prev => [...prev, { node: currentNode, choice }]);

    // Check if nextNodeId is an outcome
    if (currentScenario.outcomes[choice.nextNodeId]) {
      const outcome = currentScenario.outcomes[choice.nextNodeId];
      setActiveOutcome(outcome);
      setCurrentNodeId(null);

      // Record scenario completion
      recordSimulationOutcome(
        currentScenario.id,
        outcome.id,
        outcome.type,
        outcome.isSpecialSecret
      );

      if (!isAudioMuted) {
        if (outcome.isSpecialSecret) {
          soundEngine.playChimeSuccess();
        } else if (outcome.type === 'positivo') {
          soundEngine.playChimeSuccess();
        } else {
          soundEngine.playPop();
        }
      }
    } else if (currentScenario.nodes[choice.nextNodeId]) {
      // Advance to next narrative node
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    if (themeFilter === 'all') return SIMULATION_SCENARIOS;
    return SIMULATION_SCENARIOS.filter(s => s.theme === themeFilter);
  }, [themeFilter]);

  // Overall simulation stats
  const totalCompletedCount = educationalProgress.completedSimulations?.length || 0;
  const totalSimulationsAvailable = SIMULATION_SCENARIOS.length;
  const exploredOutcomesMap = educationalProgress.exploredSimulationOutcomes || {};
  const secretDiscoveredCount = educationalProgress.discoveredSecretOutcomesCount || 0;

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider shadow-inner">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Simulações Interativas • Tomada de Decisão</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-bold transition-all cursor-pointer"
                title={isAudioMuted ? "Ativar áudio" : "Silenciar áudio"}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span>{isAudioMuted ? 'Mudo' : 'Som Ativo'}</span>
              </button>

              <button
                onClick={onNavigateToAchievements ? onNavigateToAchievements : () => setActiveTab('achievements')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-black transition-all cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>Distintivos de Simulação</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2">
              Simulações do Cotidiano Escolar: <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-200 bg-clip-text text-transparent">
                Suas Escolhas, Consequências Reais e Finais Múltiplos
              </span>
            </h1>
            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-4xl">
              Vivencie situações reais com personagens da escola. Não existe uma única resposta engessada: cada atitude gera desdobramentos, ramificações na história, finais de aprendizado e finais secretos especiais.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-purple-800/60 text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-purple-300 text-[11px] block font-bold">Simulações Concluídas:</span>
              <strong className="text-lg font-black text-white">{totalCompletedCount} de {totalSimulationsAvailable}</strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-purple-300 text-[11px] block font-bold">Escolhas Realizadas:</span>
              <strong className="text-lg font-black text-purple-200">
                {educationalProgress.totalSimulationChoicesMade || 0} ações
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-purple-300 text-[11px] block font-bold">Caminhos Empáticos:</span>
              <strong className="text-lg font-black text-emerald-300">
                {educationalProgress.empathyChoicesCount || 0} vezes
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-purple-300 text-[11px] block font-bold">Finais Secretos Descobertos:</span>
              <strong className="text-lg font-black text-amber-300 flex items-center gap-1">
                ⭐ {secretDiscoveredCount}
              </strong>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          VIEW 1: ACTIVE SIMULATION STAGE (IF A SCENARIO IS SELECTED)
         ========================================================================= */}
      {currentScenario && (
        <div className="space-y-6">
          
          {/* Active Navigation & Stage Header */}
          <div className="bg-white border border-purple-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleExitToCatalogue}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>← Voltar ao Catálogo</span>
                </button>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-950 text-[11px] font-black">
                  <span>{currentScenario.themeLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestartScenario}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar Situação</span>
                </button>
              </div>
            </div>

            {/* Scenario Title and Characters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  🎭 {currentScenario.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {currentScenario.subtitle}
                </p>
              </div>

              {/* Characters Involved */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Personagens:</span>
                {currentScenario.characters.map((char, idx) => (
                  <div 
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${char.color}`}
                    title={`${char.role}: ${char.personality || ''}`}
                  >
                    <span>{char.avatarEmoji}</span>
                    <span>{char.name}</span>
                    <span className="text-[10px] opacity-75 font-medium">({char.role})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumb Steps Trail */}
            {currentNode && (
              <div className="flex items-center gap-2 text-xs text-purple-900 bg-purple-50/70 p-3 rounded-2xl border border-purple-200/70">
                <Compass className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="font-bold">Momento Atual:</span>
                <span className="font-black text-purple-950">
                  {currentNode.locationTag}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">
                  Decisão {currentNode.stepNumber} de ~{currentNode.totalStepsEstimated || 3}
                </span>
              </div>
            )}
          </div>

          {/* IF IN ACTIVE NODE: RENDER NARRATIVE AND CHOICES */}
          {currentNode && !activeOutcome && (
            <div className="bg-white border border-purple-200 rounded-3xl p-6 sm:p-9 shadow-sm space-y-6 animate-fade-in">
              
              {/* Narrative Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-purple-900 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-purple-700" />
                  <span>O Que Está Acontecendo:</span>
                </div>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                  {currentNode.narrative}
                </div>

                {/* Dialogues if any */}
                {currentNode.dialogues && currentNode.dialogues.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Diálogo no Local:</span>
                    {currentNode.dialogues.map((dlg, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${
                          dlg.isUser 
                            ? 'bg-purple-100/70 border-purple-300 ml-4 sm:ml-8' 
                            : 'bg-white border-slate-200 mr-4 sm:mr-8'
                        }`}
                      >
                        <span className="text-xl shrink-0">{dlg.avatarEmoji || '💬'}</span>
                        <div className="space-y-0.5">
                          <strong className={`font-black block ${dlg.isUser ? 'text-purple-950' : 'text-slate-900'}`}>
                            {dlg.characterName}:
                          </strong>
                          <p className="text-slate-700 italic leading-relaxed">
                            "{dlg.text}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prompt Question & Choices */}
              <div className="pt-4 border-t border-purple-100 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                    ?
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {currentNode.promptQuestion}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {currentNode.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice)}
                      className="group p-4 sm:p-5 rounded-2xl border border-purple-200 hover:border-purple-500 bg-white hover:bg-purple-50/50 text-left transition-all duration-200 hover:shadow-md active:scale-[0.99] cursor-pointer flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{choice.iconEmoji || '👉'}</span>
                          <span className="text-xs font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                            {choice.attitudeLabel || 'Sua Escolha'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-purple-950 leading-snug">
                          {choice.text}
                        </p>
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-700">
                          {choice.consequenceText}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-purple-100 group-hover:bg-purple-600 group-hover:text-white text-purple-700 flex items-center justify-center shrink-0 transition-colors mt-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* IF AN OUTCOME HAS BEEN REACHED: RENDER DIAGNOSIS & REWARDS */}
          {activeOutcome && (
            <div className="bg-white border-2 border-purple-300 rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 animate-fade-in">
              
              {/* Outcome Header Banner */}
              <div className={`p-6 rounded-2xl text-white space-y-3 relative overflow-hidden ${
                activeOutcome.isSpecialSecret 
                  ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 border border-amber-400'
                  : activeOutcome.type === 'positivo' 
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800'
                    : activeOutcome.type === 'aprendizado'
                      ? 'bg-gradient-to-r from-blue-800 to-indigo-800'
                      : 'bg-gradient-to-r from-rose-800 to-amber-900'
              }`}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${activeOutcome.badgeColor}`}>
                    {activeOutcome.badgeLabel}
                  </span>

                  {activeOutcome.isSpecialSecret && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-md animate-pulse">
                      <Star className="w-3.5 h-3.5 fill-amber-950" />
                      <span>+{activeOutcome.bonusXp || 100} XP Bônus Secreto!</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                  {activeOutcome.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed max-w-3xl">
                  {activeOutcome.narrativeResult}
                </p>
              </div>

              {/* Pedagogy Diagnosis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-purple-950 uppercase">
                    <Info className="w-4 h-4 text-purple-700" />
                    <span>O Que Aconteceu Nesta Simulação:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeOutcome.whatHappened}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-950 uppercase">
                    <Compass className="w-4 h-4 text-indigo-700" />
                    <span>Por Que Suas Escolhas Levaram Aqui:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeOutcome.whyChoicesLedHere}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-950 uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Comportamento Seguro Recomendado:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {activeOutcome.saferBehaviorAdvice}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-950 uppercase">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Aprendizado Central para o Cotidiano:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
                    {activeOutcome.coreLearning}
                  </p>
                </div>

              </div>

              {/* Radar Metrics */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  Avaliação de Desempenho Ético Deste Desfecho:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>Tomada de Decisão:</span>
                      <span className="text-purple-700 font-black">{activeOutcome.metrics.decision}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: `${activeOutcome.metrics.decision}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>Empatia & Acolhimento:</span>
                      <span className="text-emerald-700 font-black">{activeOutcome.metrics.empathy}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${activeOutcome.metrics.empathy}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold">
                      <span>Segurança & Protocolo:</span>
                      <span className="text-blue-700 font-black">{activeOutcome.metrics.safety}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${activeOutcome.metrics.safety}%` }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-purple-100">
                <button
                  onClick={handleRestartScenario}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Explorar Outro Caminho Nesta Situação</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleExitToCatalogue}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 font-black text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Ver Mais Situações 🎭
                  </button>

                  <button
                    onClick={onNavigateToAchievements ? onNavigateToAchievements : () => setActiveTab('achievements')}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span>Conquistas</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          VIEW 2: SCENARIOS CATALOGUE (WHEN NO SCENARIO IS ACTIVELY BEING PLAYED)
         ========================================================================= */}
      {!currentScenario && (
        <div className="space-y-6">
          
          {/* Filter Chips */}
          <div className="bg-white border border-purple-200/90 rounded-3xl p-4 sm:p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-700" />
                <span>Escolha uma Situação do Cotidiano Escolar para Explorar:</span>
              </h3>
              <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                {SIMULATION_SCENARIOS.length} Situações Disponíveis
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
              <button
                onClick={() => setThemeFilter('all')}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  themeFilter === 'all'
                    ? 'bg-purple-700 text-white border-purple-700 font-black shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                }`}
              >
                🌟 Todas ({SIMULATION_SCENARIOS.length})
              </button>

              <button
                onClick={() => setThemeFilter('inclusao_empatia')}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  themeFilter === 'inclusao_empatia'
                    ? 'bg-purple-700 text-white border-purple-700 font-black shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                }`}
              >
                🤝 Inclusão & Recreio
              </button>

              <button
                onClick={() => setThemeFilter('cyberbullying')}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  themeFilter === 'cyberbullying'
                    ? 'bg-purple-700 text-white border-purple-700 font-black shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                }`}
              >
                📱 Cyberbullying & Redes
              </button>

              <button
                onClick={() => setThemeFilter('desescalada_conflito')}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  themeFilter === 'desescalada_conflito'
                    ? 'bg-purple-700 text-white border-purple-700 font-black shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                }`}
              >
                🕊️ Desescalada & Corredor
              </button>

              <button
                onClick={() => setThemeFilter('respeito_limites')}
                className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                  themeFilter === 'respeito_limites'
                    ? 'bg-purple-700 text-white border-purple-700 font-black shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                }`}
              >
                📚 Trabalhos em Grupo
              </button>
            </div>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredScenarios.map((sc) => {
              const exploredOutcomes = exploredOutcomesMap[sc.id] || [];
              const isCompleted = exploredOutcomes.length > 0;
              const hasExploredMultiple = exploredOutcomes.length >= 2;
              const hasFoundSecret = (Object.values(sc.outcomes) as SimulationOutcome[]).some(
                out => out.isSpecialSecret && exploredOutcomes.includes(out.id)
              );

              return (
                <div
                  key={sc.id}
                  className="bg-white border border-purple-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3.5">
                    
                    {/* Card Header Tag and Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-950 text-xs font-black">
                        <span>Situação #{sc.scenarioNumber}</span>
                        <span>•</span>
                        <span>{sc.themeLabel}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {hasFoundSecret && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-black">
                            ⭐ Segredo Descoberto
                          </span>
                        )}

                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-[11px] font-black">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>{exploredOutcomes.length}/{sc.totalPossibleOutcomes} Finais</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                            <span>Não Iniciada</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title and Summary */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-purple-900 transition-colors leading-snug">
                        {sc.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {sc.summary}
                      </p>
                    </div>

                    {/* Characters and Duration */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-50 text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-700">Personagens:</span>
                        <span>{sc.characters.map(c => c.avatarEmoji).join(' ')}</span>
                      </div>
                      <span className="font-bold">⏱️ ~{sc.estimatedMinutes} min</span>
                    </div>

                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleStartScenario(sc)}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isCompleted ? 'Jogar Novamente / Novos Finais' : 'Iniciar Simulação Interativa'}</span>
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

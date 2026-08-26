import React, { useState } from 'react';
import { SIMULATION_SCENARIOS } from './simulationData';
import { SimulationScenario } from './types';
import { SimulationPlayer } from './SimulationPlayer';
import { useApp } from './AppContext';
import { 
  Sparkles, 
  Compass, 
  Shield, 
  Heart, 
  Brain, 
  Play, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Award,
  BookOpen,
  Users,
  Search,
  Filter,
  Flame,
  ShieldCheck,
  Clock,
  Sparkle
} from 'lucide-react';
import { smoothScrollToElement } from './utils/scrollHelper';

export const SimulationsModule: React.FC = () => {
  const { educationalProgress, setActiveTab } = useApp();
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const completedSimulationsList = educationalProgress.completedSimulations || [];
  const exploredOutcomesMap = educationalProgress.exploredSimulationOutcomes || {};
  const totalCompleted = completedSimulationsList.length;
  const totalSimulations = SIMULATION_SCENARIOS.length;
  const totalExploredOutcomes = (Object.values(exploredOutcomesMap) as string[][]).reduce(
    (sum, list) => sum + (list ? list.length : 0), 
    0
  );
  const totalPossibleOutcomes = SIMULATION_SCENARIOS.reduce((sum, s) => sum + s.totalPossibleOutcomes, 0);

  // Filters logic
  const filterCategories = [
    { id: 'todos', label: 'Todas as Situações' },
    { id: 'convivencia', label: 'Convivência & Empatia' },
    { id: 'digital', label: 'Cyberbullying & Digital' },
    { id: 'seguranca', label: 'Segurança & Apoio' },
    { id: 'mediacao', label: 'Conflito & Mediação' }
  ];

  const filteredScenarios = SIMULATION_SCENARIOS.filter(scenario => {
    // Category match
    let matchesCategory = true;
    if (activeFilter === 'convivencia') {
      matchesCategory = ['inclusao_empatia', 'acolhimento', 'respeito_limites', 'testemunha_ativa'].includes(scenario.theme);
    } else if (activeFilter === 'digital') {
      matchesCategory = ['cyberbullying', 'privacidade_digital', 'responsabilidade_boatos'].includes(scenario.theme);
    } else if (activeFilter === 'seguranca') {
      matchesCategory = ['seguranca_ameacas', 'pressao_colegas'].includes(scenario.theme);
    } else if (activeFilter === 'mediacao') {
      matchesCategory = ['desescalada_conflito', 'testemunha_ativa', 'acolhimento'].includes(scenario.theme);
    }

    // Search query match
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        scenario.title.toLowerCase().includes(q) ||
        scenario.subtitle.toLowerCase().includes(q) ||
        scenario.themeLabel.toLowerCase().includes(q) ||
        scenario.summary.toLowerCase().includes(q) ||
        scenario.characters.some(c => c.name.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  const handleStartScenario = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    smoothScrollToElement('#top', { position: 'top', delay: 40 });
  };

  const handleBackToList = () => {
    setSelectedScenario(null);
    smoothScrollToElement('#simulations-hub-top', { position: 'top', delay: 40 });
  };

  // If a simulation is actively running, render the player
  if (selectedScenario) {
    return (
      <div className="py-2 sm:py-4">
        <SimulationPlayer
          scenario={selectedScenario}
          onBackToList={handleBackToList}
        />
      </div>
    );
  }

  return (
    <div id="simulations-hub-top" className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in text-slate-800">
      
      {/* Hero / Header Card */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Laboratório de Decisões & Empatia</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            🎭 Simulações Interativas
          </h1>

          <p className="text-sm sm:text-base text-purple-200 leading-relaxed font-normal mb-6">
            Vivencie situações fictícias do cotidiano escolar, tome decisões em tempo real e descubra como cada escolha gera consequências diferentes. 
            Aqui você aprende na prática: <strong>Decisão → Consequência → Aprendizado</strong>.
          </p>

          {/* Core pedagogical pillars banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-black text-purple-200 mb-1">
                <Brain className="w-4 h-4 text-purple-300" />
                <span>1. Escolha com Cuidado</span>
              </div>
              <p className="text-[11px] text-purple-100/90 leading-tight">
                Cada caminho abre ramificações e reações reais de colegas e professores.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-black text-purple-200 mb-1">
                <Compass className="w-4 h-4 text-purple-300" />
                <span>2. Veja as Consequências</span>
              </div>
              <p className="text-[11px] text-purple-100/90 leading-tight">
                Entenda o impacto emocional e prático de cada atitude no ambiente escolar.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/10 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-black text-purple-200 mb-1">
                <Layers className="w-4 h-4 text-purple-300" />
                <span>3. Explore Outros Finais</span>
              </div>
              <p className="text-[11px] text-purple-100/90 leading-tight">
                Jogue novamente para desbloquear todos os finais e ganhar novas conquistas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Personal Stats Dashboard */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-700" />
              <span>Seu Progresso nas Simulações</span>
            </h2>
            <p className="text-xs text-slate-500">
              Acompanhamento individual de aprendizagem e exploração de situações cotidianas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('achievements')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 text-xs font-extrabold transition-all cursor-pointer"
            >
              <span>Ver Emblemas de Simulação</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Completed simulations */}
          <div className="bg-purple-50/70 border border-purple-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-purple-950 font-bold mb-1">
              <span>Situações Concluídas</span>
              <span className="text-base font-black text-purple-900">{totalCompleted}/{totalSimulations}</span>
            </div>
            <div className="w-full h-2 bg-purple-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-purple-700 rounded-full transition-all duration-500" 
                style={{ width: `${(totalCompleted / totalSimulations) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-600 font-medium">
              {totalCompleted === totalSimulations ? '🎉 Todas concluídas!' : `${totalSimulations - totalCompleted} restantes`}
            </span>
          </div>

          {/* Explored outcomes */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-indigo-950 font-bold mb-1">
              <span>Finais Descobertos</span>
              <span className="text-base font-black text-indigo-900">{totalExploredOutcomes}/{totalPossibleOutcomes}</span>
            </div>
            <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-indigo-700 rounded-full transition-all duration-500" 
                style={{ width: `${(totalExploredOutcomes / totalPossibleOutcomes) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-600 font-medium">
              Multiverso de escolhas
            </span>
          </div>

          {/* Empathy choices */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-emerald-950 font-bold mb-1">
              <span>Ações de Empatia</span>
              <span className="text-base font-black text-emerald-900">{educationalProgress.empathyChoicesCount || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mt-2">
              <Heart className="w-4 h-4 fill-emerald-500 text-emerald-600" />
              <span>Acolhimento praticado</span>
            </div>
          </div>

          {/* Safety choices */}
          <div className="bg-blue-50/70 border border-blue-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-blue-950 font-bold mb-1">
              <span>Decisões Seguras</span>
              <span className="text-base font-black text-blue-900">{educationalProgress.safetyChoicesCount || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-800 font-semibold mt-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Prevenção & Apoio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer active:scale-95 ${
                activeFilter === cat.id
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white hover:bg-purple-50 text-slate-700 border border-purple-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar situação ou personagem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-purple-200/90 focus:border-purple-600 focus:outline-none text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Grid of Simulation Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredScenarios.map(scenario => {
          const isCompleted = completedSimulationsList.includes(scenario.id);
          const exploredOutcomes = exploredOutcomesMap[scenario.id] || [];
          const isPartiallyExplored = exploredOutcomes.length > 0 && exploredOutcomes.length < scenario.totalPossibleOutcomes;
          const isFullyExplored = exploredOutcomes.length >= scenario.totalPossibleOutcomes;

          return (
            <div
              key={scenario.id}
              className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group ${
                isCompleted 
                  ? 'border-purple-300 ring-1 ring-purple-100' 
                  : 'border-purple-200/80 hover:border-purple-400'
              }`}
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black">
                      Situação {scenario.scenarioNumber.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {scenario.themeLabel}
                    </span>
                  </div>

                  {isFullyExplored ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      100% Explorada
                    </span>
                  ) : isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                      Concluída
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Nova
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-purple-950 transition-colors mb-1">
                  {scenario.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3">
                  {scenario.subtitle}
                </p>

                {/* Scenario Summary */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-4 line-clamp-3">
                  "{scenario.summary}"
                </p>

                {/* Characters involved pills */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mr-1">
                    Personagens:
                  </span>
                  {scenario.characters.map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-700"
                    >
                      <span>{char.avatarEmoji}</span>
                      <strong className="font-semibold">{char.name}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Footer & Action */}
              <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~3 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    <strong className="text-purple-950 font-bold">{exploredOutcomes.length}</strong>/{scenario.totalPossibleOutcomes} finais
                  </span>
                </div>

                <button
                  onClick={() => handleStartScenario(scenario)}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-xs active:scale-95 cursor-pointer ${
                    isCompleted
                      ? 'bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-950'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Explorar Outros Caminhos</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Iniciar Simulação</span>
                    </>
                  )}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredScenarios.length === 0 && (
        <div className="bg-white border border-purple-200 rounded-3xl p-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Nenhuma simulação encontrada para a busca ou filtro selecionado.
          </p>
          <button
            onClick={() => { setActiveFilter('todos'); setSearchQuery(''); }}
            className="mt-3 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-950 rounded-xl text-xs font-bold transition-all"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Safety & Educational Mission Box */}
      <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-5 text-xs text-slate-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-900 font-bold block">
            Ambiente Educativo Seguro & Protegido
          </strong>
          <p>
            Todas as situações apresentadas são fictícias e elaboradas com fins pedagógicos para o desenvolvimento da empatia, prevenção ao bullying e tomada de decisões seguras. Não há coleta de dados pessoais, rankings competitivos ou exposição de estudantes.
          </p>
        </div>
      </div>
    </div>
  );
};

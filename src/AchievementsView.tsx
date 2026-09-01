import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  ShieldCheck, 
  HeartHandshake, 
  Heart, 
  Wind, 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Info,
  Award,
  Target,
  Zap,
  Bot,
  Scale,
  Eye,
  Smile,
  Compass,
  Crown,
  Search,
  Filter,
  Flame,
  PartyPopper,
  Volume2,
  VolumeX,
  RotateCw,
  Maximize2,
  X
} from 'lucide-react';
import { Achievement, AchievementCategory } from './types';
import { useApp } from './AppContext';
import { soundEngine } from './relaxingAudio';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { useScrollIntoView } from './hooks/useScrollIntoView';
import { RANK_TIERS, getRankInfo } from './achievementsData';

interface AchievementsViewProps {
  onNavigateToTab?: (tab: 'types' | 'quiz' | 'legislation') => void;
}

const FUNNY_TIPS = [
  "‘Se a piada só faz uma pessoa rir e a outra chorar, a piada foi péssima e quem contou precisa de aulas urgentes de comédia.’",
  "‘Respirar fundo 4 segundos antes de responder uma provocação evita 99% das idas à sala da diretoria.’",
  "‘Salvar prints e provas com data é o superpoder do detetive digital contra o cyberbullying.’",
  "‘Ninguém nunca se arrependeu de ter convidado o colega novo para sentar junto no recreio.’",
  "‘Empatia é como Wi-Fi: quanto mais você distribui, melhor fica o ambiente pra todo mundo.’",
  "‘Passar pano pra zueira tóxica não te faz legal, só te faz cúmplice do tédio coletivo.’"
];

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onNavigateToTab }) => {
  const { achievements, setActiveTab, anonymousIdentity, userRankPosition, openProfileWithTab } = useApp();
  const { center } = useScrollIntoView({ topOffset: 80, behavior: 'smooth' });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unlocked' | 'in_progress' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [celebratedBadgeId, setCelebratedBadgeId] = useState<string | null>(null);
  const [focusedBadgeId, setFocusedBadgeId] = useState<string | null>(null);
  const [inspectedBadge, setInspectedBadge] = useState<Achievement | null>(null);
  const [showRankLadder, setShowRankLadder] = useState<boolean>(false);

  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const inProgressCount = achievements.filter(a => !a.isUnlocked && a.currentProgress > 0).length;
  const lockedCount = achievements.filter(a => !a.isUnlocked && a.currentProgress === 0).length;
  const progressPercent = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

  const rankInfo = getRankInfo(unlockedCount);

  // Play celebration sound when clicking an unlocked card & smoothly center card in view
  const handleBadgeClick = (item: Achievement) => {
    setFocusedBadgeId(item.id);
    if (item.isUnlocked) {
      setCelebratedBadgeId(item.id);
      soundEngine.playChimeSuccess();
      setTimeout(() => setCelebratedBadgeId(null), 1800);
    } else {
      soundEngine.playPop();
    }

    const cardEl = document.getElementById('badge-card-' + item.id);

    // 1. Identify the card and smoothly center it vertically in the viewport (scrolling up or down automatically)
    center(cardEl, 0, () => {
      setInspectedBadge(item);
    });

    // 2. Fallback timeout to ensure the modal opens gracefully even on instant scrolls
    setTimeout(() => {
      setInspectedBadge((current) => current || item);
    }, 180);
  };

  const handleCloseInspection = () => {
    const badgeId = inspectedBadge?.id;
    setInspectedBadge(null);
    if (badgeId) {
      const cardEl = document.getElementById('badge-card-' + badgeId);
      if (cardEl) {
        center(cardEl, 40);
      }
    }
  };

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % FUNNY_TIPS.length);
  };

  const renderIcon = (iconType: Achievement['iconType'], isUnlocked: boolean) => {
    const iconClass = `w-6 h-6 sm:w-7 sm:h-7 ${isUnlocked ? '' : 'text-slate-400'}`;
    switch (iconType) {
      case 'trophy':
        return <Trophy className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-amber-500' : iconClass} aria-hidden="true" />;
      case 'crown':
        return <Crown className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-amber-500' : iconClass} aria-hidden="true" />;
      case 'shield':
        return <ShieldCheck className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-purple-600' : iconClass} aria-hidden="true" />;
      case 'handshake':
        return <HeartHandshake className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-indigo-600' : iconClass} aria-hidden="true" />;
      case 'heart':
        return <Heart className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-rose-500 fill-rose-500' : iconClass} aria-hidden="true" />;
      case 'wind':
        return <Wind className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-teal-600' : iconClass} aria-hidden="true" />;
      case 'target':
        return <Target className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-emerald-600' : iconClass} aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-amber-500' : iconClass} aria-hidden="true" />;
      case 'zap':
        return <Zap className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 fill-yellow-400' : iconClass} aria-hidden="true" />;
      case 'bot':
        return <Bot className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-blue-600' : iconClass} aria-hidden="true" />;
      case 'scale':
        return <Scale className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-indigo-600' : iconClass} aria-hidden="true" />;
      case 'eye':
        return <Eye className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-purple-600' : iconClass} aria-hidden="true" />;
      case 'smile':
        return <Smile className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-amber-500' : iconClass} aria-hidden="true" />;
      case 'compass':
        return <Compass className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-teal-600' : iconClass} aria-hidden="true" />;
      case 'award':
        return <Award className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-purple-600' : iconClass} aria-hidden="true" />;
      default:
        return <BookOpen className={isUnlocked ? 'w-6 h-6 sm:w-7 sm:h-7 text-purple-600' : iconClass} aria-hidden="true" />;
    }
  };

  const getTierLabel = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'lendario':
        return <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">💎 LENDÁRIO</span>;
      case 'ouro':
        return <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-300">🥇 OURO</span>;
      case 'prata':
        return <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-300">🥈 PRATA</span>;
      default:
        return <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 border border-orange-300">🥉 BRONZE</span>;
    }
  };

  const handleActionClick = (achievementId: string) => {
    if (
      achievementId === 'primeiro_passo_simulacao' ||
      achievementId === 'olhar_empatico' ||
      achievementId === 'decisao_segura' ||
      achievementId === 'pensador_estrategico' ||
      achievementId === 'guardiao_comunidade_sim'
    ) {
      setActiveTab('simulations');
      return;
    }

    if (achievementId === 'conhecedor_direitos' || achievementId === 'aliado_escola_segura' || achievementId === 'especialista_respeito' || achievementId === 'protetor_comunidade' || achievementId === 'gabarito_perfeito' || achievementId === 'speedrunner_sabedoria' || achievementId === 'enciclopedia_viva' || achievementId === 'campeao_inclusao') {
      if (onNavigateToTab) onNavigateToTab('quiz');
      else setActiveTab('education');
    } else if (achievementId === 'explorador_matriz') {
      if (onNavigateToTab) onNavigateToTab('types');
      else setActiveTab('education');
    } else if (achievementId === 'advogado_do_bem') {
      if (onNavigateToTab) onNavigateToTab('legislation');
      else setActiveTab('education');
    } else if (achievementId === 'coracao_de_ouro') {
      if (onNavigateToTab) onNavigateToTab('types');
      else setActiveTab('education');
    } else if (achievementId === 'mente_tranquila' || achievementId === 'mestre_zen' || achievementId === 'desabafo_seguro') {
      setActiveTab('support');
    } else if (achievementId === 'guardiao_digital') {
      setActiveTab('tracker');
    } else if (achievementId === 'radar_antizueira') {
      setActiveTab('report');
    } else {
      setActiveTab('education');
    }
  };

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter(badge => {
      // Category filter
      if (selectedCategory !== 'all' && badge.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus === 'unlocked' && !badge.isUnlocked) return false;
      if (selectedStatus === 'in_progress' && (badge.isUnlocked || badge.currentProgress === 0)) return false;
      if (selectedStatus === 'locked' && (badge.isUnlocked || badge.currentProgress > 0)) return false;
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = badge.title.toLowerCase().includes(q);
        const matchesSubtitle = badge.subtitle?.toLowerCase().includes(q) || false;
        const matchesDesc = badge.description.toLowerCase().includes(q);
        const matchesQuote = badge.funnyQuote?.toLowerCase().includes(q) || false;
        const matchesHint = badge.requirementHint.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesQuote && !matchesHint) {
          return false;
        }
      }
      return true;
    });
  }, [achievements, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in text-slate-800 space-y-6">
      
      {/* Top Banner / Hero */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider shadow-2xs">
              <Trophy className="w-4 h-4 text-purple-700" aria-hidden="true" />
              <span>Distintivos & Conquistas de Honra Escolar</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{unlockedCount}/{totalAchievements} Conquistas ({progressPercent}%)</span>
            </span>

            <button
              onClick={() => setActiveTab('ranking')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black shadow-2xs hover:from-purple-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>{anonymousIdentity.displayName}: {userRankPosition}º no Ranking Geral</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Minhas Conquistas Escolares: <br />
            <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-700 bg-clip-text text-transparent">
              Distintivos de Honra, Empatia e Conhecimento
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-4xl">
            Aprenda a combater a zueira pesada, pratique a empatia, vivencie simulações e domine seus direitos protegidos por lei. Cada conquista é salva com 100% de sigilo no seu dispositivo.
          </p>

          {/* Quick Action Badges & Level Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-purple-100/80">
            {/* Rank / Level Badge */}
            <div 
              onClick={() => setShowRankLadder(!showRankLadder)}
              className={`inline-flex items-center gap-3 p-3.5 rounded-2xl border ${rankInfo.color} shadow-2xs cursor-pointer hover:shadow-md transition-all active:scale-[0.99]`}
            >
              <span className="text-2xl">{rankInfo.badgeEmoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-80 block">Nível {rankInfo.levelNumber} de {RANK_TIERS.length}</span>
                  <span className="text-[10px] underline font-bold opacity-80">Ver Todos os Ranks</span>
                </div>
                <strong className="text-sm font-black block">{rankInfo.title}</strong>
                <span className="text-xs opacity-90">{rankInfo.description}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => openProfileWithTab('customize')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-purple-950 font-black text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <span>🎁</span>
                <span>Recompensas Cosméticas</span>
              </button>
              <button
                onClick={() => setActiveTab('ranking')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Ranking 🏆</span>
              </button>
              <button
                onClick={() => setActiveTab('simulations')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>Simulações 🎭</span>
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Testar Quizzes</span>
              </button>
              <button
                onClick={() => setActiveTab('report')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 font-extrabold text-xs transition-all active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-purple-800" />
                <span>Denúncia Anônima</span>
              </button>
            </div>
          </div>

          {/* Expandable Rank Progression Ladder */}
          {showRankLadder && (
            <div className="mt-4 p-5 rounded-2xl bg-white/90 border border-purple-200 shadow-sm animate-fade-in space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-500" />
                  Hierarquia Completa de Ranks e Títulos do Sentinela
                </h4>
                <button 
                  onClick={() => setShowRankLadder(false)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                >
                  Fechar ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {RANK_TIERS.map((tier) => {
                  const isCurrent = unlockedCount >= tier.minAchievements && (
                    tier.levelNumber === RANK_TIERS.length || 
                    unlockedCount < (RANK_TIERS[tier.levelNumber]?.minAchievements ?? 999)
                  );
                  return (
                    <div 
                      key={tier.levelNumber}
                      className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                        isCurrent 
                          ? `${tier.color} ring-2 ring-purple-600 font-black shadow-xs` 
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{tier.badgeEmoji}</span>
                        <span className="text-[10px] font-bold opacity-75">
                          {tier.minAchievements}+ distintivos
                        </span>
                      </div>
                      <strong className="block text-slate-900 font-bold">{tier.title}</strong>
                      <p className="text-[10px] text-slate-500 leading-tight">{tier.description}</p>
                      {isCurrent && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-black uppercase">
                          Patente Atual
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Progress & Tip Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Progress Gauge Card */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-2 text-xs font-black text-purple-950">
              <Award className="w-4 h-4 text-purple-700" aria-hidden="true" />
              <span>Progresso Total:</span>
            </span>
            <span className="font-mono text-sm font-black text-purple-900 bg-white px-2.5 py-1 rounded-xl border border-purple-200 shadow-2xs">
              {unlockedCount} / {totalAchievements}
            </span>
          </div>

          {/* Progress Bar */}
          <div 
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso geral das conquistas: ${progressPercent}%`}
            className="w-full bg-purple-200/90 h-3 rounded-full overflow-hidden p-0.5 mb-2 shadow-inner"
          >
            <div 
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-purple-900 font-bold">
            <span>{progressPercent}% completado</span>
            <span>{totalAchievements - unlockedCount} restantes</span>
          </div>

          <div className="mt-3 pt-3 border-t border-purple-200/80 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Clique nos cartões para comemorar ou inspecionar!</span>
          </div>
        </div>

        {/* Humorous Anti-Bullying Tip of the Day */}
        <div className="md:col-span-2 bg-gradient-to-r from-amber-50 via-orange-50 to-purple-50 border border-amber-200/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shrink-0 shadow-2xs">
              💡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
                  Dica Rápida do Sentinela
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-950 font-bold">
                  Bom Senso #0{tipIndex + 1}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-2 italic leading-relaxed">
                {FUNNY_TIPS[tipIndex]}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/70 flex justify-end">
            <button
              onClick={nextTip}
              className="py-1.5 px-3 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Ver outra dica divertida"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-700" />
              <span>Outra Dica</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="bg-white border border-purple-200/80 rounded-2xl p-4 shadow-2xs space-y-4">
        
        {/* Search Bar + Quick Status Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, frase engraçada ou requisito..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Status Segmented Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto text-xs font-bold shrink-0">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-white text-purple-950 shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({totalAchievements})
            </button>
            <button
              onClick={() => setSelectedStatus('unlocked')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'unlocked'
                  ? 'bg-emerald-600 text-white shadow-2xs font-black'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              🏆 Conquistadas ({unlockedCount})
            </button>
            <button
              onClick={() => setSelectedStatus('in_progress')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'in_progress'
                  ? 'bg-purple-600 text-white shadow-2xs font-black'
                  : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              ⏳ Em Progresso ({inProgressCount})
            </button>
            <button
              onClick={() => setSelectedStatus('locked')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatus === 'locked'
                  ? 'bg-slate-700 text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔒 A Fazer ({lockedCount})
            </button>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          <span className="text-[11px] text-slate-400 font-extrabold uppercase shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categorias:
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            🌟 Todas ({totalAchievements})
          </button>

          <button
            onClick={() => setSelectedCategory('sabedoria')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'sabedoria'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            🧠 Sabedoria & Quizzes
          </button>

          <button
            onClick={() => setSelectedCategory('detetive')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'detetive'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            🕵️ Detetive & Leis
          </button>

          <button
            onClick={() => setSelectedCategory('empatia')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'empatia'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            💖 Empatia & Acolhimento
          </button>

          <button
            onClick={() => setSelectedCategory('zen')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'zen'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            🧘 Modo Zen & Calma
          </button>

          <button
            onClick={() => setSelectedCategory('escudo')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'escudo'
                ? 'bg-purple-600 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
            }`}
          >
            🛡️ Escudo & Segurança
          </button>

          <button
            onClick={() => setSelectedCategory('secret')}
            className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'secret'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-purple-600 font-black shadow-2xs'
                : 'bg-white text-purple-900 border-purple-200 hover:border-purple-400'
            }`}
          >
            🔒 Secretas ({achievements.filter(a => a.isSecret).length})
          </button>
        </div>

      </div>

      {/* Discretion Note */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 text-xs text-slate-600">
        <Info className="w-4 h-4 text-purple-700 mt-0.5 shrink-0" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong>Espaço seguro e confidencial:</strong> Todos os distintivos e pontuações ficam salvos somente na memória local do seu navegador para incentivar seu aprendizado. Não há rankings públicos, notas expostas ou comparações entre alunos.
        </p>
      </div>

      {/* Empty State when filter doesn't match */}
      {filteredAchievements.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-3xl mx-auto flex items-center justify-center">
            🔍
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-800">
            Nenhuma conquista encontrada com esse filtro
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Tente buscar com outros termos ou alterne o filtro de categoria/status acima.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="mt-2 py-2 px-4 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 font-black text-xs transition-all cursor-pointer"
          >
            Mostrar Todas as 18 Conquistas
          </button>
        </div>
      )}

      {/* Badges Grid (18 Humorous & Intuitive Cards with Retro Pixel Frames) */}
      <div id="achievements-grid-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredAchievements.map((item) => {
          const isUnlocked = item.isUnlocked;
          const showProgressBar = item.maxProgress > 1;
          const progressPercentItem = Math.min(100, Math.round((item.currentProgress / item.maxProgress) * 100));
          const isCelebrated = celebratedBadgeId === item.id;
          const isFocused = focusedBadgeId === item.id;

          return (
            <div
              key={item.id}
              id={`badge-card-${item.id}`}
              onClick={() => handleBadgeClick(item)}
              className={`group rounded-3xl p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white border-purple-300/90 shadow-xs ring-1 ring-purple-200/70 hover:shadow-md hover:border-purple-400 cursor-pointer'
                  : 'bg-white/85 border-slate-200/90 text-slate-600 shadow-2xs hover:border-purple-200 cursor-pointer'
              } ${isFocused ? 'ring-2 ring-purple-500 shadow-lg' : ''} ${isCelebrated ? 'scale-[1.02] ring-4 ring-amber-300 animate-pulse' : ''}`}
            >
              {/* Confetti Glow when clicked */}
              {isCelebrated && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-purple-200/30 to-pink-200/30 backdrop-blur-2xs flex items-center justify-center z-20 pointer-events-none animate-fade-in">
                  <div className="bg-white/95 px-4 py-2 rounded-2xl border-2 border-amber-400 shadow-xl text-center">
                    <span className="text-xl">🎉 ✨ 🏆</span>
                    <p className="text-xs font-black text-amber-900 mt-1">Conquista Ativada com Sucesso!</p>
                  </div>
                </div>
              )}

              <div>
                
                {/* Card Header: Retro Framed Photo Badge + Tier + Status */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  
                  {/* Badge Custom Framed Photo with Funny Sticker Overlay */}
                  <div className="relative group/frame">
                    <AchievementBadgeFrame
                      achievementId={item.id}
                      tier={item.tier}
                      isUnlocked={isUnlocked}
                      isSecret={item.isSecret}
                      size={68}
                      showGlow={isUnlocked}
                      animate={true}
                      className="transition-transform group-hover:scale-105"
                    />
                    
                    {/* Funny Sticker Emoji */}
                    <div 
                      className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs border shadow-2xs ${
                        isUnlocked 
                          ? 'bg-white border-purple-300' 
                          : item.isSecret 
                            ? 'bg-purple-900 border-purple-400 text-yellow-300' 
                            : 'bg-slate-200 border-slate-300 grayscale opacity-80'
                      }`}
                      title={item.isSecret && !isUnlocked ? "Conquista Secreta" : "Símbolo divertido"}
                    >
                      {item.isSecret && !isUnlocked ? '🔒' : item.funnySticker}
                    </div>

                    {/* Quick Expand Icon Hint */}
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-md bg-slate-900/80 text-white opacity-0 group-hover/frame:opacity-100 transition-opacity text-[10px]">
                      <Maximize2 className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Tier and Status Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1">
                      {item.isSecret && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300">
                          🔒 SECRETA
                        </span>
                      )}
                      {getTierLabel(item.tier)}
                    </div>
                    
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-black shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                        <span>✅ Conquistada (+{item.xpReward || 50} XP)</span>
                      </span>
                    ) : item.currentProgress > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-[11px] font-black">
                        <span>⏳ Em andamento</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 text-[11px] font-bold">
                        <Lock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                        <span>{item.isSecret ? '🔒 Oculta' : '🔒 Bloqueada'}</span>
                      </span>
                    )}

                    <span className="text-[10px] text-purple-700 font-bold hover:underline flex items-center gap-1 mt-1">
                      <span>Ver moldura</span>
                      <Maximize2 className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-base font-black mb-0.5 leading-snug ${isUnlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                  {item.isSecret && !isUnlocked ? '🔒 ???' : item.title}
                </h3>

                {/* Subtitle / Funny Hook */}
                {item.subtitle && (
                  <p className="text-[11px] font-bold text-purple-800 mb-2 italic line-clamp-1">
                    {item.isSecret && !isUnlocked ? '“Conquista Secreta”' : `"${item.subtitle}"`}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {item.isSecret && !isUnlocked 
                    ? 'Continue explorando a plataforma para descobrir como desbloquear esta conquista secreta.'
                    : (isUnlocked ? (item.unlockedDescription || item.description) : item.description)}
                </p>

                {/* Funny Quote Box */}
                {item.funnyQuote && (
                  <div className={`p-2.5 rounded-xl text-[11px] font-medium italic mb-3 border ${
                    isUnlocked 
                      ? 'bg-purple-50/70 border-purple-200/80 text-purple-950' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {item.isSecret && !isUnlocked 
                      ? '“O mistério recompensa quem explora com empatia e coragem.”'
                      : item.funnyQuote}
                  </div>
                )}

                {/* Requirement Hint for Locked Badges */}
                {!isUnlocked && (
                  <div className="bg-purple-50/50 border border-purple-200/60 p-2.5 rounded-xl text-[11px] text-slate-600 mb-3">
                    <span className="font-extrabold text-purple-950 block mb-0.5">🎯 Como desbloquear:</span>
                    <p className="leading-snug">
                      {item.isSecret 
                        ? '‘Requisito secreto. Continue explorando a plataforma.’' 
                        : item.requirementHint}
                    </p>
                  </div>
                )}

              </div>

              {/* Progress Indicator & CTA */}
              <div className="mt-2 pt-3 border-t border-purple-100/80">
                {showProgressBar && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                      <span>Progresso:</span>
                      <span className="font-mono text-purple-900 font-black">
                        {item.currentProgress} / {item.maxProgress} {item.progressUnit || 'itens'}
                      </span>
                    </div>

                    <div 
                      role="progressbar"
                      aria-valuenow={item.currentProgress}
                      aria-valuemin={0}
                      aria-valuemax={item.maxProgress}
                      aria-label={`Progresso de ${item.title}: ${item.currentProgress} de ${item.maxProgress}`}
                      className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200"
                    >
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUnlocked ? 'bg-emerald-500' : 'bg-purple-600'
                        }`}
                        style={{ width: `${progressPercentItem}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action CTA for locked or in-progress badges */}
                {!isUnlocked ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(item.id);
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <span>Fazer Missão</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <Sparkles className="w-3 h-3" /> Desbloqueada
                    </span>
                    <span>{item.unlockedAt ? new Date(item.unlockedAt).toLocaleDateString('pt-BR') : 'Ativa'}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* DETAILED FRAMED BADGE INSPECTION MODAL */}
      {inspectedBadge && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspected-badge-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in text-slate-800"
          onClick={handleCloseInspection}
        >
          <div 
            id="inspected-badge-modal-card"
            className="bg-white border-2 border-purple-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center animate-scale-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleCloseInspection}
              aria-label="Fechar visualização de moldura"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge Type */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>{inspectedBadge.isSecret ? 'Moldura Secreta Misteriosa' : 'Moldura Oficial do Sentinela'}</span>
            </div>

            {/* High-Resolution Framed Badge Showcase */}
            <div className="my-3 flex justify-center items-center relative">
              <div className={`p-3 rounded-3xl border shadow-inner ${
                inspectedBadge.isSecret && inspectedBadge.isUnlocked
                  ? 'bg-gradient-to-b from-purple-950/20 to-amber-950/20 border-amber-400/80 ring-4 ring-purple-400/30'
                  : 'bg-gradient-to-b from-slate-900/5 to-slate-900/10 border-purple-200/60'
              }`}>
                <AchievementBadgeFrame
                  achievementId={inspectedBadge.id}
                  tier={inspectedBadge.tier}
                  isUnlocked={inspectedBadge.isUnlocked}
                  isSecret={inspectedBadge.isSecret}
                  size={128}
                  showGlow={inspectedBadge.isUnlocked}
                  animate={true}
                />
              </div>

              {/* Floating Sticker on top right of frame */}
              <div className="absolute top-0 right-1/4 translate-x-4 -translate-y-2 w-9 h-9 rounded-full bg-white border-2 border-purple-300 shadow-md flex items-center justify-center text-lg">
                {inspectedBadge.isSecret && !inspectedBadge.isUnlocked ? '🔒' : inspectedBadge.funnySticker}
              </div>
            </div>

            {/* Tier & Status Pills */}
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              {inspectedBadge.isSecret && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300">
                  🔒 CONQUISTA SECRETA
                </span>
              )}
              {getTierLabel(inspectedBadge.tier)}
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                ⚡ +{inspectedBadge.xpReward || 50} XP
              </span>
              {inspectedBadge.isUnlocked ? (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Conquistada</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-black">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{inspectedBadge.isSecret ? 'Oculta' : 'Ainda Bloqueada'}</span>
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <h2 id="inspected-badge-title" className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              {inspectedBadge.isSecret && !inspectedBadge.isUnlocked ? '🔒 ???' : inspectedBadge.title}
            </h2>

            {inspectedBadge.subtitle && (
              <p className="text-xs font-bold text-purple-800 mb-3 italic">
                {inspectedBadge.isSecret && !inspectedBadge.isUnlocked ? '“Conquista Secreta”' : `"${inspectedBadge.subtitle}"`}
              </p>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 px-2">
              {inspectedBadge.isSecret && !inspectedBadge.isUnlocked
                ? 'Continue explorando a plataforma para descobrir como desbloquear esta conquista secreta.'
                : (inspectedBadge.isUnlocked ? (inspectedBadge.unlockedDescription || inspectedBadge.description) : inspectedBadge.description)}
            </p>

            {/* Funny Quote */}
            {inspectedBadge.funnyQuote && (
              <div className="bg-purple-50/90 border border-purple-200/90 rounded-2xl p-3 text-xs text-purple-950 font-medium italic mb-4">
                {inspectedBadge.isSecret && !inspectedBadge.isUnlocked
                  ? '“O mistério recompensa quem explora com empatia e coragem.”'
                  : inspectedBadge.funnyQuote}
              </div>
            )}

            {/* Requirement / Mission CTA */}
            {!inspectedBadge.isUnlocked ? (
              <div className="space-y-3 pt-2">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-950 text-left">
                  <strong className="block mb-0.5">🎯 Como Conquistar:</strong>
                  <span>
                    {inspectedBadge.isSecret 
                      ? 'Requisito secreto. Continue explorando a plataforma.' 
                      : inspectedBadge.requirementHint}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const id = inspectedBadge.id;
                    setInspectedBadge(null);
                    handleActionClick(id);
                  }}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>{inspectedBadge.isSecret ? 'Explorar Recursos' : 'Ir Para a Missão Agora'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setCelebratedBadgeId(inspectedBadge.id);
                  soundEngine.playChimeSuccess();
                  setInspectedBadge(null);
                }}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>🎉 Comemorar Conquista!</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

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
  RotateCw
} from 'lucide-react';
import { Achievement, AchievementCategory } from './types';
import { useApp } from './AppContext';
import { soundEngine } from './relaxingAudio';

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
  const { achievements, setActiveTab } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unlocked' | 'in_progress' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tipIndex, setTipIndex] = useState<number>(0);
  const [celebratedBadgeId, setCelebratedBadgeId] = useState<string | null>(null);

  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const inProgressCount = achievements.filter(a => !a.isUnlocked && a.currentProgress > 0).length;
  const lockedCount = achievements.filter(a => !a.isUnlocked && a.currentProgress === 0).length;
  const progressPercent = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

  // Funny Rank title based on unlocked count
  const getRankInfo = () => {
    if (unlockedCount >= 15) {
      return {
        title: "👑 Lorde Supremo Anti-Bullying",
        description: "Imunidade total a grosserias e mestre supremo do bom senso escolar.",
        color: "text-amber-900 bg-amber-100 border-amber-300",
        badgeEmoji: "👑"
      };
    }
    if (unlockedCount >= 10) {
      return {
        title: "🧙‍♂️ Mestre Yoda da Convivência",
        description: "Mais sábio que o professor de história e mais calmo que lagoa serena.",
        color: "text-purple-900 bg-purple-100 border-purple-300",
        badgeEmoji: "✨"
      };
    }
    if (unlockedCount >= 6) {
      return {
        title: "⚡ Faixa Preta do Respeito",
        description: "Seus argumentos de convivência ética desarmam qualquer discussão boba.",
        color: "text-indigo-900 bg-indigo-100 border-indigo-300",
        badgeEmoji: "⚡"
      };
    }
    if (unlockedCount >= 3) {
      return {
        title: "🥋 Guardião em Treinamento",
        description: "Já defende o amigo no recreio e não aceita exclusão em trabalhos de grupo.",
        color: "text-blue-900 bg-blue-100 border-blue-300",
        badgeEmoji: "🛡️"
      };
    }
    return {
      title: "🌱 Novato da Cultura de Paz",
      description: "Começando a jornada de respeito e descobrindo seus direitos protegidos por lei.",
      color: "text-emerald-900 bg-emerald-100 border-emerald-300",
      badgeEmoji: "🌱"
    };
  };

  const rankInfo = getRankInfo();

  // Play celebration sound when clicking an unlocked card
  const handleBadgeClick = (item: Achievement) => {
    if (item.isUnlocked) {
      setCelebratedBadgeId(item.id);
      soundEngine.playChimeSuccess();
      setTimeout(() => setCelebratedBadgeId(null), 1800);
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
    <div className="w-full max-w-full space-y-6 animate-fade-in text-slate-800">
      
      {/* Header & Overview Showcase */}
      <div className="bg-white border border-purple-200/90 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
              <Trophy className="w-4 h-4 text-purple-700" aria-hidden="true" />
              <span>Distintivos & Conquistas de Honra Escolar</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              🏆 Minhas Conquistas ({unlockedCount}/{totalAchievements})
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Aprenda a combater a zueira pesada, pratique a empatia e domine seus direitos protegidos por lei. Cada conquista é salva com 100% de sigilo no seu dispositivo.
            </p>

            {/* Current Level / Rank Badge */}
            <div className={`inline-flex items-center gap-3 p-3 rounded-2xl border ${rankInfo.color} shadow-2xs`}>
              <span className="text-2xl">{rankInfo.badgeEmoji}</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80 block">Seu Nível Atual:</span>
                <strong className="text-sm sm:text-base font-black block">{rankInfo.title}</strong>
                <span className="text-xs opacity-90">{rankInfo.description}</span>
              </div>
            </div>
          </div>

          {/* Overall Progress Gauge Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-w-[270px] shrink-0 shadow-2xs">
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
              className="w-full bg-purple-200/90 h-3.5 rounded-full overflow-hidden p-0.5 mb-2 shadow-inner"
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
              <span>Clique nos desbloqueados para comemorar!</span>
            </div>
          </div>

        </div>
      </div>

      {/* Humorous Anti-Bullying Tip of the Day */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-purple-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
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
            <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 italic leading-relaxed">
              {FUNNY_TIPS[tipIndex]}
            </p>
          </div>
        </div>

        <button
          onClick={nextTip}
          className="shrink-0 py-2 px-3.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Ver outra dica divertida"
        >
          <RotateCw className="w-3.5 h-3.5 text-amber-700" />
          <span>Outra Dica</span>
        </button>
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

      {/* Badges Grid (18 Humorous & Intuitive Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredAchievements.map((item) => {
          const isUnlocked = item.isUnlocked;
          const showProgressBar = item.maxProgress > 1;
          const progressPercentItem = Math.min(100, Math.round((item.currentProgress / item.maxProgress) * 100));
          const isCelebrated = celebratedBadgeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleBadgeClick(item)}
              className={`group rounded-3xl p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white border-purple-300/90 shadow-xs ring-1 ring-purple-200/70 hover:shadow-md hover:border-purple-400 cursor-pointer'
                  : 'bg-white/85 border-slate-200/90 text-slate-600 shadow-2xs hover:border-purple-200'
              } ${isCelebrated ? 'scale-[1.02] ring-4 ring-amber-300 animate-pulse' : ''}`}
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
                
                {/* Card Header: Icon + Tier + Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  
                  {/* Badge Icon Box with Funny Sticker Overlay */}
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300 shadow-2xs'
                        : 'bg-slate-100 border-slate-200'
                    }`}>
                      {renderIcon(item.iconType, isUnlocked)}
                    </div>
                    
                    {/* Funny Sticker Emoji */}
                    <div 
                      className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs border shadow-2xs ${
                        isUnlocked ? 'bg-white border-purple-300' : 'bg-slate-200 border-slate-300 grayscale opacity-80'
                      }`}
                      title="Símbolo divertido"
                    >
                      {item.funnySticker}
                    </div>
                  </div>

                  {/* Tier and Status Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    {getTierLabel(item.tier)}
                    
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-black shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                        <span>✅ Conquistada</span>
                      </span>
                    ) : item.currentProgress > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-[11px] font-black">
                        <span>⏳ Em andamento</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 text-[11px] font-bold">
                        <Lock className="w-3 h-3 text-slate-400" aria-hidden="true" />
                        <span>🔒 Bloqueada</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-base font-black mb-0.5 leading-snug ${isUnlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                  {item.title}
                </h3>

                {/* Subtitle / Funny Hook */}
                {item.subtitle && (
                  <p className="text-[11px] font-bold text-purple-800 mb-2 italic line-clamp-1">
                    "{item.subtitle}"
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {isUnlocked ? (item.unlockedDescription || item.description) : item.description}
                </p>

                {/* Funny Quote Box */}
                {item.funnyQuote && (
                  <div className={`p-2.5 rounded-xl text-[11px] font-medium italic mb-3 border ${
                    isUnlocked 
                      ? 'bg-purple-50/70 border-purple-200/80 text-purple-950' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {item.funnyQuote}
                  </div>
                )}

                {/* Requirement Hint for Locked Badges */}
                {!isUnlocked && (
                  <div className="bg-purple-50/50 border border-purple-200/60 p-2.5 rounded-xl text-[11px] text-slate-600 mb-3">
                    <span className="font-extrabold text-purple-950 block mb-0.5">🎯 Como desbloquear:</span>
                    <p className="leading-snug">{item.requirementHint}</p>
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

    </div>
  );
};

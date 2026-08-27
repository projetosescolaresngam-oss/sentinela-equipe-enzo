import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trophy, 
  Award, 
  Sparkles, 
  Zap, 
  Calendar, 
  Target, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Flame,
  Palette,
  Layers,
  Lock,
  Check
} from 'lucide-react';
import { useApp } from './AppContext';
import { LEVEL_PROGRESSION_TIERS } from './levelProgression';
import { AvatarRenderer } from './AvatarRenderer';
import { CosmeticsCustomizer } from './CosmeticsCustomizer';
import { getCosmeticById, ALL_COSMETIC_REWARDS } from './cosmeticsRewards';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { 
    anonymousIdentity, 
    userGamificationProfile, 
    userRankPosition,
    achievements,
    cosmeticsProfile,
    profileModalInitialTab,
    setActiveTab,
    setIsBreathingModalOpen
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'daily' | 'weekly' | 'ladder' | 'collection' | 'customize'>('overview');

  useEffect(() => {
    if (isOpen) {
      setActiveSubTab(profileModalInitialTab || 'overview');
    }
  }, [isOpen, profileModalInitialTab]);

  if (!isOpen) return null;

  const {
    currentLevel,
    currentLevelTitle,
    currentLevelBadgeEmoji,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progressPercentInLevel,
    isMaxLevel,
    totalXp,
    dailyMissions,
    weeklyMissions
  } = userGamificationProfile;

  const unlockedAchievementsCount = achievements.filter(a => a.isUnlocked).length;
  const completedDailyCount = dailyMissions.filter(m => m.isCompleted).length;
  const completedWeeklyCount = weeklyMissions.filter(m => m.isCompleted).length;

  const unlockedCosmeticsCount = cosmeticsProfile.unlockedRewardIds.length;
  const totalCosmeticsCount = ALL_COSMETIC_REWARDS.length;

  const equippedTheme = getCosmeticById(cosmeticsProfile.equippedThemeId) || getCosmeticById('theme_sentinela_classico');
  const equippedTitle = getCosmeticById(cosmeticsProfile.equippedTitleId);
  const equippedBadge = getCosmeticById(cosmeticsProfile.equippedBadgeId);

  const displayTitle = equippedTitle?.id === 'title_nivel_dinamico' || !equippedTitle
    ? currentLevelTitle
    : equippedTitle.customTitleText || equippedTitle.name;

  const handleNavigate = (tab: 'achievements' | 'ranking' | 'education' | 'simulations') => {
    setActiveTab(tab);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-purple-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header with Active Theme Background */}
        <div className={`bg-gradient-to-r ${equippedTheme?.themeStyle?.cardGradient || 'from-purple-900 via-indigo-900 to-purple-950'} text-white p-5 sm:p-6 relative transition-all duration-300 border-b border-purple-400/30`}>
          <button
            id="close-profile-modal-btn"
            onClick={onClose}
            aria-label="Fechar perfil"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Dynamic Avatar with Equipped Frame, Icon & Effect */}
            <div className="shrink-0">
              <AvatarRenderer 
                frameId={cosmeticsProfile.equippedFrameId}
                iconId={cosmeticsProfile.equippedIconId}
                effectId={cosmeticsProfile.equippedEffectId}
                level={currentLevel}
                levelBadgeEmoji={currentLevelBadgeEmoji}
                size="lg"
              />
            </div>

            {/* Header Text & Identity */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {anonymousIdentity.displayName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-purple-100 text-xs font-bold">
                  100% Anônimo
                </span>
                {equippedBadge && equippedBadge.id !== 'badge_nenhum' && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-extrabold flex items-center gap-1">
                    <span>{equippedBadge.iconPreview}</span>
                    <span>{equippedBadge.name}</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-purple-200 font-medium mb-3">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <span>{currentLevelBadgeEmoji}</span>
                  <span>{displayTitle}</span>
                </span>
                <span>•</span>
                <span className="font-semibold text-purple-100">
                  Total: {totalXp} XP
                </span>
                {userRankPosition > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-bold">#{userRankPosition} no Ranking</span>
                  </>
                )}
              </div>

              {/* XP Progress Bar */}
              <div className="w-full bg-purple-950/80 rounded-full p-1 border border-purple-400/30">
                <div className="flex justify-between text-[11px] font-bold px-1.5 mb-1 text-purple-200">
                  <span>
                    {isMaxLevel ? 'Status Supremo (Nível 20)' : `Progresso Nível ${currentLevel}`}
                  </span>
                  <span>
                    {isMaxLevel ? (
                      'Nível 20 (MAX)'
                    ) : (
                      `${xpInCurrentLevel} / ${xpNeededForNextLevel} XP`
                    )}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-purple-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, progressPercentInLevel)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-purple-100 bg-purple-50/70 px-3 sm:px-6 pt-3 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'overview'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Visão Geral
          </button>
          
          <button
            onClick={() => setActiveSubTab('customize')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'customize'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Palette className="w-4 h-4 text-purple-600" />
            Personalizar Perfil
          </button>

          <button
            onClick={() => setActiveSubTab('collection')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'collection'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            Minha Coleção
            <span className="px-1.5 py-0.2 rounded-full bg-purple-200 text-purple-900 text-[10px] font-black">
              {unlockedCosmeticsCount}/{totalCosmeticsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('daily')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'daily'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Missões Diárias
            <span className="px-1.5 py-0.2 rounded-full bg-purple-200 text-purple-900 text-[10px] font-black">
              {completedDailyCount}/{dailyMissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('weekly')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'weekly'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            Desafios Semanais
            <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black">
              {completedWeeklyCount}/{weeklyMissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('ladder')}
            className={`pb-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'ladder'
                ? 'border-purple-600 text-purple-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            20 Níveis
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: OVERVIEW */}
          {activeSubTab === 'overview' && (
            <div className="space-y-4 animate-fade-in">
              {/* Quick Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 flex flex-col items-center text-center">
                  <Palette className="w-4 h-4 text-purple-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recompensas</span>
                  <span className="text-sm sm:text-base font-black text-purple-950">
                    {unlockedCosmeticsCount} <span className="text-xs text-slate-400 font-normal">/ {totalCosmeticsCount}</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col items-center text-center">
                  <Trophy className="w-4 h-4 text-indigo-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Conquistas</span>
                  <span className="text-sm sm:text-base font-black text-indigo-950">
                    {unlockedAchievementsCount} <span className="text-xs text-slate-400 font-normal">/ {achievements.length}</span>
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center text-center">
                  <Zap className="w-4 h-4 text-amber-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">XP Total</span>
                  <span className="text-sm sm:text-base font-black text-amber-950">
                    {totalXp} XP
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center">
                  <Target className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ranking</span>
                  <span className="text-sm sm:text-base font-black text-emerald-950">
                    {userRankPosition > 0 ? `#${userRankPosition}` : 'Top 10'}
                  </span>
                </div>
              </div>

              {/* Reward Customization Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 border border-purple-400/40">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center shrink-0 shadow-xs font-black text-xl">
                    🎁
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white flex items-center gap-1.5">
                      <span>Personalização & Recompensas Virtuais</span>
                      <span className="text-[10px] font-bold bg-amber-400 text-purple-950 px-2 py-0.2 rounded-full">
                        100% Cosmético
                      </span>
                    </h4>
                    <p className="text-xs text-purple-200 mt-0.5">
                      Desbloqueie molduras, ícones, títulos e auras conforme sobe de nível e completa conquistas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => setActiveSubTab('customize')}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-bold transition-all shadow-xs whitespace-nowrap"
                  >
                    Personalizar Perfil
                  </button>
                </div>
              </div>

              {/* Action Banner for XP */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-purple-950">Como evoluir mais rápido?</h4>
                    <p className="text-xs text-slate-600">Complete quizzes (+50 XP), simulações (+40 XP) e missões diárias.</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleNavigate('education')}
                    className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
                  >
                    Fazer Quiz (+50 XP)
                  </button>
                </div>
              </div>

              {/* Navigation Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => handleNavigate('achievements')}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-purple-200 bg-white hover:bg-purple-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-black text-sm text-slate-900 block">Quadro de Conquistas</span>
                      <span className="text-xs text-slate-500">23 medalhas com recompensas</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNavigate('ranking')}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-purple-200 bg-white hover:bg-purple-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-black text-sm text-slate-900 block">Ranking Anônimo Escolar</span>
                      <span className="text-xs text-slate-500">Competição saudável e segura</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMIZE PROFILE */}
          {activeSubTab === 'customize' && (
            <CosmeticsCustomizer initialCategory="frame" initialFilter="all" />
          )}

          {/* TAB 3: MY COLLECTION */}
          {activeSubTab === 'collection' && (
            <CosmeticsCustomizer initialCategory="frame" initialFilter="unlocked" />
          )}

          {/* TAB 4: DAILY MISSIONS */}
          {activeSubTab === 'daily' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-purple-950">
                  Missões Diárias Verificáveis
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Renova à meia-noite
                </span>
              </div>

              {dailyMissions.map((mission) => (
                <div 
                  key={mission.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    mission.isCompleted
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                      : 'bg-white border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      mission.isCompleted ? 'bg-emerald-600 text-white' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {mission.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {mission.title}
                        </span>
                        {mission.isCompleted && (
                          <span className="px-2 py-0.2 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                            Concluída ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                        {mission.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-xl bg-purple-100 border border-purple-300 text-purple-950 font-black text-xs">
                      +{mission.rewardXp} XP
                    </span>
                    {!mission.isCompleted && (
                      <button
                        onClick={() => {
                          if (mission.category === 'quiz') handleNavigate('education');
                          else if (mission.category === 'simulation') handleNavigate('simulations');
                          else if (mission.category === 'education') handleNavigate('education');
                          else if (mission.category === 'breathing') {
                            onClose();
                            setIsBreathingModalOpen(true);
                          }
                        }}
                        className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors whitespace-nowrap"
                      >
                        Ir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: WEEKLY MISSIONS */}
          {activeSubTab === 'weekly' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                  Desafios Semanais
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Renova toda semana
                </span>
              </div>

              {weeklyMissions.map((mission) => (
                <div 
                  key={mission.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    mission.isCompleted
                      ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                      : 'bg-white border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      mission.isCompleted ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {mission.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Flame className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {mission.title}
                        </span>
                        {mission.isCompleted && (
                          <span className="px-2 py-0.2 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase">
                            Concluído ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {mission.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                    <div className="text-xs font-bold text-slate-500">
                      Progresso: <span className="text-purple-950 font-black">{mission.currentCount}/{mission.targetCount}</span>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs">
                      +{mission.rewardXp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: 20-LEVEL LADDER */}
          {activeSubTab === 'ladder' && (
            <div className="space-y-2.5 animate-fade-in max-h-[50vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-slate-600 mb-3">
                <span className="font-black text-purple-950">Sistema de 20 Níveis do Sentinela:</span> Evolua conquistando XP através de quizzes, simulações, condutas éticas e desafios semanais. Cada nível desbloqueia novas recompensas cosméticas exclusivas!
              </div>

              {LEVEL_PROGRESSION_TIERS.map((tier) => {
                const isCurrent = tier.level === currentLevel;
                const isReached = tier.level <= currentLevel;

                return (
                  <div
                    key={tier.level}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-purple-100/90 border-purple-500 ring-2 ring-purple-400/40 text-purple-950 shadow-xs'
                        : isReached
                        ? 'bg-purple-50/40 border-purple-200 text-slate-800'
                        : 'bg-slate-50/80 border-slate-200 text-slate-400 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isCurrent
                          ? 'bg-purple-600 text-white shadow-xs'
                          : isReached
                          ? 'bg-purple-200 text-purple-900'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {tier.level}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span>{tier.badgeEmoji}</span>
                          <span className={`font-black text-xs sm:text-sm truncate ${
                            isCurrent ? 'text-purple-950 font-black' : isReached ? 'text-slate-900' : 'text-slate-500'
                          }`}>
                            {tier.title}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.2 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase">
                              Seu Nível
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {tier.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-600 block">
                        {tier.minXp} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-purple-50/90 border-t border-purple-100 p-3 sm:p-4 flex items-center justify-between text-xs text-slate-500">
          <span>Identificador: <strong className="text-purple-950">{anonymousIdentity.displayName}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

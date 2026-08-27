import React from 'react';
import { useApp } from './AppContext';
import { Trophy, Zap } from 'lucide-react';
import { AvatarRenderer } from './AvatarRenderer';
import { getCosmeticById } from './cosmeticsRewards';

interface UserProfileHeaderProps {
  onOpenProfileModal: () => void;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ 
  onOpenProfileModal
}) => {
  const { 
    anonymousIdentity, 
    userGamificationProfile,
    userRankPosition,
    cosmeticsProfile
  } = useApp();

  const {
    currentLevel,
    currentLevelTitle,
    currentLevelBadgeEmoji,
    xpInCurrentLevel,
    xpNeededForNextLevel,
    progressPercentInLevel,
    isMaxLevel,
    totalXp
  } = userGamificationProfile;

  const equippedTheme = getCosmeticById(cosmeticsProfile.equippedThemeId) || getCosmeticById('theme_sentinela_classico');
  const equippedTitle = getCosmeticById(cosmeticsProfile.equippedTitleId);
  const equippedBadge = getCosmeticById(cosmeticsProfile.equippedBadgeId);

  // Active displayed title text
  const displayTitle = equippedTitle?.id === 'title_nivel_dinamico' || !equippedTitle
    ? currentLevelTitle
    : equippedTitle.customTitleText || equippedTitle.name;

  const themeGradient = equippedTheme?.themeStyle?.cardGradient || 'from-purple-900 via-purple-800 to-indigo-950';
  const themeBorder = equippedTheme?.themeStyle?.borderHighlight || 'border-purple-500/40 hover:border-purple-400/90';
  const themeGlow = equippedTheme?.themeStyle?.glowColor || 'from-purple-500/20 to-indigo-500/20';

  return (
    <button
      id="user-profile-header-card"
      type="button"
      onClick={onOpenProfileModal}
      title="Clique para abrir seu Perfil Gamificado, Coleção & Recompensas"
      aria-label={`Perfil de ${anonymousIdentity.displayName}, Nível ${currentLevel} ${displayTitle}`}
      className={`group relative flex items-center gap-2 sm:gap-2.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-1.5 rounded-2xl bg-gradient-to-br ${themeGradient} text-white border ${themeBorder} shadow-xs hover:shadow-purple-900/30 hover:shadow-md transition-all active:scale-[0.98] text-left shrink-0 w-auto max-w-[210px] xs:max-w-[240px] sm:max-w-[270px] xl:max-w-[285px] 2xl:max-w-[315px]`}
    >
      {/* Decorative soft glowing aura on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${themeGlow} rounded-2xl blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

      {/* Dynamic Avatar with Equipped Frame, Icon & Effect */}
      <AvatarRenderer 
        frameId={cosmeticsProfile.equippedFrameId}
        iconId={cosmeticsProfile.equippedIconId}
        effectId={cosmeticsProfile.equippedEffectId}
        level={currentLevel}
        levelBadgeEmoji={currentLevelBadgeEmoji}
        size="sm"
        showLevelBadge={true}
        className="group-hover:scale-105 transition-transform"
      />

      {/* Info Stack: Name + Level & Title + XP Progress Bar */}
      <div className="flex flex-col justify-center min-w-0 flex-1 z-10">
        {/* Line 1: Identity Name & Level/Custom Title */}
        <div className="flex items-center justify-between gap-1 leading-none mb-0.5 sm:mb-1">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-black text-xs sm:text-[12.5px] text-white tracking-tight group-hover:text-amber-200 transition-colors drop-shadow-xs whitespace-nowrap">
              {anonymousIdentity.displayName}
            </span>
            <span className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.2 rounded-md bg-purple-700/60 text-purple-200 text-[9px] font-bold border border-purple-500/30 truncate max-w-[90px] xl:max-w-[120px] 2xl:max-w-[140px]">
              <span className="shrink-0">{currentLevelBadgeEmoji}</span>
              <span className="truncate">{displayTitle}</span>
            </span>
          </div>

          {/* Ranking Position or Special Badge */}
          {equippedBadge && equippedBadge.id !== 'badge_nenhum' ? (
            <span 
              title={equippedBadge.name}
              className="hidden xl:inline-flex items-center text-[10px] bg-amber-500/20 px-1 py-0.2 rounded-full border border-amber-400/40 shrink-0"
            >
              {equippedBadge.iconPreview}
            </span>
          ) : userRankPosition > 0 ? (
            <span className="hidden xl:inline-flex items-center gap-0.5 text-[8.5px] font-black text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded-full border border-amber-400/40 shrink-0">
              <Trophy className="w-2.5 h-2.5 text-amber-400" />
              #{userRankPosition}
            </span>
          ) : null}
        </div>

        {/* Line 2: XP Numbers & Progress Bar */}
        <div className="w-full flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] leading-none text-purple-200/90 font-semibold">
            <span className="flex items-center gap-0.5 text-amber-300 font-extrabold whitespace-nowrap">
              <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-300 shrink-0" />
              <span>Nv. {currentLevel}</span>
            </span>
            <span className="text-[8.5px] sm:text-[9px] font-medium text-purple-200/90 tracking-tight whitespace-nowrap">
              {isMaxLevel ? (
                <span className="text-amber-300 font-black">{totalXp} XP</span>
              ) : (
                <>
                  <strong className="text-white font-bold">{xpInCurrentLevel}</strong>
                  <span className="text-purple-300/70">/</span>
                  <span>{xpNeededForNextLevel} XP</span>
                </>
              )}
            </span>
          </div>

          {/* Smooth XP Progress Bar */}
          <div className="w-full h-1 sm:h-1.5 bg-purple-950/90 rounded-full overflow-hidden border border-purple-500/40 p-[0.5px]">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isMaxLevel 
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-xs' 
                  : 'bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300'
              }`}
              style={{ width: `${Math.max(4, progressPercentInLevel)}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

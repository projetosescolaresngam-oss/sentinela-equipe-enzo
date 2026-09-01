import React from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Lock, 
  Trophy, 
  ShieldCheck, 
  Zap, 
  Crown, 
  Award, 
  Star, 
  Target, 
  Flame, 
  BookOpen, 
  Compass,
  CheckCircle2,
  Users,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { CosmeticRewardItem, CosmeticRarity } from './types';
import { getRarityBadge, getCategoryLabel } from './cosmeticsRewards';
import { AvatarRenderer } from './AvatarRenderer';
import { useApp } from './AppContext';
import { soundEngine } from './relaxingAudio';

interface ItemInspectionModalProps {
  item: CosmeticRewardItem | null;
  onClose: () => void;
  onEquip?: (item: CosmeticRewardItem) => void;
}

export const ItemInspectionModal: React.FC<ItemInspectionModalProps> = ({
  item,
  onClose,
  onEquip
}) => {
  const { 
    anonymousIdentity,
    userGamificationProfile, 
    cosmeticsProfile, 
    achievements,
    educationalProgress,
    userRankPosition
  } = useApp();

  if (!item) return null;

  const {
    currentLevel,
    currentLevelBadgeEmoji,
    totalXp
  } = userGamificationProfile;

  const isUnlocked = cosmeticsProfile.unlockedRewardIds.includes(item.id);
  const isSecretLocked = item.isSecret && !isUnlocked;

  let isEquipped = false;
  if (item.category === 'frame') isEquipped = cosmeticsProfile.equippedFrameId === item.id;
  else if (item.category === 'icon') isEquipped = cosmeticsProfile.equippedIconId === item.id;
  else if (item.category === 'title') isEquipped = cosmeticsProfile.equippedTitleId === item.id;
  else if (item.category === 'badge') isEquipped = cosmeticsProfile.equippedBadgeId === item.id;
  else if (item.category === 'effect') isEquipped = cosmeticsProfile.equippedEffectId === item.id;
  else if (item.category === 'theme') isEquipped = cosmeticsProfile.equippedThemeId === item.id;

  const rarityBadge = getRarityBadge(item.rarity);

  // Helper to compute progress for the 3 requirement cards
  const calculateRequirements = () => {
    if (item.unlockRequirementsList && item.unlockRequirementsList.length > 0) {
      return item.unlockRequirementsList.map(req => {
        let current = 0;
        switch (req.currentProgressKey) {
          case 'level':
            current = currentLevel;
            break;
          case 'achievements':
            current = achievements.filter(a => a.unlocked || (a as any).isUnlocked).length;
            break;
          case 'epic_achievements':
            current = achievements.filter(a => (a.unlocked || (a as any).isUnlocked) && (a.tier === 'ouro' || a.tier === 'lendario' || (a as any).rarity === 'epico')).length;
            break;
          case 'quizzes':
            current = educationalProgress.totalQuizzesCompleted || 0;
            break;
          case 'simulations':
            current = educationalProgress.totalSimulationsCompleted || 0;
            break;
          case 'breathing':
            current = educationalProgress.totalBreathingSessionsCompleted || 0;
            break;
          case 'perfect_quizzes':
            current = educationalProgress.perfectQuizzesCount || 0;
            break;
          case 'days':
            current = userGamificationProfile.streakDays || 1;
            break;
          default:
            current = currentLevel;
        }
        const percent = Math.min(100, Math.round((current / req.target) * 100));
        return {
          ...req,
          current,
          percent,
          isCompleted: current >= req.target
        };
      });
    }

    // Default fallback based on unlockCondition
    const cond = item.unlockCondition;
    if (cond.type === 'default') {
      return [{
        label: 'Acesso Inicial',
        current: 1,
        target: 1,
        percent: 100,
        isCompleted: true,
        icon: '🌱'
      }];
    }
    if (cond.type === 'level') {
      const target = cond.minLevel || 1;
      return [{
        label: `Alcance o Nível ${target}`,
        current: currentLevel,
        target,
        percent: Math.min(100, Math.round((currentLevel / target) * 100)),
        isCompleted: currentLevel >= target,
        icon: '🎯'
      }];
    }
    if (cond.type === 'achievement') {
      const ach = achievements.find(a => a.id === cond.achievementId);
      const isDone = ach ? ach.unlocked : false;
      return [{
        label: `Conquista "${ach?.title || 'Especial'}"`,
        current: isDone ? 1 : 0,
        target: 1,
        percent: isDone ? 100 : 0,
        isCompleted: isDone,
        icon: '🏆'
      }];
    }
    if (cond.type === 'quiz_count') {
      const target = cond.minCount || 1;
      const count = educationalProgress.totalQuizzesCompleted || 0;
      return [{
        label: `Completar ${target} Quizzes`,
        current: count,
        target,
        percent: Math.min(100, Math.round((count / target) * 100)),
        isCompleted: count >= target,
        icon: '📝'
      }];
    }
    if (cond.type === 'simulation_count') {
      const target = cond.minCount || 1;
      const count = educationalProgress.totalSimulationsCompleted || 0;
      return [{
        label: `Completar ${target} Simulações`,
        current: count,
        target,
        percent: Math.min(100, Math.round((count / target) * 100)),
        isCompleted: count >= target,
        icon: '⚖️'
      }];
    }
    if (cond.type === 'breathing_count') {
      const target = cond.minCount || 1;
      const count = educationalProgress.totalBreathingSessionsCompleted || 0;
      return [{
        label: `Completar ${target} Sessões Zen`,
        current: count,
        target,
        percent: Math.min(100, Math.round((count / target) * 100)),
        isCompleted: count >= target,
        icon: '💨'
      }];
    }

    return [{
      label: cond.description,
      current: isUnlocked ? 1 : 0,
      target: 1,
      percent: isUnlocked ? 100 : 0,
      isCompleted: isUnlocked,
      icon: '🔒'
    }];
  };

  const requirements = calculateRequirements();

  // 3 Default Lore Details if not specified
  const loreDetails = item.loreDetails || [
    {
      icon: '🔮',
      title: 'Efeito Exclusivo Sentinela',
      desc: 'Composição gráfica premium forjada nos padrões de honra e respeito da comunidade escolar.'
    },
    {
      icon: '🛡️',
      title: 'Símbolo Guardião',
      desc: 'Representa proteção ativa, acolhimento, empatia e liderança positiva entre os colegas.'
    },
    {
      icon: '💎',
      title: 'Cristal Evolutivo',
      desc: 'Destaca sua identidade anônima com acabamento brilhante proporcional à sua dedicação.'
    }
  ];

  const loreQuote = item.loreQuote || (
    item.rarity === 'supremo' || item.rarity === 'mitico'
      ? '"Um verdadeiro guardião não usa poder para dominar, mas para proteger e iluminar."'
      : item.rarity === 'lendario' || item.rarity === 'epico'
      ? '"A coragem de defender a paz transforma um simples aluno em um farol de esperança."'
      : '"Pequenas atitudes diárias de empatia constroem a maior fortaleza contra o bullying."'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Outer Container with Premium Dark Gold/Cosmic Glow */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 text-white rounded-3xl border border-purple-500/40 shadow-2xl p-4 sm:p-7 overflow-hidden my-auto">
        
        {/* Background Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-colors z-20"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================================================================= */}
        {/* 1. TOP HEADER: Category, Title, Rarity Badge & Lore Description    */}
        {/* ================================================================= */}
        <div className="pr-10 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
              <span>✦</span>
              <span>{getCategoryLabel(item.category)}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{isSecretLocked ? '??? (Item Oculto)' : item.name}</span>
              <span className="text-xl sm:text-2xl">{item.iconPreview}</span>
            </h2>

            <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5 ${rarityBadge.bgClass} ${rarityBadge.textClass} ${rarityBadge.borderClass}`}>
              <span>✦</span>
              <span>{rarityBadge.label}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed max-w-2xl">
            {isSecretLocked 
              ? `Pista Oculta: ${item.secretClue || 'Descubra os segredos e atitudes nobres na plataforma para revelar este colecionável.'}`
              : item.description}
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. MAIN 2-COLUMN DISPLAY (Large Display Left | Profile & Lore Right) */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-5 sm:mb-6 items-center">
          
          {/* LEFT: Central Cinematic Item Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-purple-900/40 via-slate-900/60 to-purple-950/60 border border-purple-400/30 relative overflow-hidden min-h-[280px]">
            
            {/* Cinematic Radial Ray Burst */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 bg-purple-500/25 rounded-full blur-2xl animate-pulse" />
              <div className="w-40 h-40 bg-amber-400/15 rounded-full blur-xl" />
            </div>

            {/* Giant Avatar & Frame Renderer */}
            <div className="relative z-10 my-6 flex items-center justify-center">
              {item.category === 'frame' && (
                <AvatarRenderer 
                  frameId={item.id}
                  iconId={cosmeticsProfile.equippedIconId}
                  effectId={cosmeticsProfile.equippedEffectId}
                  level={currentLevel}
                  levelBadgeEmoji={currentLevelBadgeEmoji}
                  size="2xl"
                  showLevelBadge={true}
                />
              )}

              {item.category === 'icon' && (
                <AvatarRenderer 
                  frameId={cosmeticsProfile.equippedFrameId}
                  iconId={item.id}
                  effectId={cosmeticsProfile.equippedEffectId}
                  level={currentLevel}
                  levelBadgeEmoji={currentLevelBadgeEmoji}
                  size="2xl"
                  showLevelBadge={true}
                />
              )}

              {item.category === 'effect' && (
                <AvatarRenderer 
                  frameId={cosmeticsProfile.equippedFrameId}
                  iconId={cosmeticsProfile.equippedIconId}
                  effectId={item.id}
                  level={currentLevel}
                  levelBadgeEmoji={currentLevelBadgeEmoji}
                  size="2xl"
                  showLevelBadge={true}
                />
              )}

              {item.category === 'badge' && (
                <div className="flex flex-col items-center justify-center">
                  <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${item.badgeStyle?.badgeGradient || 'from-purple-900 to-indigo-950'} text-amber-300 flex items-center justify-center text-5xl shadow-2xl border-4 ${item.badgeStyle?.badgeBorder || 'border-amber-400'} animate-pulse`}>
                    {item.iconPreview}
                  </div>
                  {item.badgeStyle?.ribbonText && (
                    <span className="mt-3 text-xs font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-400/60 shadow-lg">
                      {item.badgeStyle.ribbonText}
                    </span>
                  )}
                </div>
              )}

              {item.category === 'title' && (
                <div className="flex flex-col items-center justify-center p-4">
                  <span className="text-5xl mb-2">{item.iconPreview}</span>
                  <div className="text-base sm:text-lg font-black text-amber-300 bg-purple-950/90 px-5 py-2 rounded-2xl border-2 border-amber-400/70 shadow-xl tracking-wide">
                    « {item.customTitleText || item.name} »
                  </div>
                </div>
              )}

              {item.category === 'theme' && (
                <div className={`w-64 p-5 rounded-2xl bg-gradient-to-r ${item.themeStyle?.cardGradient || 'from-purple-900 to-indigo-950'} text-white text-center shadow-2xl border-2 ${item.themeStyle?.borderHighlight || 'border-purple-400'}`}>
                  <span className="text-3xl block mb-1">{item.iconPreview}</span>
                  <div className="text-base font-black">{item.name}</div>
                  <div className="text-xs text-purple-200 mt-1">Estilo Visual do Perfil</div>
                </div>
              )}
            </div>

            {/* Subtle Subtitle */}
            <div className="relative z-10 text-[11px] font-bold text-purple-300/80 uppercase tracking-widest mt-2 flex items-center gap-1.5">
              <span>✦</span>
              <span>Visualização de Alta Definição</span>
              <span>✦</span>
            </div>

          </div>

          {/* RIGHT: Live Profile Preview + 3 Item Lore Details */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* PRÉVIA NO PERFIL CARD (Identical to game reference image) */}
            <div className="rounded-2xl p-3.5 bg-purple-900/30 border border-purple-400/30 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10.5px] font-black uppercase tracking-widest text-amber-300 flex items-center gap-1">
                  <span>✦</span>
                  <span>PRÉVIA NO PERFIL</span>
                  <span>✦</span>
                </span>
                <span className="text-[10px] font-bold text-purple-300">
                  {anonymousIdentity.displayName}
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/30">
                <AvatarRenderer 
                  frameId={item.category === 'frame' ? item.id : cosmeticsProfile.equippedFrameId}
                  iconId={item.category === 'icon' ? item.id : cosmeticsProfile.equippedIconId}
                  effectId={item.category === 'effect' ? item.id : cosmeticsProfile.equippedEffectId}
                  level={currentLevel}
                  levelBadgeEmoji={currentLevelBadgeEmoji}
                  size="md"
                  showLevelBadge={false}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-white truncate">
                      {anonymousIdentity.displayName}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-400/40">
                      Nv. {currentLevel}
                    </span>
                  </div>

                  <div className="text-[10px] text-amber-300 font-bold flex items-center gap-1 truncate">
                    <span>{currentLevelBadgeEmoji}</span>
                    <span>{item.category === 'title' ? (item.customTitleText || item.name) : userGamificationProfile.currentLevelTitle}</span>
                  </div>

                  <div className="text-[9.5px] text-purple-200/70 mt-0.5">
                    {totalXp} XP • 100% Anônimo
                  </div>
                </div>
              </div>
            </div>

            {/* DETALHES DA MOLDURA / DO ITEM (3 Vertical Lore Cards) */}
            <div className="rounded-2xl p-3.5 bg-slate-900/60 border border-purple-500/30 space-y-2.5">
              <span className="text-[10.5px] font-black uppercase tracking-widest text-purple-200 block mb-1">
                DETALHES DO COLECIONÁVEL
              </span>

              {loreDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-purple-950/40 border border-purple-500/20">
                  <span className="text-lg shrink-0 mt-0.5">{detail.icon}</span>
                  <div>
                    <h5 className="text-[11.5px] font-black text-purple-100">{detail.title}</h5>
                    <p className="text-[10.5px] text-purple-300/80 leading-tight mt-0.5">{detail.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ================================================================= */}
        {/* 3. COMO DESBLOQUEAR (Multi-Requirement Progress Bars)             */}
        {/* ================================================================= */}
        <div className="rounded-2xl p-4 bg-slate-900/80 border border-purple-500/30 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base border shadow-xs ${
                isUnlocked 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                  : 'bg-purple-950 text-purple-300 border-purple-700/60'
              }`}>
                {isUnlocked ? <Check className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-300" />}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  {isUnlocked ? 'Requisitos Cumpridos!' : 'Como Desbloquear'}
                </h4>
                <p className="text-[11px] text-purple-300">
                  {isUnlocked 
                    ? 'Item desbloqueado e disponível na sua coleção permanente.' 
                    : isSecretLocked 
                    ? 'Condição secreta. Continue explorando a plataforma para desbloquear.' 
                    : item.unlockCondition.description}
                </p>
              </div>
            </div>

            {isUnlocked && (
              <span className="text-[11px] font-black text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/40 self-start sm:self-auto">
                ✓ Desbloqueado
              </span>
            )}
          </div>

          {/* Requirements Progress Bar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {requirements.map((req, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/20 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-1 text-[11px] mb-1.5">
                  <span className="font-bold text-purple-200 truncate flex items-center gap-1">
                    {req.icon && <span>{req.icon}</span>}
                    <span>{req.label}</span>
                  </span>
                  <span className={`font-mono font-black ${req.isCompleted ? 'text-emerald-300' : 'text-purple-300'}`}>
                    {req.current}/{req.target}
                  </span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-purple-500/30">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      req.isCompleted 
                        ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                        : 'bg-gradient-to-r from-purple-500 to-amber-400'
                    }`}
                    style={{ width: `${req.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. FOOTER: Tags, Quote & Equip Action Button                      */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-500/30">
          
          {/* 3 Game Info Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center gap-2">
              <span className="text-xs text-purple-400">Raridade</span>
              <span className="text-xs font-black text-white">{rarityBadge.label}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center gap-2">
              <span className="text-xs text-purple-400">Tipo</span>
              <span className="text-xs font-black text-white">{getCategoryLabel(item.category)}</span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center gap-2">
              <span className="text-xs text-purple-400">Disponível para</span>
              <span className="text-xs font-black text-amber-300">Todos os Alunos</span>
            </div>
          </div>

          {/* Lore Quote */}
          <div className="text-center lg:text-right text-[11px] italic text-purple-300/90 max-w-md">
            {loreQuote}
          </div>

          {/* Action Button: Equip / Close */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
            {isEquipped ? (
              <button
                disabled
                className="w-full lg:w-auto px-6 py-2.5 rounded-2xl bg-purple-800/80 text-white text-xs font-black cursor-default flex items-center justify-center gap-2 border border-purple-400/50"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Em Uso no Perfil</span>
              </button>
            ) : isUnlocked ? (
              <button
                onClick={() => {
                  if (onEquip) onEquip(item);
                  onClose();
                }}
                className="w-full lg:w-auto px-7 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-black shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Equipar no Perfil</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full lg:w-auto px-6 py-2.5 rounded-2xl bg-slate-800 text-slate-400 text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2 border border-slate-700"
              >
                <Lock className="w-4 h-4" />
                <span>Requisitos Pendentes</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

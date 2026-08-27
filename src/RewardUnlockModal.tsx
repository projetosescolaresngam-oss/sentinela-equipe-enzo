import React, { useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  Layers, 
  ArrowRight, 
  Trophy, 
  Gift
} from 'lucide-react';
import { CosmeticRewardItem } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { getCategoryLabel, getCategoryEmoji, getRarityBadge } from './cosmeticsRewards';
import { soundEngine } from './relaxingAudio';

interface RewardUnlockModalProps {
  rewardQueue: CosmeticRewardItem[];
  currentLevel: number;
  currentLevelBadgeEmoji: string;
  onEquip: (reward: CosmeticRewardItem) => void;
  onDismiss: () => void;
  onOpenCollection: () => void;
}

export const RewardUnlockModal: React.FC<RewardUnlockModalProps> = ({
  rewardQueue = [],
  currentLevel = 1,
  currentLevelBadgeEmoji = '🌱',
  onEquip,
  onDismiss,
  onOpenCollection
}) => {
  const currentReward = rewardQueue && rewardQueue.length > 0 ? rewardQueue[0] : null;

  useEffect(() => {
    if (currentReward) {
      soundEngine?.playChimeSuccess?.();
    }
  }, [currentReward]);

  if (!currentReward) return null;

  const categoryLabel = getCategoryLabel(currentReward.category);
  const categoryEmoji = getCategoryEmoji(currentReward.category);
  const rarityInfo = getRarityBadge(currentReward.rarity);
  const isMultiple = rewardQueue.length > 1;

  const handleEquipNow = () => {
    onEquip(currentReward);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/75 backdrop-blur-xs animate-fade-in"
      onClick={onDismiss}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-2 border-purple-300 overflow-hidden animate-scale-in flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Soft Background Visual Accents */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onDismiss}
          aria-label="Fechar notificação de recompensa"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5 text-purple-600 animate-bounce" />
          <span>Nova Recompensa Desbloqueada!</span>
          {isMultiple && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-purple-600 text-white text-[10px]">
              1 de {rewardQueue.length}
            </span>
          )}
        </div>

        {/* Big Cosmetic Item Preview */}
        <div className="my-3 p-4 rounded-3xl bg-gradient-to-b from-purple-50/80 to-indigo-50/80 border border-purple-200 w-full flex flex-col items-center justify-center relative shadow-inner">
          
          {currentReward.category === 'frame' && (
            <AvatarRenderer 
              frameId={currentReward.id} 
              iconId="icon_escudo_aprendiz"
              level={currentLevel}
              levelBadgeEmoji={currentLevelBadgeEmoji}
              size="xl"
            />
          )}

          {currentReward.category === 'icon' && (
            <AvatarRenderer 
              frameId="frame_sentinela_roxa" 
              iconId={currentReward.id}
              level={currentLevel}
              levelBadgeEmoji={currentLevelBadgeEmoji}
              size="xl"
            />
          )}

          {currentReward.category === 'effect' && (
            <AvatarRenderer 
              frameId="frame_sentinela_roxa" 
              iconId="icon_escudo_aprendiz"
              effectId={currentReward.id}
              level={currentLevel}
              levelBadgeEmoji={currentLevelBadgeEmoji}
              size="xl"
            />
          )}

          {currentReward.category === 'theme' && (
            <div className={`w-full p-4 rounded-2xl bg-gradient-to-r ${currentReward.themeStyle?.cardGradient || 'from-purple-900 to-indigo-950'} text-white border ${currentReward.themeStyle?.borderHighlight || 'border-purple-400'} shadow-md flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-2.5">
                <AvatarRenderer size="sm" showLevelBadge={false} />
                <div className="text-left">
                  <div className="text-xs font-black">Anônimo 001</div>
                  <div className="text-[10px] text-purple-200">{currentReward.name}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentReward.themeStyle?.accentBadge || 'bg-purple-700 text-purple-100'}`}>
                Novo Tema
              </span>
            </div>
          )}

          {currentReward.category === 'title' && (
            <div className="flex flex-col items-center gap-2 py-2">
              <span className="text-2xl">{currentReward.iconPreview}</span>
              <div className="px-3.5 py-1.5 rounded-xl bg-purple-900 text-amber-300 font-black text-sm border-2 border-amber-400 shadow-md">
                « {currentReward.customTitleText || currentReward.name} »
              </div>
            </div>
          )}

          {currentReward.category === 'badge' && (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-900 text-amber-300 flex items-center justify-center text-3xl shadow-lg border-2 border-amber-400 animate-pulse">
                {currentReward.iconPreview}
              </div>
              <div className="text-xs font-black text-purple-950 uppercase tracking-wider">
                Emblema Honorífico
              </div>
            </div>
          )}

          {/* Rarity & Category Sub-Pills */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1 shadow-2xs">
              <span>{categoryEmoji}</span>
              <span>{categoryLabel}</span>
            </span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-md border ${rarityInfo.bgClass} ${rarityInfo.textClass} ${rarityInfo.borderClass} shadow-2xs`}>
              {rarityInfo.label}
            </span>
          </div>
        </div>

        {/* Reward Title & Details */}
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-1">
          {currentReward.name}
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-3 max-w-sm">
          {currentReward.description}
        </p>

        {/* Unlock reason message */}
        <div className="p-2.5 rounded-xl bg-purple-50 text-[11px] text-purple-900 font-medium mb-5 w-full flex items-center justify-center gap-1.5 border border-purple-200">
          <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <span>{currentReward.unlockCondition.description}</span>
        </div>

        {/* Primary Action Buttons */}
        <div className="w-full space-y-2">
          <button
            id="btn-equip-reward-now"
            onClick={handleEquipNow}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Usar / Equipar Agora</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onDismiss();
                onOpenCollection();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-purple-200"
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Ver Minha Coleção</span>
            </button>

            <button
              onClick={onDismiss}
              className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              {isMultiple ? 'Próximo' : 'Continuar'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

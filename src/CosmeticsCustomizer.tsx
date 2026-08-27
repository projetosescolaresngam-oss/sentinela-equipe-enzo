import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Lock, 
  Layers, 
  Search, 
  Trophy, 
  ShieldCheck, 
  Zap, 
  Crown, 
  Palette, 
  Smile, 
  Flame, 
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Award,
  Filter,
  Eye,
  Maximize2
} from 'lucide-react';
import { useApp } from './AppContext';
import { 
  CosmeticCategory, 
  CosmeticRewardItem, 
  CosmeticRarity 
} from './types';
import { 
  ALL_COSMETIC_REWARDS, 
  getCategoryLabel, 
  getCategoryEmoji, 
  getRarityBadge, 
  getCosmeticById 
} from './cosmeticsRewards';
import { AvatarRenderer } from './AvatarRenderer';
import { ItemInspectionModal } from './ItemInspectionModal';
import { soundEngine } from './relaxingAudio';

interface CosmeticsCustomizerProps {
  initialCategory?: CosmeticCategory;
  initialFilter?: 'all' | 'unlocked' | 'locked';
  onNavigateToTab?: (tab: any) => void;
}

export const CosmeticsCustomizer: React.FC<CosmeticsCustomizerProps> = ({
  initialCategory = 'frame',
  initialFilter = 'all'
}) => {
  const { 
    anonymousIdentity, 
    userGamificationProfile, 
    cosmeticsProfile, 
    equipCosmetic,
    userRankPosition
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CosmeticCategory>(initialCategory);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unlocked' | 'locked'>(initialFilter);
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [justEquippedMessage, setJustEquippedMessage] = useState<string | null>(null);
  const [inspectedItem, setInspectedItem] = useState<CosmeticRewardItem | null>(null);

  const {
    currentLevel,
    currentLevelTitle,
    currentLevelBadgeEmoji,
    totalXp
  } = userGamificationProfile;

  // Selected Theme, Frame, Icon, Effect, Title, Badge
  const equippedTheme = getCosmeticById(cosmeticsProfile.equippedThemeId) || getCosmeticById('theme_sentinela_classico');
  const equippedTitle = getCosmeticById(cosmeticsProfile.equippedTitleId);
  const equippedBadge = getCosmeticById(cosmeticsProfile.equippedBadgeId);

  const categories: { id: CosmeticCategory; label: string; icon: string }[] = [
    { id: 'frame', label: 'Molduras', icon: '🖼️' },
    { id: 'icon', label: 'Ícones', icon: '🛡️' },
    { id: 'title', label: 'Títulos', icon: '🏷️' },
    { id: 'badge', label: 'Emblemas', icon: '🏅' },
    { id: 'effect', label: 'Efeitos', icon: '✨' },
    { id: 'theme', label: 'Temas', icon: '🎨' },
  ];

  const rarityOptions = [
    { id: 'all', label: 'Todas Raridades' },
    { id: 'comum', label: '⚪ Comum' },
    { id: 'incomum', label: '🟢 Incomum' },
    { id: 'raro', label: '🔵 Raro' },
    { id: 'epico', label: '🟣 Épico' },
    { id: 'lendario', label: '🟠 Lendário' },
    { id: 'mitico', label: '🔴 Mítico' },
    { id: 'supremo', label: '🌈 Supremo' },
  ];

  // Filter items
  const categoryItems = ALL_COSMETIC_REWARDS.filter(item => item.category === selectedCategory);
  
  const filteredItems = categoryItems.filter(item => {
    const isUnlocked = cosmeticsProfile.unlockedRewardIds.includes(item.id);
    if (filterStatus === 'unlocked' && !isUnlocked) return false;
    if (filterStatus === 'locked' && isUnlocked) return false;
    if (selectedRarity !== 'all' && item.rarity !== selectedRarity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      // If secret and locked, don't reveal in name search unless unlocked
      if (item.isSecret && !isUnlocked) {
        return 'secreto'.includes(q) || (item.secretClue && item.secretClue.toLowerCase().includes(q));
      }
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  const totalUnlockedCount = cosmeticsProfile.unlockedRewardIds.length;
  const totalCosmeticsCount = ALL_COSMETIC_REWARDS.length;
  const collectionPercentage = Math.round((totalUnlockedCount / totalCosmeticsCount) * 100);

  const handleEquip = (item: CosmeticRewardItem) => {
    equipCosmetic(item.category, item.id);
    soundEngine.playChimeSuccess();
    setJustEquippedMessage(`"${item.name}" equipado com sucesso!`);
    setTimeout(() => {
      setJustEquippedMessage(null);
    }, 2800);
  };

  // Determine current active custom title text
  const displayTitle = equippedTitle?.id === 'title_nivel_dinamico' || !equippedTitle
    ? currentLevelTitle
    : equippedTitle.customTitleText || equippedTitle.name;

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      
      {/* ========================================================================= */}
      {/* 1. 🌟 PREVIEW AO VIVO DO PERFIL ANÔNIMO                                    */}
      {/* ========================================================================= */}
      <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-purple-900/90 to-indigo-950 text-white border border-purple-400/40 shadow-xl relative overflow-hidden">
        
        {/* Glow behind */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-black uppercase tracking-wider text-purple-200">
              Preview do Perfil em Tempo Real
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              🏆 {totalUnlockedCount} / {totalCosmeticsCount} Colecionáveis ({collectionPercentage}%)
            </span>
          </div>
        </div>

        {/* Progress Bar of the Entire Collection */}
        <div className="w-full bg-purple-950/80 rounded-full h-2 mb-4 border border-purple-400/30 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-400 via-fuchsia-400 to-cyan-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${collectionPercentage}%` }}
          />
        </div>

        {/* The Animated Header Card Simulation with Active Theme */}
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${equippedTheme?.themeStyle?.cardGradient || 'from-purple-900 via-purple-800 to-indigo-950'} border ${equippedTheme?.themeStyle?.borderHighlight || 'border-purple-400/60'} shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300`}>
          
          <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Live Avatar with Equipped Frame, Icon & Effect */}
            <AvatarRenderer 
              frameId={cosmeticsProfile.equippedFrameId}
              iconId={cosmeticsProfile.equippedIconId}
              effectId={cosmeticsProfile.equippedEffectId}
              level={currentLevel}
              levelBadgeEmoji={currentLevelBadgeEmoji}
              size="lg"
            />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-black text-base sm:text-lg text-white tracking-tight">
                  {anonymousIdentity.displayName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white/20 text-purple-100 border border-white/30">
                  100% Anônimo
                </span>
              </div>

              {/* Title & Badge line */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-purple-200">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <span>{currentLevelBadgeEmoji}</span>
                  <span>{displayTitle}</span>
                </span>

                {equippedBadge && equippedBadge.id !== 'badge_nenhum' && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-white bg-amber-500/30 px-2 py-0.5 rounded-md border border-amber-400/40 shadow-xs">
                      <span>{equippedBadge.iconPreview}</span>
                      <span>{equippedBadge.name}</span>
                    </span>
                  </>
                )}
              </div>

              <div className="text-[11px] text-purple-200/80 mt-1 flex items-center gap-2">
                <span>Nível {currentLevel}</span>
                <span>•</span>
                <span>{totalXp} XP Acumulado</span>
                {userRankPosition > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-bold">#{userRankPosition} no Ranking</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end text-right text-xs text-purple-200/90 shrink-0">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
              Tema Equipado
            </span>
            <span className="font-bold text-white mt-0.5">
              {equippedTheme?.name || 'Sentinela Clássico'}
            </span>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {justEquippedMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{justEquippedMessage}</span>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 2. 🗂️ CATEGORY SWITCHER PILLS                                             */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const catItems = ALL_COSMETIC_REWARDS.filter(i => i.category === cat.id);
          const catUnlocked = catItems.filter(i => cosmeticsProfile.unlockedRewardIds.includes(i.id)).length;
          
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-purple-700 text-white shadow-md scale-102 ring-2 ring-purple-400/50'
                  : 'bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-950 border border-purple-200 shadow-2xs'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-black ${
                isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-900'
              }`}>
                {catUnlocked}/{catItems.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. 🔍 FILTERS & SEARCH BAR                                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
        
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterStatus === 'all'
                ? 'bg-purple-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({categoryItems.length})
          </button>
          <button
            onClick={() => setFilterStatus('unlocked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              filterStatus === 'unlocked'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Check className="w-3 h-3" />
            <span>Desbloqueados</span>
          </button>
          <button
            onClick={() => setFilterStatus('locked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              filterStatus === 'locked'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>Bloqueados</span>
          </button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Rarity Select */}
          <select
            value={selectedRarity}
            onChange={e => setSelectedRarity(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-purple-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {rarityOptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 md:w-44">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar item..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-purple-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. 🎁 GRID DE ITENS COSMÉTICOS                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map(item => {
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

          return (
            <div
              key={item.id}
              className={`relative rounded-2xl p-3.5 flex flex-col justify-between transition-all border ${
                isEquipped
                  ? 'bg-purple-50/90 border-purple-600 shadow-md ring-2 ring-purple-400'
                  : isSecretLocked
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-purple-900/60 text-purple-200 shadow-inner'
                  : isUnlocked
                  ? 'bg-white hover:bg-purple-50/40 border-purple-200 shadow-xs hover:shadow-md'
                  : 'bg-slate-50/80 border-slate-200 opacity-80'
              }`}
            >
              {/* Top Row: Rarity Tag & Inspect Button & Equipped Badge */}
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                    isSecretLocked 
                      ? 'bg-purple-950 text-purple-300 border-purple-800' 
                      : `${rarityBadge.bgClass} ${rarityBadge.textClass} ${rarityBadge.borderClass}`
                  }`}>
                    {isSecretLocked ? '🔒 Item Secreto' : rarityBadge.label}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setInspectedItem(item)}
                      className="p-1 rounded-lg bg-purple-100/80 hover:bg-purple-200 text-purple-700 hover:text-purple-900 transition-colors title='Inspecionar Recompensa'"
                      title="Ver Detalhes do Colecionável"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {isEquipped ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-700 text-white flex items-center gap-1 shadow-2xs">
                        <Check className="w-3 h-3" />
                        Equipado
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                        Desbloqueado
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Bloqueado
                      </span>
                    )}
                  </div>
                </div>

                {/* Item Center Preview */}
                <div 
                  onClick={() => setInspectedItem(item)}
                  className={`flex flex-col items-center justify-center my-2 p-3 rounded-xl min-h-[96px] border cursor-pointer hover:border-purple-300 transition-all ${
                  isSecretLocked 
                    ? 'bg-slate-950/60 border-purple-900/40' 
                    : 'bg-purple-50/40 border-purple-100'
                }`}>
                  {isSecretLocked ? (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-950 text-purple-400 border border-purple-700/60 flex items-center justify-center text-2xl animate-pulse mx-auto mb-1">
                        🗝️
                      </div>
                      <span className="text-[11px] font-mono text-purple-300 tracking-widest">???</span>
                    </div>
                  ) : (
                    <>
                      {item.category === 'frame' && (
                        <AvatarRenderer 
                          frameId={item.id}
                          iconId={cosmeticsProfile.equippedIconId}
                          level={currentLevel}
                          levelBadgeEmoji={currentLevelBadgeEmoji}
                          size="md"
                        />
                      )}

                      {item.category === 'icon' && (
                        <AvatarRenderer 
                          frameId={cosmeticsProfile.equippedFrameId}
                          iconId={item.id}
                          level={currentLevel}
                          levelBadgeEmoji={currentLevelBadgeEmoji}
                          size="md"
                        />
                      )}

                      {item.category === 'effect' && (
                        <AvatarRenderer 
                          frameId={cosmeticsProfile.equippedFrameId}
                          iconId={cosmeticsProfile.equippedIconId}
                          effectId={item.id}
                          level={currentLevel}
                          levelBadgeEmoji={currentLevelBadgeEmoji}
                          size="md"
                        />
                      )}

                      {item.category === 'title' && (
                        <div className="text-center">
                          <span className="text-2xl mb-1 block">{item.iconPreview}</span>
                          <div className="text-xs font-black text-purple-950 px-2.5 py-1 bg-white rounded-lg border border-purple-300 shadow-2xs">
                            « {item.customTitleText || item.name} »
                          </div>
                        </div>
                      )}

                      {item.category === 'badge' && (
                        <div className="text-center">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.badgeStyle?.badgeGradient || 'from-purple-900 to-indigo-950'} text-amber-300 flex items-center justify-center text-2xl shadow-xs border-2 ${item.badgeStyle?.badgeBorder || 'border-amber-400'} mx-auto mb-1`}>
                            {item.iconPreview}
                          </div>
                          {item.badgeStyle?.ribbonText && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-1.5 py-0.2 rounded-md border border-amber-500/40">
                              {item.badgeStyle.ribbonText}
                            </span>
                          )}
                        </div>
                      )}

                      {item.category === 'theme' && (
                        <div className={`w-full p-2.5 rounded-xl bg-gradient-to-r ${item.themeStyle?.cardGradient || 'from-purple-900 to-indigo-950'} text-white text-center shadow-xs border ${item.themeStyle?.borderHighlight || 'border-purple-400'}`}>
                          <div className="text-xs font-bold">{item.name}</div>
                          <div className="text-[10px] text-purple-200 mt-0.5">Estilo do Perfil</div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Name & Description */}
                <h4 className={`font-black text-xs sm:text-sm mb-0.5 ${
                  isSecretLocked ? 'text-purple-200' : 'text-slate-900'
                }`}>
                  {isSecretLocked ? '??? (Item Oculto)' : item.name}
                </h4>
                <p className={`text-[11px] leading-tight mb-2 ${
                  isSecretLocked ? 'text-purple-400 italic' : 'text-slate-500'
                }`}>
                  {isSecretLocked 
                    ? `Pista: ${item.secretClue || 'Descubra os segredos da plataforma para revelar.'}` 
                    : item.description}
                </p>
              </div>

              {/* Action Button & Requirement Hint */}
              <div className={`pt-2 border-t ${
                isSecretLocked ? 'border-purple-900/60' : 'border-purple-100/80'
              }`}>
                {isEquipped ? (
                  <button
                    disabled
                    className="w-full py-1.5 px-3 rounded-xl bg-purple-100 text-purple-900 text-xs font-black cursor-default flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-700" />
                    <span>Em Uso</span>
                  </button>
                ) : isUnlocked ? (
                  <button
                    onClick={() => handleEquip(item)}
                    className="w-full py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Equipar</span>
                  </button>
                ) : (
                  <div className={`p-1.5 rounded-xl text-[10.5px] font-medium flex items-center gap-1.5 ${
                    isSecretLocked 
                      ? 'bg-purple-950/80 text-purple-300 border border-purple-800/50' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Lock className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">
                      {isSecretLocked ? 'Condição Secreta' : item.unlockCondition.description}
                    </span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">Nenhum item encontrado</h4>
          <p className="text-xs text-slate-500 mt-1">Tente ajustar seus filtros de status ou raridade.</p>
        </div>
      )}

      {/* Item Inspection & Lore Modal */}
      {inspectedItem && (
        <ItemInspectionModal
          item={inspectedItem}
          onClose={() => setInspectedItem(null)}
          onEquip={handleEquip}
        />
      )}

    </div>
  );
};

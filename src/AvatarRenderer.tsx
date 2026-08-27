import React from 'react';
import { 
  ShieldCheck, 
  Shield, 
  Compass, 
  Star, 
  BookOpen, 
  Heart, 
  Trophy, 
  Zap, 
  Flame, 
  Brain, 
  Crown, 
  Gem, 
  Sparkles,
  Wind,
  Smile,
  User
} from 'lucide-react';
import { getCosmeticById } from './cosmeticsRewards';

interface AvatarRendererProps {
  frameId?: string;
  iconId?: string;
  effectId?: string;
  level?: number;
  levelBadgeEmoji?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLevelBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  frameId = 'frame_sentinela_classica',
  iconId = 'icon_anonimo_padrao',
  effectId = 'effect_nenhum',
  level = 1,
  levelBadgeEmoji = '🌱',
  size = 'md',
  showLevelBadge = true,
  className = '',
  onClick
}) => {
  const frameItem = getCosmeticById(frameId) || getCosmeticById('frame_sentinela_classica');
  const iconItem = getCosmeticById(iconId) || getCosmeticById('icon_anonimo_padrao');
  const effectItem = getCosmeticById(effectId) || getCosmeticById('effect_nenhum');

  // Size definitions
  const sizeMap = {
    xs: {
      container: 'w-7 h-7',
      inner: 'w-6 h-6',
      icon: 'w-3.5 h-3.5',
      badge: 'text-[7.5px] px-0.5 min-w-[13px] h-[13px] -bottom-1 -right-1',
      effectParticle: 'text-[8px] -top-1 -right-1'
    },
    sm: {
      container: 'w-8 h-8 sm:w-9 sm:h-9',
      inner: 'w-7 h-7 sm:w-8 sm:h-8',
      icon: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      badge: 'text-[8.5px] px-1 min-w-[15px] h-[15px] -bottom-1 -right-1',
      effectParticle: 'text-[10px] -top-1.5 -right-1.5'
    },
    md: {
      container: 'w-12 h-12',
      inner: 'w-10 h-10',
      icon: 'w-6 h-6',
      badge: 'text-[10px] px-1.5 min-w-[18px] h-[18px] -bottom-1 -right-1',
      effectParticle: 'text-xs -top-2 -right-2'
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      inner: 'w-14 h-14 sm:w-17 sm:h-17',
      icon: 'w-8 h-8 sm:w-10 sm:h-10',
      badge: 'text-xs px-2 py-0.5 min-w-[22px] h-[22px] -bottom-1 -right-1',
      effectParticle: 'text-sm -top-2.5 -right-2.5'
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      inner: 'w-21 h-21 sm:w-24 sm:h-24',
      icon: 'w-12 h-12 sm:w-14 sm:h-14',
      badge: 'text-sm px-2.5 py-0.5 min-w-[26px] h-[26px] -bottom-1.5 -right-1.5',
      effectParticle: 'text-base -top-3 -right-3'
    },
    '2xl': {
      container: 'w-32 h-32',
      inner: 'w-28 h-28',
      icon: 'w-16 h-16',
      badge: 'text-base px-3 py-1 -bottom-2 -right-2',
      effectParticle: 'text-lg -top-3.5 -right-3.5'
    }
  };

  const currentSize = sizeMap[size];

  // Helper to render icon graphic
  const renderIconGraphic = () => {
    const iconClass = `${currentSize.icon} text-amber-300 drop-shadow-xs transition-transform`;

    switch (iconItem?.id) {
      case 'icon_escudo_aprendiz':
        return <ShieldCheck className={iconClass} />;
      case 'icon_compass_explorador':
        return <Compass className={iconClass} />;
      case 'icon_estrela_guia':
        return <Star className={`${iconClass} fill-amber-300`} />;
      case 'icon_livro_sabedoria':
        return <BookOpen className={iconClass} />;
      case 'icon_coracao_empatia':
        return <Heart className={`${iconClass} text-rose-400 fill-rose-400`} />;
      case 'icon_trofeu_campeao':
        return <Trophy className={`${iconClass} fill-amber-400`} />;
      case 'icon_raio_acao':
        return <Zap className={`${iconClass} fill-amber-300`} />;
      case 'icon_chama_coragem':
        return <Flame className={`${iconClass} text-orange-400 fill-orange-400`} />;
      case 'icon_cerebro_sabio':
        return <Brain className={iconClass} />;
      case 'icon_diamante_resiliencia':
        return <Gem className={`${iconClass} text-cyan-300`} />;
      case 'icon_coroa_sabedoria':
        return <Crown className={`${iconClass} fill-amber-300`} />;
      case 'icon_lenda_suprema':
        return <Sparkles className={`${iconClass} fill-amber-300 animate-spin`} />;
      case 'icon_pomba_paz':
        return <Smile className={iconClass} />;
      case 'icon_zen_lotus':
        return <Wind className={`${iconClass} text-teal-300`} />;
      case 'icon_anonimo_padrao':
      default:
        return (
          <svg className={`${currentSize.icon} text-purple-200`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        );
    }
  };

  const frameBorderClass = frameItem?.frameStyle?.borderClass || 'p-1 bg-gradient-to-tr from-purple-500 to-indigo-600';
  const frameGlowClass = frameItem?.frameStyle?.glowClass || 'shadow-sm';
  const effectGlow = effectItem?.effectStyle?.glowClass || '';
  const effectAnim = effectItem?.effectStyle?.animationClass || '';
  const effectParticle = effectItem?.effectStyle?.particleEmoji;

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      onClick={onClick}
    >
      {/* Visual Effect Aura Glow Behind */}
      {effectItem && effectItem.id !== 'effect_nenhum' && (
        <div 
          className={`absolute -inset-1 rounded-full pointer-events-none ${effectGlow} ${effectAnim}`}
        />
      )}

      {/* Frame Container */}
      <div 
        className={`relative ${currentSize.container} rounded-full flex items-center justify-center ${frameBorderClass} ${frameGlowClass} transition-all`}
      >
        {/* Inner Avatar Bubble */}
        <div 
          className={`${currentSize.inner} rounded-full bg-purple-950/95 flex items-center justify-center overflow-hidden border border-white/20 shadow-inner`}
        >
          {renderIconGraphic()}
        </div>
      </div>

      {/* Floating Effect Sparkle / Particle */}
      {effectParticle && (
        <span 
          className={`absolute ${currentSize.effectParticle} pointer-events-none animate-bounce drop-shadow-sm`}
          aria-hidden="true"
        >
          {effectParticle}
        </span>
      )}

      {/* Level Badge Pin */}
      {showLevelBadge && (
        <span 
          title={`Nível ${level}`}
          className={`absolute ${currentSize.badge} rounded-full bg-amber-500 border border-purple-950 text-slate-950 font-black flex items-center justify-center shadow-xs z-10`}
        >
          {size === 'lg' || size === 'xl' || size === '2xl' ? `${levelBadgeEmoji} Nv.${level}` : level}
        </span>
      )}
    </div>
  );
};

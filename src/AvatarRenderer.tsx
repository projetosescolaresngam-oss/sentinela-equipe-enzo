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
  Glasses,
  Eye,
  Crosshair,
  Feather,
  Sun,
  Award
} from 'lucide-react';
import { getCosmeticById } from './cosmeticsRewards';
import { GuardiaoCosmicoFrame } from './GuardiaoCosmicoFrame';

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
      badge: 'text-[7.5px] px-1 min-w-[14px] h-[14px] -bottom-1 left-1/2 -translate-x-1/2',
      effectParticle: 'text-[8px] -top-1 -right-1',
      overlayScale: 0.58
    },
    sm: {
      container: 'w-9 h-9',
      inner: 'w-8 h-8',
      icon: 'w-4.5 h-4.5',
      badge: 'text-[8.5px] px-1 min-w-[16px] h-[16px] -bottom-1.5 left-1/2 -translate-x-1/2',
      effectParticle: 'text-[10px] -top-1.5 -right-1.5',
      overlayScale: 0.72
    },
    md: {
      container: 'w-12 h-12',
      inner: 'w-10 h-10',
      icon: 'w-6 h-6',
      badge: 'text-[9.5px] px-1.5 min-w-[18px] h-[18px] -bottom-1.5 left-1/2 -translate-x-1/2',
      effectParticle: 'text-xs -top-2 -right-2',
      overlayScale: 1.0
    },
    lg: {
      container: 'w-18 h-18 sm:w-20 sm:h-20',
      inner: 'w-15 h-15 sm:w-17 sm:h-17',
      icon: 'w-8 h-8 sm:w-9 sm:h-9',
      badge: 'text-[11px] px-2 py-0.5 min-w-[22px] h-[20px] -bottom-2 left-1/2 -translate-x-1/2',
      effectParticle: 'text-sm -top-2.5 -right-2.5',
      overlayScale: 1.45
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      inner: 'w-20 h-20 sm:w-24 sm:h-24',
      icon: 'w-11 h-11 sm:w-13 sm:h-13',
      badge: 'text-xs px-2.5 py-0.5 min-w-[26px] h-[24px] -bottom-2.5 left-1/2 -translate-x-1/2',
      effectParticle: 'text-base -top-3 -right-3',
      overlayScale: 2.0
    },
    '2xl': {
      container: 'w-32 h-32',
      inner: 'w-26 h-26',
      icon: 'w-14 h-14',
      badge: 'text-sm px-3 py-0.5 min-w-[30px] h-[26px] -bottom-3 left-1/2 -translate-x-1/2',
      effectParticle: 'text-lg -top-3.5 -right-3.5',
      overlayScale: 2.65
    }
  };

  const currentSize = sizeMap[size];

  // Helper to render rich icon graphics
  const renderIconGraphic = () => {
    const iconClass = `${currentSize.icon} drop-shadow-xs transition-transform`;

    switch (iconItem?.id) {
      case 'icon_escudo_aprendiz':
        return <ShieldCheck className={`${iconClass} text-cyan-300`} />;
      case 'icon_compass_explorador':
        return <Compass className={`${iconClass} text-teal-300`} />;
      case 'icon_estrela_guia':
        return <Star className={`${iconClass} text-amber-300 fill-amber-300`} />;
      case 'icon_livro_sabedoria':
        return <BookOpen className={`${iconClass} text-indigo-300`} />;
      case 'icon_coracao_empatia':
        return <Heart className={`${iconClass} text-rose-400 fill-rose-400`} />;
      case 'icon_trofeu_campeao':
        return <Trophy className={`${iconClass} text-amber-400 fill-amber-400`} />;
      case 'icon_raio_acao':
        return <Zap className={`${iconClass} text-amber-300 fill-amber-300`} />;
      case 'icon_chama_coragem':
        return <Flame className={`${iconClass} text-orange-400 fill-orange-400`} />;
      case 'icon_cerebro_sabio':
        return <Brain className={`${iconClass} text-fuchsia-300`} />;
      case 'icon_diamante_resiliencia':
        return <Gem className={`${iconClass} text-cyan-300`} />;
      case 'icon_coroa_sabedoria':
        return <Crown className={`${iconClass} text-amber-300 fill-amber-300`} />;
      case 'icon_lenda_suprema':
        return <Sparkles className={`${iconClass} text-amber-200 fill-amber-200 animate-spin duration-3000`} />;
      case 'icon_pomba_paz':
        return <Smile className={`${iconClass} text-emerald-300`} />;
      case 'icon_zen_lotus':
        return <Wind className={`${iconClass} text-teal-300`} />;
      
      // 🎮 NOVOS ÍCONES ÉPICOS, LENDÁRIOS, MÍTICOS E ENGRAÇADOS
      case 'icon_robo_eco':
        return (
          <svg className={`${currentSize.icon} text-emerald-400`} viewBox="0 0 32 32" fill="none">
            {/* Robot Antenna with leaf */}
            <line x1="16" y1="2" x2="16" y2="7" stroke="#10b981" strokeWidth="2" />
            <circle cx="16" cy="2" r="2" fill="#34d399" />
            <path d="M16 3C18 3 20 1 21 2C21 4 19 5 16 5" fill="#10b981" />
            {/* Robot Head */}
            <rect x="5" y="7" width="22" height="18" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            {/* Screen Visor */}
            <rect x="8" y="11" width="16" height="10" rx="3" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
            {/* Friendly Digital Eyes */}
            <circle cx="12" cy="15" r="2" fill="#34d399" />
            <circle cx="20" cy="15" r="2" fill="#34d399" />
            {/* Digital Smile */}
            <path d="M13 18C14.5 19.5 17.5 19.5 19 18" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'icon_frango_comico':
        return (
          <svg className={`${currentSize.icon} text-amber-400`} viewBox="0 0 32 32" fill="none">
            {/* Chicken Body */}
            <circle cx="16" cy="17" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
            {/* Comb */}
            <path d="M12 7C12 5 14 4 15 6C16 4 18 4 18 6C19 5 20 6 20 8H12V7Z" fill="#ef4444" />
            {/* Googly Eyes */}
            <circle cx="12" cy="14" r="3.5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
            <circle cx="13" cy="14" r="1.5" fill="#000" />
            <circle cx="20" cy="14" r="3.5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
            <circle cx="19" cy="13.5" r="1.5" fill="#000" />
            {/* Orange Open Beak */}
            <polygon points="16,16 19,20 13,20" fill="#f97316" stroke="#c2410c" strokeWidth="0.8" />
            {/* Wattle */}
            <circle cx="16" cy="22" r="2" fill="#ef4444" />
          </svg>
        );

      case 'icon_controle_gamer':
        return (
          <svg className={`${currentSize.icon} text-fuchsia-400`} viewBox="0 0 32 32" fill="none">
            <path d="M7 11C7 9 9 8 11 8H21C23 8 25 9 25 11V19C25 22 23 24 20 24L18 21H14L12 24C9 24 7 22 7 19V11Z" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
            {/* D-Pad */}
            <line x1="11" y1="13" x2="11" y2="17" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="9" y1="15" x2="13" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            {/* Action Buttons */}
            <circle cx="19" cy="13" r="1.2" fill="#f43f5e" />
            <circle cx="22" cy="15" r="1.2" fill="#22c55e" />
            <circle cx="19" cy="17" r="1.2" fill="#eab308" />
            <circle cx="16" cy="15" r="1.2" fill="#3b82f6" />
          </svg>
        );

      case 'icon_dragao_mistico':
        return (
          <svg className={`${currentSize.icon} text-orange-400`} viewBox="0 0 32 32" fill="none">
            {/* Dragon Horns & Head */}
            <path d="M8 8L11 14L16 6L21 14L24 8C26 15 24 24 16 27C8 24 6 15 8 8Z" fill="#7f1d1d" stroke="#f97316" strokeWidth="1.5" />
            {/* Slit Dragon Eyes */}
            <polygon points="12,14 14,16 11,17" fill="#fde047" />
            <polygon points="20,14 21,17 18,16" fill="#fde047" />
            {/* Nostrils & Breath */}
            <circle cx="14" cy="21" r="1" fill="#f97316" />
            <circle cx="18" cy="21" r="1" fill="#f97316" />
            <path d="M16 22L16 26" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'icon_mago_arcano':
        return (
          <svg className={`${currentSize.icon} text-indigo-400`} viewBox="0 0 32 32" fill="none">
            {/* Wizard Hat */}
            <polygon points="16,3 24,17 8,17" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
            <ellipse cx="16" cy="17" rx="10" ry="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
            {/* Star on hat */}
            <polygon points="16,9 17,11 19,11 17.5,12.5 18,15 16,13.5 14,15 14.5,12.5 13,11 15,11" fill="#fbbf24" />
            {/* Mystic Beard */}
            <path d="M11 19C11 25 16 28 16 28C16 28 21 25 21 19" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            {/* Glowing Eyes */}
            <circle cx="13.5" cy="18" r="1" fill="#38bdf8" />
            <circle cx="18.5" cy="18" r="1" fill="#38bdf8" />
          </svg>
        );

      case 'icon_ninja_sentinela':
        return (
          <svg className={`${currentSize.icon} text-cyan-400`} viewBox="0 0 32 32" fill="none">
            {/* Hood shape */}
            <path d="M16 3C10 3 6 8 6 15C6 21 8 26 16 28C24 26 26 21 26 15C26 8 22 3 16 3Z" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Face mask cutout */}
            <path d="M10 13H22V19C22 21 19 23 16 23C13 23 10 21 10 19V13Z" fill="#0f172a" />
            {/* Glowing visor / eyes */}
            <line x1="11" y1="15" x2="14" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="15" x2="21" y2="15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            {/* Forehead crest */}
            <polygon points="16,6 18,9 14,9" fill="#38bdf8" />
          </svg>
        );

      case 'icon_coruja_guerreira':
        return (
          <svg className={`${currentSize.icon} text-fuchsia-400`} viewBox="0 0 32 32" fill="none">
            {/* Owl ears & body */}
            <path d="M7 6L11 12H21L25 6C23 15 25 24 16 27C7 24 9 15 7 6Z" fill="#3b0764" stroke="#e879f9" strokeWidth="1.5" />
            {/* Big owl eye sockets */}
            <circle cx="12" cy="16" r="3.5" fill="#581c87" stroke="#f472b6" strokeWidth="1" />
            <circle cx="20" cy="16" r="3.5" fill="#581c87" stroke="#f472b6" strokeWidth="1" />
            {/* Glowing pupils */}
            <circle cx="12" cy="16" r="1.5" fill="#fdf2f8" />
            <circle cx="20" cy="16" r="1.5" fill="#fdf2f8" />
            {/* Beak */}
            <polygon points="16,17 17.5,21 14.5,21" fill="#fbbf24" />
          </svg>
        );

      case 'icon_oculos_radical':
      case 'icon_sentinela_radical':
        return (
          <svg className={`${currentSize.icon} text-cyan-300`} viewBox="0 0 32 32" fill="none">
            {/* Head circle */}
            <circle cx="16" cy="16" r="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Dark cool shades */}
            <path d="M8 12L15 13V17L9 16C8 16 7.5 15 8 12Z" fill="#0f172a" stroke="#000" strokeWidth="1" />
            <path d="M24 12L17 13V17L23 16C24 16 24.5 15 24 12Z" fill="#0f172a" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="13" x2="18" y2="13" stroke="#000" strokeWidth="2" />
            {/* White reflection in glasses */}
            <line x1="9" y1="13.5" x2="13" y2="15.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="18" y1="13.5" x2="22" y2="15.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            {/* Confident smile */}
            <path d="M12 21C14 23 18 23 20 21" stroke="#f0f9ff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'icon_ciborgue_visor':
        return (
          <svg className={`${currentSize.icon} text-emerald-400`} viewBox="0 0 32 32" fill="none">
            <rect x="6" y="8" width="20" height="16" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            <rect x="9" y="13" width="14" height="5" rx="2" fill="#022c22" />
            <line x1="10" y1="15.5" x2="22" y2="15.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="15.5" r="2" fill="#a7f3d0" />
            <line x1="16" y1="5" x2="16" y2="8" stroke="#34d399" strokeWidth="2" />
          </svg>
        );

      case 'icon_gato_gamer':
        return (
          <svg className={`${currentSize.icon} text-fuchsia-400`} viewBox="0 0 32 32" fill="none">
            {/* Cat Ears */}
            <polygon points="6,12 10,4 15,10" fill="#ec4899" stroke="#fbcfe8" strokeWidth="1.2" />
            <polygon points="26,12 22,4 17,10" fill="#ec4899" stroke="#fbcfe8" strokeWidth="1.2" />
            {/* Head */}
            <circle cx="16" cy="18" r="9" fill="#831843" stroke="#f472b6" strokeWidth="1.2" />
            {/* Gamer Headset over ears */}
            <path d="M7 16C7 10 25 10 25 16" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <rect x="5" y="14" width="4" height="6" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <rect x="23" y="14" width="4" height="6" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            {/* Cat Eyes */}
            <ellipse cx="13" cy="18" rx="1.5" ry="2" fill="#fde047" />
            <ellipse cx="19" cy="18" rx="1.5" ry="2" fill="#fde047" />
            {/* Cat Nose & Mouth */}
            <polygon points="16,20.5 15,19.5 17,19.5" fill="#fda4af" />
            <path d="M15 21.5C15.5 22 16.5 22 17 21.5" stroke="#fbcfe8" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        );

      case 'icon_fatia_pizza':
        return (
          <svg className={`${currentSize.icon}`} viewBox="0 0 32 32" fill="none">
            {/* Crust */}
            <path d="M6 8C12 5 20 5 26 8" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            {/* Cheese Slice Body */}
            <polygon points="6,9 26,9 16,27" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            {/* Melted Cheese drip */}
            <polygon points="8,10 24,10 16,25" fill="#fde047" />
            {/* Pepperonis */}
            <circle cx="13" cy="14" r="2.2" fill="#dc2626" />
            <circle cx="19" cy="15" r="2" fill="#dc2626" />
            <circle cx="16" cy="20" r="1.8" fill="#dc2626" />
            {/* Funny little eyes */}
            <circle cx="13" cy="13.5" r="0.6" fill="#fff" />
            <circle cx="19" cy="14.5" r="0.6" fill="#fff" />
          </svg>
        );

      case 'icon_alien_amigavel':
        return (
          <svg className={`${currentSize.icon}`} viewBox="0 0 32 32" fill="none">
            {/* Alien Head */}
            <ellipse cx="16" cy="17" rx="9" ry="11" fill="#059669" stroke="#34d399" strokeWidth="1.5" />
            {/* Big Expressive Alien Eyes */}
            <ellipse cx="12" cy="15" rx="3" ry="4" fill="#0f172a" stroke="#10b981" strokeWidth="0.8" transform="rotate(-15 12 15)" />
            <ellipse cx="20" cy="15" rx="3" ry="4" fill="#0f172a" stroke="#10b981" strokeWidth="0.8" transform="rotate(15 20 15)" />
            {/* Starlight eye gleams */}
            <circle cx="12.5" cy="14" r="1.2" fill="#38bdf8" />
            <circle cx="19.5" cy="14" r="1.2" fill="#38bdf8" />
            {/* Antenna with glowing orb */}
            <path d="M16 6V3" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="16" cy="2.5" r="1.5" fill="#fde047" />
            {/* Little smile */}
            <path d="M14 23C15 24 17 24 18 23" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );

      case 'icon_elmo_espartano':
        return (
          <svg className={`${currentSize.icon}`} viewBox="0 0 32 32" fill="none">
            {/* Spartan Red Plume / Crest on Top */}
            <path d="M10 6C12 3 20 3 22 6C20 8 12 8 10 6Z" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
            <path d="M16 2V6" stroke="#ef4444" strokeWidth="2" />
            {/* Golden Helmet Shell */}
            <path d="M8 12C8 6 24 6 24 12V24C24 26 21 27 16 27C11 27 8 26 8 24V12Z" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
            {/* T-shaped visor opening */}
            <path d="M11 15H21V18H18V24H14V18H11V15Z" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
            {/* Eyes glowing inside helmet */}
            <circle cx="13" cy="16.5" r="0.8" fill="#fde047" />
            <circle cx="19" cy="16.5" r="0.8" fill="#fde047" />
          </svg>
        );

      case 'icon_ampulheta':
        return (
          <svg className={`${currentSize.icon}`} viewBox="0 0 32 32" fill="none">
            {/* Gold Caps */}
            <rect x="8" y="5" width="16" height="3" rx="1.5" fill="#d97706" stroke="#fde047" strokeWidth="1" />
            <rect x="8" y="24" width="16" height="3" rx="1.5" fill="#d97706" stroke="#fde047" strokeWidth="1" />
            {/* Glass body */}
            <path d="M10 8L16 16L22 8M10 24L16 16L22 24" stroke="#93c5fd" strokeWidth="1.5" strokeLinejoin="round" fill="#1e1b4b" opacity="0.8" />
            {/* Cosmic sand flow */}
            <polygon points="12,10 20,10 16,15" fill="#c084fc" />
            <polygon points="13,23 19,23 16,19" fill="#c084fc" />
            <line x1="16" y1="15" x2="16" y2="19" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="1 1" />
          </svg>
        );

      case 'icon_portal_dimensional':
        return (
          <svg className={`${currentSize.icon}`} viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="12" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
            <ellipse cx="16" cy="16" rx="8" ry="11" fill="#312e81" stroke="#c084fc" strokeWidth="1.5" transform="rotate(25 16 16)" />
            <circle cx="16" cy="16" r="4" fill="#38bdf8" />
            <circle cx="16" cy="16" r="1.5" fill="#ffffff" />
          </svg>
        );

      case 'icon_lobo_guardiao':
      case 'icon_aguia_soberana':
        return <Award className={`${iconClass} text-amber-300`} />;

      case 'icon_fenix_imortal':
        return <Flame className={`${iconClass} text-rose-500 fill-amber-400`} />;

      case 'icon_reliquia_sagrada':
      case 'icon_orbe_arcano':
        return <Sparkles className={`${iconClass} text-fuchsia-300 fill-indigo-400`} />;

      case 'icon_anonimo_padrao':
      default:
        return (
          <svg className={`${currentSize.icon} text-purple-200`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        );
    }
  };

  // Helper to render Frame Overlays / Corner Ornaments with AAA game finish
  const renderRawOverlay = (svgOverlay: string) => {
    switch (svgOverlay) {
      case 'cosmic':
        return (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center">
            {/* Cosmic Planetary Orbital Rings */}
            <svg className="absolute inset-0 w-full h-full animate-spin duration-[16000ms]" viewBox="0 0 100 100" fill="none">
              <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#e9d5ff" strokeWidth="0.8" strokeDasharray="3 4" transform="rotate(-30 50 50)" opacity="0.85" />
              <ellipse cx="50" cy="50" rx="44" ry="16" stroke="#fbbf24" strokeWidth="0.75" transform="rotate(35 50 50)" opacity="0.8" />
              {/* Orbiting Starlight Spheres */}
              <circle cx="12" cy="35" r="2" fill="#fbbf24" filter="drop-shadow(0 0 4px #f59e0b)" />
              <circle cx="88" cy="65" r="2.2" fill="#e879f9" filter="drop-shadow(0 0 5px #c084fc)" />
              <circle cx="75" cy="22" r="1.5" fill="#38bdf8" filter="drop-shadow(0 0 3px #38bdf8)" />
            </svg>

            {/* Top Majestic Faceted Cosmic Amethyst Gem with Gold Prongs */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 filter drop-shadow-[0_2px_8px_rgba(192,132,252,0.9)]">
              <svg className="w-5 h-6 sm:w-6 sm:h-7" viewBox="0 0 24 28" fill="none">
                {/* Gold Crest Backing */}
                <path d="M12 0L20 7L16 16L12 18L8 16L4 7L12 0Z" fill="url(#goldCosmicGrad)" stroke="#fef08a" strokeWidth="0.75" />
                {/* Faceted Amethyst Gemstone */}
                <polygon points="12,2 18,7 15,14 12,16 9,14 6,7" fill="url(#amethystGrad)" stroke="#fdf4ff" strokeWidth="0.6" />
                <polygon points="12,2 15,7 12,12 9,7" fill="#f0abfc" opacity="0.9" />
                <polygon points="12,2 12,12 15,14 18,7" fill="#c084fc" opacity="0.95" />
                <polygon points="12,2 6,7 9,14 12,12" fill="#a855f7" opacity="0.9" />
                <polygon points="9,7 12,12 9,14" fill="#7e22ce" />
                {/* Gemstone Sparkle Highlight */}
                <circle cx="12" cy="5" r="0.8" fill="#ffffff" />
                
                <defs>
                  <linearGradient id="goldCosmicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#854d0e" />
                  </linearGradient>
                  <linearGradient id="amethystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d0fe" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#581c87" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom Guardian Crest with Laurel Wings */}
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 filter drop-shadow-[0_2px_8px_rgba(234,179,8,0.8)]">
              <svg className="w-10 h-7 sm:w-12 sm:h-8" viewBox="0 0 48 30" fill="none">
                {/* Left Golden Laurel Wings */}
                <path d="M20 22C15 22 8 20 2 12C7 15 13 16 18 15C13 11 10 7 8 2C12 7 17 10 21 11" fill="url(#goldWingGrad)" stroke="#fef08a" strokeWidth="0.5" />
                {/* Right Golden Laurel Wings */}
                <path d="M28 22C33 22 40 20 46 12C41 15 35 16 30 15C35 11 38 7 40 2C36 7 31 10 27 11" fill="url(#goldWingGrad)" stroke="#fef08a" strokeWidth="0.5" />
                
                {/* Center Guardian Shield */}
                <path d="M24 6L31 9V17C31 23 27 27 24 29C21 27 17 23 17 17V9L24 6Z" fill="#3b0764" stroke="url(#goldCosmicGrad2)" strokeWidth="1.5" />
                
                {/* Guardian Community & Protection Emblem: 3 United Figures / Heart */}
                <circle cx="24" cy="13" r="1.5" fill="#fde047" />
                <circle cx="20.5" cy="14.5" r="1.2" fill="#facc15" />
                <circle cx="27.5" cy="14.5" r="1.2" fill="#facc15" />
                <path d="M20.5 17C20.5 19 24 22 24 22C24 22 27.5 19 27.5 17C27.5 16 26.5 15.5 25.5 16C24.5 16.5 24 17 24 17C24 17 23.5 16.5 22.5 16C21.5 15.5 20.5 16 20.5 17Z" fill="#f43f5e" />

                <defs>
                  <linearGradient id="goldWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#713f12" />
                  </linearGradient>
                  <linearGradient id="goldCosmicGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="100%" stopColor="#a16207" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        );

      case 'fenix':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Burning Golden Feathers & Wings Wrapping Sides */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Left Phoenix Wing Flaming Feathers */}
              <path d="M18 68C12 55 10 38 18 24C16 32 15 42 19 50C17 40 18 30 24 20C21 30 22 42 27 50C25 36 29 25 36 16C33 28 35 40 38 48" stroke="url(#fenixGold)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.95" />
              <path d="M16 64C10 52 9 36 17 22" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              
              {/* Right Phoenix Wing Flaming Feathers */}
              <path d="M82 68C88 55 90 38 82 24C84 32 85 42 81 50C83 40 82 30 76 20C79 30 78 42 73 50C75 36 71 25 64 16C67 28 65 40 62 48" stroke="url(#fenixGold)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.95" />
              <path d="M84 64C90 52 91 36 83 22" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              
              {/* Sparks & Flame Embers */}
              <circle cx="14" cy="20" r="1.5" fill="#fde047" />
              <circle cx="86" cy="20" r="1.5" fill="#fde047" />
              <circle cx="28" cy="12" r="1.2" fill="#ea580c" />
              <circle cx="72" cy="12" r="1.2" fill="#ea580c" />

              <defs>
                <linearGradient id="fenixGold" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
            </svg>

            {/* Top Glowing Faceted Ruby Sunstone Gem */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 filter drop-shadow-[0_2px_10px_rgba(249,115,22,0.9)]">
              <svg className="w-6 h-7" viewBox="0 0 24 28" fill="none">
                {/* Golden Crown Prongs */}
                <path d="M12 0L19 7L16 16L12 18L8 16L5 7L12 0Z" fill="#b45309" stroke="#fef08a" strokeWidth="1" />
                {/* Ruby Gemstone */}
                <polygon points="12,2 17,7 14,14 12,16 10,14 7,7" fill="#dc2626" stroke="#fecdd3" strokeWidth="0.75" />
                <polygon points="12,2 14,7 12,12 10,7" fill="#f87171" />
                <polygon points="12,2 12,12 14,14 17,7" fill="#ef4444" />
                <polygon points="12,2 7,7 10,14 12,12" fill="#b91c1c" />
                {/* Top Flame Tip */}
                <path d="M12 0C13 -3 15 -1 15 -4C14 -2 13 -2 12 0" fill="#fde047" />
              </svg>
            </div>

            {/* Bottom Winged Golden Phoenix Crest */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 filter drop-shadow-[0_2px_8px_rgba(234,179,8,0.85)]">
              <svg className="w-11 h-7" viewBox="0 0 44 28" fill="none">
                <path d="M22 6L28 9V17C28 22 25 25 22 27C19 25 16 22 16 17V9L22 6Z" fill="#78350f" stroke="#fde047" strokeWidth="1.5" />
                <path d="M16 18C11 18 6 15 2 9C5 12 10 13 14 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 18C33 18 38 15 42 9C39 12 34 13 30 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                {/* Flaming Heart */}
                <circle cx="22" cy="14" r="2.5" fill="#f97316" />
                <circle cx="22" cy="14" r="1.2" fill="#fef08a" />
              </svg>
            </div>
          </div>
        );

      case 'sombrio':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Radiating Dark Crystal Spikes & Lightning */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Spikes around the ring */}
              <polygon points="50,4 53,16 47,16" fill="#581c87" stroke="#c084fc" strokeWidth="0.8" />
              <polygon points="85,15 76,23 72,17" fill="#4a044e" stroke="#e879f9" strokeWidth="0.8" />
              <polygon points="96,50 84,47 84,53" fill="#581c87" stroke="#c084fc" strokeWidth="0.8" />
              <polygon points="85,85 72,83 76,77" fill="#4a044e" stroke="#e879f9" strokeWidth="0.8" />
              <polygon points="15,85 24,77 28,83" fill="#4a044e" stroke="#e879f9" strokeWidth="0.8" />
              <polygon points="4,50 16,53 16,47" fill="#581c87" stroke="#c084fc" strokeWidth="0.8" />
              <polygon points="15,15 28,17 24,23" fill="#4a044e" stroke="#e879f9" strokeWidth="0.8" />
              
              {/* Lightning Crackles */}
              <path d="M22 26L25 32L21 34L26 40" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
              <path d="M78 26L75 32L79 34L74 40" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
            </svg>

            {/* Top Obsidian Crystalline Crown */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 filter drop-shadow-[0_2px_10px_rgba(168,85,247,0.9)]">
              <svg className="w-6 h-7" viewBox="0 0 24 28" fill="none">
                <path d="M12 0L19 7L16 16L12 18L8 16L5 7L12 0Z" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1" />
                <polygon points="12,2 17,7 14,14 12,16 10,14 7,7" fill="#6b21a8" stroke="#f5d0fe" strokeWidth="0.75" />
                <polygon points="12,2 14,7 12,12 10,7" fill="#9333ea" />
                <polygon points="12,2 12,12 14,14 17,7" fill="#7e22ce" />
                <polygon points="12,2 7,7 10,14 12,12" fill="#3b0764" />
                <circle cx="12" cy="5" r="0.8" fill="#ffffff" />
              </svg>
            </div>

            {/* Bottom Dark Star Compass */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 filter drop-shadow-[0_2px_8px_rgba(192,132,252,0.9)]">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                <polygon points="16,2 19,13 30,16 19,19 16,30 13,19 2,16 13,13" fill="#3b0764" stroke="#c084fc" strokeWidth="1.2" />
                <polygon points="16,6 18,14 26,16 18,18 16,26 14,18 6,16 14,14" fill="#7e22ce" />
                <circle cx="16" cy="16" r="2.5" fill="#f5d0fe" />
              </svg>
            </div>
          </div>
        );

      case 'ondas':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Swirling Oceanic Wave Crests with Foam */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Waves wrapping perimeter */}
              <path d="M15 45C10 32 16 18 32 12C42 8 58 8 68 12C84 18 90 32 85 45C80 58 75 70 65 78C55 86 45 86 35 78C25 70 20 58 15 45Z" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
              <path d="M20 38C15 28 20 18 35 14C45 10 55 10 65 14C80 18 85 28 80 38" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 34C18 26 23 19 36 16C46 13 54 13 64 16C77 19 82 26 78 34" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
              
              {/* Tiny water splash bubbles */}
              <circle cx="28" cy="10" r="1.5" fill="#bae6fd" />
              <circle cx="72" cy="10" r="1.5" fill="#bae6fd" />
              <circle cx="12" cy="30" r="1.2" fill="#7dd3fc" />
              <circle cx="88" cy="30" r="1.2" fill="#7dd3fc" />
            </svg>

            {/* Bottom Starfish, Seashell and Sapphire Teardrop Gem */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 filter drop-shadow-[0_2px_6px_rgba(2,132,199,0.85)]">
              {/* Starfish */}
              <svg className="w-4 h-4 text-amber-500 fill-amber-400" viewBox="0 0 24 24">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
              {/* Center Water Teardrop Gem */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 5 11 5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16C19 11 12 2 12 2Z" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
                <path d="M12 5C12 5 7 12 7 16C7 18.761 9.239 21 12 21" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.75" />
              </svg>
              {/* Seashell */}
              <span className="text-xs">🐚</span>
            </div>
          </div>
        );

      case 'eco':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Carved Stone Ring & Ivy Vines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Carved Stone Studded Ring */}
              <circle cx="50" cy="50" r="41" stroke="#334155" strokeWidth="3" strokeDasharray="14 4" />
              <circle cx="50" cy="50" r="41" stroke="#059669" strokeWidth="1.5" opacity="0.6" />
              {/* Leaves wrapping around */}
              <path d="M15 50C12 36 20 22 35 15C32 24 38 30 36 38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
              <path d="M85 50C88 36 80 22 65 15C68 24 62 30 64 38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
              {/* Small Green Leaf Icons */}
              <circle cx="28" cy="18" r="2" fill="#34d399" />
              <circle cx="72" cy="18" r="2" fill="#34d399" />
            </svg>

            {/* Top Leaf Crest */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 filter drop-shadow-[0_2px_6px_rgba(16,185,129,0.9)]">
              <svg className="w-5 h-6" viewBox="0 0 20 24" fill="none">
                <path d="M10 2L17 6V15C17 19 14 22 10 23C6 22 3 19 3 15V6L10 2Z" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" />
                <path d="M10 6C12 6 14 9 14 12C14 15 12 17 10 18C8 17 6 15 6 12C6 9 8 6 10 6Z" fill="#10b981" />
              </svg>
            </div>

            {/* Bottom Left: Adorable Friendly Robot Companion holding Sprout */}
            <div className="absolute -bottom-3 -left-3 z-10 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                {/* Robot Head */}
                <rect x="6" y="8" width="18" height="15" rx="5" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                {/* Screen */}
                <rect x="9" y="11" width="12" height="8" rx="2" fill="#064e3b" />
                {/* Green Friendly Eyes */}
                <circle cx="12" cy="15" r="1.5" fill="#34d399" />
                <circle cx="18" cy="15" r="1.5" fill="#34d399" />
                {/* Antenna with leaf */}
                <line x1="15" y1="4" x2="15" y2="8" stroke="#10b981" strokeWidth="1.5" />
                <circle cx="15" cy="4" r="1.5" fill="#34d399" />
                {/* Sprout pot in hand */}
                <path d="M22 22H27L26 26H23L22 22Z" fill="#b45309" />
                <path d="M24.5 22V20C24.5 19 26 19 26 20" stroke="#34d399" strokeWidth="1" />
              </svg>
            </div>

            {/* Bottom Shield Leaf */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-10">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 01.7.3l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4 0l-6-6a1 1 0 010-1.4l6-6A1 1 0 0110 2zm0 3.4L5.4 10 10 14.6 14.6 10 10 5.4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        );

      case 'palhacada':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Carnival Golden Ring with Stars */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="42" stroke="#facc15" strokeWidth="2.5" strokeDasharray="3 6" />
              <polygon points="20,25 22,29 26,29 23,32 24,36 20,33 16,36 17,32 14,29 18,29" fill="#facc15" />
              <polygon points="80,25 82,29 86,29 83,32 84,36 80,33 76,36 77,32 74,29 78,29" fill="#facc15" />
            </svg>

            {/* Top Jester Hat with Bells */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              <svg className="w-10 h-7" viewBox="0 0 40 24" fill="none">
                {/* 3 floppy jester points */}
                <path d="M12 20C8 12 2 10 4 4C8 8 12 14 16 20" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" />
                <path d="M20 20C20 10 20 4 20 2C20 4 20 10 20 20" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
                <path d="M28 20C32 12 38 10 36 4C32 8 28 14 24 20" fill="#10b981" stroke="#047857" strokeWidth="0.8" />
                {/* Golden Bells */}
                <circle cx="4" cy="4" r="2" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
                <circle cx="20" cy="2" r="2" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
                <circle cx="36" cy="4" r="2" fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
                {/* Base rim */}
                <rect x="10" y="18" width="20" height="4" rx="2" fill="#3b0764" stroke="#fbbf24" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Center Face Gag Overlay: Pixel Glasses + Nose + Mustache */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              {/* Pixel 8-bit Thug Glasses */}
              <div className="flex items-center gap-0.5 mt-0.5 filter drop-shadow-sm">
                <div className="w-3.5 h-2 bg-black border border-white/50 rounded-xs flex items-center justify-center">
                  <div className="w-1 h-0.5 bg-white -mt-0.5" />
                </div>
                <div className="w-1.5 h-0.5 bg-black" />
                <div className="w-3.5 h-2 bg-black border border-white/50 rounded-xs flex items-center justify-center">
                  <div className="w-1 h-0.5 bg-white -mt-0.5" />
                </div>
              </div>
              {/* Big Comic Nose */}
              <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-400 -mt-0.5 shadow-xs" />
              {/* Curly Mustache */}
              <div className="text-[10px] -mt-1 select-none text-amber-950 font-black">
                〰️
              </div>
            </div>

            {/* Right Side: Squeaky Rubber Chicken */}
            <div className="absolute -bottom-2 -right-3 z-10 filter drop-shadow-md rotate-12">
              <span className="text-xl">🐔</span>
            </div>

            {/* Bottom Laughing Medal */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 shadow-md text-xs font-black">
              😆
            </div>
          </div>
        );

      case 'gamer':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Neon Cat-Ear Headset & Floating Pixel Hearts */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Left Cat Ear Speaker */}
              <polygon points="22,26 28,10 40,20" fill="#a21caf" stroke="#f0abfc" strokeWidth="1.5" />
              <polygon points="26,24 30,14 36,20" fill="#f472b6" />
              {/* Right Cat Ear Speaker */}
              <polygon points="78,26 72,10 60,20" fill="#a21caf" stroke="#f0abfc" strokeWidth="1.5" />
              <polygon points="74,24 70,14 64,20" fill="#f472b6" />
              {/* Headband */}
              <path d="M26 25C34 16 66 16 74 25" stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            {/* Left Pixel Heart & Gamepad */}
            <div className="absolute top-7 -left-3 text-xs z-10 filter drop-shadow-[0_0_6px_#f43f5e] animate-pulse">
              👾
            </div>
            {/* Right Pixel Gamepad */}
            <div className="absolute top-7 -right-3 text-xs z-10 filter drop-shadow-[0_0_6px_#38bdf8] animate-pulse">
              🎮
            </div>

            {/* Bottom Glowing 8-bit Star */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-purple-900 border-2 border-fuchsia-400 shadow-[0_0_8px_#e879f9]">
              <span className="text-[11px] text-amber-300">⭐</span>
            </div>
          </div>
        );

      case 'coroa_suprema':
        return (
          <div className="absolute -inset-4 pointer-events-none flex items-center justify-center">
            {/* Prismatic Starlight Orbital Rings */}
            <div className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-300 animate-spin duration-[14000ms] opacity-80" />
            
            {/* Top Imperial High Crown */}
            <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 flex flex-col items-center filter drop-shadow-[0_0_12px_#fbbf24] z-20">
              <svg className="w-8 h-8 text-amber-300" viewBox="0 0 24 24" fill="none">
                <path d="M2 18L5 8L9.5 13L12 4L14.5 13L19 8L22 18H2Z" fill="url(#goldCrownGrad)" stroke="#fef08a" strokeWidth="1" />
                <circle cx="12" cy="4" r="1.5" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
                <circle cx="5" cy="8" r="1.2" fill="#38bdf8" />
                <circle cx="19" cy="8" r="1.2" fill="#38bdf8" />
                <rect x="4" y="17" width="16" height="3" rx="1" fill="#78350f" stroke="#fbbf24" strokeWidth="0.8" />
                
                <defs>
                  <linearGradient id="goldCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom Laurel Wreath and Supreme Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-900 border-2 border-amber-300 px-2 py-0.5 rounded-full text-[8.5px] text-amber-200 font-black shadow-[0_0_10px_#f59e0b] z-20">
              <span>👑</span><span>SUPREMO</span><span>👑</span>
            </div>
          </div>
        );

      case 'dragao_fogo':
        return (
          <div className="absolute -inset-3.5 pointer-events-none flex items-center justify-center">
            {/* Dragon Horns & Magma Claws */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Left Horn */}
              <path d="M30 20C24 14 16 10 10 4C14 14 20 22 28 26" fill="#7f1d1d" stroke="#f97316" strokeWidth="1.5" />
              {/* Right Horn */}
              <path d="M70 20C76 14 84 10 90 4C86 14 80 22 72 26" fill="#7f1d1d" stroke="#f97316" strokeWidth="1.5" />
              {/* Claws on bottom */}
              <path d="M20 75L15 82M24 77L21 86M28 78L27 87" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              <path d="M80 75L85 82M76 77L79 86M72 78L73 87" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">🐉</div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs">🔥</div>
          </div>
        );

      case 'portal_vortex':
        return (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-teal-400 border-dashed animate-spin duration-[7000ms] opacity-80" />
            <div className="absolute inset-1 rounded-full border border-purple-500 border-dotted animate-spin duration-[5000ms] reverse" />
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">🌀</span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs">✨</span>
          </div>
        );

      case 'comida_delicia':
        return (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm animate-bounce">🍕</span>
            <span className="absolute top-2 -right-3 text-xs">🍔</span>
            <span className="absolute -bottom-2.5 right-0 text-xs">🧋</span>
            <span className="absolute -bottom-2.5 left-0 text-xs">🌮</span>
            <span className="absolute top-2 -left-3 text-xs">🍩</span>
          </div>
        );

      case 'caos_meme':
        return (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-3.5 left-1 text-xs font-black text-rose-500 animate-bounce">!?</span>
            <span className="absolute -top-3.5 right-1 text-xs font-black text-amber-500 animate-bounce">?!</span>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">💢</span>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.2 rounded-full border border-white">
              100% SEM PACIÊNCIA
            </span>
          </div>
        );

      case 'supreme':
        return (
          <div className="absolute -inset-3 pointer-events-none flex items-center justify-center">
            {/* Prismatic Rainbow Rotating Ring */}
            <div className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-300 animate-spin duration-[10000ms] opacity-80" />
            {/* Top Crown of Mastery */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center filter drop-shadow-[0_0_8px_#fbbf24]">
              <Crown className="w-5 h-5 text-amber-300 fill-amber-400 animate-pulse" />
            </div>
            {/* Bottom Diamond Crest */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-amber-950/90 border border-amber-400 px-1.5 py-0.5 rounded-full text-[9px] text-amber-200 font-black shadow-lg">
              <span>✦</span><span>SUPREMO</span><span>✦</span>
            </div>
          </div>
        );

      case 'aurora':
        return (
          <div className="absolute -inset-2 rounded-full border-2 border-emerald-400/70 pointer-events-none animate-pulse">
            <span className="absolute -top-1 left-2 text-[10px] text-emerald-300">✧</span>
            <span className="absolute -bottom-1 right-2 text-[10px] text-cyan-300">✧</span>
          </div>
        );

      case 'electric':
        return (
          <div className="absolute -inset-1.5 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-1.5 -left-1.5 text-[11px] text-cyan-300 animate-pulse">⚡</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-[11px] text-amber-300 animate-pulse">⚡</span>
            <div className="absolute inset-0 rounded-full border border-cyan-400/60 animate-ping opacity-25" />
          </div>
        );
      case 'fire':
        return (
          <div className="absolute -inset-2 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-orange-400 animate-bounce">🔥</span>
            <span className="absolute -bottom-1 -left-1 text-[10px] text-amber-400">✨</span>
            <span className="absolute -bottom-1 -right-1 text-[10px] text-rose-500">✨</span>
          </div>
        );
      case 'stars':
        return (
          <div className="absolute -inset-1.5 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-1.5 -right-1.5 text-[10px] text-fuchsia-300 animate-spin duration-3000">✦</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-cyan-300 animate-pulse">✦</span>
          </div>
        );
      case 'ice':
        return (
          <div className="absolute -inset-1.5 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-1.5 text-[10px] text-cyan-200">❄️</span>
            <div className="absolute inset-0 rounded-full border border-cyan-300/60" />
          </div>
        );
      case 'eclipse':
        return (
          <div className="absolute -inset-1.5 rounded-full border-2 border-amber-400/90 pointer-events-none animate-pulse flex items-center justify-center">
            <span className="absolute -top-1 text-[10px] text-amber-400">☀️</span>
            <span className="absolute -bottom-1 text-[10px] text-purple-300">🌙</span>
          </div>
        );
      case 'imperial':
        return (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none text-xs text-amber-300 filter drop-shadow-md">
            👑
          </div>
        );
      case 'owl':
        return (
          <div className="absolute -inset-2 pointer-events-none flex items-center justify-between">
            <span className="text-[11px] text-fuchsia-400 -ml-1">🪶</span>
            <span className="text-[11px] text-fuchsia-400 -mr-1">🪶</span>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px]">🦉</span>
          </div>
        );
      case 'ninja':
        return (
          <div className="absolute -inset-1.5 pointer-events-none flex items-center justify-center">
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400">⚔️</span>
            <span className="absolute -top-1.5 right-0 text-[9px] text-cyan-300">✦</span>
          </div>
        );
      case 'shades':
        return (
          <div className="absolute -bottom-2 -right-1.5 pointer-events-none text-xs">
            🕶️
          </div>
        );
      case 'cyber':
        return (
          <div className="absolute -inset-2 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-1.5 -right-1.5 text-[10px] text-emerald-400 animate-pulse">💠</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-teal-400">⬡</span>
            <div className="absolute inset-0 rounded-full border border-emerald-400/50 border-dashed animate-spin duration-[12000ms]" />
          </div>
        );
      case 'rainbow':
        return (
          <div className="absolute -inset-1.5 rounded-full border-2 border-white/80 pointer-events-none animate-spin duration-3000 shadow-sm" />
        );
      case 'runic':
        return (
          <div className="absolute -inset-2 pointer-events-none flex items-center justify-center">
            <span className="absolute -top-1.5 text-[10px] text-amber-300 font-mono font-black">ᛟ</span>
            <span className="absolute -bottom-1.5 text-[10px] text-amber-300 font-mono font-black">ᚷ</span>
            <span className="absolute -left-1.5 text-[10px] text-purple-300 font-mono font-black">ᛏ</span>
            <span className="absolute -right-1.5 text-[10px] text-purple-300 font-mono font-black">ᛋ</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper to render Frame Overlays with proportional, mathematically centered scaling
  const renderFrameOverlay = () => {
    const svgOverlay = frameItem?.frameStyle?.svgOverlay || (frameItem?.id === 'guardiao-cosmico' || frameItem?.id === 'frame_guardiao_cosmico' ? 'guardiao_cosmico' : undefined);
    if (!svgOverlay || svgOverlay === 'none') return null;

    if (svgOverlay === 'guardiao_cosmico') {
      const cosmicFrameSizeMap: Record<string, number> = {
        xs: 46,
        sm: 61,
        md: 76,
        lg: 116,
        xl: 154,
        '2xl': 200
      };
      const framePixelSize = cosmicFrameSizeMap[size] || 76;

      return (
        <div 
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            width: framePixelSize,
            height: framePixelSize,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        >
          <GuardiaoCosmicoFrame size={framePixelSize} className="w-full h-full" />
        </div>
      );
    }

    const content = renderRawOverlay(svgOverlay);
    if (!content) return null;

    return (
      <div 
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          width: '48px',
          height: '48px',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${currentSize.overlayScale})`,
          transformOrigin: 'center center',
          zIndex: 10
        }}
      >
        {content}
      </div>
    );
  };

  const isGuardiaoCosmico = frameItem?.id === 'guardiao-cosmico' || frameItem?.id === 'frame_guardiao_cosmico' || frameItem?.frameStyle?.svgOverlay === 'guardiao_cosmico';
  const frameBorderClass = frameItem?.frameStyle?.borderClass || (isGuardiaoCosmico ? 'p-0 bg-transparent' : 'p-1 bg-gradient-to-tr from-purple-500 to-indigo-600');
  const frameGlowClass = frameItem?.frameStyle?.glowClass || (isGuardiaoCosmico ? 'shadow-purple-500/60 shadow-xl' : 'shadow-sm');
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
          className={`${currentSize.inner} rounded-full bg-purple-950/95 flex items-center justify-center overflow-hidden ${
            isGuardiaoCosmico ? 'border-none' : 'border border-white/20'
          } shadow-inner`}
        >
          {renderIconGraphic()}
        </div>

        {/* Dynamic Frame Corner / Symbol Overlay */}
        {renderFrameOverlay()}
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

      {/* Level Badge Pin / Shield with pristine hierarchy */}
      {showLevelBadge && (
        <div 
          title={`Nível ${level}`}
          className={`absolute ${currentSize.badge} rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border border-purple-950 text-purple-950 font-black flex items-center justify-center shadow-md z-20 whitespace-nowrap ring-1 ring-amber-300/60`}
        >
          {size === 'lg' || size === 'xl' || size === '2xl' ? (
            <span className="flex items-center gap-1 font-black">
              <span className="text-[10px] sm:text-xs leading-none">{levelBadgeEmoji}</span>
              <span className="leading-none">Nv.{level}</span>
            </span>
          ) : (
            <span className="leading-none">{level}</span>
          )}
        </div>
      )}
    </div>
  );
};

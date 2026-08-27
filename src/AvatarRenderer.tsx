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
      effectParticle: 'text-[8px] -top-1 -right-1',
      overlayScale: 'scale-75'
    },
    sm: {
      container: 'w-8 h-8 sm:w-9 sm:h-9',
      inner: 'w-7 h-7 sm:w-8 sm:h-8',
      icon: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      badge: 'text-[8.5px] px-1 min-w-[15px] h-[15px] -bottom-1 -right-1',
      effectParticle: 'text-[10px] -top-1.5 -right-1.5',
      overlayScale: 'scale-90'
    },
    md: {
      container: 'w-12 h-12',
      inner: 'w-10 h-10',
      icon: 'w-6 h-6',
      badge: 'text-[10px] px-1.5 min-w-[18px] h-[18px] -bottom-1 -right-1',
      effectParticle: 'text-xs -top-2 -right-2',
      overlayScale: 'scale-100'
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      inner: 'w-14 h-14 sm:w-17 sm:h-17',
      icon: 'w-8 h-8 sm:w-10 sm:h-10',
      badge: 'text-xs px-2 py-0.5 min-w-[22px] h-[22px] -bottom-1 -right-1',
      effectParticle: 'text-sm -top-2.5 -right-2.5',
      overlayScale: 'scale-110'
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      inner: 'w-21 h-21 sm:w-24 sm:h-24',
      icon: 'w-12 h-12 sm:w-14 sm:h-14',
      badge: 'text-sm px-2.5 py-0.5 min-w-[26px] h-[26px] -bottom-1.5 -right-1.5',
      effectParticle: 'text-base -top-3 -right-3',
      overlayScale: 'scale-125'
    },
    '2xl': {
      container: 'w-32 h-32',
      inner: 'w-28 h-28',
      icon: 'w-16 h-16',
      badge: 'text-base px-3 py-1 -bottom-2 -right-2',
      effectParticle: 'text-lg -top-3.5 -right-3.5',
      overlayScale: 'scale-150'
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

      case 'icon_lobo_guardiao':
      case 'icon_aguia_soberana':
        return <Award className={`${iconClass} text-amber-300`} />;

      case 'icon_fenix_imortal':
        return <Flame className={`${iconClass} text-rose-500 fill-amber-400`} />;

      case 'icon_elmo_espartano':
        return <Shield className={`${iconClass} text-amber-400 fill-amber-900/60`} />;

      case 'icon_portal_dimensional':
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
  const renderFrameOverlay = () => {
    const svgOverlay = frameItem?.frameStyle?.svgOverlay;
    if (!svgOverlay || svgOverlay === 'none') return null;

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

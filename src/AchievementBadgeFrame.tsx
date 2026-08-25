import React from 'react';
import { AchievementTier, AchievementId } from './types';

interface AchievementBadgeFrameProps {
  achievementId: AchievementId | string;
  tier?: AchievementTier;
  isUnlocked?: boolean;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
  animate?: boolean;
}

export const AchievementBadgeFrame: React.FC<AchievementBadgeFrameProps> = ({
  achievementId,
  tier = 'bronze',
  isUnlocked = true,
  size = 'md',
  className = '',
  showGlow = true,
  animate = false
}) => {
  const pixelSize = typeof size === 'number' 
    ? size 
    : size === 'sm' 
      ? 56 
      : size === 'md' 
        ? 76 
        : size === 'lg' 
          ? 96 
          : 120;

  // Tier Color Palettes for the Pixel Frame
  const getTierFrameColors = () => {
    switch (tier) {
      case 'lendario':
        return {
          outerBorder: '#1c132b',
          frameDark: '#6b21a8',
          frameMid: '#c084fc',
          frameLight: '#f3e8ff',
          cornerGemDark: '#831843',
          cornerGemMid: '#f43f5e',
          cornerGemLight: '#ffe4e6',
          studColor: '#fbbf24',
          bgDark: '#0f0a1c',
          bgMid: '#241442',
          bgLight: '#3b1d6e'
        };
      case 'ouro':
        return {
          outerBorder: '#291800',
          frameDark: '#b45309',
          frameMid: '#f59e0b',
          frameLight: '#fef3c7',
          cornerGemDark: '#991b1b',
          cornerGemMid: '#ef4444',
          cornerGemLight: '#fecaca',
          studColor: '#fde047',
          bgDark: '#1c1204',
          bgMid: '#38230b',
          bgLight: '#593910'
        };
      case 'prata':
        return {
          outerBorder: '#0f172a',
          frameDark: '#475569',
          frameMid: '#94a3b8',
          frameLight: '#f1f5f9',
          cornerGemDark: '#1e3a8a',
          cornerGemMid: '#3b82f6',
          cornerGemLight: '#dbeafe',
          studColor: '#cbd5e1',
          bgDark: '#090d16',
          bgMid: '#1e293b',
          bgLight: '#334155'
        };
      default: // bronze
        return {
          outerBorder: '#271206',
          frameDark: '#78350f',
          frameMid: '#d97706',
          frameLight: '#fed7aa',
          cornerGemDark: '#14532d',
          cornerGemMid: '#22c55e',
          cornerGemLight: '#dcfce7',
          studColor: '#f97316',
          bgDark: '#180a03',
          bgMid: '#2c150b',
          bgLight: '#432111'
        };
    }
  };

  const colors = getTierFrameColors();

  // Render specific pixel-art inner graphic based on achievementId
  const renderPixelIllustration = () => {
    switch (achievementId) {
      // 1. Calouro Anti-Treta / Conhecedor dos Direitos (Green Grimoire with Golden Scales of Justice)
      case 'conhecedor_direitos':
        return (
          <g transform="translate(14, 14)">
            {/* Book Base / Leather cover */}
            <rect x="3" y="2" width="30" height="32" fill="#064e3b" rx="2" />
            <rect x="5" y="4" width="26" height="28" fill="#047857" />
            <rect x="7" y="6" width="22" height="24" fill="#059669" />
            {/* Book Spine & Corners */}
            <rect x="3" y="2" width="4" height="32" fill="#022c22" />
            <rect x="3" y="6" width="4" height="2" fill="#f59e0b" />
            <rect x="3" y="17" width="4" height="2" fill="#f59e0b" />
            <rect x="3" y="28" width="4" height="2" fill="#f59e0b" />
            {/* Golden corner brackets on book */}
            <rect x="5" y="4" width="4" height="4" fill="#fbbf24" />
            <rect x="27" y="4" width="4" height="4" fill="#fbbf24" />
            <rect x="5" y="28" width="4" height="4" fill="#fbbf24" />
            <rect x="27" y="28" width="4" height="4" fill="#fbbf24" />
            <rect x="6" y="5" width="2" height="2" fill="#fef3c7" />
            <rect x="28" y="5" width="2" height="2" fill="#fef3c7" />
            {/* Golden Justice Scales on Book Cover */}
            <rect x="17" y="9" width="2" height="18" fill="#fef3c7" />
            <rect x="11" y="12" width="14" height="2" fill="#fbbf24" />
            {/* Left Pan */}
            <line x1="12" y1="14" x2="9" y2="19" stroke="#f59e0b" strokeWidth="1" />
            <line x1="12" y1="14" x2="15" y2="19" stroke="#f59e0b" strokeWidth="1" />
            <rect x="8" y="19" width="8" height="2" fill="#fde047" />
            <rect x="9" y="21" width="6" height="1" fill="#d97706" />
            {/* Right Pan */}
            <line x1="24" y1="14" x2="21" y2="19" stroke="#f59e0b" strokeWidth="1" />
            <line x1="24" y1="14" x2="27" y2="19" stroke="#f59e0b" strokeWidth="1" />
            <rect x="20" y="19" width="8" height="2" fill="#fde047" />
            <rect x="21" y="21" width="6" height="1" fill="#d97706" />
            {/* Scales Base */}
            <rect x="14" y="27" width="8" height="2" fill="#f59e0b" />
            <rect x="15" y="26" width="6" height="1" fill="#fde047" />
            {/* Magic Sparkles */}
            <rect x="8" y="7" width="2" height="2" fill="#a7f3d0" />
            <rect x="26" y="9" width="2" height="2" fill="#a7f3d0" />
          </g>
        );

      // 2. Trio Parada Firme da Paz / Aliado da Escola Segura (Heraldic Shield with Safe School Castle)
      case 'aliado_escola_segura':
        return (
          <g transform="translate(14, 14)">
            {/* Medieval Shield Body */}
            <path d="M6 3 H30 V21 L18 33 L6 21 Z" fill="#1e3a8a" />
            <path d="M8 5 H28 V20 L18 30 L8 20 Z" fill="#2563eb" />
            <path d="M10 7 H26 V19 L18 27 L10 19 Z" fill="#1d4ed8" />
            {/* Shield Center Divider */}
            <rect x="17" y="7" width="2" height="20" fill="#60a5fa" opacity="0.6" />
            {/* School Building Emblem inside shield */}
            <rect x="12" y="14" width="12" height="10" fill="#f59e0b" />
            <rect x="13" y="15" width="10" height="8" fill="#fbbf24" />
            {/* Roof Peak */}
            <polygon points="18,8 10,14 26,14" fill="#b45309" />
            <polygon points="18,10 12,14 24,14" fill="#dc2626" />
            {/* Door & Windows */}
            <rect x="16" y="18" width="4" height="6" fill="#1e293b" />
            <rect x="14" y="16" width="2" height="2" fill="#60a5fa" />
            <rect x="20" y="16" width="2" height="2" fill="#60a5fa" />
            {/* Flagpole on top */}
            <line x1="18" y1="5" x2="18" y2="8" stroke="#fef3c7" strokeWidth="1" />
            <rect x="18" y="5" width="4" height="3" fill="#3b82f6" />
            {/* Protective Golden Laurel Aura */}
            <rect x="4" y="12" width="2" height="4" fill="#fbbf24" />
            <rect x="30" y="12" width="2" height="4" fill="#fbbf24" />
            <rect x="5" y="18" width="2" height="4" fill="#f59e0b" />
            <rect x="29" y="18" width="2" height="4" fill="#f59e0b" />
          </g>
        );

      // 3. Cérebro Galáctico do Respeito / Especialista em Respeito (Glowing Faceted Amethyst Heart Gem)
      case 'especialista_respeito':
        return (
          <g transform="translate(14, 14)">
            {/* Outer Heart Shadow */}
            <path d="M9 7 C6 7 4 10 4 14 C4 21 18 31 18 31 C18 31 32 21 32 14 C32 10 30 7 27 7 C23 7 19 10 18 12 C17 10 13 7 9 7 Z" fill="#3b0764" />
            {/* Faceted Crystal Heart */}
            <path d="M10 8 C7 8 5 11 5 14 C5 20 18 29 18 29 C18 29 31 20 31 14 C31 11 29 8 26 8 C22 8 19 11 18 13 C17 11 14 8 10 8 Z" fill="#9333ea" />
            {/* Facet Highlights */}
            <polygon points="18,13 10,8 14,17 18,22" fill="#c084fc" />
            <polygon points="18,13 26,8 22,17 18,22" fill="#a855f7" />
            <polygon points="18,22 14,17 18,29" fill="#7e22ce" />
            <polygon points="18,22 22,17 18,29" fill="#581c87" />
            <polygon points="10,8 5,14 14,17" fill="#e9d5ff" />
            <polygon points="26,8 31,14 22,17" fill="#6b21a8" />
            {/* Brilliant Star Flare / Sparkles */}
            <rect x="8" y="10" width="3" height="3" fill="#ffffff" />
            <rect x="9" y="9" width="1" height="5" fill="#ffffff" />
            <rect x="7" y="11" width="5" height="1" fill="#ffffff" />
            {/* Small glints */}
            <rect x="25" y="22" width="2" height="2" fill="#f3e8ff" />
            <rect x="17" y="27" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 4. Gabaritador Lendário de Bom Senso / Protetor da Comunidade (Royal Crest with 3 Protectors)
      case 'protetor_comunidade':
        return (
          <g transform="translate(14, 14)">
            {/* Golden Shield Background */}
            <path d="M6 3 H30 V21 L18 33 L6 21 Z" fill="#78350f" />
            <path d="M8 5 H28 V20 L18 31 L8 20 Z" fill="#b45309" />
            <path d="M10 7 H26 V19 L18 29 L10 19 Z" fill="#1e3a8a" />
            {/* Center Leader Figure */}
            <rect x="16" y="11" width="4" height="4" fill="#fed7aa" />
            <rect x="15" y="10" width="6" height="2" fill="#92400e" />
            <rect x="14" y="15" width="8" height="10" fill="#f59e0b" />
            <rect x="16" y="16" width="4" height="9" fill="#fbbf24" />
            {/* Left Ally Figure */}
            <rect x="10" y="13" width="4" height="4" fill="#fcd34d" />
            <rect x="9" y="12" width="5" height="2" fill="#713f12" />
            <rect x="9" y="17" width="5" height="8" fill="#3b82f6" />
            {/* Right Ally Figure */}
            <rect x="22" y="13" width="4" height="4" fill="#fcd34d" />
            <rect x="22" y="12" width="5" height="2" fill="#713f12" />
            <rect x="22" y="17" width="5" height="8" fill="#10b981" />
            {/* Golden Harmony Arc / Halo */}
            <path d="M7 13 Q18 5 29 13" stroke="#fef08a" strokeWidth="2" fill="none" />
            {/* Golden Stars */}
            <rect x="17" y="6" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 5. Oráculo do 100% Sem Chute (Concentric Archery Bullseye with 3 Arrows in Center)
      case 'gabarito_perfeito':
        return (
          <g transform="translate(14, 14)">
            {/* Target Outer Ring (Black) */}
            <circle cx="18" cy="18" r="16" fill="#18181b" />
            {/* Ring 1: Blue */}
            <circle cx="18" cy="18" r="14" fill="#2563eb" />
            <circle cx="18" cy="18" r="12" fill="#60a5fa" />
            {/* Ring 2: Red */}
            <circle cx="18" cy="18" r="10" fill="#dc2626" />
            <circle cx="18" cy="18" r="8" fill="#f87171" />
            {/* Ring 3: White */}
            <circle cx="18" cy="18" r="6" fill="#f8fafc" />
            {/* Bullseye: Yellow/Gold */}
            <circle cx="18" cy="18" r="4" fill="#fbbf24" />
            <circle cx="18" cy="18" r="2" fill="#b45309" />
            {/* 3 Pixel Arrows hitting Dead Center */}
            {/* Arrow 1: Upper Right */}
            <line x1="29" y1="7" x2="19" y2="17" stroke="#713f12" strokeWidth="2" />
            <rect x="27" y="5" width="4" height="2" fill="#38bdf8" />
            <rect x="29" y="7" width="2" height="4" fill="#38bdf8" />
            {/* Arrow 2: Top */}
            <line x1="22" y1="4" x2="18" y2="16" stroke="#854d0e" strokeWidth="2" />
            <rect x="21" y="3" width="3" height="3" fill="#f43f5e" />
            {/* Arrow 3: Right Angle */}
            <line x1="31" y1="14" x2="20" y2="19" stroke="#713f12" strokeWidth="2" />
            <rect x="29" y="12" width="3" height="3" fill="#a855f7" />
            {/* Golden Star Sparkle on Bullseye */}
            <rect x="17" y="17" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 6. Detetive Cibernético Anti-Fake (Cyber Detective with Fedora, Visor & Matrix Glint)
      case 'speedrunner_sabedoria':
        return (
          <g transform="translate(14, 14)">
            {/* Detective Hat (Fedora) */}
            <path d="M7 11 H29 V13 H7 Z" fill="#451a03" />
            <rect x="11" y="6" width="14" height="6" fill="#78350f" />
            <rect x="12" y="5" width="12" height="2" fill="#92400e" />
            <rect x="11" y="9" width="14" height="2" fill="#f59e0b" />
            {/* Detective Head / Face in Shadow */}
            <rect x="12" y="13" width="12" height="10" fill="#334155" />
            <rect x="13" y="14" width="10" height="8" fill="#475569" />
            {/* Cyber Visor / Glowing Cyan Glasses */}
            <rect x="11" y="15" width="14" height="4" fill="#0891b2" />
            <rect x="12" y="16" width="12" height="2" fill="#22d3ee" />
            <rect x="14" y="16" width="3" height="2" fill="#ffffff" />
            <rect x="20" y="16" width="3" height="2" fill="#ffffff" />
            {/* Detective Trenchcoat Collar */}
            <polygon points="8,31 14,23 18,28 22,23 28,31" fill="#78350f" />
            <polygon points="10,31 15,24 18,27 21,24 26,31" fill="#92400e" />
            {/* Tie / Binary Matrix Symbol */}
            <rect x="17" y="27" width="2" height="6" fill="#06b6d4" />
            {/* Digital Sparkles */}
            <rect x="5" y="18" width="2" height="2" fill="#22d3ee" />
            <rect x="29" y="18" width="2" height="2" fill="#22d3ee" />
            <rect x="28" y="26" width="2" height="2" fill="#06b6d4" />
          </g>
        );

      // 7. Maratonista de Neurônios / Enciclopédia Viva (Golden Lightning Bolt & Radiant Brain Synapses)
      case 'enciclopedia_viva':
        return (
          <g transform="translate(14, 14)">
            {/* Neural Brain Silhouette (Pink/Purple) */}
            <path d="M10 12 C8 12 7 15 7 18 C7 24 11 27 15 28 V12 H10 Z" fill="#9333ea" />
            <path d="M26 12 C28 12 29 15 29 18 C29 24 25 27 21 28 V12 H26 Z" fill="#7e22ce" />
            <circle cx="12" cy="16" r="3" fill="#c084fc" />
            <circle cx="24" cy="16" r="3" fill="#a855f7" />
            <circle cx="14" cy="22" r="3" fill="#d8b4fe" />
            <circle cx="22" cy="22" r="3" fill="#c084fc" />
            {/* Crackling Golden Lightning Bolt through center */}
            <polygon points="20,4 12,18 18,18 15,32 26,16 19,16" fill="#facc15" />
            <polygon points="19,6 13,17 18,17 16,29 24,17 18,17" fill="#fef08a" />
            {/* Electric Spark Orbs */}
            <rect x="5" y="8" width="2" height="2" fill="#fbbf24" />
            <rect x="29" y="8" width="2" height="2" fill="#fbbf24" />
            <rect x="6" y="24" width="2" height="2" fill="#67e8f9" />
            <rect x="28" y="24" width="2" height="2" fill="#67e8f9" />
          </g>
        );

      // 8. Curioso Nível Hard: 7 em 1 / Explorador da Matriz (Golden Compass with 7 Elemental Gems)
      case 'explorador_matriz':
        return (
          <g transform="translate(14, 14)">
            {/* Brass Compass Rim */}
            <circle cx="18" cy="18" r="15" fill="#78350f" />
            <circle cx="18" cy="18" r="13" fill="#f59e0b" />
            <circle cx="18" cy="18" r="11" fill="#0f172a" />
            {/* Compass Needle (Red & White) */}
            <polygon points="18,9 21,18 18,16 15,18" fill="#ef4444" />
            <polygon points="18,27 21,18 18,20 15,18" fill="#f8fafc" />
            <circle cx="18" cy="18" r="3" fill="#fbbf24" />
            {/* 7 Orbiting Colorful Gems representing 7 Bullying Types */}
            {/* 1. Verbal (Blue) */}
            <circle cx="18" cy="5" r="2" fill="#3b82f6" />
            {/* 2. Físico (Red) */}
            <circle cx="28" cy="10" r="2" fill="#ef4444" />
            {/* 3. Cyber (Cyan) */}
            <circle cx="30" cy="21" r="2" fill="#06b6d4" />
            {/* 4. Moral (Purple) */}
            <circle cx="24" cy="29" r="2" fill="#a855f7" />
            {/* 5. Social (Amber) */}
            <circle cx="12" cy="29" r="2" fill="#f59e0b" />
            {/* 6. Material (Emerald) */}
            <circle cx="6" cy="21" r="2" fill="#10b981" />
            {/* 7. Sexual (Rose) */}
            <circle cx="8" cy="10" r="2" fill="#f43f5e" />
          </g>
        );

      // 9. Doutor em Não-Vacilo / Vade Mecum Escolar (Scales of Justice with Law Book & Gavel)
      case 'advogado_do_bem':
        return (
          <g transform="translate(14, 14)">
            {/* Thick Law Book Base */}
            <rect x="4" y="20" width="28" height="12" fill="#831843" rx="2" />
            <rect x="6" y="21" width="24" height="2" fill="#fef08a" />
            <rect x="6" y="24" width="24" height="6" fill="#be185d" />
            {/* Scales of Justice Column */}
            <rect x="17" y="4" width="2" height="18" fill="#fbbf24" />
            <rect x="11" y="7" width="14" height="2" fill="#f59e0b" />
            {/* Scale Left Pan */}
            <line x1="12" y1="9" x2="8" y2="14" stroke="#fbbf24" strokeWidth="1" />
            <line x1="12" y1="9" x2="16" y2="14" stroke="#fbbf24" strokeWidth="1" />
            <rect x="7" y="14" width="10" height="2" fill="#fde047" />
            {/* Scale Right Pan */}
            <line x1="24" y1="9" x2="20" y2="14" stroke="#fbbf24" strokeWidth="1" />
            <line x1="24" y1="9" x2="28" y2="14" stroke="#fbbf24" strokeWidth="1" />
            <rect x="19" y="14" width="10" height="2" fill="#fde047" />
            {/* Judge Gavel */}
            <rect x="25" y="16" width="6" height="3" fill="#78350f" rx="1" transform="rotate(-30 25 16)" />
            <line x1="24" y1="18" x2="29" y2="25" stroke="#92400e" strokeWidth="2" />
            {/* Golden Star */}
            <rect x="17" y="3" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 10. Embaixador da Empatia Master / Coração de Ouro (Radiant Winged Gold Heart with Sunrays)
      case 'coracao_de_ouro':
        return (
          <g transform="translate(14, 14)">
            {/* Radiant Sunburst background */}
            <path d="M18 3 L20 8 L18 10 L16 8 Z" fill="#fde047" />
            <path d="M33 18 L28 20 L26 18 L28 16 Z" fill="#fde047" />
            <path d="M3 18 L8 20 L10 18 L8 16 Z" fill="#fde047" />
            {/* Angel Feather Wings (Left & Right) */}
            {/* Left Wing */}
            <path d="M13 14 C9 7 2 8 3 17 C4 23 10 24 13 22 Z" fill="#fef08a" />
            <path d="M13 15 C10 10 4 10 5 17 C6 21 11 22 13 20 Z" fill="#ffffff" />
            {/* Right Wing */}
            <path d="M23 14 C27 7 34 8 33 17 C32 23 26 24 23 22 Z" fill="#fef08a" />
            <path d="M23 15 C26 10 32 10 31 17 C30 21 25 22 23 20 Z" fill="#ffffff" />
            {/* 24K Golden Heart */}
            <path d="M12 11 C9 11 7 13 7 16 C7 21 18 29 18 29 C18 29 29 21 29 16 C29 13 27 11 24 11 C21 11 19 13 18 15 C17 13 15 11 12 11 Z" fill="#b45309" />
            <path d="M13 12 C10 12 8 14 8 16 C8 20 18 27 18 27 C18 27 28 20 28 16 C28 14 26 12 23 12 C20 12 19 14 18 15 C17 14 16 12 13 12 Z" fill="#f59e0b" />
            <polygon points="18,15 13,12 15,19 18,23" fill="#fbbf24" />
            <polygon points="18,15 23,12 21,19 18,23" fill="#d97706" />
            {/* Sparkle Glint */}
            <rect x="11" y="14" width="3" height="3" fill="#ffffff" />
            <rect x="25" y="19" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 11. Radar Anti-Exclusão Social / Campeão da Inclusão (Friendship Crest with Diverse Clasped Hands)
      case 'campeao_inclusao':
        return (
          <g transform="translate(14, 14)">
            {/* Crest Shield Background */}
            <circle cx="18" cy="18" r="15" fill="#047857" />
            <circle cx="18" cy="18" r="13" fill="#10b981" />
            <circle cx="18" cy="18" r="11" fill="#ecfdf5" />
            {/* Handshake of Solidarity & Inclusion */}
            {/* Left Arm/Hand (Blue Sleeve) */}
            <rect x="7" y="15" width="8" height="6" fill="#2563eb" rx="1" />
            <polygon points="15,15 20,18 19,22 14,21" fill="#fcd34d" />
            {/* Right Arm/Hand (Purple Sleeve) */}
            <rect x="21" y="15" width="8" height="6" fill="#9333ea" rx="1" />
            <polygon points="21,15 16,18 17,22 22,21" fill="#f87171" />
            {/* Interlocking Clasped Fingers */}
            <rect x="16" y="17" width="4" height="4" fill="#fbbf24" rx="1" />
            {/* Golden Heart of Friendship Floating Above */}
            <path d="M16 8 C15 7 13 7 13 9 C13 11 18 14 18 14 C18 14 23 11 23 9 C23 7 21 7 20 8 C19 9 18 9 18 9 C18 9 17 9 16 8 Z" fill="#ef4444" />
            {/* Sparkle Glints */}
            <rect x="8" y="8" width="2" height="2" fill="#fbbf24" />
            <rect x="26" y="8" width="2" height="2" fill="#fbbf24" />
          </g>
        );

      // 12. Monge Zen Anti-Estresse / Mente Tranquila (Blooming Pink Lotus over Tranquil Rippling Water)
      case 'mente_tranquila':
        return (
          <g transform="translate(14, 14)">
            {/* Water Waves / Ripples */}
            <ellipse cx="18" cy="26" rx="14" ry="4" fill="#0284c7" />
            <ellipse cx="18" cy="26" rx="11" ry="2" fill="#38bdf8" />
            {/* Zen Balanced Stones (Stack of 3) */}
            <ellipse cx="9" cy="24" rx="4" ry="2" fill="#475569" />
            <ellipse cx="9" cy="21" rx="3" ry="1.5" fill="#64748b" />
            <ellipse cx="9" cy="18" rx="2" ry="1" fill="#94a3b8" />
            {/* Lotus Blossom Outer Petals */}
            <path d="M18 10 C14 12 11 18 18 24 C25 18 22 12 18 10 Z" fill="#f43f5e" />
            <path d="M18 12 C15 14 13 18 18 23 C23 18 21 14 18 12 Z" fill="#fb7185" />
            {/* Side Petals (Left & Right) */}
            <path d="M12 17 C9 15 7 19 12 23 C15 22 16 19 12 17 Z" fill="#fda4af" />
            <path d="M24 17 C27 15 29 19 24 23 C21 22 20 19 24 17 Z" fill="#fda4af" />
            {/* Lotus Core Golden Stamen */}
            <circle cx="18" cy="17" r="2" fill="#fef08a" />
            <circle cx="18" cy="17" r="1" fill="#f59e0b" />
            {/* Zen Aura Sparkles */}
            <rect x="18" y="5" width="2" height="2" fill="#fef08a" />
            <rect x="27" y="10" width="2" height="2" fill="#a7f3d0" />
          </g>
        );

      // 13. Pulmão de Aço da Serenidade / Mestre Zen (Glowing Cyan Lungs & 4-7-8 Breathing Wind Flow)
      case 'mestre_zen':
        return (
          <g transform="translate(14, 14)">
            {/* Trachea & Airway */}
            <rect x="17" y="5" width="2" height="8" fill="#06b6d4" />
            <rect x="15" y="12" width="6" height="2" fill="#0891b2" />
            {/* Left Lung Lobe (Cyan Glowing) */}
            <path d="M15 13 C11 13 8 16 8 21 C8 27 13 28 15 26 V13 Z" fill="#0e7490" />
            <path d="M14 14 C11 14 9 17 9 21 C9 25 13 26 14 24 V14 Z" fill="#06b6d4" />
            <path d="M13 16 C11 16 10 18 10 20 C10 23 12 24 13 23 V16 Z" fill="#67e8f9" />
            {/* Right Lung Lobe */}
            <path d="M21 13 C25 13 28 16 28 21 C28 27 23 28 21 26 V13 Z" fill="#0e7490" />
            <path d="M22 14 C25 14 27 17 27 21 C27 25 23 26 22 24 V14 Z" fill="#06b6d4" />
            <path d="M23 16 C25 16 26 18 26 20 C26 23 24 24 23 23 V16 Z" fill="#67e8f9" />
            {/* 4-7-8 Flow Spirals */}
            <path d="M4 18 Q7 13 10 14" stroke="#a5f3fc" strokeWidth="1.5" fill="none" />
            <path d="M32 18 Q29 13 26 14" stroke="#a5f3fc" strokeWidth="1.5" fill="none" />
            <path d="M6 26 Q18 32 30 26" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
            {/* Oxygen Orbs */}
            <circle cx="18" cy="3" r="1.5" fill="#ffffff" />
            <circle cx="6" cy="12" r="1.5" fill="#ffffff" />
            <circle cx="30" cy="12" r="1.5" fill="#ffffff" />
          </g>
        );

      // 14. Coração Leve, Mente Clara / Desabafo Seguro (Golden Speech Bubble with Warm Smiling Pixel Heart)
      case 'desabafo_seguro':
        return (
          <g transform="translate(14, 14)">
            {/* Warm Speech Bubble Base */}
            <path d="M5 8 C5 5 8 3 18 3 C28 3 31 5 31 8 V21 C31 24 28 26 18 26 H11 L6 31 V25 C5 24 5 22 5 21 Z" fill="#78350f" />
            <path d="M6 9 C6 6 9 4 18 4 C27 4 30 6 30 9 V20 C30 23 27 25 18 25 H12 L8 29 V24 H6 Z" fill="#f59e0b" />
            <path d="M8 10 C8 8 10 6 18 6 C26 6 28 8 28 10 V19 C28 21 26 23 18 23 H13 L10 26 V22 H8 Z" fill="#fef3c7" />
            {/* Smiling Pink Heart inside */}
            <path d="M14 11 C12 11 11 12 11 14 C11 17 18 21 18 21 C18 21 25 17 25 14 C25 12 24 11 22 11 C20 11 19 12 18 13 C17 12 16 11 14 11 Z" fill="#ec4899" />
            {/* Happy Eyes on Heart */}
            <rect x="14" y="14" width="1.5" height="1.5" fill="#ffffff" />
            <rect x="21" y="14" width="1.5" height="1.5" fill="#ffffff" />
            {/* Reassuring Smile */}
            <path d="M16 17 Q18 19 20 17" stroke="#ffffff" strokeWidth="1" fill="none" />
            {/* Calming Glow Sparks */}
            <rect x="6" y="4" width="2" height="2" fill="#fbbf24" />
            <rect x="29" y="4" width="2" height="2" fill="#fbbf24" />
          </g>
        );

      // 15. Agente Secreto do Protocolo / Guardião Digital (Encrypted Cyber Padlock with Neon Keyhole)
      case 'guardiao_digital':
        return (
          <g transform="translate(14, 14)">
            {/* Padlock Shackle (Hardened Titanium) */}
            <path d="M11 14 V9 C11 5 14 3 18 3 C22 3 25 5 25 9 V14" stroke="#94a3b8" strokeWidth="4" fill="none" />
            <path d="M11 14 V9 C11 6 14 5 18 5 C22 5 25 6 25 9 V14" stroke="#f1f5f9" strokeWidth="2" fill="none" />
            {/* Padlock Body (Gold & Obsidian) */}
            <rect x="7" y="13" width="22" height="18" fill="#1e293b" rx="2" />
            <rect x="9" y="15" width="18" height="14" fill="#f59e0b" rx="1" />
            <rect x="10" y="16" width="16" height="12" fill="#fbbf24" />
            {/* Neon Keyhole & Circuit Traces */}
            <circle cx="18" cy="20" r="3" fill="#0891b2" />
            <circle cx="18" cy="20" r="2" fill="#06b6d4" />
            <polygon points="17,21 19,21 20,25 16,25" fill="#06b6d4" />
            {/* Circuit Traces */}
            <line x1="12" y1="18" x2="15" y2="18" stroke="#0e7490" strokeWidth="1" />
            <line x1="21" y1="18" x2="24" y2="18" stroke="#0e7490" strokeWidth="1" />
            <line x1="18" y1="25" x2="18" y2="27" stroke="#0e7490" strokeWidth="1" />
            {/* Protocol Binary Code Sparks */}
            <rect x="4" y="16" width="2" height="2" fill="#22d3ee" />
            <rect x="30" y="16" width="2" height="2" fill="#22d3ee" />
            <rect x="17" y="19" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 16. Escudo Guardião Ativado / Radar Anti-Zueira (Heavy Fortress Shield Deflecting Arrows)
      case 'radar_antizueira':
        return (
          <g transform="translate(14, 14)">
            {/* Fortress Tower Shield Body */}
            <path d="M6 4 H30 V20 L18 32 L6 20 Z" fill="#3b0764" />
            <path d="M8 6 H28 V19 L18 29 L8 19 Z" fill="#6b21a8" />
            <path d="M10 8 H26 V18 L18 26 L10 18 Z" fill="#9333ea" />
            {/* Cross of Protection */}
            <rect x="16" y="8" width="4" height="18" fill="#fbbf24" />
            <rect x="11" y="12" width="14" height="4" fill="#fbbf24" />
            <rect x="17" y="9" width="2" height="16" fill="#fef08a" />
            <rect x="12" y="13" width="12" height="2" fill="#fef08a" />
            {/* Center Boss Stud */}
            <circle cx="18" cy="14" r="3" fill="#f59e0b" />
            <circle cx="18" cy="14" r="1.5" fill="#ffffff" />
            {/* Deflection Hex Energy Barrier */}
            <polygon points="18,1 33,8 33,26 18,33 3,26 3,8" stroke="#c084fc" strokeWidth="1" fill="none" opacity="0.6" />
            {/* Deflected negative arrow bouncing off */}
            <line x1="33" y1="5" x2="27" y2="10" stroke="#f87171" strokeWidth="1.5" />
            <rect x="26" y="9" width="2" height="2" fill="#ffffff" />
          </g>
        );

      // 17. Sentinela Noturno da Paz (Wise Royal Owl under Golden Moon & Stars)
      case 'sentinela_noturno':
        return (
          <g transform="translate(14, 14)">
            {/* Midnight Blue Night Sky */}
            <rect x="3" y="3" width="30" height="30" fill="#090d16" rx="3" />
            {/* Golden Crescent Moon */}
            <path d="M26 6 C23 6 21 8 21 11 C21 14 23 16 26 16 C25 16 23 14 23 11 C23 8 25 6 26 6 Z" fill="#fde047" />
            {/* Twinkling Stars */}
            <rect x="7" y="7" width="1.5" height="1.5" fill="#ffffff" />
            <rect x="14" y="5" width="1.5" height="1.5" fill="#ffffff" />
            <rect x="29" y="12" width="1.5" height="1.5" fill="#ffffff" />
            {/* Wooden Tree Branch */}
            <rect x="4" y="27" width="28" height="3" fill="#78350f" rx="1" />
            <rect x="10" y="29" width="3" height="3" fill="#15803d" />
            {/* Owl Body */}
            <ellipse cx="18" cy="20" rx="8" ry="9" fill="#854d0e" />
            <ellipse cx="18" cy="22" rx="5" ry="6" fill="#fef3c7" />
            {/* Owl Feather Tuft Ears */}
            <polygon points="12,12 15,15 11,16" fill="#713f12" />
            <polygon points="24,12 21,15 25,16" fill="#713f12" />
            {/* Owl Big Glowing Eyes */}
            <circle cx="14" cy="16" r="3.5" fill="#fbbf24" />
            <circle cx="14" cy="16" r="1.5" fill="#000000" />
            <rect x="13" y="15" width="1" height="1" fill="#ffffff" />
            <circle cx="22" cy="16" r="3.5" fill="#fbbf24" />
            <circle cx="22" cy="16" r="1.5" fill="#000000" />
            <rect x="21" y="15" width="1" height="1" fill="#ffffff" />
            {/* Owl Beak */}
            <polygon points="18,17 17,20 19,20" fill="#f97316" />
          </g>
        );

      // 18. Lorde Supremo dos Distintivos / Colecionador Supremo (Imperial Crown with Rubies, Sapphires & Diamonds)
      case 'colecionador_supremo':
      default:
        return (
          <g transform="translate(14, 14)">
            {/* Royal Velvet Cap under Crown */}
            <path d="M10 18 C10 12 14 9 18 9 C22 9 26 12 26 18 Z" fill="#991b1b" />
            {/* Imperial Gold Crown Spikes */}
            <polygon points="7,19 7,9 12,14 18,6 24,14 29,9 29,19" fill="#b45309" />
            <polygon points="8,18 8,10 12,14 18,8 24,14 28,10 28,18" fill="#f59e0b" />
            <polygon points="9,17 9,12 12,15 18,10 24,15 27,12 27,17" fill="#fbbf24" />
            {/* Crown Base Rim */}
            <rect x="7" y="18" width="22" height="7" fill="#b45309" rx="1" />
            <rect x="8" y="19" width="20" height="5" fill="#f59e0b" />
            <rect x="9" y="20" width="18" height="3" fill="#fde047" />
            {/* Crown Jewels (Ruby, Sapphire, Emerald) */}
            <circle cx="18" cy="21.5" r="1.8" fill="#ef4444" />
            <circle cx="12" cy="21.5" r="1.4" fill="#3b82f6" />
            <circle cx="24" cy="21.5" r="1.4" fill="#10b981" />
            {/* Top Pearls / Cross */}
            <circle cx="18" cy="6" r="1.5" fill="#ffffff" />
            <circle cx="7" cy="9" r="1.2" fill="#ffffff" />
            <circle cx="29" cy="9" r="1.2" fill="#ffffff" />
            {/* Sparkling Diamond Rays */}
            <rect x="17" y="1" width="2" height="3" fill="#ffffff" />
            <rect x="16" y="2" width="4" height="1" fill="#ffffff" />
            <rect x="4" y="6" width="2" height="2" fill="#fde047" />
            <rect x="30" y="6" width="2" height="2" fill="#fde047" />
          </g>
        );
    }
  };

  return (
    <div 
      className={`relative inline-block select-none shrink-0 ${className} ${animate ? 'hover:scale-105 transition-transform duration-200' : ''}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg
        viewBox="0 0 64 64"
        width={pixelSize}
        height={pixelSize}
        className={`w-full h-full drop-shadow-md ${!isUnlocked ? 'grayscale opacity-75 contrast-125' : ''}`}
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Subtle Frame Ambient Gradients */}
          <radialGradient id={`frame-bg-${tier}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.bgLight} />
            <stop offset="60%" stopColor={colors.bgMid} />
            <stop offset="100%" stopColor={colors.bgDark} />
          </radialGradient>

          {/* Glow filter for unlocked badges */}
          <filter id="badge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. OUTER BLACK PIXEL BORDER (64x64) */}
        <rect x="0" y="2" width="64" height="60" fill={colors.outerBorder} rx="3" />
        <rect x="2" y="0" width="60" height="64" fill={colors.outerBorder} rx="3" />

        {/* 2. INNER DARK BASE */}
        <rect x="2" y="2" width="60" height="60" fill={colors.outerBorder} />

        {/* 3. MAIN BEVELED METALLIC FRAME BORDER */}
        {/* Top & Left Bevel Highlight */}
        <rect x="4" y="4" width="56" height="6" fill={colors.frameLight} />
        <rect x="4" y="4" width="6" height="56" fill={colors.frameLight} />

        {/* Bottom & Right Bevel Shadow */}
        <rect x="4" y="54" width="56" height="6" fill={colors.frameDark} />
        <rect x="54" y="4" width="6" height="56" fill={colors.frameDark} />

        {/* Mid Frame Body */}
        <rect x="6" y="6" width="52" height="52" fill={colors.frameMid} />

        {/* Inner Dark Rim bordering the illustration canvas */}
        <rect x="10" y="10" width="44" height="44" fill={colors.outerBorder} />
        <rect x="12" y="12" width="40" height="40" fill={`url(#frame-bg-${tier})`} />

        {/* 4. CORNER ORNAMENTAL STUDS & GEMS */}
        {/* Top-Left Corner Gem */}
        <rect x="2" y="2" width="8" height="8" fill={colors.outerBorder} />
        <rect x="3" y="3" width="6" height="6" fill={colors.cornerGemDark} />
        <rect x="4" y="4" width="4" height="4" fill={colors.cornerGemMid} />
        <rect x="4" y="4" width="2" height="2" fill={colors.cornerGemLight} />

        {/* Top-Right Corner Gem */}
        <rect x="54" y="2" width="8" height="8" fill={colors.outerBorder} />
        <rect x="55" y="3" width="6" height="6" fill={colors.cornerGemDark} />
        <rect x="56" y="4" width="4" height="4" fill={colors.cornerGemMid} />
        <rect x="56" y="4" width="2" height="2" fill={colors.cornerGemLight} />

        {/* Bottom-Left Corner Gem */}
        <rect x="2" y="54" width="8" height="8" fill={colors.outerBorder} />
        <rect x="3" y="55" width="6" height="6" fill={colors.cornerGemDark} />
        <rect x="4" y="56" width="4" height="4" fill={colors.cornerGemMid} />
        <rect x="4" y="56" width="2" height="2" fill={colors.cornerGemLight} />

        {/* Bottom-Right Corner Gem */}
        <rect x="54" y="54" width="8" height="8" fill={colors.outerBorder} />
        <rect x="55" y="55" width="6" height="6" fill={colors.cornerGemDark} />
        <rect x="56" y="56" width="4" height="4" fill={colors.cornerGemMid} />
        <rect x="56" y="56" width="2" height="2" fill={colors.cornerGemLight} />

        {/* Mid-edge Decorative Rivets */}
        <rect x="30" y="4" width="4" height="3" fill={colors.studColor} />
        <rect x="30" y="57" width="4" height="3" fill={colors.studColor} />
        <rect x="4" y="30" width="3" height="4" fill={colors.studColor} />
        <rect x="57" y="30" width="3" height="4" fill={colors.studColor} />

        {/* 5. INNER PIXEL ART SCENE */}
        <g filter={showGlow && isUnlocked ? 'url(#badge-glow)' : undefined}>
          {renderPixelIllustration()}
        </g>

        {/* 6. LOCKED OVERLAY (If locked) */}
        {!isUnlocked && (
          <g>
            {/* Semi-transparent dark vignette */}
            <rect x="12" y="12" width="40" height="40" fill="#000000" opacity="0.35" />
            {/* Pixel Lock Shackle in center */}
            <path d="M28 26 V22 C28 19 30 17 32 17 C34 17 36 19 36 22 V26" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />
            {/* Pixel Lock Body */}
            <rect x="25" y="25" width="14" height="12" fill="#1e293b" rx="1" />
            <rect x="26" y="26" width="12" height="10" fill="#475569" />
            {/* Keyhole */}
            <circle cx="32" cy="30" r="1.5" fill="#f8fafc" />
            <polygon points="31.5,30 32.5,30 33,33 31,33" fill="#f8fafc" />
          </g>
        )}
      </svg>
    </div>
  );
};

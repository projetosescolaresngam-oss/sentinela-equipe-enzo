import React from 'react';
import { 
  X, 
  CheckCircle2,
  PartyPopper,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Achievement } from './types';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { useApp } from './AppContext';

interface AchievementUnlockModalProps {
  achievement?: Achievement | null;
  onClose?: () => void;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({ 
  achievement: propAchievement, 
  onClose: propOnClose 
}) => {
  const { 
    latestUnlockedAchievement, 
    dismissAchievementModal, 
    userRankPosition, 
    anonymousIdentity,
    setActiveTab,
    achievements
  } = useApp();

  const achievement = propAchievement !== undefined ? propAchievement : latestUnlockedAchievement;
  const handleClose = propOnClose || dismissAchievementModal;

  if (!achievement) return null;

  const totalUnlocked = achievements.filter(a => a.isUnlocked).length;

  const getTierBadge = () => {
    switch (achievement.tier) {
      case 'lendario':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 via-purple-400/20 to-pink-400/20 border border-amber-400/50 text-amber-900 text-xs font-black uppercase tracking-wider">
            💎 Nível Lendário
          </span>
        );
      case 'ouro':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider">
            🥇 Nível Ouro
          </span>
        );
      case 'prata':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-black uppercase tracking-wider">
            🥈 Nível Prata
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-900 text-xs font-black uppercase tracking-wider">
            🥉 Nível Bronze
          </span>
        );
    }
  };

  const handleGoToRanking = () => {
    handleClose();
    setActiveTab('ranking');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      aria-describedby="achievement-modal-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in text-slate-800"
    >
      <div className="bg-white border-2 border-purple-300 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-center animate-scale-up overflow-hidden">
        {/* Floating Sparkle Accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Fechar aviso de conquista desbloqueada"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        {achievement.isSecret ? (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white text-xs font-black uppercase tracking-wider mb-4 shadow-lg animate-pulse">
            <span className="text-sm">🔒✨</span>
            <span>CONQUISTA SECRETA DESCOBERTA!</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <PartyPopper className="w-4 h-4 text-purple-700 animate-bounce" aria-hidden="true" />
            <span>Nova Conquista Desbloqueada!</span>
          </div>
        )}

        {/* Big Retro Framed Badge Showcase */}
        <div className="relative my-3 flex justify-center items-center">
          <div className={`p-2 rounded-3xl border shadow-inner ${
            achievement.isSecret 
              ? 'bg-gradient-to-b from-purple-950/20 to-amber-950/20 border-amber-400/80 ring-4 ring-purple-400/30' 
              : 'bg-gradient-to-b from-slate-900/5 to-slate-900/10 border-purple-200/70'
          }`}>
            <AchievementBadgeFrame
              achievementId={achievement.id}
              tier={achievement.tier}
              isUnlocked={true}
              isSecret={achievement.isSecret}
              size={110}
              showGlow={true}
              animate={true}
            />
          </div>
          
          {/* Floating Funny Sticker Emoji */}
          <div className="absolute -top-2 right-1/4 translate-x-4 text-2xl sm:text-3xl bg-white border-2 border-purple-200 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow-md animate-pulse">
            {achievement.funnySticker || '✨'}
          </div>
        </div>

        {/* Tier & XP Indicator */}
        <div className="mb-2 flex items-center justify-center gap-2 flex-wrap">
          {getTierBadge()}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-sm">
            ⚡ +{achievement.xpReward || 50} XP
          </span>
        </div>

        {/* Secret Discovery Announcement */}
        {achievement.isSecret && (
          <div className="mb-2 bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 border border-purple-300 rounded-2xl p-2.5 text-xs text-purple-900 font-bold shadow-2xs">
            🎉 Você desvendou uma conquista que estava escondida na plataforma!
          </div>
        )}

        {/* Title */}
        <h2 id="achievement-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          {achievement.title}
        </h2>

        {/* Subtitle */}
        {achievement.subtitle && (
          <p className="text-xs font-bold text-purple-800 mb-3 italic">
            "{achievement.subtitle}"
          </p>
        )}

        {/* Description */}
        <p id="achievement-modal-desc" className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 px-2">
          {achievement.unlockedDescription || achievement.description}
        </p>

        {/* Cosmetic Reward Alert if present */}
        {achievement.secretRewardCosmeticId && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-2.5 mb-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-left">
              <span className="text-xl">🎁</span>
              <div>
                <div className="font-black text-amber-950">
                  Nova Recompensa Cosmética!
                </div>
                <div className="text-[11px] text-amber-800 font-medium">
                  Item exclusivo desbloqueado para o seu perfil.
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                handleClose();
                setActiveTab('profile');
              }}
              className="text-[11px] font-black text-purple-900 bg-white hover:bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300 shadow-2xs transition-colors cursor-pointer"
            >
              Equipar
            </button>
          </div>
        )}

        {/* Anonymous Ranking & Performance Pill */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-2.5 mb-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              <Trophy className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="font-extrabold text-purple-950">
                {anonymousIdentity.displayName} (Você)
              </div>
              <div className="text-[11px] text-purple-700 font-medium">
                {totalUnlocked} conquistas • {userRankPosition}º lugar no Ranking
              </div>
            </div>
          </div>
          <button
            onClick={handleGoToRanking}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-950 flex items-center gap-0.5 bg-white px-2.5 py-1 rounded-xl border border-purple-200 shadow-2xs hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <span>Ver Ranking</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Funny Quote Box */}
        {achievement.funnyQuote && (
          <div className="bg-purple-50/90 border border-purple-200/90 rounded-2xl p-3 text-xs text-purple-950 font-medium italic mb-4 text-center shadow-2xs">
            {achievement.funnyQuote}
          </div>
        )}

        {/* Badge Status indicator */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black mb-4 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
          <span>Gravado no seu distintivo de honra escolar</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            Sensacional! Continuar Explorando 🎉
          </button>
        </div>
      </div>
    </div>
  );
};


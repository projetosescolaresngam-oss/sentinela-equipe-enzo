import React from 'react';
import { 
  Trophy, 
  ShieldCheck, 
  HeartHandshake, 
  Heart, 
  Wind, 
  BookOpen, 
  Sparkles, 
  X, 
  CheckCircle2,
  Target,
  Zap,
  Bot,
  Scale,
  Eye,
  Smile,
  Compass,
  Crown,
  Award,
  PartyPopper
} from 'lucide-react';
import { Achievement } from './types';

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({ achievement, onClose }) => {
  if (!achievement) return null;

  const renderIcon = () => {
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10";
    switch (achievement.iconType) {
      case 'trophy':
        return <Trophy className={`${iconClass} text-amber-500`} aria-hidden="true" />;
      case 'crown':
        return <Crown className={`${iconClass} text-amber-500`} aria-hidden="true" />;
      case 'shield':
        return <ShieldCheck className={`${iconClass} text-purple-600`} aria-hidden="true" />;
      case 'handshake':
        return <HeartHandshake className={`${iconClass} text-indigo-600`} aria-hidden="true" />;
      case 'heart':
        return <Heart className={`${iconClass} text-rose-500 fill-rose-500`} aria-hidden="true" />;
      case 'wind':
        return <Wind className={`${iconClass} text-teal-600`} aria-hidden="true" />;
      case 'target':
        return <Target className={`${iconClass} text-emerald-600`} aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className={`${iconClass} text-amber-500`} aria-hidden="true" />;
      case 'zap':
        return <Zap className={`${iconClass} text-yellow-500 fill-yellow-400`} aria-hidden="true" />;
      case 'bot':
        return <Bot className={`${iconClass} text-blue-600`} aria-hidden="true" />;
      case 'scale':
        return <Scale className={`${iconClass} text-indigo-600`} aria-hidden="true" />;
      case 'eye':
        return <Eye className={`${iconClass} text-purple-600`} aria-hidden="true" />;
      case 'smile':
        return <Smile className={`${iconClass} text-amber-500`} aria-hidden="true" />;
      case 'compass':
        return <Compass className={`${iconClass} text-teal-600`} aria-hidden="true" />;
      case 'award':
        return <Award className={`${iconClass} text-purple-600`} aria-hidden="true" />;
      default:
        return <BookOpen className={`${iconClass} text-purple-600`} aria-hidden="true" />;
    }
  };

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
          onClick={onClose}
          aria-label="Fechar aviso de conquista desbloqueada"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 text-purple-950 text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
          <PartyPopper className="w-4 h-4 text-purple-700 animate-bounce" aria-hidden="true" />
          <span>Nova Conquista Desbloqueada!</span>
        </div>

        {/* Big Animated Badge Icon with Funny Sticker */}
        <div className="relative w-22 h-22 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 flex items-center justify-center mb-3 shadow-md">
          {renderIcon()}
          
          {/* Floating Funny Sticker Emoji */}
          <div className="absolute -top-2 -right-2 text-2xl sm:text-3xl bg-white border-2 border-purple-200 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow-md animate-pulse">
            {achievement.funnySticker || '✨'}
          </div>
        </div>

        {/* Tier Indicator */}
        <div className="mb-2">
          {getTierBadge()}
        </div>

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
        <p id="achievement-modal-desc" className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 px-2">
          {achievement.unlockedDescription || achievement.description}
        </p>

        {/* Funny Quote Box */}
        {achievement.funnyQuote && (
          <div className="bg-purple-50/90 border border-purple-200/90 rounded-2xl p-3 text-xs text-purple-950 font-medium italic mb-5 text-center shadow-2xs">
            {achievement.funnyQuote}
          </div>
        )}

        {/* Badge Status indicator */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black mb-5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
          <span>Gravado no seu distintivo de honra escolar</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-sm transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
          >
            Sensacional! Continuar Explorando 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

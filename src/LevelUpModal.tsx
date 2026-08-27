import React, { useEffect } from 'react';
import { Sparkles, Trophy, Check, Award, X } from 'lucide-react';
import { soundEngine } from './relaxingAudio';

interface LevelUpModalProps {
  levelInfo: {
    level: number;
    title: string;
    badgeEmoji: string;
    description: string;
  } | null;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ levelInfo, onClose }) => {
  useEffect(() => {
    if (levelInfo) {
      soundEngine.playChimeSuccess();
    }
  }, [levelInfo]);

  if (!levelInfo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-2 border-amber-400 overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow & Confetti visual elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-200/40 rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar celebração de nível"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Level Badge Animated */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-400 p-1 shadow-lg animate-bounce">
            <div className="w-full h-full rounded-3xl bg-purple-950 flex flex-col items-center justify-center text-white">
              <span className="text-2xl">{levelInfo.badgeEmoji}</span>
              <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider mt-0.5">
                Nv. {levelInfo.level}
              </span>
            </div>
          </div>
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          Novo Nível Desbloqueado!
        </div>

        {/* Level Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
          Nível {levelInfo.level} • {levelInfo.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {levelInfo.description || 'Parabéns pela sua dedicação! Suas atitudes éticas e estudos continuam fortalecendo a cultura de paz escolar.'}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Continuar Jornada
        </button>
      </div>
    </div>
  );
};

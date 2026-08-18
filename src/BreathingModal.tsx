import React, { useState, useEffect, useRef } from 'react';
import { Wind, X, Sparkles, CheckCircle2, RotateCcw, Heart, Music, Volume2, VolumeX } from 'lucide-react';
import { useApp } from './AppContext';
import { SoundPlayer } from './SoundPlayer';
import { soundEngine } from './relaxingAudio';

export const BreathingModal: React.FC = () => {
  const { isBreathingModalOpen, setIsBreathingModalOpen } = useApp();
  const [phase, setPhase] = useState<'inspire' | 'segure' | 'expire'>('inspire');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'478' | 'sons' | 'grounding'>('478');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Trigger phase sound when phase changes or timer restarts
  const playCurrentPhaseSound = (currentPhase: 'inspire' | 'segure' | 'expire') => {
    if (soundEnabled && isActive) {
      soundEngine.playBreathPhase(currentPhase);
    }
  };

  useEffect(() => {
    if (!isBreathingModalOpen || !isActive || activeTab !== '478') {
      soundEngine.stopBreathPhase();
      return;
    }

    // Play initial sound when entering/opening 4-7-8
    if (secondsLeft === 4 && phase === 'inspire') {
      playCurrentPhaseSound('inspire');
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === 'inspire') {
          setPhase('segure');
          playCurrentPhaseSound('segure');
          return 7;
        } else if (phase === 'segure') {
          setPhase('expire');
          playCurrentPhaseSound('expire');
          return 8;
        } else {
          setPhase('inspire');
          playCurrentPhaseSound('inspire');
          setCycleCount(c => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      soundEngine.stopBreathPhase();
    };
  }, [isBreathingModalOpen, isActive, phase, activeTab, soundEnabled]);

  if (!isBreathingModalOpen) return null;

  const phaseInstruction = {
    inspire: { 
      text: 'Inspire profundamente pelo nariz... sinta o ar fresco entrar', 
      tone: 'Brisa Suave & Maré Calma', 
      color: 'from-purple-400 to-indigo-500', 
      scale: 'scale-125' 
    },
    segure: { 
      text: 'Segure o ar com calma nos pulmões... acolha a tranquilidade', 
      tone: 'Cinzas, Brasas & Gotas Suaves', 
      color: 'from-purple-500 to-violet-600', 
      scale: 'scale-125' 
    },
    expire: { 
      text: 'Expire devagar pela boca... soltando toda a tensão e o cansaço', 
      tone: 'Vento e Chuva Relaxante Descendente', 
      color: 'from-violet-500 to-purple-600', 
      scale: 'scale-90' 
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-purple-200/90 rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-purple-100 text-purple-800 shadow-2xs">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Pausa para Descompressão</h3>
              <p className="text-xs text-slate-500">Regulação emocional e alívio da ansiedade</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.stopBreathPhase();
              setIsBreathingModalOpen(false);
            }}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-purple-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-purple-100/70 p-1 rounded-2xl mb-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('478')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === '478'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Respiração 4-7-8
          </button>
          <button
            onClick={() => setActiveTab('sons')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'sons'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sons Relaxantes
          </button>
          <button
            onClick={() => setActiveTab('grounding')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'grounding'
                ? 'bg-purple-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Sentidos
          </button>
        </div>

        {activeTab === '478' && (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            {/* Animated Breathing Circle */}
            <div className="relative flex items-center justify-center w-52 h-52 mb-6">
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-tr ${phaseInstruction[phase].color} opacity-30 blur-xl transition-all duration-1000 ${phaseInstruction[phase].scale}`}
              />
              <div 
                className={`w-40 h-40 rounded-full bg-gradient-to-tr ${phaseInstruction[phase].color} flex flex-col items-center justify-center text-white shadow-md transition-transform duration-1000 ease-in-out ${phaseInstruction[phase].scale}`}
              >
                <span className="text-4xl font-black tracking-tight">{secondsLeft}s</span>
                <span className="text-xs uppercase tracking-widest font-extrabold mt-1 opacity-90">
                  {phase === 'inspire' ? 'Inspire' : phase === 'segure' ? 'Segure' : 'Expire'}
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-800 mb-1 h-10 flex items-center justify-center px-4">
              {phaseInstruction[phase].text}
            </p>

            {/* Audio Phase Visual Feedback */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-300/80 text-[11px] text-purple-950 mb-4 font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <span>Som Ativo: <strong>{phaseInstruction[phase].tone}</strong></span>
            </div>

            <div className="flex items-center justify-between w-full text-xs text-slate-600 mb-5 px-2">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                <span>Ciclos completados: <strong className="text-slate-900 font-bold">{cycleCount}</strong></span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-colors font-semibold ${
                  soundEnabled 
                    ? 'bg-purple-100 border-purple-400 text-purple-950' 
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                }`}
                title={soundEnabled ? 'Silenciar som das fases' : 'Ativar som das fases'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Sons: ON' : 'Sons: Mudo'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => {
                  const nextActive = !isActive;
                  setIsActive(nextActive);
                  if (nextActive && soundEnabled) {
                    playCurrentPhaseSound(phase);
                  }
                }}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                {isActive ? 'Pausar' : 'Continuar'}
              </button>
              <button
                onClick={() => {
                  setPhase('inspire');
                  setSecondsLeft(4);
                  setCycleCount(0);
                  setIsActive(true);
                  if (soundEnabled) {
                    playCurrentPhaseSound('inspire');
                  }
                }}
                className="p-2.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sons' && (
          <div className="py-2">
            <SoundPlayer compact={true} />
          </div>
        )}

        {activeTab === 'grounding' && (
          <div className="space-y-3 py-2 text-xs text-slate-700">
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
              <span className="font-bold text-purple-950 block mb-0.5">👁️ 5 coisas que você pode VER</span>
              <p className="text-slate-600">Olhe ao seu redor e note 5 objetos concretos (uma mesa, uma cor, uma janela, um livro).</p>
            </div>
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
              <span className="font-bold text-purple-950 block mb-0.5">🖐️ 4 coisas que você pode TOCAR</span>
              <p className="text-slate-600">Sinta a textura da sua roupa, a sola do tênis no chão ou o apoio da cadeira.</p>
            </div>
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
              <span className="font-bold text-purple-950 block mb-0.5">👂 3 coisas que você pode OUVIR</span>
              <p className="text-slate-600">Preste atenção aos sons de fundo (o vento, passos distantes, sua própria respiração).</p>
            </div>
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
              <span className="font-bold text-purple-950 block mb-0.5">👃 2 coisas que você pode CHEIRAR</span>
              <p className="text-slate-600">Identifique aromas no ar ou no seu casaco.</p>
            </div>
            <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
              <span className="font-bold text-emerald-800 block mb-0.5">👅 1 coisa que você pode SABOREAR ou AGRADECER</span>
              <p className="text-slate-600">Lembre-se de que este momento difícil vai passar e você está seguro(a) agora.</p>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-purple-100 text-center">
          <button
            onClick={() => {
              soundEngine.stopBreathPhase();
              setIsBreathingModalOpen(false);
            }}
            className="w-full py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-all shadow-xs"
          >
            Estou Pronto(a) para Continuar
          </button>
        </div>

      </div>
    </div>
  );
};

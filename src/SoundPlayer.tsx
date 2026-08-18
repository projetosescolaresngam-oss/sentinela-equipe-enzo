import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Flame,
  Waves, 
  Wind, 
  Trees, 
  Volume2, 
  VolumeX, 
  Pause, 
  Sparkles,
  Music
} from 'lucide-react';
import { soundEngine, SoundType } from './relaxingAudio';

interface SoundOption {
  id: SoundType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgActive: string;
  borderActive: string;
}

const SOUNDS: SoundOption[] = [
  {
    id: 'chuva',
    title: 'Chuva Suave',
    subtitle: 'Gotas de alívio e aconchego',
    icon: CloudRain,
    accentColor: 'text-sky-400',
    bgActive: 'bg-sky-950/60 border-sky-500/50 text-sky-200',
    borderActive: 'border-sky-500/50'
  },
  {
    id: 'cinzas',
    title: 'Cinzas & Brasas',
    subtitle: 'Estalos suaves de fogueira quente',
    icon: Flame,
    accentColor: 'text-amber-400',
    bgActive: 'bg-amber-950/60 border-amber-500/50 text-amber-200',
    borderActive: 'border-amber-500/50'
  },
  {
    id: 'ondas',
    title: 'Ondas do Mar',
    subtitle: 'Vaivém calmo do oceano',
    icon: Waves,
    accentColor: 'text-cyan-400',
    bgActive: 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200',
    borderActive: 'border-cyan-500/50'
  },
  {
    id: 'vento',
    title: 'Vento Suave',
    subtitle: 'Brisa leve e descompressão',
    icon: Wind,
    accentColor: 'text-teal-400',
    bgActive: 'bg-teal-950/60 border-teal-500/50 text-teal-200',
    borderActive: 'border-teal-500/50'
  },
  {
    id: 'floresta',
    title: 'Noite na Floresta',
    subtitle: 'Grilos e folhas ao anoitecer',
    icon: Trees,
    accentColor: 'text-emerald-400',
    bgActive: 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200',
    borderActive: 'border-emerald-500/50'
  }
];

export const SoundPlayer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [currentSound, setCurrentSound] = useState<SoundType>(soundEngine.getCurrentSound());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.isSoundMuted());
  const [volume, setVolume] = useState<number>(soundEngine.getVolume());

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(() => {
      setCurrentSound(soundEngine.getCurrentSound());
      setIsMuted(soundEngine.isSoundMuted());
      setVolume(soundEngine.getVolume());
    });
    return unsubscribe;
  }, []);

  const handleSelectSound = (type: SoundType) => {
    if (currentSound === type) {
      soundEngine.stop();
    } else {
      soundEngine.play(type);
      if (isMuted) {
        soundEngine.toggleMute();
      }
    }
  };

  const handleToggleMute = () => {
    soundEngine.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    soundEngine.setVolume(val);
  };

  const handleStopAll = () => {
    soundEngine.stopAll();
  };

  if (compact) {
    return (
      <div className="bg-white border border-purple-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-950 uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 text-purple-700" />
            <span>Sons para Acalmar a Mente</span>
          </div>
          {currentSound !== 'nenhum' && (
            <button
              onClick={handleStopAll}
              className="text-[11px] text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold"
            >
              <Pause className="w-3 h-3" />
              <span>Parar Som</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SOUNDS.map((snd) => {
            const Icon = snd.icon;
            const isPlaying = currentSound === snd.id;
            return (
              <button
                key={snd.id}
                onClick={() => handleSelectSound(snd.id)}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isPlaying 
                    ? 'bg-purple-100 border-purple-400 text-purple-950 ring-1 ring-purple-400 shadow-xs font-bold' 
                    : 'bg-purple-50/50 hover:bg-purple-100/60 border-purple-200/70 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className="w-4 h-4 text-purple-700" />
                  {isPlaying && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                    </span>
                  )}
                </div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">{snd.title}</span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{snd.subtitle}</span>
              </button>
            );
          })}
        </div>

        {currentSound !== 'nenhum' && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-purple-100 text-xs text-slate-600">
            <button 
              onClick={handleToggleMute}
              className="p-1 rounded-lg hover:bg-purple-100 text-slate-600 hover:text-slate-900 transition-colors"
              title={isMuted ? 'Desmutar' : 'Mutar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-purple-700" />}
            </button>
            <span className="text-[11px] text-slate-600 font-semibold">Volume:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-purple-600 h-1.5 bg-purple-200 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono font-bold text-purple-950 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-purple-200/90 rounded-3xl p-6 shadow-xs mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-purple-100 text-purple-800 shadow-2xs">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              Sons Terapêuticos & Ruído Branco
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300 text-[10px] uppercase font-bold">
                Sintetizador Puro
              </span>
            </h3>
            <p className="text-xs text-slate-600">Frequências acústicas geradas para reduzir o estresse, taquicardia e ansiedade</p>
          </div>
        </div>

        {currentSound !== 'nenhum' && (
          <button
            onClick={handleStopAll}
            className="bg-purple-100 hover:bg-rose-100 text-slate-800 hover:text-rose-900 border border-purple-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Pause className="w-3.5 h-3.5 text-rose-600" />
            <span>Pausar Som Atual</span>
          </button>
        )}
      </div>

      {/* Grid of Sound Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SOUNDS.map((snd) => {
          const Icon = snd.icon;
          const isPlaying = currentSound === snd.id;
          return (
            <button
              key={snd.id}
              onClick={() => handleSelectSound(snd.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all group ${
                isPlaying 
                  ? 'bg-purple-100/90 border-purple-400 ring-2 ring-purple-400 shadow-xs scale-[1.02]' 
                  : 'bg-purple-50/40 hover:bg-purple-100/60 border-purple-200/80 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isPlaying ? 'bg-purple-200 text-purple-950' : 'bg-purple-100 text-purple-800'} transition-colors`}>
                  <Icon className="w-5 h-5 text-purple-800" />
                </div>
                {isPlaying ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 group-hover:text-purple-800 font-semibold">Ouvir</span>
                )}
              </div>

              <div>
                <span className="font-extrabold text-sm text-slate-900 block mb-0.5">{snd.title}</span>
                <p className="text-[11px] text-slate-500 leading-snug">{snd.subtitle}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-purple-200/60 text-[10px] font-bold flex items-center justify-between">
                <span className={isPlaying ? 'text-purple-900 font-bold' : 'text-slate-500'}>
                  {isPlaying ? 'Tocando agora' : 'Clique para tocar'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Sound Volume Controls Bar */}
      {currentSound !== 'nenhum' && (
        <div className="mt-4 pt-4 border-t border-purple-100 flex flex-wrap items-center justify-between gap-4 bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200/60">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            <span className="text-slate-700 font-medium">
              Reproduzindo: <strong className="text-slate-900 capitalize font-bold">{SOUNDS.find(s => s.id === currentSound)?.title}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <button 
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg hover:bg-purple-200 text-slate-600 hover:text-slate-900 transition-colors"
              title={isMuted ? 'Desmutar' : 'Mutar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-purple-700" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-purple-600 h-1.5 bg-purple-200 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-purple-950 w-9 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

    </div>
  );
};

// Sound synthesizer using Web Audio API for relaxing ambient sounds
// Generates audible rain, crackling fireplace/embers (cinzas & brasa), ocean waves, forest breeze, and pure white/pink noise client-side.

type SoundType = 'chuva' | 'cinzas' | 'ondas' | 'vento' | 'floresta' | 'nenhum';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentType: SoundType = 'nenhum';
  private gainNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private breathNodes: (AudioNode | number)[] = [];
  private isMuted: boolean = false;
  private volume: number = 0.85; // Boosted base volume for clear audibility

  private listeners: Set<() => void> = new Set();

  public subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.isMuted) {
      this.stopBreathPhase();
    }
    this.notify();
    return this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentSound(): SoundType {
    return this.currentType;
  }

  public stopBreathPhase() {
    this.breathNodes.forEach(node => {
      if (typeof node === 'number') {
        clearInterval(node);
        clearTimeout(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore cleanup errors
        }
      }
    });
    this.breathNodes = [];
  }

  public stop() {
    this.activeNodes.forEach(node => {
      if (typeof node === 'number') {
        clearInterval(node);
        clearTimeout(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore cleanup errors
        }
      }
    });
    this.activeNodes = [];
    this.currentType = 'nenhum';
    this.notify();
  }

  public stopAll() {
    this.stop();
    this.stopBreathPhase();
  }

  public play(type: SoundType) {
    this.initCtx();
    if (!this.ctx) return;

    if (this.currentType === type) {
      this.stop();
      return;
    }

    this.stop();
    if (type === 'nenhum') return;

    this.currentType = type;

    // Master Gain for volume control
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    masterGain.connect(this.ctx.destination);
    this.gainNode = masterGain;

    if (type === 'chuva') {
      this.playRain(masterGain);
    } else if (type === 'cinzas') {
      this.playEmbersAndFire(masterGain);
    } else if (type === 'ondas') {
      this.playOcean(masterGain);
    } else if (type === 'vento') {
      this.playWind(masterGain);
    } else if (type === 'floresta') {
      this.playForest(masterGain);
    }
  }

  // Rain Sound Generator (Clear, soothing rain with high-volume filtered pink/brown noise and raindrops)
  private playRain(dest: AudioNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.38; // Increased volume amplitude
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate audible pleasant steady rain
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.setValueAtTime(180, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(filter2);
    filter2.connect(dest);

    whiteNoise.start(0);
    this.activeNodes.push(whiteNoise, filter, filter2);

    // Random soothing raindrops pitter-patter
    const dropTimer = window.setInterval(() => {
      if (!ctx || ctx.state === 'suspended') return;
      const osc = ctx.createOscillator();
      const dropGain = ctx.createGain();

      osc.type = 'sine';
      const freq = 1200 + Math.random() * 800;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);

      dropGain.gain.setValueAtTime(0.08, ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(dropGain);
      dropGain.connect(dest);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    }, 180);

    this.activeNodes.push(dropTimer);
  }

  // Som de Cinzas, Brasas & Fogueira Relaxante (Crackling fireplace/embers)
  private playEmbersAndFire(dest: AudioNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Base warm low rumble
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 1.8;
    }

    const brownNoise = ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    const warmthGain = ctx.createGain();
    warmthGain.gain.setValueAtTime(0.45, ctx.currentTime);

    brownNoise.connect(filter);
    filter.connect(warmthGain);
    warmthGain.connect(dest);
    brownNoise.start(0);

    // Crackling embers and burning wood pops (cinzas estalando e brasa acalentadora)
    const crackleInterval = window.setInterval(() => {
      if (!ctx || ctx.state === 'suspended') return;
      
      const popCount = Math.floor(Math.random() * 3) + 1;
      for (let p = 0; p < popCount; p++) {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        // High frequency pop
        osc.type = Math.random() > 0.5 ? 'square' : 'triangle';
        osc.frequency.setValueAtTime(800 + Math.random() * 2500, ctx.currentTime);

        const popTime = ctx.currentTime + Math.random() * 0.15;
        pGain.gain.setValueAtTime(0, popTime);
        pGain.gain.linearRampToValueAtTime(0.35, popTime + 0.005);
        pGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.05);

        osc.connect(pGain);
        pGain.connect(dest);

        osc.start(popTime);
        osc.stop(popTime + 0.06);
      }
    }, 140);

    this.activeNodes.push(brownNoise, filter, warmthGain, crackleInterval);
  }

  // Ocean Waves (Loud, organic wave swells)
  private playOcean(dest: AudioNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.03 * white)) / 1.03;
      lastOut = output[i];
      output[i] *= 4.0; // Rich full volume
    }

    const brownNoise = ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, ctx.currentTime);

    // Wave swell LFO
    const swellGain = ctx.createGain();
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.14, ctx.currentTime); // ~7 sec natural swell

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.55, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(swellGain.gain);

    swellGain.gain.setValueAtTime(0.65, ctx.currentTime);

    brownNoise.connect(filter);
    filter.connect(swellGain);
    swellGain.connect(dest);

    brownNoise.start(0);
    lfo.start(0);

    this.activeNodes.push(brownNoise, filter, swellGain, lfo, lfoGain);
  }

  // Wind Generator with soft organic resonance
  private playWind(dest: AudioNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.45; // Increased amplitude
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(420, ctx.currentTime);
    bandpass.Q.setValueAtTime(2.5, ctx.currentTime);

    // Wind gust sweep LFO
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(220, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(bandpass.frequency);

    whiteNoise.connect(bandpass);
    bandpass.connect(dest);

    whiteNoise.start(0);
    lfo.start(0);

    this.activeNodes.push(whiteNoise, bandpass, lfo, lfoGain);
  }

  // Forest night / soft breeze & crickets
  private playForest(dest: AudioNode) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Soft rustling breeze
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.22;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, ctx.currentTime);

    noise.connect(filter);
    filter.connect(dest);
    noise.start(0);

    // Cricket chirps with good volume
    const chirp = () => {
      if (!ctx || ctx.state === 'suspended') return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4400 + Math.random() * 250, ctx.currentTime);

      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.02);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(g);
      g.connect(dest);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    };

    chirp();
    const interval = window.setInterval(() => {
      if (Math.random() > 0.25) chirp();
    }, 900);

    this.activeNodes.push(noise, filter, interval);
  }

  // Breath Synchronization Sound - Natural Rain, Breeze & Embers Atmosphere for Breathing
  public playBreathPhase(phase: 'inspire' | 'segure' | 'expire') {
    this.stopBreathPhase();
    this.initCtx();
    if (!this.ctx || this.isMuted) return;

    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.75, ctx.currentTime); // Good audible presence
    masterGain.connect(ctx.destination);

    if (phase === 'inspire') {
      // 4 seconds: Inhaling fresh rain breeze / ocean wave swelling up
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 3.8); // Swells open

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 3.6);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 3.95);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noiseSource.start(ctx.currentTime);
      this.breathNodes.push(noiseSource, filter, gain, masterGain);
    } else if (phase === 'segure') {
      // 7 seconds: Gentle rain drops and soothing embers crackle while holding breath in tranquility
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.18;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + 6.2);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 6.95);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noiseSource.start(ctx.currentTime);
      this.breathNodes.push(noiseSource, filter, gain, masterGain);
    } else if (phase === 'expire') {
      // 8 seconds: Soothing deep exhalation breeze & soft rain wash flowing away tension
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.38;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 7.5); // Descending release

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 3.0);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 7.95);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noiseSource.start(ctx.currentTime);
      this.breathNodes.push(noiseSource, filter, gain, masterGain);
    }
  }

  public playChimeSuccess() {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (major celebratory arpeggio)
      
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        
        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.5);
      });
    } catch {
      // ignore audio errors
    }
  }
}

export const soundEngine = new SoundEngine();
export type { SoundType };


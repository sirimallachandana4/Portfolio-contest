// Procedural Ambient Music Synthesizer for Portfolio
// Generates high-fidelity, rich, spatial synth pads and melodic chime arpeggios
// using the Web Audio API with Dynamics Compressor and rich harmonic layering.

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private timerId: number | null = null;
  private isMuted: boolean = false;
  private currentVolume: number = 0.85; // High default volume (85%)
  private listeners: Set<(playing: boolean, volume: number, isMuted: boolean) => void> = new Set();
  private analyser: AnalyserNode | null = null;

  // Musical Scale: Ethereal Pentatonic in A Minor / C Major
  private baseChords = [
    [110.0, 164.81, 220.0, 261.63, 329.63, 440.0], // Am9 (A2, E3, A3, C4, E4, A4)
    [130.81, 196.0, 261.63, 329.63, 392.0, 523.25], // Cmaj7 (C3, G3, C4, E4, G4, C5)
    [146.83, 220.0, 293.66, 349.23, 440.0, 587.33], // Dm7 (D3, A3, D4, F4, A4, D5)
    [98.0, 146.83, 196.0, 246.94, 293.66, 392.0],   // Gsus4 (G2, D3, G3, B3, D4, G4)
  ];

  private currentChordIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Dynamics Compressor ensures high volume output without clipping or distortion
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean, volume: number, isMuted: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying, this.currentVolume, this.isMuted);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.currentVolume, this.isMuted));
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const target = this.isMuted ? 0 : this.currentVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public async start() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      if (this.isPlaying) return;
      this.isPlaying = true;
      this.notify();

      this.playAtmosphericCycle();
    } catch (e) {
      console.warn('Web Audio start prevented:', e);
    }
  }

  private playAtmosphericCycle = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const chord = this.baseChords[this.currentChordIdx];
    this.currentChordIdx = (this.currentChordIdx + 1) % this.baseChords.length;

    const padDuration = 5.5; // Smooth progression cycle

    // 1. High-Band Harmonic Filter (Wider bandwidth for clear, audible presence)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(2800, now + 2.5);
    filter.frequency.exponentialRampToValueAtTime(1200, now + padDuration);
    filter.Q.setValueAtTime(1.5, now);
    filter.connect(this.masterGain);

    // 2. Play rich chord oscillators with boosted amplitude
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const voiceGain = ctx.createGain();

      osc.type = idx === 0 ? 'triangle' : idx % 2 === 0 ? 'sine' : 'sawtooth';
      // Detune slightly for lush chorus shimmer
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.8, now);

      // Boosted high output envelope
      const baseGain = idx === 0 ? 0.22 : 0.16; // Strong audible amplitude
      voiceGain.gain.setValueAtTime(0.0001, now);
      voiceGain.gain.exponentialRampToValueAtTime(baseGain, now + 1.2);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + padDuration - 0.1);

      osc.connect(voiceGain);
      voiceGain.connect(filter);

      osc.start(now);
      osc.stop(now + padDuration);
    });

    // 3. Crisp Melodic Chime Arpeggios (Audible high sparkling notes)
    const arpFreqs = [chord[1] * 2, chord[3] * 2, chord[4] * 2, chord[2] * 4];
    arpFreqs.forEach((freq, i) => {
      const arpTime = now + 0.8 + i * 0.85;
      const arpOsc = ctx.createOscillator();
      const arpGain = ctx.createGain();

      arpOsc.type = 'sine';
      arpOsc.frequency.setValueAtTime(freq, arpTime);

      arpGain.gain.setValueAtTime(0.0001, arpTime);
      arpGain.gain.exponentialRampToValueAtTime(0.12, arpTime + 0.08); // High chime clarity
      arpGain.gain.exponentialRampToValueAtTime(0.0001, arpTime + 1.8);

      arpOsc.connect(arpGain);
      arpGain.connect(this.masterGain!);

      arpOsc.start(arpTime);
      arpOsc.stop(arpTime + 1.9);
    });

    // 4. Sub-Bass Warmth Foundation
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(chord[0] / 2, now); // Sub octave

    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.18, now + 1.0);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + padDuration - 0.1);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + padDuration);

    // Schedule next seamless loop
    this.timerId = window.setTimeout(() => {
      this.playAtmosphericCycle();
    }, (padDuration - 1.0) * 1000);
  };

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }
}

export const ambientMusic = new AmbientMusicEngine();

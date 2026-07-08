import { Injectable, signal } from '@angular/core';

/**
 * All sounds here are synthesized on the fly with the Web Audio API —
 * no binary assets to fetch, nothing to license, nothing to go stale.
 * Kept intentionally soft/short so they read as "ambience", not noise.
 */
@Injectable({ providedIn: 'root' })
export class JourneyAudioService {
  soundOn = signal(false);

  musicOn = signal(true);
private music: HTMLAudioElement | null = null;

initMusic() {
  if (typeof window === 'undefined' || this.music) return;
  this.music = new Audio('assets/aladdin.mp3');
  this.music.loop = true;
  this.music.play().catch(() => {
    const tryPlay = () => {
      if (this.musicOn()) this.music?.play().catch(() => {});
    };
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
  });
}

toggleMusic() {
  this.musicOn.update(v => !v);
  if (!this.music) return;
  if (this.musicOn()) {
    this.music.play().catch(() => {});
  } else {
    this.music.pause();
  }
}
  private ctx: AudioContext | null = null;

  toggle() {
    this.soundOn.update(v => !v);
    if (this.soundOn()) {
      this.ensureCtx();
      this.chime();
    }
  }

  private ensureCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
      if (!Ctx) return null;
      this.ctx = new Ctx();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  /** Distant rolling thunder rumble */
  thunder() {
    if (!this.soundOn()) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 2.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(120, now);
    lowpass.frequency.linearRampToValueAtTime(50, now + 2.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    noise.connect(lowpass).connect(gain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 2.2);
  }

  /** Soft magical chime when a cloud is "discovered" */
  chime() {
    if (!this.soundOn()) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [880, 1108.7, 1318.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const start = now + i * 0.09;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.65);
    });
  }

  /** Tiny footstep tick while the character walks */
  footstep() {
    if (!this.soundOn()) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }
}

import { Injectable, signal } from '@angular/core';

export interface AladdinPose {
  leftPct: number;
  topPx: number;
  scale: number;
  tiltDeg: number;
  opacity: number;
}

interface Waypoint {
  id: string;       // 'gate', a section id, or 'end' — only used when `t` is omitted
  leftPct: number;
  tiltDeg?: number;
  t?: number;        // optional: 0-1 fraction between the gate and the end, for custom in-between points
}

const TARGET_IDS = ['home', 'projects', 'skills', 'experience', 'contact'];

@Injectable({ providedIn: 'root' })
export class AladdinFlightService {
  readonly pose = signal<AladdinPose>({ leftPct: 50, topPx: 0, scale: 0, tiltDeg: 0, opacity: 0 });

  private readonly weaves = 3.5;
  private readonly amplitude = 30; // % of viewport width
  // Extra points (besides the TARGET_IDS containers) where he should
  // visibly grow, given as a fraction (0-1) between the gate and the end.
  private readonly growthPoints: { t: number; boost: number }[] = [
    { t: 0.155, boost: 0.8 },{ t: 0.748, boost: 0.8 }, { t: 1.000, boost: 1.2 },
  ];

  visible = signal(true);
private navigating = false;
private idleTimer: any = null;

/** Call when nav or lazy-nav triggers a jump to a section. */
beginNavigation() {
  this.navigating = true;
  this.visible.set(true);
  this.armIdleWatch();
}

/** Call on every scroll tick (from AladdinFlyerComponent's scroll listener). */
onScrollTick() {
  if (this.navigating) {
    this.armIdleWatch();
  } else if (!this.visible()) {
    // any manual scroll while hidden brings him back
    this.visible.set(true);
  }
}

private armIdleWatch() {
  if (this.idleTimer) clearTimeout(this.idleTimer);
  this.idleTimer = setTimeout(() => {
    if (this.navigating) {
      this.navigating = false;
      this.visible.set(false); // arrived — vanish
    }
  }, 150);
}

  // Your custom flight path: one entry per landmark, in top-to-bottom order.
  // Edit leftPct/tiltDeg freely, or add more waypoints between existing ones
  // for finer control — Aladdin straight-line-interpolates between whichever
  // two waypoints he's currently between.
private readonly waypoints: Waypoint[] = [

 { id: 'w', t: 0.016, leftPct: 50.3, tiltDeg: 0 },
 { id: 'w', t: 0.030, leftPct: 55.0, tiltDeg: 0 },

{ id: 'settle-experienc', t: 0.077, leftPct: 90.5, tiltDeg: 0 },
{ id: 'w', t: 0.088, leftPct: 75.2, tiltDeg: 0 },
{ id: 'w', t: 0.098, leftPct: 45.9, tiltDeg: 0 },
{ id: 'w', t: 0.155, leftPct: 49.3, tiltDeg: 0 },
{ id: 'w', t: 0.166, leftPct: 51.3, tiltDeg: 0 },



{ id: 'w', t: 0.181, leftPct: 23.2, tiltDeg: 0 },
{ id: 'w', t: 0.195, leftPct: 22.0, tiltDeg: 0 },


{ id: 'w', t: 0.222, leftPct: 56.8, tiltDeg: 0 },
{ id: 'w', t: 0.274, leftPct: 92.9, tiltDeg: 0 },
{ id: 'w', t: 0.306, leftPct: 51.7, tiltDeg: 0 },

{ id: 'w', t: 0.334, leftPct: 48.4, tiltDeg: 0 },
{ id: 'w', t: 0.344, leftPct: 51.5, tiltDeg: 0 },
{ id: 'w', t: 0.378, leftPct: 21.1, tiltDeg: 0 },
{ id: 'w', t: 0.418, leftPct: 50.4, tiltDeg: 0 },
{ id: 'w', t: 0.449, leftPct: 94.0, tiltDeg: 0 },
{ id: 'w', t: 0.493, leftPct: 93.7, tiltDeg: 0 },
{ id: 'w', t: 0.523, leftPct: 94.2, tiltDeg: 0 },
{ id: 'w', t: 0.547, leftPct: 50.0, tiltDeg: 0 },
{ id: 'w', t: 0.580, leftPct: 50.8, tiltDeg: 0 },
{ id: 'w', t: 0.586, leftPct: 50.9, tiltDeg: 0 },
{ id: 'w', t: 0.602, leftPct: 49.2, tiltDeg: 0 },

{ id: 'w', t: 0.631, leftPct: 21.5, tiltDeg: 0 },
{ id: 'w', t: 0.663, leftPct: 56.9, tiltDeg: 0 },
{ id: 'w', t: 0.706, leftPct: 93.1, tiltDeg: 0 },
{ id: 'w', t: 0.748, leftPct: 3.0, tiltDeg: 0 },
{ id: 'w', t: 0.748, leftPct: 10.3, tiltDeg: 0 },
{ id: 'w', t: 0.790, leftPct: 51.1, tiltDeg: 0 },
{ id: 'w', t: 0.825, leftPct: 49.0, tiltDeg: 0 },
{ id: 'w', t: 0.841, leftPct: 48.8, tiltDeg: 0 },
{ id: 'w', t: 0.871, leftPct: 21.2, tiltDeg: 0 },
{ id: 'w', t: 0.938, leftPct: 93.8, tiltDeg: 0 },
{ id: 'w', t: 0.969, leftPct: 50.5, tiltDeg: 0 },
{ id: 'w', t: 0.978, leftPct: 49.4, tiltDeg: 0 },
{ id: 'settle-experience', t: 1.000, leftPct: 49.7, tiltDeg: 0 }
  ];

  // How far (in px) from a container's center he's still noticeably growing.
  private readonly falloff = 900;
  private readonly baseScale = 0.35;
  private readonly peakBoost = 1.6;

  private scrollProgress = 0;
  private entranceScale = 0;
  private entranceStarted = false;

  /** Call once, on load, to make him grow out of the gate. */
  playEntrance() {
    if (this.entranceStarted) return;
    this.entranceStarted = true;

    const duration = 1500;
    const startTime = performance.now();
    const easeOutBack = (t: number) => {
      const c1 = 1.7;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      this.entranceScale = Math.max(0, easeOutBack(t));
      this.recompute();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /** Call on scroll/resize. */
  update() {
    const doc = document.documentElement;
    const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
    this.scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollable));
    this.recompute();
  }

  private docStartY(el: Element): number {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  }

private waypointDocY(wp: Waypoint, gateDocY: number, endDocY: number): number {
    if (wp.t !== undefined) return gateDocY + wp.t * (endDocY - gateDocY);
    if (wp.id === 'gate') return gateDocY;
    if (wp.id === 'end') return endDocY;
    const el = document.getElementById(wp.id);
    return el ? this.docStartY(el) : endDocY;
  }

  private recompute() {
    const p = this.scrollProgress;

    // --- vertical path: gate anchor -> bottom of the last section ---
    const gateEl = document.getElementById('aladdin-gate-anchor');
    const gateDocY = gateEl ? gateEl.getBoundingClientRect().top + window.scrollY : 96;

    const contactEl = document.getElementById('contact');
    const endDocY = contactEl
      ? contactEl.getBoundingClientRect().bottom + window.scrollY
      : document.documentElement.scrollHeight - window.innerHeight * 0.3;

    const docY = gateDocY + p * (endDocY - gateDocY);
    const topPx = docY - window.scrollY;

 let leftPct = 50;
    let tiltDeg = 0;
    for (let i = 0; i < this.waypoints.length - 1; i++) {
      const a = this.waypoints[i];
      const b = this.waypoints[i + 1];
      const aY = this.waypointDocY(a, gateDocY, endDocY);
      const bY = this.waypointDocY(b, gateDocY, endDocY);
      if (docY >= aY && docY <= bY) {
        const t = bY === aY ? 0 : (docY - aY) / (bY - aY);
        leftPct = a.leftPct + (b.leftPct - a.leftPct) * t;
        tiltDeg = (a.tiltDeg ?? 0) + ((b.tiltDeg ?? 0) - (a.tiltDeg ?? 0)) * t;
        break;
      }
    }

    // --- size: grows as he nears ANY of the named containers, shrinks
    // again as he moves away from it, independently for each one, so he
    // pulses bigger passing hero, then projects, then skills, etc. ---
    
    let growth = 0;
    for (const id of TARGET_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const dist = Math.abs(docY - this.docStartY(el));
      const proximity = Math.max(0, 1 - dist / this.falloff);
      growth = Math.max(growth, proximity);
    }

    for (const gp of this.growthPoints) {
      const gpDocY = gateDocY + gp.t * (endDocY - gateDocY);
      const dist = Math.abs(docY - gpDocY);
      const proximity = Math.max(0, 1 - dist / this.falloff) * gp.boost;
      growth = Math.max(growth, proximity);
    }

    const approachScale = this.baseScale + growth * this.peakBoost;
    const scale = this.entranceScale * approachScale;

    const opacity = Math.min(1, this.entranceScale);

    this.pose.set({ leftPct, topPx, scale, tiltDeg, opacity });
  }
}
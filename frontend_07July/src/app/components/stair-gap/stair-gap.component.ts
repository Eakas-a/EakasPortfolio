import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyAudioService } from '../../services/journey-audio.service';

interface CloudCfg { top: number; leftPct: number; width: number; opacity: number; dur: number; delay: number; flipH: boolean; }
interface BirdCfg { top: number; dur: number; delay: number; scale: number; }

@Component({
  selector: 'app-stair-gap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gap" #gapEl [class.flip]="flip">
      <div class="gap-scene">
      <!-- winding stair ribbon, top to bottom -->
      <svg class="ribbon" viewBox="0 0 200 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path [attr.d]="ribbonPath" fill="none" [attr.stroke]="lineColor" stroke-width="16" stroke-linecap="round"/>
        <path [attr.d]="ribbonPath" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="1 9" stroke-linecap="round"/>
      </svg>

      <!-- fluffy background clouds, varied sizes -->
      <svg *ngFor="let c of clouds" class="sky-cloud" [class.flip-h]="c.flipH"
           [style.top.%]="c.top" [style.left.%]="c.leftPct" [style.width.px]="c.width"
           [style.opacity]="c.opacity" [style.animationDuration.s]="c.dur" [style.animationDelay.s]="c.delay"
           viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.5"/>
      </svg>

      <!-- birds crossing the sky -->
      <svg *ngFor="let b of birds" class="bird" [style.top.%]="b.top"
           [style.animationDuration.s]="b.dur" [style.animationDelay.s]="b.delay" [style.transform]="'scale(' + b.scale + ')'"
           viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- scalloped cloud edge that frames the transition without covering the genie -->
      <svg class="cloud-edge top-edge" [style.opacity]="entryEdgeOpacity" viewBox="0 0 200 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rainbowCloudGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#BA68C8"/>
            <stop offset="25%" stop-color="#64B5F6"/>
            <stop offset="50%" stop-color="#81C784"/>
            <stop offset="75%" stop-color="#FFD54F"/>
            <stop offset="100%" stop-color="#FF8A65"/>
          </linearGradient>
        </defs>
        <path d="M0 110 L0 46 Q14 20 28 44 Q44 14 60 42 Q76 12 92 42 Q108 16 124 44 Q140 14 156 42 Q172 20 186 44 Q194 30 200 46 L200 110 Z"
              fill="url(#rainbowCloudGradientTop)" stroke="var(--line)" stroke-width="2"/>
        <path d="M10 72 C26 54 48 54 70 70 C92 48 118 48 138 68 C156 56 176 58 190 74"
              fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="4" stroke-linecap="round"/>
      </svg>

      <svg class="cloud-edge bottom-edge" [style.opacity]="edgeOpacity" viewBox="0 0 200 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rainbowCloudGradientBottom" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#BA68C8"/>
            <stop offset="25%" stop-color="#64B5F6"/>
            <stop offset="50%" stop-color="#81C784"/>
            <stop offset="75%" stop-color="#FFD54F"/>
            <stop offset="100%" stop-color="#FF8A65"/>
          </linearGradient>
        </defs>
        <path d="M0 110 L0 46 Q14 20 28 44 Q44 14 60 42 Q76 12 92 42 Q108 16 124 44 Q140 14 156 42 Q172 20 186 44 Q194 30 200 46 L200 110 Z"
              fill="url(#rainbowCloudGradientBottom)" stroke="var(--line)" stroke-width="2"/>
        <path d="M10 72 C26 54 48 54 70 70 C92 48 118 48 138 68 C156 56 176 58 190 74"
              fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="4" stroke-linecap="round"/>
      </svg>
      </div>
    </div>
  `,
  styles: [`
    .gap {
      position: relative;
      height: 420px;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
      background-image: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.28) 24%, rgba(255,255,255,0.46) 60%, rgba(255,255,255,0.75) 100%), var(--sky-bg);
      background-size: cover;
      background-position: center;
    }
    .gap-scene {
      position: absolute; inset: 0; overflow: hidden; z-index: 0;
    }
    .gap::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(251,246,236,0.06) 0%, rgba(251,246,236,0.2) 45%, rgba(251,246,236,0.34) 72%, rgba(251,246,236,0.66) 100%);
      pointer-events: none;
      z-index: 0;
    }
    .ribbon { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.9; left: 50%; transform: translateX(-50%); max-width: 220px; z-index: 0; }

    .sky-cloud {
      position: absolute; z-index: 0; filter: drop-shadow(0 3px 0 rgba(0,0,0,0.04));
      animation: cloudDrift linear infinite alternate;
    }
    .sky-cloud.flip-h { transform: scaleX(-1); }

    .bird {
      position: absolute; left: 0; width: 24px; z-index: 1;
      animation: birdFly linear infinite;
    }

    .cloud-edge {
      position: absolute; left: 0; width: 100%; height: 120px;
      z-index: 2; pointer-events: none; transition: opacity 0.2s linear;
    }
    .cloud-edge.top-edge {
      top: -4px; bottom: auto; transform: scaleY(-1);
    }
    .cloud-edge.bottom-edge {
      bottom: -4px; top: auto;
    }

    @media (max-width: 640px) {
      .gap { height: 320px; }
    }
  `]
})
export class StairGapComponent implements OnInit {
  @Input() label = '';
  @Input() icon = 'cloud';
  @Input() teaser = '';
  @Input() targetId = '';
  @Input() flip = false;

  @ViewChild('gapEl') gapEl!: ElementRef<HTMLElement>;

  ribbonPath = '';
  lineColor = '#c9b98a';
  edgeOpacity = 0;
  entryEdgeOpacity = 0;
  clouds: CloudCfg[] = [];
  birds: BirdCfg[] = [];

  private discovered = false;
  private lastStepAt = 0;
  private sign = 1;

  constructor(private audio: JourneyAudioService) {}

  ngOnInit() {
    // vertical S/spiral curve, top (y=0) to bottom (y=400); mirrored per `flip`
    // so consecutive gaps read as one continuous winding staircase.
    this.sign = this.flip ? -1 : 1;
    this.ribbonPath = this.sign === 1
      ? 'M100 0 C 20 90, 180 190, 100 260 C 20 320, 180 360, 100 400'
      : 'M100 0 C 180 90, 20 190, 100 260 C 180 320, 20 360, 100 400';

    // varied cloud sizes/positions/speeds so the sky doesn't feel repetitive
    this.clouds = [
      { top: 6,  leftPct: -10, width: 150, opacity: 0.9,  dur: 22, delay: 0,  flipH: false },
      { top: 62, leftPct: 55,  width: 220, opacity: 0.75, dur: 30, delay: -6, flipH: true  },
      { top: 30, leftPct: 20,  width: 90,  opacity: 0.55, dur: 18, delay: -3, flipH: false },
      { top: 78, leftPct: -6,  width: 110, opacity: 0.6,  dur: 26, delay: -10, flipH: false },
      { top: 12, leftPct: 68,  width: 70,  opacity: 0.45, dur: 16, delay: -8, flipH: true  }
    ];
    this.birds = [
      { top: 16, dur: 14, delay: 0,  scale: 1 },
      { top: 34, dur: 19, delay: -6, scale: 0.7 },
      { top: 8,  dur: 24, delay: -14, scale: 0.55 }
    ];

    this.onScroll();
  }

  // This no longer positions any Aladdin figure - he's now a single
  // globally-mounted component (see AladdinFlyerComponent) driven by one
  // continuous whole-page scroll value, so he can't disappear or reset as
  // you scroll between sections. This local handler just keeps this
  // section's own decorative cloud edges and footstep/chime sfx timed to
  // when the page is actually scrolling through this particular gap.
  @HostListener('window:scroll')
  onScroll() {
    if (!this.gapEl) return;
    const rect = this.gapEl.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    // progress: 0 when gap top is at bottom of viewport, 1 when gap bottom leaves top of viewport
    const total = rect.height + vh;
    const raw = (vh - rect.top) / total;
    const p = Math.min(1, Math.max(0, raw));

    // keep the cloud edge fully visible at a constant opacity while scrolling through this gap
    const hideRange = 0.22;
    const startHide = Math.max(0, Math.min(1, 1 - (p / hideRange)));
    const endHide = Math.max(0, Math.min(1, (p - (1 - hideRange)) / hideRange));
    this.entryEdgeOpacity = startHide > 0 ? 1 : 0;
    this.edgeOpacity = endHide > 0 ? 1 : 0;

    if (p > 0.03 && p < 0.97) {
      const now = performance.now();
      if (now - this.lastStepAt > 220) {
        this.lastStepAt = now;
        this.audio.footstep();
      }
    }

    if (p > 0.4 && !this.discovered) {
      this.discovered = true;
      this.audio.chime();
    }
  }
}

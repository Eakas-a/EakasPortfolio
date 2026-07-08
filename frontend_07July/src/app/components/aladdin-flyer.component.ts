import { Component, HostListener } from '@angular/core';
import { AladdinFlightService } from '../services/aladdin-flight.service';

@Component({
  selector: 'app-aladdin-flyer',
  standalone: true,
  template: `
     <div class="flyer" [class.fading]="!flight.visible()"
     [style.left.%]="pose().leftPct" [style.top.px]="pose().topPx"
     [style.opacity]="flight.visible() ? pose().opacity : 0">
      <div class="rig" [style.transform]="'rotate(' + pose().tiltDeg + 'deg) scale(' + pose().scale + ')'">
        <div class="hover">
          <svg style="overflow:visible" viewBox="0 0 64 46" width="58" height="42" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="42" rx="24" ry="3" fill="rgba(0,0,0,0.14)"/>
<path d="M6 26 Q32 17 58 26 L54 33 Q32 40 10 33 Z" fill="#7d01a3" stroke="var(--line)" stroke-width="1.6"/>
<path d="M9 27 Q32 20 55 27" fill="none" stroke="#F4D35E" stroke-width="1.3"/>
<path d="M11 31 Q32 37 53 31" fill="none" stroke="#F4D35E" stroke-width="1.3"/>
<path d="M8 26 L2 28 M9 30 L4 33 M56 26 L62 28 M55 30 L60 33" stroke="#F4D35E" stroke-width="1.4" stroke-linecap="round"/>

<g transform="translate(20,4)">
  <!-- vest (now gold, matching turban) -->
  <path d="M2 24 Q12 30 22 24 L20 15 Q12 11 4 15 Z" fill="#F6E27A" stroke="var(--line)" stroke-width="1.6"/>
  <!-- arms -->
  <path d="M2 15 Q-4 17 -2 23" stroke="#F6E27A" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  <path d="M20 15 Q26 17 24 23" stroke="#F6E27A" stroke-width="3.2" fill="none" stroke-linecap="round"/>

 <!-- Nehru jacket (darker gold, open front, worn over vest) -->
<path d="M4.5 15.5 L3 22 Q7 25.5 10.5 24 L9 16 Q6.5 15 4.5 15.5 Z" fill="#C9971F" stroke="var(--line)" stroke-width="1.6"/>
<path d="M19.5 15.5 L21 22 Q17 25.5 13.5 24 L15 16 Q17.5 15 19.5 15.5 Z" fill="#C9971F" stroke="var(--line)" stroke-width="1.6"/>

<!-- Nehru collar (small standing collar at neckline, both sides) -->
<path d="M8.5 15.5 Q9.5 17 10.8 16.2" fill="none" stroke="var(--line)" stroke-width="1.2"/>
<path d="M15.5 15.5 Q14.5 17 13.2 16.2" fill="none" stroke="var(--line)" stroke-width="1.2"/>

<!-- Nehru jacket buttons (left placket only, since it's open) -->
<circle cx="8.3" cy="18" r="0.4" fill="var(--line)"/>
<circle cx="7.7" cy="21" r="0.4" fill="var(--line)"/>

  <!-- Side face cloth (keffiyeh-like, same color as turban, draping beside face) -->
  <path d="M2.5 6 Q-1 10 0 16 Q1.5 19 3.5 18 Q2 13 3.5 7 Z" fill="#F6E27A" stroke="var(--line)" stroke-width="1.3"/>
  <path d="M21.5 6 Q25 10 24 16 Q22.5 19 20.5 18 Q22 13 20.5 7 Z" fill="#F6E27A" stroke="var(--line)" stroke-width="1.3"/>
  <!-- subtle fold lines on side cloths -->
  <path d="M1 10 Q0.5 13 1.5 16" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="0.6"/>
  <path d="M23 10 Q23.5 13 22.5 16" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="0.6"/>

  <!-- head -->
  <circle cx="12" cy="8" r="7.5" fill="#F2C79E" stroke="var(--line)" stroke-width="1.6"/>

  <!-- Turban (rounder, sits over head like a dome) -->
  <path
    d="M2.5 8
       C1 2, 6 -3, 12 -3
       C18 -3, 23 2, 21.5 8
       C21.5 5.5, 17 2, 12 2
       C7 2, 2.5 5.5, 2.5 8 Z"
    fill="#F6E27A"
    stroke="var(--line)"
    stroke-width="1.4"/>

  <!-- Turban fold lines -->
  <path d="M4 5 C7 2.5, 17 2.5, 20 5" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="0.8"/>
  <path d="M3.5 7 C7 4, 17 4, 20.5 7" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="0.8"/>

  <!-- Cloth strip on turban (same color as Nehru jacket, feather stitched onto it) -->
  <path d="M9.5 -3.2 Q12 -5 14.5 -3.2 L14 1 Q12 2 10 1 Z" fill="#C9971F" stroke="var(--line)" stroke-width="1"/>

  <!-- Jewel (centered on turban, above brow) -->
  <circle cx="12" cy="0.5" r="1.6" fill="#e82c02" stroke="var(--line)" stroke-width="1"/>
  <circle cx="12" cy="2" r="1" fill="#8E44AD" stroke="var(--line)" stroke-width="0.5"/>

  <!-- Feather plume (purple, stitched onto the strip) -->
  <path
    d="M12 -3
       C11 -8, 8 -12, 9 -18
       C10 -23, 14 -25, 16 -22
       C17 -19, 14 -17, 15 -13
       C16 -9, 14 -6, 13 -3 Z"
    fill="#8E44AD"
    stroke="var(--line)"
    stroke-width="1"/>
  <path d="M12 -4 C11.5 -9, 10 -13, 11 -18" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="0.6"/>
  <path d="M15 -21 C14 -18, 15.5 -15, 14.5 -11" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="0.6"/>

  <!-- eyebrows -->
  <path d="M8 6.2 Q9.3 5.2 10.6 6.2" stroke="#17171F" stroke-width="0.8" fill="none" stroke-linecap="round"/>
  <path d="M13.4 6.2 Q14.7 5.2 16 6.2" stroke="#17171F" stroke-width="0.8" fill="none" stroke-linecap="round"/>

  <!-- eyes -->
  <circle cx="9.3" cy="8" r="1.1" fill="#17171F"/>
  <circle cx="14.7" cy="8" r="1.1" fill="#17171F"/>
  <circle cx="9.6" cy="7.6" r="0.3" fill="white"/>
  <circle cx="15" cy="7.6" r="0.3" fill="white"/>

  <!-- smile -->
  <path d="M9.5 12 Q12 13.6 14.5 12" stroke="#17171F" stroke-width="1" fill="none" stroke-linecap="round"/>

</g>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .flyer {
  position: fixed;
  z-index: 999;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.25s ease-in; /* reappear speed */
  will-change: left, top, opacity;
}
.flyer.fading {
  transition: opacity 1.1s ease-out; /* vanish speed, slower */
}
    .rig { transition: transform 0.12s linear; }
    .hover { animation: carpetHover 1.4s ease-in-out infinite; filter: drop-shadow(2px 5px 3px rgba(0,0,0,0.2)); }
    @keyframes carpetHover {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `]
})
export class AladdinFlyerComponent {
  pose = this.flight.pose;

  constructor(public flight: AladdinFlightService) {
    this.flight.update();
    this.flight.playEntrance();

    // On first paint the gate/section elements this depends on may not be
    // laid out yet (fonts/images still loading, especially on mobile where
    // this is slower), so the very first pose can be computed against stale
    // geometry and land a bit off-center. Recompute once layout settles.
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => this.flight.update(), { once: true });
      setTimeout(() => this.flight.update(), 0);
      setTimeout(() => this.flight.update(), 300);
      setTimeout(() => this.flight.update(), 1000);
    }
  }

  @HostListener('window:scroll')
onScroll() {
  this.flight.update();
  this.flight.onScrollTick();
}


  @HostListener('window:resize')
  onResize() {
    this.flight.update();
  }
}

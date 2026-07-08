import { Component } from '@angular/core';
import { HeavenHeaderComponent } from './heaven-header/heaven-header.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    HeavenHeaderComponent,
    HeroComponent
  ],
  template: `
    <section class="intro">
      <app-heaven-header></app-heaven-header>

      <div class="hero-connector"></div>

      <!-- fluffy cloud bank sitting right on the heaven/hero seam,
           so the two sections read as one continuous sky -->
      <div class="seam-clouds" aria-hidden="true">
        <svg class="seam-cloud sc-1" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.22"/>
        </svg>
        <svg class="seam-cloud sc-2" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.22"/>
        </svg>
        <svg class="seam-cloud sc-3" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.22"/>
        </svg>
        <svg class="seam-cloud sc-4" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.18"/>
        </svg>
        <svg class="seam-cloud sc-5" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.18"/>
        </svg>
      </div>

      <app-hero></app-hero>
    </section>
  `,
  styles: [`
    .intro {
      padding-bottom: 0;
      position: relative;
      overflow-x: hidden;
      overflow-y: visible;
      background: var(--sky-bg);
    }

    /*
      Magical beam coming from the gate.
      Adjust the height and width until it perfectly
      lines up with the gate opening.
    */
    .hero-connector {
      position: absolute;
      top: 260px;               /* Heaven height */
      left: 50%;
      transform: translateX(-50%) translateY(-100%);

      width: 100%;
      height: 220px;

      background: var(--sky-bg);

      clip-path: polygon(
        49% 0%,
        51% 0%,
        100% 100%,
        0% 100%
      );

      z-index: 1;
      pointer-events: none;
    }

    app-heaven-header {
      display: block;
      position: relative;
      z-index: 3;
    }

    app-hero {
      display: block;
      position: relative;
      z-index: 2;
      margin-top: -2px; /* remove seam */
      border-top: 2px solid black;
      border-width: thick;
    }

    /*
      Cloud bank over the heaven/hero seam.
      Centered on the boundary (260px = heaven height) so it straddles
      both sections and hides the hard edge between them, the same way
      the drifting clouds inside the heaven scene do.
    */
    .seam-clouds {
      position: absolute;
      top: 348px;
      left: 0;
      right: 7%;
      height: 150px;
      transform: translateY(-50%);
      z-index: 4;
      pointer-events: none;
      overflow: visible;
    }
    .seam-cloud {
      position: absolute;
      width: 220px;
      filter: drop-shadow(0 4px 0 rgba(0,0,0,0.05));
    }
    .sc-1 { top: 10px;  left: -6%;  width: 260px; animation: seamDriftRight 40s linear infinite; }
    .sc-2 { top: 55px;  left: 14%;  width: 190px; opacity: 0.9; animation: seamDriftLeft 32s linear infinite; }
    .sc-3 { top: 0px;   left: 38%;  width: 230px; animation: seamDriftRight 50s linear infinite -10s; }
    .sc-4 { top: 60px;  left: 62%;  width: 200px; opacity: 0.85; animation: seamDriftLeft 44s linear infinite -6s; }
    .sc-5 { top: 15px;  left: 84%;  width: 240px; animation: seamDriftRight 36s linear infinite -18s; }

    @keyframes seamDriftRight { from { transform: translateX(0); } to { transform: translateX(30px); } }
    @keyframes seamDriftLeft  { from { transform: translateX(0); } to { transform: translateX(-30px); } }

    @media (max-width: 640px) {
      .seam-clouds { top: 200px; height: 110px; }
      .seam-cloud { width: 160px; }
    }
  `]
})
export class IntroComponent {}
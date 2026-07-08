import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyAudioService } from '../../services/journey-audio.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-heaven-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="heaven" #heavenEl> 
      <!-- lightning flash layer -->
      <div class="flash" [class.strike]="flashing"></div>

      <!-- drifting cloud silhouettes, varied sizes -->
      <svg class="cloud cloud-a" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-b" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-c" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-d" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.2"/>
      </svg>
      <svg class="cloud cloud-e" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.2"/>
      </svg>

      <!-- birds crossing the heaven scene -->
      <svg class="bird bird-1" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <svg class="bird bird-2" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- archway gate, enlarged so it touches the top of the Heaven container -->
      <svg class="gate" style="margin-bottom: -82px; margin-top: 33px;" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="70" width="20" height="120" rx="4" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <rect x="130" y="70" width="20" height="120" rx="4" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <path d="M10 80 Q10 6 80 6 Q150 6 150 80" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <path d="M28 82 Q28 24 80 24 Q132 24 132 82 L132 190 L28 190 Z" fill="#8fd0ff"/>
        <path d="M28 82 Q28 24 80 24 Q132 24 132 82" fill="none" stroke="var(--line)" stroke-width="2"/>
      </svg>

      <!-- invisible anchor marking exactly where Aladdin starts, inside the gate opening -->
      <div id="aladdin-gate-anchor" style="position:absolute; top:200px; left:50%; width:1px; height:1px;"></div>

      <!-- top step of the staircase -->
      <div class="first-step">
        <svg viewBox="0 0 220 60" class="step-art" xmlns="http://www.w3.org/2000/svg">
        
        </svg>
      </div>

    
      
    </div>
  `,
  styles: [`
    .heaven {
    
      position: relative;
      height: 260px;
      background: linear-gradient(180deg, #eaf6ff 0%, #cfeaff 55%, var(--paper) 100%);
      overflow: hidden;
          border-top: 1px solid black;
    border-width: thick;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    }
    .flash {
      position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none;
    }
    .flash.strike { animation: strike 0.6s ease-out; }
    @keyframes strike {
      0% { opacity: 0; } 8% { opacity: 0.85; } 16% { opacity: 0.1; }
      22% { opacity: 0.6; } 30% { opacity: 0; } 100% { opacity: 0; }
    }
    .cloud { position: absolute; width: 180px; opacity: 0.9; filter: drop-shadow(0 4px 0 rgba(0,0,0,0.05)); }
    .cloud-a { top: 18px; left: -40px; animation: driftRight 34s linear infinite; }
    .cloud-b { top: 70px; right: -60px; width: 240px; opacity: 0.75; animation: driftLeft 46s linear infinite; }
    .cloud-c { top: 5px; left: 45%; width: 140px; opacity: 0.6; animation: driftRight 26s linear infinite; }
    .cloud-d { top: 40px; left: 20%; width: 100px; opacity: 0.5; animation: driftLeft 38s linear infinite; }
    .cloud-e { top: 60px; right: 20%; width: 120px; opacity: 0.5; animation: driftRight 32s linear infinite -4s; }

    .bird { position: absolute; width: 20px; z-index: 1; }
    .bird-1 { top: 40px; animation: birdFly 15s linear infinite; }
    .bird-2 { top: 90px; width: 14px; animation: birdFly 21s linear infinite -7s; }
    @keyframes driftRight { from { transform: translateX(0); } to { transform: translateX(60vw); } }
    @keyframes driftLeft { from { transform: translateX(0); } to { transform: translateX(-60vw); } }
    @media (max-width: 640px) {
      .heaven { height: 200px; }
      .cloud-b { width: 160px; }
      .gate { width: 160px; top: 10px}
      #aladdin-gate-anchor { top: 70px; }
    }
    .first-step { position: relative; width: 240px; z-index: 1; margin-top: 4px; }
    .step-art { width: 100%; display: block; }
    .heaven-tag {
      font-size: 12px; font-weight: 700; color: var(--ink-soft);
      font-family: 'Space Grotesk', sans-serif; margin: 6px 0 14px;
      letter-spacing: 0.2px;
    }
    
    @media (max-width: 640px) {
      .heaven { height: 200px; }
      .cloud-b { width: 160px; }
      .gate { width: 160px; top: 10px}
    }
  `]
})
export class HeavenHeaderComponent {
  flashing = false;

  // Aladdin himself now lives in <app-aladdin-flyer>, a single component
  // mounted once for the whole page and driven by one continuous
  // whole-document scroll value (see AladdinFlightService). That's what
  // keeps him from disappearing between sections or resetting to the top -
  // there is only ever one Aladdin and one progress number for the entire
  // page, instead of every section computing its own local one.

  constructor() {}

}

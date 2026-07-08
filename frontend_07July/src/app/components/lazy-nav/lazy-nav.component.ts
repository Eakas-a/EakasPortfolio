import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyAudioService } from '../../services/journey-audio.service';
import { walkScrollTo } from '../../shared/walk-scroll';
import { IconComponent } from '../../shared/icon.component';
import { AladdinFlightService } from 'src/app/services/aladdin-flight.service';

interface LazyTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-lazy-nav',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <aside class="lazy-bar" [class.collapsed]="collapsed">
      <button class="collapse-btn" (click)="collapsed = !collapsed" [title]="collapsed ? 'Open lazy bar' : 'Collapse'">
        <app-icon [name]="collapsed ? 'genie' : 'close'" [size]="collapsed ? 20 : 16"></app-icon>
      </button>
      <div class="lazy-body" *ngIf="!collapsed">
        <p class="lazy-title">Feeling lazy?<br/>Let Aladdin walk.</p>
        <button
          *ngFor="let tab of tabs"
          class="lazy-tab"
          [class.active]="active === tab.id"
          (click)="goTo(tab)"
        >
          <span class="tab-icon"><app-icon [name]="tab.icon" [size]="16"></app-icon></span>
          <span>{{ tab.label }}</span>
        </button>
        <button class="lazy-tab sound" (click)="audio.toggle()" [class.active]="audio.soundOn()">
          <span class="tab-icon"><app-icon [name]="audio.soundOn() ? 'volume-up' : 'volume-mute'" [size]="16"></app-icon></span>
          <span>Storm sfx</span>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .lazy-bar {
      position: fixed; top: 18px; right: 18px;
      z-index: 10000; display: flex; flex-direction: column; align-items: flex-start;
      gap: 8px; pointer-events: auto;
    }
   
    .collapse-btn {
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--purple); color: #fff; border: var(--bw) solid var(--line);
      box-shadow: var(--shadow-sm); cursor: pointer; font-size: 18px;
      display: flex;place-self: flex-end;align-items: center; justify-content: center;
      position: relative; z-index: 10001; pointer-events: auto;
    }
    .lazy-body {
      background: var(--surface); border: var(--bw) solid var(--line);
      border-radius: var(--radius); box-shadow: var(--shadow);
      padding: 12px; display: flex; flex-direction: column; gap: 6px;
      width: 168px; margin-top: 6px;
    }
    .lazy-title {
      font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700;
      color: var(--ink-soft); margin-bottom: 4px; line-height: 1.3;
    }
    .lazy-tab {
      display: flex; align-items: center; gap: 8px;
      background: var(--surface-alt); border: 1.5px solid var(--line);
      border-radius: 100px; padding: 8px 12px; cursor: pointer;
      font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 700;
      color: var(--ink); text-align: left; transition: transform 0.12s ease, background 0.15s ease;
    }
    .lazy-tab:hover { transform: translateX(3px); }
    .lazy-tab.active { background: var(--yellow); }
    .lazy-tab.sound.active { background: var(--green); }
    .tab-icon { font-size: 15px; }
    @media (max-width: 900px) {
      .lazy-bar { left: 10px; }
      .lazy-body { width: 148px; }
    }
  `]
})
export class LazyNavComponent implements OnInit {
  collapsed = true;
  active = 'home';
  tabs: LazyTab[] = [
    { id: 'home', label: 'Heaven', icon: 'castle' },
    { id: 'projects', label: 'Projects', icon: 'cloud' },
    { id: 'skills', label: 'Skills', icon: 'genie' },
    { id: 'experience', label: 'Experience', icon: 'lamp' },
    { id: 'contact', label: 'Contact', icon: 'crystal-ball' }
  ];

  constructor(public audio: JourneyAudioService, public flight: AladdinFlightService) {}

  ngOnInit() {
    if (window.innerWidth < 900) this.collapsed = true;
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll() {
    const mid = window.scrollY + window.innerHeight / 3;
    let current = this.tabs[0].id;
    for (const tab of this.tabs) {
      const el = document.getElementById(tab.id);
      if (el && el.offsetTop <= mid) current = tab.id;
    }
    this.active = current;
  }

  goTo(tab: LazyTab) {
    this.flight.beginNavigation();

    const el = document.getElementById(tab.id);
    if (el) {
      const dist = Math.abs(el.getBoundingClientRect().top);
      const duration = Math.min(3200, Math.max(900, dist * 1.1));
      walkScrollTo(tab.id, duration);
    }
    this.audio.chime();
    if (window.innerWidth < 900) this.collapsed = true;
  }
}

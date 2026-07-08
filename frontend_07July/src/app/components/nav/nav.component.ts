import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';
import { JourneyAudioService } from 'src/app/services/journey-audio.service';
import { IconComponent } from '../../shared/icon.component';
import { AladdinFlightService } from 'src/app/services/aladdin-flight.service';
import { walkScrollTo } from '../../shared/walk-scroll';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent, IconComponent],
  template: `
    <nav [class.scrolled]="scrolled">
      <div class="nav-inner">
        <a href="#" class="logo">
          <span class="logo-bracket">&lt;</span>EA<span class="logo-bracket">/&gt;</span>
        </a>
        <div class="nav-links" [class.open]="mobileMenuOpen">
          <a href="#projects" (click)="go($event, 'projects')">Projects</a>
          <a href="#skills" (click)="go($event, 'skills')">Skills</a>
          <a href="#experience" (click)="go($event, 'experience')">Experience</a>
          <a href="#contact" (click)="go($event, 'contact')">Contact</a>
        </div>

        <div class="nav-actions">
          <button class="sound-toggle" (click)="toggleSound()" [class.on]="audio.soundOn()">
            <app-icon [name]="audio.soundOn() ? 'volume-up' : 'volume-mute'" [size]="16"></app-icon>
          </button>

          <button class="sound-toggle music-toggle" (click)="audio.toggleMusic()" [class.on]="audio.musicOn()">
            <app-icon [name]="audio.musicOn() ? 'music-up' : 'music-mute'" [size]="16"></app-icon>
          </button>

          <button class="btn btn-primary resume-btn" (click)="downloadAndPreview()">
            View Resume
          </button>

          <button class="menu-toggle" (click)="mobileMenuOpen = !mobileMenuOpen" [attr.aria-expanded]="mobileMenuOpen" aria-label="Toggle menu">
            <app-icon [name]="mobileMenuOpen ? 'close' : 'menu'" [size]="18"></app-icon>
          </button>
        </div>

        <app-resume-preview
          [visible]="showResumePreview"
          [resumeUrl]="resumeUrl"
          (close)="closeResume()"
        ></app-resume-preview>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 12px 0;
      transition: all 0.25s ease;
    }
    nav.scrolled {
      padding: 12px 0;
      background: var(--paper);
      border-bottom: var(--bw) solid var(--line);
    }
    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      position: relative;
    }
      .sound-toggle {
      position: relative; z-index: 2;
      font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700;
      padding: 7px 12px; border-radius: 100px; cursor: pointer;
      background: var(--surface); border: var(--bw) solid var(--line);
      box-shadow: 3px 3px 0 var(--line);
    }
    .sound-toggle.on { background: var(--yellow); } 
    .music-toggle {}
    .logo {
      font-size: 20px;
      font-weight: 700;
      text-decoration: none;
      color: var(--ink);
      font-family: 'Space Grotesk', sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 4px 10px;
      background: var(--yellow);
      border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm);
      box-shadow: 3px 3px 0 var(--line);
      transform: rotate(-1.5deg);
    }
    .logo-bracket { color: var(--purple-deep); }
    .nav-links {
      display: flex;
      gap: 8px;
      background: var(--surface);
      border: var(--bw) solid var(--line);
      border-radius: 100px;
      padding: 6px;
      box-shadow: 3px 3px 0 var(--line);
    }
    .nav-links a {
      color: var(--ink);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
      padding: 8px 16px;
      border-radius: 100px;
      transition: background 0.2s;
      white-space: nowrap;
    }
    .nav-links a:hover { background: var(--surface-alt); }

    .nav-actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
    .resume-btn { padding: 8px 18px; font-size: 13px; }

    .menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 36px; height: 36px;
      background: var(--surface);
      border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm);
      box-shadow: 3px 3px 0 var(--line);
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .resume-btn { display: none; }
    }

    @media (max-width: 640px) {
      .nav-links {
        display: none;
        position: absolute;
        top: calc(100% + 10px);
        left: 16px;
        right: 16px;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        border-radius: var(--radius);
        padding: 12px;
      }
      .nav-links.open { display: flex; }
      .nav-links a { padding: 12px 16px; text-align: center; }
      .menu-toggle { display: flex; }
    }
  `]
})
export class NavComponent {

  constructor(public audio: JourneyAudioService, public flight: AladdinFlightService) {}
  scrolled = false;
  showResumePreview = false;
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';
  flashing = false;
  mobileMenuOpen = false;

  go(event: Event, targetId: string) {
    event.preventDefault();
    this.mobileMenuOpen = false;
    this.flight.beginNavigation();
    const el = document.getElementById(targetId);
    if (el) {
      const dist = Math.abs(el.getBoundingClientRect().top);
      const duration = Math.min(3200, Math.max(900, dist * 1.1));
      walkScrollTo(targetId, duration);
    }
  }

  toggleSound() {
    this.audio.toggle();
    if (this.audio.soundOn()) {
      setTimeout(() => this.strikeLightning(), 400);
    }
  }

  private strikeLightning() {
    this.flashing = true;
    this.audio.thunder();
    setTimeout(() => (this.flashing = false), 650);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}
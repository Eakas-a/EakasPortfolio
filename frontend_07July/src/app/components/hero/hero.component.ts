import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent, IconComponent],
  template: `
    <section id="home" class="hero" style="background-image: var(--sky-bg);">
      <svg class="doodle d-star" width="40" height="40" viewBox="0 0 24 24" style="top:14%; left:6%;"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="var(--yellow)" stroke="var(--line)" stroke-width="1.5"/></svg>
      <svg class="doodle d-blob" width="70" height="70" viewBox="0 0 100 100" style="top:6%; right:10%;"><path d="M20,40 Q10,10 45,12 Q80,8 88,40 Q95,70 60,85 Q30,95 15,70 Q5,55 20,40 Z" fill="var(--blue)" stroke="var(--line)" stroke-width="2.5"/></svg>
      <svg class="doodle d-scribble" width="60" height="30" viewBox="0 0 60 30" style="bottom:12%; left:4%;"><path d="M2 20 Q15 2 28 18 T58 12" fill="none" stroke="var(--coral)" stroke-width="3" stroke-linecap="round"/></svg>
      <div class="container">
        <div class="hero-content animate-in">
          <div class="availability-badge">
            <span class="dot"></span> Open to opportunities
          </div>
          <h1 class="hero-title">
            Hi, I'm <span class="gradient-text">Eakas Arora</span>
          </h1>
          <p class="hero-role">Full-Stack Developer · Spring Boot · Angular · Microservices · AI</p>
          <p class="hero-desc">
            3–4 years building scalable backend systems and enterprise platforms. 
            Led an automation framework adopted across 6+ BFSI projects internationally — 
            reducing manual testing by 78%.
          </p>
          <div class="hero-stack">
            <span class="badge" *ngFor="let t of topTech">{{ t }}</span>
          </div>
          <div class="hero-cta">
            <a href="#contact" class="btn btn-primary">Talk to my AI Agent <app-icon name="arrow-right" [size]="16"></app-icon></a>
            <a href="#projects" class="btn btn-ghost">View Projects</a>
            <button class="btn btn-ghost" (click)="downloadAndPreview()"><app-icon name="arrow-down" [size]="16"></app-icon> Resume</button>
          </div>
          <app-resume-preview
            [visible]="showResumePreview"
            [resumeUrl]="resumeUrl"
            (close)="closeResume()"
          ></app-resume-preview>
          <div class="hero-stats">
            <div class="stat" *ngFor="let s of stats; let i = index" [class]="'stat-c' + (i % 3)">
              <span class="stat-value">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-card">
            <div class="code-header">
              <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
              <span class="filename">eakas.config.ts</span>
            </div>
            <pre class="code-body"><code><span class="kw">const</span> <span class="var">eakas</span> <span class="op">=</span> &#123;
  <span class="key">role</span>: <span class="str">"Full-Stack Engineer"</span>,
  <span class="key">stack</span>: [
    <span class="str">"Spring Boot"</span>, <span class="str">"Angular"</span>,
    <span class="str">"Microservices"</span>, <span class="str">"Kafka"</span>,
    <span class="str">"Docker"</span>, <span class="str">"Kubernetes"</span>
  ],
  <span class="key">ai</span>: [<span class="str">"LangChain"</span>, <span class="str">"LLM APIs"</span>],
  <span class="key">impact</span>: <span class="str">"78% test reduction"</span>,
  <span class="key">available</span>: <span class="bool">true</span>
&#125;;</code></pre>
            <span class="tape"></span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 100px;
      position: relative;
      overflow: hidden;
    }
    .doodle.d-star { animation: wiggle 4s ease-in-out infinite; }
    .doodle.d-blob { animation: floaty 6s ease-in-out infinite; }
    .container { display: flex; gap: 60px; align-items: center; position: relative; z-index: 1; }
    .hero-content { flex: 1; }
    .hero-visual { flex: 1; display: flex; justify-content: center; }
    .availability-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 16px; border-radius: 100px;
      background: var(--green); color: var(--ink);
      border: var(--bw) solid var(--line);
      box-shadow: 3px 3px 0 var(--line);
      font-size: 13px; font-weight: 700; margin-bottom: 28px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--ink); animation: pulse-glow 1.6s infinite;
    }
    .hero-title {
      font-size: clamp(36px, 5vw, 64px);
      font-weight: 700; line-height: 1.1; margin-bottom: 14px;
      color: var(--ink);
    }
    .hero-role {
      font-size: 15px; color: var(--ink-soft); font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
      margin-bottom: 22px;
    }
    .hero-desc {
      font-size: 16px; color: var(--ink-soft); line-height: 1.7;
      max-width: 520px; margin-bottom: 28px; font-weight: 500;
    }
    .hero-stack { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
    .hero-cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 52px; }
    .hero-stats {
      display: flex; gap: 16px; flex-wrap: wrap;
    }
    .stat {
      display: flex; flex-direction: column; gap: 2px;
      padding: 14px 20px; border: var(--bw) solid var(--line);
      border-radius: var(--radius); box-shadow: 4px 4px 0 var(--line);
      background: var(--surface);
    }
    .stat-c0 { background: var(--yellow); }
    .stat-c1 { background: var(--blue); }
    .stat-c2 { background: var(--coral); }
    .stat-value { font-size: 26px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; color: var(--ink); }
    .stat-label { font-size: 11px; color: var(--ink); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    /* Code card */
    .code-card {
      background: #1E1E28; border: var(--bw) solid var(--line);
      border-radius: var(--radius-lg); overflow: hidden;
      min-width: 340px; box-shadow: var(--shadow-lg);
      position: relative; transform: rotate(1.2deg);
    }
    .code-header {
      padding: 14px 16px; background: var(--purple);
      border-bottom: var(--bw) solid var(--line);
      display: flex; align-items: center; gap: 6px;
    }
    .code-header .dot { animation: none; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffd54f; }
    .dot.green { background: #81c784; }
    .filename { margin-left: 8px; font-size: 12px; color: #fff; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
    .code-body { padding: 22px; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.75; color: #E4E4EE; }
    .kw { color: #FF8A65; }
    .var { color: #64B5F6; }
    .key { color: #FFD54F; }
    .str { color: #81C784; }
    .bool { color: #BA68C8; }
    .op { color: #9C9CB0; }
    .tape {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(-3deg);
      width: 70px; height: 24px; background: rgba(255,213,79,0.85);
      border: 1.5px solid var(--line);
    }
    @media (max-width: 900px) {
      .container { flex-direction: column; }
      .hero-visual { display: none; }
    }
  `]
})
export class HeroComponent {
  topTech = ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Microservices', 'Kafka', 'Docker', 'K8s', 'AWS'];
  stats = [
    { value: '3–4 yrs', label: 'Experience' },
    { value: '78%', label: 'Test reduction' },
    { value: '6+', label: 'Intl projects' }
  ];
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';
  showResumePreview = false;

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}

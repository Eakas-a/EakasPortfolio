import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="skills">
      <div class="container cloud-panel">
        <p class="section-label">// expertise</p>
        <h2 class="section-title">Skills</h2>
        <p class="section-subtitle">Click a skill axis to explore related projects and tools.</p>

        <div class="skills-layout">
          <!-- Radar Chart -->
          <div class="radar-wrapper fade-in-up">
            <canvas #radarCanvas width="380" height="380"></canvas>
            <div class="radar-legend">
              <div class="legend-item" *ngFor="let item of radarData" (click)="selectCategory(item.category)"
                   [class.active]="selectedCategory === item.category">
                <span class="legend-dot" [style.background]="item.color"></span>
                <span>{{ item.category }}</span>
                <span class="legend-val">{{ item.value }}%</span>
              </div>
            </div>
          </div>

          <!-- Skill Groups -->
          <div class="skill-groups">
            <div class="skill-group fade-in-up" *ngFor="let group of skillGroups" [class.highlighted]="selectedCategory === group.name">
              <div class="group-header">
                <span class="group-icon"><app-icon [name]="group.icon" [size]="18"></app-icon></span>
                <h4>{{ group.name }}</h4>
              </div>
              <div class="group-tags">
                <span class="badge" *ngFor="let skill of group.skills">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-label {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--purple-deep);
      font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .skills-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; min-width: 0; }
    .radar-wrapper {
      background: var(--surface); border: var(--bw) solid var(--line);
      border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 20px;
      min-width: 0; max-width: 100%; box-sizing: border-box;
    }
    .radar-wrapper canvas { display: block; margin: 0 auto; max-width: 100%; height: auto; }
    .radar-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
    .legend-item {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
      padding: 9px 14px; border-radius: var(--radius-sm); border: var(--bw) solid transparent;
      transition: all 0.15s; font-weight: 600;
    }
    .legend-item:hover, .legend-item.active { background: var(--surface-alt); border-color: var(--line); }
    .legend-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; border: 1.5px solid var(--line); }
    .legend-val { margin-left: auto; font-size: 12px; color: var(--ink-soft); font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
    .skill-groups { display: flex; flex-direction: column; gap: 18px; }
    .skill-group {
      padding: 18px 22px; border-radius: var(--radius);
      border: var(--bw) solid var(--line); background: var(--surface);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s;
    }
    .skill-group.highlighted { background: var(--yellow); transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--line); }
    .group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    .group-icon { font-size: 18px; }
    .group-header h4 { font-size: 15px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
    .group-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    @media (max-width: 900px) { .skills-layout { grid-template-columns: 1fr; } }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;
  selectedCategory: string | null = null;

  radarData = [
    { category: 'Frontend', value: 82, color: '#F5B400' },
    { category: 'Backend', value: 90, color: '#9B4CAC' },
    { category: 'DevOps', value: 75, color: '#2E93E6' },
    { category: 'AI/ML', value: 70, color: '#4C9A52' },
    { category: 'Databases', value: 80, color: '#F1613A' },
    { category: 'System Design', value: 85, color: '#17171F' }
  ];

  skillGroups = [
    { name: 'Frontend', icon: 'palette', skills: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'CSS3', 'Redux', 'Bootstrap', 'Tailwind'] },
    { name: 'Backend', icon: 'gear', skills: ['Spring Boot', 'Java', 'Node.js', 'REST APIs', 'Microservices', 'WebSockets', 'Kafka'] },
    { name: 'DevOps', icon: 'rocket', skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'CI/CD', 'Git'] },
    { name: 'AI/ML', icon: 'brain', skills: ['LangChain', 'LLM APIs', 'TensorFlow', 'PyTorch', 'LLM Inferencing'] },
    { name: 'Databases', icon: 'database', skills: ['MySQL', 'PostgreSQL', 'SQL'] },
    { name: 'System Design', icon: 'wrench', skills: ['OAuth2', 'JWT', 'OIDC', 'TDD', 'Distributed Systems', 'Event-Driven'] }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.drawRadar(), 100);
    this.initScrollObserver();
  }

  selectCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? null : cat;
  }

  drawRadar() {
    const canvas = this.radarCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const cx = 190, cy = 190, R = 150;
    const n = this.radarData.length;
    ctx.clearRect(0, 0, 380, 380);

    // Concentric rings
    for (let r = 1; r <= 5; r++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = cx + (R * r / 5) * Math.cos(angle);
        const y = cy + (R * r / 5) * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(23,23,31,0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(23,23,31,0.18)';
      ctx.stroke();

      // Labels
      const labelR = R + 22;
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);
      ctx.fillStyle = '#17171F';
      ctx.font = '700 11px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.radarData[i].category, lx, ly);
    }

    // Data polygon fill
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const v = this.radarData[i].value / 100;
      const x = cx + R * v * Math.cos(angle);
      const y = cy + R * v * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,213,79,0.55)';
    ctx.fill();
    ctx.strokeStyle = '#17171F';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const v = this.radarData[i].value / 100;
      const x = cx + R * v * Math.cos(angle);
      const y = cy + R * v * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = this.radarData[i].color;
      ctx.fill();
      ctx.strokeStyle = '#17171F';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  initScrollObserver() {
    setTimeout(() => {
      const els = document.querySelectorAll('#skills .fade-in-up');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
    }, 200);
  }
}

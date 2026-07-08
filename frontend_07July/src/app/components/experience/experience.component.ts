import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiControllerService } from '../../services/portfolio.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="experience">
    <!-- e.g. inside projects.component.ts, right where the circle/cloud sits -->
<div id="settle-experience" class="aladdin-settle"></div>
      <div class="container cloud-panel">
        <p class="section-label">// career</p>
        <h2 class="section-title">Experience</h2>
        <p class="section-subtitle">Building things that matter, with measurable outcomes.</p>

        <!-- Tab Toggle -->
        <div class="tabs">
          <button class="tab" [class.active]="activeTab() === 'work'" (click)="activeTab.set('work')">
            <app-icon name="briefcase" [size]="16"></app-icon> Work Experience
          </button>
          <button class="tab" [class.active]="activeTab() === 'education'" (click)="activeTab.set('education')">
            <app-icon name="graduation-cap" [size]="16"></app-icon> Education
          </button>
          <button class="tab" [class.active]="activeTab() === 'leadership'" (click)="activeTab.set('leadership')">
            <app-icon name="trophy" [size]="16"></app-icon> Leadership
          </button>
        </div>

        <!-- Timeline -->
        <div class="timeline">
          <ng-container *ngIf="activeTab() === 'work'">
            <div class="timeline-item slide-in" *ngFor="let exp of workExp; let i = index" [style.animation-delay]="i * 0.15 + 's'">
              <div class="timeline-connector">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo">{{ exp.logoPlaceholder }}</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">{{ exp.role }}</h3>
                    <div class="exp-company">{{ exp.company }}</div>
                    <div class="exp-period">{{ exp.period }}</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li *ngFor="let b of exp.bullets">{{ b }}</li>
                </ul>
                <div class="achievements-banner">
                  <span *ngFor="let a of exp.ach"><app-icon [name]="a.icon" [size]="14"></app-icon> {{ a.text }}</span>
                  
                </div>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="activeTab() === 'education'">
            <div class="timeline-item slide-in" *ngFor="let ed of education; let i = index" [style.animation-delay]="i * 0.15 + 's'">
              <div class="timeline-connector">
                <div class="timeline-dot" style="background: var(--green)"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo" style="background:var(--green);color:var(--ink)">{{ ed.logoPlaceholder }}</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">{{ ed.role }}</h3>
                    <div class="exp-company">{{ ed.company }}</div>
                    <div class="exp-period">{{ ed.period }}</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li *ngFor="let b of ed.bullets">{{ b }}</li>
                </ul>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="activeTab() === 'leadership'">
            <div class="timeline-item slide-in">
              <div class="timeline-connector">
                <div class="timeline-dot" style="background: var(--coral)"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo" style="background:var(--coral);color:var(--ink)">SRC</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">Creative & Technical Systems Head</h3>
                    <div class="exp-company">Students' Representative Council</div>
                    <div class="exp-period">Jun 2022 – Jan 2024</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li>Taught Web Development, database fundamentals, and debugging to students through interactive lessons, mentoring 50+ peers.</li>
                  <li>Managed team of 4+ developers, driving feature development and conducting technical training sessions.</li>
                  <li>Fostered collaborative learning environment for test automation and problem-solving skills.</li>
                </ul>
                <div class="achievements-banner">
                  <span><app-icon name="trophy" [size]="14"></app-icon> 78% testing reduction</span>
                  <span><app-icon name="chart" [size]="14"></app-icon> 6+ intl BFSI projects</span>
                  <span><app-icon name="users" [size]="14"></app-icon> 20+ platform users</span>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-label {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--purple-deep);
      font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .tabs { display: flex; gap: 10px; margin-bottom: 52px; flex-wrap: wrap; }
    .tab {
      padding: 11px 24px; border-radius: 100px; border: var(--bw) solid var(--line);
      background: var(--surface); color: var(--ink); cursor: pointer; font-size: 14px;
      font-weight: 700; font-family: 'Space Grotesk', sans-serif; transition: all 0.15s;
      box-shadow: 3px 3px 0 var(--line);
    }
    .tab.active { background: var(--blue); }
    .tab:hover { transform: translate(-1px,-1px); }
    .timeline { display: flex; flex-direction: column; gap: 0; }
    .timeline-item { display: flex; gap: 20px; }
    .timeline-connector { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 24px; }
    .timeline-dot {
      width: 18px; height: 18px; border-radius: 50%; background: var(--purple);
      border: var(--bw) solid var(--line);
      z-index: 1; flex-shrink: 0; margin-top: 22px;
    }
    .timeline-line { flex: 1; width: 3px; background: var(--line); margin: 4px 0; opacity: 0.2; }
    .timeline-card { flex: 1; padding: 26px; margin-bottom: 28px; }
    .exp-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 18px; }
    .exp-logo {
      width: 52px; height: 52px; border-radius: var(--radius-sm); flex-shrink: 0;
      background: var(--yellow); color: var(--ink);
      border: var(--bw) solid var(--line); box-shadow: 3px 3px 0 var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;
      text-align: center; padding: 4px;
    }
    .exp-role { font-size: 18px; font-weight: 700; margin-bottom: 3px; font-family: 'Space Grotesk', sans-serif; }
    .exp-company { font-size: 14px; color: var(--purple-deep); font-weight: 700; margin-bottom: 2px; }
    .exp-period { font-size: 12px; color: var(--ink-soft); font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .exp-bullets { padding-left: 18px; display: flex; flex-direction: column; gap: 9px; }
    .exp-bullets li { font-size: 14px; color: var(--ink-soft); line-height: 1.6; font-weight: 500; }
    .achievements-banner {
      margin-top: 18px; padding: 14px 18px; border-radius: var(--radius-sm);
      background: var(--yellow); border: var(--bw) solid var(--line);
      display: flex; gap: 20px; flex-wrap: wrap;
    }
    .achievements-banner span { font-size: 13px; color: var(--ink); font-weight: 700; font-family: 'Space Grotesk', sans-serif; display: inline-flex; align-items: center; gap: 6px; }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .slide-in { animation: slideIn 0.5s ease forwards; opacity: 0; }
  `]
})
export class ExperienceComponent implements OnInit {
  activeTab = signal<'work' | 'education' | 'leadership'>('work');
  workExp: any[] = [];
  education: any[] = [];

  constructor(private apiControllerService: ApiControllerService) {}

  ngOnInit() {
    this.apiControllerService.getExperience().subscribe(data => {
      this.workExp = data.filter((e: any) => e.type === 'work');
      this.education = data.filter((e: any) => e.type === 'education');
    });
  }
}

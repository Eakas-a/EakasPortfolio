import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiControllerService } from '../../services/portfolio.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="projects" style="z-index:1 !important;">
      <div
  class="container cloud-panel"
  
>
        <p class="section-label">// portfolio</p>
        <h2 class="section-title">Projects</h2>
        <p class="section-subtitle">Systems I've designed, built, and shipped — with measurable impact.</p>

        <!-- Filters -->
        <div class="filters">
          <button *ngFor="let f of filters" class="filter-btn" [class.active]="activeFilter() === f" (click)="setFilter(f)">
            {{ f }}
          </button>
        </div>

        <!-- Project Cards -->
        <div class="projects-grid">
          <div
            *ngFor="let project of filteredProjects(); let i = index"
            class="project-card card fade-in-up"
            [attr.data-accent]="i % 4"
            [class.expanded]="expandedId() === project.id"
            (click)="toggleExpand(project.id)"
          >
            <!-- Card Header -->
            <div class="card-header">
              <div class="card-title-row">
                <h3 class="card-title">{{ project.name }}</h3>
                <div class="card-badges">
                  <span class="badge ai" *ngIf="project.hasAI"><app-icon name="brain" [size]="14"></app-icon> AI Layer</span>
                </div>
              </div>
              <p class="card-desc">{{ project.shortDesc }}</p>
              <div class="stack-pills">
                <span class="badge" *ngFor="let tech of project.stack.slice(0, 5)">{{ tech }}</span>
                <span class="badge more" *ngIf="project.stack.length > 5">+{{ project.stack.length - 5 }}</span>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="card-actions" (click)="$event.stopPropagation()">
              <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" class="btn btn-primary" style="font-size:12px;padding:7px 14px">
                <app-icon name="arrow-up-right" [size]="14"></app-icon> Live Demo
              </a>
              <a [href]="project.githubUrl" target="_blank" class="btn btn-ghost" style="font-size:12px;padding:7px 14px">
                GitHub
              </a>
              <span class="expand-hint">
                <app-icon [name]="expandedId() === project.id ? 'chevron-up' : 'chevron-down'" [size]="12"></app-icon>
                {{ expandedId() === project.id ? 'Less' : 'More' }}
              </span>
            </div>

            <!-- Expanded Details -->
            <div class="card-expanded" *ngIf="expandedId() === project.id">
              <div class="expanded-section">
                <h4>About</h4>
                <p>{{ project.longDesc }}</p>
              </div>
              <div class="expanded-section">
                <h4>Architecture</h4>
                <div class="arch-diagram">
                  <ng-container *ngIf="project.architecture === 'microservices'">
                    <svg viewBox="0 0 480 120" xmlns="http://www.w3.org/2000/svg" class="arch-svg">
                      <rect x="10" y="40" width="80" height="40" rx="8" fill="#FFD54F" stroke="#17171F" stroke-width="2"/>
                      <text x="50" y="65" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">Angular UI</text>
                      <line x1="90" y1="60" x2="130" y2="60" stroke="#17171F" stroke-width="2" marker-end="url(#arr)"/>
                      <rect x="130" y="40" width="80" height="40" rx="8" fill="#64B5F6" stroke="#17171F" stroke-width="2"/>
                      <text x="170" y="65" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">API Gateway</text>
                      <line x1="210" y1="60" x2="250" y2="60" stroke="#17171F" stroke-width="2" marker-end="url(#arr)"/>
                      <rect x="250" y="10" width="80" height="35" rx="8" fill="#81C784" stroke="#17171F" stroke-width="2"/>
                      <text x="290" y="32" text-anchor="middle" fill="#17171F" font-size="10" font-weight="700" font-family="JetBrains Mono">Auth svc</text>
                      <rect x="250" y="55" width="80" height="35" rx="8" fill="#81C784" stroke="#17171F" stroke-width="2"/>
                      <text x="290" y="77" text-anchor="middle" fill="#17171F" font-size="10" font-weight="700" font-family="JetBrains Mono">Test svc</text>
                      <rect x="250" y="100" width="80" height="12" rx="4" fill="#BA68C8" stroke="#17171F" stroke-width="1.5"/>
                      <text x="290" y="109" text-anchor="middle" fill="#17171F" font-size="9" font-weight="700" font-family="JetBrains Mono">Kafka</text>
                      <line x1="330" y1="60" x2="370" y2="60" stroke="#17171F" stroke-width="2" marker-end="url(#arr)"/>
                      <rect x="370" y="40" width="80" height="40" rx="8" fill="#FF8A65" stroke="#17171F" stroke-width="2"/>
                      <text x="410" y="65" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">MySQL</text>
                      <defs>
                        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill="#17171F"/>
                        </marker>
                      </defs>
                    </svg>
                  </ng-container>
                  <ng-container *ngIf="project.architecture !== 'microservices'">
                    <svg viewBox="0 0 480 80" xmlns="http://www.w3.org/2000/svg" class="arch-svg">
                      <rect x="10" y="20" width="100" height="40" rx="8" fill="#FFD54F" stroke="#17171F" stroke-width="2"/>
                      <text x="60" y="45" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">Angular + Mapbox</text>
                      <line x1="110" y1="40" x2="170" y2="40" stroke="#17171F" stroke-width="2" marker-end="url(#arr2)"/>
                      <rect x="170" y="20" width="100" height="40" rx="8" fill="#81C784" stroke="#17171F" stroke-width="2"/>
                      <text x="220" y="45" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">Spring Boot</text>
                      <line x1="270" y1="40" x2="330" y2="40" stroke="#17171F" stroke-width="2" marker-end="url(#arr2)"/>
                      <rect x="330" y="20" width="100" height="40" rx="8" fill="#64B5F6" stroke="#17171F" stroke-width="2"/>
                      <text x="380" y="45" text-anchor="middle" fill="#17171F" font-size="11" font-weight="700" font-family="JetBrains Mono">MySQL</text>
                      <defs>
                        <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill="#17171F"/>
                        </marker>
                      </defs>
                    </svg>
                  </ng-container>
                </div>
              </div>
              <div class="expanded-section">
                <h4>Impact</h4>
                <div class="impact-grid">
                  <div class="impact-item" *ngFor="let item of getImpactItems(project.impact)">
                    <span class="impact-icon"><app-icon name="arrow-right" [size]="14"></app-icon></span>{{ item }}
                  </div>
                </div>
              </div>
              <div class="expanded-section" *ngIf="project.hasAI">
                <h4><app-icon name="brain" [size]="14"></app-icon> AI Integration</h4>
                <p style="font-size:13px;color:var(--text-muted)">
                  This project integrates AI-powered workflows via Apache Kafka for async LLM-based orchestration within the microservices ecosystem.
                </p>
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
    .filters { display: flex; gap: 10px; margin-bottom: 44px; flex-wrap: wrap; }
    .filter-btn {
      padding: 9px 22px; border-radius: 100px; border: var(--bw) solid var(--line);
      background: var(--surface); color: var(--ink); cursor: pointer; font-size: 13px;
      font-weight: 700; font-family: 'Space Grotesk', sans-serif;
      transition: all 0.15s; box-shadow: 3px 3px 0 var(--line);
    }
    .filter-btn.active { background: var(--yellow); }
    .filter-btn:hover { transform: translate(-1px,-1px); }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 28px; }
    .project-card {
      padding: 26px; cursor: pointer; position: relative;
      border-top: 8px solid var(--line);
    }
    .project-card[data-accent="0"] { border-top-color: var(--yellow); }
    .project-card[data-accent="1"] { border-top-color: var(--blue); }
    .project-card[data-accent="2"] { border-top-color: var(--coral); }
    .project-card[data-accent="3"] { border-top-color: var(--purple); }
    .project-card.expanded { grid-column: 1 / -1; cursor: default; }
    .card-header { margin-bottom: 16px; }
    .card-title-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; gap: 12px; }
    .card-title { font-size: 19px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
    .card-desc { color: var(--ink-soft); font-size: 14px; margin-bottom: 16px; line-height: 1.5; font-weight: 500; }
    .stack-pills { display: flex; flex-wrap: wrap; gap: 8px; }
    .badge.more { background: var(--surface-alt); }
    .card-actions { display: flex; align-items: center; gap: 10px; padding-top: 18px; border-top: var(--bw) dashed var(--line-soft); }
    .expand-hint { margin-left: auto; font-size: 12px; font-weight: 700; color: var(--ink-soft); font-family: 'Space Grotesk', sans-serif; }
    .card-expanded {
      margin-top: 24px; padding-top: 24px; border-top: var(--bw) dashed var(--line-soft);
      display: flex; flex-direction: column; gap: 24px;
      animation: fadeInUp 0.3s ease;
    }
    .expanded-section h4 {
      font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;
      color: var(--purple-deep); margin-bottom: 10px; font-family: 'Space Grotesk', sans-serif;
    }
    .expanded-section p { font-size: 14px; color: var(--ink-soft); line-height: 1.7; font-weight: 500; }
    .arch-svg { width: 100%; border-radius: var(--radius); background: var(--surface-alt); border: var(--bw) solid var(--line); padding: 12px; }
    .impact-grid { display: flex; flex-direction: column; gap: 8px; }
    .impact-item { font-size: 14px; color: var(--ink-soft); display: flex; gap: 8px; font-weight: 600; }
    .impact-icon { color: var(--green-deep); font-weight: 700; flex-shrink: 0; }
    @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }
  `]
})
export class ProjectsComponent implements OnInit {
  filters = ['All', 'Fullstack', 'AI/ML'];
  activeFilter = signal('All');
  projects = signal<any[]>([]);
  expandedId = signal<number | null>(null);

  filteredProjects = computed(() => {
    const f = this.activeFilter();
    const all = this.projects();
    if (f === 'All') return all;
    return all.filter((p: any) => p.category.includes(f));
  });

  constructor(private apiControllerService: ApiControllerService) {}

  ngOnInit() {
    this.apiControllerService.getProjects().subscribe(p => {
      this.projects.set(p);
      setTimeout(() => this.initScrollObserver(), 100);
    });
  }

  setFilter(f: string) { this.activeFilter.set(f); }

  toggleExpand(id: number) {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  getImpactItems(impact: any): string[] {
    return Object.values(impact);
  }

  initScrollObserver() {
    const els = document.querySelectorAll('.fade-in-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }
}

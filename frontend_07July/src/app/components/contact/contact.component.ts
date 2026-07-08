import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent, IconComponent],
  template: `
    <section id="contact">
      <div class="container cloud-panel">
        <p class="section-label">// reach out</p>
        <h2 class="section-title">Contact Eakas</h2>
        <p class="section-subtitle">Three ways to connect — pick whatever works best for you.</p>

        <div class="contact-grid">
          <!-- Option 1: AI Agent -->
          <div class="contact-card card primary-card">
            <div class="contact-icon"><app-icon name="robot" [size]="26"></app-icon></div>
            <h3>Talk to the AI Agent</h3>
            <p>Ask anything about Eakas or share a job opportunity. The agent collects role details and notifies Eakas instantly.</p>
            <button class="btn btn-primary" (click)="openChat()">Open AI Agent <app-icon name="arrow-right" [size]="14"></app-icon></button>
            <div class="card-tag">Responds in seconds</div>
          </div>

          <!-- Option 2: Resume Download -->
          <div class="contact-card card">
            <div class="contact-icon"><app-icon name="document" [size]="26"></app-icon></div>
            <h3>Download Resume</h3>
            <p>Get Eakas's full resume as a PDF — includes all projects, experience, and skills in recruiter-friendly format.</p>
            <button class="btn btn-ghost" (click)="downloadAndPreview()"><app-icon name="arrow-down" [size]="14"></app-icon> Download PDF</button>
            <div class="card-tag">Updated 2024</div>
          </div>

          <!-- Option 3: Book a Call -->
          <div class="contact-card card">
            <div class="contact-icon"><app-icon name="calendar" [size]="26"></app-icon></div>
            <h3>Book a 15-min Call</h3>
            <p>Schedule a quick intro call directly in Eakas's calendar. No back-and-forth emails needed.</p>
            <a href="https://calendly.com/eakas000" target="_blank" class="btn btn-ghost">Schedule on Calendly <app-icon name="arrow-right" [size]="14"></app-icon></a>
            <div class="card-tag">Usually available within 2 days</div>
          </div>
        </div>
        <svg class="doodle d-heart" width="34" height="34" viewBox="0 0 24 24" style="top:-10px; right:8%;"><path d="M12 21s-8-5.2-8-11.6C4 5.6 7 3 10 3c1.6 0 3 1 4 2.3C15 4 16.4 3 18 3c3 0 5 2.6 5 6.4C23 15.8 12 21 12 21Z" fill="var(--coral)" stroke="var(--line)" stroke-width="1.5"/></svg>

        <app-resume-preview
          [visible]="showResumePreview"
          [resumeUrl]="resumeUrl"
          (close)="closeResume()"
        ></app-resume-preview>

        <!-- Direct contact info -->
        <div class="direct-contact">
          <div class="contact-item">
            <span class="ci-icon"><app-icon name="mail" [size]="18"></app-icon></span>
           <a href="mailto:eakas000&#64;gmail.com">eakas000&#64;gmail.com</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon"><app-icon name="phone" [size]="18"></app-icon></span>
            <a href="tel:+919767438298">+91 9767 438 298</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon"><app-icon name="briefcase" [size]="18"></app-icon></span>
            <a href="https://linkedin.com/in/eakas" target="_blank">linkedin.com/in/eakas</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon"><app-icon name="map-pin" [size]="18"></app-icon></span>
            <span>Hyderabad · Pune · Mumbai · Gurgaon · Bangalore</span>
          </div>
        </div>

        <div class="response-time">
          <span class="rt-dot"></span>
          Expected response time: <strong>within 24 hours</strong>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>Built with <app-icon name="heart" [size]="14"></app-icon> using <strong>Angular</strong></p>
      <p style="margin-top:6px;font-size:12px;color:var(--text-dim)">© 2026 Eakas Arora</p>
    </footer>
  `,
  styles: [`
    .section-label {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--purple-deep);
      font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; margin-bottom: 52px; }
    .contact-card {
      padding: 32px; display: flex; flex-direction: column; gap: 14px;
      position: relative; overflow: hidden;
    }
    .primary-card { background: var(--yellow); }
    .contact-icon {
      font-size: 30px; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center;
      background: var(--surface); border: var(--bw) solid var(--line); border-radius: var(--radius-sm);
      box-shadow: 3px 3px 0 var(--line);
    }
    .primary-card .contact-icon { background: var(--surface); }
    .contact-card h3 { font-size: 20px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
    .contact-card p { font-size: 14px; color: var(--ink-soft); line-height: 1.6; flex: 1; font-weight: 500; }
    .card-tag {
      font-size: 11px; color: var(--ink); font-weight: 700; font-family: 'Space Grotesk', sans-serif;
      padding-top: 14px; border-top: var(--bw) dashed var(--line-soft);
    }
    .direct-contact {
      display: flex; flex-wrap: wrap; gap: 24px;
      padding: 26px 30px; border-radius: var(--radius-lg);
      background: var(--surface); border: var(--bw) solid var(--line); box-shadow: var(--shadow);
      margin-bottom: 28px;
    }
    .contact-item { display: flex; align-items: center; gap: 10px; }
    .ci-icon { font-size: 18px; }
    .contact-item a, .contact-item span { font-size: 14px; color: var(--ink-soft); font-weight: 600; text-decoration: none; }
    .contact-item a:hover { color: var(--purple-deep); }
    .response-time {
      display: flex; align-items: center; gap: 10px;
      font-size: 14px; color: var(--ink-soft); font-weight: 600;
    }
    .rt-dot {
      width: 10px; height: 10px; border-radius: 50%; background: var(--green-deep);
      border: 1.5px solid var(--line);
      animation: pulse-glow 1.6s infinite; flex-shrink: 0;
    }
    footer {
      text-align: center; padding: 44px 24px;
      border-top: var(--bw) solid var(--line);
      font-size: 14px; color: var(--ink-soft); font-weight: 500;
    }
    @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  `]
})
export class ContactComponent {
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';
  showResumePreview = false;

  openChat() {
    // Signal to chat agent to open
    const btn = document.querySelector('.chat-fab') as HTMLElement;
    btn?.click();
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
  }

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}

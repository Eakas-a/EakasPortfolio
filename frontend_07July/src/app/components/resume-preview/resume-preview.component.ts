import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="resume-preview-backdrop" *ngIf="visible">
      <div class="resume-preview-card">
        <button class="close-btn" type="button" (click)="close.emit()"><app-icon name="close" [size]="16"></app-icon></button>
        <div class="resume-preview-content">
          <iframe [src]="safeResumeUrl" title="Resume preview"></iframe>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .resume-preview-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(23, 23, 31, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        z-index: 1000;
      }
      .resume-preview-card {
        position: relative;
        width: min(1120px, 100%);
        height: min(85vh, 820px);
        background: var(--surface);
        border: var(--bw) solid var(--line);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
      }
      .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        border: var(--bw) solid var(--line);
        border-radius: 50%;
        background: var(--yellow);
        color: var(--ink);
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 3px 3px 0 var(--line);
        transition: transform 0.15s ease;
        z-index: 1;
      }
      .close-btn:hover {
        transform: translate(-1px, -1px);
      }
      .resume-preview-content {
        width: 100%;
        height: 100%;
      }
      .resume-preview-content iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `
  ]
})
export class ResumePreviewComponent {

  @Input() visible = false;
  @Input() resumeUrl!: string;

  safeResumeUrl!: SafeResourceUrl;

  @Output() close = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.resumeUrl) {
      this.safeResumeUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl);
    }
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChatMessage } from '../../services/portfolio.service';
import { ChatEngineService } from '../../services/chat-engine.service';
import { ResendEmailService } from '../../services/resend-email.service';
import { IconComponent } from '../../shared/icon.component';

interface JobFormData {
  companyName: string;
  role: string;
  requiredStack: string;
  teamSize: string;
  remotePreference: string;
  region: string;
  ctcRange: string;
}

const INITIAL_GREETING: ChatMessage = {
  role: 'assistant',
  content: "Hello! I am Genie-Eakas' AI agent"
};

@Component({
  selector: 'app-chat-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <button class="chat-fab" (click)="toggleChat()" [class.has-notification]="hasNotification">
      <app-icon *ngIf="!isOpen" name="genie" [size]="28"></app-icon>
      <app-icon *ngIf="isOpen" name="close" [size]="22"></app-icon>
    </button>

    <div class="chat-window" [class.open]="isOpen">
      <div class="chat-header">
        <div class="agent-info">
          <div class="agent-avatar"><app-icon name="genie" [size]="20"></app-icon></div>
          <div>
            <div class="agent-name">Eakas's Genie</div>
            <div class="agent-status"><span class="status-dot"></span> Freed from the lamp — online</div>
          </div>
        </div>
        <button class="close-btn" (click)="toggleChat()"><app-icon name="close" [size]="14"></app-icon></button>
      </div>

      <div class="chat-messages" #messagesContainer>
        <div *ngFor="let msg of messages()" class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
          <div *ngIf="msg.role === 'assistant'" class="msg-avatar"><app-icon name="genie" [size]="15"></app-icon></div>
          <div class="msg-bubble" [innerHTML]="formatMessage(msg.content)"></div>
        </div>
        <div *ngIf="loading()" class="message assistant">
          <div class="msg-avatar"><app-icon name="genie" [size]="15"></app-icon></div>
          <div class="msg-bubble typing"><span></span><span></span><span></span></div>
        </div>
        <div *ngIf="sendConfirmed()" class="confirmation-card">
          <div class="confirm-icon"><app-icon name="check" [size]="20"></app-icon></div>
          <p>{{ confirmationText() }}</p>
        </div>
      </div>

      <!-- Job opportunity form -->
      <div class="inline-form" *ngIf="jobFormOpen()">
        <p class="form-title">Quick job details — fill in and send:</p>
        <input class="form-input" [(ngModel)]="jobForm.companyName" placeholder="Company name" />
        <input class="form-input" [(ngModel)]="jobForm.role" placeholder="Role / designation" />
        <input class="form-input" [(ngModel)]="jobForm.requiredStack" placeholder="Tech stack" />
        <input class="form-input" [(ngModel)]="jobForm.teamSize" placeholder="Team size" />
        <input class="form-input" [(ngModel)]="jobForm.remotePreference" placeholder="Remote / hybrid / onsite" />
        <input class="form-input" [(ngModel)]="jobForm.region" placeholder="Region / location" />
        <input class="form-input" [(ngModel)]="jobForm.ctcRange" placeholder="Your email" />
        <div class="form-actions">
          <button class="form-cancel" (click)="closeForms()">Cancel</button>
          <button class="form-submit" (click)="submitJobForm()" [disabled]="sending()">
            {{ sending() ? 'Sending...' : 'Send to Eakas' }}
          </button>
        </div>
      </div>

      <!-- Plain message form -->
      <div class="inline-form" *ngIf="messageFormOpen()">
        <p class="form-title">Write a quick message to Eakas:</p>
        <textarea class="form-textarea" [(ngModel)]="plainMessage" placeholder="Your message..." rows="4"></textarea>
        <div class="form-actions">
          <button class="form-cancel" (click)="closeForms()">Cancel</button>
          <button class="form-submit" (click)="submitPlainMessage()" [disabled]="sending() || !plainMessage.trim()">
            {{ sending() ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </div>

      <!-- Starter suggestions: only shown before the conversation gets going -->
      <div class="quick-actions" *ngIf="messages().length <= 1 && !jobFormOpen() && !messageFormOpen()">
        <button class="quick-btn" (click)="sendQuick('What stack does Eakas use?')">What stack does Eakas use?</button>
        <button class="quick-btn" (click)="sendQuick('Tell me about his projects')">Tell me about his projects</button>
        <button class="quick-btn" (click)="sendQuick('Is he available?')">Is he available?</button>
      </div>

      <!-- Persistent actions: always available, any point in the conversation -->
      <div class="quick-actions persistent" *ngIf="!jobFormOpen() && !messageFormOpen()">
        <button class="quick-btn job-btn" (click)="openJobForm()">💼 I have a job opportunity</button>
        <button class="quick-btn" (click)="openMessageForm()">✉️ Just send a message</button>
        <button class="quick-btn reset-btn" (click)="resetChat()">🔄 Start over</button>
      </div>

      <div class="chat-input-area" *ngIf="!jobFormOpen() && !messageFormOpen()">
        <input
          [(ngModel)]="inputText"
          (keydown.enter)="send()"
          placeholder="Make a wish — ask about Eakas..."
          [disabled]="loading()"
          class="chat-input"
        />
        <button class="send-btn" (click)="send()" [disabled]="!inputText.trim() || loading()"><app-icon name="arrow-right" [size]="16"></app-icon></button>
      </div>
    </div>
  `,
  styles: [`
    .chat-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 62px; height: 62px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ffe9a8, var(--yellow) 60%, var(--purple) 140%);
      border: var(--bw) solid var(--line); cursor: pointer; font-size: 26px;
      box-shadow: var(--shadow), 0 0 0 6px rgba(186,104,200,0.18);
      transition: all 0.15s ease;
      display: flex; align-items: center; justify-content: center;
      animation: genieGlow 2.4s ease-in-out infinite;
    }
    @keyframes genieGlow {
      0%, 100% { box-shadow: var(--shadow), 0 0 0 6px rgba(186,104,200,0.18); }
      50% { box-shadow: var(--shadow), 0 0 0 10px rgba(186,104,200,0.32); }
    }
    .chat-fab:hover { transform: translate(-2px,-2px); box-shadow: 9px 9px 0 var(--line); }
    .chat-fab.has-notification::after {
      content: ''; position: absolute; top: 2px; right: 2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--coral); border: 2px solid var(--line);
    }
    .chat-window {
      position: fixed; bottom: 104px; right: 28px; z-index: 9998;
      width: 380px; max-height: 620px;
      background: var(--surface); border: var(--bw) solid var(--line);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);
      display: flex; flex-direction: column;
      transform: scale(0.85) translateY(20px); opacity: 0;
      pointer-events: none; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .chat-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
    .chat-header {
      padding: 16px 20px; border-bottom: var(--bw) solid var(--line);
      display: flex; align-items: center; justify-content: space-between;
      background: var(--purple); border-radius: 23px 23px 0 0;
    }
    .agent-info { display: flex; align-items: center; gap: 12px; }
    .agent-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--yellow); border: var(--bw) solid var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: var(--ink); font-family: 'Space Grotesk', sans-serif;
    }
    .agent-name { font-weight: 700; font-size: 14px; color: #fff; font-family: 'Space Grotesk', sans-serif; }
    .agent-status { font-size: 11px; color: #fff; opacity: 0.9; display: flex; align-items: center; gap: 4px; font-weight: 600; }
    .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); border: 1px solid var(--line); animation: pulse-glow 1.6s infinite; }
    .close-btn { background: var(--surface); border: 1.5px solid var(--line); border-radius: 50%; width: 26px; height: 26px; color: var(--ink); cursor: pointer; font-size: 13px; }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      max-height: 300px; background: var(--paper);
    }
    .message { display: flex; gap: 8px; align-items: flex-end; }
    .message.user { flex-direction: row-reverse; }
    .msg-avatar {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: var(--yellow); border: 1.5px solid var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: var(--ink); font-family: 'Space Grotesk', sans-serif;
    }
    .msg-bubble {
      max-width: 270px; padding: 11px 14px; border-radius: 16px;
      font-size: 13px; line-height: 1.6; font-weight: 500;
      background: var(--surface); color: var(--ink);
      border: var(--bw) solid var(--line);
      overflow-wrap: break-word;
    }
    .msg-bubble p { margin: 0 0 8px; }
    .msg-bubble p:last-child { margin-bottom: 0; }
    .msg-bubble ul { margin: 4px 0 8px; padding-left: 18px; }
    .msg-bubble ul:last-child { margin-bottom: 0; }
    .msg-bubble li { margin-bottom: 4px; }
    .msg-bubble li:last-child { margin-bottom: 0; }
    .msg-bubble strong { font-weight: 700; }
    .message.user .msg-bubble { background: var(--blue); color: var(--ink); border-color: var(--line); }
    .typing { display: flex; gap: 4px; padding: 14px !important; align-items: center; }
    .typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--ink); animation: bounce 1.2s infinite; }
    .typing span:nth-child(2) { animation-delay: 0.2s; }
    .typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }
    .quick-actions { padding: 0 16px 10px; display: flex; flex-wrap: wrap; gap: 6px; background: var(--paper); }
    .quick-actions.persistent {
      border-top: 1.5px dashed var(--line-soft);
      padding-top: 8px;
      margin-top: -2px;
    }
    .quick-btn {
      padding: 6px 13px; border-radius: 100px;
      background: var(--surface); color: var(--ink);
      border: 1.5px solid var(--line);
      font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      font-family: 'Space Grotesk', sans-serif;
    }
    .quick-btn:hover { background: var(--yellow); }
    .quick-btn.job-btn { background: var(--green); }
    .reset-btn { background: var(--surface-alt); }
    .chat-input-area {
      padding: 12px 16px; border-top: var(--bw) solid var(--line);
      display: flex; gap: 8px; background: var(--surface); border-radius: 0 0 23px 23px;
    }
    .chat-input {
      flex: 1; background: var(--paper); border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm); padding: 10px 14px; color: var(--ink);
      font-size: 13px; outline: none; font-family: inherit; font-weight: 500;
    }
    .chat-input:focus { background: var(--surface); }
    .send-btn {
      width: 38px; height: 38px; border-radius: var(--radius-sm);
      background: var(--yellow);
      border: var(--bw) solid var(--line); color: var(--ink); cursor: pointer; font-size: 16px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .confirmation-card {
      margin: 4px 0; padding: 14px 16px; border-radius: var(--radius-sm);
      background: var(--green); border: var(--bw) solid var(--line);
      display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--ink);
    }
    .confirm-icon { font-size: 20px; }
    .inline-form {
      padding: 14px 16px; background: var(--surface); border-top: var(--bw) solid var(--line);
      display: flex; flex-direction: column; gap: 8px; border-radius: 0 0 23px 23px;
    }
    .form-title { font-size: 12px; font-weight: 700; color: var(--ink-soft); margin: 0 0 2px; }
    .form-input, .form-textarea {
      background: var(--paper); border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm); padding: 9px 12px; color: var(--ink);
      font-size: 13px; outline: none; font-family: inherit; font-weight: 500; resize: vertical;
    }
    .form-actions { display: flex; gap: 8px; margin-top: 4px; }
    .form-cancel, .form-submit {
      flex: 1; padding: 9px 14px; border-radius: var(--radius-sm);
      border: var(--bw) solid var(--line); cursor: pointer; font-weight: 700; font-size: 12.5px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .form-cancel { background: var(--surface); }
    .form-submit { background: var(--yellow); }
    .form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    @media (max-width: 480px) { .chat-window { width: calc(100vw - 32px); right: 16px; } }
  `]
})
export class ChatAgentComponent {
  isOpen = false;
  hasNotification = true;
  inputText = '';
  messages = signal<ChatMessage[]>([{ ...INITIAL_GREETING }]);
  loading = signal(false);
  sending = signal(false);
  sendConfirmed = signal(false);
  confirmationText = signal('');

  jobFormOpen = signal(false);
  messageFormOpen = signal(false);

  jobForm: JobFormData = {
    companyName: '', role: '', requiredStack: '', teamSize: '',
    remotePreference: '', region: '', ctcRange: ''
  };
  plainMessage = '';

  constructor(
    private chatEngine: ChatEngineService,
    private resend: ResendEmailService,
    private sanitizer: DomSanitizer
  ) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.hasNotification = false;
  }

  sendQuick(q: string) {
    this.inputText = q;
    this.send();
  }

  send() {
    const text = this.inputText.trim();
    if (!text || this.loading()) return;

    this.inputText = '';
    this.messages.update(msgs => [...msgs, { role: 'user', content: text }]);
    this.loading.set(true);

    this.chatEngine.chat(this.messages()).subscribe({
      next: (res) => {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: res.reply }]);
        this.loading.set(false);
      },
      error: () => {
        this.messages.update(msgs => [...msgs, {
          role: 'assistant',
          content: "I'm having a moment — please email eakas000@gmail.com directly!"
        }]);
        this.loading.set(false);
      }
    });
  }

  openJobForm() {
    this.messageFormOpen.set(false);
    this.jobFormOpen.set(true);
  }

  openMessageForm() {
    this.jobFormOpen.set(false);
    this.messageFormOpen.set(true);
  }

  closeForms() {
    this.jobFormOpen.set(false);
    this.messageFormOpen.set(false);
  }

  async submitJobForm() {
    if (this.sending()) return;
    this.sending.set(true);

    const d = this.jobForm;
    const subject = `New Job Opportunity: ${d.role || 'N/A'} at ${d.companyName || 'N/A'}`;
    const body =
      `New job opportunity collected via the portfolio AI agent:\n\n` +
      `Company: ${d.companyName || 'N/A'}\n` +
      `Role: ${d.role || 'N/A'}\n` +
      `Tech Stack: ${d.requiredStack || 'N/A'}\n` +
      `Team Size: ${d.teamSize || 'N/A'}\n` +
      `Work Mode: ${d.remotePreference || 'N/A'}\n` +
      `Region: ${d.region || 'N/A'}\n` +
      `Email: ${d.ctcRange || 'N/A'}\n\n` +
      `Please respond within 24 hours to keep momentum with this recruiter!`;

    const result = await this.resend.send(subject, body);
    this.sending.set(false);
    this.closeForms();

    this.confirmationText.set(
      result.ok
        ? 'Job details sent to Eakas! Expected response time: within 24 hours.'
        : "Couldn't send automatically — please email eakas000@gmail.com directly."
    );
    this.sendConfirmed.set(true);
    this.scheduleReset();
  }

  async submitPlainMessage() {
    if (this.sending() || !this.plainMessage.trim()) return;
    this.sending.set(true);

    const result = await this.resend.send('New message from portfolio site', this.plainMessage.trim());
    this.sending.set(false);
    this.closeForms();

    this.confirmationText.set(
      result.ok
        ? 'Message sent to Eakas!'
        : "Couldn't send automatically — please email eakas000@gmail.com directly."
    );
    this.sendConfirmed.set(true);
    this.scheduleReset();
  }

  /** Resets the whole chat back to its opening state after any completed send. */
  private scheduleReset() {
    setTimeout(() => this.resetChat(), 2500);
  }

  resetChat() {
    this.messages.set([{ ...INITIAL_GREETING }]);
    this.inputText = '';
    this.plainMessage = '';
    this.jobForm = { companyName: '', role: '', requiredStack: '', teamSize: '', remotePreference: '', region: '', ctcRange: '' };
    this.sendConfirmed.set(false);
    this.confirmationText.set('');
    this.closeForms();
  }

  /**
   * Turns plain-text chat content into readable HTML: escapes the raw text
   * first (so the LLM/user can't inject markup), then converts blank-line-
   * separated blocks into paragraphs, "- "/"• " lines into bullet lists,
   * and **bold** into <strong>. Sanitized before binding via [innerHTML].
   */
  formatMessage(content: string): SafeHtml {
    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const escaped = escape(content || '');
    const blocks = escaped.split(/\n{2,}/);

    const html = blocks.map(block => {
      const lines = block.split('\n').filter(l => l.trim().length > 0);
      const isList = lines.length > 0 && lines.every(l => /^[-•]\s+/.test(l.trim()));

      if (isList) {
        const items = lines.map(l => `<li>${this.applyInline(l.replace(/^[-•]\s+/, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${lines.map(l => this.applyInline(l)).join('<br>')}</p>`;
    }).join('');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private applyInline(line: string): string {
    return line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }
}
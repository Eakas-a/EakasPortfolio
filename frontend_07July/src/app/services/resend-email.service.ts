import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResendEmailService {
  //private readonly endpoint = 'http://localhost:8080/api/send-email';
  private readonly endpoint = 'https://eakasportfoliobackend.onrender.com/api/send-email';
  private readonly to = 'eakas000@gmail.com';
  // Resend requires the "from" to be on a domain you've verified in Resend.
  // Swap this for your verified sending address/domain.
  private readonly from = 'Portfolio Genie <onboarding@resend.dev>';

  async send(subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: this.from,
          to: [this.to],
          subject,
          text
        })
      });

      if (!res.ok) {
        const body = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${body}` };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  }
}

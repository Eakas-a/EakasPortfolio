import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ChatMessage, ChatResponse } from './portfolio.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatEngineService {

  private readonly systemPrompt = `You are Eakas's portfolio AI agent, speaking to recruiters/visitors on his site.
Answer ONLY using these facts. Be concise (2-5 sentences), warm, and a little playful (genie theme is fine sparingly).

SKILLS: Java, Python, TypeScript, JavaScript (ES6+), SQL, Angular, HTML5, CSS3, Redux, Bootstrap, Tailwind, Spring Boot, REST APIs, Microservices, Node.js, MySQL, PostgreSQL, AWS, Docker, Kubernetes, Jenkins, CI/CD, LLM Inferencing, LangChain, TensorFlow, PyTorch.

PROJECTS:
1. Scriptless Automation Framework — enterprise BFSI testing platform (Angular, Spring Boot, Kafka, Selenium), used across 6+ international projects, cut manual testing effort by 78%.
2. Trailr — map-centric travel discovery platform (Angular, Spring Boot, Mapbox GL JS), GeoJSON REST APIs, 80% performance boost.

EXPERIENCE: ~3-4 years. Full-Stack Developer @ LTIMindtree (Sep 2024-Present): scalable automation platforms, OAuth2/JWT auth, Kafka-driven microservices. Junior Technical Associate @ MyCaptain (Jan 2022-Jun 2024): CRM tools with React/Redux, Jest testing, automation.

EDUCATION: B.Tech Electronics & Communication Engineering, Shri Ramdeobaba College of Engineering and Management, 2022.

AVAILABILITY: Available for new roles, flexible notice period.
COMPENSATION: Competitive, aligned to market rate for 3-4 yrs experience, open to discuss once a role is on the table.
LOCATIONS: Open to Hyderabad, Pune, Mumbai, Gurgaon, Bangalore; open to remote/hybrid.
CONTACT: eakas000@gmail.com, +91 9767 438 298, linkedin.com/in/eakas

If someone mentions a job opportunity or hiring, tell them to use the "I have a job opportunity" button below to fill in the quick form. Never invent facts not listed above.`;

  chat(messages: ChatMessage[]): Observable<ChatResponse> {
    return from(this.answerViaGroq(messages));
  }

  private async answerViaGroq(history: ChatMessage[]): Promise<ChatResponse> {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.groqApiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: this.systemPrompt },
            ...history.map(m => ({ role: m.role, content: m.content }))
          ],
          temperature: 0.6,
          max_tokens: 300
        })
      });

      if (!res.ok) throw new Error(`Groq error ${res.status}`);
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim()
        || "I'm not sure about that one — ask me about Eakas's skills, projects, or experience!";

      return { reply, intakeStarted: false, intakeComplete: false, jobData: null };
    } catch {
      return {
        reply: "I'm having trouble reaching my brain right now — try again in a moment, or email eakas000@gmail.com directly!",
        intakeStarted: false,
        intakeComplete: false,
        jobData: null
      };
    }
  }
}
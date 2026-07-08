import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROJECTS, EXPERIENCE, SKILLS } from '../data/portfolio-data';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  intakeStarted: boolean;
  intakeComplete: boolean;
  jobData: any;
}

/**
 * Fully client-side replacement for the old Spring Boot REST API.
 * No HTTP calls, no backend, no network dependency — data lives in
 * ../data/portfolio-data.ts and is served instantly via `of(...)`
 * so every component's existing `.subscribe(...)` code keeps working
 * unchanged.
 */
@Injectable({ providedIn: 'root' })
export class ApiControllerService {

  getProjects(): Observable<any[]> {
    return of(PROJECTS);
  }

  getExperience(): Observable<any[]> {
    return of(EXPERIENCE);
  }

  getSkills(): Observable<any> {
    return of(SKILLS);
  }
}

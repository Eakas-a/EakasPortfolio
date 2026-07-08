import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAgentComponent } from './components/chat-agent/chat-agent.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavComponent } from './components/nav/nav.component';
import { HeavenHeaderComponent } from './components/heaven-header/heaven-header.component';
import { StairGapComponent } from './components/stair-gap/stair-gap.component';
import { LazyNavComponent } from './components/lazy-nav/lazy-nav.component';
import { IntroComponent } from './components/intro.component';
import { AladdinFlyerComponent } from './components/aladdin-flyer.component';
import { JourneyAudioService } from './services/journey-audio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ChatAgentComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    NavComponent,
    HeavenHeaderComponent,
    StairGapComponent,
    LazyNavComponent,
    IntroComponent,
    AladdinFlyerComponent
  ],
  template: `
    <app-nav></app-nav>
    <app-lazy-nav></app-lazy-nav>
    <app-aladdin-flyer></app-aladdin-flyer>
    <app-intro></app-intro>
    <main>
      

      <app-stair-gap
        label="Projects"
        icon="cloud"
        teaser="Systems shipped, impact measured."
        targetId="projects"
      ></app-stair-gap>
      <app-projects></app-projects>

      <app-stair-gap
        label="Skills"
        icon="genie"
        teaser="The toolbox behind the magic."
        targetId="skills"
        [flip]="true"
      ></app-stair-gap>
      <app-skills></app-skills>

      <app-stair-gap
        label="Experience"
        icon="lamp"
        teaser="Years of work, distilled."
        targetId="experience"
      ></app-stair-gap>
      <app-experience></app-experience>

      <app-stair-gap
        label="Contact"
        icon="crystal-ball"
        teaser="The last step — say hello."
        targetId="contact"
        [flip]="true"
      ></app-stair-gap>
      <app-contact></app-contact>
    </main>
    <app-chat-agent></app-chat-agent>
  `
})
export class AppComponent implements AfterViewInit {
  constructor(private audio: JourneyAudioService) {}

  ngAfterViewInit() {
    this.audio.initMusic();
  }
}

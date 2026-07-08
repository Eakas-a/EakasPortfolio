import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shared icon set. Most icons are hand-drawn inline SVG in the app's
 * line-art style. A few (like 'genie') are real illustrated images instead —
 * those are listed in IMAGE_ICONS and rendered as <img> rather than <svg>.
 */
const IMAGE_ICONS: Record<string, string> = {
  genie: '/assets/genie.png'
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      *ngIf="imageSrc as src"
      [src]="src"
      [class]="'app-icon icon-' + name"
      [attr.width]="size"
      [attr.height]="size"
      style="object-fit: contain; border-radius: 50%;"
      alt=""
    />

    <svg
      *ngIf="!imageSrc"
      class="app-icon"
      [class]="'app-icon icon-' + name"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
    >
      <ng-container [ngSwitch]="name">

        <!-- arrows -->
        <g *ngSwitchCase="'arrow-right'">
          <path d="M4 12h15" stroke-width="2" stroke-linecap="round"/>
          <path d="M13 6l6 6-6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'arrow-down'">
          <path d="M12 4v15" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 13l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'arrow-up-right'">
          <path d="M7 17L17 7" stroke-width="2" stroke-linecap="round"/>
          <path d="M9 7h8v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'chevron-up'">
          <path d="M5 15l7-7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'chevron-down'">
          <path d="M5 9l7 7 7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <g *ngSwitchCase="'music-up'">
          <path d="M9 18V5l10-2v13" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="6" cy="18" r="3" stroke-width="1.8"/>
          <circle cx="16" cy="16" r="3" stroke-width="1.8"/>
        </g>

        <g *ngSwitchCase="'music-mute'">
          <!-- Music note -->
          <path d="M9 18V5l10-2v13" 
                stroke-width="1.8" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
          <circle cx="6" cy="18" r="3" stroke-width="1.8"/>

          <!-- Mute X over the note -->
          <path d="M11 9l8 8M19 9l-8 8" 
                stroke-width="2" 
                stroke-linecap="round"/>
        </g>

        <!-- menu -->
        <g *ngSwitchCase="'menu'">
          <path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round"/>
        </g>

        <!-- close / check -->
        <g *ngSwitchCase="'close'">
          <path d="M5 5l14 14M19 5L5 19" stroke-width="2.2" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'check'">
          <path d="M4.5 12.5l5 5L20 6.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <g *ngSwitchCase="'lamp'">
          <path d="M3 17c0-1.8 1.6-3 4-3h6c3 0 5-1.7 5-4" stroke-width="1.8" stroke-linecap="round"/>
          <ellipse cx="7" cy="17" rx="4" ry="2.2" stroke-width="1.8"/>
          <path d="M18 10c1.4 0 2.5-1.1 2.5-2.5S19.4 5 18 5" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M14 6.5l1-2M16.5 5l.6-2M19 6l1.6-1.2" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'crystal-ball'">
          <circle cx="12" cy="10" r="6.5" stroke-width="1.8"/>
          <path d="M4 20.5c1.8-1.4 4.8-2 8-2s6.2.6 8 2" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M8 8.5c.5-1.5 2-2.5 3.5-2.3" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/>
        </g>
        <g *ngSwitchCase="'castle'">
          <path d="M4 21V11h3V8h2v3h2V6h2v5h2V8h2v3h3v10" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M9 21v-5h6v5" stroke-width="1.8" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'cloud'">
          <path d="M6.5 18c-2 0-3.5-1.6-3.5-3.5 0-1.8 1.3-3.3 3.1-3.5.3-2.5 2.4-4.5 5-4.5 2.3 0 4.2 1.5 4.8 3.6.3-.1.6-.1 1-.1 2 0 3.6 1.6 3.6 3.6S18.9 17 17 17c-.1 0-.1 0-.2 0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.5 18h11" stroke-width="1.6" stroke-linecap="round"/>
        </g>

        <!-- sound -->
        <g *ngSwitchCase="'volume-up'">
          <path d="M4 10v4h3l4 4V6l-4 4H4z" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M16 9c1 1 1 5 0 6M18.5 7c2 2 2 8 0 10" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'volume-mute'">
          <path d="M4 10v4h3l4 4V6l-4 4H4z" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M16 9.5l5 5M21 9.5l-5 5" stroke-width="1.6" stroke-linecap="round"/>
        </g>

        <!-- communication -->
        <g *ngSwitchCase="'mail'">
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke-width="1.8"/>
          <path d="M4.5 6.5l7.5 6 7.5-6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'phone'">
          <path d="M5 4.5h3.2l1.3 4-2 1.6c1 2.2 2.6 3.8 4.8 4.8l1.6-2 4 1.3V17.5c0 1.1-.9 2-2 2C10 19.5 4.5 14 4.5 8.5c0-1.1.4-4 .5-4z" stroke-width="1.7" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'map-pin'">
          <path d="M12 21s7-6.5 7-11.5a7 7 0 10-14 0C5 14.5 12 21 12 21z" stroke-width="1.8" stroke-linejoin="round"/>
          <circle cx="12" cy="9.5" r="2.4" stroke-width="1.6"/>
        </g>
        <g *ngSwitchCase="'map'">
          <path d="M9 4l-5.5 2v14L9 18l6 2 5.5-2V4L15 6 9 4z" stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M9 4v14M15 6v14" stroke-width="1.5"/>
        </g>
        <g *ngSwitchCase="'calendar'">
          <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" stroke-width="1.8"/>
          <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke-width="1.7" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'wave'">
          <path d="M8 21c-1.6-3-2.5-5-2.5-8 0-2.2.9-3.7 1.6-4.6.4-.5 1.2-.3 1.3.3l.6 3" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.9 11.5V6.2a1.2 1.2 0 012.4 0v4.3M11.3 10.4V5a1.2 1.2 0 012.4 0v5.7M13.7 10.6V6.4a1.2 1.2 0 012.4 0v6.4" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M16.1 12.9c1.2.4 2.4 1.4 2.4 3.3 0 1.7-.6 3-1.3 4.8" stroke-width="1.7" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'smile'">
          <circle cx="12" cy="12" r="8.5" stroke-width="1.7"/>
          <path d="M8.2 13.5c.7 1.8 2 2.8 3.8 2.8s3.1-1 3.8-2.8" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="10" r="0.9" fill="currentColor" stroke="none"/>
        </g>
        <g *ngSwitchCase="'party'">
          <path d="M4 20l3-11 11 3-11 8z" stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M14 4l1 2M18 6l2 1M16.5 9l2.2-.6" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="8.5" cy="13" r="0.8" fill="currentColor" stroke="none"/>
        </g>

        <!-- work / people -->
        <g *ngSwitchCase="'briefcase'">
          <rect x="3" y="8" width="18" height="12" rx="1.5" stroke-width="1.8"/>
          <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke-width="1.8"/>
          <path d="M3 13h18" stroke-width="1.6"/>
        </g>
        <g *ngSwitchCase="'users'">
          <circle cx="9" cy="8.5" r="3" stroke-width="1.7"/>
          <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" stroke-width="1.7" stroke-linecap="round"/>
          <path d="M15.5 6.2c1.4.4 2.4 1.7 2.4 3.2 0 1.4-.9 2.7-2.1 3.2" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M17 14.6c1.9.6 3.5 2.4 3.5 5.2" stroke-width="1.5" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'building'">
          <rect x="5" y="3.5" width="10" height="17" rx="1" stroke-width="1.8"/>
          <path d="M15 10h4v10.5h-4" stroke-width="1.7"/>
          <path d="M8 7h1M11 7h1M8 10.5h1M11 10.5h1M8 14h1M11 14h1" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'home'">
          <path d="M4 11l8-6.5L20 11" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 10v9.5h12V10" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M10 19.5V14h4v5.5" stroke-width="1.7"/>
        </g>
        <g *ngSwitchCase="'graduation-cap'">
          <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M6.5 11.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" stroke-width="1.6"/>
          <path d="M21 9.5v5.5" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'trophy'">
          <path d="M7 4.5h10v5a5 5 0 01-10 0v-5z" stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M7 6H4a1 1 0 00-1 1c0 2.4 1.7 3.9 3.6 4.2M17 6h3a1 1 0 011 1c0 2.4-1.7 3.9-3.6 4.2" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M12 14.5v3M9 20.5h6M9.5 20.5c0-1.4.6-2.3 2.5-2.5 1.9.2 2.5 1.1 2.5 2.5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'handshake'">
          <path d="M2.5 12l4-3 3.5 2.5 3-2 3 1.5 5.5-2.5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.5 9l5.5 5.5c.6.6 1.6.6 2.2 0 .5-.5.6-1.3.2-1.9M10 11.5l2 2c.6.6 1.6.6 2.2 0 .5-.5.6-1.3.2-1.9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        <!-- tech / concepts -->
        <g *ngSwitchCase="'brain'">
          <path d="M9.5 4.5c-2 0-3.2 1.5-3.2 3 0 .4.1.8.2 1.1-1.3.5-2 1.7-2 3 0 1 .5 1.9 1.3 2.5-.2.4-.3.9-.3 1.4 0 1.7 1.4 3 3.1 3 .3 1.4 1.6 2.5 3.1 2.5V4.5c-.6-.2-1.3 0-2.2 0z" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M14.5 4.5c2 0 3.2 1.5 3.2 3 0 .4-.1.8-.2 1.1 1.3.5 2 1.7 2 3 0 1-.5 1.9-1.3 2.5.2.4.3.9.3 1.4 0 1.7-1.4 3-3.1 3-.3 1.4-1.6 2.5-3.1 2.5V4.5c.6-.2 1.3 0 2.2 0z" stroke-width="1.5" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'rocket'">
          <path d="M12 2.5c2.5 1.7 4 4.7 4 8 0 2-1 4-2 5l-2 2-2-2c-1-1-2-3-2-5 0-3.3 1.5-6.3 4-8z" stroke-width="1.7" stroke-linejoin="round"/>
          <circle cx="12" cy="9" r="1.6" stroke-width="1.4"/>
          <path d="M9 15l-3 1.5V19M15 15l3 1.5V19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 17.5l-1 3.5M14 17.5l1 3.5" stroke-width="1.5" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'palette'">
          <path d="M12 3.5a8.5 8 0 100 17c1.1 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6h1.9c1.7 0 3.1-1.4 3.1-3.1 0-4.6-3.8-8.2-7.5-8.2z" stroke-width="1.6" stroke-linejoin="round"/>
          <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/>
          <circle cx="11" cy="7.5" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none"/>
          <circle cx="8.5" cy="14" r="1" fill="currentColor" stroke="none"/>
        </g>
        <g *ngSwitchCase="'database'">
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" stroke-width="1.7"/>
          <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" stroke-width="1.7"/>
          <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" stroke-width="1.5"/>
        </g>
        <g *ngSwitchCase="'gear'">
          <circle cx="12" cy="12" r="3" stroke-width="1.6"/>
          <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9L6.3 6.3" stroke-width="1.7" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'wrench'">
          <path d="M14.5 3.5a4.5 4.5 0 00-5.9 5l-6.1 6.1a2 2 0 002.8 2.8l6.1-6.1a4.5 4.5 0 005-5.9l-2.8 2.8-2.6-.9-.9-2.6z" stroke-width="1.6" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'money'">
          <rect x="2.5" y="6.5" width="19" height="11" rx="1.5" stroke-width="1.7"/>
          <circle cx="12" cy="12" r="3" stroke-width="1.6"/>
          <path d="M5.5 6.5v11M18.5 6.5v11" stroke-width="1.4"/>
        </g>
        <g *ngSwitchCase="'chart'">
          <path d="M4 20V10M9.5 20V4M15 20v-7M20 20V8" stroke-width="1.9" stroke-linecap="round"/>
          <path d="M2.5 20.5h19" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'robot'">
          <rect x="5" y="8" width="14" height="10" rx="2" stroke-width="1.7"/>
          <path d="M12 8V5" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="12" cy="3.7" r="1.2" stroke-width="1.4"/>
          <circle cx="9" cy="12.5" r="1.1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="12.5" r="1.1" fill="currentColor" stroke="none"/>
          <path d="M9.5 16h5" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M2.5 11v4M21.5 11v4" stroke-width="1.6" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'document'">
          <path d="M6.5 3.5h8l3 3v13.5a1 1 0 01-1 1h-10a1 1 0 01-1-1v-15.5a1 1 0 011-1z" stroke-width="1.7" stroke-linejoin="round"/>
          <path d="M14.5 3.5V7h3" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M8.5 12h7M8.5 15h7M8.5 18h4.5" stroke-width="1.4" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'heart'">
          <path d="M12 20s-7.5-4.8-7.5-10.4C4.5 6.5 6.8 4.5 9.3 4.5c1.4 0 2.7.9 2.7 2.1 0-1.2 1.3-2.1 2.7-2.1 2.5 0 4.8 2 4.8 5.1C19.5 15.2 12 20 12 20z" stroke-width="1.7" stroke-linejoin="round"/>
        </g>

      </ng-container>
    </svg>
  `,
  styles: [`
    .app-icon {
      display: inline-block;
      vertical-align: -0.2em;
      stroke: currentColor;
      color: inherit;
      flex-shrink: 0;
    }
  `]
})
export class IconComponent {
  @Input() name = '';
  @Input() size = 18;

  get imageSrc(): string | null {
    return IMAGE_ICONS[this.name] ?? null;
  }
}
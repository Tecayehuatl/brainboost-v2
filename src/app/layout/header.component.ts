import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" routerLink="/" aria-label="BrainBoost, inicio" (click)="menuOpen.set(false)">
          <span class="brand-mark"><span>✦</span></span>
          <span>Brain<span>Boost</span></span>
        </a>
        <button class="nav-toggle" type="button" [class.open]="menuOpen()" (click)="menuOpen.set(!menuOpen())" aria-label="Abrir menú" [attr.aria-expanded]="menuOpen()">☰</button>
        <nav [class.open]="menuOpen()" aria-label="Navegación principal">
          <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active" (click)="menuOpen.set(false)">Inicio</a>
          <a routerLink="/games" routerLinkActive="active" (click)="menuOpen.set(false)">Juegos</a>
          <a routerLink="/pricing" routerLinkActive="active" (click)="menuOpen.set(false)">Precios</a>
          <a routerLink="/about" routerLinkActive="active" (click)="menuOpen.set(false)">Nosotros</a>
          <a class="button button-small button-dark" routerLink="/login" (click)="menuOpen.set(false)">Acceder <span>→</span></a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly menuOpen = signal(false);
}


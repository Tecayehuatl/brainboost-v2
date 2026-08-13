import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameCategory, GAMES } from '../core/game-data';

@Component({
  selector: 'app-games',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="games-hero"><div class="container games-hero-grid"><div><span class="eyebrow light">La aventura de la semana</span><h1>Misión<br><em>Multiplica</em></h1><p>Salta entre planetas, resuelve retos y devuelve las estrellas a la galaxia.</p><div class="game-meta"><span>⌁ 8–12 años</span><span>★ 4.9</span><span>12.4k jugadores</span></div><a class="button button-primary" routerLink="/games/mision-multiplica/play">Jugar ahora <span>▶</span></a></div><div class="space-illustration"><div class="space-card"><span class="space-rocket">🚀</span><span class="space-planet one">🪐</span><span class="space-star a">✦</span><span class="space-star b">✦</span><strong>7 × 8 = ?</strong></div></div></div></section>
    <section class="games-library section"><div class="container">
      <div class="library-heading"><div><span class="eyebrow">Elige tu reto</span><h2>Todos los <em>juegos</em></h2></div><label class="search-box"><span>⌕</span><input type="search" [(ngModel)]="searchTerm" placeholder="Buscar un juego..." aria-label="Buscar juegos"></label></div>
      <div class="filters" role="group" aria-label="Filtrar por categoría">
        @for (category of categories; track category) { <button type="button" [class.active]="selectedCategory === category" (click)="selectedCategory = category">{{ category }}</button> }
      </div>
      <div class="games-count">{{ filteredGames.length }} aventuras encontradas</div>
      <div class="game-grid">
        @for (game of filteredGames; track game.id) {
          <article class="game-card"><a class="game-card-visual game-{{ game.color }}" [routerLink]="['/games', game.id]"><span class="game-big-icon">{{ game.icon }}</span><span class="category-pill">{{ game.category }}</span><span class="rating-pill">★ {{ game.rating }}</span></a><div class="game-card-body"><div class="game-level"><span>{{ game.level }}</span><span>·</span><span>{{ game.duration }}</span></div><h3><a [routerLink]="['/games', game.id]">{{ game.title }}</a></h3><p>{{ game.description }}</p><div class="card-footer"><span>{{ game.players }} jugando</span><a [routerLink]="['/games', game.id]" aria-label="Ver {{ game.title }}">→</a></div></div></article>
        } @empty { <div class="empty-state"><span>🔭</span><h3>No encontramos esa aventura</h3><p>Prueba otra palabra o cambia la categoría.</p></div> }
      </div>
    </div></section>
  `,
})
export class GamesComponent {
  readonly games = GAMES;
  readonly categories: Array<'Todos' | GameCategory> = ['Todos', 'Matemáticas', 'Ciencias', 'Lectura'];
  selectedCategory: 'Todos' | GameCategory = 'Todos';
  searchTerm = '';

  constructor(route: ActivatedRoute) {
    const category = route.snapshot.queryParamMap.get('category') as GameCategory | null;
    if (category && this.categories.includes(category)) this.selectedCategory = category;
  }

  get filteredGames() {
    const search = this.searchTerm.trim().toLocaleLowerCase('es');
    return this.games.filter((game) =>
      (this.selectedCategory === 'Todos' || game.category === this.selectedCategory) &&
      (!search || `${game.title} ${game.description} ${game.category}`.toLocaleLowerCase('es').includes(search))
    );
  }
}


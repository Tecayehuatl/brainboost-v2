import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GAMES, getGame } from '../core/game-data';

@Component({
  selector: 'app-game-detail',
  imports: [RouterLink],
  template: `
    <section class="detail-hero detail-{{ game.color }}"><div class="container detail-grid"><div class="detail-copy"><a class="back-link" routerLink="/games">← Todos los juegos</a><span class="category-pill">{{ game.category }}</span><h1>{{ game.title }}</h1><p>{{ game.description }}</p><div class="game-meta dark"><span>⌁ {{ game.level }}</span><span>◷ {{ game.duration }}</span><span>★ {{ game.rating }}</span><span>◎ {{ game.players }}</span></div><a class="button button-play" [routerLink]="['/games', game.id, 'play']"><span>▶</span> Empezar a jugar</a></div><div class="detail-visual"><div class="detail-icon">{{ game.icon }}</div><span class="equation">{{ game.category }}</span><span class="bubble bubble-one">✦</span><span class="bubble bubble-two">+10</span></div></div></section>
    <section class="detail-info section"><div class="container detail-info-grid"><div><span class="eyebrow">Tu misión</span><h2>Aprende mientras<br><em>superas el reto</em></h2><p>{{ game.objective }}</p><ul class="feature-list"><li><span>✓</span><div><strong>Progreso con propósito</strong><small>{{ game.reward }}</small></div></li><li><span>✓</span><div><strong>Respuesta inmediata</strong><small>Cada decisión muestra su efecto y te permite aprender del intento.</small></div></li><li><span>✓</span><div><strong>Partidas breves</strong><small>Completa una misión en {{ game.duration }} y vuelve para mejorar tu puntuación.</small></div></li></ul></div><aside class="instructions-card"><span class="number">01</span><h3>¿Cómo se juega?</h3><ol>@for (step of game.instructions; track step; let i = $index) {<li><b>{{ i + 1 }}</b><span>{{ step }}</span></li>}</ol><a class="button button-primary full" [routerLink]="['/games', game.id, 'play']">Iniciar misión →</a></aside></div></section>
    <section class="related section"><div class="container"><div class="section-heading split"><div><span class="eyebrow">Sigue explorando</span><h2>También te puede <em>gustar</em></h2></div><a routerLink="/games" class="text-link">Ver todos →</a></div><div class="related-grid">@for (item of related; track item.id) {<a [routerLink]="['/games', item.id]" class="related-card"><span class="related-icon game-{{ item.color }}">{{ item.icon }}</span><span><small>{{ item.category }}</small><strong>{{ item.title }}</strong><em>{{ item.level }} · {{ item.duration }}</em></span><b>→</b></a>}</div></div></section>
  `,
})
export class GameDetailComponent {
  readonly game;
  readonly related;
  constructor(route: ActivatedRoute) {
    this.game = getGame(route.snapshot.paramMap.get('id'));
    this.related = GAMES.filter((game) => game.id !== this.game.id && game.category === this.game.category).slice(0, 3);
  }
}

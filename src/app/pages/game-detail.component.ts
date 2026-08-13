import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GAMES, getGame } from '../core/game-data';

@Component({
  selector: 'app-game-detail',
  imports: [RouterLink],
  template: `
    <section class="detail-hero detail-{{ game.color }}"><div class="container detail-grid"><div class="detail-copy"><a class="back-link" routerLink="/games">← Todos los juegos</a><span class="category-pill">{{ game.category }}</span><h1>{{ game.title }}</h1><p>{{ game.description }}</p><div class="game-meta dark"><span>⌁ {{ game.level }}</span><span>◷ {{ game.duration }}</span><span>★ {{ game.rating }}</span><span>◎ {{ game.players }}</span></div><a class="button button-play" [routerLink]="['/games', game.id, 'play']"><span>▶</span> Empezar a jugar</a></div><div class="detail-visual"><div class="detail-icon">{{ game.icon }}</div><span class="equation">7 × 8 = ?</span><span class="bubble bubble-one">✦</span><span class="bubble bubble-two">+10</span></div></div></section>
    <section class="detail-info section"><div class="container detail-info-grid"><div><span class="eyebrow">Tu misión</span><h2>Aprende mientras<br><em>salvas la galaxia</em></h2><p>Cada respuesta correcta abre un nuevo portal. Avanza por tres mundos, encadena aciertos y consigue todas las insignias.</p><ul class="feature-list"><li><span>✓</span><div><strong>Retos que se adaptan a ti</strong><small>La dificultad evoluciona según tus respuestas.</small></div></li><li><span>✓</span><div><strong>Progreso visible</strong><small>Gana puntos, rachas e insignias en cada partida.</small></div></li><li><span>✓</span><div><strong>Sin presión</strong><small>Pistas claras y oportunidades para volver a intentar.</small></div></li></ul></div><aside class="instructions-card"><span class="number">01</span><h3>¿Cómo se juega?</h3><ol><li><b>1</b><span>Observa la operación del portal.</span></li><li><b>2</b><span>Elige la respuesta correcta.</span></li><li><b>3</b><span>Completa cinco retos para ganar.</span></li></ol><a class="button button-primary full" [routerLink]="['/games', game.id, 'play']">Iniciar misión →</a></aside></div></section>
    <section class="related section"><div class="container"><div class="section-heading split"><div><span class="eyebrow">Sigue explorando</span><h2>También te puede <em>gustar</em></h2></div><a routerLink="/games" class="text-link">Ver todos →</a></div><div class="related-grid">@for (item of related; track item.id) {<a [routerLink]="['/games', item.id]" class="related-card"><span class="related-icon game-{{ item.color }}">{{ item.icon }}</span><span><small>{{ item.category }}</small><strong>{{ item.title }}</strong><em>{{ item.level }} · {{ item.duration }}</em></span><b>→</b></a>}</div></div></section>
  `,
})
export class GameDetailComponent {
  readonly game;
  readonly related;
  constructor(route: ActivatedRoute) {
    this.game = getGame(route.snapshot.paramMap.get('id'));
    this.related = GAMES.filter((game) => game.id !== this.game.id).slice(0, 3);
  }
}


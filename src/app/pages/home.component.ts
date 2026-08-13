import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GAMES } from '../core/game-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home-hero">
      <div class="hero-art" aria-hidden="true"></div>
      <div class="container hero-content">
        <span class="eyebrow"><span>✦</span> Aprender nunca fue tan divertido</span>
        <h1>Grandes ideas.<br><em>Mentes imparables.</em></h1>
        <p>BrainBoost convierte matemáticas, ciencias y lectura en aventuras que tus hijos quieren volver a jugar.</p>
        <div class="hero-actions"><a class="button button-primary" routerLink="/games">Explorar juegos <span>→</span></a><a class="text-link" routerLink="/about"><span class="play-dot">▶</span> Conoce BrainBoost</a></div>
        <div class="trust-line"><div class="avatars"><span>👧🏻</span><span>👦🏽</span><span>👧🏿</span></div><div><strong>+32,000</strong><small>mentes curiosas jugando</small></div><div class="rating">★★★★★ <small>4.9</small></div></div>
      </div>
    </section>

    <section class="topics section">
      <div class="container">
        <div class="section-heading split"><div><span class="eyebrow">Explora y aprende</span><h2>Un mundo de <em>descubrimientos</em></h2></div><p>Retos diseñados por educadores para que cada logro se sienta como una aventura.</p></div>
        <div class="topic-grid">
          <a class="topic-card topic-math" routerLink="/games" [queryParams]="{ category: 'Matemáticas' }"><div class="topic-icon">∑</div><span>01</span><h3>Matemáticas</h3><p>Resuelve, conecta y domina números a tu ritmo.</p><strong>Explorar 4 juegos →</strong><div class="topic-doodle">× ÷ +</div></a>
          <a class="topic-card topic-science" routerLink="/games" [queryParams]="{ category: 'Ciencias' }"><div class="topic-icon">⚗</div><span>02</span><h3>Ciencias</h3><p>Experimenta con el mundo y descubre cómo funciona.</p><strong>Explorar 4 juegos →</strong><div class="topic-doodle">✦ ◌ ⚛</div></a>
          <a class="topic-card topic-reading" routerLink="/games" [queryParams]="{ category: 'Lectura' }"><div class="topic-icon">Aa</div><span>03</span><h3>Lectura</h3><p>Lee historias, encuentra pistas y crea nuevos finales.</p><strong>Explorar 3 juegos →</strong><div class="topic-doodle">“ ”</div></a>
        </div>
      </div>
    </section>

    <section class="featured-band section">
      <div class="container featured-layout">
        <div class="featured-visual"><span class="planet">🪐</span><span class="rocket">🚀</span><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><div class="badge-popular">Más jugado<br><strong>esta semana</strong></div></div>
        <div class="featured-copy"><span class="eyebrow light">Juego destacado</span><h2>Misión<br><em>Numérica</em></h2><p>Avanza por islas, abre puentes y supera guardianes resolviendo operaciones a toda velocidad.</p><div class="game-meta"><span>⌁ 8–12 años</span><span>◷ 10 min</span><span>★ 4.9</span></div><a class="button button-white" [routerLink]="['/games', featured.id]">Ver aventura <span>→</span></a></div>
      </div>
    </section>

    <section class="testimonials section">
      <div class="container">
        <div class="section-heading centered"><span class="eyebrow">Historias reales</span><h2>Lo dicen las <em>familias</em></h2></div>
        <div class="testimonial-grid">
          <article><div class="quote-mark">“</div><p>Por primera vez, Mateo me pidió seguir practicando fracciones. BrainBoost encontró la forma de convertir el reto en emoción.</p><div class="person"><span>👩🏻</span><div><strong>Laura R.</strong><small>Mamá de Mateo, 10 años</small></div><b>★★★★★</b></div></article>
          <article class="testimonial-main"><div class="quote-mark">“</div><p>Me gusta porque no parece tarea. Siento que estoy en una misión y cada vez puedo llegar más lejos.</p><div class="person"><span>👧🏽</span><div><strong>Sofía</strong><small>Exploradora, 11 años</small></div><b>★★★★★</b></div></article>
          <article><div class="quote-mark">“</div><p>El progreso es claro, los juegos son seguros y mis alumnos llegan con preguntas nuevas. Eso es aprendizaje vivo.</p><div class="person"><span>👨🏽‍🏫</span><div><strong>Profesor Andrés</strong><small>Docente de primaria</small></div><b>★★★★★</b></div></article>
        </div>
      </div>
    </section>

    <section class="final-cta"><div class="container"><div><span class="spark">✦</span><span class="spark second">✦</span><h2>La próxima gran idea<br>empieza <em>jugando.</em></h2><p>Prueba BrainBoost gratis. Sin tarjeta, sin compromiso.</p></div><a class="button button-primary" routerLink="/games">Comenzar ahora <span>→</span></a></div></section>
  `,
})
export class HomeComponent {
  readonly featured = GAMES[0];
}

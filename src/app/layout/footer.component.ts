import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand brand-light" routerLink="/" aria-label="BrainBoost, inicio"><img class="brand-logo-mark" src="/assets/brainboost-mark.png" alt="" aria-hidden="true"><span>Brain<span>Boost</span></span></a>
          <p>Aprender jugando cambia todo. Creamos aventuras que despiertan curiosidad y confianza.</p>
          <div class="socials" aria-label="Redes sociales">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">♪</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          </div>
        </div>
        <div><h3>Explora</h3><a routerLink="/games">Todos los juegos</a><a routerLink="/pricing">Planes</a><a routerLink="/about">Nuestra historia</a></div>
        <div><h3>Familias</h3><a href="mailto:hola@brainboost.mx">Centro de ayuda</a><a href="mailto:hola@brainboost.mx">Guía para padres</a><a href="mailto:hola@brainboost.mx">Privacidad</a></div>
        <div class="footer-contact"><h3>Hablemos</h3><a href="mailto:hola@brainboost.mx">hola&#64;brainboost.mx</a><a href="tel:+2223988930">+52 22 23 98 89 30</a><p>Puebla, México</p></div>
      </div>
      <div class="container footer-bottom"><span>© 2026 BrainBoost. Hecho con curiosidad.</span><span>Seguro para niños · Sin publicidad</span></div>
    </footer>
  `,
})
export class FooterComponent {}

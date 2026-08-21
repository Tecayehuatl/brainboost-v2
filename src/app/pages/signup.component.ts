import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="login-page signup-page">
      <div class="login-art signup-art">
        <a class="brand brand-light" routerLink="/" aria-label="BrainBoost, inicio">
          <img class="brand-logo-mark" src="/assets/brainboost-mark.png" alt="" aria-hidden="true">
          <span>Brain<span>Boost</span></span>
        </a>
        <div>
          <span class="login-planet">🚀</span>
          <h1>Una nueva<br>aventura empieza.</h1>
          <p>Crea una cuenta y convierte cada reto en una oportunidad para aprender.</p>
        </div>
      </div>

      <div class="login-form-wrap signup-form-wrap">
        <a class="back-link" routerLink="/">← Volver al inicio</a>
        <form (ngSubmit)="signup()">
          <span class="eyebrow">Comienza gratis</span>
          <h2>Crea tu cuenta</h2>
          <p>Disfruta 30 días de BrainBoost y explora todos los juegos.</p>

          <label>
            Nombre
            <input [(ngModel)]="name" name="name" type="text" required autocomplete="name" placeholder="Tu nombre">
          </label>
          <label>
            Correo electrónico
            <input [(ngModel)]="email" name="email" type="email" required autocomplete="email" placeholder="tu@correo.com">
          </label>
          <label>
            Contraseña
            <input [(ngModel)]="password" name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="Mínimo 8 caracteres">
          </label>
          <label class="terms-check">
            <input [(ngModel)]="acceptedTerms" name="acceptedTerms" type="checkbox" required>
            <span>Acepto los términos y el aviso de privacidad.</span>
          </label>

          <button class="button button-primary full" type="submit">Crear cuenta →</button>
          @if (submitted()) {
            <div class="demo-notice">¡Tu aventura está lista! Este prototipo no almacena datos personales.</div>
          }
          <small>¿Ya tienes una cuenta? <a routerLink="/login">Accede aquí</a></small>
        </form>
      </div>
    </section>
  `,
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  acceptedTerms = false;
  readonly submitted = signal(false);

  signup() {
    this.submitted.set(true);
  }
}

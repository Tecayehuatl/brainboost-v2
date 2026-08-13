import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login', imports: [FormsModule, RouterLink],
  template: `<section class="login-page"><div class="login-art"><a class="brand brand-light" routerLink="/"><span class="brand-mark"><span>✦</span></span><span>Brain<span>Boost</span></span></a><div><span class="login-planet">🪐</span><h1>Tu aventura<br>continúa aquí.</h1><p>Vuelve a tus retos, puntos e insignias.</p></div></div><div class="login-form-wrap"><a class="back-link" routerLink="/">← Volver al inicio</a><form (ngSubmit)="login()"><span class="eyebrow">Bienvenido de vuelta</span><h2>Accede a tu cuenta</h2><p>Ingresa tus datos para seguir aprendiendo.</p><label>Correo electrónico<input [(ngModel)]="email" name="email" type="email" required placeholder="tu@correo.com"></label><label>Contraseña<input [(ngModel)]="password" name="password" type="password" required placeholder="••••••••"></label><button class="button button-primary full" type="submit">Acceder →</button>@if (submitted()) {<div class="demo-notice">Este prototipo no guarda credenciales. ¡Explora los juegos libremente!</div>}<small>¿Aún no tienes cuenta? <a routerLink="/pricing">Empieza gratis</a></small></form></div></section>`,
})
export class LoginComponent { email = ''; password = ''; readonly submitted = signal(false); login() { this.submitted.set(true); } }


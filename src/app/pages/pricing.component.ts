import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing', imports: [RouterLink],
  template: `
    <section class="page-hero compact"><div class="container centered"><span class="eyebrow">Planes para cada familia</span><h1>Invierte en su <em>curiosidad</em></h1><p>Empieza gratis y cambia de plan cuando quieras. Sin anuncios, siempre.</p><div class="billing-pill"><span class="active">Mensual</span><span>Anual <b>Ahorra 25%</b></span></div></div></section>
    <section class="pricing-section section"><div class="container pricing-grid">
      <article class="price-card"><div><span class="plan-icon">🌱</span><small>Para comenzar</small><h2>Explorador</h2><p>Descubre BrainBoost sin compromiso.</p></div><div class="price"><strong>$0</strong><span>MXN<br>/ siempre</span></div><a class="button button-ghost full" routerLink="/games">Probar gratis</a><ul><li>✓ 5 juegos seleccionados</li><li>✓ 1 perfil infantil</li><li>✓ Progreso básico</li><li class="muted">— Sin retos exclusivos</li></ul></article>
      <article class="price-card featured-price"><div class="best-value">Más elegido</div><div><span class="plan-icon">🚀</span><small>Para mentes imparables</small><h2>Impulso</h2><p>Todo lo necesario para avanzar jugando.</p></div><div class="price"><strong>$149</strong><span>MXN<br>/ mes</span></div><a class="button button-primary full" routerLink="/login">Elegir Impulso →</a><ul><li>✓ Todos los juegos y materias</li><li>✓ Hasta 3 perfiles infantiles</li><li>✓ Rutas personalizadas</li><li>✓ Reportes para familias</li><li>✓ Nuevos retos cada mes</li></ul></article>
      <article class="price-card"><div><span class="plan-icon">🏫</span><small>Para aprender juntos</small><h2>Aula</h2><p>Herramientas para docentes y grupos.</p></div><div class="price custom"><strong>A tu medida</strong><span>desde 10<br>estudiantes</span></div><a class="button button-dark full" routerLink="/about" fragment="contacto">Hablar con nosotros</a><ul><li>✓ Panel para docentes</li><li>✓ Grupos y asignaciones</li><li>✓ Reportes descargables</li><li>✓ Soporte prioritario</li></ul></article>
    </div><div class="pricing-note container"><span>🛡</span><p><strong>Tu tranquilidad es parte del plan.</strong> Cumplimos estándares de privacidad infantil y nunca mostramos publicidad.</p></div></section>
    <section class="faq section"><div class="container narrow"><div class="section-heading centered"><span class="eyebrow">Preguntas frecuentes</span><h2>Todo claro antes de <em>empezar</em></h2></div><details open><summary>¿Puedo cancelar en cualquier momento?<span>+</span></summary><p>Sí. Tu acceso seguirá activo hasta terminar el periodo pagado y no habrá cargos posteriores.</p></details><details><summary>¿Necesito instalar algo?<span>+</span></summary><p>No. BrainBoost funciona directamente en navegadores modernos de computadora, tableta o celular.</p></details><details><summary>¿Los juegos se adaptan a la edad?<span>+</span></summary><p>Sí. Cada experiencia indica el rango recomendado y ajusta los retos según el progreso.</p></details></div></section>
  `,
})
export class PricingComponent {}


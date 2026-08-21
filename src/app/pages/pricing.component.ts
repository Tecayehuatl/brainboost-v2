import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  template: `
    <section class="page-hero compact">
      <div class="container centered">
        <span class="eyebrow">Planes para cada familia y escuela</span>
        <h1>Invierte en su <em>curiosidad</em></h1>
        <p>Elige el plan que mejor acompaña su aprendizaje. Sin anuncios, siempre.</p>
      </div>
    </section>
    <section class="pricing-section section">
      <div class="container pricing-grid">
        <article class="price-card plan-trial">
          <div class="plan-copy">
            <span class="plan-icon">🌱</span><small>Conoce BrainBoost</small>
            <h2>Prueba de 30 días</h2>
            <p>Acceso total para explorar antes de elegir un plan.</p>
          </div>
          <div class="price">
            <strong>$0</strong><span>MXN<br />/ 30 días</span>
          </div>
          <a class="button button-trial full" routerLink="/games">Iniciar prueba</a>
          <ul>
            <li>✓ 1 perfil de estudiante</li>
            <li>✓ Ejercicios completos por 30 días</li>
            <li>✓ Acceso a juegos educativos</li>
            <li>✓ Sin tarjeta ni compromiso</li>
          </ul>
        </article>
        <article class="price-card plan-student featured-price">
          <div class="best-value">Más popular</div>
          <div class="plan-copy">
            <span class="plan-icon">🚀</span><small>Para un estudiante</small>
            <h2>Plan Estudiante</h2>
            <p>Aprendizaje continuo con acceso a todo el contenido.</p>
          </div>
          <div class="price">
            <strong>$149</strong><span>MXN<br />/ mes</span>
          </div>
          <a class="button button-primary full" routerLink="/login">Suscribirme</a>
          <ul>
            <li>✓ 1 perfil de estudiante</li>
            <li>✓ Acceso ilimitado a juegos</li>
            <li>✓ Reportes de progreso semanales</li>
            <li>✓ Soporte prioritario</li>
          </ul>
        </article>
        <article class="price-card plan-annual">
          <div class="plan-copy">
            <span class="plan-icon">✦</span><small>Mejor valor anual</small>
            <h2>Suscripción Anual</h2>
            <p>Un año completo de aprendizaje por menos.</p>
          </div>
          <div class="price">
            <strong>$1,099</strong><span>MXN<br />/ año</span>
          </div>
          <span class="saving">Ahorras frente al plan mensual</span
          ><a class="button button-annual full" routerLink="/login">Ahorrar ahora</a>
          <ul>
            <li>✓ Todo lo del Plan Estudiante</li>
            <li>✓ Acceso durante 12 meses</li>
            <li>✓ Contenido premium exclusivo</li>
            <li>✓ Renovación anual sencilla</li>
          </ul>
        </article>
        <article class="price-card plan-school-monthly">
          <div class="plan-copy">
            <span class="plan-icon">🏫</span><small>Para salones de clase</small>
            <h2>Licencia Escolar Mensual</h2>
            <p>Gestión flexible para docentes y grupos escolares.</p>
          </div>
          <div class="price">
            <strong>$1,299</strong><span>MXN<br />/ mes</span>
          </div>
          <a class="button button-school full" routerLink="/about" fragment="contacto"
            >Contratar licencia</a
          >
          <ul>
            <li>✓ Gestión de hasta 50 estudiantes</li>
            <li>✓ Herramientas para docentes</li>
            <li>✓ Asignación de actividades</li>
            <li>✓ Reportes de grupo</li>
            <li>✓ Soporte prioritario</li>
          </ul>
        </article>
        <article class="price-card plan-school-annual">
          <div class="plan-copy">
            <span class="plan-icon">🎓</span><small>La opción institucional</small>
            <h2>Licencia Escolar Anual</h2>
            <p>Todo un ciclo escolar con seguimiento continuo.</p>
          </div>
          <div class="price">
            <strong>$3,999</strong><span>MXN<br />/ año</span>
          </div>
          <a class="button button-dark full" routerLink="/about" fragment="contacto"
            >Solicitar demo</a
          >
          <ul>
            <li>✓ Todo lo de la licencia mensual</li>
            <li>✓ Acceso durante todo el año</li>
            <li>✓ Panel administrativo escolar</li>
            <li>✓ Reportes avanzados</li>
            <li>✓ Soporte dedicado</li>
          </ul>
        </article>
      </div>
      <div class="pricing-note container">
        <span>🛡</span>
        <p>
          <strong>Tu tranquilidad es parte del plan.</strong> Cumplimos estándares de privacidad
          infantil y nunca mostramos publicidad.
        </p>
      </div>
    </section>
    <section class="faq section">
      <div class="container narrow">
        <div class="section-heading centered">
          <span class="eyebrow">Preguntas frecuentes</span>
          <h2>Todo claro antes de <em>empezar</em></h2>
        </div>
        <details open>
          <summary>¿Puedo cancelar en cualquier momento?<span>+</span></summary>
          <p>
            Sí. Tu acceso seguirá activo hasta terminar el periodo pagado y no habrá cargos
            posteriores.
          </p>
        </details>
        <details>
          <summary>¿Necesito instalar algo?<span>+</span></summary>
          <p>
            No. BrainBoost funciona directamente en navegadores modernos de computadora, tableta o
            celular.
          </p>
        </details>
        <details>
          <summary>¿Los juegos se adaptan a la edad?<span>+</span></summary>
          <p>
            Sí. Cada experiencia indica el rango recomendado y ajusta los retos según el progreso.
          </p>
        </details>
      </div>
    </section>
  `,
})
export class PricingComponent {}

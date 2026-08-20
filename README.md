# BrainBoost

Plataforma educativa en español que convierte matemáticas, ciencias y lectura en aventuras interactivas para estudiantes de primaria y secundaria.

![Página principal de BrainBoost](public/assets/brainboost-hero.png)

## Características

- Catálogo con búsqueda y filtros por materia.
- Once juegos jugables con puntuación, progreso, rachas y recompensas.
- Fichas individuales con objetivo educativo e instrucciones.
- Planes de precios, información del equipo y formulario de contacto.
- Diseño adaptable para escritorio, tableta y dispositivos móviles.
- Navegación accesible mediante Angular Router.
- Interfaz completamente en español.

## Juegos disponibles

| Materia | Juego | Mecánica principal |
| --- | --- | --- |
| Matemáticas | Misión Numérica | Mapa con puertas, vidas y operaciones matemáticas |
| Matemáticas | Constructor Matemático | Obtención y administración de recursos para construir una ciudad |
| Matemáticas | Carrera de Operaciones | Carrera contrarreloj impulsada por cálculo mental |
| Matemáticas | Fracciones en Pizza | Preparación de pedidos con fracciones equivalentes |
| Ciencias | Laboratorio BrainBoost | Experimentos mediante selección y combinación de materiales |
| Ciencias | Exploradores del Universo | Misiones planetarias con combustible limitado |
| Ciencias | Rescate del Ecosistema | Decisiones ambientales con recuperación visual del hábitat |
| Ciencias | Viaje Celular | Identificación de organelos y sus funciones |
| Lectura | Detective de Historias | Comprensión, inferencias y colección de pistas |
| Lectura | Crea tu Aventura | Historia ramificada con decisiones y finales alternativos |
| Lectura | Batalla de Palabras | Combate mediante vocabulario, ortografía y comprensión |

Misión Numérica utiliza Phaser para su escenario interactivo. Los demás juegos emplean componentes y estado reactivo de Angular para ofrecer mecánicas específicas, accesibles y adaptables.

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal |
| `/games` | Catálogo, buscador y filtros |
| `/games/:id` | Información de un juego |
| `/games/:id/play` | Interfaz jugable |
| `/pricing` | Planes y beneficios |
| `/about` | Historia, misión, equipo y contacto |
| `/login` | Prototipo de acceso |

## Tecnologías

- Angular 22
- TypeScript 6
- Angular Router y Forms
- Phaser 3.90
- SCSS
- RxJS
- Vitest
- pnpm

## Requisitos

- Node.js `24.15.0` o una versión posterior de Node.js 24
- pnpm `11` o superior

## Instalación

```bash
git clone <url-del-repositorio>
cd brainboost-v2
pnpm install
```

## Desarrollo local

```bash
pnpm start
```

La aplicación estará disponible en [http://localhost:4200](http://localhost:4200). Angular actualizará la página automáticamente cuando cambie el código.

## Comandos

```bash
# Servidor de desarrollo
pnpm start

# Compilación de producción
pnpm build

# Compilación continua
pnpm watch

# Pruebas interactivas
pnpm test

# Pruebas en una sola ejecución
pnpm test --no-watch
```

Los archivos de producción se generan en `dist/brainboost-v2/browser`.

## Despliegue en Vercel

El repositorio incluye `vercel.json` con el comando de compilación, el directorio de salida y la redirección necesaria para que Angular Router funcione al abrir rutas directamente.

1. Importa el repositorio en Vercel.
2. Conserva el framework detectado como **Angular**.
3. Despliega el proyecto; no se requieren variables de entorno para el prototipo actual.

También puedes desplegarlo desde la terminal con `vercel` o generar una vista previa con `vercel deploy`.

## Estructura principal

```text
src/
├── app/
│   ├── core/
│   │   └── game-data.ts          # Catálogo y metadatos de juegos
│   ├── layout/
│   │   ├── header.component.ts
│   │   └── footer.component.ts
│   ├── pages/
│   │   ├── home.component.ts
│   │   ├── games.component.ts
│   │   ├── game-detail.component.ts
│   │   ├── game-play.component.ts
│   │   ├── pricing.component.ts
│   │   ├── about.component.ts
│   │   └── login.component.ts
│   └── app.routes.ts
└── styles.scss                   # Sistema visual y estilos adaptables

public/
├── assets/                       # Ilustraciones de BrainBoost
└── vendor/                       # Distribución web de Phaser
```

## Añadir un juego

1. Agrega sus metadatos a `GAMES` en `src/app/core/game-data.ts`.
2. Crea su banco de preguntas o su estado en `game-play.component.ts`.
3. Añade la interfaz correspondiente dentro del bloque `@switch` del componente.
4. Incorpora sus estilos en `src/styles.scss`.
5. Actualiza `game-data.spec.ts` y ejecuta las pruebas.

Cada juego debe incluir un identificador único, materia, rango de edad, duración, objetivo educativo, recompensa e instrucciones de tres pasos.

## Validación

El proyecto incluye pruebas para:

- Creación y renderizado del shell principal.
- Presencia de los nueve juegos educativos requeridos.
- Conservación de los juegos originales que no se solapan.
- Ausencia de identificadores duplicados en el catálogo.

## Estado del prototipo

Los juegos funcionan completamente en el navegador. Los formularios de acceso, contacto y comentarios son demostrativos y todavía no están conectados a un servicio de autenticación o backend persistente.

import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type PhaserTypes from 'phaser';
import { getGame } from '../core/game-data';

declare const Phaser: typeof PhaserTypes;

interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number;
  note: string;
  context?: string;
}

interface StoryChoice { label: string; next: string; }
interface StoryNode { text: string; icon: string; choices?: StoryChoice[]; ending?: string; }

const QUIZZES: Record<string, QuizQuestion[]> = {
  'carrera-operaciones': [
    { prompt: '18 + 27 = ?', options: ['35', '45', '55'], correct: 1, note: '18 + 27 = 45. ¡Turbo activado!' },
    { prompt: '9 × 6 = ?', options: ['42', '54', '63'], correct: 1, note: '9 grupos de 6 forman 54.' },
    { prompt: '72 ÷ 8 = ?', options: ['8', '9', '10'], correct: 1, note: '72 repartido en 8 grupos da 9.' },
    { prompt: '100 − 37 = ?', options: ['53', '63', '73'], correct: 1, note: '100 menos 37 es 63. ¡Meta a la vista!' },
  ],
  'exploradores-universo': [
    { prompt: '¿Qué planeta es conocido por sus grandes anillos?', options: ['Marte', 'Saturno', 'Venus'], correct: 1, note: 'Saturno posee el sistema de anillos más visible.', context: 'Destino 01 · Sistema exterior' },
    { prompt: '¿Por qué los astronautas parecen flotar en órbita?', options: ['No existe gravedad', 'Están en caída libre', 'El traje los eleva'], correct: 1, note: 'La nave y sus tripulantes caen juntos alrededor de la Tierra.', context: 'Destino 02 · Estación orbital' },
    { prompt: '¿Qué necesita una planta para producir alimento?', options: ['Luz', 'Sonido', 'Arena'], correct: 0, note: 'La luz impulsa la fotosíntesis.', context: 'Destino 03 · Planeta verde' },
    { prompt: '¿Cuál es la estrella más cercana a la Tierra?', options: ['Sirio', 'Polaris', 'El Sol'], correct: 2, note: 'El Sol es nuestra estrella y fuente principal de energía.', context: 'Destino 04 · Regreso a casa' },
  ],
  'rescate-ecosistema': [
    { prompt: 'El río está lleno de residuos. ¿Cuál es la mejor primera acción?', options: ['Liberar peces', 'Retirar basura y detener vertidos', 'Agregar perfume'], correct: 1, note: 'Eliminar la fuente de contaminación permite que el agua se recupere.', context: 'Zona 01 · Río nublado' },
    { prompt: 'El suelo del bosque se erosiona. ¿Qué ayuda más?', options: ['Reforestar con especies nativas', 'Cubrirlo con plástico', 'Retirar más plantas'], correct: 0, note: 'Las raíces nativas sujetan el suelo y recuperan el hábitat.', context: 'Zona 02 · Ladera seca' },
    { prompt: '¿Qué animal pertenece naturalmente a un humedal?', options: ['Rana', 'Camello', 'Oso polar'], correct: 0, note: 'Las ranas dependen del agua y son indicadores de un humedal sano.', context: 'Zona 03 · Humedal' },
    { prompt: 'Hay pocas abejas. ¿Qué decisión favorece su regreso?', options: ['Sembrar flores nativas', 'Cortar todas las flores', 'Usar más pesticida'], correct: 0, note: 'Las flores nativas aportan refugio y alimento a los polinizadores.', context: 'Zona 04 · Prado' },
  ],
  'detective-historias': [
    { prompt: '¿Por qué la ventana no pudo ser la entrada?', options: ['Estaba cerrada por dentro', 'Era muy pequeña', 'Estaba lloviendo'], correct: 0, note: 'Pista 1: la ventana estaba asegurada desde el interior.', context: 'Al llegar a la biblioteca, Luna encontró una ventana cerrada por dentro y huellas húmedas junto a la puerta. El paraguas del cuidador estaba seco.' },
    { prompt: '¿Qué indican las huellas húmedas?', options: ['Alguien entró por la puerta', 'El libro se cayó', 'La ventana se rompió'], correct: 0, note: 'Pista 2: las huellas comienzan exactamente en la puerta.', context: 'Las huellas iban desde la puerta hasta el estante vacío. Afuera llovía desde hacía una hora.' },
    { prompt: '¿Quién probablemente llegó de afuera?', options: ['El cuidador', 'La visitante con botas mojadas', 'Luna'], correct: 1, note: 'Pista 3: el paraguas seco descarta al cuidador; las botas explican las huellas.', context: 'El cuidador dijo que no había salido. Una visitante dejó sus botas mojadas bajo una mesa y aseguró que nunca entró a la sala.' },
    { prompt: '¿Dónde escondió el libro la visitante?', options: ['Dentro de su paraguas', 'Bajo la mesa', 'En la ventana'], correct: 1, note: 'Caso resuelto: el borde dorado asomaba bajo la mesa junto a sus botas.', context: 'Luna vio un borde dorado bajo la misma mesa. Era idéntico al lomo del libro desaparecido.' },
  ],
  'batalla-palabras': [
    { prompt: 'Elige un sinónimo de “valiente”.', options: ['Cobarde', 'Audaz', 'Lento'], correct: 1, note: '“Audaz” significa que actúa con valor.' },
    { prompt: 'Completa correctamente: “El héroe ___ la puerta”.', options: ['abrió', 'habrió', 'abrío'], correct: 0, note: '“Abrió” se escribe sin h y con tilde.' },
    { prompt: '¿Cuál palabra está escrita correctamente?', options: ['Exepción', 'Excepción', 'Ecepción'], correct: 1, note: 'Excepción se escribe con x, c y tilde.' },
    { prompt: '“La tormenta rugía”. ¿Qué recurso utiliza?', options: ['Personificación', 'Lista', 'Pregunta'], correct: 0, note: 'Se atribuye a la tormenta una acción propia de un ser vivo.' },
  ],
  'fracciones-en-pizza': [
    { prompt: 'Una mesa pide media pizza. ¿Qué fracción es equivalente?', options: ['2/4', '1/3', '3/4'], correct: 0, note: '2 de 4 partes representan la mitad.' },
    { prompt: '¿Qué porción es mayor?', options: ['1/4', '3/4', '2/8'], correct: 1, note: 'Tres cuartos cubren más pizza.' },
    { prompt: 'Dos porciones de 1/8 suman…', options: ['1/4', '1/8', '1/2'], correct: 0, note: '2/8 se simplifica a 1/4.' },
    { prompt: 'Quedan 3 de 6 rebanadas. ¿Qué fracción queda?', options: ['1/2', '1/3', '2/3'], correct: 0, note: '3/6 es equivalente a 1/2.' },
  ],
  'viaje-celular': [
    { prompt: '¿Qué organelo dirige las actividades de la célula?', options: ['Núcleo', 'Membrana', 'Vacuola'], correct: 0, note: 'El núcleo contiene el material genético y coordina la actividad.' },
    { prompt: '¿Dónde se produce la mayor parte de la energía?', options: ['Ribosoma', 'Mitocondria', 'Pared celular'], correct: 1, note: 'La mitocondria transforma nutrientes en energía utilizable.' },
    { prompt: '¿Qué estructura controla lo que entra y sale?', options: ['Cloroplasto', 'Núcleo', 'Membrana'], correct: 2, note: 'La membrana celular regula el intercambio con el entorno.' },
    { prompt: '¿Qué organelo permite fotosíntesis en plantas?', options: ['Cloroplasto', 'Lisosoma', 'Ribosoma'], correct: 0, note: 'Los cloroplastos capturan energía luminosa.' },
  ],
};

const STORY: Record<string, StoryNode> = {
  start: { icon: '🚪', text: 'Ana encuentra una puerta luminosa bajo las raíces de un árbol. Del otro lado se escucha una voz pidiendo ayuda.', choices: [{ label: 'Entrar con cuidado', next: 'inside' }, { label: 'Buscar a la guardabosques', next: 'ranger' }] },
  inside: { icon: '🦊', text: 'Dentro hay un zorro atrapado tras un muro de sombras. Una llave cuelga sobre un puente inestable.', choices: [{ label: 'Cruzar el puente', next: 'bridge' }, { label: 'Hablar con el zorro', next: 'fox' }] },
  ranger: { icon: '🧭', text: 'La guardabosques reconoce la puerta. Te entrega una brújula que señala aquello que más necesita ayuda.', choices: [{ label: 'Regresar con la brújula', next: 'compass' }, { label: 'Pedir refuerzos', next: 'team' }] },
  bridge: { icon: '🌉', text: 'Ana cruza despacio, recupera la llave y libera al zorro. Juntos disipan las sombras.', ending: 'Final audaz: La guardiana del bosque' },
  fox: { icon: '💬', text: 'El zorro explica que la sombra teme a las historias. Ana narra una aventura y el muro desaparece.', ending: 'Final ingenioso: La narradora de luz' },
  compass: { icon: '🧭', text: 'La brújula revela un sendero seguro. Ana llega al zorro y abre un pasadizo oculto.', ending: 'Final sabio: La exploradora del sendero' },
  team: { icon: '🤝', text: 'El pueblo entra unido. Cada persona lleva una lámpara y, juntas, iluminan todo el mundo secreto.', ending: 'Final solidario: La fuerza del equipo' },
};

@Component({
  selector: 'app-game-play',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="play-page game-mode-{{ game.id }}">
      <div class="container play-topbar"><a [routerLink]="['/games', game.id]">← Salir del juego</a><div><span>{{ game.icon }}</span><strong>{{ game.title }}</strong></div><button type="button" (click)="instructionsOpen.set(!instructionsOpen())">? Instrucciones</button></div>
      <div class="container scoreboard"><div><small>NIVEL</small><strong>{{ level() }} / 3</strong></div><div class="progress-track"><span [style.width.%]="progress()"></span></div><div><small>PUNTOS</small><strong>{{ score() }}</strong></div><div><small>{{ statusLabel() }}</small><strong>{{ statusValue() }}</strong></div></div>
      @if (instructionsOpen()) { <div class="container instruction-banner"><span>💡</span><p><strong>Cómo jugar:</strong> {{ game.instructions.join(' ') }}</p><button type="button" (click)="instructionsOpen.set(false)" aria-label="Cerrar">×</button></div> }

      <div class="container game-shell real-game-shell">
        @switch (game.id) {
          @case ('mision-numerica') { <div #gameContainer class="phaser-game" aria-label="Mapa interactivo de operaciones matemáticas"></div> }
          @case ('constructor-matematico') {
            <div class="builder-game">
              <div class="city-view"><div class="city-sky">☀️</div><div class="city-grid">@for (building of builtBuildings(); track building.name) {<div class="built-item"><span>{{ building.icon }}</span><small>{{ building.name }}</small></div>} @empty {<div class="empty-city"><span>🏞️</span><strong>Tu terreno está listo</strong><small>Resuelve encargos y construye tu primera obra.</small></div>}</div></div>
              <div class="game-panel"><div class="panel-kicker">Encargo {{ builderQuestionIndex() + 1 }} de {{ builderQuestions.length }}</div><h2>{{ currentBuilderQuestion().prompt }}</h2><div class="answer-grid">@for (option of currentBuilderQuestion().options; track option; let i = $index) {<button type="button" [disabled]="answerLocked()" (click)="answerBuilder(i)">{{ option }}</button>}</div><p class="game-feedback" [class.success]="lastCorrect()">{{ message() }}</p><div class="shop"><div><strong>Tienda de construcción</strong><span>🪙 {{ coins() }} monedas</span></div><div class="shop-items">@for (item of buildingShop; track item.name) {<button type="button" [disabled]="coins() < item.cost || wasBuilt(item.name)" (click)="build(item)"><span>{{ item.icon }}</span><b>{{ item.name }}</b><small>{{ wasBuilt(item.name) ? 'Construido' : item.cost + ' monedas' }}</small></button>}</div></div></div>
            </div>
          }
          @case ('laboratorio-brainboost') {
            <div class="lab-game"><div class="lab-scene"><div class="lab-bubbles"><i></i><i></i><i></i></div><span class="lab-flask">{{ currentExperiment().icon }}</span><div class="lab-result" [class.active]="message()">{{ experimentResult() }}</div></div><div class="game-panel"><div class="panel-kicker">Experimento {{ experimentIndex() + 1 }} de {{ experiments.length }}</div><h2>{{ currentExperiment().title }}</h2><p>{{ currentExperiment().prompt }}</p><div class="material-grid">@for (material of currentExperiment().materials; track material) {<button type="button" [class.selected]="selectedMaterials().includes(material)" (click)="toggleMaterial(material)">{{ material }}</button>}</div><button class="button button-primary full" type="button" (click)="checkExperiment()">Comprobar hipótesis</button><p class="game-feedback" [class.success]="lastCorrect()">{{ message() }}</p></div></div>
          }
          @case ('crea-tu-aventura') {
            <div class="story-game"><div class="story-map"><span class="story-path one"></span><span class="story-path two"></span><div class="story-progress-icon">{{ currentStoryNode().icon }}</div><small>Decisiones tomadas: {{ storySteps() }}</small></div><div class="story-card"><span class="panel-kicker">Un bosque de posibilidades</span><p>{{ currentStoryNode().text }}</p>@if (currentStoryNode().choices; as choices) {<div class="story-choices">@for (choice of choices; track choice.next) {<button type="button" (click)="chooseStory(choice)">{{ choice.label }} <span>→</span></button>}</div>} @else {<div class="story-ending"><span>✦ Final descubierto</span><h2>{{ currentStoryNode().ending }}</h2><button class="button button-primary" type="button" (click)="restartGame()">Descubrir otro final</button></div>}</div></div>
          }
          @default {
            <div class="quiz-game">
              <div class="game-stage">
                @switch (game.id) {
                  @case ('carrera-operaciones') {<div class="race-stage"><div class="track"><span class="finish-line">🏁</span><div class="racer player" [style.left.%]="racePlayer()">🏎️</div></div><div class="track rival"><span class="finish-line">🏁</span><div class="racer" [style.left.%]="raceRival()">🚙</div></div><div class="race-status"><span>TÚ {{ racePlayer() }}%</span><b>⏱ {{ timeLeft() }} s</b><span>RIVAL {{ raceRival() }}%</span></div></div>}
                  @case ('exploradores-universo') {<div class="universe-stage"><span class="big-scene-icon">{{ ['🌍','🛰️','🪐','☀️'][questionIndex()] || '🚀' }}</span><div class="fuel-meter"><span>Combustible</span><b [style.width.%]="fuel()"></b><small>{{ fuel() }}%</small></div></div>}
                  @case ('rescate-ecosistema') {<div class="eco-stage"><div class="eco-landscape" [style.filter]="'saturate(' + (0.25 + ecoHealth() / 100) + ')' "><span>{{ ecoHealth() > 60 ? '🌳🦋🌿🦆' : ecoHealth() > 30 ? '🌱🌫️🪨' : '🏭💨🗑️' }}</span></div><div class="eco-meter"><b [style.width.%]="ecoHealth()"></b></div><strong>Salud del ecosistema: {{ ecoHealth() }}%</strong></div>}
                  @case ('detective-historias') {<div class="detective-stage"><span class="case-file">EXPEDIENTE<br><b>#042</b></span><div class="clue-board">@for (clue of clues(); track clue) {<span>📌 {{ clue }}</span>} @empty {<em>Las pistas aparecerán aquí.</em>}</div></div>}
                  @case ('batalla-palabras') {<div class="battle-stage"><div><span class="fighter">🧙‍♀️</span><div class="health"><b [style.width.%]="playerHp()"></b></div><small>Tu energía {{ playerHp() }}</small></div><strong>VS</strong><div><span class="fighter enemy">👹</span><div class="health enemy-health"><b [style.width.%]="enemyHp()"></b></div><small>Guardián {{ enemyHp() }}</small></div></div>}
                  @case ('fracciones-en-pizza') {<div class="simple-stage"><span class="big-scene-icon">🍕</span><strong>Pedidos listos: {{ questionIndex() }} / 4</strong></div>}
                  @case ('viaje-celular') {<div class="simple-stage cell-stage"><span class="big-scene-icon">🔬</span><strong>Organelos registrados: {{ questionIndex() }} / 4</strong></div>}
                }
              </div>
              <div class="game-panel question-panel">@if (currentQuestion(); as question) {<div class="panel-kicker">{{ question.context || ('Reto ' + (questionIndex() + 1) + ' de ' + quizQuestions.length) }}</div>@if (game.id === 'detective-historias') {<div class="reading-passage">{{ question.context }}</div>}<h2>{{ question.prompt }}</h2><div class="answer-grid">@for (option of question.options; track option; let i = $index) {<button type="button" [disabled]="answerLocked()" (click)="answerQuiz(i)">{{ option }}</button>}</div><p class="game-feedback" [class.success]="lastCorrect()">{{ message() }}</p>}</div>
            </div>
          }
        }
        @if (finished() && game.id !== 'crea-tu-aventura') {<div class="game-complete"><span>{{ finishIcon() }}</span><h2>{{ finishTitle() }}</h2><p>{{ finishMessage() }}</p><button class="button button-primary" type="button" (click)="restartGame()">Jugar de nuevo</button></div>}
      </div>

      <div class="container play-help"><div><strong>¿Algo no funciona?</strong><span>Tu opinión nos ayuda a mejorar cada aventura.</span></div><button type="button" (click)="feedbackOpen.set(!feedbackOpen())">⚑ Enviar comentarios</button></div>
      @if (feedbackOpen()) { <div class="container feedback-panel"><h3>Cuéntanos qué pasó</h3><label>Tipo<select [(ngModel)]="feedbackType"><option>Comentario</option><option>Problema técnico</option><option>Contenido incorrecto</option></select></label><label>Mensaje<textarea [(ngModel)]="feedbackMessage" placeholder="Describe tu experiencia..."></textarea></label><div><button type="button" class="button button-primary button-small" (click)="submitFeedback()">Enviar</button><button type="button" class="button button-small button-ghost" (click)="feedbackOpen.set(false)">Cancelar</button></div></div> }
      @if (feedbackSent()) { <div class="toast">✓ Gracias. Recibimos tu mensaje.</div> }
    </section>
  `,
})
export class GamePlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameContainer') gameContainer?: ElementRef<HTMLDivElement>;
  readonly game;
  readonly score = signal(0);
  readonly streak = signal(0);
  readonly level = signal(1);
  readonly progress = signal(0);
  readonly lives = signal(3);
  readonly instructionsOpen = signal(true);
  readonly feedbackOpen = signal(false);
  readonly feedbackSent = signal(false);
  readonly finished = signal(false);
  readonly message = signal('Elige una respuesta para comenzar.');
  readonly lastCorrect = signal(false);
  readonly answerLocked = signal(false);
  readonly questionIndex = signal(0);
  readonly coins = signal(200);
  readonly builderQuestionIndex = signal(0);
  readonly builtBuildings = signal<Array<{ name: string; icon: string; cost: number }>>([]);
  readonly experimentIndex = signal(0);
  readonly selectedMaterials = signal<string[]>([]);
  readonly experimentResult = signal('Mesa de experimentación preparada');
  readonly racePlayer = signal(4);
  readonly raceRival = signal(4);
  readonly timeLeft = signal(10);
  readonly fuel = signal(65);
  readonly ecoHealth = signal(18);
  readonly clues = signal<string[]>([]);
  readonly playerHp = signal(100);
  readonly enemyHp = signal(100);
  readonly storyNode = signal('start');
  readonly storySteps = signal(0);
  feedbackType = 'Comentario';
  feedbackMessage = '';
  private phaserGame?: Phaser.Game;
  private raceTimer?: number;
  private missionQuestion = 0;

  readonly buildingShop = [
    { name: 'Casa solar', icon: '🏠', cost: 300 },
    { name: 'Biblioteca', icon: '🏛️', cost: 450 },
    { name: 'Observatorio', icon: '🔭', cost: 600 },
  ];
  readonly builderQuestions: QuizQuestion[] = [
    { prompt: 'Tienes 240 ladrillos y recibes 160. ¿Cuántos tienes?', options: ['300', '400', '420'], correct: 1, note: '+150 monedas: 240 + 160 = 400.' },
    { prompt: 'Un terreno cuesta 500 y tiene 20% de descuento. ¿Precio final?', options: ['400', '450', '480'], correct: 0, note: '+150 monedas: 20% de 500 son 100.' },
    { prompt: 'Una plaza cuadrada mide 8 m por lado. ¿Cuál es su área?', options: ['16 m²', '32 m²', '64 m²'], correct: 2, note: '+150 monedas: 8 × 8 = 64 m².' },
    { prompt: 'Repartes 720 monedas entre 6 equipos. ¿Cuánto recibe cada uno?', options: ['100', '120', '140'], correct: 1, note: '+150 monedas: 720 ÷ 6 = 120.' },
    { prompt: 'Dos mejoras cuestan 175 cada una. ¿Costo total?', options: ['250', '325', '350'], correct: 2, note: '+150 monedas: 175 + 175 = 350.' },
  ];
  readonly experiments = [
    { title: '¿Qué necesita una planta para crecer?', prompt: 'Selecciona los tres factores esenciales.', icon: '🌱', materials: ['💧 Agua', '☀️ Luz', '🪨 Nutrientes', '🎵 Música', '🧊 Hielo'], correct: ['💧 Agua', '☀️ Luz', '🪨 Nutrientes'], result: 'La semilla germinó y produjo hojas nuevas.' },
    { title: '¿Qué objetos son atraídos por un imán?', prompt: 'Selecciona todos los materiales magnéticos.', icon: '🧲', materials: ['📎 Clip de acero', '🪵 Madera', '🔩 Tornillo de hierro', '🧴 Plástico'], correct: ['📎 Clip de acero', '🔩 Tornillo de hierro'], result: 'El hierro y el acero respondieron al campo magnético.' },
    { title: '¿Qué permite formar una sombra?', prompt: 'Selecciona los elementos necesarios.', icon: '🔦', materials: ['🔦 Fuente de luz', '⚫ Objeto opaco', '⬜ Pantalla', '💨 Viento'], correct: ['🔦 Fuente de luz', '⚫ Objeto opaco', '⬜ Pantalla'], result: 'La luz bloqueada proyectó una sombra sobre la pantalla.' },
  ];
  private readonly missionQuestions = [
    { text: '18 + 27', answers: [35, 45, 55], correct: 45 },
    { text: '70 − 34', answers: [34, 36, 46], correct: 36 },
    { text: '7 × 8', answers: [54, 56, 64], correct: 56 },
    { text: '48 ÷ 6', answers: [6, 8, 12], correct: 8 },
    { text: '5 × 12 − 10', answers: [40, 50, 60], correct: 50 },
  ];

  readonly quizQuestions: QuizQuestion[];
  readonly currentQuestion = computed(() => this.quizQuestions[this.questionIndex()]);
  readonly currentBuilderQuestion = computed(() => this.builderQuestions[Math.min(this.builderQuestionIndex(), this.builderQuestions.length - 1)]);
  readonly currentExperiment = computed(() => this.experiments[Math.min(this.experimentIndex(), this.experiments.length - 1)]);
  readonly currentStoryNode = computed(() => STORY[this.storyNode()]);

  constructor(route: ActivatedRoute, private readonly zone: NgZone) {
    this.game = getGame(route.snapshot.paramMap.get('id'));
    this.quizQuestions = QUIZZES[this.game.id] ?? QUIZZES['carrera-operaciones'];
  }

  ngAfterViewInit() {
    if (this.game.id === 'mision-numerica') this.createMissionGame();
    if (this.game.id === 'carrera-operaciones') this.startRaceTimer();
  }
  ngOnDestroy() { this.phaserGame?.destroy(true); if (this.raceTimer) window.clearInterval(this.raceTimer); }

  statusLabel() {
    if (this.game.id === 'mision-numerica') return 'VIDAS';
    if (this.game.id === 'constructor-matematico') return 'MONEDAS';
    if (this.game.id === 'exploradores-universo') return 'COMBUSTIBLE';
    if (this.game.id === 'batalla-palabras') return 'ENERGÍA';
    return 'RACHA';
  }
  statusValue() {
    if (this.game.id === 'mision-numerica') return '❤️'.repeat(this.lives());
    if (this.game.id === 'constructor-matematico') return `🪙 ${this.coins()}`;
    if (this.game.id === 'exploradores-universo') return `⛽ ${this.fuel()}%`;
    if (this.game.id === 'batalla-palabras') return `💙 ${this.playerHp()}`;
    return `🔥 ${this.streak()}`;
  }

  answerQuiz(option: number) {
    const question = this.currentQuestion();
    if (!question || this.finished() || this.answerLocked()) return;
    this.answerLocked.set(true);
    if (this.game.id === 'carrera-operaciones' && this.raceTimer) window.clearInterval(this.raceTimer);
    const correct = option === question.correct;
    this.lastCorrect.set(correct);
    this.message.set(correct ? question.note : `Aún no. ${question.note}`);
    if (correct) { this.score.update((value) => value + 100 + this.streak() * 15); this.streak.update((value) => value + 1); }
    else { this.streak.set(0); }

    if (this.game.id === 'carrera-operaciones') {
      this.racePlayer.update((value) => Math.min(100, value + (correct ? 24 : 7)));
      this.raceRival.update((value) => Math.min(100, value + (correct ? 13 : 25)));
    } else if (this.game.id === 'exploradores-universo') {
      this.fuel.update((value) => Math.max(0, Math.min(100, value + (correct ? 9 : -14))));
    } else if (this.game.id === 'rescate-ecosistema') {
      this.ecoHealth.update((value) => Math.max(0, Math.min(100, value + (correct ? 22 : -6))));
    } else if (this.game.id === 'detective-historias' && correct) {
      this.clues.update((clues) => [...clues, question.note.split(':')[0]]);
    } else if (this.game.id === 'batalla-palabras') {
      if (correct) this.enemyHp.update((value) => Math.max(0, value - 25));
      else this.playerHp.update((value) => Math.max(0, value - 20));
    }

    const next = this.questionIndex() + 1;
    this.progress.set(Math.round((next / this.quizQuestions.length) * 100));
    this.level.set(Math.min(3, Math.floor(next / 2) + 1));
    window.setTimeout(() => {
      if (next >= this.quizQuestions.length || this.playerHp() <= 0 || this.fuel() <= 0) this.finished.set(true);
      else { this.questionIndex.set(next); this.message.set('Elige la mejor respuesta.'); this.answerLocked.set(false); if (this.game.id === 'carrera-operaciones') this.startRaceTimer(); }
    }, 650);
  }

  answerBuilder(option: number) {
    if (this.answerLocked()) return;
    this.answerLocked.set(true);
    const question = this.currentBuilderQuestion();
    const correct = option === question.correct;
    this.lastCorrect.set(correct); this.message.set(correct ? question.note : `Revisa tu cálculo. ${question.note.replace('+150 monedas: ', '')}`);
    if (correct) { this.coins.update((value) => value + 150); this.score.update((value) => value + 100); this.streak.update((value) => value + 1); }
    else this.streak.set(0);
    const next = (this.builderQuestionIndex() + 1) % this.builderQuestions.length;
    window.setTimeout(() => { this.builderQuestionIndex.set(next); this.answerLocked.set(false); }, 550);
    this.progress.set(Math.min(95, this.builtBuildings().length * 33 + next * 5));
  }

  wasBuilt(name: string) { return this.builtBuildings().some((item) => item.name === name); }
  build(item: { name: string; icon: string; cost: number }) {
    if (this.coins() < item.cost || this.wasBuilt(item.name)) return;
    this.coins.update((value) => value - item.cost); this.builtBuildings.update((items) => [...items, item]); this.score.update((value) => value + item.cost);
    this.message.set(`${item.icon} ¡${item.name} se sumó a tu ciudad!`); this.lastCorrect.set(true);
    this.progress.set(this.builtBuildings().length * 33.34); this.level.set(this.builtBuildings().length);
    if (this.builtBuildings().length === this.buildingShop.length) this.finished.set(true);
  }

  toggleMaterial(material: string) {
    this.selectedMaterials.update((items) => items.includes(material) ? items.filter((item) => item !== material) : [...items, material]);
  }
  checkExperiment() {
    const experiment = this.currentExperiment();
    const chosen = [...this.selectedMaterials()].sort(); const expected = [...experiment.correct].sort();
    const correct = chosen.length === expected.length && chosen.every((item, index) => item === expected[index]);
    this.lastCorrect.set(correct);
    if (!correct) { this.message.set('La combinación no produce el resultado esperado. Ajusta los materiales.'); this.streak.set(0); return; }
    this.message.set('¡Hipótesis confirmada!'); this.experimentResult.set(experiment.result); this.score.update((value) => value + 250); this.streak.update((value) => value + 1);
    const next = this.experimentIndex() + 1; this.progress.set(Math.round((next / this.experiments.length) * 100)); this.level.set(next);
    window.setTimeout(() => { if (next >= this.experiments.length) this.finished.set(true); else { this.experimentIndex.set(next); this.selectedMaterials.set([]); this.experimentResult.set('Nuevo protocolo cargado'); this.message.set('Selecciona los materiales.'); } }, 900);
  }

  chooseStory(choice: StoryChoice) {
    this.storyNode.set(choice.next); this.storySteps.update((value) => value + 1); this.score.update((value) => value + 100); this.progress.set(Math.min(100, this.storySteps() * 50)); this.level.set(Math.min(3, this.storySteps() + 1));
  }

  restartGame() {
    this.phaserGame?.destroy(true); this.phaserGame = undefined; this.missionQuestion = 0;
    this.score.set(0); this.streak.set(0); this.level.set(1); this.progress.set(0); this.lives.set(3); this.finished.set(false); this.message.set('Elige una respuesta para comenzar.'); this.lastCorrect.set(false); this.answerLocked.set(false); this.questionIndex.set(0);
    this.coins.set(200); this.builderQuestionIndex.set(0); this.builtBuildings.set([]); this.experimentIndex.set(0); this.selectedMaterials.set([]); this.experimentResult.set('Mesa de experimentación preparada'); this.racePlayer.set(4); this.raceRival.set(4); this.timeLeft.set(10); this.fuel.set(65); this.ecoHealth.set(18); this.clues.set([]); this.playerHp.set(100); this.enemyHp.set(100); this.storyNode.set('start'); this.storySteps.set(0);
    if (this.game.id === 'mision-numerica') window.setTimeout(() => this.createMissionGame());
    if (this.game.id === 'carrera-operaciones') this.startRaceTimer();
  }

  finishIcon() { return this.playerHp() <= 0 || this.fuel() <= 0 ? '💪' : '🏆'; }
  finishTitle() {
    if (this.playerHp() <= 0 || this.fuel() <= 0) return '¡Buen intento!';
    if (this.game.id === 'constructor-matematico') return '¡Ciudad completada!';
    if (this.game.id === 'laboratorio-brainboost') return '¡Laboratorio nivel 3!';
    if (this.game.id === 'rescate-ecosistema') return '¡Ecosistema recuperado!';
    if (this.game.id === 'detective-historias') return '¡Caso resuelto!';
    if (this.game.id === 'batalla-palabras') return '¡Guardián derrotado!';
    if (this.game.id === 'carrera-operaciones') return this.racePlayer() >= this.raceRival() ? '¡Ganaste la carrera!' : '¡Final de fotografía!';
    return '¡Misión completada!';
  }
  finishMessage() { return `${this.game.reward} Terminaste con ${this.score()} puntos.`; }

  submitFeedback() { this.feedbackOpen.set(false); this.feedbackSent.set(true); this.feedbackMessage = ''; window.setTimeout(() => this.feedbackSent.set(false), 3000); }

  private startRaceTimer() {
    if (this.raceTimer) window.clearInterval(this.raceTimer);
    this.timeLeft.set(10);
    this.raceTimer = window.setInterval(() => {
      this.timeLeft.update((value) => value - 1);
      if (this.timeLeft() > 0) return;
      window.clearInterval(this.raceTimer); this.answerLocked.set(true); this.lastCorrect.set(false); this.message.set('¡Tiempo! Tu rival aprovecha para acelerar.'); this.streak.set(0); this.raceRival.update((value) => Math.min(100, value + 25));
      const next = this.questionIndex() + 1; this.progress.set(Math.round((next / this.quizQuestions.length) * 100));
      window.setTimeout(() => { if (next >= this.quizQuestions.length || this.raceRival() >= 100) this.finished.set(true); else { this.questionIndex.set(next); this.answerLocked.set(false); this.startRaceTimer(); } }, 650);
    }, 1000);
  }

  private createMissionGame() {
    if (!this.gameContainer || typeof Phaser === 'undefined') return;
    const component = this;
    class MissionScene extends Phaser.Scene {
      questionText?: Phaser.GameObjects.Text; feedbackText?: Phaser.GameObjects.Text; answerObjects: Phaser.GameObjects.GameObject[] = [];
      locked = false;
      constructor() { super('numeric-mission'); }
      create() {
        const { width, height } = this.scale; this.cameras.main.setBackgroundColor('#17243a'); const graphics = this.add.graphics();
        graphics.fillStyle(0x5c8a3d, 1); graphics.fillEllipse(width / 2, height * .8, width * .9, 180); graphics.fillStyle(0x79acd4, 1); graphics.fillRect(0, height * .78, width, height * .22);
        for (let i = 0; i < 6; i++) { graphics.fillStyle(0xffffff, .7); graphics.fillCircle(80 + i * 170, 48 + (i % 2) * 22, 2); }
        this.add.text(width / 2, 32, 'ISLA DE LAS OPERACIONES', { fontFamily: 'Arial', fontSize: '13px', color: '#afc1e5', letterSpacing: 2 }).setOrigin(.5);
        this.add.text(65, height - 92, '🧭', { fontSize: '48px' }); this.add.text(width - 105, height - 112, '🏰', { fontSize: '62px' });
        this.questionText = this.add.text(width / 2, 112, '', { fontFamily: 'Arial', fontStyle: 'bold', fontSize: '46px', color: '#ffffff' }).setOrigin(.5);
        this.feedbackText = this.add.text(width / 2, height - 32, 'Abre el portal correcto', { fontFamily: 'Arial', fontSize: '16px', color: '#ffffff' }).setOrigin(.5); this.showQuestion();
      }
      showQuestion() {
        this.answerObjects.forEach((object) => object.destroy()); this.answerObjects = []; this.locked = false; const question = component.missionQuestions[component.missionQuestion]; if (!question) return;
        this.questionText?.setText(question.text + ' = ?'); this.feedbackText?.setText(`Puerta ${component.missionQuestion + 1} de 5`).setColor('#ffffff'); const { width } = this.scale;
        question.answers.forEach((answer, index) => { const x = width / 2 + (index - 1) * 160; const y = 270; const portal = this.add.rectangle(x, y, 112, 124, 0x395278, 1).setStrokeStyle(5, 0xafc1e5).setInteractive({ useHandCursor: true }); const text = this.add.text(x, y, String(answer), { fontFamily: 'Arial', fontStyle: 'bold', fontSize: '30px', color: '#ffffff' }).setOrigin(.5); portal.on('pointerover', () => portal.setScale(1.05)); portal.on('pointerout', () => portal.setScale(1)); portal.on('pointerdown', () => this.choose(answer, portal)); this.answerObjects.push(portal, text); });
      }
      choose(answer: number, portal: Phaser.GameObjects.Rectangle) {
        if (this.locked) return;
        const question = component.missionQuestions[component.missionQuestion];
        if (answer === question.correct) { this.locked = true; portal.setFillStyle(0xa2d149); this.feedbackText?.setText('¡Camino desbloqueado! +100').setColor('#a2d149'); component.zone.run(() => { component.score.update((v) => v + 100 + component.streak() * 20); component.streak.update((v) => v + 1); component.missionQuestion++; component.progress.set(component.missionQuestion * 20); component.level.set(Math.min(3, Math.floor(component.missionQuestion / 2) + 1)); }); this.time.delayedCall(700, () => { if (component.missionQuestion >= component.missionQuestions.length) component.zone.run(() => component.finished.set(true)); else this.showQuestion(); }); }
        else { portal.setFillStyle(0xff3b3f); this.feedbackText?.setText('Ese portal está cerrado. Pierdes una vida.').setColor('#ff8c42'); component.zone.run(() => { component.lives.update((v) => Math.max(0, v - 1)); component.streak.set(0); if (component.lives() === 0) component.finished.set(true); }); this.time.delayedCall(500, () => portal.setFillStyle(0x395278)); }
      }
    }
    this.zone.runOutsideAngular(() => { this.phaserGame = new Phaser.Game({ type: Phaser.AUTO, parent: this.gameContainer!.nativeElement, width: 900, height: 470, backgroundColor: '#17243a', scene: MissionScene, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, render: { antialias: true } }); });
  }
}

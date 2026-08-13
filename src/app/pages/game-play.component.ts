import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type PhaserTypes from 'phaser';
import { getGame } from '../core/game-data';

declare const Phaser: typeof PhaserTypes;

@Component({
  selector: 'app-game-play',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="play-page"><div class="container play-topbar"><a [routerLink]="['/games', game.id]">← Salir de la misión</a><div><span>{{ game.icon }}</span><strong>{{ game.title }}</strong></div><button type="button" (click)="instructionsOpen.set(!instructionsOpen())">? Instrucciones</button></div>
      <div class="container scoreboard"><div><small>NIVEL</small><strong>{{ level() }} / 3</strong></div><div class="progress-track"><span [style.width.%]="progress()"></span></div><div><small>PUNTOS</small><strong>{{ score() }}</strong></div><div><small>RACHA</small><strong>🔥 {{ streak() }}</strong></div></div>
      @if (instructionsOpen()) { <div class="container instruction-banner"><span>💡</span><p><strong>Cómo jugar:</strong> observa la operación y toca el portal con la respuesta correcta. Completa cinco retos para terminar la misión.</p><button type="button" (click)="instructionsOpen.set(false)" aria-label="Cerrar">×</button></div> }
      <div class="container game-shell"><div #gameContainer class="phaser-game" aria-label="Juego interactivo de multiplicaciones"></div>@if (finished()) {<div class="game-complete"><span>🏆</span><h2>¡Misión completada!</h2><p>Recuperaste todas las estrellas con {{ score() }} puntos.</p><button class="button button-primary" type="button" (click)="restartGame()">Jugar de nuevo</button></div>}</div>
      <div class="container play-help"><div><strong>¿Algo no funciona?</strong><span>Tu opinión nos ayuda a mejorar cada aventura.</span></div><button type="button" (click)="feedbackOpen.set(!feedbackOpen())">⚑ Enviar comentarios</button></div>
      @if (feedbackOpen()) { <div class="container feedback-panel"><h3>Cuéntanos qué pasó</h3><label>Tipo<select [(ngModel)]="feedbackType"><option>Comentario</option><option>Problema técnico</option><option>Contenido incorrecto</option></select></label><label>Mensaje<textarea [(ngModel)]="feedbackMessage" placeholder="Describe tu experiencia..."></textarea></label><div><button type="button" class="button button-primary button-small" (click)="submitFeedback()">Enviar</button><button type="button" class="button button-small button-ghost" (click)="feedbackOpen.set(false)">Cancelar</button></div></div> }
      @if (feedbackSent()) { <div class="toast">✓ Gracias. Recibimos tu mensaje.</div> }
    </section>
  `,
})
export class GamePlayComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameContainer') gameContainer!: ElementRef<HTMLDivElement>;
  readonly game;
  readonly score = signal(0);
  readonly streak = signal(0);
  readonly level = signal(1);
  readonly progress = signal(0);
  readonly instructionsOpen = signal(true);
  readonly feedbackOpen = signal(false);
  readonly feedbackSent = signal(false);
  readonly finished = signal(false);
  feedbackType = 'Comentario';
  feedbackMessage = '';
  private phaserGame?: Phaser.Game;
  private currentQuestion = 0;

  private readonly questions = [
    { text: '6 × 4', answers: [18, 24, 28], correct: 24 },
    { text: '7 × 8', answers: [54, 56, 64], correct: 56 },
    { text: '9 × 3', answers: [27, 21, 36], correct: 27 },
    { text: '8 × 6', answers: [42, 48, 56], correct: 48 },
    { text: '12 × 5', answers: [50, 60, 70], correct: 60 },
  ];

  constructor(route: ActivatedRoute, private readonly zone: NgZone) {
    this.game = getGame(route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() { this.createGame(); }
  ngOnDestroy() { this.phaserGame?.destroy(true); }

  restartGame() {
    this.currentQuestion = 0; this.score.set(0); this.streak.set(0); this.level.set(1); this.progress.set(0); this.finished.set(false);
    this.phaserGame?.destroy(true); this.createGame();
  }

  submitFeedback() {
    this.feedbackOpen.set(false); this.feedbackSent.set(true); this.feedbackMessage = '';
    window.setTimeout(() => this.feedbackSent.set(false), 3000);
  }

  private createGame() {
    const component = this;
    class MissionScene extends Phaser.Scene {
      questionText?: Phaser.GameObjects.Text;
      feedbackText?: Phaser.GameObjects.Text;
      answerObjects: Phaser.GameObjects.GameObject[] = [];

      constructor() { super('mission'); }
      create() {
        const { width, height } = this.scale;
        this.cameras.main.setBackgroundColor('#131e30');
        const graphics = this.add.graphics();
        for (let i = 0; i < 60; i++) {
          const alpha = 0.25 + Math.random() * 0.65;
          graphics.fillStyle(i % 8 === 0 ? 0xA2D149 : 0xffffff, alpha);
          graphics.fillCircle(Math.random() * width, Math.random() * height, i % 9 === 0 ? 2 : 1);
        }
        graphics.fillStyle(0x253c62, 1); graphics.fillCircle(width * 0.12, height * 0.22, 64);
        graphics.fillStyle(0x8E44AD, 0.8); graphics.fillCircle(width * 0.9, height * 0.84, 105);
        this.add.text(width / 2, 36, 'PORTAL DE MULTIPLICACIÓN', { fontFamily: 'Arial', fontSize: '13px', color: '#afc1e5', letterSpacing: 2 }).setOrigin(0.5);
        this.questionText = this.add.text(width / 2, 118, '', { fontFamily: 'Arial', fontStyle: 'bold', fontSize: '48px', color: '#ffffff' }).setOrigin(0.5);
        this.feedbackText = this.add.text(width / 2, height - 48, 'Elige el portal correcto', { fontFamily: 'Arial', fontSize: '16px', color: '#afc1e5' }).setOrigin(0.5);
        this.showQuestion();
      }
      showQuestion() {
        this.answerObjects.forEach((object) => object.destroy()); this.answerObjects = [];
        const question = component.questions[component.currentQuestion];
        if (!question) return;
        this.questionText?.setText(question.text + ' = ?'); this.feedbackText?.setText('Elige el portal correcto').setColor('#afc1e5');
        const { width } = this.scale;
        question.answers.forEach((answer, index) => {
          const x = width / 2 + (index - 1) * 150; const y = 275;
          const portal = this.add.circle(x, y, 52, index === 1 ? 0x8E44AD : 0x395278, 1).setStrokeStyle(4, index === 1 ? 0xB47BD0 : 0x6F88AE).setInteractive({ useHandCursor: true });
          const text = this.add.text(x, y, String(answer), { fontFamily: 'Arial', fontStyle: 'bold', fontSize: '28px', color: '#ffffff' }).setOrigin(0.5);
          portal.on('pointerover', () => portal.setScale(1.08)); portal.on('pointerout', () => portal.setScale(1)); portal.on('pointerdown', () => this.chooseAnswer(answer, portal));
          this.tweens.add({ targets: [portal, text], y: y - 8, duration: 1000 + index * 150, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
          this.answerObjects.push(portal, text);
        });
      }
      chooseAnswer(answer: number, portal: Phaser.GameObjects.Arc) {
        const question = component.questions[component.currentQuestion];
        if (answer === question.correct) {
          portal.setFillStyle(0xA2D149); this.feedbackText?.setText('¡Correcto! +100 puntos').setColor('#A2D149');
          component.zone.run(() => { component.score.update((value) => value + 100 + component.streak() * 20); component.streak.update((value) => value + 1); component.currentQuestion++; component.progress.set(component.currentQuestion * 20); component.level.set(Math.min(3, Math.floor(component.currentQuestion / 2) + 1)); });
          this.time.delayedCall(800, () => { if (component.currentQuestion >= component.questions.length) component.zone.run(() => component.finished.set(true)); else this.showQuestion(); });
        } else {
          portal.setFillStyle(0xFF3B3F); this.feedbackText?.setText('Casi… prueba otro portal').setColor('#FF8C42');
          component.zone.run(() => component.streak.set(0)); this.time.delayedCall(550, () => portal.setFillStyle(0x395278));
        }
      }
    }
    this.zone.runOutsideAngular(() => {
      this.phaserGame = new Phaser.Game({ type: Phaser.AUTO, parent: this.gameContainer.nativeElement, width: 900, height: 470, backgroundColor: '#131e30', scene: MissionScene, scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }, render: { antialias: true } });
    });
  }
}

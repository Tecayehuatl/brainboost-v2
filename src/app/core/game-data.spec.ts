import { describe, expect, it } from 'vitest';
import { GAMES } from './game-data';

describe('BrainBoost game catalog', () => {
  it('contains every requested game without duplicate ids', () => {
    const requested = [
      'mision-numerica', 'constructor-matematico', 'carrera-operaciones',
      'laboratorio-brainboost', 'exploradores-universo', 'rescate-ecosistema',
      'detective-historias', 'crea-tu-aventura', 'batalla-palabras',
    ];
    const ids = GAMES.map((game) => game.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(requested));
  });

  it('keeps the two original non-overlapping games', () => {
    expect(GAMES.map((game) => game.id)).toEqual(
      expect.arrayContaining(['fracciones-en-pizza', 'viaje-celular']),
    );
  });
});

export type GameCategory = 'Matemáticas' | 'Ciencias' | 'Lectura';

export interface GameInfo {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  level: string;
  duration: string;
  players: string;
  rating: string;
  icon: string;
  color: string;
  featured?: boolean;
}

export const GAMES: GameInfo[] = [
  {
    id: 'mision-multiplica', title: 'Misión Multiplica', category: 'Matemáticas',
    description: 'Cruza la galaxia resolviendo multiplicaciones y recupera las estrellas perdidas.',
    level: '8–12 años', duration: '10 min', players: '12.4k', rating: '4.9', icon: '🚀', color: 'orange', featured: true,
  },
  {
    id: 'fracciones-en-pizza', title: 'Fracciones en Pizza', category: 'Matemáticas',
    description: 'Prepara pedidos deliciosos mientras dominas fracciones equivalentes.',
    level: '9–13 años', duration: '8 min', players: '8.1k', rating: '4.8', icon: '🍕', color: 'red',
  },
  {
    id: 'laboratorio-loco', title: 'Laboratorio Loco', category: 'Ciencias',
    description: 'Combina elementos, predice reacciones y conviértete en mente científica.',
    level: '10–14 años', duration: '12 min', players: '9.7k', rating: '4.9', icon: '🧪', color: 'green',
  },
  {
    id: 'viaje-celular', title: 'Viaje Celular', category: 'Ciencias',
    description: 'Hazte diminuto y explora los secretos de una célula viva.',
    level: '11–14 años', duration: '14 min', players: '6.3k', rating: '4.7', icon: '🔬', color: 'purple',
  },
  {
    id: 'detectives-de-palabras', title: 'Detectives de Palabras', category: 'Lectura',
    description: 'Encuentra pistas, comprende textos y resuelve un misterio literario.',
    level: '8–12 años', duration: '10 min', players: '10.2k', rating: '4.8', icon: '🔎', color: 'purple',
  },
  {
    id: 'cuentos-al-rescate', title: 'Cuentos al Rescate', category: 'Lectura',
    description: 'Ordena historias, elige finales y fortalece tu comprensión lectora.',
    level: '7–11 años', duration: '9 min', players: '7.4k', rating: '4.7', icon: '📚', color: 'green',
  },
];

export const getGame = (id: string | null) => GAMES.find((game) => game.id === id) ?? GAMES[0];


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
  objective: string;
  reward: string;
  instructions: [string, string, string];
  featured?: boolean;
}

export const GAMES: GameInfo[] = [
  {
    id: 'mision-numerica', title: 'Misión Numérica', category: 'Matemáticas',
    description: 'Avanza por un mapa de islas superando puertas, puentes y guardianes con cálculo mental.',
    level: '8–12 años', duration: '10 min', players: '12.4k', rating: '4.9', icon: '🗺️', color: 'orange', featured: true,
    objective: 'Refuerza cálculo mental, operaciones básicas y resolución rápida de problemas.',
    reward: 'Desbloquea nuevas zonas, insignias y multiplicadores de racha.',
    instructions: ['Observa la operación que protege el camino.', 'Elige el portal con la respuesta correcta.', 'Supera cinco puertas sin perder tus tres vidas.'],
  },
  {
    id: 'constructor-matematico', title: 'Constructor Matemático', category: 'Matemáticas',
    description: 'Resuelve problemas, administra tus monedas y construye una ciudad que crece contigo.',
    level: '9–13 años', duration: '12 min', players: '8.9k', rating: '4.8', icon: '🏗️', color: 'green',
    objective: 'Aplica cálculo, porcentajes, geometría y administración básica de recursos.',
    reward: 'Cada respuesta aporta monedas para desbloquear edificios y mejoras.',
    instructions: ['Resuelve encargos para ganar monedas.', 'Compara costos y elige qué edificio comprar.', 'Construye tres edificios para completar tu ciudad.'],
  },
  {
    id: 'carrera-operaciones', title: 'Carrera de Operaciones', category: 'Matemáticas',
    description: 'Acelera tu vehículo contestando operaciones antes de que tu rival llegue a la meta.',
    level: '8–12 años', duration: '6 min', players: '11.1k', rating: '4.9', icon: '🏎️', color: 'red',
    objective: 'Mejora velocidad de cálculo y reconocimiento de operaciones matemáticas.',
    reward: 'Supera tu récord, consigue impulsos y gana la copa de cada circuito.',
    instructions: ['Resuelve cada operación del tablero.', 'Cada acierto impulsa tu auto; un error adelanta al rival.', 'Llega al 100% antes que el vehículo contrario.'],
  },
  {
    id: 'fracciones-en-pizza', title: 'Fracciones en Pizza', category: 'Matemáticas',
    description: 'Prepara pedidos deliciosos mientras dominas fracciones equivalentes.',
    level: '9–13 años', duration: '8 min', players: '8.1k', rating: '4.8', icon: '🍕', color: 'red',
    objective: 'Reconoce, compara y representa fracciones equivalentes.',
    reward: 'Completa pedidos para mantener la satisfacción de tu pizzería.',
    instructions: ['Lee el pedido de la mesa.', 'Elige la fracción de pizza equivalente.', 'Completa cuatro pedidos para cerrar el turno.'],
  },
  {
    id: 'laboratorio-brainboost', title: 'Laboratorio BrainBoost', category: 'Ciencias',
    description: 'Combina materiales, prueba hipótesis y observa relaciones de causa y efecto.',
    level: '9–13 años', duration: '12 min', players: '9.7k', rating: '4.9', icon: '🧪', color: 'green',
    objective: 'Comprende conceptos científicos mediante experimentación virtual.',
    reward: 'Cada experimento exitoso desbloquea materiales y un laboratorio más avanzado.',
    instructions: ['Lee la pregunta de investigación.', 'Selecciona todos los materiales necesarios.', 'Comprueba tu hipótesis y completa tres experimentos.'],
  },
  {
    id: 'exploradores-universo', title: 'Exploradores del Universo', category: 'Ciencias',
    description: 'Viaja por planetas, repara tu nave y resuelve misiones de astronomía y naturaleza.',
    level: '10–14 años', duration: '14 min', players: '10.5k', rating: '4.9', icon: '🪐', color: 'purple',
    objective: 'Aprende astronomía, física, biología y ciencias naturales en contexto.',
    reward: 'Descubre mundos, reúne muestras y conserva el combustible de tu nave.',
    instructions: ['Lee el informe de cada planeta.', 'Selecciona la explicación científica correcta.', 'Completa cuatro destinos antes de agotar el combustible.'],
  },
  {
    id: 'rescate-ecosistema', title: 'Rescate del Ecosistema', category: 'Ciencias',
    description: 'Toma decisiones para recuperar un río, un bosque y las especies que los habitan.',
    level: '9–13 años', duration: '11 min', players: '8.6k', rating: '4.8', icon: '🌿', color: 'green',
    objective: 'Comprende ecología, biodiversidad, hábitats y cuidado ambiental.',
    reward: 'El paisaje recupera color, plantas y animales con cada decisión acertada.',
    instructions: ['Observa el problema del ecosistema.', 'Elige la intervención más responsable.', 'Recupera las cuatro zonas hasta alcanzar salud total.'],
  },
  {
    id: 'viaje-celular', title: 'Viaje Celular', category: 'Ciencias',
    description: 'Hazte diminuto y explora los secretos de una célula viva.',
    level: '11–14 años', duration: '14 min', players: '6.3k', rating: '4.7', icon: '🔬', color: 'purple',
    objective: 'Identifica organelos y comprende sus funciones principales.',
    reward: 'Registra cada organelo descubierto en tu bitácora microscópica.',
    instructions: ['Lee la función celular solicitada.', 'Elige el organelo responsable.', 'Completa cuatro descubrimientos para salir de la célula.'],
  },
  {
    id: 'detective-historias', title: 'Detective de Historias', category: 'Lectura',
    description: 'Lee un caso, encuentra evidencia en el texto y resuelve el misterio.',
    level: '8–12 años', duration: '10 min', players: '10.2k', rating: '4.9', icon: '🔎', color: 'purple',
    objective: 'Mejora comprensión, identificación de información e inferencia.',
    reward: 'Cada respuesta revela una pista hasta descubrir al responsable.',
    instructions: ['Lee con atención el expediente.', 'Responde usando información o inferencias del texto.', 'Reúne cuatro pistas para resolver el caso.'],
  },
  {
    id: 'crea-tu-aventura', title: 'Crea tu Aventura', category: 'Lectura',
    description: 'Toma decisiones dentro de una historia y descubre finales completamente distintos.',
    level: '8–12 años', duration: '9 min', players: '9.4k', rating: '4.8', icon: '📖', color: 'orange',
    objective: 'Fomenta lectura comprensiva, interpretación y pensamiento crítico.',
    reward: 'Descubre finales secretos y vuelve a jugar para completar el mapa narrativo.',
    instructions: ['Lee cada escena antes de decidir.', 'Elige la acción que mejor represente tu estrategia.', 'Llega a un final y vuelve a jugar para descubrir otro.'],
  },
  {
    id: 'batalla-palabras', title: 'Batalla de Palabras', category: 'Lectura',
    description: 'Derrota criaturas con vocabulario, sinónimos, ortografía y comprensión.',
    level: '9–13 años', duration: '8 min', players: '11.8k', rating: '4.9', icon: '⚔️', color: 'red',
    objective: 'Amplía vocabulario y fortalece ortografía y comprensión del lenguaje.',
    reward: 'Encadena palabras correctas para activar poderes y vencer al Guardián del Caos.',
    instructions: ['Lee el reto que lanza el enemigo.', 'Elige la palabra correcta para atacar.', 'Reduce su energía a cero antes de perder la tuya.'],
  },
];

export const getGame = (id: string | null) => GAMES.find((game) => game.id === id) ?? GAMES[0];

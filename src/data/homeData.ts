import { AnimeData, Episode, HomeSection, HomeSectionType } from '../types/anime';
import { getAnimeById } from './animeData';

// Estructura para las secciones del Home
interface HomeSections {
  recommendations: AnimeData[];
  featured: AnimeData[];
  seasonDubs: AnimeData[];
  recentlyAdded: AnimeData[];
  trending: AnimeData[];
  upcoming: AnimeData[];
}

// Episodios nuevos organizados por día
interface DailyEpisodes {
  today: Episode[];
  yesterday: Episode[];
}

// Estado inicial
let dailyEpisodes: DailyEpisodes = {
  today: [
    {
      id: 1,
      animeId: 'solo-leveling',
      number: 16,
      title: 'Tengo que dejar de fingir',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/4a4151b0dcf46207ca9b171b9ac345e5.jpg',
      hoverThumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/9b05cfa6ea5183e13a8456fed1908357.jpg',
      duration: '23:00',
      description: 'Sung Jinwoo realiza otro examen para recalcular su rango y los resultados sorprenden a todos los presentes, incluido un Cazador muy importante.',
      releaseDate: '2025-01-25',
      videoUrl: '/ver/solo-leveling/'
    },
    {
      id: 2,
      animeId: 'Dr-stone',
      number: 8,
      title: 'La ciencia del futuro',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/39344f47fe32a4aeeaf4932683eb722d.jpg',
      hoverThumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/c3407890525d516062576181edc69e33.jpg',
      duration: '23:45',
      description: 'Senku y sus amigos descubren un nuevo avance científico que podría cambiar el futuro de la humanidad.',
      releaseDate: '2024-03-23',
      videoUrl: '/ver/dr-stone/8'
    }
  ],
  yesterday: [
    {
      id: 3,
      animeId: 'solo-leveling',
      number: 12,
      title: 'El poder del cazador',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/cda77a98de7021522ebb5f0cc9bebd7d.jpe',
      hoverThumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/66e3cabc8e0557f77c93c24178e7a5cd.jpe',
      duration: '24:00',
      description: 'Jinwoo enfrenta su prueba más difícil hasta ahora mientras intenta dominar sus nuevos poderes.',
      releaseDate: '2024-03-22',
      videoUrl: '/ver/solo-leveling/12'
    },
    {
      id: 4,
      animeId: 'Dr-stone',
      number: 7,
      title: 'El reino de la ciencia',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/c3407890525d516062576181edc69e33.jpg',
      hoverThumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=1200,height=675,quality=85/catalog/crunchyroll/ba4454c313d44737a3a72fc390bd2159.jpe',
      duration: '23:45',
      description: 'El reino de la ciencia enfrenta nuevos desafíos mientras Senku trabaja en su invento más ambicioso.',
      releaseDate: '2024-03-22',
      videoUrl: '/ver/dr-stone/7'
    }
  ]
};

let homeSections: HomeSections = {
  recommendations: [],
  featured: [],
  seasonDubs: [],
  recentlyAdded: [
    // Primer ejemplo de anime agregado recientemente
    {
      id: 'jujutsu-kaisen',
      title: 'Jujutsu Kaisen',
      image: 'https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/ebcd65fa9fb83580062e7052fa6ee5a5.jpe',
      banner: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1920/keyart/GRDV0019R-backdrop_wide',
      logo: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/keyart/GRDV0019R-logo',
      rating: 4.9,
      year: 2024,
      type: 'TV',
      status: 'En emisión',
      genres: ['Acción', 'Sobrenatural', 'Drama'],
      synopsis: 'Yuji Itadori es un estudiante de secundaria que vive en Sendai con su abuelo. A pesar de su talento natural para el deporte, evita regularmente el equipo de pista debido a su aversión al atletismo.',
      seasons: 2,
      episodes: 24,
      releaseDay: 'Jueves',
      languages: ['Sub', 'Dob'],
      creator: 'Gege Akutami',
      contentWarning: '+16 Violencia, Gore',
      trailerUrl: 'https://www.youtube.com/embed/4A_X-Dvl0ws',
      viewUrl: '/ver/jujutsu-kaisen'
    },
    // Segundo ejemplo de anime agregado recientemente
    {
      id: 'demon-slayer',
      title: 'Demon Slayer',
      image: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/765ee047befcfb677d169f5de4c82d5c.jpg',
      banner: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1920/keyart/GRDV0019R-backdrop_wide',
      logo: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/keyart/GRDV0019R-logo',
      rating: 4.8,
      year: 2024,
      type: 'TV',
      status: 'En emisión',
      genres: ['Acción', 'Fantasía', 'Drama'],
      synopsis: 'Tanjiro Kamado es un joven que se convierte en cazador de demonios después de que su familia es asesinada y su hermana es transformada en demonio.',
      seasons: 4,
      episodes: 24,
      releaseDay: 'Domingo',
      languages: ['Sub', 'Dob'],
      creator: 'Koyoharu Gotouge',
      contentWarning: '+16 Violencia',
      trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4',
      viewUrl: '/ver/demon-slayer'
    }
  ],
  trending: [],
  upcoming: []
};

// Funciones para gestionar las secciones

// Establecer animes en una sección
export const setHomeSection = (
  section: keyof HomeSections,
  animes: AnimeData[]
): void => {
  homeSections[section] = animes;
};

// Obtener animes de una sección
export const getHomeSection = (section: keyof HomeSections): AnimeData[] => {
  return homeSections[section];
};

// Agregar anime a una sección
export const addAnimeToSection = (
  section: keyof HomeSections,
  anime: AnimeData
): void => {
  homeSections[section] = [...homeSections[section], anime];
};

// Remover anime de una sección
export const removeAnimeFromSection = (
  section: keyof HomeSections,
  animeId: string
): void => {
  homeSections[section] = homeSections[section].filter(
    anime => anime.id !== animeId
  );
};

// Gestión de episodios nuevos

// Agregar nuevo episodio
export const addNewEpisode = (episode: Episode): void => {
  dailyEpisodes.yesterday = [...dailyEpisodes.today];
  dailyEpisodes.today = [episode, ...dailyEpisodes.today];
};

// Obtener episodios de hoy
export const getTodayEpisodes = (): Episode[] => {
  return dailyEpisodes.today;
};

// Obtener episodios de ayer
export const getYesterdayEpisodes = (): Episode[] => {
  return dailyEpisodes.yesterday;
};

// Ejemplos de uso

// Ejemplo 1: Agregar anime a recomendaciones
const soloLeveling = getAnimeById('solo-leveling');
if (soloLeveling) {
  addAnimeToSection('recommendations', soloLeveling);
}

// Ejemplo 2: Configurar sección de destacados
setHomeSection('featured', [
  getAnimeById('solo-leveling'),
  getAnimeById('your-name'),
  getAnimeById('Dr-stone'),
  getAnimeById('spy-x-family-season-2')
].filter((anime): anime is AnimeData => anime !== undefined));

// Ejemplo 3: Configurar sección de doblajes de temporada
const seasonDubs = [
  getAnimeById('solo-leveling'),
  getAnimeById('solo-leveling'),
  getAnimeById('Dr-stone'),
  getAnimeById('Dr-stone'),
  getAnimeById('Dr-stone'),
  getAnimeById('Dr-stone'),
  getAnimeById('Dr-stone'),
].filter((anime): anime is AnimeData => anime !== undefined);

setHomeSection('seasonDubs', seasonDubs);

// Ejemplo 4: Configurar sección de próximos estrenos
const upcomingAnimes = [
  getAnimeById('spy-x-family-season-2'),
].filter((anime): anime is AnimeData => anime !== undefined);

setHomeSection('upcoming', upcomingAnimes);
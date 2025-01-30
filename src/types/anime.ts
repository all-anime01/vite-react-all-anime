// Tipos de datos para el sistema de animes

// Tipo principal para los datos de anime
export interface AnimeData {
  id: string;                    // Identificador único del anime
  title: string;                 // Título del anime
  image: string;                 // Imagen principal/poster
  banner?: string;               // Banner para hero sections (opcional)
  logo?: string;                 // Logo del anime (opcional)
  rating: number;                // Calificación (0-5)
  year: number;                  // Año de lanzamiento
  type: 'TV' | 'Película' | 'OVA' | 'ONA' | 'Especial';  // Tipo de anime
  status: 'En emisión' | 'Finalizado' | 'Próximamente';   // Estado actual
  genres: string[];              // Lista de géneros
  synopsis: string;              // Sinopsis/descripción
  duration?: string;             // Duración (para películas)
  episodes?: number;             // Número de episodios (para series)
  seasons?: number;              // Número de temporadas
  releaseDay?: string;          // Día de emisión de nuevos episodios
  languages?: string[];         // Idiomas disponibles
  creator?: string;             // Creador/autor original
  contentWarning?: string;      // Advertencia de contenido
  trailerUrl?: string;         // URL del trailer
  viewUrl?: string;            // URL para ver el anime
}

// Tipo para episodios individuales
export interface Episode {
  id: number;                   // ID único del episodio
  animeId: string;             // ID del anime al que pertenece
  number: number;              // Número de episodio
  title: string;               // Título del episodio
  thumbnail: string;           // Miniatura del episodio
  hoverThumbnail: string;      // Miniatura al hacer hover
  duration: string;            // Duración del episodio
  description: string;         // Descripción del episodio
  releaseDate: string;         // Fecha de lanzamiento
  videoUrl: string;           // URL del video
}

// Tipo para secciones de la página principal
export interface HomeSection {
  id: string;                  // ID de la sección
  title: string;              // Título de la sección
  animes: AnimeData[];        // Lista de animes en la sección
}

// Tipos de secciones disponibles
export type HomeSectionType = 
  | 'recommendations'          // Recomendaciones
  | 'featured'                // Destacados
  | 'seasonDubs'             // Doblajes de temporada
  | 'recentlyAdded'          // Recientemente agregados
  | 'trending'               // Tendencias
  | 'upcoming';              // Próximos estrenos
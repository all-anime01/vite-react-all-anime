import { Play, Info, ChevronDown, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

// Datos de episodios organizados por temporadas
const allEpisodes = {
  4: [
    {
      id: 1,
      title: 'El Destino de la Familia',
      duration: '24 min',
      description: 'Tanjiro regresa a casa solo para encontrar una terrible tragedia.',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/ba4454c313d44737a3a72fc390bd2159.jpe',
      releaseDate: '2024-01-01',
      episodeNumber: 'S4:E1',
      videoUrl: '/ver/demon-slayer/temporada4/1'
    },
    {
      id: 2,
      title: 'El Camino del Cazador',
      duration: '24 min',
      description: 'Tanjiro comienza su entrenamiento como cazador de demonios.',
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/08ade842ca3ae544ccc5e4f6a207b529.jpe',
      releaseDate: '2024-01-08',
      episodeNumber: 'S4:E2',
      videoUrl: '/ver/demon-slayer/temporada4/2'
    }
  ]
};

function DemonSlayerTV() {
  const [selectedSeason, setSelectedSeason] = useState(4);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeView, setEpisodeView] = useState('list');

  useEffect(() => {
    document.title = 'Ver Demon Slayer Online | all-anime';
  }, []);

  // ... resto del código similar a otros archivos de series ...

  return (
    <div className="min-h-screen w-full bg-[#141414] text-white font-netflix overflow-x-hidden">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <img
          src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=cover,format=auto,quality=85,width=1920/keyart/GRDV0019R-backdrop_wide"
          alt="Demon Slayer"
          className="w-full h-full object-cover"
        />
        {/* ... resto del contenido del banner ... */}
      </div>

      {/* Sección de Episodios */}
      <section className="px-4 md:px-12 py-8 w-full">
        {/* ... contenido de episodios ... */}
      </section>

      {/* Modales */}
      {/* ... modales de episodio e información ... */}
    </div>
  );
}

export default DemonSlayerTV;
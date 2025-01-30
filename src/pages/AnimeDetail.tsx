import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star, Calendar, Clock, Languages } from 'lucide-react';

interface Episode {
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
}

export default function AnimeDetail() {
  const { id } = useParams();

  // Mock data - replace with actual API call
  const anime = {
    id,
    title: 'Demon Slayer: Kimetsu no Yaiba',
    image: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/keyart/GY5P48XEY-title_logo-en-us',
    banner: 'https://all-anime.net/image/Kimetsu-No-Yaiba-Mugen-Train-Pelicula/background.jpg',
    description: 'Un joven se convierte en cazador de demonios después de que su familia es asesinada y su hermana es transformada en demonio.',
    rating: 4.8,
    year: 2019,
    status: 'Finalizado',
    episodes: 26,
    duration: '24 min por ep.',
    genres: ['Acción', 'Fantasía', 'Histórico'],
    languages: ['Japonés', 'Latino', 'Castellano'],
    episodeList: Array.from({ length: 26 }, (_, i) => ({
      number: i + 1,
      title: `Episodio ${i + 1}`,
      thumbnail: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=480,height=720,quality=85/catalog/crunchyroll/765ee047befcfb677d169f5de4c82d5c.jpe',
      duration: '24:00'
    }))
  };

  useEffect(() => {
    document.title = `All-Anime - ${anime.title}`;
  }, [anime.title]);

  return (
    <div className="bg-[#1a1a1a]">
      {/* Banner */}
      <div className="relative h-[500px]">
        <img
          src={anime.banner}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>{anime.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{anime.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{anime.duration}</span>
              </div>
            </div>
            <p className="text-lg mb-6">{anime.description}</p>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold transition-colors">
              <Play className="w-5 h-5" />
              Reproducir
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#2a2a2a] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Información</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-400 mb-2">Estado</h3>
                  <p>{anime.status}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map(genre => (
                      <span
                        key={genre}
                        className="bg-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-2">Audio</h3>
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    <span>{anime.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Episodes */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Episodios</h2>
            <div className="grid gap-4">
              {anime.episodeList.map((episode: Episode) => (
                <div
                  key={episode.number}
                  className="bg-[#2a2a2a] rounded-lg overflow-hidden hover:bg-[#3a3a3a] transition-colors cursor-pointer"
                >
                  <div className="flex">
                    <div className="relative w-48">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">Episodio {episode.number}</h3>
                          <p className="text-sm text-gray-400">{episode.title}</p>
                        </div>
                        <span className="text-sm text-gray-400">{episode.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
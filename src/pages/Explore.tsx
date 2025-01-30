import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Star, Tv, Clock } from 'lucide-react';
import { AnimeData } from '../types/anime';
import { getAllAnime } from '../data/animeData';

const genres = [
  'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía',
  'Horror', 'Mecha', 'Música', 'Misterio', 'Romance',
  'Sci-Fi', 'Slice of Life', 'Deportes', 'Supernatural'
];

const years = Array.from({ length: 24 }, (_, i) => 2024 - i);
const types = ['TV', 'Película', 'OVA', 'ONA', 'Especial'];
const status = ['En emisión', 'Finalizado', 'Próximamente'];

export default function Explore() {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeData[]>(getAllAnime());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'All Anime - Explorar';
  }, []);

  useEffect(() => {
    let results = getAllAnime();

    if (searchQuery) {
      results = results.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      results = results.filter(anime =>
        selectedGenres.some(genre => anime.genres.includes(genre))
      );
    }

    if (selectedYear) {
      results = results.filter(anime => anime.year === parseInt(selectedYear));
    }

    if (selectedType) {
      results = results.filter(anime => anime.type === selectedType);
    }

    if (selectedStatus) {
      results = results.filter(anime => anime.status === selectedStatus);
    }

    setFilteredAnimes(results);
  }, [selectedGenres, selectedYear, selectedType, selectedStatus, searchQuery]);

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explorar Anime</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      {/* Filters */}
      <div className={`bg-[#2a2a2a] rounded-lg p-6 mb-8 transition-all ${showFilters ? 'block' : 'hidden'}`}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Géneros</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedGenres.includes(genre)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Año</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            >
              <option value="">Todos los años</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Tipo</h3>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            >
              <option value="">Todos los tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Estado</h3>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            >
              <option value="">Todos los estados</option>
              {status.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredAnimes.map(anime => (
          <div
            key={anime.id}
            className="relative group cursor-pointer"
            onClick={() => navigate(`/ver/${anime.id}`)}
          >
            <div className="quality-badge">1080p</div>
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
              <div className="absolute bottom-0 p-4">
                <h3 className="font-bold mb-2">{anime.title}</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{anime.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4" />
                    <span>{anime.seasons} Temporadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{anime.episodes} Episodios</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {anime.genres.map(genre => (
                    <span
                      key={genre}
                      className="text-xs bg-red-600 px-2 py-0.5 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm line-clamp-2">{anime.synopsis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
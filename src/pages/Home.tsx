import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Play, Bookmark, BookmarkCheck, Info, Plus, ChevronDown, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimeData } from '../types/anime';
import { getAllAnime } from '../data/animeData';
import { getHomeSection, getTodayEpisodes, getYesterdayEpisodes } from '../data/homeData';

const bannerData = [
  {
    id: 'solo-leveling',
    title: 'SOLO LEVELING',
    description: 'Para dominar sus nuevas habilidades en secreto, Jinwoo debe luchar contra los enemigos más duros de la humanidad para salvar a su madre.',
    image: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Solo%20Leveling/SEASON%202/ULTRA-WIDE/SoloLeveling-S2-KV1-UW-LTR.png',
    posterImage: 'https://a.storyblok.com/f/178900/1067x1601/0090e9bf15/solo-leveling-season-2-key-visual.png/m/filters:quality(95)format(webp)',
    logo: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/CurationAssets/Solo%20Leveling/SEASON%202/ULTRA-WIDE/SoloLeveling-S2-KV1-UW-Logo.png',
    rating: '16+',
    languages: ['Sub', 'Dob']
  },
  {
    id: 'dr-stone',
    title: 'DR. STONE',
    description: 'Senku y sus amigos continúan su viaje para restaurar la civilización mientras enfrentan nuevos desafíos y descubrimientos científicos.',
    image: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Dr%20STONE%20/SEASON%204/ULTRA-WIDE/DrSTONE-S4-KV1-UW-LTR.png',
    logo: 'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/CurationAssets/Dr%20STONE%20/SEASON%204/ULTRA-WIDE/DrSTONE-S4-KV1-UW-Logo-EN.png',
    rating: '16+',
    languages: ['Sub', 'Dob']
  },
  {
    id: 'Sakamoto-days',
    title: 'Sakamoto Days',
    description: 'Senku y sus amigos continúan su viaje para restaurar la civilización mientras enfrentan nuevos desafíos y descubrimientos científicos.',
    image: 'https://occ-0-1472-3933.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbERq_aL7Nej4e_fjN0OZY9qMp4g9JirfV5VKZgJr7FSdM7NE2i_1c3Nep4NDwnBo9r-a5_qAuko9O_FG-n4-oHa7oK1VDBwf8sn.jpg?r=acd',
    logo: 'https://occ-0-1472-3933.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABemKOWL1V4rv61wwalKNdi9che_5dUQD3KvcrCf-CHZWg3F8-e6KEvIYBMHanQPGS-ZzKnH9EwrXc_cP8udykMZLMVTVusZ_VQ.webp?r=0b2',
    rating: '16+',
    languages: ['Sub', 'Dob']
  },
  {
    id: "dragon-ball-daima",
    title: "Dragon Ball Daima",
    description: "Una nueva aventura de Goku y sus amigos en un formato más compacto y lleno de acción.",
    image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/cr/landscape_large/2f616fd9-28c0-4773-acdc-cbb4a12ee77a.png",
    logo: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/cr/logo/69975f73-97e1-40b6-a919-0d937e1a9005.png",
    rating: "12+",
    languages: ["Subtitulado"]
  },
  {
    id: "blue-exorcist",
    title: "Blue Exorcist",
    description: "Rin Okumura descubre que es el hijo de Satanás y decide convertirse en un exorcista para luchar contra su propio padre.",
    image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=cover,format=auto,quality=85,width=1920/keyart/G649PJ0JY-backdrop_wide",
    logo: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/CurationAssets/Blue%20Exorcist/SEASON%204/ULTRA-WIDE/BlueExorcist-S4C1-KV1-UW-Logo-ENG.png",
    rating: "14+",
    languages: ["Subtitulado"]
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTodayEpisodes, setShowTodayEpisodes] = useState(false);
  const [visibleAnimes, setVisibleAnimes] = useState(12);
  const [visibleRecommended, setVisibleRecommended] = useState(6);
  const [visibleDubbed, setVisibleDubbed] = useState(6);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.title = 'All-anime — Disfruta del anime más popular Anime HD';
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const loadMore = (section: 'animes' | 'recommended' | 'dubbed') => {
    switch (section) {
      case 'animes':
        setVisibleAnimes(prev => prev + 12);
        break;
      case 'recommended':
        setVisibleRecommended(prev => prev + 6);
        break;
      case 'dubbed':
        setVisibleDubbed(prev => prev + 6);
        break;
    }
  };

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    beforeChange: (_: any, next: number) => setCurrentSlide(next),
    appendDots: (dots: React.ReactNode) => (
      <div style={{ 
        position: 'absolute',
        bottom: '40px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="flex gap-2">{dots}</div>
      </div>
    ),
    customPaging: (i: number) => (
      <button 
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
        }`}
      />
    )
  };

  const recommendedSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="relative w-full">
      {/* Banner Carousel */}
      <div className="relative h-screen md:h-[80vh] lg:h-screen">
        <Slider {...bannerSettings} className="banner-slider h-full">
          {bannerData.map((banner) => (
            <div key={banner.id} className="relative h-screen">
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover banner-image desktop"
                />
                <img
                  src={banner.posterImage || banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover banner-image mobile"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50" />
              </div>
              <div className="absolute bottom-32 left-16 max-w-2xl z-10">
                <img
                  src={banner.logo}
                  alt={`${banner.title} logo`}
                  className="w-96 mb-6"
                />
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded text-sm">
                    {banner.rating}
                  </span>
                  <div className="flex gap-2">
                    {banner.languages.map((lang) => (
                      <span key={lang} className="text-sm text-gray-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-lg text-gray-200 mb-8">{banner.description}</p>
                <div className="flex gap-4">
                  <Link
                    to={`/ver/${banner.id}`}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Comenzar</span>
                  </Link>
                  <button 
                    onClick={() => toggleFavorite(banner.id)}
                    className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/60 transition-colors"
                  >
                    {favorites.includes(banner.id) ? (
                      <>
                        <BookmarkCheck className="w-5 h-5" />
                        <span>Añadido a favoritos</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-5 h-5" />
                        <span>Añadir a favoritos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Nuestras Recomendaciones */}
      <section className="px-4 md:px-12 py-8 bg-[#141414]">
        <div className="section-header">
          <h2 className="text-2xl font-bold">Nuestras Recomendaciones</h2>
        </div>
        <Slider {...recommendedSettings} className="recommended-slider">
          {getHomeSection('recommendations').slice(0, visibleRecommended).map((anime) => (
            <div key={anime.id} className="px-2">
              <Link to={`/ver/${anime.id}`} className="block">
                <div className="anime-card relative cursor-pointer rounded-lg overflow-hidden">
                  <div className="quality-badge">1080p</div>
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full aspect-[4/6] object-cover"
                  />
                  <div className="card-content rounded-lg">
                    <h3 className="font-bold mb-2">{anime.title}</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{anime.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {anime.languages?.map(lang => (
                          <span key={lang} className="language-badge">{lang}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {anime.genres.map(genre => (
                          <span key={genre} className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-3">{anime.synopsis}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        {visibleRecommended < getHomeSection('recommendations').length && (
          <div className="section-load-more">
            <button onClick={() => loadMore('recommended')}>Cargar más</button>
          </div>
        )}
      </section>

      {/* Episodios Nuevos */}
      <section className="episodes-section px-4 md:px-12 py-8 bg-[#141414]">
        <div className="section-header flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Play className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold">Episodios Nuevos</h2>
          </div>
          {/* Botón Ver más movido aquí y rediseñado */}
          <button
            onClick={() => setShowTodayEpisodes(!showTodayEpisodes)}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>{showTodayEpisodes ? 'Mostrar menos' : 'Ver más'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showTodayEpisodes ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className="mb-8">
          <h3 className="date-header">Hoy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getTodayEpisodes().map((episode) => (
              <Link
                key={episode.id}
                to={episode.videoUrl}
                className="episode-card group relative"
              >
                <div className="thumbnail-container aspect-video rounded-lg">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="thumbnail rounded-lg object-cover"
                  />
                  <img
                    src={episode.hoverThumbnail}
                    alt={episode.title}
                    className="hover-thumbnail rounded-lg object-cover"
                  />
                  <div className="play-icon">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="duration">{episode.duration}</div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Hoy</span>
                    <span>•</span>
                    <span>Sub | Dob</span>
                  </div>
                  <h3 className="font-semibold mt-1 group-hover:text-red-600 transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-400">Episodio {episode.number}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Episodios de Ayer - Se muestra/oculta con el botón Ver más */}
        <div className={`episodes-collapse ${showTodayEpisodes ? 'expanded' : ''}`}>
          <h3 className="date-header">Ayer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getYesterdayEpisodes().map((episode) => (
              <Link
                key={episode.id}
                to={episode.videoUrl}
                className="episode-card group relative"
              >
                <div className="thumbnail-container aspect-video rounded-lg">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="thumbnail rounded-lg object-cover"
                  />
                  <img
                    src={episode.hoverThumbnail}
                    alt={episode.title}
                    className="hover-thumbnail rounded-lg object-cover"
                  />
                  <div className="play-icon">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="duration">{episode.duration}</div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Ayer</span>
                    <span>•</span>
                    <span>Sub | Dob</span>
                  </div>
                  <h3 className="font-semibold mt-1 group-hover:text-red-600 transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-gray-400">Episodio {episode.number}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Animes Agregados */}
      <section className="px-4 md:px-12 py-8 bg-[#141414]">
        <div className="section-header">
          <div className="flex items-center gap-2">
            <Plus className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold">Animes Agregados</h2>
          </div>
        </div>
        <div className="added-animes-grid">
          {getHomeSection('recentlyAdded').slice(0, visibleAnimes).map((anime) => (
            <Link 
              key={anime.id} 
              to={`/ver/${anime.id}`}
              className="block"
            >
              <div className="anime-card relative cursor-pointer rounded-lg overflow-hidden">
                <div className="quality-badge">1080p</div>
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="card-content rounded-lg">
                  <h3 className="font-bold mb-2">{anime.title}</h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{anime.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {anime.languages?.map(lang => (
                        <span key={lang} className="language-badge">{lang}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {anime.genres.map(genre => (
                        <span key={genre} className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3">{anime.synopsis}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {visibleAnimes < getHomeSection('recentlyAdded').length && (
          <div className="section-load-more">
            <button onClick={() => loadMore('animes')}>Cargar más</button>
          </div>
        )}
      </section>

      {/* Los doblajes de esta temporada */}
      <section className="px-4 md:px-12 py-8 bg-[#141414]">
        <h2 className="text-2xl font-bold mb-6">Los doblajes de esta temporada</h2>
        <Slider {...recommendedSettings} className="recommended-slider">
          {getHomeSection('seasonDubs').slice(0, visibleDubbed).map((anime) => (
            <div key={anime.id} className="px-2">
              <Link to={`/ver/${anime.id}`} className="block">
                <div className="anime-card relative cursor-pointer rounded-lg overflow-hidden">
                  <div className="quality-badge">1080p</div>
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="card-content rounded-lg">
                    <h3 className="font-bold mb-2">{anime.title}</h3>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{anime.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {anime.languages?.map(lang => (
                          <span key={lang} className="language-badge">{lang}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {anime.genres.map(genre => (
                          <span key={genre} className="text-xs bg-red-600 px-2 py-0.5 rounded-full">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-3">{anime.synopsis}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        {visibleDubbed < getHomeSection('seasonDubs').length && (
          <div className="section-load-more">
            <button onClick={() => loadMore('dubbed')}>Cargar más</button>
          </div>
        )}
      </section>
    </div>
  );
}
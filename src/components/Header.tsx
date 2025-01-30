import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { getAllAnime } from '../data/animeData';

export default function Header() {
  const navigate = useNavigate();
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función de búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = getAllAnime().filter(anime => 
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHeaderScrolled
          ? 'bg-[#dc2d22]'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation - Left side */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://all-anime.net/image/Logo/logo-all-anime-min.svg"
                alt="all-anime"
                className="h-8"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                Inicio
              </Link>
              <Link to="/explorar" className="text-white hover:text-gray-300 transition-colors">
                Explorar
              </Link>
              <Link to="/peliculas" className="text-white hover:text-gray-300 transition-colors">
                Películas
              </Link>
            </nav>
          </div>

          {/* Search Bar - Right side */}
          <div className="flex-none w-64 relative">
            <div className={`relative flex items-center transition-all duration-300 ${
              isSearchFocused ? 'bg-[#1f1f1f]' : 'bg-[#1f1f1f]/50'
            } rounded-full overflow-hidden`}>
              <Search className="w-5 h-5 ml-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar anime..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setIsSearchFocused(false);
                  setTimeout(() => setShowSearchResults(false), 200);
                }}
                className="w-full py-2 px-3 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1f1f1f] rounded-lg shadow-lg overflow-hidden">
                {searchResults.map((anime) => (
                  <div
                    key={anime.id}
                    onClick={() => {
                      navigate(`/ver/${anime.id}`);
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-white font-medium">{anime.title}</h4>
                      <p className="text-sm text-gray-400">{anime.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/explorar"
                className="text-white hover:text-gray-300 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                to="/peliculas"
                className="text-white hover:text-gray-300 transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Películas
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
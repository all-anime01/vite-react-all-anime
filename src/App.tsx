import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Movies from './pages/Movies';
import AnimeDetail from './pages/AnimeDetail';

// Import all anime pages
import SoloLeveling from './ver/Solo-leveling';
import JujutsuKaisen from './ver/jujutsu-kaisen';
import DrStone from './ver/dr-stone';
import SoloLevelingPelicula from './peliculas/Solo-leveling-pelicula';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/peliculas" element={<Movies />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            
            {/* Anime Routes */}
            <Route path="/ver/solo-leveling" element={<SoloLeveling />} />
            <Route path="/ver/jujutsu-kaisen" element={<JujutsuKaisen />} />
            <Route path="/ver/dr-stone" element={<DrStone />} />
            
            {/* Movie Routes */}
            <Route path="/peliculas/solo-leveling-pelicula" element={<SoloLevelingPelicula />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
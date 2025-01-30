import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
              <li><a href="/explorar" className="hover:text-gray-300">Explorar</a></li>
              <li><a href="/peliculas" className="hover:text-gray-300">Películas</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Ayuda</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-300">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Términos de uso</a></li>
              <li><a href="#" className="hover:text-gray-300">Privacidad</a></li>
              <li><a href="#" className="hover:text-gray-300">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} All Anime. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
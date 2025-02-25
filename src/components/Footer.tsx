import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif text-white mb-4">SU.</h3>
            <p className="text-gray-400">
              Restaurant • Bar<br />
              Une expérience unique à Paris
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-amber-500">Accueil</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-amber-500">Menu</Link></li>
              <li><Link to="/cocktails" className="text-gray-400 hover:text-amber-500">Cocktails</Link></li>
              <li><Link to="/reservations" className="text-gray-400 hover:text-amber-500">Réservations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>112 Rue Saint-Maur</li>
              <li>75011 Paris</li>
              <li>+33 6 58 81 10 00</li>
              <li>su.ruesaintmaur@gmail.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link to="/mentions-legales" className="text-gray-400 hover:text-amber-500">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="text-gray-400 hover:text-amber-500">Politique de confidentialité</Link></li>
              <li><Link to="/admin/login" className="text-gray-400 hover:text-amber-500">Administration</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SU. Tous droits réservés. 
            <span className="mx-2">•</span>
            <a 
              href="https://agencejussieu.fr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-500 hover:text-amber-400 transition"
            >
              conçu par ADJ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
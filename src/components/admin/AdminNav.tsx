import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, History, LogOut, Menu, X } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { useAuthStore } from '../../lib/auth/session';

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAdminStore((state) => state.setUser);
  const clearSession = useAuthStore((state) => state.clearSession);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    clearSession();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Tableau de bord' },
    { path: '/admin/reservations', icon: Calendar, label: 'Réservations' },
    { path: '/admin/history', icon: History, label: 'Historique' }
  ];

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-800 z-50 px-4 flex items-center justify-between">
        <span className="text-2xl font-serif text-white">SU.</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <nav className={`
        fixed top-0 bottom-0 w-64 bg-neutral-800 p-6 z-50 transition-transform duration-300
        lg:translate-x-0
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMenuOpen ? 'lg:translate-x-0' : 'lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl font-serif text-white">SU.</span>
          <span className="text-sm text-gray-400">Administration</span>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-md transition
                ${isActive(item.path)
                  ? 'bg-amber-600/20 text-amber-500'
                  : 'text-gray-300 hover:text-white hover:bg-neutral-700/50'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-neutral-700/50 px-4 py-2 rounded-md transition w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>

      {/* Top padding for mobile */}
      <div className="h-16 lg:hidden" />
    </>
  );
}
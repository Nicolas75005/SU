import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { usePages } from '../lib/hooks/usePages';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { visiblePages } = usePages();

  const navigationItems = visiblePages.map(page => ({
    path: page.path,
    label: page.title
  }));

  return (
    <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif text-white">SU.</Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white hover:text-amber-300 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90">
            {navigationItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-white hover:text-amber-300 px-3 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
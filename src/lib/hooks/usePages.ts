import { useState, useEffect } from 'react';
import { Page } from '../../types/admin';

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '2',
      title: 'Menu',
      path: '/menu',
      isVisible: true,
      lastModified: new Date(),
      modifiedBy: 'admin@su-paris.fr'
    },
    {
      id: '3',
      title: 'Cocktails',
      path: '/cocktails',
      isVisible: true,
      lastModified: new Date(),
      modifiedBy: 'admin@su-paris.fr'
    },
    {
      id: '4',
      title: 'Réservations',
      path: '/reservations',
      isVisible: true,
      lastModified: new Date(),
      modifiedBy: 'admin@su-paris.fr'
    },
    {
      id: '5',
      title: 'Contact',
      path: '/contact',
      isVisible: true,
      lastModified: new Date(),
      modifiedBy: 'admin@su-paris.fr'
    }
  ]);

  // Dans une vraie application, ceci serait un appel API
  const fetchPages = async () => {
    // Simulation d'un appel API
    return pages;
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    visiblePages: pages.filter(page => page.isVisible)
  };
};
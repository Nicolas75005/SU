import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageList from '../../components/admin/PageList';
import { Page } from '../../types/admin';

export default function Pages() {
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
      id: '6',
      title: 'Événements',
      path: '/events',
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

  const handleVisibilityChange = (pageId: string, success: boolean) => {
    if (success) {
      setPages(prevPages =>
        prevPages.map(page =>
          page.id === pageId
            ? {
                ...page,
                isVisible: !page.isVisible,
                lastModified: new Date()
              }
            : page
        )
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-amber-500" />
          Pages
        </h1>
      </div>

      <div className="bg-neutral-800/50 rounded-lg p-6">
        <PageList
          pages={pages}
          onVisibilityChange={handleVisibilityChange}
        />
      </div>
    </motion.div>
  );
}
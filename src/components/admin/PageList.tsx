import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Link as LinkIcon } from 'lucide-react';
import { Page } from '../../types/admin';
import PageVisibilityToggle from './PageVisibilityToggle';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Props {
  pages: Page[];
  onVisibilityChange: (pageId: string, success: boolean) => void;
}

export default function PageList({ pages, onVisibilityChange }: Props) {
  return (
    <div className="space-y-4">
      {pages.map((page) => (
        <motion.div
          key={page.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800/50 rounded-lg p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">{page.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <span>{page.path}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Modifié le {format(page.lastModified, 'dd MMM yyyy à HH:mm', { locale: fr })}
                  </span>
                </div>
              </div>
            </div>
            <PageVisibilityToggle
              page={page}
              onVisibilityChange={(success) => onVisibilityChange(page.id, success)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
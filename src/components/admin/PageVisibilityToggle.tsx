import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Page } from '../../types/admin';
import { usePageVisibility } from '../../lib/hooks/usePageVisibility';

interface Props {
  page: Page;
  onVisibilityChange: (success: boolean) => void;
}

export default function PageVisibilityToggle({ page, onVisibilityChange }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { togglePageVisibility } = usePageVisibility();

  const handleToggle = async () => {
    const success = await togglePageVisibility(page, reason);
    setIsConfirmOpen(false);
    setReason('');
    onVisibilityChange(success);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsConfirmOpen(true)}
        className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
          page.isVisible
            ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
            : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
        }`}
        aria-label={`${page.isVisible ? 'Masquer' : 'Afficher'} la page`}
      >
        {page.isVisible ? (
          <>
            <Eye className="w-4 h-4" />
            <span>Visible</span>
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4" />
            <span>Masquée</span>
          </>
        )}
      </button>

      {isConfirmOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-neutral-800 rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-white font-medium mb-3">
            Confirmer le changement de visibilité
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Êtes-vous sûr de vouloir {page.isVisible ? 'masquer' : 'afficher'} cette page ?
          </p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Raison du changement (optionnel)"
            className="w-full bg-neutral-700 text-white rounded-md px-3 py-2 text-sm mb-3"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="px-3 py-1 text-sm text-gray-400 hover:text-white transition"
            >
              Annuler
            </button>
            <button
              onClick={handleToggle}
              className="px-3 py-1 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
            >
              Confirmer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
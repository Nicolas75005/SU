import React from 'react';
import { Leaf } from 'lucide-react';

export default function DietaryInfo() {
  return (
    <div className="bg-neutral-800/50 rounded-lg p-4 mt-8">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Leaf className="w-4 h-4 text-green-500" />
        <span>Plat végétarien</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Pour toute allergie ou régime alimentaire spécifique, n'hésitez pas à en informer notre équipe.
      </p>
    </div>
  );
}
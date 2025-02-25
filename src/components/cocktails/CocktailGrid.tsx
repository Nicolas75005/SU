import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Droplet, BarChart } from 'lucide-react';
import { MenuItem } from '../../types';

interface Props {
  cocktails: MenuItem[];
}

export default function CocktailGrid({ cocktails }: Props) {
  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1: return 'Facile';
      case 2: return 'Moyen';
      case 3: return 'Expert';
      default: return '';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cocktails.map((cocktail) => (
        <motion.div
          key={cocktail.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800/50 rounded-lg overflow-hidden hover:bg-neutral-800 transition"
        >
          {cocktail.image && (
            <div className="relative h-48">
              <img
                src={cocktail.image}
                alt={cocktail.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-medium text-white">{cocktail.name}</h3>
              <span className="text-amber-500 font-medium">{cocktail.price}€</span>
            </div>
            <p className="text-gray-400 mb-4">{cocktail.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {cocktail.difficulty && (
                <div className="flex items-center gap-1">
                  <BarChart className="w-4 h-4 text-amber-500" />
                  <span>{getDifficultyLabel(cocktail.difficulty)}</span>
                </div>
              )}
              {cocktail.preparationTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{cocktail.preparationTime}min</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Droplet className="w-4 h-4 text-amber-500" />
                <span>{cocktail.alcoholType}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
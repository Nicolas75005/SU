import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer } from 'lucide-react';
import { cocktails } from '../../data/cocktails';

const CocktailMenu = () => {
  const classicCocktails = cocktails.filter(c => 
    ['gin-tonic', 'les-mules', 'basil-smash', 'pornstar-martini', 'mezcalita', 'negroni', 'saint-germain-spritz', 'old-fashioned']
    .includes(c.id)
  );
  
  const signatureCocktails = cocktails.filter(c => 
    ['pineapple-express', 'kiwi-collins', 'sunny', 'peach-75', 'nord', 'jungle-bird', 'clover-club']
    .includes(c.id)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Les Classiques */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-serif text-amber-500 mb-6 tracking-wider">LES CLASSIQUES</h2>
        <div className="bg-neutral-800/30 rounded-lg p-8">
          {classicCocktails.map((cocktail) => (
            <div key={cocktail.id} className="flex justify-between items-baseline mb-4 last:mb-0">
              <div className="flex-1">
                <h3 className="text-white font-medium">{cocktail.name}</h3>
              </div>
              <div className="flex items-center gap-8 text-amber-500">
                <span>{cocktail.price}€</span>
                <span className="text-gray-400">HH {cocktail.price - 2}€</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Les Créations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-serif text-amber-500 mb-6 tracking-wider">LES CRÉATIONS</h2>
        <div className="grid gap-4">
          {signatureCocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              className="bg-neutral-800/30 rounded-lg overflow-hidden hover:bg-neutral-800/40 transition-colors"
            >
              <div className="md:flex">
                {cocktail.image && (
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <img
                      src={cocktail.image}
                      alt={cocktail.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-white">{cocktail.name}</h3>
                    <span className="text-amber-500">{cocktail.price}€</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{cocktail.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{cocktail.preparationTime} min</span>
                    </div>
                    {cocktail.alcoholType && (
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        <span className="capitalize">{cocktail.alcoholType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Hours Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-right text-sm text-gray-400"
      >
        <p>HH : Happy Hour 18h-21h</p>
      </motion.div>
    </div>
  );
};

export default CocktailMenu;
import React from 'react';
import { motion } from 'framer-motion';

export default function MenuHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Notre Carte</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Une sélection raffinée de plats à partager, cocktails créatifs et spécialités maison,
        préparés avec des ingrédients frais et de saison.
      </p>
    </motion.div>
  );
}
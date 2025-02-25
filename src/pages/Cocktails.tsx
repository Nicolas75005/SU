import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CocktailMenu from '../components/cocktails/CocktailMenu';

export default function Cocktails() {
  return (
    <main className="min-h-screen bg-neutral-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Notre Carte des Cocktails</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Une sélection raffinée de cocktails classiques et créations originales,
            élaborés avec passion par nos mixologistes.
          </p>
        </motion.div>

        <CocktailMenu />
      </div>
    </main>
  );
}
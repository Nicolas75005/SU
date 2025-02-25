import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlassWater } from 'lucide-react';

export default function MenuLink() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="inline-block"
    >
      <Link
        to="/menu"
        className="group flex items-center gap-3 bg-neutral-800/50 hover:bg-neutral-800 text-white px-6 py-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Voir notre menu"
      >
        <GlassWater className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
        <span className="text-lg font-medium">
          Voir le menu
          <span className="block text-sm text-gray-400 group-hover:text-amber-500 transition-colors">
            Découvrez notre carte
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
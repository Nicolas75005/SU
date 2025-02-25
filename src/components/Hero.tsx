import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">SU.</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Restaurant • Bar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservations" className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">
              Réserver une table
            </Link>
            <Link to="/menu" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition"  >
              Voir le menu
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
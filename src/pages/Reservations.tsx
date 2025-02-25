import React from 'react';
import { motion } from 'framer-motion';
import ReservationForm from '../components/reservations/ReservationForm';

export default function Reservations() {
  return (
    <main className="min-h-screen bg-neutral-900 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Réservations</h1>
          <p className="text-gray-400">
            Réservez votre table pour une expérience gastronomique unique
          </p>
        </motion.div>

        <ReservationForm />
      </div>
    </main>
  );
}
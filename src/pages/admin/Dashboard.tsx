import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock } from 'lucide-react';
import { useReservations } from '../../lib/hooks/useReservations';
import ReservationCard from '../../components/admin/ReservationCard';

export default function Dashboard() {
  const { 
    reservations: confirmedReservations, 
    loading: confirmedLoading 
  } = useReservations({ 
    status: 'confirmed', 
    futureOnly: true 
  });

  const {
    reservations: pendingReservations,
    loading: pendingLoading
  } = useReservations({
    status: 'pending'
  });

  const todayReservations = confirmedReservations.filter(
    res => res.date.toDateString() === new Date().toDateString()
  );

  const totalGuests = todayReservations.reduce(
    (sum, res) => sum + res.guests, 
    0
  );

  const totalPendingGuests = pendingReservations.reduce(
    (sum, res) => sum + res.guests,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Tableau de bord</h1>
        <span className="text-sm text-gray-400">
          Dernière mise à jour: {new Date().toLocaleString('fr-FR')}
        </span>
      </div>
      
      {/* Première ligne : statistiques */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800/50 rounded-lg p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-lg font-medium text-white mb-2">Réservations du jour</h2>
          <p className="text-3xl text-green-500 mb-2">{todayReservations.length}</p>
          <p className="text-sm text-gray-400">Pour aujourd'hui</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-800/50 rounded-lg p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-lg font-medium text-white mb-2">Couverts</h2>
          <p className="text-3xl text-green-500 mb-2">{totalGuests}</p>
          <p className="text-sm text-gray-400">Personnes attendues aujourd'hui</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-800/50 rounded-lg p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-lg font-medium text-white mb-2">En attente</h2>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl text-yellow-500 mb-2">{pendingReservations.length}</p>
            <p className="text-lg text-yellow-500/80">({totalPendingGuests} couverts)</p>
          </div>
          <p className="text-sm text-gray-400">Réservations à confirmer</p>
        </motion.div>
      </div>

      {/* Deuxième ligne : Prochaines réservations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-800/50 rounded-lg p-6"
      >
        <h2 className="text-lg font-medium text-white mb-6">
          Prochaines réservations confirmées
        </h2>

        {confirmedLoading ? (
          <div className="text-gray-400">
            Chargement des réservations...
          </div>
        ) : confirmedReservations.length === 0 ? (
          <div className="text-gray-400">
            Aucune réservation confirmée à venir
          </div>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {confirmedReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
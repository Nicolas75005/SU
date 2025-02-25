import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useReservationNotifications } from '../../lib/hooks/useReservationNotifications';

export default function ReservationNotification() {
  const { hasNewReservations, markAsRead } = useReservationNotifications();

  return (
    <AnimatePresence>
      {hasNewReservations && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className="bg-amber-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <Bell className="w-5 h-5" />
            <div>
              <p className="font-medium">Nouvelles réservations</p>
              <p className="text-sm">Des nouvelles demandes sont en attente</p>
            </div>
            <button
              onClick={markAsRead}
              className="ml-4 text-sm underline hover:no-underline"
            >
              Marquer comme lu
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
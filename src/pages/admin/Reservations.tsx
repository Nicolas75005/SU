import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { useReservations } from '../../lib/hooks/useReservations';
import ReservationDetails from '../../components/admin/ReservationDetails';
import NotificationButton from '../../components/admin/NotificationButton';

export default function AdminReservations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);
  const { reservations, loading, error, refreshReservations } = useReservations({});

  const handleStatusChange = async (success: boolean) => {
    if (success) {
      await refreshReservations();
      setSelectedReservation(null);
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || reservation.status === statusFilter;
    
    const matchesDate = !dateFilter || 
      reservation.date.toDateString() === dateFilter.toDateString();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Réservations</h1>
        <NotificationButton />
      </div>

      <div className="bg-neutral-800/50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-700 text-white pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
            </select>

            <DatePicker
              selected={dateFilter}
              onChange={setDateFilter}
              dateFormat="dd/MM/yyyy"
              locale={fr}
              placeholderText="Filtrer par date"
              minDate={today}
              className="bg-neutral-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">
            Chargement des réservations...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            {error}
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Aucune réservation trouvée
          </div>
        ) : (
          <div className="space-y-4">
            {selectedReservation ? (
              <>
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="text-amber-500 hover:text-amber-400 mb-4"
                >
                  ← Retour à la liste
                </button>
                <ReservationDetails
                  reservation={filteredReservations.find(r => r.id === selectedReservation)!}
                  onStatusChange={handleStatusChange}
                />
              </>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-neutral-700">
                    <th className="pb-3 text-gray-400 font-medium">Date</th>
                    <th className="pb-3 text-gray-400 font-medium">Client</th>
                    <th className="pb-3 text-gray-400 font-medium">Personnes</th>
                    <th className="pb-3 text-gray-400 font-medium">Statut</th>
                    <th className="pb-3 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-neutral-700">
                      <td className="py-4 text-white">
                        {format(reservation.date, 'dd MMM yyyy', { locale: fr })}
                        <br />
                        <span className="text-sm text-gray-400">{reservation.time}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-white">{reservation.name}</span>
                        <br />
                        <span className="text-sm text-gray-400">{reservation.email}</span>
                      </td>
                      <td className="py-4 text-white">{reservation.guests}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          reservation.status === 'confirmed' ? 'bg-green-900/50 text-green-300' :
                          reservation.status === 'cancelled' ? 'bg-red-900/50 text-red-300' :
                          'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {reservation.status === 'confirmed' ? 'Confirmé' :
                           reservation.status === 'cancelled' ? 'Annulé' :
                           'En attente'}
                        </span>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => setSelectedReservation(reservation.id)}
                          className="text-amber-500 hover:text-amber-400 transition"
                        >
                          Voir détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
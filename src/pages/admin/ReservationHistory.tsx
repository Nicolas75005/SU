import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Filter, Download } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { useReservationHistory } from '../../lib/hooks/useReservationHistory';
import { useReservationStats } from '../../lib/hooks/useReservationStats';
import ReservationChart from '../../components/admin/ReservationChart';

export default function ReservationHistory() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [period, setPeriod] = useState<7 | 30>(7);
  const { reservations, loading, error, fetchHistory } = useReservationHistory();
  const { stats, loading: statsLoading } = useReservationStats(period);

  useEffect(() => {
    const today = startOfDay(new Date());
    
    fetchHistory({
      startDate: startDate ? startOfDay(startDate) : undefined,
      endDate: endDate ? startOfDay(endDate) : undefined,
      status: statusFilter !== 'all' ? statusFilter : undefined
    });
  }, [fetchHistory, startDate, endDate, statusFilter]);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Heure', 'Nom', 'Email', 'Téléphone', 'Couverts', 'Statut', 'Notes'].join(','),
      ...reservations.map(r => [
        format(r.date, 'dd/MM/yyyy'),
        r.time,
        r.name,
        r.email,
        r.phone,
        r.guests,
        r.status,
        r.special_requests || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reservations-historique-${format(new Date(), 'dd-MM-yyyy')}.csv`;
    link.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-green-900/50 text-green-300 px-2 py-0.5 rounded-full text-xs">Honorée</span>;
      case 'cancelled':
        return <span className="bg-red-900/50 text-red-300 px-2 py-0.5 rounded-full text-xs">Annulée</span>;
      case 'pending':
        return <span className="bg-yellow-900/50 text-yellow-300 px-2 py-0.5 rounded-full text-xs">No-show</span>;
      default:
        return null;
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate && !endDate) return true;
    const checkDate = startOfDay(date).getTime();
    const start = startDate ? startOfDay(startDate).getTime() : -Infinity;
    const end = endDate ? startOfDay(endDate).getTime() : Infinity;
    return checkDate >= start && checkDate <= end;
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesDate = isDateInRange(reservation.date);
    return matchesStatus && matchesDate;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Historique des Réservations</h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition text-sm"
        >
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* Graphique d'évolution */}
      <div className="bg-neutral-800/50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">
            Évolution des réservations
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod(7)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                period === 7
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setPeriod(30)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                period === 30
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              30 jours
            </button>
          </div>
        </div>
        <ReservationChart data={stats} loading={statsLoading} />
      </div>

      {/* Liste des réservations */}
      <div className="bg-neutral-800/50 rounded-lg p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              locale={fr}
              placeholderText="Date début"
              className="bg-neutral-700 text-white text-sm px-3 py-1.5 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none w-32"
            />
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
              locale={fr}
              placeholderText="Date fin"
              className="bg-neutral-700 text-white text-sm px-3 py-1.5 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-700 text-white text-sm px-3 py-1.5 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="confirmed">Honorées</option>
              <option value="cancelled">Annulées</option>
              <option value="pending">No-show</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            Chargement de l'historique...
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-400 text-sm">
            {error}
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            Aucune réservation trouvée dans l'historique
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-neutral-700">
                  <th className="pb-2 text-gray-400 font-medium text-sm">Date</th>
                  <th className="pb-2 text-gray-400 font-medium text-sm">Client</th>
                  <th className="pb-2 text-gray-400 font-medium text-sm">Contact</th>
                  <th className="pb-2 text-gray-400 font-medium text-sm">Couverts</th>
                  <th className="pb-2 text-gray-400 font-medium text-sm">Statut</th>
                  <th className="pb-2 text-gray-400 font-medium text-sm">Notes</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-neutral-700/50">
                    <td className="py-2 text-white">
                      <div className="flex flex-col">
                        <span>{format(reservation.date, 'dd MMM yyyy', { locale: fr })}</span>
                        <span className="text-gray-400">{reservation.time}</span>
                      </div>
                    </td>
                    <td className="py-2 text-white">
                      {reservation.name}
                    </td>
                    <td className="py-2">
                      <div className="space-y-0.5">
                        <a href={`mailto:${reservation.email}`} className="block text-gray-400 hover:text-amber-500">
                          {reservation.email}
                        </a>
                        <a href={`tel:${reservation.phone}`} className="block text-gray-400 hover:text-amber-500">
                          {reservation.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-2 text-white">{reservation.guests}</td>
                    <td className="py-2">
                      {getStatusBadge(reservation.status)}
                    </td>
                    <td className="py-2 text-gray-400 max-w-xs truncate">
                      {reservation.special_requests || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
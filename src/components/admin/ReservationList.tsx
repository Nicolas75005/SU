import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Reservation } from '../../types/admin';
import { Check, X, Clock } from 'lucide-react';

interface Props {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
}

export default function ReservationList({ reservations, onUpdateStatus }: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-900/50 text-green-300 rounded-full text-xs">
            <Check className="w-3 h-3" />
            Confirmé
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-900/50 text-red-300 rounded-full text-xs">
            <X className="w-3 h-3" />
            Annulé
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-900/50 text-yellow-300 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            En attente
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
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
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-neutral-700">
                <td className="py-4 text-white">
                  {format(new Date(reservation.date), 'dd MMM yyyy', { locale: fr })}
                  <br />
                  <span className="text-sm text-gray-400">{reservation.time}</span>
                </td>
                <td className="py-4">
                  <span className="text-white">{reservation.name}</span>
                  <br />
                  <span className="text-sm text-gray-400 break-all">{reservation.email}</span>
                </td>
                <td className="py-4 text-white">{reservation.guests}</td>
                <td className="py-4">{getStatusBadge(reservation.status)}</td>
                <td className="py-4">
                  {reservation.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateStatus(reservation.id, 'confirmed')}
                        className="text-green-500 hover:text-green-400 transition"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => onUpdateStatus(reservation.id, 'cancelled')}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
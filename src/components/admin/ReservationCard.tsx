import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Reservation } from '../../types/admin';

interface Props {
  reservation: Reservation;
}

export default function ReservationCard({ reservation }: Props) {
  return (
    <div className="bg-neutral-800/50 rounded-lg p-4 hover:bg-neutral-800 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-amber-500">
          <Calendar className="w-4 h-4" />
          <span>
            {format(reservation.date, 'dd MMM yyyy', { locale: fr })} à{' '}
            {reservation.time}
          </span>
        </div>
        {reservation.table_number && (
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Table {reservation.table_number}</span>
          </div>
        )}
      </div>

      <h3 className="text-white font-medium mb-2">{reservation.name}</h3>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-400">
        <Users className="w-4 h-4" />
          <span>{reservation.guests} personne{reservation.guests > 1 ? 's' : ''}</span>
        </div>

        
      </div>
    </div>
  );
}
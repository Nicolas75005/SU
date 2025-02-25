import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Mail, Phone, Users, MessageSquare, Clock, History, AlertCircle } from 'lucide-react';
import type { Reservation } from '../../types/admin';
import { useStatusHistory } from '../../lib/hooks/useStatusHistory';
import { useReservationStatus } from '../../lib/hooks/useReservationStatus';
import ReservationStatusSelect from './ReservationStatusSelect';

interface Props {
  reservation: Reservation;
  onStatusChange: (success: boolean) => void;
}

export default function ReservationDetails({ reservation, onStatusChange }: Props) {
  const { history, loading } = useStatusHistory(reservation.id);
  const { verifyReservation } = useReservationStatus();
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    const verifyStatus = async () => {
      try {
        await verifyReservation(reservation.id);
        setVerificationError(null);
      } catch (err: any) {
        setVerificationError(err.message);
      }
    };

    verifyStatus();
  }, [reservation.id, verifyReservation]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-green-400">Confirmé</span>;
      case 'cancelled':
        return <span className="text-red-400">Annulé</span>;
      default:
        return <span className="text-yellow-400">En attente</span>;
    }
  };

  if (verificationError) {
    return (
      <div className="bg-red-900/30 text-red-300 p-4 rounded-lg flex items-center gap-2">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>{verificationError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-neutral-800/50 rounded-lg p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Informations client</h3>
            <div className="space-y-3">
              <p className="text-gray-300">{reservation.name}</p>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${reservation.email}`} className="hover:text-amber-500 break-all">
                  {reservation.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <a href={`tel:${reservation.phone}`} className="hover:text-amber-500">
                  {reservation.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Détails réservation</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(reservation.date, 'dd MMMM yyyy', { locale: fr })} à {reservation.time}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>{reservation.guests} personne{reservation.guests > 1 ? 's' : ''}</span>
              </div>
              {reservation.special_requests && (
                <div className="flex items-start gap-2 text-gray-400">
                  <MessageSquare className="w-4 h-4 mt-1" />
                  <p className="break-words">{reservation.special_requests}</p>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  Créée le {format(reservation.created_at, 'dd/MM/yyyy à HH:mm', { locale: fr })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-700">
          <h3 className="text-lg font-medium text-white mb-4">Statut</h3>
          <ReservationStatusSelect
            reservationId={reservation.id}
            currentStatus={reservation.status}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>

      <div className="bg-neutral-800/50 rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-medium text-white">Historique des changements</h3>
        </div>

        {loading ? (
          <p className="text-gray-400">Chargement de l'historique...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">Aucun changement de statut</p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 text-sm bg-neutral-800/30 p-3 rounded-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span>
                      {getStatusBadge(entry.previous_status)} →{' '}
                      {getStatusBadge(entry.new_status)}
                    </span>
                    {entry.table_number && (
                      <span className="text-gray-400">
                        (Table {entry.table_number})
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 mt-1">
                    <span>
                      {format(new Date(entry.changed_at), 'dd/MM/yyyy à HH:mm', { locale: fr })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>par {entry.changed_by_email}</span>
                  </div>
                  {entry.reason && (
                    <p className="text-gray-500 mt-1 break-words">{entry.reason}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
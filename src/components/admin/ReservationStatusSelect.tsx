import React, { useState } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { useReservationStatus } from '../../lib/hooks/useReservationStatus';

interface Props {
  reservationId: string;
  currentStatus: string;
  onStatusChange: (success: boolean) => void;
}

export default function ReservationStatusSelect({ 
  reservationId, 
  currentStatus,
  onStatusChange 
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [showSuccess, setShowSuccess] = useState(false);
  const { updateStatus, isUpdating, error } = useReservationStatus();

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    const success = await updateStatus(
      reservationId,
      newStatus as 'confirmed' | 'cancelled'
    );

    if (success) {
      setSelectedStatus(newStatus);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      onStatusChange(true);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/30 px-3 py-2 rounded">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {showSuccess && (
        <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/30 px-3 py-2 rounded">
          <Check className="w-4 h-4 shrink-0" />
          <p>Statut mis à jour avec succès</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className="bg-neutral-700 text-white px-3 py-2 rounded focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="cancelled">Annulé</option>
        </select>

        {isUpdating && (
          <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
        )}
      </div>
    </div>
  );
}
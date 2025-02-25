import { useState } from 'react';
import { supabase } from '../auth/supabase';
import { useAuthStore } from '../auth/session';
import { sendStatusEmail } from '../email/emailjs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const useReservationStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const verifyReservation = async (reservationId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', reservationId)
        .single();

      if (fetchError) {
        throw new Error(`Erreur de vérification: ${fetchError.message}`);
      }

      if (!data) {
        throw new Error('Réservation introuvable');
      }

      return data;
    } catch (err: any) {
      throw new Error(`Erreur lors de la vérification: ${err.message}`);
    }
  };

  const updateStatus = async (
    reservationId: string,
    newStatus: 'confirmed' | 'cancelled',
    tableNumber?: number
  ) => {
    if (!user) {
      setError('Non autorisé : vous devez être connecté');
      return false;
    }

    setIsUpdating(true);
    setError(null);

    try {
      // Verify reservation exists and get details
      const reservation = await verifyReservation(reservationId);
      if (!reservation) {
        throw new Error('Réservation non trouvée');
      }

      // Update status
      const { error: updateError } = await supabase
        .from('reservations')
        .update({
          status: newStatus,
          table_number: tableNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', reservationId);

      if (updateError) {
        throw new Error(`Erreur de mise à jour: ${updateError.message}`);
      }

      // Create history entry
      const { error: historyError } = await supabase
        .from('reservation_status_history')
        .insert({
          reservation_id: reservationId,
          previous_status: reservation.status,
          new_status: newStatus,
          table_number: tableNumber,
          changed_by: user.id
        });

      if (historyError) {
        console.warn('Erreur lors de la création de l\'historique:', historyError);
      }

      // Send notification email
      try {
        const formattedDate = format(new Date(reservation.date), 'dd MMMM yyyy', { locale: fr });
        
        await sendStatusEmail({
          to_email: reservation.email,
          to_name: reservation.name,
          reservation_date: formattedDate,
          reservation_time: reservation.time,
          guests: reservation.guests,
          status: newStatus === 'confirmed' ? 'confirmée' : 'annulée',
          message: newStatus === 'confirmed' 
            ? 'Votre réservation a été confirmée'
            : 'Votre réservation a été annulée'
        });
      } catch (emailError) {
        console.warn('Erreur lors de l\'envoi de l\'email:', emailError);
      }

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Une erreur est survenue lors de la mise à jour';
      console.error('Erreur lors de la mise à jour du statut:', errorMessage);
      setError(errorMessage);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStatus,
    isUpdating,
    error,
    verifyReservation
  };
};
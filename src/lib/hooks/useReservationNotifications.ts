import { useState, useEffect } from 'react';
import { supabase } from '../auth/supabase';

export const useReservationNotifications = () => {
  const [hasNewReservations, setHasNewReservations] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    const checkNewReservations = async () => {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('id')
          .gt('created_at', lastChecked.toISOString())
          .eq('status', 'pending');

        if (error) throw error;

        if (data && data.length > 0) {
          setHasNewReservations(true);
          // Notification sonore
          const audio = new Audio('/notification.mp3');
          audio.play().catch(() => {
            // Gérer l'erreur silencieusement (les navigateurs peuvent bloquer l'audio)
          });
        }
      } catch (err) {
        console.error('Error checking new reservations:', err);
      }
    };

    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkNewReservations, 30 * 1000);

    // Nettoyer
    return () => clearInterval(interval);
  }, [lastChecked]);

  const markAsRead = () => {
    setHasNewReservations(false);
    setLastChecked(new Date());
  };

  return {
    hasNewReservations,
    markAsRead
  };
};
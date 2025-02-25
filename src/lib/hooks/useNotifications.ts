import { useState, useEffect } from 'react';
import { supabase } from '../auth/supabase';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      setSupported(false);
      return;
    }
    
    // Update permission state
    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!supported) {
      throw new Error('Les notifications ne sont pas supportées par votre navigateur');
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      throw new Error('Impossible d\'obtenir la permission pour les notifications');
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission !== 'granted') return;

    try {
      new Notification(title, {
        icon: '/su-icon.svg',
        badge: '/su-icon.svg',
        ...options
      });
    } catch (error) {
      console.error('Erreur lors de l\'affichage de la notification:', error);
    }
  };

  const subscribeToNewReservations = () => {
    if (permission !== 'granted') return;

    const subscription = supabase
      .channel('new_reservations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reservations',
          filter: 'status=eq.pending'
        },
        (payload) => {
          const reservation = payload.new;
          showNotification('Nouvelle Réservation', {
            body: `${reservation.name} - ${reservation.guests} personne(s)\nLe ${new Date(reservation.date).toLocaleDateString('fr-FR')} à ${reservation.time}`,
            tag: `reservation-${reservation.id}`,
            data: { reservationId: reservation.id }
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  return {
    permission,
    supported,
    requestPermission,
    showNotification,
    subscribeToNewReservations
  };
};
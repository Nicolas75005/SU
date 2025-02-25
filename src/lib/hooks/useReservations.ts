import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../auth/supabase';
import { Reservation } from '../../types/admin';

export const useReservations = (options: {
  status?: 'confirmed' | 'pending' | 'cancelled';
  futureOnly?: boolean;
  limit?: number;
}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      // Vérifier d'abord si la table existe
      const { error: tableCheckError } = await supabase
        .from('reservations')
        .select('id')
        .limit(1);

      if (tableCheckError) {
        if (tableCheckError.code === '42P01') {
          throw new Error('La table des réservations n\'est pas encore configurée. Veuillez contacter l\'administrateur système.');
        }
        throw tableCheckError;
      }

      let query = supabase
        .from('reservations')
        .select('*');

      // Filtrer pour n'avoir que les réservations d'aujourd'hui et futures
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      query = query.gte('date', today.toISOString().split('T')[0]);

      // Appliquer les autres filtres
      if (options.status) {
        query = query.eq('status', options.status);
      }

      // Trier par date et heure
      query = query
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const formattedReservations = data.map(reservation => ({
        ...reservation,
        date: new Date(reservation.date),
        created_at: new Date(reservation.created_at)
      }));

      setReservations(formattedReservations);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching reservations:', err);
      setError(err.message || 'Erreur lors du chargement des réservations');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, [options.status, options.limit]);

  useEffect(() => {
    fetchReservations();

    // Set up real-time subscription
    const subscription = supabase
      .channel('reservations_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reservations' 
        }, 
        () => {
          fetchReservations();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchReservations]);

  return { 
    reservations, 
    loading, 
    error,
    refreshReservations: fetchReservations
  };
};
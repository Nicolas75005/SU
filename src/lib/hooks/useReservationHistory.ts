import { useState, useCallback } from 'react';
import { supabase } from '../auth/supabase';
import { Reservation } from '../../types/admin';
import { endOfDay, startOfDay } from 'date-fns';

interface HistoryFilters {
  startDate?: Date;
  endDate?: Date;
  status?: string;
}

export const useReservationHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (filters: HistoryFilters = {}) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('reservations')
        .select('*');

      // Filtrer les réservations passées
      const today = startOfDay(new Date());
      query = query.lt('date', today.toISOString().split('T')[0]);

      // Appliquer les filtres de date
      if (filters.startDate) {
        const start = startOfDay(filters.startDate);
        query = query.gte('date', start.toISOString().split('T')[0]);
      }
      if (filters.endDate) {
        const end = endOfDay(filters.endDate);
        query = query.lte('date', end.toISOString().split('T')[0]);
      }

      // Appliquer le filtre de statut
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      // Trier par date décroissante
      query = query.order('date', { ascending: false })
                  .order('time', { ascending: false });

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
      console.error('Error fetching reservation history:', err);
      setError(err.message || 'Erreur lors du chargement de l\'historique');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    reservations,
    loading,
    error,
    fetchHistory
  };
};
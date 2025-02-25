import { useState, useEffect } from 'react';
import { supabase } from '../auth/supabase';

interface StatusHistoryEntry {
  id: string;
  previous_status: string;
  new_status: string;
  changed_at: string;
  changed_by_email: string;
  table_number?: number;
  reason?: string;
}

export const useStatusHistory = (reservationId: string) => {
  const [history, setHistory] = useState<StatusHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('reservation_status_history_view')
          .select('*')
          .eq('reservation_id', reservationId)
          .order('changed_at', { ascending: false });

        if (fetchError) throw fetchError;

        setHistory(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching status history:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // Abonnement aux changements en temps réel
    const subscription = supabase
      .channel(`reservation_history_${reservationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reservation_status_history',
          filter: `reservation_id=eq.${reservationId}`
        },
        () => {
          fetchHistory();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [reservationId]);

  return { history, loading, error };
};
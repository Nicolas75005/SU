import { useState, useEffect } from 'react';
import { supabase } from '../auth/supabase';
import { addDays, format, subDays } from 'date-fns';

interface DailyStats {
  date: string;
  count: number;
  guests: number;
}

export const useReservationStats = (period: 7 | 30 = 7) => {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const endDate = new Date();
        const startDate = subDays(endDate, period - 1);

        const { data, error: fetchError } = await supabase
          .from('reservations')
          .select('date, guests')
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', endDate.toISOString().split('T')[0])
          .eq('status', 'confirmed');

        if (fetchError) throw fetchError;

        // Initialiser un tableau avec toutes les dates de la période
        const dailyStats: Record<string, DailyStats> = {};
        for (let i = 0; i < period; i++) {
          const date = format(addDays(startDate, i), 'yyyy-MM-dd');
          dailyStats[date] = { date, count: 0, guests: 0 };
        }

        // Agréger les données
        data.forEach((reservation) => {
          const date = reservation.date;
          if (dailyStats[date]) {
            dailyStats[date].count++;
            dailyStats[date].guests += reservation.guests;
          }
        });

        setStats(Object.values(dailyStats));
        setError(null);
      } catch (err: any) {
        console.error('Error fetching reservation stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  return { stats, loading, error };
};
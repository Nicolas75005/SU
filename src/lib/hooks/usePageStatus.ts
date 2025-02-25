import { useState, useEffect } from 'react';
import { PageStatusService } from '../services/pageStatusService';
import { useAuthStore } from '../auth/session';
import { Page } from '../../types/admin';

export const usePageStatus = (page: Page) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);
  const { user } = useAuthStore();
  const pageStatusService = PageStatusService.getInstance();

  useEffect(() => {
    loadStatusHistory();
  }, [page.id]);

  const loadStatusHistory = async () => {
    const history = await pageStatusService.getStatusHistory(page.id);
    setStatusHistory(history);
  };

  const toggleStatus = async (reason?: string): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await pageStatusService.updatePageStatus(
        page.id,
        !page.isVisible,
        user.id,
        reason
      );

      if (success) {
        await loadStatusHistory();
      } else {
        setError('Failed to update page status');
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    statusHistory,
    toggleStatus
  };
};
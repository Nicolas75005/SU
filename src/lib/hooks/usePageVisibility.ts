import { useState } from 'react';
import { Page, VisibilityChange } from '../../types/admin';
import { useAuthStore } from '../auth/session';

export const usePageVisibility = () => {
  const [visibilityHistory, setVisibilityHistory] = useState<VisibilityChange[]>([]);
  const { user } = useAuthStore();

  const togglePageVisibility = async (page: Page, reason?: string): Promise<boolean> => {
    if (!user || user.role !== 'admin') {
      console.error('Unauthorized access attempt to toggle page visibility');
      return false;
    }

    try {
      const change: VisibilityChange = {
        id: crypto.randomUUID(),
        pageId: page.id,
        previousState: page.isVisible,
        newState: !page.isVisible,
        timestamp: new Date(),
        modifiedBy: user.email,
        reason
      };

      setVisibilityHistory(prev => [...prev, change]);
      
      // In a real app, this would be an API call
      // await updatePageVisibility(page.id, !page.isVisible);
      
      return true;
    } catch (error) {
      console.error('Error toggling page visibility:', error);
      return false;
    }
  };

  const getPageVisibilityHistory = (pageId: string): VisibilityChange[] => {
    return visibilityHistory.filter(change => change.pageId === pageId);
  };

  return {
    togglePageVisibility,
    getPageVisibilityHistory,
    visibilityHistory
  };
};
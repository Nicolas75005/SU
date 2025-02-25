import { supabase } from '../db/supabase';
import { Page } from '../../types/admin';

export class PageStatusService {
  private static instance: PageStatusService;
  private retryAttempts = 3;
  private retryDelay = 1000;

  private constructor() {}

  static getInstance(): PageStatusService {
    if (!PageStatusService.instance) {
      PageStatusService.instance = new PageStatusService();
    }
    return PageStatusService.instance;
  }

  async getPageStatus(pageId: string): Promise<boolean | null> {
    try {
      const { data, error } = await supabase
        .from('page_status')
        .select('status')
        .eq('page_id', pageId)
        .single();

      if (error) throw error;
      return data?.status ?? null;
    } catch (error) {
      console.error('Error fetching page status:', error);
      return null;
    }
  }

  async updatePageStatus(
    pageId: string,
    status: boolean,
    userId: string,
    reason?: string
  ): Promise<boolean> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const previousStatus = await this.getPageStatus(pageId);
        
        // Start transaction
        const { error: updateError } = await supabase
          .from('page_status')
          .upsert({
            page_id: pageId,
            status,
            last_updated: new Date().toISOString(),
            updated_by: userId
          });

        if (updateError) throw updateError;

        // Log status change in history
        const { error: historyError } = await supabase
          .from('page_status_history')
          .insert({
            page_id: pageId,
            previous_status: previousStatus ?? false,
            new_status: status,
            changed_by: userId,
            reason: reason || null
          });

        if (historyError) throw historyError;

        return true;
      } catch (error) {
        console.error(`Update attempt ${attempt} failed:`, error);
        
        if (attempt === this.retryAttempts) {
          console.error('Max retry attempts reached');
          return false;
        }

        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }

    return false;
  }

  async getStatusHistory(pageId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('page_status_history')
        .select('*')
        .eq('page_id', pageId)
        .order('changed_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching status history:', error);
      return [];
    }
  }

  async initializePageStatus(page: Page, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('page_status')
        .insert({
          page_id: page.id,
          status: true,
          last_updated: new Date().toISOString(),
          updated_by: userId
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error initializing page status:', error);
      return false;
    }
  }
}
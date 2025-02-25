export interface Database {
  public: {
    Tables: {
      page_status: {
        Row: {
          id: string;
          page_id: string;
          status: boolean;
          last_updated: string;
          updated_by: string;
        };
        Insert: {
          id?: string;
          page_id: string;
          status: boolean;
          last_updated?: string;
          updated_by: string;
        };
        Update: {
          id?: string;
          page_id?: string;
          status?: boolean;
          last_updated?: string;
          updated_by?: string;
        };
      };
      page_status_history: {
        Row: {
          id: string;
          page_id: string;
          previous_status: boolean;
          new_status: boolean;
          changed_at: string;
          changed_by: string;
          reason: string | null;
        };
        Insert: {
          id?: string;
          page_id: string;
          previous_status: boolean;
          new_status: boolean;
          changed_at?: string;
          changed_by: string;
          reason?: string | null;
        };
      };
    };
  };
}
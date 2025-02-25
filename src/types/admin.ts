import { Database } from './database';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: Date;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  table_number?: number;
  special_requests?: string;
  created_at: Date;
}

export interface ReservationStats {
  total: number;
  trend: string;
}
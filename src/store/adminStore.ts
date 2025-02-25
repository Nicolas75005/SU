import { create } from 'zustand';
import { AdminUser } from '../types/admin';

interface AdminStore {
  user: AdminUser | null;
  setUser: (user: AdminUser | null) => void;
  isAuthenticated: boolean;
}

export const useAdminStore = create<AdminStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false,
}));
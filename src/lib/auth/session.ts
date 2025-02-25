import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser } from '../../types/admin';
import { getSession, onAuthStateChange } from './supabase';

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: AdminUser | null) => void;
  clearSession: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setSession: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      clearSession: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      initializeAuth: async () => {
        try {
          const session = await getSession();
          if (session?.user) {
            set({
              user: {
                id: session.user.id,
                email: session.user.email!,
                role: 'admin'
              },
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Initialize auth state
if (typeof window !== 'undefined') {
  useAuthStore.getState().initializeAuth();

  // Set up auth state change listener
  onAuthStateChange((session) => {
    if (session?.user) {
      useAuthStore.getState().setSession({
        id: session.user.id,
        email: session.user.email!,
        role: 'admin'
      });
    } else {
      useAuthStore.getState().clearSession();
    }
  });
}
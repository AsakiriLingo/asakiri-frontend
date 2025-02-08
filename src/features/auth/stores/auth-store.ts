import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

import { AuthState, AuthStore } from '../types/auth.types';

import { supabase } from '@/lib/supabase/client';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  accessToken: null,

  setAuthState: (state: Partial<AuthState>) => set(state),

  getAccessToken: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      const token = session?.access_token;
      if (token) {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser(token);
        if (!userError && user) {
          set({
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email || undefined,
              name: user.user_metadata?.name as string | undefined,
              avatar_url: user.user_metadata?.avatar_url as string | undefined,
            },
          });
        }
      }

      set({ accessToken: token || null });
      return token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  loginWithRedirect: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('OAuth login error:', error);
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
      });

      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Logout error:', error);
        return error;
      }
      return new Error('Unknown error during logout');
    }
  },
}));

const handleAuthStateChange = (
  event: string,
  session: Session | null
): void => {
  if (event === 'SIGNED_IN' && session) {
    const user = session.user;
    useAuthStore.setState({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email || undefined,
        name: user.user_metadata?.name as string | undefined,
        avatar_url: user.user_metadata?.avatar_url as string | undefined,
      },
      accessToken: session.access_token,
      isLoading: false,
    });
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isLoading: false,
    });
  }
};

// Set up auth state listener
supabase.auth.onAuthStateChange(handleAuthStateChange);

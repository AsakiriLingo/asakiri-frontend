import React, { useEffect, useState } from 'react';

import { useAuthStore } from '../stores/auth-store';

import { supabase } from '@/lib/supabase/client';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuthState } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          const { user } = session;
          const {
            data: { avatar_url },
          } = await supabase
            .from('profiles')
            .select(
              `
          *
        `
            )
            .eq('id', user.id)
            .single();
          setAuthState({
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email || undefined,
              name: user.user_metadata?.name as string | undefined,
              avatar: avatar_url as string | undefined,
            },
            accessToken: session.access_token,
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setAuthState]);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  return <>{children}</>;
};

import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

import { useAuthStore } from '../stores/auth-store';

import LoadingSpinner from '@/components/loading-spinner/loading-spinner.tsx';
import { supabase } from '@/lib/supabase/client';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setAuthState } = useAuthStore();

  const createOrUpdateProfile = async (user: User) => {
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const { error: insertError } = await supabase.from('profiles').insert({
          id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0],
          updated_at: new Date().toISOString(),
        });

        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          const { user } = session;

          await createOrUpdateProfile(user);

          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, name, avatar_url')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          setAuthState({
            isAuthenticated: true,
            user: {
              id: user.id,
              email: user.email || undefined,
              name: profile.name || user.user_metadata?.full_name,
              avatar: profile.avatar_url || '',
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
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};

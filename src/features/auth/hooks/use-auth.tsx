import { User, AuthError, AuthResponse } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client.ts';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends SignInCredentials {
  name?: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    initialized: false,
  });

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // Update state with user from session
        setState((prev) => ({
          ...prev,
          user: session?.user ?? null,
          loading: false,
          initialized: true,
        }));

        // Set up auth state change subscription
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          setState((prev) => ({
            ...prev,
            user: session?.user ?? null,
            loading: false,
          }));

          // Handle auth state changes
          switch (event) {
            case 'SIGNED_IN':
              // Create or update user profile
              if (session?.user) {
                await createOrUpdateProfile(session.user);
              }
              break;
            case 'SIGNED_OUT':
              navigate('/sign-in');
              break;
          }
        });

        // Cleanup subscription
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState((prev) => ({
          ...prev,
          loading: false,
          initialized: true,
        }));
      }
    };

    initializeAuth();
  }, [navigate]);

  // Create or update user profile in profiles table
  const createOrUpdateProfile = async (user: User) => {
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name: user.user_metadata.name || user.email?.split('@')[0],
        avatar_url: user.user_metadata.avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error upserting profile:', error);
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (
    credentials: SignInCredentials
  ): Promise<AuthResponse> => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await supabase.auth.signInWithPassword(credentials);

      if (response.error) {
        toast.error(response.error.message);
        throw response.error;
      }

      return response;
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (
    credentials: SignUpCredentials
  ): Promise<AuthResponse> => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (response.error) {
        toast.error(response.error.message);
        throw response.error;
      }

      return response;
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Sign out
  const signOut = async () => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        throw error;
      }
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success('Password updated successfully');
    } catch (error) {
      const authError = error as AuthError;
      throw authError;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    initialized: state.initialized,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
  };
}

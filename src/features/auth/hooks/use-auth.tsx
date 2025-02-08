import { useCallback, useEffect, useState } from 'react';

import { AuthState, AuthUserMetadata } from '../types/auth.types';

import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Get initial session and set up auth listener
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        user: session?.user
          ? {
              ...session.user,
              user_metadata: session.user.user_metadata as AuthUserMetadata,
            }
          : null,
        loading: false,
      }));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        user: session?.user
          ? {
              ...session.user,
              user_metadata: session.user.user_metadata as AuthUserMetadata,
            }
          : null,
        loading: false,
      }));
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign up with email and password
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to sign up: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Successfully signed in!');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to sign in: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to sign in with Google: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Successfully signed out!');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to sign out: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to reset password: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Update password
  const updatePassword = useCallback(async (password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success('Password updated successfully!');
    } catch (error) {
      setState((prev) => ({ ...prev, error: error as Error }));
      toast.error('Failed to update password: ' + (error as Error).message);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return {
    ...state,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    resetPassword,
    updatePassword,
  };
};

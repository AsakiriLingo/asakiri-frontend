import { createClient, SupabaseClient } from '@supabase/supabase-js';

import type { Database } from './types';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing environment variable: VITE_SUPABASE_URL');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: VITE_SUPABASE_ANON_KEY');
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'x-client-info': 'asakiri-web',
    },
  },
});

interface ErrorResponse {
  message: string;
  code?: string;
}

// Error handling wrapper
export const handleError = (error: Error | null): ErrorResponse | null => {
  if (error) {
    console.error('Supabase Error:', error.message);
    return {
      message: error.message,
      code: (error as { code?: string }).code,
    };
  }
  return null;
};

export type TypedSupabaseClient = SupabaseClient<Database>;

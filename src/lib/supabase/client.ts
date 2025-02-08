import { RealtimeChannel, createClient } from '@supabase/supabase-js';

import { Database } from './types';

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
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

type RealtimePostgresChanges<T> = {
  new: T;
  old: T | null;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
};

export const realtime = {
  subscribeToTable: <T extends keyof Database['public']['Tables']>(
    table: T,
    callback: (
      payload: RealtimePostgresChanges<Database['public']['Tables'][T]['Row']>
    ) => void
  ): RealtimeChannel => {
    return supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) =>
          callback(
            payload as unknown as RealtimePostgresChanges<
              Database['public']['Tables'][T]['Row']
            >
          )
      )
      .subscribe();
  },
};

interface ErrorResponse {
  message: string;
  code?: string;
}

export const handleError = (error: Error | null): ErrorResponse | null => {
  if (error) {
    console.error('Supabase Error:', error.message);
    return {
      message: error.message,
      code: 'code' in error ? (error.code as string) : undefined,
    };
  }
  return null;
};

export const checkPermissions = async (
  userId: string,
  resource: keyof Database['public']['Tables'],
  action: 'create' | 'read' | 'update' | 'delete'
): Promise<boolean> => {
  const { data, error } = await supabase
    .from(resource)
    .select('user_id')
    .eq('user_id', userId)
    .single();

  if (error) {
    return false;
  }

  switch (action) {
    case 'read':
      return true;
    case 'create':
      return !!userId;
    case 'update':
    case 'delete':
      return data?.user_id === userId;
    default:
      return false;
  }
};

export type { RealtimePostgresChanges };

import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from '../features/auth/providers/auth-provider.tsx';

import { Toaster } from '@/components/toast';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Suspense fallback={null}>
      <ErrorBoundary fallback={null}>
        <Toaster />
        <HelmetProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              {import.meta.env.DEV && <ReactQueryDevtools />}

              {children}
            </QueryClientProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

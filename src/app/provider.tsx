import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Toaster } from '@/components/toast';
import { useAuth } from '@/features/auth/hooks/use-auth';

interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error occurred!</div>}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools />}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

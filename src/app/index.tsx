import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppRouter } from './router';

import { ThemeProvider } from '@/components/theme-switcher/theme-switcher';
import { AuthProvider } from '@/features/auth/providers/auth-provider';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

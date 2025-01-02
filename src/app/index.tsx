import { AppProvider } from '@/app/provider';
import { AppRouter } from '@/app/router.tsx';
import { ThemeProvider } from '@/components/theme-switcher';

export const App = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppRouter></AppRouter>
      </AppProvider>
    </ThemeProvider>
  );
};

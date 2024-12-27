import { AppProvider } from '@/app/provider';
import { AppRouter } from '@/app/router.tsx';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter></AppRouter>
    </AppProvider>
  );
};

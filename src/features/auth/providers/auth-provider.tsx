import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

import { useAuthStore } from '../stores/auth-store.ts';

const AUTH0_CONFIG = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
} as const;

const AuthStateSync = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    setAuthState({
      user,
      isAuthenticated,
      isLoading,
    });
  }, [user, isAuthenticated, isLoading, setAuthState]);

  return <>{children}</>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider {...AUTH0_CONFIG}>
      <AuthStateSync>{children}</AuthStateSync>
    </Auth0Provider>
  );
};

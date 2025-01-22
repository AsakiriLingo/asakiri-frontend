import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { env } from 'src/config/env.ts';

import { useAuthStore } from '../stores/auth-store.ts';

const AuthStateSync = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    setAuthState({ isAuthenticated, user, isLoading });
    useAuthStore.setState({
      loginWithRedirect,
      logout: () =>
        logout({ logoutParams: { returnTo: window.location.origin } }),
    });
  }, [
    user,
    isAuthenticated,
    isLoading,
    setAuthState,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  ]);

  return <>{children}</>;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const onRedirectCallback = (appState: AppState | undefined) => {
    window.location.replace(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };
  return (
    <Auth0Provider
      domain={env.AUTH0_DOMAIN}
      clientId={env.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: env.AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthStateSync>{children}</AuthStateSync>
    </Auth0Provider>
  );
};

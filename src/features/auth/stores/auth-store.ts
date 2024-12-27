import { useAuth0 } from '@auth0/auth0-react';
import { create } from 'zustand';

import { AuthStore } from '../types/auth.ts';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  accessToken: null,

  setAuthState: (state) => set(state),
  getAccessToken: async () => {
    const { getAccessTokenSilently } = useAuth0();
    try {
      const token = await getAccessTokenSilently();
      set({ accessToken: token });
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
  loginWithRedirect: async () => {
    const { loginWithRedirect } = useAuth0();
    await loginWithRedirect();
  },
  logout: async () => {
    const { logout } = useAuth0();
    await logout({ logoutParams: { returnTo: window.location.origin } });
    set({ isAuthenticated: false, user: null, accessToken: null });
  },
}));

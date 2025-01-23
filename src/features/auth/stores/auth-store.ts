import { useAuth0 } from '@auth0/auth0-react';
import { create } from 'zustand';

import { AuthStore } from '../types/auth.ts';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setAuthState: (state) => set(state),
  getAccessToken: async () => {
    try {
      const { getAccessTokenSilently } = useAuth0();
      return await getAccessTokenSilently();
    } catch (error: unknown) {
      console.error(error);
    }
  },
  loginWithRedirect: async () => {
    const { loginWithRedirect } = useAuth0();
    await loginWithRedirect();
  },
  logout: async () => {
    const { logout } = useAuth0();
    await logout({ logoutParams: { returnTo: window.location.origin } });
    set({ isAuthenticated: false, user: null });
  },
}));

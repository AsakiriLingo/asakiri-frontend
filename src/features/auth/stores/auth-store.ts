import { create } from 'zustand';

import { AuthStore } from '../types/auth.ts';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  accessToken: null,

  setAuthState: (state) => set(state),
  getAccessToken: async (getAccessTokenSilently: () => Promise<string>) => {
    try {
      const token = await getAccessTokenSilently();
      set({ accessToken: token });
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
  loginWithRedirect: null,
  logout: null,
}));

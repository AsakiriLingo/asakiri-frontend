interface AuthUser {
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  accessToken: string | null;
}

interface AuthStore extends AuthState {
  setAuthState: (state: Partial<AuthState>) => void;
  getAccessToken: () => Promise<string | null>;
  loginWithRedirect: () => Promise<void>;
  logout: () => Promise<void>;
}

export type { AuthUser, AuthState, AuthStore };

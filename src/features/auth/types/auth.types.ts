interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
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
  logout: () => Promise<Error | null>;
}

export type { AuthUser, AuthState, AuthStore };

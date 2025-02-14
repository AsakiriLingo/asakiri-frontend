export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  accessToken: string | null;
}

export interface AuthStore extends AuthState {
  setAuthState: (state: Partial<AuthState>) => void;
  getAccessToken: () => Promise<string | null>;
  loginWithRedirect: () => Promise<void>;
  logout: () => Promise<void>;
}

// OAuth provider types
export type OAuthProvider = 'google' | 'github' | 'facebook' | 'twitter';

// Sign-up data type
export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

// Sign-in data type
export interface SignInData {
  email: string;
  password: string;
}

// Reset password data type
export interface ResetPasswordData {
  email: string;
}

// Update password data type
export interface UpdatePasswordData {
  password: string;
}

// Auth error type
export interface AuthError {
  message: string;
  code?: string;
}

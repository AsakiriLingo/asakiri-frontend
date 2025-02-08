import { useNavigate } from 'react-router-dom';

import { useAuthContext } from './providers/auth-provider';

export const useAuthNavigation = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const handleSignIn = async (email: string, password: string) => {
    await auth.signIn(email, password);
    navigate('/');
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handlePasswordUpdate = async (password: string) => {
    await auth.updatePassword(password);
    navigate('/');
  };

  return {
    ...auth,
    signIn: handleSignIn,
    signOut: handleSignOut,
    updatePassword: handlePasswordUpdate,
  };
};

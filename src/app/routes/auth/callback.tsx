import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase/client';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        navigate('/login?error=Unable to authenticate');
        return;
      }

      // Get the URL fragment
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');

      if (accessToken && refreshToken) {
        // Set the session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          navigate('/login?error=Unable to set session');
          return;
        }
      }

      // Get the 'next' parameter from the URL
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/';

      navigate(next);
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
}

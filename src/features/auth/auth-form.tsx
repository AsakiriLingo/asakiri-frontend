import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/lib/supabase/client';

import './auth-form.scss';

export const AuthForm: React.FC = () => {
  useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-title">Welcome to Asakiri</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0EC02B',
                  brandAccent: '#26C640',
                },
              },
            },
          }}
          providers={['google']}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders={false}
          theme="light"
          socialLayout="horizontal"
        />
      </div>
    </div>
  );
};

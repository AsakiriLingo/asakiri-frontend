import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Head } from '@/components/seo';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { supabase } from '@/lib/supabase/client';
import './auth.scss';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Head description="Sign up for Asakiri" />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="auth-logo-link">
              <img
                src="/asakiri-logo.svg"
                alt="Asakiri Logo"
                className="auth-logo"
              />
            </Link>
            <h1 className="auth-title">Create an account</h1>
            <p className="auth-subtitle">
              Join Asakiri to start learning or teaching
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'var(--primary)',
                    brandAccent: 'var(--primary-container)',
                  },
                  radii: {
                    borderRadiusButton: 'var(--radius-md)',
                    inputBorderRadius: 'var(--radius-sm)',
                  },
                },
              },
              className: {
                container: 'auth-form-container',
                button: 'auth-button',
                input: 'auth-input',
                label: 'auth-label',
                loader: 'auth-loader',
                message: 'auth-message',
                divider: 'auth-divider',
                anchor: 'auth-link',
              },
            }}
            view="sign_up"
            theme="default"
            showLinks={false}
            providers={['google']}
            redirectTo={`${window.location.origin}/auth/callback`}
          />

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/sign-in" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { AuthForm } from '@/features/auth/auth-form.tsx';
import { useAuth } from '@/features/auth/hooks/use-auth';
import './login.scss';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <Head description="Login to Asakiri" />
      <NavBar />
      <main className="login-container">
        <div className="login-form">
          <h1 className="login-title">Welcome Back</h1>
          <AuthForm />
          <p className="login-redirect">
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

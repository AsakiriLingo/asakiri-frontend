import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { AuthForm } from '@/features/auth/auth-form.tsx';
import { useAuth } from '@/features/auth/hooks/use-auth';
import './sign-up.scss';

const SignUpPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="signup-page">
      <Head description="Sign up for Asakiri" />
      <NavBar />
      <main className="signup-container">
        <div className="signup-form">
          <h1 className="signup-title">Create Your Account</h1>
          <AuthForm />
          <p className="signup-redirect">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
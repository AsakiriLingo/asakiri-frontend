import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Head } from '@/components/seo';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';

import './sign-in.scss';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SigninPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Signing in with Google...');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        if (signInError.message.includes('email')) {
          setError('email', {
            type: 'manual',
            message: 'Invalid email address',
          });
        } else if (signInError.message.includes('password')) {
          setError('password', {
            type: 'manual',
            message: 'Invalid password',
          });
        } else {
          // Generic auth error
          setError('password', {
            type: 'manual',
            message: 'Invalid email or password',
          });
        }
        return;
      }

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <Head description="Log in to Asakiri"></Head>
      <div className="login__container">
        <h1 className="login__title">Welcome Back</h1>

        {/* Google Sign In Button */}
        <Button type="tertiary" size="medium" onPress={handleGoogleSignIn}>
          <span className="login__google-button-content">
            <Image
              className="login__google-icon"
              height="20px"
              width="20px"
              src="/icons/google-icon.svg"
              alt={'Google'}
            />
            {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
          </span>
        </Button>

        <div className="login__divider">
          <span className="login__divider-text">or</span>
        </div>

        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  text={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  text={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  type="password"
                />
              )}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <Button type="primary" size="medium" actionType="submit">
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="login__links">
          <Button
            type="primary"
            variant="ghost"
            size="small"
            isLink={true}
            href="/forgot-password"
          >
            Forgot Password?
          </Button>
          <p className="login__signup-text">
            Don't have an account?{' '}
            <Button
              type="primary"
              variant="ghost"
              size="small"
              isLink={true}
              href="/sign-up"
            >
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

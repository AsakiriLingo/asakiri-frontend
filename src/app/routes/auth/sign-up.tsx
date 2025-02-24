import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { Seo } from '@/components/seo';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';

import './sign-up.scss';

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleGoogleSignUp = async () => {
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

      // Note: We don't need to manually create a profile here as it's handled by Supabase's OAuth callback
      toast.success('Signing in with Google...');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);

      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
            },
          },
        }
      );

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          setError('email', {
            type: 'manual',
            message: 'An account with this email already exists',
          });
          return;
        }

        if (signUpError.message.includes('password')) {
          setError('password', {
            type: 'manual',
            message: 'Password is invalid',
          });
          return;
        }

        throw signUpError;
      }

      if (!authData.user?.id) {
        throw new Error('No user ID returned from signup');
      }

      // Create profile in profiles table
      // const { error: profileError } = await supabase.from('profiles').insert({
      //   id: authData.user.id,
      //   name: data.name,
      // });
      //
      // if (profileError) {
      //   console.error('Profile creation error:', profileError);
      //   await supabase.auth.signOut();
      //   throw profileError;
      // }

      toast.success(
        'Verification email sent. Please verify account to sign in.',
        {
          duration: 60000,
          dismissible: true,
          closeButton: true,
        }
      );
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign up error:', error);

      if (error instanceof Error) {
        if (error.message.includes('sending confirmation email')) {
          toast.success(
            'Verification email sent. Please verify account to sign in.'
          );
          navigate('/sign-in');
          return;
        }
        toast.error(error.message);
      } else {
        toast.error('Failed to sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <Seo description="Sign up for Asakiri"></Seo>
      <div className="sign-up__container">
        <h1 className="sign-up__title">Create an Account</h1>

        {/* Google Sign Up Button */}
        <Button type="tertiary" size="medium" onPress={handleGoogleSignUp}>
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

        <div className="sign-up__divider">
          <span className="sign-up__divider-text">or</span>
        </div>

        <form className="sign-up__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  text={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

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
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="sign-up__login-link">
          Already have an account?{' '}
          <Button
            type="primary"
            variant="ghost"
            size="small"
            isLink={true}
            href="/sign-in"
          >
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

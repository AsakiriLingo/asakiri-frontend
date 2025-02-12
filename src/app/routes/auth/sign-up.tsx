import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { supabase } from '@/lib/supabase/client';

import './sign-up.scss';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
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

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true);

      // Create user in Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        }
      );

      if (signUpError) {
        if (signUpError.message.includes('email')) {
          setError('email', {
            type: 'manual',
            message: 'Invalid email or email already taken',
          });
        } else if (signUpError.message.includes('password')) {
          setError('password', {
            type: 'manual',
            message: 'Password is invalid',
          });
        } else {
          throw signUpError;
        }
        return;
      }

      if (!authData.user?.id) {
        throw new Error('No user ID returned from signup');
      }

      // Create profile in profiles table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        name: data.name,
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        await supabase.auth.signOut();
        throw new Error('Failed to create user profile');
      }

      toast.success(
        'Sign up successful! Please check your email to verify your account.'
      );
      navigate('/login');
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <Head description="Sign up for Asakiri"></Head>
      <div className="sign-up__container">
        <h1 className="sign-up__title">Create an Account</h1>
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
            href="/login"
          >
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

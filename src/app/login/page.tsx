'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// validation using zod

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

// Component start

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [error, setError] = useState('');

  // Submit functionality

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        data
      );
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        toast.success('Login successful!');
        router.push('/product');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login'>
      <div className='login-triangle'></div>
      <h2 className='login-header'>Log in</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='login-container'>
        <div>
          <label>Username</label>
          <p>
            <input {...register('username')} />
          </p>
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <p>
            <input type='password' {...register('password')} />
          </p>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='text-center'>
          {' '}
          <button type='submit' className='login-btn'>
            Login
          </button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;

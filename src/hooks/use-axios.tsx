import axios, { AxiosInstance } from 'axios';
import { useEffect, useMemo } from 'react';

import { env } from '../config/env.ts';
import { setupInterceptors } from '../lib/api-client.ts';

import { useAuthStore } from '@/features/auth/stores/auth-store.ts';

export const useAxios = (): AxiosInstance => {
  const { accessToken, isAuthenticated } = useAuthStore();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: env.API_BASE_URL,
    });
  }, []);

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors(
      axiosInstance,
      isAuthenticated,
      accessToken
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, accessToken, isAuthenticated]);

  return axiosInstance;
};

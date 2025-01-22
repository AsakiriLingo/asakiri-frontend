import axios, { AxiosInstance } from 'axios';
import { useEffect, useMemo } from 'react';

import { env } from '../config/env.ts';
import { setupInterceptors } from '../lib/api-client.ts';

import { useAuthStore } from '@/features/auth/stores/auth-store.ts';
// import { useAuth0 } from '@auth0/auth0-react';

export const useAxios = (): AxiosInstance => {
  const { isAuthenticated, getAccessToken } = useAuthStore();
  // const { getAccessTokenSilently } = useAuth0();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: env.API_BASE_URL,
    });
  }, []);

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors(
      axiosInstance,
      isAuthenticated,
      getAccessToken
    );

    // console.log('@@ axios: ', accessToken);

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, isAuthenticated, getAccessToken]);

  return axiosInstance;
};

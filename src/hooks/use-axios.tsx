import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';
import { useEffect, useMemo } from 'react';

import { env } from '../config/env.ts';
import { setupInterceptors } from '../lib/api-client.ts';

export const useAxios = (): AxiosInstance => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: env.API_URL,
    });
  }, []);

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors(
      axiosInstance,
      isAuthenticated,
      getAccessTokenSilently
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance, getAccessTokenSilently, isAuthenticated]);

  return axiosInstance;
};

// interceptors.ts
import { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

export const setupInterceptors = (
  axiosInstance: AxiosInstance,
  isAuthenticated: boolean,
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>
) => {
  const requestInterceptor = axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access');
      }
      return Promise.reject(error);
    }
  );

  return { requestInterceptor, responseInterceptor };
};

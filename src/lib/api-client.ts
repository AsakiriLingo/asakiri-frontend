import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

export const setupInterceptors = (
  axiosInstance: AxiosInstance,
  isAuthenticated: boolean,
  getAccessToken: () => Promise<string | undefined>
) => {
  const requestInterceptor = axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (isAuthenticated) {
        const accessToken = await getAccessToken();
        console.log('@@ inside accessToken: ', accessToken);
        console.log('@@ isAuthenticated: ', isAuthenticated);
        try {
          config.headers.Authorization = `Bearer ${accessToken}`;
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

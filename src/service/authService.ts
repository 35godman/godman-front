import axios, { AxiosInstance } from 'axios';
import { prodApiConfig, testApiConfig } from '@/config/axios.config';

export let authService: AxiosInstance;
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'development') {
  authService = axios.create(testApiConfig);
} else {
  authService = axios.create(prodApiConfig);
}
authService.interceptors.request.use(
  (config) => {
    // Get the access token from the cookie
    // const token = Cookies.get('access_token');
    //
    // // If the token exists, set it in the Authorization header
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    console.error(error);
    // If there's an error in the request configuration, you can handle it here
    return Promise.reject(error);
  },
);

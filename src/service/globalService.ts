import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { prodApiConfig, testApiConfig } from '@/config/axios.config';
import { Modal } from 'antd';

let globalService: AxiosInstance;
const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'development') {
  globalService = axios.create(testApiConfig);
} else {
  globalService = axios.create(prodApiConfig);
}
globalService.interceptors.request.use(
  (config) => {
    // Get the access token from the cookie
    const token = Cookies.get('access_token');

    // If the token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If there's an error in the request configuration, you can handle it here
    return Promise.reject(error);
  },
);
globalService.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    if (error.config.method === 'post') {
      Modal.error({
        title: 'Request Error',
        content: error.response.data.message,
      });
    }

    console.error(error);
    //return Promise.resolve({ error });
  },
);

export default globalService;

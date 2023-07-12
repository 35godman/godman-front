export const testApiConfig = {
  baseURL: 'http://localhost:5050/api',
  timeout: 10000,
  headers: { WithCredentials: true },
};
export const prodApiConfig = {
  baseURL: '/api',
  timeout: 10000,
  headers: { WithCredentials: true },
};

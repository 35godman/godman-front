export const testApiConfig = {
  baseURL: 'http://localhost:5050/v1',
  timeout: 10000,
  headers: { WithCredentials: true },
};
export const prodApiConfig = {
  baseURL: '/v1',
  timeout: 10000,
  headers: { WithCredentials: true },
};

import axios, { AxiosHeaders } from 'axios';
import { validateEnvs } from '../utils/env.utils';

const { VITE_BACKEND_URL } = validateEnvs();

// TODO: Add authentication logic with interceptors

export const authInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
});

/**
 * Async function for making API Request
 * @returns Instance Of Axios Object With Auth Header on it
 */
authInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) throw new Error('token is undefined');

  // If headers are not AxiosHeaders, create an instance
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers || {});
  }

  // Set the Authorization header
  config.headers.set('Authorization', `Bearer ${accessToken}`);

  return config;
});

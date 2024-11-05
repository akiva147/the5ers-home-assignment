import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';

const { VITE_BACKEND_URL } = validateEnvs();

// TODO: Add authentication logic with interceptors

export const authInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
});

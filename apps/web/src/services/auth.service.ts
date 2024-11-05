import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';

const PREFIX = 'auth';
const { VITE_BACKEND_URL } = validateEnvs();

class AuthService {
  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/${PREFIX}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error during login', error);
      throw new Error('Failed to login');
    }
  }

  async signup(email: string, password: string) {
    try {
      await axios.post(`${VITE_BACKEND_URL}/${PREFIX}/signup`, {
        email,
        password,
      });
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
}

export const authService = new AuthService();

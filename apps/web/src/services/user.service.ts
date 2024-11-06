import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';

const PREFIX = 'user';
const { VITE_BACKEND_URL } = validateEnvs();

class UserService {
  async login(email: string, password: string): Promise<string> {
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

  async signup(email: string, password: string, fullName: string) {
    try {
      await axios.post(`${VITE_BACKEND_URL}/${PREFIX}/signup`, {
        email,
        password,
        fullName,
      });
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
}

export const userService = new UserService();

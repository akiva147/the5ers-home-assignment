import {
  User,
  UserStock,
  UserStockSchema,
} from '@the5ers-home-assignment/schemas';
import axios from 'axios';
import { validateEnvs } from '../utils/env.utils';
import { authInstance } from './index.service';

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

  async signup(user: User) {
    try {
      await axios.post(`${VITE_BACKEND_URL}/${PREFIX}/signup`, {
        ...user,
      });
    } catch (error) {
      console.error('Error during signup', error);
      throw new Error('Failed to signup');
    }
  }
  async addStock(stock: UserStock) {
    try {
      await authInstance.post(`${PREFIX}/stock`, {
        stock,
      });
    } catch (error) {
      console.error('Error during adding stock', error);
      throw new Error('Failed to add stock');
    }
  }
  async getStocks() {
    try {
      const response = await authInstance.get(`${PREFIX}/stock`);
      const data = UserStockSchema.array().parse(response.data);
      return data;
    } catch (error) {
      console.error('Error during fetching stocks', error);
      throw new Error('Failed to fetch stocks');
    }
  }
  async deleteStock(symbol: string) {
    try {
      await authInstance.delete(`${PREFIX}/stock/${symbol}`);
    } catch (error) {
      console.error('Error during stock deletion', error);
      throw new Error('Failed to delete stock');
    }
  }
}

export const userService = new UserService();

import { jwtDecode } from 'jwt-decode';
import { TokenUserSchema } from '../schemas/user.schema';

export const isTokenExpired = (): {
  isExpired: boolean;
  isUndefined: boolean;
  isAboutToExpire: boolean;
} => {
  const token = localStorage.getItem('token');

  if (!token)
    return { isExpired: false, isUndefined: true, isAboutToExpire: false };
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp;
    if (!expirationTime) throw new Error('Invalid token');
    return {
      isExpired: expirationTime < currentTime,
      isUndefined: false,
      // Check if the token is about to expire within the next 5 minutes (300 seconds)
      // Currently unused, might be useful in the future
      isAboutToExpire: expirationTime - currentTime < 300,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { isExpired: false, isUndefined: true, isAboutToExpire: false };
  }
};

export const getUser = () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('No token found');
  try {
    const decodedToken = jwtDecode(token);
    const user = TokenUserSchema.parse(decodedToken);

    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

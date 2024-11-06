import { jwtDecode } from 'jwt-decode';

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
      isAboutToExpire: expirationTime - currentTime < 300,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { isExpired: false, isUndefined: true, isAboutToExpire: false };
  }
};

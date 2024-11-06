import jwt from 'jsonwebtoken';
import { User } from '../modules/user/schemas/user.schema';
import { validateEnvs } from './env.utils';

export const generateAccessToken = (user: User) => {
  const { JWT_SECRET } = validateEnvs();

  const token = jwt.sign(
    { email: user.email, password: user.password, fullName: user.fullName },
    JWT_SECRET,
    {
      // uncomment this to debug token generation
      // expiresIn: '15s',
      expiresIn: '1h',
    }
  );
  return token;
};

import { z } from 'zod';
import { PageStockSchema } from './stock.schema';

export const regexes = {
  email: /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$)/gm,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
};

export const UserStockSchema = PageStockSchema.pick({
  name: true,
  symbol: true,
});

export const UserSchema = z.object({
  fullName: z.string().min(2).max(20),
  email: z.string().regex(regexes.email, { message: 'Invalid email' }),
  password: z.string().regex(regexes.password, {
    message:
      'Password must contain 1 digit, 1 lowercase, 1 uppercase, 1 special character, 8-16 characters long.',
  }),
  stocks: UserStockSchema.array().default([]),
});

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const TokenUserSchema = UserSchema.omit({
  password: true,
}).extend({
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type TokenUser = z.infer<typeof TokenUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type UserStock = z.infer<typeof UserStockSchema>;

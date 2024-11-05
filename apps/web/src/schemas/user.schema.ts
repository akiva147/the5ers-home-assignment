import { z } from 'zod';

const regexes = {
  email: /(^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$)/gm,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
};

export const UserSchema = z.object({
  email: z.string().regex(regexes.email, { message: 'Invalid email' }),
  password: z.string().regex(regexes.password, {
    message:
      'Password must contain 1 digit, 1 lowercase, 1 uppercase, 1 special character, 8-16 characters long.',
  }),
});

export type User = z.infer<typeof UserSchema>;

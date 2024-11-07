import { z } from 'zod';

export const customValidations = {
  dateString: z.string().transform((str) => new Date(str)),
};

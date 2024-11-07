import {
  LoginUserSchema,
  UserSchema,
  UserStockSchema,
} from '@the5ers-home-assignment/schemas';
import { createZodDto } from 'nestjs-zod';

export class UserStockDto extends createZodDto(UserStockSchema) {}
export class UserDto extends createZodDto(UserSchema) {}
export class LoginUserDto extends createZodDto(LoginUserSchema) {}

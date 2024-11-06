import { LoginUserSchema, UserSchema } from '@the5ers-home-assignment/schemas';
import { createZodDto } from 'nestjs-zod';

export class UserDto extends createZodDto(UserSchema) {}
export class LoginUserDto extends createZodDto(LoginUserSchema) {}

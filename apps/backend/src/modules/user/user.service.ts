import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { generateAccessToken } from '../../utils/auth.utils';
import { UserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup({ email, password }: UserDto) {
    try {
      console.log('🚀 ~ UserService ~ signup ~ existingUser:', {
        email,
        password,
      });
      try {
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
          throw new BadRequestException('User already exists');
        }
      } catch (error) {
        console.log('🚀 ~ UserService ~ signup ~ error:', error);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.userModel.create({
        email,
        password: hashedPassword,
      });
      return { message: 'User created successfully', userId: createdUser.id };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
  async login({ email, password }: UserDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalid credentials');
      } else {
        const token = generateAccessToken(user);

        return token;
      }
    } catch (error) {
      throw new InternalServerErrorException('Error logging user', error);
    }
  }
}

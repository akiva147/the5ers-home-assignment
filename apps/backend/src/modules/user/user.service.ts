import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginUserDto, UserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup({ email, password, fullName }: UserDto) {
    // uncomment to debug
    // console.log('🚀 ~ UserService ~ signup ~ { email, password, fullName }:', {
    //   email,
    //   password,
    //   fullName,
    // });
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.userModel.create({
        email,
        password: hashedPassword,
        fullName,
      });
      return { message: 'User created successfully', userId: createdUser.id };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user', error);
    }
  }

  async login({ email, password }: LoginUserDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Invalid credentials');
      } else {
        console.log('🚀 ~ UserService ~ login ~ user:', user);
        const payload = {
          sub: user._id,
          email: user.email,
          password: user.password,
          fullName: user.fullName,
        };
        const token = await this.jwtService.signAsync(payload);
        // uncomment to debug
        // console.log('🚀 ~ UserService ~ login ~ token:', token);

        return token;
      }
    } catch (error) {
      throw new InternalServerErrorException('Error logging user', error);
    }
  }
}

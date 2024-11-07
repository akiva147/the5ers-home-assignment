import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { TokenUser, UserStock } from '@the5ers-home-assignment/schemas';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginUserDto, UserDto, UserStockDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signup({ email, password, fullName, stocks }: UserDto) {
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
        stocks,
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
        // uncomment to debug
        // console.log('🚀 ~ UserService ~ login ~ user:', user);
        const payload = {
          sub: user._id,
          email: user.email,
          password: user.password,
          fullName: user.fullName,
          stocks: user.stocks,
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
  async addStockToList(stock: UserStockDto, user: TokenUser) {
    // uncomment to debug
    // console.log('🚀 ~ UserService ~ addStockToList ~ user:', user);
    // console.log('🚀 ~ UserService ~ addStockToList ~ stock:', stock);

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user.sub,
        { $push: { stocks: stock } },
        { new: true } // Returns the updated document
      );

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'Stock added successfully',
        userId: user.sub,
        updatedStocks: updatedUser.stocks,
      };
    } catch (error) {
      console.error('Failed to add stock:', error);
      throw new InternalServerErrorException('Failed to add stock', error);
    }
  }

  async findStocksByUserId(userId: string): Promise<UserStock[]> {
    try {
      const stocks = (await this.userModel.findById(userId)).stocks;
      return stocks;
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
      throw new InternalServerErrorException('Failed to fetch stocks', error);
    }
  }
}

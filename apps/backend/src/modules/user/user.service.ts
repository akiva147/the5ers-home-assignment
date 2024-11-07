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
import { LoginUserDto, UserDto } from './dto/create-user.dto';
import { Stock, User } from './schemas/user.schema';

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
  async addStockToList(stock: UserStock, user: TokenUser) {
    // uncomment to debug
    // console.log('🚀 ~ UserService ~ addStockToList ~ user:', user);
    // console.log('🚀 ~ UserService ~ addStockToList ~ stock:', stock);

    try {
      const foundUser = await this.userModel.findById(user.sub);

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      const stockExists = foundUser.stocks.some(
        (existingStock) => existingStock.symbol === stock.symbol
      );
      if (stockExists) {
        throw new BadRequestException(
          'User already has a stock with this symbol'
        );
      }

      foundUser.stocks.push(stock as Stock);
      await foundUser.save();

      return {
        message: 'Stock added successfully',
        userId: user.sub,
        updatedStocks: foundUser.stocks,
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
  async deleteStockByUserId(userId: string, symbol: string) {
    // uncomment to debug
    // console.log('🚀 ~ UserService ~ deleteStockByUserId ~ r:', userId);
    // console.log('🚀 ~ UserService ~ deleteStockByUserId ~ symbol:', symbol);

    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { stocks: { symbol: symbol } } }, // Make sure symbol matches
        { new: true }
      );
      return {
        message: 'Stock delete successfully',
        userId: userId,
        updatedStocks: updatedUser.stocks,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete stock', error);
    }
  }
}

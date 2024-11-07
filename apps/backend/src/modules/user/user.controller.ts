import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TokenUserSchema } from '@the5ers-home-assignment/schemas';
import { Public } from '../../decorators/publicRoute.decorator';
import { Request as Req } from '../../types/express.type';
import { LoginUserDto, UserDto, UserStockDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: UserDto) {
    return this.userService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() createUserDto: LoginUserDto) {
    return this.userService.login(createUserDto);
  }

  @Post('stock')
  add(@Body() createStockDto: UserStockDto, @Request() request: Req) {
    const user = TokenUserSchema.parse(request.user);
    return this.userService.addStockToList(createStockDto, user);
  }
  @Get('stock')
  findAll(@Request() request: Req) {
    const user = TokenUserSchema.parse(request.user);
    return this.userService.findStocksByUserId(user.sub);
  }
}

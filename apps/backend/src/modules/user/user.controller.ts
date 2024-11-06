import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDto: UserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: UserDto) {
    return this.userService.login(createUserDto);
  }
}

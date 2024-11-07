import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../decorators/publicRoute.decorator';
import { LoginUserDto, UserDto } from './dto/create-user.dto';
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
}

import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/domain/service/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  getUser() {
    return this.userService.getUser1();
  }
}

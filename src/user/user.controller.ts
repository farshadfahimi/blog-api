import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JWTGuarad } from '../auth/guard';
import { UserDocument } from './user.schema';
import { UserService } from './user.service';

@UseGuards(JWTGuarad)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/me')
  profile(@GetUser() user: UserDocument) {
    return user
  }

  @Get('/bookmarks')
  findBookmarks(@GetUser() user: UserDocument) {
    this.userService.findBookmarks(user)
  }
}

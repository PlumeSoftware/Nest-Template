import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserReq } from './user.entity';
import { BaseRes, Code } from '../../lib/common';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  @Get('list')
  public async getAllUsers(@Headers() header: { userId: string }, @Query('page') page: number): Promise<BaseRes> {
    try {
      const result = await this.userService.getAllUsers(page);
      return new BaseRes(Code.SUCCESS, result);
    } catch (e) {
      return new BaseRes(Code.ERROR, e.message);
    }
  }

  @Get('detail')
  public async getUserById(@Headers() header: { userId: string }, @Query() query: UserReq): Promise<BaseRes> {
    try {
      const result = await this.userService.getUserById(query.userId);
      return new BaseRes(Code.SUCCESS, result);
    } catch (e) {
      return new BaseRes(Code.ERROR, e.message);
    }
  }

  @Post('save')
  public async saveUser(@Headers() header: { userId: string }, @Body() body: UserReq): Promise<BaseRes> {
    try {
      await this.userService.saveUser(body.userId, body.userName);
      return new BaseRes(Code.SUCCESS);
    } catch (e) {
      return new BaseRes(Code.ERROR, e.message);
    }
  }

  @Post('delete')
  public async deleteUser(@Headers() header: { userId: string }, @Body() body: UserReq): Promise<BaseRes> {
    try {
      await this.userService.deleteUser(body.userId);
      return new BaseRes(Code.SUCCESS);
    }catch(e){
      return new BaseRes(Code.ERROR, e.message);
    }
  }
}

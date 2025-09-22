import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from './security/user.guard';
import express from 'express';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

  @Post('signup')
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
  @Post('login')
  async login(@Body() body: { userid: string; password: string }) {
    const user = await this.usersService.findByIdAndPw(body.userid, body.password);
    if (!user) {
      return { success: false, message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
    }
    const payload: Payload = {
      userid: user.userid,
      name: user.name,
      email: user.email
    }
    return { success: true, message: '로그인 성공', accessToken: this.jwtService.sign(payload) };
  }
  @Post('findid')
  async findid(@Body() body: { name: string; email: string }) {
    const user = await this.usersService.findByEmailAndName(body.email, body.name);
    if (!user) {
      return { success: false, message: '정보와 일치하는 아이디가 없습니다' };
    }
    return { success: true, message: '아이디 찾기 성공', userid: user.userid };
  }
  @Post('findpw')
  async findpw(@Body() body: { userid: string, email: string, name: string }) {
    const user = await this.usersService.findPw(body.userid, body.email, body.name);
    if (!user) {
      return { success: false, message: '정보와 일치하는 정보가 없습니다' };
    }
    return { success: true, message: '비밀번호 찾기 성공', userpw: user.password };
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('token')
  @UseGuards(UserGuard)
  isAuthenticated(@Req() req:express.Request): any{
    const user: any = req.user;
    return user
  }
}

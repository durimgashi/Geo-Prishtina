import { Body, Controller, Get, HttpCode, HttpStatus, Injectable, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { ValidationPipe } from "@nestjs/common"; 
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { LoginUserDTO } from "./dtos/login-user.dto";
import { AuthGuard } from "./auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDTO): Promise<User> { 
        return this.userService.createUser(createUserDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDTO): Promise<{access_token: string}> {
        return this.userService.loginUser(loginUserDto)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    userProfile(@Req() req: Request): Promise<User> {
        return this.userService.userProfile(req)
    }
    
}
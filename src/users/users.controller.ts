import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto copy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UsePipes(ValidationPipe)
    postUser(@Body() userData: CreateUserDto) {
        return this.usersService.createUser(userData)
    }

    @Post('login')
    @HttpCode(200)
    loginUser(@Body() user: any) {
        return this.usersService.login(user.email, user.password)
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    putUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() userData: UpdateUserDto,
    ) {
        return this.usersService.updateUser(id, userData)
    }

    @Get()
    getUsers() {
        return this.usersService.findAll()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id)
    }
}

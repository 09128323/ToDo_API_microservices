import { Body, Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/entities/users.entity';
import { Role } from 'src/entities/roles.entity';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    async create(@Body() userDto: CreateUserDto) {
        return await this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Получить пользователя по email' })
    @ApiResponse({ status: 200, type: User })
    @Get()
    async getUserByEmail(@Body('email') email: string) {
        return await this.usersService.getUserByEmail(email);
    }

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get('/allUsers')
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Добавить роль пользователю' })
    @ApiResponse({ status: 200, type: Role })
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Удалить пользователя по email' })
    @ApiResponse({ status: 200, type: User })
    @Delete('/deleteUserByEmail')
    async deleteUserByEmail(@Body('email') email: string) {
        return this.usersService.deleteUserByEmail(email);
    }
}

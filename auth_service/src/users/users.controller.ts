import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @MessagePattern('createUser')
    async create(@Payload() userDto: CreateUserDto) {
        return await this.usersService.createUser(userDto);
    }

    @MessagePattern('getAllUsers')
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    @MessagePattern('getUserByEmail')
    async getUserByEmail(@Payload() email: string) {
        return await this.usersService.getUserByEmail(email);
    }

    @MessagePattern('addRole')
    async addRole(@Payload() dto: AddRoleDto) {
        return await this.usersService.addRole(dto);
    }

    @MessagePattern('deleteUserByEmail')
    async deleteUserByEmail(@Payload() email: string) {
        return this.usersService.deleteUserByEmail(email);
    }
}

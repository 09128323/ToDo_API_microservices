import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly usersClient: ClientProxy
    ) {}

    async createUser(dto: CreateUserDto) {
        return this.usersClient.send('createUser', { email: dto.email });
    }

    async getAllUsers() {
        return this.usersClient.send('getAllUsers', {});
    }

    async addRole(dto: AddRoleDto) {
        return this.usersClient.send('addRole', { id: dto.userId });
    }

    async getUserByEmail(email: string) {
        return this.usersClient.send('getUserByEmail', { email });
    }
    async deleteUserByEmail(email: string) {
        return this.usersClient.send('deleteUserByEmail', { email });
    }
}

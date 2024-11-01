import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly rolesClient: ClientProxy
    ) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<any> {
        try {
            return this.rolesClient.send('create_role', createRoleDto);
        } catch (error) {
            throw new InternalServerErrorException('Error creating role');
        }
    }

    async getRoles(): Promise<any> {
        try {
            return this.rolesClient.send('get_roles', {});
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving roles');
        }
    }

    async getRoleById(roleId: number): Promise<any> {
        const role = this.rolesClient.send('get_role_by_id', { roleId });

        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async updateRole(
        roleId: number,
        updateRoleDto: UpdateRoleDto
    ): Promise<any> {
        try {
            return this.rolesClient.send('update_role', {
                roleId,
                ...updateRoleDto,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error updating role');
        }
    }

    async deleteRole(roleId: number): Promise<void> {
        try {
            await this.rolesClient.send('delete_role', { roleId });
        } catch (error) {
            throw new InternalServerErrorException('Error deleting role');
        }
    }
}

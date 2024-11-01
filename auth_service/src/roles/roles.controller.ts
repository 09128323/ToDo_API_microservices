import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/roles.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @MessagePattern('create_role')
    async createRole(@Payload() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(createRoleDto);
    }

    @MessagePattern('get_roles')
    async getRoles(): Promise<Role[]> {
        return this.rolesService.getRoles();
    }

    @MessagePattern('get_role_by_id')
    async getRoleById(@Payload() roleId: number): Promise<Role> {
        return this.rolesService.getRoleById(roleId);
    }

    @MessagePattern('update_role')
    async updateRole(
        @Payload() data: { roleId: number; updateRoleDto: UpdateRoleDto }
    ): Promise<Role> {
        const { roleId, updateRoleDto } = data;
        return this.rolesService.updateRole(roleId, updateRoleDto);
    }

    @MessagePattern('delete_role')
    async deleteRole(@Payload() roleId: number): Promise<void> {
        return this.rolesService.deleteRole(roleId);
    }
}

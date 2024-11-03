import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/entities/roles.entity';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Roles')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('roles')
@Roles('ADMIN')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: 201, description: 'Role created', type: Role })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: CreateRoleDto })
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'List of roles', type: [Role] })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<Role[]> {
        return this.rolesService.getRoles();
    }

    @Get(':roleId')
    @ApiOperation({ summary: 'Get role by ID' })
    @ApiResponse({
        status: 200,
        description: 'Role details',
        type: Role,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'roleId', description: 'ID of the role' })
    async findOne(@Param('roleId') roleId: number): Promise<Role> {
        return this.rolesService.getRoleById(roleId);
    }

    @Put(':roleId')
    @ApiOperation({ summary: 'Update role' })
    @ApiResponse({ status: 200, description: 'Role updated', type: Role })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'roleId', description: 'ID of the role' })
    @ApiBody({ type: UpdateRoleDto })
    async update(
        @Param('roleId') roleId: number,
        @Body() updateRoleDto: UpdateRoleDto
    ): Promise<Role> {
        return this.rolesService.updateRole(roleId, updateRoleDto);
    }

    @Delete(':roleId')
    @ApiOperation({ summary: 'Delete role' })
    @ApiResponse({ status: 200, description: 'Role deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'roleId', description: 'ID of the role' })
    async remove(@Param('roleId') roleId: number): Promise<void> {
        return this.rolesService.deleteRole(roleId);
    }
}

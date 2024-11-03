import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects.dto';
import { GetUserId } from 'src/auth/get-userId.decorator';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Проекты')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый проект' })
    @ApiResponse({ status: 201, description: 'Проект создан' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateProjectDto })
    createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUserId() userId: number
    ) {
        return this.projectsService.createProject(createProjectDto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список проектов' })
    @ApiResponse({ status: 200, description: 'Список проектов' })
    @ApiResponse({ status: 401, description: 'Не авторизован' })
    getProjects(@GetUserId() userId: number) {
        return this.projectsService.getProjects(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить проект по ID' })
    @ApiResponse({ status: 200, description: 'Проект найден' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    getProjectById(@Param('id') id: number, @GetUserId() userId: number) {
        return this.projectsService.getProjectById(id, userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить проект' })
    @ApiResponse({ status: 200, description: 'Проект обновлен' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    @ApiBody({ type: UpdateProjectDto })
    updateProject(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto,
        @GetUserId() userId: number
    ) {
        return this.projectsService.updateProject(id, updateProjectDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить проект' })
    @ApiResponse({ status: 204, description: 'Проект удален' })
    @ApiResponse({ status: 404, description: 'Проект не найден' })
    @ApiParam({ name: 'id', description: 'ID проекта' })
    deleteProject(@Param('id') projectId: number, @GetUserId() userId: number) {
        return this.projectsService.deleteProject(projectId, userId);
    }
}

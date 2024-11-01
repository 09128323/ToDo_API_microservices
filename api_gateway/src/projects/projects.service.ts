import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-projects.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @Inject('PROJECTS_SERVICE') private readonly projectsClient: ClientProxy
    ) {}

    async createProject(
        createProjectDto: CreateProjectDto,
        userId: number
    ): Promise<any> {
        try {
            return this.projectsClient.send('createProject', {
                name: createProjectDto.name,
                description: createProjectDto.description,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при создании проекта'
            );
        }
    }

    async getProjects(userId: number) {
        try {
            return this.projectsClient.send('getProjects', {
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при получении проектов'
            );
        }
    }

    async getProjectById(projectId: number, userId: number): Promise<any> {
        const project = this.projectsClient.send('getProjectById', {
            projectId,
            userId,
        });

        return project;
    }

    async updateProject(
        projectId: number,
        updateProjectDto: UpdateProjectDto,
        userId: number
    ): Promise<any> {
        const project = this.getProjectById(projectId, userId);
        if (!project) {
            throw new NotFoundException('Проект не найден');
        }

        try {
            return this.projectsClient.send('updateProject', {
                projectId,
                userId,
                name: updateProjectDto.name,
                description: updateProjectDto.description,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при обновлении проекта'
            );
        }
    }

    async deleteProject(projectId: number, userId: number): Promise<any> {
        return this.projectsClient.send('deleteProject', {
            projectId,
            userId,
        });
    }
}

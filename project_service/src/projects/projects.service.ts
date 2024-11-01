import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    async createProject(name: string, description: string, userId: number) {
        try {
            if (!name || !description) {
                throw new BadRequestException(
                    'Название и описание проекта обязательны.'
                );
            }

            const project = this.projectsRepository.create({
                name,
                description,
                userId,
                createdAt: new Date(),
            });

            return await this.projectsRepository.save(project);
        } catch (error) {
            console.error('Error while creating project:', error);
            throw new BadRequestException(
                'Ошибка при создании проекта: ' + error.message
            );
        }
    }

    async getProjects(userId: number) {
        try {
            const projects = await this.projectsRepository.find({
                where: { userId },
                relations: ['columns', 'columns.tasks'],
            });
            return projects;
        } catch (error) {
            throw new BadRequestException('Ошибка при получении проектов');
        }
    }

    async getProjectById(projectId: number, userId: number): Promise<Project> {
        const project = await this.projectsRepository.findOne({
            where: { id: projectId },
            relations: ['columns', 'columns.tasks'],
        });

        if (!project) {
            throw new NotFoundException('Проект не найден');
        }

        if (project.userId !== userId) {
            throw new UnauthorizedException('Нет доступа к этому проекту');
        }

        return project;
    }

    async updateProject(
        projectId: number,
        name: string,
        description: string,
        userId: number
    ): Promise<any> {
        const project = await this.getProjectById(projectId, userId);
        if (!project) {
            throw new NotFoundException('Проект не найден');
        }

        if (name) project.name = name;
        if (description) project.description = description;

        return await this.projectsRepository.save(project);
    }

    async deleteProject(projectId: number, userId: number): Promise<string> {
        try {
            const project = await this.getProjectById(projectId, userId);
            if (!project) {
                throw new NotFoundException('Проект не найден');
            }
            await this.projectsRepository.remove(project);
            return 'Проект успешно удален';
        } catch (error) {
            return 'Не удалось удалить проект';
        }
    }
}

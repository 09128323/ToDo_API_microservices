import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @MessagePattern('createProject')
    createProject(
        @Payload() data: { name: string; description: string; userId: number }
    ) {
        const { name, description, userId } = data;
        return this.projectsService.createProject(name, description, userId);
    }

    @MessagePattern('getProjects')
    getProjects(@Payload() data: { userId: number }) {
        const { userId } = data;
        return this.projectsService.getProjects(userId);
    }

    @MessagePattern('getProjectById')
    getProjectById(@Payload() data: { projectId: number; userId: number }) {
        const { projectId, userId } = data;
        return this.projectsService.getProjectById(projectId, userId);
    }

    @MessagePattern('updateProject')
    updateProject(
        @Payload()
        data: {
            projectId: number;
            name: string;
            description: string;
            userId: number;
        }
    ) {
        const { projectId, name, description, userId } = data;
        return this.projectsService.updateProject(
            projectId,
            name,
            description,
            userId
        );
    }

    @MessagePattern('deleteProject')
    deleteProject(@Payload() data: { projectId: number; userId: number }) {
        const { projectId, userId } = data;
        return this.projectsService.deleteProject(projectId, userId);
    }
}

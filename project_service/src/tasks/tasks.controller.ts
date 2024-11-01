import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './entities/tasks.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @MessagePattern('create_task')
    async createTask(
        @Payload()
        data: {
            columnId: number;
            createTaskDto: CreateTaskDto;
            userId: number;
        }
    ): Promise<Task> {
        const { columnId, userId, createTaskDto } = data;
        return this.tasksService.createTask(createTaskDto, columnId, userId);
    }

    @MessagePattern('get_tasks')
    async getTasks(
        @Payload() data: { columnId: number; userId: number }
    ): Promise<Task[]> {
        const { columnId, userId } = data;
        return this.tasksService.getTasks(columnId, userId);
    }

    @MessagePattern('get_task_by_id')
    async getTaskById(
        @Payload() data: { columnId: number; taskId: number; userId: number }
    ): Promise<Task> {
        const { columnId, taskId, userId } = data;
        return this.tasksService.getTaskById(columnId, taskId, userId);
    }

    @MessagePattern('update_task')
    async updateTask(
        @Payload()
        data: {
            columnId: number;
            taskId: number;
            updateTaskDto: UpdateTaskDto;
            userId: number;
        }
    ): Promise<Task> {
        const { columnId, taskId, userId, updateTaskDto } = data;
        return this.tasksService.updateTask(
            columnId,
            taskId,
            updateTaskDto,
            userId
        );
    }

    @MessagePattern('delete_task')
    async deleteTask(
        @Payload() data: { columnId: number; taskId: number; userId: number }
    ): Promise<void> {
        const { columnId, taskId, userId } = data;
        return this.tasksService.deleteTask(columnId, taskId, userId);
    }
}

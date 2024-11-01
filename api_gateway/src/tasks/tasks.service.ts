import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @Inject('PROJECTS_SERVICE') private readonly tasksClient: ClientProxy
    ) {}

    async createTask(
        createTaskDto: CreateTaskDto,
        columnId: number,
        userId: string
    ): Promise<any> {
        try {
            return this.tasksClient.send('create_task', {
                createTaskDto,
                columnId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error creating task');
        }
    }

    async getTasks(columnId: number, userId: string): Promise<any> {
        try {
            return this.tasksClient.send('get_tasks', {
                columnId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving tasks');
        }
    }

    async getTaskById(
        columnId: number,
        taskId: number,
        userId: string
    ): Promise<any> {
        try {
            return this.tasksClient.send('get_task_by_id', {
                columnId,
                taskId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error retrieving task');
        }
    }

    async updateTask(
        columnId: number,
        taskId: number,
        updateTaskDto: UpdateTaskDto,
        userId: string
    ): Promise<any> {
        try {
            return this.tasksClient.send('update_task', {
                columnId,
                taskId,
                updateTaskDto,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error updating task');
        }
    }

    async deleteTask(
        columnId: number,
        taskId: number,
        userId: string
    ): Promise<any> {
        try {
            return this.tasksClient.send('delete_task', {
                columnId,
                taskId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException('Error deleting task');
        }
    }
}

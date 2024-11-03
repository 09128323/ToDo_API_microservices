import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Columns } from 'src/columns/entities/columns.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(Columns)
        private columnsRepository: Repository<Columns>
    ) {}

    async createTask(
        createTaskDto: CreateTaskDto,
        columnId: number,
        userId: number
    ): Promise<Task> {
        const column = await this.columnsRepository.findOne({
            where: { id: columnId, project: { userId } },
        });

        if (!column) {
            throw new UnauthorizedException('Нет доступа к данной колонке');
        }

        const result = await this.tasksRepository
            .createQueryBuilder('task')
            .select('MAX(task.position)', 'max')
            .where('task.columnId = :columnId', { columnId })
            .getRawOne();

        const maxPosition = result?.max || 0;

        const task = this.tasksRepository.create({
            ...createTaskDto,
            column,
            position: maxPosition + 1,
        });

        try {
            await this.tasksRepository.save(task);
            return task;
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при создании задачи'
            );
        }
    }

    async getTasks(columnId: number, userId: number): Promise<Task[]> {
        const column = await this.columnsRepository.findOne({
            where: { id: columnId, project: { userId } },
        });

        if (!column) {
            throw new UnauthorizedException('Нет доступа к данной колонке');
        }

        try {
            return await this.tasksRepository.find({ where: { column } });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при получении задач'
            );
        }
    }

    async getTaskById(
        columnId: number,
        taskId: number,
        userId: number
    ): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: {
                id: taskId,
                column: { id: columnId, project: { userId } },
            },
        });

        if (!task) {
            throw new NotFoundException('Задача не найдена');
        }

        return task;
    }

    async updateTask(
        columnId: number,
        taskId: number,
        updateTaskDto: UpdateTaskDto,
        userId: number
    ): Promise<Task> {
        const task = await this.getTaskById(columnId, taskId, userId);

        Object.assign(task, updateTaskDto);

        try {
            await this.tasksRepository.save(task);
            return task;
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при обновлении задачи'
            );
        }
    }

    async deleteTask(
        columnId: number,
        taskId: number,
        userId: number
    ): Promise<void> {
        const task = await this.getTaskById(columnId, taskId, userId);

        try {
            await this.tasksRepository.remove(task);
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при удалении задачи'
            );
        }
    }
}

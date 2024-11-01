import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
    InternalServerErrorException,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(
        @Inject('PROJECTS_SERVICE') private readonly columnsClient: ClientProxy,
        @Inject('PROJECTS_SERVICE') private readonly projectsClient: ClientProxy
    ) {}

    async createColumn(
        createColumnDto: CreateColumnDto,
        projectId: number,
        userId: string
    ): Promise<any> {
        const project = this.projectsClient.send('get_project_by_id', {
            projectId,
            userId,
        });

        if (!project) {
            throw new UnauthorizedException('Нет доступа к данному проекту');
        }

        try {
            return this.columnsClient.send('create_column', {
                ...createColumnDto,
                projectId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при создании колонки'
            );
        }
    }

    async getAllColumns(projectId: number, userId: string) {
        const project = this.projectsClient.send('get_project_by_id', {
            projectId,
            userId,
        });

        if (!project) {
            throw new UnauthorizedException('Нет доступа к данному проекту');
        }

        try {
            return this.columnsClient.send('get_columns', { projectId });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при получении колонок'
            );
        }
    }

    async getColumnById(columnId: number, userId: string) {
        return this.columnsClient.send('get_column_by_id', {
            columnId,
            userId,
        });
    }

    async updateColumn(
        columnId: number,
        updateColumnDto: UpdateColumnDto,
        userId: string
    ): Promise<any> {
        const column = this.columnsClient.send('get_column_by_id', {
            columnId,
            userId,
        });

        if (!column) {
            throw new NotFoundException('Колонка не найдена');
        }

        try {
            return this.columnsClient.send('update_column', {
                columnId,
                ...updateColumnDto,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при обновлении колонки'
            );
        }
    }

    async deleteColumn(columnId: number, userId: string): Promise<any> {
        const column = await this.columnsClient.send('get_column_by_id', {
            columnId,
            userId,
        });

        if (!column) {
            throw new NotFoundException('Колонка не найдена');
        }

        try {
            return this.columnsClient.send('delete_column', {
                columnId,
                userId,
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Ошибка при удалении колонки'
            );
        }
    }
}

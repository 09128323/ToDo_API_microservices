import { Controller } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Columns } from './entities/columns.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @MessagePattern('create_column')
    async createColumn(
        @Payload()
        data: {
            projectId: number;
            createColumnDto: CreateColumnDto;
            userId: number;
        }
    ): Promise<Columns> {
        const { createColumnDto, projectId, userId } = data;
        return this.columnsService.createColumn(
            createColumnDto,
            projectId,
            userId
        );
    }

    @MessagePattern('get_columns')
    async getAllColumns(
        @Payload() data: { projectId: number; userId: number }
    ): Promise<Columns[]> {
        const { projectId, userId } = data;
        return this.columnsService.getAllColumns(projectId, userId);
    }
    @MessagePattern('get_column_by_id')
    async getColumnById(
        @Payload() data: { id: number; userId: number }
    ): Promise<Columns> {
        const { id, userId } = data;
        return this.columnsService.getColumnById(id, userId);
    }

    @MessagePattern('update_column')
    async updateColumn(
        @Payload()
        data: {
            id: number;
            updateColumnDto: UpdateColumnDto;
            userId: number;
        }
    ): Promise<Columns> {
        const { id, userId, updateColumnDto } = data;
        return this.columnsService.updateColumn(id, updateColumnDto, userId);
    }

    @MessagePattern('delete_column')
    async deleteColumn(
        @Payload() data: { id: number; userId: number }
    ): Promise<void> {
        const { id, userId } = data;
        return this.columnsService.deleteColumn(id, userId);
    }
}

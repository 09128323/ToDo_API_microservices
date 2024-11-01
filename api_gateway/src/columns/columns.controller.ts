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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserId } from 'src/auth/get-userId.decorator';

@ApiTags('Столбцы')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post(':projectId')
    @ApiOperation({ summary: 'Создать новую колонку' })
    @ApiResponse({ status: 201, description: 'Колонка создана' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'projectId', description: 'ID проекта' })
    @ApiBody({ type: CreateColumnDto })
    async create(
        @Param('projectId') projectId: number,
        @Body() createColumnDto: CreateColumnDto,
        @GetUserId() userId: string
    ) {
        return this.columnsService.createColumn(
            createColumnDto,
            projectId,
            userId
        );
    }

    @Get(':projectId')
    @ApiOperation({ summary: 'Получить все колонки проекта' })
    @ApiResponse({
        status: 200,
        description: 'Список колонок',
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiParam({ name: 'projectId', description: 'ID проекта' })
    async getAllColumns(
        @Param('projectId') projectId: number,
        @GetUserId() userId: string
    ) {
        return this.columnsService.getAllColumns(projectId, userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить колонку по ID' })
    @ApiResponse({
        status: 200,
        description: 'Информация о колонке',
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    async findOne(@Param('id') id: number, @GetUserId() userId: string) {
        return this.columnsService.getColumnById(id, userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Обновить колонку' })
    @ApiResponse({
        status: 200,
        description: 'Колонка обновлена',
    })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    @ApiBody({ type: UpdateColumnDto })
    async update(
        @Param('id') id: number,
        @Body() updateColumnDto: UpdateColumnDto,
        @GetUserId() userId: string
    ) {
        return this.columnsService.updateColumn(id, updateColumnDto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка удалена' })
    @ApiResponse({ status: 401, description: 'Неавторизован' })
    @ApiResponse({ status: 404, description: 'Колонка не найдена' })
    @ApiParam({ name: 'id', description: 'ID колонки' })
    async remove(
        @Param('id') id: number,
        @GetUserId() userId: string
    ): Promise<void> {
        return this.columnsService.deleteColumn(id, userId);
    }
}

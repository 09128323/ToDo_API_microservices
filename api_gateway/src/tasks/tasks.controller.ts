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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post(':columnId')
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'columnId', description: 'ID of the column' })
    @ApiBody({ type: CreateTaskDto })
    async create(
        @Param('columnId') columnId: number,
        @Body() createTaskDto: CreateTaskDto,
        @GetUserId() userId: string
    ) {
        return this.tasksService.createTask(createTaskDto, columnId, userId);
    }

    @Get(':columnId')
    @ApiOperation({ summary: 'Get all tasks of a column' })
    @ApiResponse({ status: 200, description: 'List of tasks' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'columnId', description: 'ID of the column' })
    async findAll(
        @Param('columnId') columnId: number,
        @GetUserId() userId: string
    ) {
        return this.tasksService.getTasks(columnId, userId);
    }

    @Get(':columnId/:taskId')
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiResponse({
        status: 200,
        description: 'Task details',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'columnId', description: 'ID of the column' })
    @ApiParam({ name: 'taskId', description: 'ID of the task' })
    async findOne(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @GetUserId() userId: string
    ) {
        return this.tasksService.getTaskById(columnId, taskId, userId);
    }

    @Put(':columnId/:taskId')
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'Task updated' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'columnId', description: 'ID of the column' })
    @ApiParam({ name: 'taskId', description: 'ID of the task' })
    @ApiBody({ type: UpdateTaskDto })
    async update(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUserId() userId: string
    ) {
        return this.tasksService.updateTask(
            columnId,
            taskId,
            updateTaskDto,
            userId
        );
    }

    @Delete(':columnId/:taskId')
    @ApiOperation({ summary: 'Delete a task' })
    @ApiResponse({ status: 200, description: 'Task deleted' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'columnId', description: 'ID of the column' })
    @ApiParam({ name: 'taskId', description: 'ID of the task' })
    async remove(
        @Param('columnId') columnId: number,
        @Param('taskId') taskId: number,
        @GetUserId() userId: string
    ): Promise<void> {
        return this.tasksService.deleteTask(columnId, taskId, userId);
    }
}

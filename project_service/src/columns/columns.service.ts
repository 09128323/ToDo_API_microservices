import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/projects.entity';
import { Repository } from 'typeorm';
import { Columns } from './entities/columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Columns)
        private columnsRepository: Repository<Columns>,
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {}

    async createColumn(
        createColumnDto: CreateColumnDto,
        projectId: number,
        userId: number
    ): Promise<Columns> {
        const project = await this.projectsRepository.findOne({
            where: { id: projectId },
        });

        if (!project || project.userId !== userId) {
            throw new UnauthorizedException();
        }

        const maxPosition =
            (
                await this.columnsRepository
                    .createQueryBuilder('columns')
                    .where('columns.projectId = :projectId', { projectId })
                    .select('MAX(columns.position)', 'max')
                    .getRawOne()
            ).max || 0;

        const column = this.columnsRepository.create({
            ...createColumnDto,
            project,
            position: maxPosition + 1,
        });
        await this.columnsRepository.save(column);
        return column;
    }

    async getAllColumns(projectId: number, userId: number): Promise<Columns[]> {
        const project = await this.projectsRepository.findOne({
            where: { id: projectId },
            relations: ['user'],
        });

        if (!project || project.userId !== userId) {
            throw new UnauthorizedException();
        }

        return this.columnsRepository.find({ where: { project } });
    }

    async getColumnById(columnId: number, userId: number): Promise<Columns> {
        const column = await this.columnsRepository.findOne({
            where: { id: columnId },
            relations: ['project', 'project.user'],
        });

        if (!column || column.project.userId !== userId) {
            throw new UnauthorizedException();
        }

        return column;
    }

    async updateColumn(
        columnId: number,
        updateColumnDto: UpdateColumnDto,
        userId: number
    ): Promise<Columns> {
        const column = await this.getColumnById(columnId, userId);
        if (!column) {
            throw new NotFoundException();
        }

        Object.assign(column, updateColumnDto);
        await this.columnsRepository.save(column);
        return column;
    }

    async deleteColumn(columnId: number, userId: number): Promise<void> {
        const column = await this.getColumnById(columnId, userId);
        if (!column) {
            throw new NotFoundException();
        }

        await this.columnsRepository.remove(column);
    }
}

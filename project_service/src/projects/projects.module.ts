import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/projects.entity';
import { Columns } from 'src/columns/entities/columns.entity';
import { ProjectsService } from './projects.service';

@Module({
    providers: [ProjectsService],
    controllers: [ProjectsController],
    imports: [TypeOrmModule.forFeature([Project, Columns])],
})
export class ProjectsModule {}

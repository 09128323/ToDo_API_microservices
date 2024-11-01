import { Columns } from 'src/columns/entities/columns.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор проекта',
    })
    id: number;

    @Column()
    @ApiProperty({ example: 'Project Name', description: 'Название проекта' })
    name: string;

    @Column()
    @ApiProperty({
        example: 'Project Description',
        description: 'Описание проекта',
    })
    description: string;

    @Column()
    @ApiProperty({
        example: '10',
        description: 'Id пользователя из микросервиса аутентификации',
    })
    userId: number;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания проекта' })
    createdAt: Date;

    @OneToMany(() => Columns, (columns) => columns.project)
    @ApiProperty({ type: () => [Columns], description: 'Колонки проекта' })
    columns: Columns[];
}

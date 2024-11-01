import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Project } from './projects/entities/projects.entity';
import { Columns } from './columns/entities/columns.entity';
import { Task } from './tasks/entities/tasks.entity';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const logger = new Logger('TypeOrmModule');
                const type = 'postgres';
                const host = configService.get<string>('DB_HOST');
                const port = Number(configService.get<string>('DB_PORT'));
                const username = configService.get<string>('DB_USERNAME');
                const password = configService.get<string>('DB_PASSWORD');
                const database = configService.get<string>('DB_NAME');

                if (!host || !port || !username || !password || !database) {
                    logger.error('Database configuration is invalid');
                    throw new Error('Invalid database configuration');
                }

                return {
                    type,
                    host,
                    port,
                    username,
                    password,
                    database,
                    synchronize: true,
                    entities: [Project, Columns, Task],
                };
            },
            inject: [ConfigService],
        }),
        ProjectsModule,
        ColumnsModule,
        TasksModule,
        ClientsModule.register([
            {
                name: 'PROJECT_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'projects_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
})
export class AppModule {}

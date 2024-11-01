import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { ColumnsController } from './columns/columns.controller';
import { ProjectsController } from './projects/projects.controller';
import { RolesController } from './roles/roles.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { ColumnsService } from './columns/columns.service';
import { ProjectsService } from './projects/projects.service';
import { RolesService } from './roles/roles.service';
import { TasksService } from './tasks/tasks.service';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'auth_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
            {
                name: 'PROJECTS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'project_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
        JwtModule.register({
            secret: 'SECRET',
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [
        AuthController,
        ColumnsController,
        ProjectsController,
        RolesController,
        TasksController,
        UsersController,
    ],
    providers: [
        AuthService,
        ColumnsService,
        ProjectsService,
        RolesService,
        TasksService,
        UsersService,
        JwtAuthGuard,
    ],
})
export class AppModule {}

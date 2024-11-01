import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './users/entities/users.entity';
import { UserRoles } from './roles/entities/user-roles.entity';
import { Role } from './roles/entities/roles.entity';

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
                    entities: [User, Role, UserRoles],
                };
            },
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        RolesModule,
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
        ]),
    ],
})
export class AppModule {}

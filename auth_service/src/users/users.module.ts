import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
    exports: [UsersService],
})
export class UsersModule {}

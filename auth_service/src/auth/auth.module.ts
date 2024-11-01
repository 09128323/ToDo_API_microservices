import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}

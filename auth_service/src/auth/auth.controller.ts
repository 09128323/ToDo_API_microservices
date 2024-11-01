import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern('login')
    async login(@Payload() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @MessagePattern('registration')
    async registration(@Payload() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}

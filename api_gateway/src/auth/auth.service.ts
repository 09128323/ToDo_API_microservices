import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
    Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) {}

    async login(userDto: CreateUserDto): Promise<any> {
        try {
            return this.authClient.send('login', userDto).pipe(timeout(5000));
        } catch (error) {
            console.error('Error in login:', error);
            throw new UnauthorizedException('Неправильный логин или пароль');
        }
    }

    async registration(userDto: CreateUserDto): Promise<any> {
        try {
            return this.authClient
                .send('registration', userDto)
                .pipe(timeout(5000));
        } catch (error) {
            console.error('Error in registration:', error);
            throw new InternalServerErrorException('Ошибка при регистрации');
        }
    }
}

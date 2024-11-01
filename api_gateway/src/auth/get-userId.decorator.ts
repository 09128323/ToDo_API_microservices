import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entities/users.entity';

export const GetUserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        return request.user.id;
    }
);

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({ example: 'admin', description: 'Значение роли' })
    @IsString({ message: 'value должно быть строкой' })
    @Length(1, 20, { message: 'value должно быть от 1 до 20 символов' })
    readonly value: string;

    @ApiProperty({
        example: 'Administrator role with full access',
        description: 'Описание роли',
    })
    @IsString({ message: 'description должно быть строкой' })
    @Length(0, 255, { message: 'description должно быть до 255 символов' })
    readonly description: string;
}

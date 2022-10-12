import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    @MinLength(3)
    username: string

    @IsOptional()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string
}
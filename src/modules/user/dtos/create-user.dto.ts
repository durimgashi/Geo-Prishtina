import { IsString, IsEmail, IsNotEmpty, IsEnum, IsDate, IsOptional } from 'class-validator';

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsOptional()
    @IsString()
    birthday: string

    @IsEnum(Gender)
    gender: Gender
}

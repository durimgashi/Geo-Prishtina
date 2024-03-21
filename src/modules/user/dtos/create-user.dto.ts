import { IsString, IsEmail, IsNotEmpty, IsEnum, IsDate, IsOptional } from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';


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

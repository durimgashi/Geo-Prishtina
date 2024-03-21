import { IsNumber, IsOptional, Min, Max, MinLength, MaxLength, IsNotEmpty, isNumber, isNumberString, IsNumberString, IsLatitude, IsLongitude } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

export class AddLocationDTO {
    @MinLength(3)
    @MaxLength(255)
    name: string;

    @IsOptional()
    @MaxLength(255)
    description: string;

   
    @IsNumberString()
    @IsLatitude() 
    lat: number;


    @IsNumberString()
    @IsLongitude() 
    long: number;

    user: User;
}
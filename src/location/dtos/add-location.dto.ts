import { IsNumber, IsOptional, Min, Max, MinLength, MaxLength, IsNotEmpty, isNumber, isNumberString, IsNumberString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class AddLocationDTO {
    @MinLength(3)
    @MaxLength(255)
    name: string;

    @IsOptional()
    @MaxLength(255)
    description: string;

   
    @IsNumberString()
    // @Min(-90)
    // @Max(90)
    lat: number;


    @IsNumberString()
    // @Min(-180)
    // @Max(180)
    long: number;

    user: User;
}
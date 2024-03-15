import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginUserDTO {
    @IsEmail({}, {
        message: "Please provide a valid email address"
    })
    email: string

    @IsNotEmpty({
        message: "Please provide a password"
    })
    password: string
}
import { IsString, IsUUID } from "class-validator";

export class DeleteLocationDTO {
    @IsString()
    @IsUUID(null, {
        message: 'The provided UUID is not valid'
    })
    uuid: string
}
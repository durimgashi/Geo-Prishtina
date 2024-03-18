import { IsLatitude, IsLongitude, IsNumber, IsUUID } from "class-validator";

export class ParticipateDTO {
    @IsUUID()
    locationUUID: string

    @IsNumber()
    @IsLatitude()
    lat: number

    @IsNumber()
    @IsLongitude()
    long: number   
}
import { Body, Controller, Post } from "@nestjs/common";
import { ParticipateDTO } from "./dtos/participate.dto";
import { ParticipationService } from "./participation.service";

@Controller('participation')
export class ParticipationController {

    constructor(
        private readonly participationService: ParticipationService
    ){}

    @Post('/participate')
    async participate(@Body() participateDTO: ParticipateDTO) {
        return await this.participationService.participate(participateDTO)
    }
}
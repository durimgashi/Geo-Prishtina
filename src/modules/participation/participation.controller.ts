import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ParticipateDTO } from "./dtos/participate.dto";
import { ParticipationService } from "./participation.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { ParticipationResponse } from "src/utils/responses/participation.response";

@Controller('participation')
export class ParticipationController {

    constructor(
        private readonly participationService: ParticipationService
    ){}

    @UseGuards(AuthGuard)
    @Post('/participate')
    async participate(@Body() participateDTO: ParticipateDTO, @Req() req: Request): Promise<ParticipationResponse> {
        return await this.participationService.participate(participateDTO, req)
    }
}
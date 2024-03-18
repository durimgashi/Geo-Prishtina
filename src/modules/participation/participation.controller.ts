import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ParticipateDTO } from "./dtos/participate.dto";
import { ParticipationService } from "./participation.service";
import { AuthGuard } from "../user/guards/auth.guard";
import { ParticipationResponse } from "src/utils/responses/participation.response";
import { Participation } from "./entities/participation.entity";

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

    @UseGuards(AuthGuard)
    @Get('mine')
    async myParticipations(@Req() req: Request): Promise<Participation[]> {
        return await this.participationService.myParticipations(req)
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getParticipationsByID(@Param('id') id: number, @Req() req: Request): Promise<Participation> {
        return await this,this.participationService.getParticipationByID(id, req)
    }
}
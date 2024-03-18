import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParticipationController } from "./participation.controller";
import { ParticipationService } from "./participation.service";
import { Participation } from "./entities/participation.entity";
import { ParticipationRepository } from "./participation.repository";
import { Location } from "../location/entities/location.entity";
import { LocationRepository } from "../location/location.repository";
import { UserModule } from "../user/user.module";
import { UserRepository } from "../user/user.repository";
import { User } from "../user/entities/user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Participation,
            Location,
            User
        ])
    ],
    controllers: [
        ParticipationController
    ],
    providers: [
        ParticipationService,
        ParticipationRepository,
        LocationRepository
    ]
})
export class ParticipationModule {}
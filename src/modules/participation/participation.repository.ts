import { Repository } from "typeorm";
import { Participation } from "./entities/participation.entity";
import { InjectRepository } from "@nestjs/typeorm";


export class ParticipationRepository extends Repository<Participation> {
    constructor (
        @InjectRepository(Participation) private readonly locationRepository: Repository<Participation>
    ) {
        super(
            locationRepository.target,
            locationRepository.manager,
            locationRepository.queryRunner
        )
    }
}
import { Repository } from "typeorm";
import { Participation } from "./entities/participation.entity";
import { InjectRepository } from "@nestjs/typeorm";


export class ParticipationRepository extends Repository<Participation> {
    constructor (
        @InjectRepository(Participation) private readonly participationRepository: Repository<Participation>
    ) {
        super(
            participationRepository.target,
            participationRepository.manager,
            participationRepository.queryRunner
        )
    }

    async findByID(id: number): Promise<Participation | null> {
        return this.findOneBy({ id: id });
    }
}
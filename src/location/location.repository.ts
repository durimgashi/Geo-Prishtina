import { EntityRepository, Repository } from "typeorm";
import { Location } from "./entities/location.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddLocationDTO } from "./dtos/add-location.dto";
import { DeleteLocationDTO } from "./dtos/delete-location.dto";


export class LocationRepository extends Repository<Location> {

    constructor (
        @InjectRepository(Location) private readonly locationRepository: Repository<Location>
    ) {
        super(
            locationRepository.target,
            locationRepository.manager,
            locationRepository.queryRunner
        )
    }

    async findAll(): Promise<Location[]> {
        return this.find()
    }

    async findById(id: number): Promise<Location | null> {
        return this.findOneBy({ id: id });
    }

    async findByUUID(uuid: string): Promise<Location | null> {
        return this.findOneBy({ uuid: uuid });
    }

    public async store(location: Location): Promise<Location> {
        const newLocation = this.create(location);
        return this.save(newLocation);
    }

    public async deleteLocation(deleteLocationDTO: DeleteLocationDTO): Promise<Location> {
        let location = await this.findOneBy({
            uuid: deleteLocationDTO.uuid
        })

        location.isDeleted = true
        return await this.save(location)
    }
}
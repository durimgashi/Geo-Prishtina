import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { AddLocationDTO } from './dtos/add-location.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { DeleteLocationDTO } from './dtos/delete-location.dto';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class LocationService {

    constructor(
        private readonly locationRepository: LocationRepository
    ) {}

    async getLocations(): Promise<Location[]> {
        return await this.locationRepository.find({
            where: {
                isDeleted: false
            }
        })
    }

    async getMyLocations(@Req() req: Request): Promise<Location[]> {
        console.log(req['user'])
        return await this.locationRepository.find({
            where: {
                user: req['user'],
                isDeleted: false
            }
        })
    }

    async addLocation(@Req() req: Request, addLocationDTO: AddLocationDTO, file: Express.Multer.File): Promise<Location> {
        const user = req['user']
        let newLocation = new Location()

        newLocation.name = addLocationDTO.name
        newLocation.description = addLocationDTO.description
        newLocation.lat = addLocationDTO.lat
        newLocation.long = addLocationDTO.long
        newLocation.user = user
        newLocation.image = file.path
        newLocation.image_thumbnail = file.path

        return await this.locationRepository.save(newLocation);
    }

    async deleteLocation(deleteLocationDTO: DeleteLocationDTO, req: Request): Promise<any> {
        return await this.locationRepository.deleteLocation(deleteLocationDTO)
    }
 
}

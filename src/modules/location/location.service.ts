import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { AddLocationDTO } from './dtos/add-location.dto'; 
import { DeleteLocationDTO } from './dtos/delete-location.dto'; 

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
        let res= await this.locationRepository.find({
            where: {
                user: req['user'].id, 
                isDeleted: false
            }
        })

        console.log(res)

        return res
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
        const locationExists = await this.locationRepository.findOne({
            where: {
                uuid: deleteLocationDTO.uuid
            }
        })

        if(!locationExists) {
            throw new NotFoundException("The provided location does not exist")
        }

        return await this.locationRepository.deleteLocation(deleteLocationDTO)
    }
 
}

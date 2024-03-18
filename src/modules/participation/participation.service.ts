import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ParticipationRepository } from "./participation.repository";
import { ParticipateDTO } from "./dtos/participate.dto";
import { LocationRepository } from "../location/location.repository";
import { User } from "../user/entities/user.entity";
import { ParticipationResponse } from "src/utils/responses/participation.response";
import { Participation } from "./entities/participation.entity";

@Injectable()
export class ParticipationService {

    private MAX_DISTNACE: number = 500 

    constructor(
        private readonly participationRepository: ParticipationRepository,
        private readonly locationRepository: LocationRepository
    ){}

    async participate(participateDto: ParticipateDTO, req: Request): Promise<ParticipationResponse> {
        const user: User = req['user']

        const location = await this.locationRepository.findOne({
            where: {
                uuid: participateDto.locationUUID,
                isDeleted: false
            }
        })

        if (!location) {
            throw new NotFoundException('This location is not available')
        }

        const alreadyParticipated = await this.participationRepository.findOne({
            where: { 
                user: {
                    id: user.id
                },
                location: {
                    id: location.id
                }
            }
        })

        if(alreadyParticipated) {
            throw new ConflictException("You have already participated in this location!")
        }
        
        const lat: number = location.lat
        const long: number = location.long
        const participantLat: number = participateDto.lat
        const participantLong: number = participateDto.long

        const distance: number = this.calculateDistance(lat, long, participantLat, participantLong)

        let points: number = 0

        if (distance > this.MAX_DISTNACE) {
            points = 0
        } else {
            points = this.MAX_DISTNACE - distance
        }

        let participation: Participation = new Participation()

        participation.user = user
        participation.location = location
        participation.lat = participantLat
        participation.long = participantLong
        participation.distance = distance
        participation.points = points

        let save = await this.participationRepository.save(participation)

        if(!save) {
            throw new Error("Something went wrong!")
        }

        let response = new ParticipationResponse()
        response.distance = distance
        response.points = points

        return response
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const earthRadiusInKm = 6371
        const dLat = this.degreesToRadians(lat2 - lat1)
        const dLon = this.degreesToRadians(lon2 - lon1)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) *
                Math.cos(this.degreesToRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distanceInKm = earthRadiusInKm * c
        const distanceInMeters = distanceInKm * 1000

        return Math.floor(distanceInMeters)
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }
}
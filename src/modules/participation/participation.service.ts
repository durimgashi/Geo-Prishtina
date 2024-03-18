import { Injectable, NotFoundException } from "@nestjs/common";
import { ParticipationRepository } from "./participation.repository";
import { ParticipateDTO } from "./dtos/participate.dto";
import { LocationRepository } from "../location/location.repository";

@Injectable()
export class ParticipationService {
    constructor(
        private readonly participationRepository: ParticipationRepository,
        private readonly locationRepository: LocationRepository
    ){}

    async participate(participateDto: ParticipateDTO) {
        const location = await this.locationRepository.findOne({
            where: {
                uuid: participateDto.locationUUID,
                isDeleted: false
            }
        })

        if (!location) {
            throw new NotFoundException('This location is not available')
        }

        const locationLat = location.lat
        const locationLong = location.long

        const participantLat = participateDto.lat
        const participantLong = participateDto.long


        const distanceInMeters = this.calculateDistance(
            locationLat,
            locationLong,
            participantLat,
            participantLong,
        )

        return "Distance: " + distanceInMeters + " meters"
    }

    private calculateDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const earthRadiusInKm = 6371;
        const dLat = this.degreesToRadians(lat2 - lat1);
        const dLon = this.degreesToRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(lat1)) *
                Math.cos(this.degreesToRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKm = earthRadiusInKm * c;
        const distanceInMeters = distanceInKm * 1000;
        return distanceInMeters;
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
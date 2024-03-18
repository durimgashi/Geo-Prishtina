import { Repository } from "typeorm";
import { Points } from "./entities/points.entity";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";


export class PointsRepository extends Repository<Points> {

    constructor (
        @InjectRepository(Points) private readonly pointsRepository: Repository<Points>
    ) {
        super(
            pointsRepository.target,
            pointsRepository.manager,
            pointsRepository.queryRunner
        )
    }

    async setUserPoints(user: User, pointsToAdd: number): Promise<Points> {
        const userPoints = await this.findOneBy({
            user: {
                id: user.id
            }
        })

        if (!userPoints) {
            let new_points: Points = new Points()

            new_points.user = user
            new_points.points = pointsToAdd

            return await this.save(new_points)
        } else {
            userPoints.points += pointsToAdd

            return await this.save(userPoints)
        } 
    }
}
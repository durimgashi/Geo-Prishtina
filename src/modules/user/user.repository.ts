import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";


export class UserRepository extends Repository<User> {

    // constructor (
    //     @InjectRepository(User) private readonly userRepository: Repository<User>
    // ) {
    //     super(
    //         userRepository.target,
    //         userRepository.manager,
    //         userRepository.queryRunner
    //     )
    // }

    async findOne(options: any): Promise<User> {
        return await this.findOne(options)
    }

    async createUser(user: User): Promise<User> {
        const saltOrRounds = 10
        const hash = await bcrypt.hash(user.password, saltOrRounds)

        user.password = hash

        return await this.save(user)
    }
}
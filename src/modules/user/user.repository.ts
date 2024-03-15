import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt'

export class UserRepository extends Repository<User> {
    async createUser(user: User): Promise<User> {
        const saltOrRounds = 10
        const hash = await bcrypt.hash(user.password, saltOrRounds)

        user.password = hash
        
        console.log(user.password)

        return await this.save(user)
    }
}
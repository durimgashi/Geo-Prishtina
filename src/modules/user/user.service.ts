import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt'
import { LoginUserDTO } from "./dtos/login-user.dto"; 
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "src/utils/types/jwt_payload";
import { AccessTokenResponse } from "src/utils/responses/AccessToken.response";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {
        
    }

    async createUser(createUserDto: CreateUserDTO): Promise<User> { 
        let user: User = new User()

        user.name = createUserDto.name
        user.surname = createUserDto.surname
        user.email = createUserDto.email
        user.password = createUserDto.password
        user.birthday = createUserDto.birthday
        user.gender = createUserDto.gender

        let email_exists = await this.userRepository.count({
            where: {
                'email': createUserDto.email
            }
        })

        if (email_exists > 0) {
            throw new ConflictException("This email is already registered")
        }

        const saltOrRounds = 10
        const hash = await bcrypt.hash(user.password, saltOrRounds)

        user.password = hash

        return await this.userRepository.save(user)
    }

    async loginUser(loginUserDto: LoginUserDTO): Promise<AccessTokenResponse> {
        const user: User = await this.userRepository.findOne({
            select: [
                'id', 'uuid', 'password', 'name', 'surname', 'email', 'role'
            ],
            where: {
                email: loginUserDto.email
            },
            relations: ['role']
        })

        if (!user) {
            throw new NotFoundException('This user does not exist!')
        }
 
        const isMatch = await bcrypt.compare(loginUserDto.password, user.password)

        if(!isMatch) {
            throw new UnauthorizedException("Email or password are incorrect")
        }

        const payload: JWTPayload = {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role.alias
        }

        let response: AccessTokenResponse = new AccessTokenResponse()

        response.access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET
        })

        return response
    }

    async userProfile(req: Request): Promise<User> {
        const user = await this.userRepository.findOne({
            select: ["uuid", "name", "surname", "email", "birthday", "gender", "isConfirmed", "isDeleted"],
            where: {
                id: req['user']['id']
            }
        })
        
        if (!user) {
            throw new NotFoundException('This user does not exist')
        }
        
        return user
    }
}
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            UserRepository
        ]),
        JwtModule.register({
            global: true,
            signOptions: { expiresIn: '600s' },
        }),
        UserRepository
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        JwtService
    ]
})
export class UserModule {

}

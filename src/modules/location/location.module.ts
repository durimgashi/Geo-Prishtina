import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationRepository } from './location.repository';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserModule } from 'src/modules/user/user.module';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Location,
            User,
            UserRepository
        ]),
        UserModule
    ],
    controllers: [LocationController],
    providers: [
        LocationService,
        LocationRepository
    ]
})
export class LocationModule {
    
}

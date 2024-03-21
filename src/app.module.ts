import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './modules/location/location.module';
import { ParticipationModule } from './modules/participation/participation.module';

const modules = [
    UserModule,
    LocationModule,
    ParticipationModule
]

@Module({
    imports: [
        ...modules,        
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService  
    ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ValidationPipe } from '@nestjs/common';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';

@Module({
    imports: [
        UserModule,
        LocationModule,
        TypeOrmModule.forRoot(dataSourceOptions),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
          }),
        LocationModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

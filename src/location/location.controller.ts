import { Body, Controller, Delete, Get, HttpStatus, Inject, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { AuthGuard } from 'src/user/auth.guard';
import { AddLocationDTO } from './dtos/add-location.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { locationImagePipe, multerConfig } from 'src/utils/configs/location-image-validator';
import { DeleteLocationDTO } from './dtos/delete-location.dto';
import { DeleteResult } from 'typeorm';

@Controller('location')
export class LocationController {

    constructor(
        private readonly locationService: LocationService,
        private readonly jwtService: JwtService
    ) {}

    @Get('all')
    getLocations(): Promise<Location[]> {
        return this.locationService.getLocations()
    }

    @Get('mine')    
    getMyLocations(@Req() req: Request): Promise<Location[]> {
        return this.locationService.getMyLocations(req)
    }

    @Post('add')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image', multerConfig))
    addLocation(
        @Req() req: Request, 
        @Body() addLocationDTO: AddLocationDTO, 
        @UploadedFile(locationImagePipe) file: Express.Multer.File): Promise<Location> {

        return this.locationService.addLocation(req, addLocationDTO, file)
    }

    @Delete('delete')
    @UseGuards(AuthGuard)
    deleteLocation(@Body() deleteLocationDTO: DeleteLocationDTO, @Req() req: Request): Promise<any> {
        return this.locationService.deleteLocation(deleteLocationDTO, req)
    }
}

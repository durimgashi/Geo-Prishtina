import { Body, Controller, Delete, Get, HttpStatus, Inject, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { AuthGuard } from 'src/modules/user/guards/auth.guard';
import { AddLocationDTO } from './dtos/add-location.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { locationImagePipe, multerConfig } from 'src/utils/configs/location-image-validator';
import { DeleteLocationDTO } from './dtos/delete-location.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RoleGuard } from '../user/guards/role.guard';

@Controller('location')
export class LocationController {

    constructor(
        private readonly locationService: LocationService,
        private readonly jwtService: JwtService
    ) {}

    @Get('all')
    @UseGuards(RoleGuard)
    @Roles(Role.ADMIN, Role.USER)
    getLocations(): Promise<Location[]> {
        return this.locationService.getLocations()
    }

    @Get('mine')    
    @UseGuards(AuthGuard)
    getMyLocations(@Req() req: Request): Promise<Location[]> {
        return this.locationService.getMyLocations(req)
    }

    @Post('add')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @UseInterceptors(FileInterceptor('image', multerConfig))
    addLocation(
        @Req() req: Request, 
        @Body() addLocationDTO: AddLocationDTO, 
        @UploadedFile(locationImagePipe) file: Express.Multer.File): Promise<Location> {

        return this.locationService.addLocation(req, addLocationDTO, file)
    }

    @Delete('delete')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    deleteLocation(@Body() deleteLocationDTO: DeleteLocationDTO, @Req() req: Request): Promise<any> {
        return this.locationService.deleteLocation(deleteLocationDTO, req)
    }
}

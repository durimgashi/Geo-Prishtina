import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Gender } from 'src/utils/enums/gender.enum';
import { Role } from '../entities/role.entity';
import { BadRequestException, ConflictException, HttpException, HttpStatus, NotFoundException, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { LoginUserDTO } from '../dtos/login-user.dto';
import * as bcrypt from 'bcrypt'
import { AccessTokenResponse } from 'src/utils/responses/AccessToken.response';
require('dotenv').config()

describe('UserController', () => {
    let controller: UserController
    let userService: UserService
    let module: TestingModule

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(entity => entity),
                        count: jest.fn().mockResolvedValue(0),
                        save: jest.fn().mockImplementation(entity => entity),
                        update: jest.fn().mockImplementation((criteria, data) => ({ ...criteria, ...data })),
                        delete: jest.fn().mockResolvedValue({}),
                    },
                },
                JwtService,
            ],
        }).compile()

        controller = module.get<UserController>(UserController)
        userService = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })


    describe('Create User', () => {

        it("should return a promise of User", async () => {
            const createUserDto: CreateUserDTO = {
                name: "Luke",
                surname: "Skywalker",
                email: "lukeskywalker@rebelion.com",
                password: "TheForce123",
                gender: Gender.Male,
                birthday: (new Date()).toDateString()
            }

            const createdUser = {
                name: "Luke",
                surname: "Skywalker",
                email: "lukeskywalker@rebelion.com",
                password: expect.any(String),
                gender: Gender.Male,
                birthday: expect.any(String),
                role: expect.any(Role)
            }

            let result: User = await controller.createUser(createUserDto)

            expect(result).toEqual(createdUser)
        })


        it("should return a BadException when the DTO fails", async () => {
            const invalidData: CreateUserDTO = {
                name: "",
                surname: "Vader",
                email: "WRONG EMAIL FORMAT",
                password: "TheForce123",
                gender: Gender.Male,
                birthday:(new Date()).toDateString()
            }
        
            const validationPipe = new ValidationPipe({ transform: true });
            let err: any

            try {
                await validationPipe.transform(invalidData, {
                    type: 'body',
                    metatype: CreateUserDTO,
                });

                fail('Expected an exception to be thrown for invalid data');
            } catch (error) {
                err = error
            }
            
            expect(err).toBeInstanceOf(BadRequestException)

        })

        it("should throw a ConflictException when creating the same user again", async () => {
            const createUserDto: CreateUserDTO = {
                name: "Luke",
                surname: "Skywalker",
                email: "lukeskywalker@rebelion.com",
                password: "TheForce123",
                gender: Gender.Male,
                birthday: (new Date()).toDateString()
            }

            const userRepositoryMock = module.get(getRepositoryToken(User))
            jest.spyOn(userRepositoryMock, 'count').mockResolvedValue(1)


            try {
                await controller.createUser(createUserDto)
            } catch (error) {
                expect(error).toBeInstanceOf(ConflictException)
            }
        }) 
    })


    describe('Login User', () => {
      
        it("should return an access token on successful login", async () => {
            const loginUserDto: LoginUserDTO = {
                email: "lukeskywalker@rebelion.com",
                password: "TheForce123"
            }

            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)

            const userRepositoryMock = module.get(getRepositoryToken(User))

            jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValue({
                id: 1,
                uuid: 'some-uuid',
                name: 'Luke',
                surname: 'Skywalker',
                email: 'lukeskywalker@rebelion.com',
                password: 'TheForce123',
                role: { alias: 'USER' } 
            })
 
            const result = await controller.loginUser(loginUserDto)

            expect(result).toBeInstanceOf(AccessTokenResponse)
            expect(typeof result.access_token).toBe('string')
        })

        it("should return NotFoundException not existing email", async () => {
            const loginUserDto: LoginUserDTO = {
                email: "lukeskywalker@empire.gov",
                password: "wrongpassword"
            }

            try { 
                jest.spyOn(module.get(getRepositoryToken(User)), 'findOne').mockResolvedValue(false)

                await controller.loginUser(loginUserDto)
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException)
            }

        })

    })
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { Gender } from 'src/utils/enums/gender.enum';
import { Role } from '../entities/role.entity';
import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        // find: jest.fn().mockResolvedValue([{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]),
                        // findOne: jest.fn().mockResolvedValue({ id: 1, username: 'user1' }),
                        count: jest.fn().mockResolvedValue(0),
                        save: jest.fn().mockImplementation(entity => entity),
                        update: jest.fn().mockImplementation((criteria, data) => ({ ...criteria, ...data })),
                        delete: jest.fn().mockResolvedValue({}),
                    },
                },
                JwtService,
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });


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

            // const invalidData: CreateUserDTO = {
            //     name: "Luke",
            //     surname: "Skywalker",
            //     email: "lukeskywalker@rebelion.com",
            //     password: "TheForce123",
            //     gender: Gender.Male,
            //     birthday: (new Date()).toDateString()
            // }

        
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
            
            expect(err).toBeInstanceOf(BadRequestException);

        })
    })
});

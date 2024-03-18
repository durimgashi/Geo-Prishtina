import { Location } from "src/modules/location/entities/location.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Role } from "./role.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Participation } from "src/modules/participation/entities/participation.entity";
import { Points } from "src/modules/participation/entities/points.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({ length: 50 })
    name: string;
  
    @Column({ length: 50 })
    surname: string;

    @Column({
        unique: true
    })
    email: string

    @Column()
    birthday: string

    @Column()
    password: string

    @Column()
    gender: string;

    @Column({
        default: false
    })
    isConfirmed: boolean

    @Column({
        default: false
    })
    isDeleted: boolean

    @OneToMany(() => Location, location => location.user)
    locations: Location[];

    @ManyToOne(() => Role, role => role.users)
    role: Role

    @OneToMany(() => Participation, participations => participations.user)
    participations: Participation[]

    @OneToOne(() => Points, points => points.user)
    // @JoinColumn()
    points: Points

    constructor() {
        let defaultRole = new Role()
        defaultRole.id = 2
        defaultRole.name = "User"
        defaultRole.alias = "USER"

        this.role = defaultRole 
    }
}
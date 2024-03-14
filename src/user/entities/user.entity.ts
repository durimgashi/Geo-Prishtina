import { Location } from "src/location/entities/location.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

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
}
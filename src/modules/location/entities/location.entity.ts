import { Participation } from "src/modules/participation/entities/participation.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column()
    name: string

    @Column()
    description: string

    @Column('double precision')
    lat: number

    @Column('double precision')
    long: number

    @Column()
    image: string

    @Column()
    image_thumbnail: string

    @Column({
        default: false
    })
    isDeleted: boolean

    @ManyToOne(() => User, user => user.locations)
    user: User

    @OneToMany(() => Participation, participations => participations.location)
    participations: Participation[]
}
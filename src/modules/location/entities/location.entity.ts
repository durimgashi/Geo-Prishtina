import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    lat: number

    @Column()
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
}
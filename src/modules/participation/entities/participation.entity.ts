import { Location } from "src/modules/location/entities/location.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('paricipations')
export class Participation {
    @PrimaryGeneratedColumn()
    id: number

    @Column('double precision')
    lat: number

    @Column('double precision')
    long: number

    @Column()
    distance: number

    @CreateDateColumn()
    date: Date

    @ManyToOne(() => User, user => user.participations)
    user: User

    @ManyToOne(() => Location, location => location.participations)
    location: Location
}
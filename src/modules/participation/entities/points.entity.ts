import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("points")
export class Points {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.points)
    @JoinColumn()
    user: User

    @Column({
        default: 0
    })
    points: number
}
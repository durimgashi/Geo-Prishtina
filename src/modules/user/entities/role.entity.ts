import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { User } from "./user.entity";


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    alias: string

    @OneToMany(() => User, user => user.role)
    users: User[]
}
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, default: '' })
    username: string

    @Column({ nullable: false, default: '' })
    email: string

    @Column({ select: false, nullable: false, default: '' })
    password: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[]
}
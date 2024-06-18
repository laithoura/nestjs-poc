import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PostEntity } from "./post.entity";
import { AbstractEntity } from "src/common/entities/abstract.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @ApiProperty({default: 1})
    @PrimaryGeneratedColumn({name: 'id', type: 'bigint'})
    id: number;

    @ApiProperty({default: 'dev@gmail.com'})
    @Column({name: 'email', type: 'varchar', nullable: false, unique: true, length: 200})
    email: string;

    @Exclude()
    @Column({name: 'password', type: 'varchar', nullable: false, length: 200})
    password: string;

    @ApiProperty()
    @OneToOne(() => ProfileEntity)
    @JoinColumn({name: 'profile_id', referencedColumnName: 'id'})
    profile: ProfileEntity;

    @ApiProperty({isArray: true, type: () => PostEntity})
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

}
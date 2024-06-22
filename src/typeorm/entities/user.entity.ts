import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { PostEntity } from "./post.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

@Entity('users')
export class UserEntity {

    @ApiProperty({default: 1})
    @PrimaryGeneratedColumn({name: 'id', type: 'bigint'})
    id: number;

    @Index('user_email_index')
    @ApiProperty({default: 'dev@gmail.com'})
    @Column({name: 'email', type: 'varchar', nullable: false, unique: true, length: 200})
    email: string;

    @Exclude()
    @Column({name: 'password', type: 'varchar', nullable: false, length: 200})
    password: string;

    @Exclude()
    @Column({name: 'created_at', type: 'timestamp', nullable: false, insert: true, update: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Exclude()
    @Column({name: 'updated_at', type: 'timestamp', nullable: true, insert: false, update: true})
    updatedAt: Date;

    //@ApiProperty()
    @OneToOne(() => ProfileEntity)
    @JoinColumn({name: 'profile_id', referencedColumnName: 'id'})
    profile: ProfileEntity;

    //@ApiProperty({isArray: true, type: () => PostEntity})
    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

}
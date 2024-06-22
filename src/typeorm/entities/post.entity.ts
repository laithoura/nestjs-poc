import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

@Entity({ name: 'user_posts' })
export class PostEntity {
  @ApiProperty({default: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({default: 'Post Title'})
  @Column()
  title: string;

  @ApiProperty({default: 'Post Description'})
  @Column()
  description: string;

  @Exclude()
  @Column({name: 'created_at', type: 'timestamp', nullable: false, insert: true, update: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Exclude()
  @Column({name: 'updated_at', type: 'timestamp', nullable: true, insert: false, update: true})
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: UserEntity;
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'user_posts' })
export class PostEntity extends AbstractEntity {
  @ApiProperty({default: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({default: 'Post Title'})
  @Column()
  title: string;

  @ApiProperty({default: 'Post Description'})
  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: UserEntity;
}
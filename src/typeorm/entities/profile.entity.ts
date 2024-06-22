import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

@Entity('user_profiles')
export class ProfileEntity {

  @ApiProperty({default: 1})
  @PrimaryGeneratedColumn({name: 'id', type: 'bigint'})
  id: number;

  @ApiProperty({default: 'First Name'})
  @Column({name: 'first_name', type: 'varchar', nullable: false, length: 200})
  firstName: string;

  @ApiProperty({default: 'Last Name'})
  @Column({name: 'last_name', type: 'varchar', nullable: false, length: 200})
  lastName: string;

  @ApiProperty({default: 1})
  @Column({name: 'age', type: 'int', nullable: false})
  age: number;

  @ApiProperty()
  @Column({name: 'dob', type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  dob: Date;

  @Exclude()
  @Column({name: 'created_at', type: 'timestamp', nullable: false, insert: true, update: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Exclude()
  @Column({name: 'updated_at', type: 'timestamp', nullable: true, insert: false, update: true})
  updatedAt: Date;

}
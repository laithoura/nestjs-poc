import { Exclude } from "class-transformer";
import { Column } from "typeorm";

export abstract class AbstractEntity {
  
    @Exclude()
    @Column({name: 'created_at', type: 'timestamp', nullable: false, insert: true, update: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Exclude()
    @Column({name: 'updated_at', type: 'timestamp', nullable: true, insert: false, update: true})
    updatedAt: Date;

}
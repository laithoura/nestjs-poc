import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, MinLength } from "class-validator";
import { UserEntity } from "src/typeorm/entities/user.entity";

export class LoginResposneDto {

    @ApiProperty({default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', required: true, minLength: 1})
    @MinLength(1)
    @IsNotEmpty()
    accessToken: string

    @ApiProperty()
    @IsNotEmptyObject()
    @Type(() => UserEntity)
    user: UserEntity;

}
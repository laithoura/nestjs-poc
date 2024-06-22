import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({default: 'dev@gmail.com', required: true, minLength: 1, maxLength: 200})
    @MinLength(1)
    @MaxLength(200)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({default: 'password', required: true, minLength: 1, maxLength: 100})
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    password: string;

    /*
    // Nested Object Validation
    @ValidateNested()
    @IsNotEmptyObject()
    @Type(() => CreateUserPostDto)
    post: CreateUserPostDto
    */

}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserPostDto {

    @ApiProperty({default: 'Post Title', required: true, minLength: 1, maxLength: 255})
    @MinLength(1)
    @MaxLength(255)
    @IsNotEmpty()
    title: string

    @ApiProperty({default: 'Post Description', required: true, minLength: 1, maxLength: 1000})
    @MinLength(1)
    @MaxLength(1000)
    @IsNotEmpty()
    description: string
}
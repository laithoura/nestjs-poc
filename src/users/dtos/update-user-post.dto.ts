import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class UpdateUserPostDto {
    @ApiProperty({default: 1, required: true, minimum: 1})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id: number

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
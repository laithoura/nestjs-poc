import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({default: 1, required: true, minimum: 1})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id: number;

    @ApiProperty({default: 'dev@gmail.com', required: true, minLength: 1, maxLength: 200})
    @MinLength(1)
    @MaxLength(200)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({default: 'Name', required: true, minLength: 1, maxLength: 100})
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    password: string;
}
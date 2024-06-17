import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({default: 1, required: true, minimum: 1})
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id: number;

    @ApiProperty({default: 'Name', required: true, minLength: 1, maxLength: 100})
    @MinLength(1)
    @MaxLength(100)
    @IsNotEmpty()
    name: string;

    @ApiProperty({default: 18, required: true, minimum: 1, maximum: 150})
    @IsNumber()
    @Min(1)
    @Max(150)
    @IsNotEmpty()
    age: number;

    @ApiProperty({default: 'dev@gmail.com', required: true, minLength: 1, maxLength: 150})
    @MinLength(1)
    @MaxLength(150)
    @IsNotEmpty()
    @IsEmail()
    email: string
}
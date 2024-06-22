import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginRequestDto {

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

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
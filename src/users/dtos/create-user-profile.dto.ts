import { IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {

  @ApiProperty({default: 1, required: true, minimum: 1})
  @Min(1)
  @IsNotEmpty()
  userId: number;

  @ApiProperty({default: 'Frist Name', required: true, minLength: 1, maxLength: 100})
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({default: 'Last Name', required: true, minLength: 1, maxLength: 100})
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({default: 18, required: true, minimum: 1, maximum: 150})
  @IsNumber()
  @Min(1)
  @Max(150)
  @IsNotEmpty()
  age: number;

  @ApiProperty({default: '10/10/2024', required: true, minLength: 10, maxLength: 10, description: 'Format: dd/MM/yyyy'})
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  dob: string;
}
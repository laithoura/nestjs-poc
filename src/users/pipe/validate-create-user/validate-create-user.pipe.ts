import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(user: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');
    console.log(user);
    console.log(metadata);

    const parseAgeToInt = parseInt(user.age.toString());
    if (isNaN(parseAgeToInt)) {
      throw new HttpException (
        'Invalid Data Type for property age. Expected Number',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { ...user, age: parseAgeToInt };
  }
}

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class ValidateUpdateUserPipe implements PipeTransform {
  transform(user: UpdateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateUpdateUserPipe!');
    console.log(user);
    console.log(metadata);

    const parseIdToInt = parseInt(user.id.toString());
    if (isNaN(parseIdToInt)) {
      throw new BadRequestException ('Invalid Data Type for property age. Expected Number');
    }

    const parseAgeToInt = parseInt(user.age.toString());
    if (isNaN(parseAgeToInt)) {
      throw new BadRequestException('Invalid Data Type for property age. Expected Number');
    }

    return { ...user, id: parseIdToInt, age: parseAgeToInt };
  }
}

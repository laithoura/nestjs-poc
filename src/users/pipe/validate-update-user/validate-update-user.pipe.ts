import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class ValidateUpdateUserPipe implements PipeTransform {
  transform(user: UpdateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateUpdateUserPipe!');
    console.log(user);
    console.log(metadata);
    return user;
  }
}

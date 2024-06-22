import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(user: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe!');
    return user;
  }
}

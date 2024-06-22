import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';

@Injectable()
export class ValidateLoginPipe implements PipeTransform {
  transform(value: LoginDto, metadata: ArgumentMetadata) {
    console.log(value)
    return value;
  }
}

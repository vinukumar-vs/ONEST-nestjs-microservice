import { Injectable } from '@nestjs/common';

@Injectable()
export class SunbirdService {
  getHello(): string {
    return 'Hello World!';
  }
}

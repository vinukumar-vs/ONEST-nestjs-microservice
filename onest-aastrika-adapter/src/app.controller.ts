import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AASTRIKA_ONEST_ADAPTER')
    private readonly client: ClientProxy,
  ) {}

  @MessagePattern('search-event')
  search(searchReqData: any): any {
    console.log('Astrika message handler of ', searchReqData);
    return of('Aastrika message');
  }
}

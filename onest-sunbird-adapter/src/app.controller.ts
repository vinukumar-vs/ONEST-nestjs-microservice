import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class SunbirdController {
  constructor(
    @Inject('SUNBIRD_ONEST_ADAPTER')
    private readonly client: ClientProxy,
  ) {}

  @MessagePattern('search-event')
  search(searchReqData: any) {
    console.log('Sunbird message handler of ', searchReqData);
    return 'Sunbird message';
  }
}

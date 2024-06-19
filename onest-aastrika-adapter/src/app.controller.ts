import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { AastrikaService } from './aastrika.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AASTRIKA_ONEST_ADAPTER')
    private readonly client: ClientProxy,
    private readonly aastrikaService: AastrikaService
  ) { }
  @EventPattern('search')
  async search(searchReqData: any): Promise<any> {
    console.log('Astrika message handler of ', searchReqData);
    return this.aastrikaService.search(searchReqData);
  }
  @EventPattern('select')
  async select(searchReqData: any): Promise<any> {
    console.log('Astrika message handler of ', searchReqData);
    return this.aastrikaService.select(searchReqData);
  }
}

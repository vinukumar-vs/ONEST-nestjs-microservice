import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';
import { SearchService } from './services/search.service';
import { SelectService } from './services/select.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AASTRIKA_ONEST_ADAPTER')
    private readonly client: ClientProxy,
    private readonly searchService: SearchService,
    private readonly selectService: SelectService
  ) { }
  @EventPattern('search')
  async search(searchReqData: any): Promise<any> {
    console.log('Astrika message handler for search');
    return this.searchService.search(searchReqData);
  }
  @EventPattern('select')
  async select(searchReqData: any): Promise<any> {
    console.log('Astrika message handler for select');
    return this.selectService.select(searchReqData);
  }
}

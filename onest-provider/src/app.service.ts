import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('EKSTEP_ONEST_ADAPTER')
    private readonly sunbirdAdapter: ClientProxy,
    @Inject('AASTRIKA_ONEST_ADAPTER')
    private readonly aastrikaAdapter: ClientProxy,
  ) {}

  getHello(): string {
    return 'Welcome to ONEST Provider aplication!';
  }

  async search(clientId: string, searchObj: any): Promise<any> {
    console.log('===',clientId, searchObj);
    // return `Body: ${searchObj.body} `;
    const resp =  this.aastrikaAdapter.send('search', searchObj)
    // console.log('resp',resp)
    return resp;
    this.aastrikaAdapter.emit('search-event', searchObj)
    // this.sunbirdAdapter.emit('search-event', searchObj);
    return of('OK');
  }
}

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

  search(clientId: string, searchObj: any): any {
    console.log(clientId, searchObj);
    // return `Body: ${searchObj.body} `;
    this.aastrikaAdapter.emit('search-event', searchObj);
    this.sunbirdAdapter.emit('search-event', searchObj);
    return of('OK');
  }
}

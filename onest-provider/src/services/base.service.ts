import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BaseService {
  protected readonly providers: { name: string, adapter: ClientProxy }[];

  constructor(
    @Inject('EKSTEP_ONEST_ADAPTER')
    protected readonly sunbirdAdapter: ClientProxy,
    @Inject('AASTRIKA_ONEST_ADAPTER')
    protected readonly aastrikaAdapter: ClientProxy,
  ) {
    this.providers = [
      { name: 'AASTRIKA', adapter: this.aastrikaAdapter },
      { name: 'EKSTEP', adapter: this.sunbirdAdapter }
    ];
  }

  protected async fetchProviderData(adapter: ClientProxy, action: string, requestData: any): Promise<any> {
    try {
      return await firstValueFrom(adapter.send(action, requestData));
    } catch (error) {
      console.error(`Error fetching data from provider: ${error.message}`);
      return null;
    }
  }

  protected async fetchAllProvidersData(action: string, requestData: any): Promise<any[]> {
    const responses = await Promise.all(this.providers.map(provider => this.fetchProviderData(provider.adapter, action, requestData)));
    return responses.filter(response => response && Object.keys(response).length > 0);
  }
}

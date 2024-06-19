import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catalogMessage, orderMessage } from './schemas/base';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly providers: { name: string, adapter: ClientProxy }[] = [
    { name: 'AASTRIKA', adapter: this.aastrikaAdapter },
    { name: 'EKSTEP', adapter: this.sunbirdAdapter }
  ];

  constructor(
    @Inject('EKSTEP_ONEST_ADAPTER')
    private readonly sunbirdAdapter: ClientProxy,
    @Inject('AASTRIKA_ONEST_ADAPTER')
    private readonly aastrikaAdapter: ClientProxy,
  ) {}

  getHello(): string {
    return 'Welcome to ONEST Provider application!';
  }

  private async fetchProviderData(adapter: ClientProxy, action: string, searchObj: any): Promise<any> {
    try {
      return await firstValueFrom(adapter.send(action, searchObj));
    } catch (error) {
      console.error(`Error fetching data from provider: ${error.message}`);
      return null;
    }
  }

  private processResponses(responses: any[]): any[] {
    return responses.filter(response => response && Object.keys(response).length > 0);
  }

  private async fetchAllProvidersData(action: string, searchObj: any): Promise<any[]> {
    const responses = await Promise.all(this.providers.map(provider => this.fetchProviderData(provider.adapter, action, searchObj)));
    return responses;
  }

  async search(clientId: string, searchObj: any): Promise<any> {
    const responses = await this.fetchAllProvidersData('search', searchObj);

    const { context } = searchObj;
    const searchResponse = {
      context,
      message: catalogMessage.message
    };

    searchResponse.context.action = 'search';
    searchResponse.message.catalog.providers = this.processResponses(responses);
    return searchResponse;
  }

  async select(clientId: string, searchObj: any): Promise<any> {
    const { context, message } = searchObj;
    const providerId = message?.order?.provider?.id;
  
    if (!providerId) {
      throw new Error('Provider ID is missing in the request.');
    }
  
    const selectedProvider = this.providers.find(provider => provider.name === providerId);
  console.log('selectedProvider',selectedProvider)
    if (!selectedProvider) {
      throw new Error(`Provider with ID ${providerId} is not configured.`);
    }
  
    const response = await this.fetchProviderData(selectedProvider.adapter, 'select', searchObj);
  
    const selectResponse = {
      context,
      message: orderMessage.message
    };
  
    selectResponse.context.action = 'on_select';
    selectResponse.message.order.provider = response;
  
    return selectResponse;
  }
}

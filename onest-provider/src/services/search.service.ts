import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { catalogMessage } from '../schemas/base';

@Injectable()
export class SearchService extends BaseService {
  async search(searchObj: any): Promise<any> {
    const responses = await this.fetchAllProvidersData('search', searchObj);

    const { context } = searchObj;
    const searchResponse = {
      context,
      message: catalogMessage.message
    };

    searchResponse.context.action = 'on_search';
    searchResponse.message.catalog.providers = responses.filter(response => response && Object.keys(response).length > 0);
    console.log('-----',searchResponse)
    // return searchResponse;
  }
}

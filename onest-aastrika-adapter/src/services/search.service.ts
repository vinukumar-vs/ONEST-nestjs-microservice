import { Injectable } from '@nestjs/common';
import * as lodash from 'lodash';
import * as objectMapper from 'object-mapper';
import { providerSchema, responsePath } from '../config/base.config';
import { searchItemSchema, searchUrlConfig } from '../config/search.config';

import { BaseService } from './base.service';

@Injectable()
export class SearchService extends BaseService {
  async search(body) {
    const { context } = body;
    if (context?.action === 'search') {
      return await this.handleSearch(context, body);
    }
  }

  async handleSearch(context, body) {
    try {
       // Get BAP URL from context
       let bapUrl = context?.bap_uri;
       bapUrl=`${bapUrl}on_search`
       console.log(bapUrl)
       if (!bapUrl) {
         throw new Error('BAP URL not provided in context');
       }
 
      const data = await this.makeApiRequest(searchUrlConfig);
      const itemArray = lodash.get(data, responsePath).map(item =>
        objectMapper(item, searchItemSchema)
      );
      const providerData = { ...providerSchema, items: itemArray };

      const catalogMessage = {
        message: {
            catalog: {
                descriptor: {
                    name: "Catalog"
                },
                providers: []
            }
        }
    };
      const searchResponse = {
        context,
        message: catalogMessage.message
      };
  
      searchResponse.context.action = 'on_search';
      searchResponse.message.catalog.providers.push(providerData)
      await this.sendResponseToBapUrl(bapUrl, searchResponse);
    } catch (error) {
      return await this.handleApiError(error, 'handleSearch');
    }
  }
}

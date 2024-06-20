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
      const data = await this.makeApiRequest(searchUrlConfig);
      const itemArray = lodash.get(data, responsePath).map(item =>
        objectMapper(item, searchItemSchema)
      );
      const providerData = { ...providerSchema, items: itemArray };
      return providerData;
    } catch (error) {
      return await this.handleApiError(error, 'handleSearch');
    }
  }
}


import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as lodash from 'lodash';
import * as objectMapper from 'object-mapper';
import { mergeData } from './utils';
import { of } from 'rxjs';

@Injectable()
export class AastrikaService {
  private providerSchemas;
  private providerUrls;
  private searchResponseData = null;
  private readonly logger = new Logger(AastrikaService.name);

  constructor() {
    // Directory where provider schemas are stored
    const schemaPath = path.join(__dirname, './config/aastrika.schema.js');
    this.providerSchemas = require(schemaPath);

    // Generate providerUrls dynamically from the providerSchemas
    this.providerUrls = {
      name: 'aastrika',
      urlConfig: this.providerSchemas.urlConfig
    } as any;

    console.log('sdksm',this.providerSchemas)
  }

  async fetchProviders({ name, urlConfig }) {
    try {
      const providerResponse = urlConfig.data
        ? await axios.post(urlConfig.url, urlConfig.data, { headers: urlConfig.headers })
        : await axios.get(urlConfig.url, { headers: urlConfig.headers });

      let fullData = providerResponse.data;
      fullData.name = name; // Add the provider name to the data for identification
console.log('full',fullData)
      // const providerSchema = this.providerSchemas[name];
      if (this.providerSchemas?.transformSchema && this.providerSchemas?.transformPath) {
        const path = this.providerSchemas.transformPath;
        if (fullData[path]) {
          fullData[path] = mergeData(fullData[path], this.providerSchemas.transformSchema);
        } else {
          this.logger.warn(`Path ${path} not found in provider data`);
        }
      }
      return fullData;
    } catch (error) {
      this.logger.error(`Error fetching provider information from ${urlConfig.url}:`, error.message);
      return { error: `Failed to fetch data from provider: ${name}` };
    }
  }

  async search( body) {
    const { context } = body;
    console.log('---contedt',context)
    if (context?.action === 'search') {
      console.log('---search')

      return await this.handleSearch(context, body);
    }
  }

  async handleSearch(context, body) {      console.log('---handleSearch',this.providerSchemas)

    const searchResults = await Promise.allSettled([this.fetchProviders(this.providerUrls)]);
    console.log('---searchResults',searchResults)

    for (const result of searchResults) {
      if (result.status === 'fulfilled' && !result.value.error) {
        const data = result.value;
        const schema = this.providerSchemas;
        if (schema) {
          const itemArray = lodash.get(data, schema.responsePath).map(item =>
            objectMapper(item, schema.itemSchema)
          );
          const providerData = { ...schema.providerSchema, items: itemArray };
          console.log('=====',providerData)
          return providerData;
        } else {
          this.logger.error(`No schema found for provider name: ${data.name}`);
        }
      } else if (result.status === 'rejected') {
        this.logger.error(`Error fetching provider information: ${result.reason}`);
      } else {
        this.logger.error(`Provider data error: ${result.value.error}`);
      }
    }


  }


  async handleSelect(context, body) {
    // context.action = 'on_select';
    // if (this.searchResponseData) {
    //   const providerResult = lodash.find(this.searchResponseData, item => item.id.toLowerCase() === body.message.order.provider.id.toLowerCase());
    //   if (providerResult) {
    //     const schema = this.providerSchemas[providerResult.id.toLowerCase()];
    //     // const selectResponse = {
    //     //   context,
    //     //   message: orderMessage.message
    //     // };

    //     if (schema) {
    //       const itemArray = lodash.filter(providerResult.items, item => item.id == body.message.order.items[0].id);
    //       const providerData = { ...schema.providerSchema, items: itemArray };

    //       selectResponse.message.order.provider = providerData;
    //       return selectResponse;
    //     } else {
    //       this.logger.error(`No schema found for provider name: ${providerResult.id}`);
    //       throw new Error('Internal server error');
    //     }
    //   } else {
    //     throw new Error('Provider not found');
    //   }
    // } else {
    //   throw new Error('No search data available');
    // }
  }
}

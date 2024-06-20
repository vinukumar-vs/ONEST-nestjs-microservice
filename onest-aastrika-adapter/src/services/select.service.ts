import { Injectable } from '@nestjs/common';
import * as objectMapper from 'object-mapper';
import { providerSchema } from '../config/base.config';
import { selectItemSchema, selectUrlConfig } from '../config/select.config';
import { BaseService } from './base.service';

@Injectable()
export class SelectService extends BaseService {
  async select(body) {
    const { context } = body;
    if (context?.action === 'select') {
      console.log('seckldml')
      return await this.handleSelect(context, body);
    }
  }

  async handleSelect(context, body) {
    const doId = body.message.order.items[0].id;

    let bapUrl = context?.bap_uri;
    bapUrl = `${bapUrl}on_select`
    console.log(bapUrl)

    try {
      const selectUrl = selectUrlConfig.url.replace('{{doId}}', doId);
      const data = await this.makeApiRequest({ ...selectUrlConfig, url: selectUrl });
      const item = objectMapper(data.result.content, selectItemSchema);
      const itemArray = Array.isArray(item) ? item : [item];
      const providerData = { ...providerSchema, items: itemArray };
      const orderMessage = {
        message: {
          order: {
            provider: {}
          }
        }
      };

      const selectResponse = {
        context,
        message: orderMessage.message
      };

      selectResponse.context.action = 'on_select';
      selectResponse.message.order.provider = providerData;
      await this.sendResponseToBapUrl(bapUrl, selectResponse);


      return providerData;
    } catch (error) {
      return await this.handleApiError(error, 'handleSelect');
    }
  }
}

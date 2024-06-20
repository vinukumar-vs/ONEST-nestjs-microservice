import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { orderMessage } from '../schemas/base';

@Injectable()
export class SelectService extends BaseService {
    async select(selectObj: any): Promise<any> {
        const { context, message } = selectObj;
        const providerId = message?.order?.provider?.id;

        if (!providerId) {
            throw new Error('Provider ID is missing in the request.');
        }

        const selectedProvider = this.providers.find(provider => provider.name === providerId);

        if (!selectedProvider) {
            throw new Error(`Provider with ID ${providerId} is not configured.`);
        }

        const response = await this.fetchProviderData(selectedProvider.adapter, 'select', selectObj);

        const selectResponse = {
            context,
            message: orderMessage.message
        };

        selectResponse.context.action = 'on_select';
        selectResponse.message.order.provider = response;
        console.log('=======', selectResponse)

        // return selectResponse;
    }
}

import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { providerSchema } from '../config/base.config';
import * as objectMapper from 'object-mapper';

@Injectable()
export class BaseService {
  private readonly logger = new Logger(BaseService.name);

  protected async makeApiRequest(config) {
    try {
      const response = config.data
        ? await axios.post(config.url, config.data, { headers: config.headers })
        : await axios.get(config.url, { headers: config.headers });
      return response.data;
    } catch (error) {
      this.logger.error(`Error making API request to ${config.url}: ${error.message}`);
      throw error;
    }
  }

  protected async handleApiError(error, endpoint) {
    this.logger.error(`Error in ${endpoint}: ${error.message}`);
    throw error;
  }

  protected async sendResponseToBapUrl(url: string, data: any) {
    try {
      await axios.post(url, data);
    } catch (error) {
      throw new Error(`Error sending response to BAP URL: ${error.message}`);
    }
  }
}

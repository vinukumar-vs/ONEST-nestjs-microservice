
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
  }

  async fetchProviders({ name, urlConfig }) {
    try {
      const providerResponse = urlConfig.data
        ? await axios.post(urlConfig.url, urlConfig.data, { headers: urlConfig.headers })
        : await axios.get(urlConfig.url, { headers: urlConfig.headers });

      let fullData = providerResponse.data;
      fullData.name = name; // Add the provider name to the data for identification
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

  async search(body) {
    const { context } = body;
    if (context?.action === 'search') {
      return await this.handleSearch(context, body);
    }
  }

  async select(body) {
    console.log('select')
    const { context } = body;
    if (context?.action === 'select') {
      return await this.handleSelect(context, body);
    }
  }

  async handleSearch(context, body) {
    try{
    const searchResults = await Promise.allSettled([this.fetchProviders(this.providerUrls)]);
    for (const result of searchResults) {
      if (result.status === 'fulfilled' && !result.value.error) {
        const data = result.value;
        const schema = this.providerSchemas;
        if (schema) {
          const itemArray = lodash.get(data, schema.responsePath).map(item =>
            objectMapper(item, schema.itemSchema)
          );
          const providerData = { ...schema.providerSchema, items: itemArray };
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
  } catch (error) {
    this.logger.error(`Error in handleSearch: ${error.message}`);
  }
  // Return an empty array if any error occurs
  return null;
  }


  async handleSelect(context, body) {
let identifier=body.message.order.items.id
    // const searchResults = await Promise.allSettled([this.fetchProviders(this.providerUrls)]);

    const searchResult ={
      "ownershipType": [
          "createdFor"
      ],
      "instructions": "<p>Long</p>\n",
      "publisherIDs": [
          "8eab395d-46f4-47ff-90af-9d51d5126fc3"
      ],
      "channel": "0132317968766894088",
      "downloadUrl": "https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/ecar_files/do_113690270417502208120/ear-nose-and-throat-ent-care-for-asha_1677648513469_do_113690270417502208120_6.0_spine.ecar",
      "isIframeSupported": "Yes",
      "organisation": [
          "0132317968766894088"
      ],
      "language": [
          "English"
      ],
      "mimeType": "application/vnd.ekstep.content-collection",
      "variants": "{\"online\":{\"ecarUrl\":\"https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/ecar_files/do_113690270417502208120/ear-nose-and-throat-ent-care-for-asha_1677648513850_do_113690270417502208120_6.0_online.ecar\",\"size\":8482.0},\"spine\":{\"ecarUrl\":\"https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/ecar_files/do_113690270417502208120/ear-nose-and-throat-ent-care-for-asha_1677648513469_do_113690270417502208120_6.0_spine.ecar\",\"size\":107455.0}}",
      "leafNodes": [
          "do_113690277685231616123",
          "do_113690280391696384132",
          "do_113690278559694848126",
          "do_113690276409524224122",
          "do_113690279163101184128",
          "do_113690279769235456130",
          "do_113690281042157568134"
      ],
      "objectType": "Collection",
      "appIcon": "https://sunbirdcontent.s3-ap-south-1.amazonaws.com/content/do_113690270417502208120/artifact/do_113690270806417408121_1671175635742_do113643528224612352111901665469754255entcare16654697522381671175638070.thumb.jpg",
      "subTitle": "The present module is designed to give you an insight into the Ear, Nose and Throat (ENT) Care for ASHA.",
      "primaryCategory": "Course",
      "appId": "staging.diksha.app",
      "contentEncoding": "gzip",
      "generateDIALCodes": "No",
      "totalCompressedSize": 60283026,
      "mimeTypesCount": "{\"application/vnd.ekstep.html-archive\":5,\"application/json\":2}",
      "contentType": "Course",
      "trackable": {
          "enabled": "Yes",
          "autoBatch": "Yes"
      },
      "identifier": "do_113690270417502208120",
      "audience": [
          "Student"
      ],
      "thumbnail": "https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/content/do_113690270806417408121/artifact/do_113690270806417408121_1671175635742_do113643528224612352111901665469754255entcare16654697522381671175638070.jpg",
      "toc_url": "https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/content/do_113690270417502208120/artifact/do_113690270417502208120_toc.json",
      "isExternal": false,
      "visibility": "Default",
      "contentTypesCount": "{\"Resource\":7}",
      "consumerId": "cf6cfe32-8803-4625-8ddb-049ff77e1c06",
      "childNodes": [
          "do_113690277685231616123",
          "do_113690280391696384132",
          "do_113690276409524224122",
          "do_113690278559694848126",
          "do_113690279163101184128",
          "do_113690281042157568134",
          "do_113690279769235456130"
      ],
      "discussionForum": "{\"enabled\":\"No\"}",
      "mediaType": "content",
      "publisherDetails": "[{\"id\":\"8eab395d-46f4-47ff-90af-9d51d5126fc3\",\"name\":\"Publisher User\"}]",
      "osId": "org.ekstep.quiz.app",
      "graph_id": "domain",
      "nodeType": "DATA_NODE",
      "lastPublishedBy": "publisheruser_m5qs",
      "version": 2,
      "license": "CC BY 4.0",
      "prevState": "Review",
      "exclusiveContent": false,
      "size": 107455,
      "lastPublishedOn": "2023-03-01T05:28:32.613+0000",
      "IL_FUNC_OBJECT_TYPE": "Collection",
      "name": "Ear, Nose and Throat (ENT) Care for ASHA",
      "isRejected": true,
      "reviewStatus": "Reviewed",
      "status": "Live",
      "code": "8373114121747023",
      "purpose": "The present module is designed to give you an insight into the Ear, Nose and Throat (ENT) Care for ASHA.",
      "credentials": {
          "enabled": "No"
      },
      "prevStatus": "Review",
      "issueCertification": false,
      "description": "The present module is designed to give you an insight into the Ear, Nose and Throat (ENT) Care for ASHA.",
      "gatingEnabled": true,
      "posterImage": "https://sunbirdcontent-stage.s3-ap-south-1.amazonaws.com/content/do_113690270806417408121/artifact/do_113690270806417408121_1671175635742_do113643528224612352111901665469754255entcare16654697522381671175638070.jpg",
      "idealScreenSize": "normal",
      "createdOn": "2022-12-16T07:26:28.147+0000",
      "duration": "7200",
      "expiryDate": "20271216T072632+0000",
      "batches": [
          {
              "createdFor": [],
              "endDate": "2031-01-01",
              "name": "Open Batch",
              "enrollmentType": "open",
              "batchId": "01369028501247590414",
              "enrollmentEndDate": "2030-12-01",
              "startDate": "2022-12-16",
              "status": 1
          }
      ],
      "contentDisposition": "inline",
      "lastUpdatedOn": "2023-03-01T05:28:32.229+0000",
      "langName": "en",
      "courseVisibility": false,
      "lang": "en",
      "dialcodeRequired": "No",
      "createdFor": [
          "0132317968766894088"
      ],
      "creator": "creatoruser_8sxg",
      "os": [
          "All"
      ],
      "IL_SYS_NODE_TYPE": "DATA_NODE",
      "se_FWIds": [
          "test_fw_1"
      ],
      "reviewer": "[{\"id\":\"9e8e8ea1-2c9c-4280-9544-6e3c07339a91\",\"name\":\"Reviewer User\"}]",
      "pkgVersion": 6,
      "versionKey": "1677648512485",
      "reviewerIDs": [
          "9e8e8ea1-2c9c-4280-9544-6e3c07339a91"
      ],
      "idealScreenDensity": "hdpi",
      "framework": "test_fw_1",
      "depth": 0,
      "s3Key": "ecar_files/do_113690270417502208120/ear-nose-and-throat-ent-care-for-asha_1677648513469_do_113690270417502208120_6.0_spine.ecar",
      "lastSubmittedOn": "2023-03-01T05:26:02.274+0000",
      "createdBy": "f2363198-dfd1-4fd8-aa73-b161823ec676",
      "compatibilityLevel": 4,
      "leafNodesCount": 7,
      "userConsent": "Yes",
      "studyDuration": 0,
      "sourceName": "Ministry of Health and Family Welfare",
      "IL_UNIQUE_ID": "do_113690270417502208120",
      "node_id": 8512
  }

  const searchResultsArray = Array.isArray(searchResult) ? searchResult : [searchResult];

    if (searchResult) {
      // const providerResult = lodash.find(this.searchResponseData, item => item.id.toLowerCase() === body.message.order.provider.id.toLowerCase());
      // if (providerResult) {
        const schema = this.providerSchemas;
        if (schema) {
          const item = 
          // lodash.get(data, schema.responsePath).map(item =>
            objectMapper(searchResult, schema.itemSchema)
          // );       
          const itemArray = Array.isArray(item) ? item : [item];

             const providerData = { ...schema.providerSchema, items: itemArray };

          console.log('prov data',providerData)
          return providerData
        } else {
          this.logger.error(`No schema found for provider name: ${schema.name}`);
          throw new Error('Internal server error');
          return null
        }
      } else {
        throw new Error('Provider not found');
        return null
      }
    // } else {
    //   throw new Error('No search data available');
    // }
  }
}

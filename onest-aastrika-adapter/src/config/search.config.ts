import { ItemSchema } from './base.config';

const searchItemSchema: ItemSchema = {
    identifier: 'id',
    code: 'descriptor.id',
    name: 'descriptor.name',
    description: 'descriptor.short_desc',
    createdBy: 'creator.id',
    creator: 'creator.name',
    appIcon: [
        {
            key: 'descriptor.images[]+.url+',
        },
    ],
    posterImage: [
        {
            key: 'descriptor.images[]+.url',
        },
    ],
    'tags[]': [{ key: 'tags.list[].value' }],
};

const searchUrlConfig = {
    url: 'https://aastrika-stage.tarento.com/apis/public/v8/courseRecommendation/publicSearch/getcourse',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        query: "",
        language: ""
    }
};

export { searchItemSchema, searchUrlConfig };

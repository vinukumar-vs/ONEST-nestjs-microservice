import { ItemSchema } from './base.config';

const selectItemSchema: ItemSchema = {
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

const selectUrlConfig = {
    url: 'https://aastrika-stage.tarento.com/apis/proxies/v8/action/content/v3/hierarchy/{{doId}}?hierarchyType=detail',
    headers: {
        "Cookie": ''
    }
};

export { selectItemSchema, selectUrlConfig };

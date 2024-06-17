// Define types for schemas
type Category = {
    descriptor: {
        code: string;
        name: string;
    };
    id: string;
};

type Image = {
    size_type: string;
    url: string;
};

type Descriptor = {
    name: string;
    short_desc: string;
    images: Image[];
};

type FulfillmentAgent = {
    person: {
        name: string;
    };
    contact: {
        email: string;
    };
};

type Fulfillment = {
    agent: FulfillmentAgent;
};

type ProviderSchema = {
    categories: Category[];
    descriptor: Descriptor;
    id: string;
    items: any[];
    fulfillments: Fulfillment[];
};

type ItemSchema = {
    identifier: string;
    code: string;
    name: string;
    description: string;
    createdBy: string;
    creator: string;
    appIcon: { key: string }[];
    posterImage: { key: string }[];
    'tags[]': { key: string }[];
};

type UrlConfig = {
    url: string;
    headers: {
        'Content-Type': string;
    };
    data: {
        query: string;
        language: string;
    };
};

// Define the schemas and configurations
const providerSchema: ProviderSchema = {
    categories: [
        {
            descriptor: {
                code: "LANGUAGE-COURSES",
                name: "Language Courses"
            },
            id: "LANGUAGE-COURSES"
        },
        {
            id: "SKILL-DEVELOPMENT-COURSES",
            descriptor: {
                code: "SKILL-DEVELOPMENT-COURSES",
                name: "Skill development Courses"
            }
        },
    ],
    descriptor: {
        name: "Astrika",
        short_desc: "Astrika Content",
        images: [
            {
                size_type: "sm",
                url: "https://sunbird.org/images/sunbird-logo-new.png"
            }
        ]
    },
    id: "Astrika",
    items: [],
    fulfillments: [
        {
            agent: {
                person: {
                    name: ""
                },
                contact: {
                    email: ""
                }
            }
        }
    ]
};

const responsePath: string = 'result.content';

const itemSchema: ItemSchema = {
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

const urlConfig: UrlConfig = {
    url: 'https://aastrika-stage.tarento.com/apis/public/v8/courseRecommendation/publicSearch/getcourse',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        query: 'asha',
        language: 'en'
    }
};

export { providerSchema, responsePath, itemSchema, urlConfig };

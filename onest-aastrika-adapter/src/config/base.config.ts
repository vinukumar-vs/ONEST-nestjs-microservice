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


const providerSchema: ProviderSchema = {
    categories: [
        {
            descriptor: {
                code: "",
                name: ""
            },
            id: ""
        },
        {
            id: "",
            descriptor: {
                code: "",
                name: ""
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

export { providerSchema, responsePath, ItemSchema };

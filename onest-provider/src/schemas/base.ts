// Define types for catalog and order messages

interface CatalogMessage {
    message: {
        catalog: {
            descriptor: {
                name: string;
            };
            providers: any[];
        };
    };
}

interface OrderMessage {
    message: {
        order: {
            provider: any; 
        };
    };
}


const catalogMessage: CatalogMessage = {
    message: {
        catalog: {
            descriptor: {
                name: "Catalog"
            },
            providers: []
        }
    }
};

const orderMessage: OrderMessage = {
    message: {
        order: {
            provider: {}
        }
    }
};


export { catalogMessage, orderMessage };

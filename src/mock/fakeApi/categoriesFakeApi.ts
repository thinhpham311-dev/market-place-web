import { wildCardSearch, sortBy, paginate } from '@/lib/feature';
import { Server } from 'miragejs';

type Sort = {
    order: 'asc' | 'desc';
    key: keyof Product;
};

type RequestBody = {
    pageIndex: number;
    pageSize: number;
    sort: Sort;
    query?: string;
};

type Product = {
    id: number;
    name: string;
    product: string;
    email: string;
    order: string;
    // You can add additional fixed fields here if necessary, or use more specific types for dynamic properties
};

type Database = {
    productsData: Product[];
};

export default function productsFakeApi(server: Server<Database>, apiPrefix: string): void {
    server.post(`${apiPrefix}/products`, (schema, request) => {
        const body: RequestBody = JSON.parse(request.requestBody);
        const { pageIndex, pageSize, sort, query } = body;
        const { order, key } = sort;

        const products = schema.db.productsData as Product[];
        const sanitizeProducts = products.filter((elm) => typeof elm !== 'function');
        let data = [...sanitizeProducts];
        let total = products.length;

        // Updated sorting function to handle all types
        if ((key === 'name' || key === 'product' || key === 'email' || key === 'order') && order) {
            data.sort(sortBy(key, order === 'desc', (item: string | number | boolean | undefined) => {
                if (typeof item === 'string') {
                    return item.toUpperCase();
                }
                if (typeof item === 'number') {
                    return item;
                }
                return ''; // Return a default for undefined or boolean (adjust based on your use case)
            }));
        } else {
            data.sort(sortBy(key, order === 'desc', (item: string | number | boolean | undefined) => {
                if (typeof item === 'number') {
                    return item;
                }
                return parseInt(String(item), 10); // Ensure all values are converted to numbers where necessary
            }));
        }

        if (query) {
            data = wildCardSearch(data, query);
            total = data.length;
        }

        data = paginate(data, pageSize, pageIndex);

        return {
            data,
            total,
        };
    });

}

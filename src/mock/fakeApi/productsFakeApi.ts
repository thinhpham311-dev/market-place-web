import { wildCardSearch, sortBy, paginate } from '@/lib/feature';
import { Server } from 'miragejs';
import { IProduct } from '@/types/product';

type Sort = {
    order: 'asc' | 'desc';
    key: keyof IProduct;
};

type RequestBody = {
    pageIndex: number;
    pageSize: number;
    sort: Sort;
    query?: string;
};



type Database = {
    productsData: IProduct[];
};

export default function productsFakeApi(server: Server<Database>, apiPrefix: string): void {
    server.post(`${apiPrefix}/products`, (schema, request) => {
        const body: RequestBody = JSON.parse(request.requestBody);
        const { pageIndex, pageSize, sort, query } = body;
        const { order, key } = sort;

        const products = schema.db.productsData as IProduct[];
        const sanitizeProducts = products.filter((elm) => typeof elm !== 'function');
        let data = [...sanitizeProducts];
        let total = products.length;

        // Updated sorting function to handle all types
        if ((key === 'name') && order) {
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

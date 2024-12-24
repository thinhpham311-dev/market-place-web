import { wildCardSearch, sortBy, paginate } from '@/lib/feature'


export default function productsFakeApi(server, apiPrefix) {

    server.post(`${apiPrefix}/products`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const { pageIndex, pageSize, sort, query } = body
        const { order, key } = sort
        const products = schema.db.productsData
        console.log(products)
        const sanitizeProducts = products.filter(elm => typeof elm !== 'function')
        let data = sanitizeProducts
        let total = products.length

        if ((key === 'name' || key === 'product' || key === 'email' || key === 'order') && order) {
            products.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()));
        } else {
            products.sort(sortBy(key, order === 'desc', (a) => parseInt(a, 10)));
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        return {
            data: data,
            total: total
        };
    })

    // server.del(`${apiPrefix}/sales/products/delete`, (schema, { requestBody }) => {
    //     const { id } = JSON.parse(requestBody)
    //     schema.db.productsData.remove({ id })
    //     return true
    // })

    // server.get(`${apiPrefix}/sales/product`, (schema, { queryParams }) => {
    //     const { id } = queryParams
    //     return schema.db.productsData.find(id);
    // })

    // server.put(`${apiPrefix}/sales/products/update`, (schema, { requestBody }) => {
    //     const data = JSON.parse(requestBody)
    //     const { id } = data
    //     schema.db.productsData.update({ id }, data)
    //     return true
    // })

    // server.post(`${apiPrefix}/sales/products/create`, (schema, { requestBody }) => {
    //     const data = JSON.parse(requestBody)
    //     schema.db.productsData.insert(data)
    //     return true
    // })

    // server.get(`${apiPrefix}/sales/orders`, (schema, { queryParams }) => {
    //     const { pageIndex, pageSize, sort, query } = queryParams
    //     const { order, key } = JSON.parse(sort)
    //     const orders = schema.db.ordersData
    //     const sanitizeProducts = orders.filter(elm => typeof elm !== 'function')
    //     let data = sanitizeProducts
    //     let total = orders.length

    //     if (key) {
    //         if ((key === 'date' || key === 'status' || key === 'paymentMehod') && order) {
    //             data.sort(sortBy(key, order === 'desc', parseInt))
    //         } else {
    //             data.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()))
    //         }
    //     }

    //     if (query) {
    //         data = wildCardSearch(data, query)
    //         total = data.length
    //     }

    //     data = paginate(data, pageSize, pageIndex)

    //     return {
    //         data: data,
    //         total: total
    //     };
    // })


}
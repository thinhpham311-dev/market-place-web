
import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'
import { productData } from './data/productData'

import {
    productsFakeApi,
} from './fakeApi'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                productData,
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough(request => {
                return request.url.startsWith('http');
            })
            this.passthrough()
            productsFakeApi(this, apiPrefix)
        },
    })
}
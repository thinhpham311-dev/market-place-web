import axios from 'axios';
import qs from 'qs';
import { API_PRODUCT_LIST, API_PRODUCT_DETAIL, API_PRODUCT_LIST_BY_CATEGORY_ID, prefix, version } from "@/admin/constants"
import { IGetProductRequest, IGetCategoryRequest } from "@/admin/interfaces"
import { Product } from "@/admin/models"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const http = axios.create({
    baseURL: `${baseURL}/${prefix}/${version}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

class ProductService {
    static GetProductList() {
        return http.post<typeof Product[]>(API_PRODUCT_LIST);
    }

    static GetProduct(values: IGetProductRequest) {
        const data = qs.stringify(values);
        return http.post<typeof Product>(API_PRODUCT_DETAIL, data);
    }

    static GetProductByCategoryId(values: IGetCategoryRequest) {
        const data = qs.stringify(values);
        return http.post<typeof Product>(API_PRODUCT_LIST_BY_CATEGORY_ID, data);
    }
}

export default ProductService

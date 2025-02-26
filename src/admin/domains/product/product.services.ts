
import qs from 'qs';
import { API_PRODUCT_LIST, API_PRODUCT_DETAIL, API_PRODUCT_LIST_BY_CATEGORY_ID } from "@/admin/constants"
import { IGetProductRequest, IGetCategoryRequest } from "@/admin/interfaces"
import { Product } from "@/admin/models"
import BaseService from "@/admin/domains/base.services"


class ProductService {
    static GetProductList() {
        return BaseService().post<typeof Product[]>(API_PRODUCT_LIST);
    }

    static GetProduct(values: IGetProductRequest) {
        const data = qs.stringify(values);
        return BaseService().post<typeof Product>(API_PRODUCT_DETAIL, data);
    }

    static GetProductByCategoryId(values: IGetCategoryRequest) {
        const data = qs.stringify(values);
        return BaseService().post<typeof Product>(API_PRODUCT_LIST_BY_CATEGORY_ID, data);
    }
}

export default ProductService

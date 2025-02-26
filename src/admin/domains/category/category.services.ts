
import qs from 'qs';
import { API_CATEGORY_LIST, API_CATEGORY_DETAIL } from "@/admin/constants"
import { IGetCategoryRequest } from "@/admin/interfaces"
import { Category } from '@/admin/models';
import BaseService from "@/admin/domains/base.services"


class CategoryService {
    static GetCategoryList() {
        return BaseService().post<typeof Category[]>(API_CATEGORY_LIST);
    }

    static GetCategory(values: IGetCategoryRequest) {
        const data = qs.stringify(values);
        return BaseService().post<typeof Category>(API_CATEGORY_DETAIL, data);
    }

}

export default CategoryService

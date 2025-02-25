import axios from 'axios';
import qs from 'qs';
import { API_CATEGORY_LIST, API_CATEGORY_DETAIL, prefix, version } from "@/admin/constants"
import { IGetCategoryRequest } from "@/admin/interfaces"
import { Category } from '@/admin/models';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const http = axios.create({
    baseURL: `${baseURL}/${prefix}/${version}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

class CategoryService {
    static GetCategoryList() {
        return http.post<typeof Category[]>(API_CATEGORY_LIST);
    }

    static GetCategory(values: IGetCategoryRequest) {
        const data = qs.stringify(values);
        return http.post<typeof Category>(API_CATEGORY_DETAIL, data);
    }

}

export default CategoryService

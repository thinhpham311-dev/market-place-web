import axios from 'axios';
import qs from 'qs';
import { API_CUSTOMER_LOGIN, prefix, version } from '@/admin/constants';
import { IGetUserLoginRequest } from '@/admin/interfaces';
import { Customer } from '@/admin/models';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const http = axios.create({
    baseURL: `${baseURL}/${prefix}/${version}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

class CustomerService {
    static GetCustomerLogin(values: IGetUserLoginRequest) {
        const data = qs.stringify(values);
        return http.post<typeof Customer>(API_CUSTOMER_LOGIN, data);
    }
}

export default CustomerService

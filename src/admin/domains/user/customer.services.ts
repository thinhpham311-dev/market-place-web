
import qs from 'qs';
import { API_CUSTOMER_LOGIN } from '@/admin/constants';
import { IUserLoginRequest } from '@/admin/interfaces';
import { Customer } from '@/admin/models';
import BaseService from "@/admin/domains/base.services"

class CustomerService {
    static CustomerLogin(values: IUserLoginRequest) {
        const data = qs.stringify(values);
        return BaseService().post<typeof Customer>(API_CUSTOMER_LOGIN, data);
    }
}

export default CustomerService

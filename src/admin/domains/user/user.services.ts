
import qs from 'qs';
import { API_USER_PROFILE } from '@/admin/constants';
import { IGetUserProfileRequest } from '@/admin/interfaces';
import { User } from '@/admin/models';
import BaseService from "@/admin/domains/base.services"

class UserService {
    static GetUserProfile(values: IGetUserProfileRequest) {
        const data = qs.stringify(values);
        return BaseService(values?.token).post<typeof User>(API_USER_PROFILE, data);
    }
}

export default UserService

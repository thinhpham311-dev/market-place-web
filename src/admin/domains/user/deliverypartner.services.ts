import axios from 'axios';
import qs from 'qs';
import { DeliveryPartner } from '@/admin/models';
import { API_DELIVERYPARTNER_LOGIN, prefix, version } from '@/admin/constants';
import { IGetDeliveryPartnerLoginRequest } from "@/admin/interfaces"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const http = axios.create({
    baseURL: `${baseURL}/${prefix}/${version}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

class DeliveryPartnerService {
    static GetDeliveryPartnerLogin(values: IGetDeliveryPartnerLoginRequest) {
        const data = qs.stringify(values);
        return http.post<typeof DeliveryPartner>(API_DELIVERYPARTNER_LOGIN, data);
    }
}

export default DeliveryPartnerService

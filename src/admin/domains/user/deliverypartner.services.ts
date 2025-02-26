import qs from 'qs';
import { DeliveryPartner } from '@/admin/models';
import { API_DELIVERYPARTNER_LOGIN } from '@/admin/constants';
import { IDeliveryPartnerLoginRequest } from "@/admin/interfaces"
import BaseService from "@/admin/domains/base.services"


class DeliveryPartnerService {
    static DeliveryPartnerLogin(values: IDeliveryPartnerLoginRequest) {
        const data = qs.stringify(values);
        return BaseService().post<typeof DeliveryPartner>(API_DELIVERYPARTNER_LOGIN, data);
    }
}

export default DeliveryPartnerService

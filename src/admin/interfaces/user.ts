

export interface IUserLoginRequest {
    phone: number;
}

export interface IDeliveryPartnerLoginRequest {
    email: string;
    password: string;
}

export interface IGetUserProfileRequest {
    userId: string;
    role: string;
    token: string;
}
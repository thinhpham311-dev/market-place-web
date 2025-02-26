import axios from 'axios';
import { prefix, version } from "@/admin/constants";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "@/admin/constants";

const unauthorizedCode = [401];
const host = process.env.NEXT_PUBLIC_BASE_URL;

const BaseService = (token?: string) => {
    const instance = axios.create({
        baseURL: `${host}/${prefix}/${version}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    // Request interceptor
    instance.interceptors.request.use(config => {
        if (token) {
            config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // Response interceptor
    instance.interceptors.response.use(
        response => response,
        error => {
            const { response } = error;
            if (unauthorizedCode.includes(response?.status)) {
                // Handle unauthorized error, e.g., redirect to login or refresh token
                console.error('Unauthorized access:', response);
                // You can redirect to login or handle token refresh here
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default BaseService;
export const prefix = "api"
export const version = "v1"
export const TOKEN_TYPE = 'Bearer '
export const REQUEST_HEADER_AUTH_KEY = 'Authorization'

//product
export const API_PRODUCT_LIST = "/product/list";
export const API_PRODUCT_DETAIL = "/product/detail";
export const API_PRODUCT_LIST_BY_CATEGORY_ID = "/product/listByCategoryId"

//category
export const API_CATEGORY_LIST = "/category/list";
export const API_CATEGORY_DETAIL = "/category/detail";

//customer
export const API_CUSTOMER_LOGIN = "/auth/customer/sign-in"

//delivery partner 
export const API_DELIVERYPARTNER_LOGIN = "/auth/delivery-partner/sign-in"

//admin 
export const API_ADMIN_LOGIN = "/auth/admin/sign-in"

//user
export const API_USER_PROFILE = "/auth/user/profile"
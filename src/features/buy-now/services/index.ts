import ApiService from "@/services/ApiService";

export async function apiPostCheckoutReview(data: {
  cartId: string;
  userId: string;
  shop_order_ids: any[];
}) {
  return ApiService.fetchData({
    url: `/checkout/review`,
    method: "POST",
    data,
  });
}

export async function apiPostCheckoutAdd(data: {
  cartId: string;
  userId: string;
  shop_order_ids: any[];
  user_address?: any;
  user_payment?: any;
}) {
  return ApiService.fetchData({
    url: `/checkout/add`,
    method: "POST",
    data,
  });
}

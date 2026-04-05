import ApiService from "@/services/ApiService";
import { IShopModel } from "@/models/shop";

export async function apiPostShopDetail(data: IShopModel) {
  return ApiService.fetchData({
    url: `/shop/detail`,
    method: "POST",
    data,
  });
}

export async function apiFollowShop(shopId: string) {
  return ApiService.fetchData({
    url: `/shop/follow/${encodeURIComponent(shopId)}`,
    method: "POST",
  });
}

export async function apiUnfollowShop(shopId: string) {
  return ApiService.fetchData({
    url: `/shop/unfollow/${encodeURIComponent(shopId)}`,
    method: "POST",
  });
}

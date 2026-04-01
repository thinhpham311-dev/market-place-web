import ApiService from "@/services/ApiService";

export async function apiGetDiscountList({
  shopId,
  limit = 50,
  page = 1,
}: {
  shopId: string;
  limit?: number;
  page?: number;
}) {
  return ApiService.fetchData({
    url: `/discount/list?shopId=${encodeURIComponent(shopId)}&limit=${limit}&page=${page}`,
    method: "GET",
  });
}

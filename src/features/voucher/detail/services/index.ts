import ApiService from "@/services/ApiService";

export async function apiGetVoucherProducts({
  code,
  shopId,
  limit = 50,
  page = 1,
}: {
  code: string;
  shopId?: string;
  limit?: number;
  page?: number;
}) {
  const query = new URLSearchParams({
    code,
    limit: String(limit),
    page: String(page),
  });

  if (shopId) {
    query.set("shopId", shopId);
  }

  return ApiService.fetchData({
    url: `/discount/list_product_code?${query.toString()}`,
    method: "GET",
  });
}

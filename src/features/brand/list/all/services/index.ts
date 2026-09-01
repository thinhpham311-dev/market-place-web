import ApiService from "@/services/ApiService";

export async function apiPostBrandAllList(data?: {
  search?: string;
  category_id?: string;
  limit?: number;
  page?: number;
}) {
  const queryParams = new URLSearchParams();
  if (data?.search) queryParams.set("search", data.search);
  if (data?.category_id && data.category_id !== "all") queryParams.set("category_id", data.category_id);
  if (data?.limit) queryParams.set("limit", String(data.limit));
  if (data?.page) queryParams.set("page", String(data.page));

  const queryString = queryParams.toString();

  return ApiService.fetchData({
    url: `/brand/all${queryString ? `?${queryString}` : ""}`,
    method: "POST",
    data,
  });
}

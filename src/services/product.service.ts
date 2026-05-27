import ApiService from "./ApiService";

export interface ProductItem {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
  inStock: boolean;
}

export interface SearchProductResponse {
  data: ProductItem[];
}

/**
 * Searches for products (SPUs) based on a keyword.
 * Supports Axios request cancellation via AbortSignal.
 *
 * @param q The search keyword.
 * @param signal AbortSignal to cancel previous requests.
 * @returns Promise containing the AxiosResponse with SearchProductResponse.
 */
export async function apiSearchProducts(q: string, signal?: AbortSignal) {
  return ApiService.fetchData<SearchProductResponse>({
    url: "/v1/api/product/spu/search",
    method: "get",
    params: { q },
    signal,
  });
}

/**
 * Fetches search suggestions for autocomplete matching the keyword.
 *
 * @param q The search keyword.
 * @param limit The limit of suggestions to return.
 * @param signal AbortSignal to cancel previous requests.
 * @returns Promise containing the AxiosResponse with SearchProductResponse.
 */
export async function apiSearchSuggestions(q: string, limit = 5, signal?: AbortSignal) {
  return ApiService.fetchData<SearchProductResponse>({
    url: "/v1/api/search/suggest",
    method: "get",
    params: { q, limit },
    signal,
  });
}

import ApiService from "@/services/ApiService";
import { ISpuModel } from "@/models/spu";

export async function apiPostSpuDetail(data: ISpuModel) {
  return ApiService.fetchData({
    url: `/spu/detail`,
    method: "POST",
    data,
  });
}

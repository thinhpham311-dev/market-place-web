import { ISpuModel } from "@/models/spu";

export interface IRecentProductListRequest {
  limit?: number;
  signal?: AbortSignal;
}

export interface IRecentProductListResponse {
  metadata?: {
    list?: ISpuModel[];
    data?: ISpuModel[];
    total?: number;
  };
  data?: ISpuModel[];
  list?: ISpuModel[];
}

import { ISpuModel } from "@/models/spu";
import { IFilter } from "@/types/common";
import type { Sort } from "@/features/common/sort-by/types";

export type IProductListRequest = IFilter & {
  ids?: string;
  shopId?: string;
  shop_id?: string;
  sort?: string;
  sortBy?: Sort | string;
  filter?: Record<string, any>;
  page?: number;
  limit?: number;
  pageSize?: number;
  offset?: number;
};

export interface IProductListResponse {
  metadata: {
    list: ISpuModel[];
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface IProductState {
  loading: boolean;
  error: string | null;
  list: ISpuModel[];
  total: number;
  page: number;
  limit: number;
  status: "idle" | "loading" | "success" | "error";
}

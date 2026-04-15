import { IBrandModel } from "@/models/brand";
import { IFilter } from "@/types/common";

export type IBrandListByCategoriesIdRequest = IFilter;

export interface IBrandListByCategoriesIdResponse {
  metadata: {
    list: IBrandModel[];
    total: number;
  };
}

export interface IBrandState {
  loading: boolean;
  error: string | null;
  list: IBrandModel[];
  total: number;
  status: "idle" | "loading" | "success" | "error";
}

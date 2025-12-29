import { SortBy } from "@/types/common/sort";

export interface IFilter<TFilter = unknown> {
  ids?: string | string[];
  page?: number;
  limit?: number;
  sortBy?: SortBy | null;
  search?: string;
  filter?: TFilter;
}

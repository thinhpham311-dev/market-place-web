// store/dynamicInitRegistry.ts
import { initPagination } from "@/features/common/pagination/store/stateSlice";

export interface DynamicInitItem {
  selector: (state: any) => Record<string, unknown>;
  initAction: (payload: { key: string }) => any;
}

export const dynamicInitRegistry: Record<string, DynamicInitItem> = {
  pagination: {
    selector: (state: any) => state.pagination,
    initAction: initPagination,
  },
};

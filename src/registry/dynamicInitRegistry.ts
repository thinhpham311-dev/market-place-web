// store/dynamicInitRegistry.ts
import { initPagination } from "@/features/common/pagination/store/stateSlice";
import { initPrice } from "@/features/common/price-display/store/stateSlice";
import { initQuantity } from "@/features/common/quantity-selector/store/stateSlice";
export interface DynamicInitItem {
  selector: (state: any) => Record<string, unknown>;
  initAction: (payload: { key: string }) => any;
}

export const dynamicInitRegistry: Record<string, DynamicInitItem> = {
  pagination: {
    selector: (state: any) => state["pagination/state"],
    initAction: initPagination,
  },
  price: {
    selector: (state: any) => state["price/state"],
    initAction: initPrice,
  },
  quantity: {
    selector: (state: any) => state["quantity/state"],
    initAction: initQuantity,
  },
};

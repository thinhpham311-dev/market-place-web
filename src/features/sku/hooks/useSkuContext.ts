import { useStoreWithEqualityFn } from "zustand/traditional";
import { useSkuStore, ISkuState } from "../store/skuZustandStore";
import { shallowEqual } from "@/utils/shallowEqual";

export function useSkuContext<T = ISkuState>(selector?: (state: ISkuState) => T): T {
  return useStoreWithEqualityFn(
    useSkuStore,
    selector || ((state) => state as unknown as T),
    selector ? (shallowEqual as any) : undefined,
  );
}

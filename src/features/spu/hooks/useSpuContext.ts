import { useStoreWithEqualityFn } from "zustand/traditional";
import { useSpuStore, ISpuState } from "../store/spuZustandStore";
import { shallowEqual } from "@/utils/shallowEqual";

export function useSpuContext<T = ISpuState>(selector?: (state: ISpuState) => T): T {
  return useStoreWithEqualityFn(
    useSpuStore,
    selector || ((state) => state as unknown as T),
    selector ? (shallowEqual as any) : undefined,
  );
}

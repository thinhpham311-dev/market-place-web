import { useStoreWithEqualityFn } from "zustand/traditional";
import { useSkuStore, ISkuState } from "../store/skuZustandStore";

const shallowEqual = (objA: any, objB: any) => {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
};

export function useSkuContext<T = ISkuState>(
  selector?: (state: ISkuState) => T
): T {
  return useStoreWithEqualityFn(
    useSkuStore,
    selector || ((state) => state as unknown as T),
    selector ? (shallowEqual as any) : undefined
  );
}



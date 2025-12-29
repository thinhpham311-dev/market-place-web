import { IQuantityInitialState, IState } from "@/features/common/quantity-selector/interfaces";
import { createDefault } from "@/features/common/quantity-selector/store/initials";
export const ensureStoreKeyState = (state: IState, storeKey: string): IQuantityInitialState => {
  if (!state[storeKey]) {
    state[storeKey] = createDefault();
  }
  return state[storeKey];
};

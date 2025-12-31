import { IPriceDisplayInitialState, IState } from "@/features/common/price-display/interfaces";
import { createDefault } from "@/features/common/price-display/store/initials";
export const ensureStoreKeyState = (state: IState, storeKey: string): IPriceDisplayInitialState => {
  if (!state[storeKey]) {
    state[storeKey] = createDefault();
  }
  return state[storeKey];
};

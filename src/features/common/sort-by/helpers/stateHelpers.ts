import { ISortInitialState, IState } from "@/features/common/sort-by/interfaces";
import { createDefault } from "@/features/common/sort-by/store/initials";
export const ensureStoreKeyState = (state: IState, storeKey: string): ISortInitialState => {
  if (!state[storeKey]) {
    state[storeKey] = createDefault();
  }
  return state[storeKey];
};

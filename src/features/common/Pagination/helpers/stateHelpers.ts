import { IPaginationInitialState, IState } from "@/features/common/pagination/interfaces";
import { createDefault } from "@/features/common/pagination/store/initials";
export const ensureStoreKeyState = (state: IState, storeKey: string): IPaginationInitialState => {
  if (!state[storeKey]) {
    state[storeKey] = createDefault();
  }
  return state[storeKey];
};

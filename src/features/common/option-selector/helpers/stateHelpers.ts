import { IOptionInitialState, IState } from "@/features/common/option-selector/interfaces";
import { createDefault } from "@/features/common/option-selector/store/initials"
export const ensureStoreKeyState = (
    state: IState,
    storeKey: string
): IOptionInitialState => {
    if (!state[storeKey]) {
        state[storeKey] = createDefault();
    }
    return state[storeKey];
};

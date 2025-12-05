import { Option } from "@/features/common/option-selector/types";

export interface IOption {
    options: (Option | null)[];
    selectedOptions: (Option | number | null)[];
    validationErrors: string[];
    optionsCount?: number;
}

export interface IState {
    [storeKey: string]: IOption;
}

// default value for a single store
export const createDefault = (): IOption => ({
    options: [],
    selectedOptions: [],
    validationErrors: [],
    optionsCount: 0
});

// initial root state
export const initialState: IState = {};

import { IOptionInitialState, IState } from '@/features/common/option-selector/interfaces';

// default value for a single store
export const createDefault = (): IOptionInitialState => ({
    selectedOptions: [],
    validationErrors: [],
    optionsCount: 0
});

// initial root state
export const initialState: IState = {};

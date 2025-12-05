// quantity.initial.ts

export interface IQuantity {
    currentQuantity: number;
}

export interface IState {
    [storeKey: string]: IQuantity;
}

// default value for a single store
export const createDefault = (): IQuantity => ({
    currentQuantity: 1,
});

// initial root state
export const initialState: IState = {};

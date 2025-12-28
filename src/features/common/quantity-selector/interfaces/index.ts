// quantity.initial.ts
export interface IQuantityInitialValue {
    currentQuantity: number;
    maxQuantity: number;
}

export interface IQuantityInitialState {
    currentQuantity: number;
}

export interface IState {
    [storeKey: string]: IQuantityInitialState;
}

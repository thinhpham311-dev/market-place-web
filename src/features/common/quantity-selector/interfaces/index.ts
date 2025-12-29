// quantity.initial.ts
export interface IQuantityInitialValue {
  defaultCurrentQuantity: number;
  maxQuantity: number;
}

export interface IQuantityInitialState {
  currentQuantity: number;
}

export interface IState {
  [storeKey: string]: IQuantityInitialState;
}

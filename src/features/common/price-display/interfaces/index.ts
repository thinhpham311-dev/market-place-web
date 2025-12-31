export interface IPriceDisplayInitialState {
  currentPrice?: number;
  flashSalePrice?: number;
  defaultPrice?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface IPriceDisplayInitialValue {
  currentPrice?: number;
  flashSalePrice?: number;
  defaultPrice?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface IState {
  [storeKey: string]: IPriceDisplayInitialState;
}

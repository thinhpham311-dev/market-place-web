export interface IPriceDisplayInitialValue {
  defaultCurrentPrice?: number;
  defaultFlashSalePrice?: number;
  defaultPrice?: number;
  defaultMinPrice?: number;
  defaultMaxPrice?: number;
}

export interface IPriceDisplayInitialState {
  currentPrice?: number;
  flashSalePrice?: number;
  defaultPrice?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface IState {
  [storeKey: string]: IPriceDisplayInitialState;
}

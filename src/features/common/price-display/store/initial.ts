export interface IPriceDisplay {
  currentPrice: number;
  flashSalePrice: number;
  defaultPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface IState {
  [storeKey: string]: IPriceDisplay;
}

// default value for a single store
export const createDefault = (): IPriceDisplay => ({
  currentPrice: 0,
  flashSalePrice: 0,
  defaultPrice: 0,
  minPrice: 0,
  maxPrice: 0,
});

// initial root state
export const initialState: IState = {};

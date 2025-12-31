import { IPriceDisplayInitialState, IState } from "@/features/common/price-display/interfaces";

// default value for a single store
export const createDefault = (): IPriceDisplayInitialState => ({
  currentPrice: 0,
  flashSalePrice: 0,
  defaultPrice: 0,
  minPrice: 0,
  maxPrice: 0,
});

// initial root state
export const initialState: IState = {};

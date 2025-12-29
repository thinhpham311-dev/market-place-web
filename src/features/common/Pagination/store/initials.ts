export interface IPaginationState {
  limit: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export const createDefault = (): IPaginationState => ({
  limit: 0,
  currentPage: 1,
  totalPages: 1,
  totalItems: 1,
});

export interface IState {
  [storeKey: string]: IPaginationState;
}

export const initialState: IState = {};

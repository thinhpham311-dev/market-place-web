export interface IPaginationInitialState {
  limit: number;
  currentPage: number;
  totalPages: number;
}
export interface IState {
  [storeKey: string]: IPaginationInitialState;
}

export interface IPaginationInitialValue {
  defaultLimit: number;
  defaultTotalItems: number;
  defaultCurrentPage: number;
  isShowDot?: boolean;
  isShowNav?: boolean;
  isShowLabel?: boolean;
}

export interface IPaginationInitialState {
  limit: number;
  pages?: (number | string)[];
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}
export interface IState {
  [storeKey: string]: IPaginationInitialState;
}

export interface IPaginationInitialValue {
  defaultTotalItems: number;
  defaultLimit?: number;
  defaultCurrentPage?: number;
  isShowDot?: boolean;
  isShowNav?: boolean;
  isShowLabel?: boolean;
}

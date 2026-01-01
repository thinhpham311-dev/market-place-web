import { IPaginationInitialState, IState } from "@/features/common/pagination/interfaces";

export const createDefault = (): IPaginationInitialState => ({
  limit: 10,
  currentPage: 1,
  pages: [],
  totalPages: 1,
  totalItems: 0,
});

export const initialState: IState = {};

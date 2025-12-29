import { IPaginationInitialState, IState } from "@/features/common/pagination/interfaces";

export const createDefault = (): IPaginationInitialState => ({
  limit: 0,
  currentPage: 1,
  totalPages: 1,
});

export const initialState: IState = {};

import { Filter } from "@/features/common/filter/types";

// ✅ Định nghĩa lại state slice
export interface IFilterState {
  data: Filter[]; // danh sách options tĩnh (VD: [{ key: "category", type:"checkbox", items:[...] }])
  filter: Record<string, any>; // state user đã chọn (key: giá trị user chọn)
}

// default value for a single store
export const createDefault = (): IFilterState => ({
  data: [],
  filter: {},
});

export interface IState {
  [storeKey: string]: IFilterState;
}

export const initialState: IState = {};

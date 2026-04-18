import { ISpuState } from "@/features/spu/interfaces";

export const initialState: ISpuState = {
  loading: false,
  spu: null,
  error: null,
  status: "idle",
};

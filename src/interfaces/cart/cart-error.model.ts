import { MaybeError } from "@/types/cart";
import { ActionState, ItemState } from "./cart-loading.model";

export interface ErrorState {
  global: MaybeError;
  byItem: ItemState<MaybeError>;
  actions: ActionState<MaybeError>;
}

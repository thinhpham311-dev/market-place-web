import { ICartModel } from "@/models/cart";
import { NormalizedApiError } from "@/lib/http/handleAxiosError";

/* ---------- Keys ---------- */
export type ItemKey =
    | "updateQty"
    | "updateVariant"
    | "deleteItem";

export type ActionKey =
    | "showList"
    | "createItem"
    | "deleteItemsSelected"
    | "deleteItemsAll";

/* ---------- Generic helpers ---------- */
export type ActionState<T> = Record<ActionKey, T>;
export type ItemState<T> = Record<
    string,
    Partial<Record<ItemKey, T>>
>;

/* ---------- Loading ---------- */
export interface ILoadingState {
    global: boolean;
    byItem: ItemState<boolean>;
    actions: ActionState<boolean>;
}

/* ---------- Error ---------- */
export interface IErrorState {
    global: NormalizedApiError | null | undefined;
    byItem: ItemState<NormalizedApiError | null | undefined>;
    actions: ActionState<NormalizedApiError | null | undefined>;
}

/* ---------- Cart ---------- */
export interface IShoppingCart {
    loading: ILoadingState;
    data: ICartModel;
    error: IErrorState;
}

/* ---------- Root ---------- */
/**
 * storeKey có thể là userId | sessionId | cartId
 */
export interface IState {
    [storeKey: string]: IShoppingCart;
}

import { IProductState } from "@/features/product/list/recommended/interfaces"

export const initialState: IProductState = {
    loading: false,
    list: [],
    total: 0,
    error: null
}
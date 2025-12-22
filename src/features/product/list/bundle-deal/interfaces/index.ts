import { ISpuModel } from "@/models/spu";
import { IFilter } from "@/types/common";

export type IProductListRequest = IFilter;

export interface IProductListResponse {
    metadata:
    {
        list: ISpuModel[],
        total: number;
    };
};


export interface IProductState {
    loading: boolean;
    error: string | null;
    list: ISpuModel[];
    total: number;
}
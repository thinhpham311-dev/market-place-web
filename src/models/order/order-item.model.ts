import { ISpuModel } from "@/models/spu";

export interface IOrderItemModel extends ISpuModel {
  slug: string;
  qty: number;
  countInStock: number;
}

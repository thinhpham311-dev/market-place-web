import { IVariationModel } from "@/models/spu";

export interface ICartItemModel {
  itemId?: string;
  itemSkuId: string;
  itemSkuPrice: number;
  itemSkuStock: number;
  itemSkuTierIdx: number[];
  itemSpuName: string;
  itemSpuImage: string;
  itemSpuVariations: IVariationModel[];
  itemSpuSlug: string;
  itemSpuId: string;
  itemShopId: string;
  itemShopName: string;
  itemShopSlug: string;
  itemUserId?: string;
  itemQuantity: number;
  itemTotalPrice?: number;
}

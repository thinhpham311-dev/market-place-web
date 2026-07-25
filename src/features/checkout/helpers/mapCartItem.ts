import { ISkuModel } from "@/models/sku";
import { ISpuModel } from "@/models/spu";
import { IShopModel } from "@/models/shop";

export interface IMapCartItem {
  sku: ISkuModel;
  spu: ISpuModel;
  itemQuantity: number;
}

// --- Mapping helpers ---
const mapShop = (shop: IShopModel) => ({
  itemShopId: shop?.shop_id ?? "",
  itemShopName: shop?.shop_name ?? "",
  itemShopSlug: shop?.shop_slug ?? "",
});

const mapSku = (sku: ISkuModel) => ({
  itemSkuId: sku?.sku_id ?? "",
  itemSkuPrice: sku?.sku_price ?? 0,
  itemSkuStock: sku?.sku_stock ?? 0,
  itemSkuTierIdx: sku?.sku_tier_idx ?? [],
});

const mapSpu = (spu: ISpuModel) => ({
  itemSpuId: spu?.product_id ?? "",
  itemSpuName: spu?.product_name ?? "",
  itemSpuImage:
    spu?.product_image ??
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
  itemSpuSlug: spu?.product_slug ?? "",
  itemSpuVariations: spu?.product_variations ?? [],
});

// --- Main mapper ---
export default function mapCartItem({ sku, spu, ...rest }: IMapCartItem) {
  const skuMapped = mapSku(sku);
  const spuMapped = mapSpu(spu);
  const shopMapped = mapShop(spu?.product_shop);

  return {
    ...skuMapped,
    ...spuMapped,
    ...shopMapped,
    ...rest,
  };
}

export type MappedCartItem = ReturnType<typeof mapCartItem>;

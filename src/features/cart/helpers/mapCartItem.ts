import { ISkuPro } from "@/interfaces/sku";
import { ISpuPro } from "@/interfaces/spu";
import { IShop } from "@/interfaces/shop";

export interface IMapCartItem {
    sku: ISkuPro;
    spu: ISpuPro;
    currentQuantity: number;
}

const mapCartItem = ({ sku, spu, currentQuantity }: IMapCartItem) => {
    const mapShop = (shop: IShop) => ({
        itemShopId: shop.shop_id,
        itemShopName: shop.shop_name,
        itemShopSlug: shop.shop_slug,
    });

    const mapSku = (sku: ISkuPro) => ({
        itemSkuId: sku.sku_id,
        itemSkuPrice: sku.sku_price,
        itemSkuStock: sku.sku_stock,
        itemSkuTierIdx: sku.sku_tier_idx,
    });

    const mapSpu = (spu: ISpuPro) => ({
        itemSpuId: spu.product_id,
        itemSpuName: spu.product_name,
        itemSpuImage: spu.product_image,
        itemSpuSlug: spu.product_slug,
        itemSpuVariations: spu.product_variations,
    });

    return {
        ...mapSku(sku),
        ...mapSpu(spu),
        ...mapShop(spu.product_shop),
        itemQuantity: currentQuantity,
    };
}

export {
    mapCartItem
}
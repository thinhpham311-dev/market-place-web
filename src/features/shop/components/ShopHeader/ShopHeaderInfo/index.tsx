import React from "react";
import { ItemContent, ItemTitle } from "@/components/ui";
import { useShopInfoContext } from "@/features/shop/hooks";
import { formatPhone } from "@/lib/formats";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";

const ShopHeaderInfo = () => {
    const { shopInfo, loading, error } = useShopInfoContext();
    const { shop_name, shop_address, shop_phone } = shopInfo || {};

    if (loading) {
        return (
            <LoadingSkeleton />
        );
    }

    if (error) {
        return (
            <NotFound />
        );
    }

    return (
        <ItemContent className="flex justify-center">
            <ItemTitle className="text-base md:text-lg font-bold">
                {shop_name?.trim() || "Shop Name"}
            </ItemTitle>

            {shop_phone && (
                <span className="text-sm text-muted-foreground">
                    📞 {formatPhone({ phone: shop_phone })}
                </span>
            )}

            {shop_address && (
                <span className="text-sm text-muted-foreground line-clamp-2">
                    📍 {shop_address}
                </span>
            )}
        </ItemContent>
    );
};

export default ShopHeaderInfo;

import React from "react";
import {
    CardHeader,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui";
import { formatPhone } from "@/lib/formats";
import { useShopInfoContext } from "@/features/shop/hooks";

const ShopHeader = () => {
    const { shopInfo } = useShopInfoContext();
    const { shop_name, shop_address, shop_phone } = shopInfo || {};


    return (
        <CardHeader className="p-3 w-full md:w-auto flex justify-center md:justify-start">
            <Item size="sm" className="p-0 flex items-center gap-3">
                <ItemMedia>
                    <Avatar className="w-16 h-16 md:w-20 md:h-20">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt={shop_name || "Shop Avatar"}
                            width={80}
                            height={80}
                        />
                        <AvatarFallback>{shop_name?.[0] || "S"}</AvatarFallback>
                    </Avatar>
                </ItemMedia>

                <ItemContent className="flex flex-col justify-center">
                    <ItemTitle className="text-base md:text-lg font-bold">
                        {shop_name?.trim() || "Shop Name"}
                    </ItemTitle>

                    {shop_phone && (
                        <ItemDescription className="text-sm text-muted-foreground">
                            📞 {formatPhone({ phone: shop_phone })}
                        </ItemDescription>
                    )}
                    {shop_address && (
                        <ItemDescription className="text-sm text-muted-foreground line-clamp-2">
                            📍 {shop_address}
                        </ItemDescription>
                    )}
                </ItemContent>
            </Item>
        </CardHeader>
    );
};

export default ShopHeader;

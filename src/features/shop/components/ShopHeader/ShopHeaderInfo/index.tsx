import React from "react";
import { ItemContent, ItemTitle } from "@/components/ui/item";
import { useShopInfoContext } from "@/features/shop/hooks";
import { formatPhone } from "@/utils/formats";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { useTranslation } from "@/lib/hooks/use-translation";

const ShopHeaderInfo = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useShopInfoContext();
  const { shop_name, shop_address, shop_phone } = data || {};

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <ItemContent className="flex justify-center">
      <ItemTitle className="text-base md:text-lg font-bold">
        {shop_name?.trim() || t("shop_name_fallback")}
      </ItemTitle>

      {shop_phone && (
        <span className="text-sm text-muted-foreground">
          📞 {formatPhone({ phone: shop_phone })}
        </span>
      )}

      {shop_address && (
        <span className="text-sm text-muted-foreground line-clamp-2">📍 {shop_address}</span>
      )}
    </ItemContent>
  );
};

export default ShopHeaderInfo;

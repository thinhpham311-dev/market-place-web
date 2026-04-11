import React from "react";
import { ItemContent, Item, ItemTitle, ItemDescription } from "@/components/ui/item";
import { useTranslation } from "@/lib/hooks/use-translation";
import { useShopInfoContext } from "@/features/shop/hooks";
import LoadingSkeleton from "./Loading";
import NotFound from "./NotFound";

function getProductCount(data?: {
  shop_total_product?: number | string;
  total_product?: number | string;
  total_products?: number | string;
  product_count?: number | string;
  products_count?: number | string;
}) {
  const count =
    data?.shop_total_product ??
    data?.total_product ??
    data?.total_products ??
    data?.product_count ??
    data?.products_count;

  if (count === undefined || count === null || count === "") {
    return null;
  }

  const parsedCount = Number(count);
  return Number.isFinite(parsedCount) ? parsedCount : null;
}

const ShopStats = () => {
  const { t, language } = useTranslation();
  const { data, loading, error } = useShopInfoContext();
  const productCount = getProductCount(data);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <NotFound />;
  }

  const stats = [
    { label: t("shop_rating"), value: "5.0 ★" },
    {
      label: t("shop_products"),
      value: productCount?.toLocaleString(language) ?? "0",
    },
    { label: t("shop_followers"), value: "3.2k" },
    { label: t("shop_joined"), value: "2022" },
    { label: t("shop_response_rate"), value: "98%" },
    { label: t("shop_response_time"), value: "1h" },
  ];

  return (
    <ItemContent>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
        {stats.map((item) => (
          <Item key={item.label} size="sm" className="p-0">
            <ItemContent className="flex flex-row justify-between text-sm md:text-base">
              <ItemTitle className="font-semibold">{item.label}: </ItemTitle>
              <ItemDescription>{item.value}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </ItemContent>
  );
};

export default ShopStats;

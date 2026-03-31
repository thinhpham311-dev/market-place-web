"use client";
import { CardTitle } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import { formatToCurrency } from "@/utils/formats/formatToCurrency";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { useTranslation } from "@/lib/hooks";

const MiniCartTotal = () => {
  const { t } = useTranslation();
  const { data, loading } = useShoppingCartContext();
  const { cart_total_price = 0 } = data;

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  return (
    <CardTitle className="text-md font-bold">
      <span>{t("cart_total")}:</span> {formatToCurrency(cart_total_price)}
    </CardTitle>
  );
};

export default MiniCartTotal;

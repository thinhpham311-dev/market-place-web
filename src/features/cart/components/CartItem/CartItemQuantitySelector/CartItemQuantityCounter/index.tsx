import { ICartItemModel } from "@/models/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { QuantitySelector } from "@/features/common";
import { SHOPPING_CART } from "@/features/cart/constants";
import ErrorMsg from "./ErrorMsg";
import LoadingSkeleton from "./LoadingSkeleton";

import { toast } from "sonner";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ICartItemQuantityCounterProps {
  data: ICartItemModel;
}

const CartItemQuantityCounter = ({ data }: ICartItemQuantityCounterProps) => {
  const { t } = useTranslation();
  const { loading, error, updateQtyItem } = useShoppingCartContext();

  const { itemSkuId, itemSpuName, itemQuantity, itemSkuStock } = data;

  const handleQuantityChange = (value: number) => {
    console.log(value);
    updateQtyItem({
      ...data,
      itemQuantity: value,
    });

    setTimeout(() => {
      const id = toast.success(t("cart_quantity_updated_title"), {
        description: (
          <span className="text-white">
            {t("cart_quantity_updated_desc")
              .replace("{product}", itemSpuName)
              .replace("{quantity}", String(value))}
          </span>
        ),
        action: {
          label: t("toast_close"),
          onClick: () => {
            toast.dismiss(id);
          },
        },
      });
    }, 500);
  };

  if (error?.byItem[itemSkuId]?.updateQty) {
    return <ErrorMsg message={error?.byItem[itemSkuId]?.updateQty?.message} />;
  }

  if (loading.byItem[itemSkuId]?.updateQty) {
    return <LoadingSkeleton />;
  }

  return (
    <QuantitySelector
      storeKey={`${SHOPPING_CART}_${itemSkuId}`}
      initialValue={{
        defaultCurrentQuantity: itemQuantity,
        maxQuantity: itemSkuStock,
      }}
      onChangeQuantity={handleQuantityChange}
    />
  );
};

export default CartItemQuantityCounter;

import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ErrorMsg from "./ErrorMsg";
import LoadingSkeleton from "./LoadingSkeleton";

import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { toast } from "sonner";
import { ICartItemModel } from "@/models/cart";
import { renderVariantsText } from "@/features/cart/utils/renderVariants";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ICartItemRemoveProps {
  data: ICartItemModel;
}

const CartItemRemove = ({ data }: ICartItemRemoveProps) => {
  const { t } = useTranslation();
  const { itemSpuName, itemSpuVariations, itemSkuTierIdx, itemQuantity, itemSkuId } = data;
  const { deleteItem, loading, error } = useShoppingCartContext();
  const onHandleRemove = () => {
    deleteItem(data!);
    setTimeout(() => {
      const variantsText = renderVariantsText(itemSpuVariations, itemSkuTierIdx);
      const id = toast.success(t("cart_item_removed_title"), {
        description: (
          <span className="text-white">
            {t("cart_item_removed_desc")
              .replace("{product}", itemSpuName)
              .replace("{variants}", variantsText || "-")
              .replace("{quantity}", String(itemQuantity))}
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

  if (error?.byItem[itemSkuId]?.deleteItem) {
    return <ErrorMsg message={error?.byItem[itemSkuId]?.deleteItem.message} />;
  }

  if (loading.byItem[itemSkuId]?.deleteItem) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex items-center justify-end">
      <Tooltip>
        <TooltipTrigger asChild className="p-3">
          <Button onClick={onHandleRemove} variant="link" size="icon">
            <MdClose color="red" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{t("cart_remove_tooltip")}</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CartItemRemove;

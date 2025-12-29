import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import ErrorMsg from "./ErrorMsg";
import LoadingSkeleton from "./LoadingSkeleton";

import { MdClose } from "react-icons/md";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { toast } from "sonner";
import { ICartItemModel } from "@/models/cart";
import { renderVariants } from "@/features/cart/utils/renderVariants";

interface ICartItemRemoveProps {
  data: ICartItemModel;
}

const CartItemRemove = ({ data }: ICartItemRemoveProps) => {
  const { itemSpuName, itemSpuVariations, itemSkuTierIdx, itemQuantity, itemSkuId } = data;
  const { deleteItem, loading, error } = useShoppingCartContext();
  const onHandleRemove = () => {
    deleteItem(data!);
    setTimeout(() => {
      const id = toast.success("Deleted Product Out Cart!", {
        description: (
          <span className="text-white">
            The product {itemSpuName} - {renderVariants(itemSpuVariations, itemSkuTierIdx)} x{" "}
            {itemQuantity} has been removed from your cart.
          </span>
        ),
        action: {
          label: "Close",
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
        <TooltipContent>remove product in shopping cart</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CartItemRemove;

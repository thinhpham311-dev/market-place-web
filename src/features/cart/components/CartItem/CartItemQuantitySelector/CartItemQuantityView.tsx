import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "@/lib/hooks";

interface ICartItemQuantityViewProps {
  currentQuantity: number;
}

const CartItemQuantityView = ({ currentQuantity }: ICartItemQuantityViewProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <div className="line-clamp-1">
        <TooltipTrigger asChild>
          <p className="text-sm font-medium text-center">
            <strong>{t("checkout_qty")}:</strong> {currentQuantity}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <strong>{t("checkout_qty")}:</strong> {currentQuantity}
          </p>
        </TooltipContent>
      </div>
    </Tooltip>
  );
};

export default CartItemQuantityView;

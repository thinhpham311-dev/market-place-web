"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { IVariationModel } from "@/models/spu";
import { renderVariants } from "@/features/cart/utils/renderVariants";

interface CartItemVariantsViewProps {
  itemTierIdx: number[];
  itemVariants: IVariationModel[];
}

const CartItemVariantsView = ({
  itemTierIdx = [],
  itemVariants = [],
}: CartItemVariantsViewProps) => {
  const variantsNode = renderVariants(itemVariants, itemTierIdx);

  return (
    <Badge variant="outline" className="items-center space-x-2">
      <Tooltip>
        <TooltipTrigger className="bg-transparent  line-clamp-1">{variantsNode}</TooltipTrigger>
        <TooltipContent>{variantsNode}</TooltipContent>
      </Tooltip>
    </Badge>
  );
};

export default CartItemVariantsView;

"use client";

import {
    Badge,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui";
import { VariantOption } from "@/interfaces/spu";
import { renderVariants } from "@/features/cart/utils/renderVariants"

interface CartItemVariantsSelectorProps {
    itemTierIdx: number[];
    itemVariants: VariantOption[];
}

const CartItemVariantsSelector = ({
    itemTierIdx = [],
    itemVariants = [],
}: CartItemVariantsSelectorProps) => {

    const variantsNode = renderVariants(itemVariants, itemTierIdx)

    return (

        <Badge variant="outline" className="items-center space-x-2">
            <Tooltip>
                <TooltipTrigger className="bg-transparent  line-clamp-1">
                    {variantsNode}
                </TooltipTrigger>
                <TooltipContent>
                    {variantsNode}
                </TooltipContent>
            </Tooltip>
        </Badge>

    );
};

export default CartItemVariantsSelector;

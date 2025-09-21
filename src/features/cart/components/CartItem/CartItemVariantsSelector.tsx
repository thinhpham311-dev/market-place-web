"use client";

import {
    Card, CardContent, CardDescription, Badge,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui";
import { VariantOption } from "@/interfaces/spu";
import { renderVariants } from "@/features/cart/utils/renderVariants"

interface CartItemVariantsSelectorProps {
    itemTierIdx?: number[];
    itemVariants?: VariantOption[];
}

const CartItemVariantsSelector = ({
    itemTierIdx = [],
    itemVariants = [],
}: CartItemVariantsSelectorProps) => {

    const variantsNode = renderVariants(itemVariants, itemTierIdx)

    return (
        <Card className="border-none shadow-none w-full">
            <CardContent className="p-0">
                <Tooltip>
                    <CardDescription>
                        <TooltipTrigger>
                            <Badge variant="outline" className="items-center space-x-2 line-clamp-1 w-full">
                                {variantsNode}
                            </Badge>
                        </TooltipTrigger>
                    </CardDescription>
                    <TooltipContent>
                        {variantsNode}
                    </TooltipContent>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default CartItemVariantsSelector;

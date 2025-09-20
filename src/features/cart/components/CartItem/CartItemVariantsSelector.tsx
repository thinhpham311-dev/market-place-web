"use client";

import { Card, CardContent, CardDescription, Badge } from "@/components/ui";
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
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <CardDescription>
                    <Badge variant="outline" className="items-center space-x-2">
                        {variantsNode}
                    </Badge>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default CartItemVariantsSelector;

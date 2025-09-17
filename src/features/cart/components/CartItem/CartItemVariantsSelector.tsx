"use client";

import { Card, CardContent, CardDescription, Badge, CardTitle } from "@/components/ui";
import { FaCaretDown } from "react-icons/fa";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { VariantOption } from "@/interfaces/spu";
import { ICartItem } from "@/interfaces/cart";
import { formatToCurrency } from "@/lib/formats";

interface CartItemVariantsSelectorProps {
    itemTierIdx?: number[];
    itemVariants?: VariantOption[];
    item: ICartItem;
}

const CartItemVariantsSelector = ({
    itemTierIdx = [],
    itemVariants = [],
    item,
}: CartItemVariantsSelectorProps) => {
    const { product_name, sku_price } = item;

    const renderVariants = () =>
        itemVariants.map((variant, index) => {
            const option = itemTierIdx[index] !== undefined
                ? variant.value?.[itemTierIdx[index]]
                : null;

            return (
                <span className="cursor-pointer" key={index}>
                    {option?.label ?? "N/A"}
                    {index < itemVariants.length - 1 && ", "}
                </span>
            );
        });

    return (
        <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <CartDrawer>
                    <CartDrawer.Trigger>
                        <CardDescription>
                            <Badge variant="outline" className="items-center space-x-2">
                                {renderVariants()}
                                <FaCaretDown />
                            </Badge>
                        </CardDescription>
                    </CartDrawer.Trigger>
                    <CartDrawer.Content side="bottom">
                        <CartDrawer.Header
                            title={product_name}
                            description={formatToCurrency(sku_price)}
                        />
                        <CartDrawer.Body>
                            <CardTitle>
                                <Badge variant="outline" className="items-center space-x-2">
                                    {renderVariants()}
                                </Badge>
                            </CardTitle>
                            <CardDescription className="p-3">
                                abc
                            </CardDescription>
                        </CartDrawer.Body>
                    </CartDrawer.Content>
                </CartDrawer>
            </CardContent>
        </Card>
    );
};

export default CartItemVariantsSelector;

"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import { ShoppingCart } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

type MiniCartTriggerProps = React.ComponentPropsWithoutRef<"button">;

const MiniCartTrigger = React.forwardRef<HTMLButtonElement, MiniCartTriggerProps>(
    ({ ...props }, ref) => {
        const { data } = useShoppingCartContext();

        const { cart_count_product = 0 } = data;

        return (
            <Button
                variant="outline"
                size="icon"
                className="relative"
                ref={ref}
                {...props}
            >
                <ShoppingCart />
                {cart_count_product > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center text-white px-1">
                        {cart_count_product}
                    </span>
                )}
            </Button>
        );
    }
);

MiniCartTrigger.displayName = "MiniCartTrigger";
export default MiniCartTrigger;

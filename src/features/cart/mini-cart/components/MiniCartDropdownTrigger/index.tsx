

import * as React from "react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { ShoppingCart } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

type MiniCartDropdownTriggerProps = React.ComponentPropsWithoutRef<"button">;

const MiniCartDropdownTrigger = React.forwardRef<HTMLButtonElement, MiniCartDropdownTriggerProps>(
    ({ ...props }, ref) => {
        const { data, loading, error } = useShoppingCartContext();
        const { cart_product_count = 0 } = data;

        if (loading) {
            return (
                <DropdownMenuTrigger asChild>
                    <div>
                        <LoadingSkeleton />
                    </div>
                </DropdownMenuTrigger>
            );
        }

        if (error) {
            return (
                <DropdownMenuTrigger asChild>
                    <div>
                        <NotFound />
                    </div>
                </DropdownMenuTrigger>
            );
        }

        return (
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    ref={ref}
                    disabled={!!error}
                    {...props}
                >
                    <ShoppingCart />
                    {cart_product_count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center text-white px-1">
                            {cart_product_count}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
        );
    }
);

MiniCartDropdownTrigger.displayName = "MiniCartDropdownTrigger";
export default MiniCartDropdownTrigger;

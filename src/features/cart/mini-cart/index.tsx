"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui";
import ShoppingCartProvider from "@/features/cart/providers";
import { useHandleShoppingCart } from "@/features/cart/hooks";
import MiniCartTrigger from "./components/MiniCartTrigger";
import MiniCartHeader from "./components/MiniCartHeader";
import MiniCartContent from "./components/MiniCartContent";
// import { MINI_CART } from "@/features/cart/mini-cart/constants";

export default function MiniCart() {
    const cart = useHandleShoppingCart({ userId: "1001" });

    return (
        <ShoppingCartProvider contextValues={{ ...cart }}>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MiniCartTrigger />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[400px] p-3 space-y-3">
                    <DropdownMenuLabel>
                        <MiniCartHeader />
                    </DropdownMenuLabel>

                    <MiniCartContent />
                </DropdownMenuContent>
            </DropdownMenu>
        </ShoppingCartProvider>
    );
}

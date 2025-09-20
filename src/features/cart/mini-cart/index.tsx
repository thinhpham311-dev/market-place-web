"use client";

//router
import { useRouter } from "next/navigation";

//ui
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui"

import CartSummary from "@/features/cart/components/CartSummary";

//icons
import { ShoppingCart } from 'lucide-react'

import { useShoppingCartContext } from "@/features/cart/hooks";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { formatToCurrency } from "@/lib/formats";


export default function MiniCart() {
    const router = useRouter()
    const { cart } = useShoppingCartContext();

    const { itemsCount, totalAmount } = cart

    const handlRouterLinkToCart = () => {
        router.push("/cart")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart />
                    {itemsCount && itemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm flex justify-center items-center text-white">
                            {itemsCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" p-3">
                <DropdownMenuLabel className="flex justify-between items-center">
                    <span className="text-lg uppercase"> Cart</span>
                    <Button variant="link" size="sm" onClick={handlRouterLinkToCart}>
                        View More
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled >
                    <CartSummary />
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem disabled className="my-2">
                    <Button variant="default" className="w-full">CheckOut {formatToCurrency(totalAmount)}</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

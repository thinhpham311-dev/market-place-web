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

import CartListView from "@/features/cart/components/CartListView";

//icons
import { ShoppingCart } from 'lucide-react'

import { useShoppingCartContext } from "@/features/cart/hooks";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react"

export default function MiniCart() {
    const router = useRouter()
    const { cart } = useShoppingCartContext();

    const { itemsCount } = cart

    const handlRouterLinkToCart = () => {
        router.push("/cart")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart />
                    {itemsCount !== undefined && itemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center text-white px-1">
                            {itemsCount}
                        </span>
                    )}

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[400px] p-3 space-y-3">
                <DropdownMenuLabel className="flex justify-between items-center p-0 space-y-0">
                    <span className="text-lg uppercase"> Cart</span>
                    {itemsCount !== undefined && itemsCount > 0 && (<Button variant="link" size="sm" onClick={handlRouterLinkToCart}>
                        View More <ChevronRight />
                    </Button>)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled >
                    <CartListView />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

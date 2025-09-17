"use client";

//ui
import { Button } from "@/components/ui"

import CartSummary from "@/features/cart/components/CartSummary";
import { CartDrawer } from "@/features/cart/components/CartDrawer"

//icons
import { ShoppingCart } from 'lucide-react'

import { useShoppingCartContext } from "@/features/cart/hooks";
import { formatToCurrency } from "@/lib/formats";



export default function MiniCart() {
    const { cart } = useShoppingCartContext();
    const totalItems = cart?.items?.length || 0;

    return (
        <CartDrawer>
            <CartDrawer.Trigger>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm flex justify-center items-center text-white">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </CartDrawer.Trigger>
            <CartDrawer.Content side="right">
                <CartDrawer.Header
                    title="Cart"
                    description="Your shopping cart items and checkout options"
                />
                <CartDrawer.Body>
                    <CartSummary />
                </CartDrawer.Body>
                <CartDrawer.Footer>
                    <Button className="w-full" size="lg">
                        Checkout {formatToCurrency(cart.totalAmount)}
                    </Button>
                </CartDrawer.Footer>
            </CartDrawer.Content>
        </CartDrawer>
    );
}

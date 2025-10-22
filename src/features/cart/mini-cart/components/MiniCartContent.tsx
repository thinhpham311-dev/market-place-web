"use client";

import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import CartListView from "@/features/cart/components/CartListView";
import { useShoppingCartContext } from "../../hooks";

export default function MiniCartContent() {

    const { data, loading, error } = useShoppingCartContext()

    const { cart_products } = data

    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
                <CartListView
                    data={cart_products}
                    isLoading={loading}
                    error={error}
                    countLoadItems={10}
                />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
        </>
    );
}

"use client";
import CartListView from "@/features/cart/components/CartListView";
import { DropdownMenuItem, DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MiniCartContent() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_products } = data
    return (
        <DropdownMenuGroup>
            <DropdownMenuItem disabled>
                <CartListView
                    data={cart_products}
                    isLoading={loading}
                    error={error}
                    countLoadItems={4}
                />
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
}

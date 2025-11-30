"use client";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { CardContent } from "@/components/ui/card";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { initialColumns } from "@/features/cart/main-cart/constants"
import { SHOPPING_CART } from "@/features/cart/constants";

export default function MainCartContent() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_products = [] } = data
    return (
        <CardContent className="col-span-12">
            <CartDataTable
                data={cart_products}
                countLoadItems={5}
                isLoading={loading}
                error={error}
                storeKey={SHOPPING_CART}
                initialColumns={initialColumns}
            />
        </CardContent>
    );
}

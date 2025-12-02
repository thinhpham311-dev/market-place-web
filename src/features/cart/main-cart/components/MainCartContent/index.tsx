"use client";
import { useShoppingCartContext } from "@/features/cart/hooks";
import { CardContent } from "@/components/ui/card";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { initialColumns } from "@/features/cart/main-cart/constants"
import { MAIN_CART } from "@/features/cart/main-cart/constants";

export default function MainCartContent() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_products = [], cart_id = "" } = data
    return (
        <CardContent className="col-span-12">
            <CartDataTable
                cartKey={MAIN_CART}
                data={cart_products}
                countLoadItems={5}
                isLoading={loading}
                error={error}
                cartId={cart_id}
                initialColumns={initialColumns}
            />
        </CardContent>
    );
}

"use client";
import { CardContent } from "@/components/ui/card"
import { useShoppingCartContext } from "../../hooks";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { MAIN_CART, initialColumns } from "@/features/cart/main-cart/constants"


export default function MainCartContent() {

    const { data, loading, error } = useShoppingCartContext()

    const { cart_products } = data
    console.log("main cart", cart_products)
    return (
        <CardContent>
            <CartDataTable
                data={cart_products}
                countLoadItems={10}
                isLoading={loading}
                error={error}
                storeKey={MAIN_CART}
                initialColumns={initialColumns}
            />
        </CardContent>

    );
}

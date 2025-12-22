"use client";
import { useShoppingCartContext, } from "@/features/cart/hooks";
import { CardContent } from "@/components/ui/card";
import CartDataTable from "@/features/cart/components/CartDataTable"
import { initialColumns } from "@/features/cart/main-cart/constants"
import { MAIN_CART } from "@/features/cart/main-cart/constants";
import ErrorMsg from "./ErrorMsg"
import LoadingSkeleton from "./LoadingSkeleton";

export default function MainCartContent() {
    const { data, loading, error } = useShoppingCartContext()
    const { cart_items = [], cart_items_count, cart_id = "" } = data


    if (error?.actions.showList) {
        return <CardContent className="col-span-12">
            <ErrorMsg message={error?.actions.showList.message} />
        </CardContent>;
    }

    if (loading.actions.showList) {
        return <CardContent className="col-span-12">
            <LoadingSkeleton count={cart_items_count} />
        </CardContent>;
    }


    return (
        <CardContent className="col-span-12">
            <CartDataTable
                cartKey={MAIN_CART}
                data={cart_items}
                cartId={cart_id}
                initialColumns={initialColumns}
            />
        </CardContent>
    );
}

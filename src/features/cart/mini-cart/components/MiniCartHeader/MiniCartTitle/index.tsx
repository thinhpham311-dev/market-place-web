import { ShoppingBag } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorMsg from "./ErrorMsg";
import { useShoppingCartContext, useCartErrorHandler } from "@/features/cart/hooks";

export default function MiniCartTitle() {
    const { data, loading } = useShoppingCartContext();
    const { cart_product_count = 0 } = data;

    if (loading.actions.showList) {
        return <LoadingSkeleton />;
    }

    return (
        <CardTitle className="text-md space-x-1 uppercase">
            <ShoppingBag className="w-5 h-5 inline align-middle mr-1" />
            <span className="align-middle">Cart <span className="font-normal">({cart_product_count})</span></span>
        </CardTitle>
    );
}

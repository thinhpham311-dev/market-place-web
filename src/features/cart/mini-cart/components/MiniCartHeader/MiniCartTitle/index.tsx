import { ShoppingBag } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MiniCartTitle() {
    const { data, loading, error } = useShoppingCartContext();
    const { cart_product_count = 0 } = data;


    if (loading) {
        return (
            <CardTitle className="text-md space-x-2">
                <Loading />
            </CardTitle>
        );
    }

    if (error) {
        return (
            <CardTitle className="text-md space-x-2">
                <NotFound />
            </CardTitle>
        );
    }
    return (
        <CardTitle className="text-md space-x-1 uppercase">
            <ShoppingBag className="w-5 h-5 inline align-middle mr-1" />
            <span className="align-middle">Cart <span className="font-normal">({cart_product_count})</span></span>
        </CardTitle>
    );
}

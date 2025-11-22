import { CardTitle } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { formatToCurrency } from "@/lib/formats/formatToCurrency";
import { useShoppingCartContext } from "@/features/cart/hooks";


const MiniCartTotal = () => {
    const { data, loading, error } = useShoppingCartContext();
    const { cart_total_price = 0 } = data

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
        <CardTitle className="text-md font-bold">
            <span>Total:</span> {formatToCurrency(cart_total_price)}
        </CardTitle>
    );
};

export default MiniCartTotal;

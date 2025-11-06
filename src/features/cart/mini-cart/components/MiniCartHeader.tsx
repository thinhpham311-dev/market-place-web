"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";
export default function MiniCartHeader() {
    const router = useRouter();
    const { data } = useShoppingCartContext();
    const { cart_product_count, cart_selected_items } = data;

    console.log("MiniCartHeader cart_selected_items:", cart_selected_items);

    const handleRouterLinkToCart = () => {
        router.push("/cart");
    };
    return (
        <div className="flex justify-between items-center p-0 space-y-0">
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-md uppercase">Cart</span>
            </div>
            {cart_product_count > 0 && (
                <Button className="flex items-center gap-2" variant="link" size="sm" onClick={handleRouterLinkToCart}>
                    <span>View More</span> <ChevronRight />
                </Button>
            )}
        </div>
    );
}

"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";
export default function MiniCartHeader() {
    const router = useRouter();
    const { data } = useShoppingCartContext();
    const { cart_count_product } = data;

    const handleRouterLinkToCart = () => {
        router.push("/cart");
    };
    return (
        <div className="flex justify-between items-center p-0 space-y-0">
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-md uppercase">Cart</span>
            </div>
            {cart_count_product > 0 && (
                <Button className="flex items-center gap-2" variant="link" size="sm" onClick={handleRouterLinkToCart}>
                    <span>View More</span> <ChevronRight />
                </Button>
            )}
        </div>
    );
}

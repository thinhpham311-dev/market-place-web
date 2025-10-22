"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { ChevronRight } from "lucide-react";
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
            <span className="text-lg uppercase">Cart</span>
            {cart_count_product > 0 && (
                <Button variant="link" size="sm" onClick={handleRouterLinkToCart}>
                    View More <ChevronRight />
                </Button>
            )}
        </div>
    );
}

"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { ChevronRight } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MiniCartViewMoreButton() {
    const router = useRouter();
    const { data, loading, error } = useShoppingCartContext();
    const { cart_product_count = 0 } = data;

    if (loading) {
        return (
            <Button
                className="flex items-center gap-2"
                variant="link"
                size="sm"
                disabled
            >
                <Loading />
            </Button>
        );
    }

    if (error) {
        return (
            <Button
                className="flex items-center gap-2"
                variant="link"
                size="sm"
                disabled
            >
                <NotFound />
            </Button>
        );
    }

    const handleRouterLinkToCart = () => {
        router.push("/cart");
    };

    if (cart_product_count > 0) {
        return (
            <Button
                className="flex items-center gap-2"
                variant="ghost"
                size="sm"
                onClick={handleRouterLinkToCart}
            >
                <span>View More</span>
                <ChevronRight />
            </Button>
        );
    }
}

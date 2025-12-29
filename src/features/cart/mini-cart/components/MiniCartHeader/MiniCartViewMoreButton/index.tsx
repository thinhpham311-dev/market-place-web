"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import { ChevronRight } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

export default function MiniCartViewMoreButton() {
  const router = useRouter();
  const { data, loading } = useShoppingCartContext();
  const { cart_items_count = 0 } = data;

  if (loading.actions.showList) {
    return <LoadingSkeleton />;
  }

  const handleRouterLinkToCart = () => {
    router.push("/cart");
  };

  if (cart_items_count > 0) {
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

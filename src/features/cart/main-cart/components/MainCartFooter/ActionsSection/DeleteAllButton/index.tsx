"use client";

import { Button } from "@/components/ui/button";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { Trash } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";

function DeleteAllButton() {
    const { data, loading, error, deleteItemsAll } = useShoppingCartContext()
    const { cart_product_count = 0 } = data;

    if (loading) return <LoadingSkeleton />;
    if (error) return <NotFound />;

    const isDisabled = cart_product_count === 0;

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={deleteItemsAll}
            disabled={isDisabled}>
            <Trash className="w-4 h-4" />
            <span>Delete All</span>
        </Button>
    );
}
export default DeleteAllButton
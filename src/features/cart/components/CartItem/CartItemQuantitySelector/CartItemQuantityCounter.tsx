import { useMemo } from "react";
import { ICartItem } from "@/interfaces/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import QuantitySelector from "@/features/common/quantity-selector";
import { SHOPPING_CART } from "@/features/cart/constants";
import { renderVariants } from "@/features/cart/utils/renderVariants"

import { toast } from "sonner"


interface ICartItemQuantityCounterProps {
    data: ICartItem
}

const CartItemQuantityCounter = ({
    data
}: ICartItemQuantityCounterProps) => {

    const { loading, error, updateQtyItem } = useShoppingCartContext();
    const {
        itemSkuId,
        itemSpuName,
        itemSpuVariations,
        itemQuantity,
        itemSkuStock,
        itemSkuTierIdx
    } = data;

    const handleQuantityChange = (value: number) => {

        updateQtyItem({
            ...data,
            itemQuantity: value,
        });

        setTimeout(() => {
            const id = toast.success("update quantity!", {
                description: <span>The product {itemSpuName} - ({renderVariants(itemSpuVariations, itemSkuTierIdx)} x {value}) has been removed from your cart.</span>,
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss(id);
                    },
                },
            });
        }, 500);
    };

    const isDisabled = useMemo(() => {
        const hasError = !!(typeof error === "string" || error?.message);
        return !!(loading || hasError);
    }, [loading, itemSkuStock, error]);

    return (
        <QuantitySelector
            reducerKey={SHOPPING_CART}
            storeKey={`${SHOPPING_CART}_${itemSkuId}`}
            initialValue={{ currentQuantity: itemQuantity }}
            maxQuantity={itemSkuStock}
            isDisabled={isDisabled}
            onChangeQuantity={handleQuantityChange}
        />
    );
};

export default CartItemQuantityCounter;

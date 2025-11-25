import { useMemo } from "react";
import { ICartItem } from "@/interfaces/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import QuantitySelector from "@/features/common/quantity-selector";
import { SHOPPING_CART } from "@/features/cart/constants";

interface ICartItemQuantityInputProps {
    currentQuantity: number;
    maxQuantity: number;
    data: ICartItem
}

const CartItemQuantityInput = ({
    currentQuantity,
    maxQuantity,
    data
}: ICartItemQuantityInputProps) => {
    const { loading, error, updateQtyItem } = useShoppingCartContext();
    const { itemId } = data
    const handleQuantityChange = (value: number) => {
        updateQtyItem({
            ...data,
            itemQuantity: value
        })
    };

    const isDisable = useMemo(() => {
        const hasError = !!(typeof error === "string" || error?.message);
        return !!(loading || hasError);
    }, [loading, maxQuantity, error]);


    return (
        <QuantitySelector
            reducerKey={SHOPPING_CART}
            storeKey={`${SHOPPING_CART}_${itemId}`}
            initialQuantity={currentQuantity}
            maxQuantity={maxQuantity}
            isDisable={isDisable}
            onChangeQuantity={handleQuantityChange}
        />
    );
};

export default CartItemQuantityInput;

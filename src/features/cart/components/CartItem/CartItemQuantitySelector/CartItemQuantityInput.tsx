import React from "react";
import { ICartItem } from "@/interfaces/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";
import QuantitySelector from "@/features/common/quantity-selector";
import { SHOPPING_CART } from "@/features/cart/constants";

interface ICartItemQuantityInputProps {
    currentQuantity: number;
    maxQuantity?: number;
    data: ICartItem
}

const CartItemQuantityInput = ({
    currentQuantity,
    maxQuantity,
    // data
}: ICartItemQuantityInputProps) => {
    const { updateQtyItem, loading, error } = useShoppingCartContext();
    // const { itemSkuId } = data
    // const handleQuantityChange = (value: number) => {
    //     // Nếu không đổi thì không làm gì để tránh gọi API vô nghĩa
    //     const item = {
    //         ...data,
    //         itemQuantity: value,
    //     }
    //     updateQtyItem(item);
    // };

    return (
        <QuantitySelector
            storeKey={`${SHOPPING_CART}`}
            initialValue={currentQuantity}
            maxQuantity={maxQuantity}
            loading={loading}
            error={error}
        />
    );
};

export default CartItemQuantityInput;

import { ICartItemModel } from "@/models/cart";;
import { useShoppingCartContext } from "@/features/cart/hooks";
import { QuantitySelector } from "@/features/common";
import { SHOPPING_CART } from "@/features/cart/constants";
import ErrorMsg from "./ErrorMsg"
import LoadingSkeleton from "./LoadingSkeleton";

import { toast } from "sonner"


interface ICartItemQuantityCounterProps {
    data: ICartItemModel
}

const CartItemQuantityCounter = ({
    data
}: ICartItemQuantityCounterProps) => {

    const { loading, error, updateQtyItem } = useShoppingCartContext();

    const {
        itemSkuId,
        itemSpuName,
        itemQuantity,
        itemSkuStock,
    } = data;

    const handleQuantityChange = (value: number) => {

        updateQtyItem({
            ...data,
            itemQuantity: value,
        });

        setTimeout(() => {
            const id = toast.success("update quantity!", {
                description: <span className="text-white">The product {itemSpuName} x {value} has been removed from your cart.</span>,
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss(id);
                    },
                },
            });
        }, 500);
    };


    if (error?.byItem[itemSkuId]?.updateQty) {
        return <ErrorMsg message={error?.byItem[itemSkuId]?.updateQty?.message} />;
    }

    if (loading.byItem[itemSkuId]?.updateQty) {
        return <LoadingSkeleton />;
    }

    return (
        <QuantitySelector
            storeKey={`${SHOPPING_CART}_${itemSkuId}`}
            initialValue={{ currentQuantity: itemQuantity }}
            maxQuantity={itemSkuStock}
            onChangeQuantity={handleQuantityChange}
        />
    );
};

export default CartItemQuantityCounter;

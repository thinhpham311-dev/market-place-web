import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useShoppingCartContext } from "../../hooks";
import { ICartItem } from "@/interfaces/cart";

interface ICartItemCheckboxProps {
    data?: ICartItem[];
    checked: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    onCheckedChange?: (checked: boolean) => void;
}

const CartItemCheckbox = ({
    data = [],
    checked,
    disabled = false,
    ariaLabel = "Select item",
    onCheckedChange,
}: ICartItemCheckboxProps) => {
    const { setItemsSelected } = useShoppingCartContext();

    const handleCheckedChange = (isChecked: boolean) => {
        onCheckedChange?.(isChecked);

        if (data.length > 0) {
            if (isChecked) {
                setItemsSelected(data.map((item) => item.itemId) as any);
            } else {
                setItemsSelected([]);
            }
        }
    };

    return (
        <Checkbox
            checked={checked}
            disabled={disabled}
            aria-label={ariaLabel}
            onCheckedChange={(value) => handleCheckedChange(!!value)}
        />
    );
};

export default CartItemCheckbox;

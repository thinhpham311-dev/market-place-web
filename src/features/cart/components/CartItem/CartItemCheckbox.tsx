import React from "react";
import { Checkbox } from "@/components/ui";
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
    const { selectItems } = useShoppingCartContext();

    const handleCheckedChange = (isChecked: boolean) => {
        onCheckedChange?.(isChecked);

        if (data.length > 0) {
            if (isChecked) {
                selectItems(data.map((item) => item.itemSkuId) as any);
            } else {
                selectItems([]);
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

import React from "react";
import { Checkbox } from "@/components/ui";
import { useShoppingCartContext } from "../../hooks";
import { ICartItem } from "@/interfaces/cart";

interface ICartItemCheckboxProps {
    data?: ICartItem[]; // cho phép undefined ở header nếu chưa có
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

        // Nếu có data, ta chọn hoặc bỏ chọn toàn bộ SKU tương ứng
        if (data.length > 0) {
            if (isChecked) {
                // ✅ chọn tất cả items trong data
                selectItems(data.map((item) => item.itemSkuId) as any); // truyền string[]
            } else {
                // ❌ bỏ chọn toàn bộ
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

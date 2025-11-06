import React from 'react';
import { Checkbox } from '@/components/ui';

interface ICartItemCheckboxProps {
    checked: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    onCheckedChange?: (checked: boolean) => void;
}

const CartItemCheckbox = ({
    checked,
    disabled = false,
    ariaLabel = 'Select item',
    onCheckedChange,
}: ICartItemCheckboxProps) => {
    return (
        <Checkbox
            checked={checked}
            disabled={disabled}
            aria-label={ariaLabel}
            onCheckedChange={(value) => onCheckedChange?.(!!value)}
        />
    );
};

export default CartItemCheckbox;

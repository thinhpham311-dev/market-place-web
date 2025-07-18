import { RefObject, useCallback } from "react";

interface IProductItemQuantityRef {
    validateQuantity: () => string[];
}

interface IProductItemOptionsListRef {
    validateOptions: () => string[];
}

export function useValidate(
    quantityRef: RefObject<IProductItemQuantityRef>,
    optionsRef: RefObject<IProductItemOptionsListRef>
) {
    const validateProduct = useCallback((): string[] => {
        const optionErrors = optionsRef.current?.validateOptions?.() || [];
        const quantityErrors = quantityRef.current?.validateQuantity?.() || [];

        return [...optionErrors, ...quantityErrors];
    }, [quantityRef, optionsRef]);

    return { validateProduct };
}

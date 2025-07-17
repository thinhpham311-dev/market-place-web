'use client';

import { useRef, useCallback } from 'react';

// Routers
import { useRouter } from 'next/navigation';

// Store
import { useAppDispatch } from '@/lib/hooks';
import { addItem } from '@/features/cart/store/stateSlice';

//ui
import { Button, Card, CardContent } from '@/components/ui';

// Components


// Types
import { IProduct } from '@/features/product/types';
import { IcartItem } from "@/interfaces/cart"

//format & hooks
import { useToast } from "@/lib/hooks";

// Icons
import { MdAddShoppingCart } from 'react-icons/md';
import { injectReducer } from '@/store';
import reducer from '@/store/product/detail';

interface IPurchaseActionsProps {
    product: IProduct
}


type Option = {
    label: string;
    value: string | Array<Option>
}

interface IProductItemQuantityRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

interface IProductItemOptionsListRef {
    validateOptions: () => void,
    selectedOptions: (Option | null)[]
    validationErrors?: string[]
}

injectReducer("purchaseActions", reducer)

const PurchaseActions = ({ product }: IPurchaseActionsProps) => {
    const dispatch = useAppDispatch();
    const productItemQuantityRef = useRef<IProductItemQuantityRef>(null);
    const productItemOptionListRef = useRef<IProductItemOptionsListRef>(null)

    const { toast } = useToast();
    const router = useRouter();

    const validateProduct = () => {
        const optionErrors = productItemOptionListRef.current?.validateOptions?.() || [];
        const quantityErrors = productItemQuantityRef.current?.validateQuantity?.() || [];

        if (!Array.isArray(optionErrors)) {
            console.error("validateOptions did not return an array");
            return [];
        }

        return [...optionErrors, ...quantityErrors];
    };

    const handleAddToCart = useCallback(() => {
        const selectedOptions = productItemOptionListRef.current?.selectedOptions

        if (!product) {
            return;
        }
        // Validate
        const errors = validateProduct();

        if (errors.length > 0) {
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return;
        }

        const updatedQuantity = productItemQuantityRef.current?.getCurrentQuantity?.() || 0;

        if (updatedQuantity <= 0) {
            toast({
                title: "Error",
                description: "Please select a valid quantity",
                variant: "destructive",
            });
            return;
        }

        const uniqueKey = `${product._id}-${selectedOptions?.map(option => option ? `${option.label}-${option.value}` : "").join("|")}`;

        const cartItem: IcartItem = {
            _id: product._id,
            uniqueKey,
            product_name: product.product_name,
            product_price: product.product_price,
            product_slug: product.product_slug,
            // discountPrice: product.discountPrice,
            quantity: updatedQuantity,
        };

        dispatch(addItem({ cartItem: cartItem, options: selectedOptions || [] }));

        // const totalPrice = updatedQuantity * product.product_price;
        // const discountedTotalPrice = updatedQuantity * product.discountPrice;


        productItemQuantityRef.current?.resetQuantity?.()
    }, [dispatch, product, productItemQuantityRef, productItemOptionListRef]);

    const handleBuyNow = () => {
        const errors = validateProduct();

        if (errors.length > 0) {
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return;
        }

        handleAddToCart();
        router.push("/cart");
    };


    return (
        <Card layout="horizontal" className=' grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5  md:p-5 p-3'>
            <CardContent className='lg:col-span-2 md:col-span-2 col-span-1 md:px-5 px-0'>
                <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="sm"
                    className="w-full md:w-auto uppercase"
                >
                    <MdAddShoppingCart /> Add to cart
                </Button>
                <Button
                    onClick={handleBuyNow}
                    size="sm"
                    className="w-full md:w-auto uppercase"
                >
                    Buy Now
                </Button>
            </CardContent>
        </Card>
    );
}

export default PurchaseActions
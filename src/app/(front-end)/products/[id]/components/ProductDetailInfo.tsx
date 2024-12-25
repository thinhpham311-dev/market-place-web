'use client';

import { useRef, useCallback } from 'react';

// Routers
import { useRouter } from 'next/navigation';
// Store
import { useAppDispatch } from '@/lib/hooks';
import { addItem } from '@/store/cart/stateSlice';

// Components
import { Button } from '@/components/ui/atoms';
import { CardContent, CardTitle, CardDescription, Counter, CounterRef } from '@/components/ui/molecules';
import { ButtonTagsList } from '@/components/ui/organisms';

// Icons
import { MdOutlineStar, MdOutlineStarBorder, MdAddShoppingCart } from 'react-icons/md';

// Types
import { IcartItem } from '@/types/cart';
import { IProduct } from '@/types/product';

//format & hooks
import { formatToCurrency } from "@/lib/formats"
import { useToast } from "@/lib/hooks";

interface IProductDetailInfoProps {
    product: IProduct
}

export default function ProductDetailInfo({ product }: IProductDetailInfoProps) {
    const dispatch = useAppDispatch();
    const counterRef = useRef<CounterRef>(null);
    const { toast } = useToast();
    const router = useRouter();
    const handleAddToCart = useCallback(() => {
        if (!product) {
            return;
        }

        const updatedQuantity = counterRef.current?.getCount() || 0;

        if (updatedQuantity <= 0) {
            return;
        }

        const cartItem: IcartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: updatedQuantity,
        };

        dispatch(addItem(cartItem));
        toast({
            title: `${product.name} added to cart`,
            description: <div className="grid grid-rows-3 grid-flow-col auto-cols-max gap-4 space-y-2 my-3">

                <div className=' row-span-3 space-y-1'>
                    <p className='text-md mb-3'><strong> {product.name}</strong></p>
                    <p className='space-x-2 text-xs'>
                        <span className='line-through'>
                            ${product.price}
                        </span>
                        <span>${product.discountPrice}</span>
                    </p>
                    <p className='text-xs'>Qty:{updatedQuantity}</p>
                </div>
            </div>,
        });
        counterRef.current?.reset();
    }, [dispatch, product]);

    const handleBuyNow = () => {
        if (!product) {
            return;
        }

        const cartItem: IcartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: 1,
        };

        dispatch(addItem(cartItem));
        router.push("/cart");
    };

    return (
        <CardContent className='md:py-6 p-0 space-y-3 lg:col-span-2 md:col-span-2 col-span-1'>
            <CardTitle className="line-clamp-2 leading-8 mb-5">{product.name}</CardTitle>
            <CardDescription className="space-y-5">
                <span className="flex items-center space-x-1">
                    {[...Array(2)].map((_, i) => <MdOutlineStar key={i} size={20} />)}
                    {[...Array(3)].map((_, i) => <MdOutlineStarBorder key={i} size={20} />)}
                </span>
                <div className="space-x-4">
                    <p className="inline-flex items-center gap-x-1 text-md">
                        <span className="font-bold">{formatToCurrency(product.discountPrice)}</span>
                    </p>
                    <p className="inline-flex items-center gap-x-1 line-through text-md">
                        <span>{formatToCurrency(product.price)}</span>
                    </p>
                </div>
                <div>
                    <ButtonTagsList label="Size" data={["Size S", "Size M", "Size L", "Size XL", "Size XXL"]} />
                    <ButtonTagsList label="Color" data={["White", "Black", "Red", "Yellow"]} />
                </div>
                <div>
                    <Counter ref={counterRef} />
                </div>
                <div className='space-x-3 flex items-center'>
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
                </div>
            </CardDescription>
        </CardContent>
    );
}

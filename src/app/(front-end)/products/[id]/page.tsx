'use client';

import { useRef, useMemo, useCallback } from 'react';

// Routers
import { useParams } from 'next/navigation';

// Store
import { useAppDispatch } from '@/lib/hooks';
import { addItem } from '@/store/cart/stateSlice';

// Components
import { Button } from '@/components/ui/atoms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Counter, CounterRef } from '@/components/ui/molecules';
import { GalleryWithThumbnails, ButtonTagsList, CarouselList } from '@/components/ui/organisms';

// Icons
import { MdOutlineStar, MdOutlineStarBorder, MdAddShoppingCart } from 'react-icons/md';
import { ArrowRight, CircleDollarSign } from 'lucide-react';

// Data
import { images, productData } from '@/constants/data';

// Types
import { IcartItem } from '@/types/cart';
import { IProduct } from '@/types/product';

export default function Page() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const counterRef = useRef<CounterRef>(null);

    const { product } = useMemo(() => {
        const product = productData?.find((item: IProduct) => item?.id === id);
        return { product };
    }, [id]);

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

        dispatch(addItem(cartItem))
        counterRef.current?.reset()
    }, [dispatch, product]);


    if (!product) return <div>Product not found</div>;

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <Card layout="horizontal" className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 md:px-6 px-3 space-y-5 my-6 border-none">
                <div className="p-0 space-y-4 lg:col-span-1 md:col-span-2 col-span-1">
                    <GalleryWithThumbnails data={images} />
                </div>
                <div className="md:py-6 p-0 space-y-3 lg:col-span-2 md:col-span-2 col-span-1">
                    <CardContent>
                        <CardTitle className="line-clamp-2 leading-8 mb-5">{product.name}</CardTitle>
                        <CardDescription className="space-y-5">
                            <span className="flex items-center space-x-1">
                                {[...Array(2)].map((_, i) => <MdOutlineStar key={i} size={20} />)}
                                {[...Array(3)].map((_, i) => <MdOutlineStarBorder key={i} size={20} />)}
                            </span>
                            <div className="space-x-4">
                                <p className="inline-flex items-center gap-x-1 text-md">
                                    <CircleDollarSign size={15} /> <span className="font-bold">{product.discountPrice}</span>
                                </p>
                                <p className="inline-flex items-center gap-x-1 line-through text-md">
                                    <CircleDollarSign size={15} /> <span>{product.price}</span>
                                </p>
                            </div>
                            <div>
                                <ButtonTagsList label="Size" data={["Size S", "Size M", "Size L", "Size XL", "Size XXL"]} />
                                <ButtonTagsList label="Color" data={["White", "Black", "Red", "Yellow"]} />
                            </div>
                            <div>
                                <Counter ref={counterRef} />
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                size="sm"
                                className="w-full md:w-auto uppercase"
                            >
                                <MdAddShoppingCart /> Buy Now
                            </Button>
                        </CardDescription>
                    </CardContent>
                </div>
            </Card>

            {/* Product Info Card */}
            <Card className="border-none">
                <CardHeader>
                    <CardTitle>THÔNG TIN SẢN PHẨM</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {/* Product information content */}
                        <p>Tên sản phẩm: [Choice] Bông tẩy trang Lameila XB01 222 miếng cotton pad</p>
                        {/* Additional details here */}
                    </div>
                </CardContent>
            </Card>

            {/* Related Products Card */}
            <Card className="border-0 md:px-6 px-3">
                <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">Relate Products</CardTitle>
                        <CardDescription className="md:line-clamp-2 line-clamp-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id.
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-0">
                    <CarouselList data={productData} className="lg:basis-1/6 md:basis-1/3 basis-1/2" />
                </CardContent>
            </Card>
        </div>
    );
}

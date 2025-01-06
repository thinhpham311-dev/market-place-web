import React from 'react';
import { useRouter } from 'next/navigation';


//components
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/molecules';

//lib
import { formatToCurrency } from "@/lib/formats"

//types
import { IProduct } from '@/types/product';

interface IToastMessage {
    updatedQuantity?: number
    product: IProduct
    totalCurrentPrice?: number
}

export default function ToastMessage({ product, updatedQuantity, totalCurrentPrice = 0 }: IToastMessage) {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product._id}`)
    }

    return (
        <Card className="grid grid-cols-4 gap-3 border-none">
            <CardImage className="col-span-1" src={product.image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={product.name ?? ""} />
            <CardContent className=' col-span-3 space-y-1 p-0'>
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className=" text-lg capitalize cursor-pointer">
                    {product.name}
                </CardTitle>
                <CardDescription className="space-x-2 inline ">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(product.discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(product.price)}</span></p>
                    <span>x</span>
                    <strong className="inline-flex items-center gap-x-1 text-xs ">
                        {updatedQuantity}
                    </strong>
                </CardDescription>
                <CardDescription>
                    <p className='block space-x-0 text-xs'>  Total: {formatToCurrency(totalCurrentPrice)}</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}



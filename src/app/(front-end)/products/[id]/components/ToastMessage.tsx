import { IProduct } from '@/types/product';
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/molecules';
import React from 'react';
import { formatToCurrency } from "@/lib/formats"
import { useRouter } from 'next/navigation';

interface IToastMessage {
    updatedQuantity?: number
    product: IProduct
}

export default function ToastMessage({ product, updatedQuantity }: IToastMessage) {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product._id}`)
    }

    return (
        <Card className="grid grid-cols-3 gap-3">
            <CardImage className="col-span-1" src={product.image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={product.name ?? ""} />
            <CardContent className=' col-span-2 space-y-1 p-0'>
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
            </CardContent>
        </Card>
    );
}



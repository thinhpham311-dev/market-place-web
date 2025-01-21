import React from 'react';
import { useRouter } from 'next/navigation';


//components
import { Badge, Separator } from "@/components/ui/atoms"
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/molecules';

//lib
import { formatToCurrency } from "@/lib/formats"

//types
import { IProduct, IOption } from '@/types/product';

interface IToastMessage {
    updatedQuantity?: number
    product: IProduct
    totalPrice?: number;
    discountedTotalPrice?: number;
    options: (IOption | null)[]
}

export default function ToastMessage({ product, updatedQuantity, totalPrice = 0, discountedTotalPrice = 0, options }: IToastMessage) {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product._id}`)
    }

    return (
        <Card className="grid grid-cols-5 gap-5 border-none shadow-none">
            <div className="col-span-2" >
                <CardImage className='aspect-square ' src={product.image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={product.name ?? ""} />
            </div>
            <CardContent className='flex flex-col col-span-3 gap-2 p-0'>
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className=" text-lg capitalize cursor-pointer">
                    {product.name}
                </CardTitle>
                <CardDescription className="gap-1 flex flex-row">
                    {options?.map((option) =>
                        <Badge variant="outline" key={option?.label.split("").join("-")}>{option?.label}</Badge>
                    )}
                </CardDescription>
                <CardDescription className="space-x-2 inline-flex text-xs">
                    <p className='space-x-1'>
                        <strong>Price:</strong>
                        <span className="inline-flex items-center gap-x-1 ">  {formatToCurrency(product.discountPrice)}</span>
                        <span className="inline-flex items-center gap-x-1 line-through">{formatToCurrency(product.price)}</span>
                    </p>
                    <span>x</span>
                    <p className="inline-flex items-center gap-x-1">  <strong >Qty:</strong>  {updatedQuantity}</p>
                </CardDescription>
                <Separator />
                <CardDescription className='text-xs'>
                    <p className='space-x-1 '>  <strong>Total:</strong> {formatToCurrency(totalPrice)}</p>
                    <p className='space-x-1 '>  <strong>Discounted Total:</strong>{formatToCurrency(discountedTotalPrice)}</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}



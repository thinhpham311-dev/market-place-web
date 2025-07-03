import React from 'react';
import { useRouter } from 'next/navigation';


//components
import { Badge } from "@/components/ui/atoms"
import { Card, CardContent, CardImage, CardTitle, CardDescription } from '@/components/ui/molecules';

//lib
import { formatToCurrency } from "@/lib/formats"

//types
import { IProduct, IOption } from '@/interfaces/product';

interface IToastMessage {
    updatedQuantity?: number
    product: IProduct
    totalCurrentPrice?: number
    options: (IOption | null)[]
}

export default function ToastMessage({ product, updatedQuantity, totalCurrentPrice = 0, options }: IToastMessage) {
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
                <CardDescription className="space-x-2 inline ">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(product.discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(product.price)}</span></p>
                    <span>x</span>
                    <strong className="inline-flex items-center gap-x-1 text-xs ">
                        {updatedQuantity}
                    </strong>
                </CardDescription>
                <CardDescription>
                    <p className='block space-x-0 text-xs'>  <strong>Total:</strong> {formatToCurrency(totalCurrentPrice)}</p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}



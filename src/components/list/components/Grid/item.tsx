import * as React from "react"
import { memo } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
//components
import { CircleDollarSign } from "lucide-react"
import { IProduct } from "@/types/product"

interface IItemProps {
    item: IProduct
}

const Item = ({ item: { name, image, price, discountPrice } }: IItemProps) => {
    return (
        <Card >
            <CardHeader className="p-0">
                <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={200} height={200} className="w-full h-full rounded-t-sm" />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="mb-3 text-md capitalize">{name}</CardTitle>
                <CardDescription className="space-x-3">
                    <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}


export default memo(Item)
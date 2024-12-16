"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/molecules"

//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"


interface IItemProps {
    item: IProduct
}

const CardItem = ({ item: { name, image, price, discountPrice } }: IItemProps) => {
    const router = useRouter()
    return (

        <Card >
            <CardImage onClick={() => router.push("/products/1")} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" className="w-full h-full rounded-t-lg cursor-pointer" />
            <CardContent className="p-3">
                <CardTitle onClick={() => router.push("/products/1")} className="mb-2 text-md capitalize cursor-pointer">{name}</CardTitle>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                </CardDescription>
            </CardContent>

        </Card>
    );
}


export default memo(CardItem)
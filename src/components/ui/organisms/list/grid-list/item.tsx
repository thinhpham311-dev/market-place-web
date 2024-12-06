'use client'
import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Counter } from "@/components/ui/molecules"


//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"

interface IItemProps {
    item: IProduct
}

export const GridListItem = ({ item: { name, image, price, discountPrice } }: IItemProps) => {
    const router = useRouter()
    return (
        <Card >
            <CardHeader className="p-0 cursor-pointer" onClick={() => router.push("/products/1")}>
                <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={200} height={200} className="w-full h-full rounded-t-sm" />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="mb-2 text-md capitalize">{name}</CardTitle>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                </CardDescription>
                <Counter isButtonAdd />
            </CardContent>
        </Card>
    );
}


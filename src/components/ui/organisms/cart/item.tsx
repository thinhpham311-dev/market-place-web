'use client'
import * as React from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules"
import { Checkbox } from "@/components/ui/atoms/checkbox"

//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"

type IItemProps = {
    item: IProduct
};

export const CartListItem = ({ item: { name, image, article, price, discountPrice } }: IItemProps) => {
    const router = useRouter()

    return (
        <Card layout="horizontal" className=" mb-3 last:mb-0 items-center">
            <CardImage src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" className="rounded-md  w-1/2  h-[180px]  cursor-pointer p-3" onClick={() => router.push("/products/1")} />
            <CardContent className="p-3 flex-1 relative">
                <CardTitle className="mb-3 text-lg capitalize">{name}</CardTitle>
                <CardDescription className="mb-3">
                    <p className="md:line-clamp-2 line-clamp-1">{article}</p>
                </CardDescription>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                </CardDescription>
                <Counter />
                <Checkbox id="terms" className="absolute top-5 right-5" />
            </CardContent>
        </Card>
    );
}



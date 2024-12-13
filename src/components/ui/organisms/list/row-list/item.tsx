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
    isCheckBox?: boolean
};

export const RowListItem = ({ item: { name, image, article, price, discountPrice }, isCheckBox }: IItemProps) => {
    const router = useRouter()

    return (
        <Card layout="horizontal" className="relative mb-3 p-3  last:mb-0 items-center grid grid-cols-3 gap-3">
            <CardImage
                onClick={() => router.push("/products/1")}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className=" rounded-l-lg h-full bg-slate-600 cursor-pointer p-0 col-span-1"
            />
            <CardContent className=" p-0  h-full col-span-2 content-center">
                <CardTitle
                    onClick={() => router.push("/products/1")}
                    className="mb-2 text-lg capitalize cursor-pointer">
                    {name}
                </CardTitle>
                <CardDescription className="mb-3">
                    <p className="line-clamp-2">{article}</p>
                </CardDescription>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs">
                        <CircleDollarSign size={10} />
                        <span className="font-bold "> {discountPrice}</span>
                    </p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs">
                        <CircleDollarSign size={10} />
                        <span>{price}</span>
                    </p>
                </CardDescription>
                <Counter />
            </CardContent>
            {
                isCheckBox &&
                <Checkbox id="terms" className="absolute top-5 right-5" />
            }
        </Card>
    );
}



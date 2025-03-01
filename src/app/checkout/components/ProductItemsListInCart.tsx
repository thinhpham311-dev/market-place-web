'use client'

//components
import { ScrollArea } from "@/components/ui/molecules"
import ProductItemInCart from "./ProductItemInCart"

//types
import { IcartItem } from "@/types/cart"


interface IProductItemsListInCartProps {
    data: Array<IcartItem>
}

export default function ProductItemsListInCart({ data }: IProductItemsListInCartProps) {
    return (
        <ScrollArea className="w-full h-full">
            {data?.map((item, index) => {
                if (item.quantity > 0) {
                    return (
                        <ProductItemInCart key={index} item={item} totalItems={data.length} />
                    )
                }
            })}
        </ScrollArea>
    )
}



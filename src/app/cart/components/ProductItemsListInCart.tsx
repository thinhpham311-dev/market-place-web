'use client'

//components
import { ScrollArea } from "@/components/ui"
import ProductCartItem from "./ProductItemInCart"

//types
import { IcartItem } from "@/interfaces/cart"

//hook

interface IProductItemsListInCartProps {
    data: Array<IcartItem>,
    itemsPerPage?: number;
}

export default function ProductItemsListInCart({ data }: IProductItemsListInCartProps) {


    return (
        <div className="space-y-5">

            <ScrollArea className="w-full h-full">
                {data?.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <ProductCartItem key={item.uniqueKey} item={item} totalItems={data.length} />
                        )
                    }
                })}
            </ScrollArea>
        </div>

    )
}



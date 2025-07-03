'use client'

//components

import ProductItemInCart from "./ProductItemInCart"

//types
import { IcartItem } from "@/interfaces/cart"


interface IProductItemsListInCartProps {
    data: Array<IcartItem>
}

export default function ProductItemsListInCart({ data }: IProductItemsListInCartProps) {

    return (
        <>
            {
                data?.map((item) => {
                    if (item.quantity > 0) {
                        return (
                            <ProductItemInCart key={item.uniqueKey} item={item} totalItems={data.length} />
                        )
                    }
                })
            }
        </>
    )
}



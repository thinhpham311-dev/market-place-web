'use client'

//components
import { ScrollArea } from "@/components/ui/molecules"
import ProductCartItem from "./ProductItemInCart"

//types
import { IcartItem } from "@/types/cart"

//hook
import { usePagination, usePaginationRender } from "@/lib/hooks"

interface IProductItemsListInCartProps {
    data: Array<IcartItem>,
    itemsPerPage?: number;
}

export default function ProductItemsListInCart({ data, itemsPerPage = 5 }: IProductItemsListInCartProps) {

    const { currentPage, totalPages, currentData, handlePageChange } = usePagination<IcartItem>({
        data,
        itemsPerPage,
    });

    const pagination = usePaginationRender({
        currentPage,
        totalPages,
        handlePageChange,
    });
    return (
        <div className="space-y-5">
            <ScrollArea className="w-full h-full">
                {currentData?.map((item) => {
                    const uniqueKey = `${item._id}-${item.options?.map(option => `${option?.value}`).join('|').toLocaleLowerCase().trim()}`
                    if (item.quantity > 0) {
                        return (
                            <ProductCartItem key={uniqueKey} item={item} totalItems={data.length} />
                        )
                    } else {
                        return (<p>Products List Not Found</p>)
                    }
                })}
            </ScrollArea>
            <div className="flex items-center justify-center">{pagination}</div>
        </div>

    )
}



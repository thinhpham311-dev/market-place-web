import * as React from "react"

//components
import { RowListItem } from "./item"
import { ScrollArea } from "@/components/ui/molecules/scroll-area"

//types
import { IcartItem } from "@/types/cart";


type IGridListProps = {
    data: Array<IcartItem>
};


export const RowListCounter = ({ data }: IGridListProps) => {
    return (
        <ScrollArea>
            {data?.map((item, index) => {
                if (item.quantity > 0) {
                    return (
                        <RowListItem key={index} item={item} totalItems={data.length} isCounter isCheckBox />
                    )
                }
            })}
        </ScrollArea>
    )
}

export const RowList = ({ data }: IGridListProps) => {
    return (
        <ScrollArea>
            {data?.map((item, index) => {
                if (item.quantity > 0) {
                    return (
                        <RowListItem key={index} item={item} totalItems={data.length} />
                    )
                }
            })}
        </ScrollArea>
    )
}


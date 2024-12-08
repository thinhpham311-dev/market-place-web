import * as React from "react"

//components
import { RowListItem } from "./item"
import { ScrollArea } from "@/components/ui/molecules/scroll-area"

//types
import { IProduct } from "@/types/product"


type IGridListProps = {
    data: Array<IProduct>
};


export const RowList = ({ data }: IGridListProps) => {
    return (
        <ScrollArea>
            {data?.map((item, index) => (
                <RowListItem key={index} item={item} isCheckBox />
            ))}
        </ScrollArea>
    )
}


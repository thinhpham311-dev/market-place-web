import * as React from "react"

//components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/molecules/card"
import { RowListItem } from "./item"
import { ScrollArea } from "@/components/ui/molecules/scroll-area"

//types
import { IProduct } from "@/types/product"


type IGridListProps = {
    title?: string,
    data: Array<IProduct>
};


export const RowList = ({ title, data }: IGridListProps) => {
    return (
        <Card layout="vertical" >
            <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                <CardTitle className="mb-3 capitalize text-center mx-auto">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-96">
                    {data?.map((item, index) => (
                        <RowListItem key={index} item={item} isCheckBox />
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}


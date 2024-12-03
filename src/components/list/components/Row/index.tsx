import * as React from "react"

//components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import RowListItem from "./item"
import { ScrollArea } from "@/components/ui/scroll-area"

//types
import { IProduct } from "@/types/product"


interface IGridListProps {
    title?: string,
    data: Array<IProduct>
}


const RowList = ({ title, data }: IGridListProps) => {
    return (
        <Card >
            <CardHeader>
                <CardTitle className="capitalize">{title} (20)</CardTitle>
            </CardHeader>
            <CardContent className="px-3">
                <ScrollArea className="h-96 ">
                    {data?.map((item, index) => (
                        <RowListItem key={index} item={item} />
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default RowList
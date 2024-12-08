import * as React from "react"

//components
import { GridListItem } from "./item"
import { Button } from "@/components/ui/atoms"

//types
import { IProduct } from "@/types/product"

interface IGridListProps {
    data: Array<IProduct>
}

export const GridList = ({ data }: IGridListProps) => {

    return (
        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3  w-full">
            {data?.map((item, index) => (
                <GridListItem key={index} item={item} />
            ))}
            <div className="lg:col-span-6 md:col-span-3 col-span-2 my-10">
                <Button variant="outline" className="block mx-auto text-xs">See More...</Button>
            </div>
        </div>
    );
}


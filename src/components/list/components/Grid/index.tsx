import * as React from "react"

//components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import GridListItem from "./item"

//types
import { IProduct } from "@/types/product"

interface IGridListProps {
    title?: string,
    data: Array<IProduct>
}

const GridList = ({ title, data }: IGridListProps) => {

    return (
        <div className="md:px-12 px-6">
            <Card className="border-0">
                <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
                    <CardTitle className="mb-3 capitalize text-center mx-auto">{title}</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3  w-full">
                        {data?.map((item, index) => (
                            <GridListItem key={index} item={item} />
                        ))}
                        <div className="lg:col-span-6 md:col-span-3 col-span-2 my-10">
                            <Button variant="outline" className="block mx-auto text-xs">See More...</Button>
                        </div>
                    </div>
                </CardContent>
            </Card >
        </div>
    );
}


export default GridList
import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import List from "./list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const ScrollAreaList = () => {
    return (
        <Card className="md:col-span-4 col-span-6">
            <CardHeader>
                <CardTitle className="capitalize">Product list</CardTitle>
                <CardDescription>There are currently (20) products in the cart</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-96 ">
                    <List />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default ScrollAreaList
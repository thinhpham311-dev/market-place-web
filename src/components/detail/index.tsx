import * as React from "react"

//components
// import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

import { CarouselWithThumbnails } from "./components"


const Detail = () => {
    return (
        <Card >
            <CardHeader>
                <CarouselWithThumbnails />
            </CardHeader>
            <CardContent>
                abc
            </CardContent>
        </Card>
    )
}

export default Detail

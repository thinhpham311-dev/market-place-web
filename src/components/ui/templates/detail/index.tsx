import * as React from "react"

//components
import { SliderWithThumbnails } from "@/components/ui/organisms"
import {
    Card,
    CardContent,
    CardDescription
} from "@/components/ui/molecules/card"



const Detail = () => {
    return (
        <Card layout="horizontal" className="border-none p-3">

            <SliderWithThumbnails />

            <CardContent>
                <CardDescription>
                    <p>80</p>
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Detail

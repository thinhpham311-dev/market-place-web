import * as React from "react"
import { memo } from "react"
import Image from "next/image"
//components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const Item = () => {
    return (
        <Card className="flex flex-row mb-3 last:mb-0 ">
            <CardHeader className=" md:w-1/5 w-1/3 p-2">
                <Image src="https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg" alt="" width={500} height={500} className="w-full h-full rounded-md" />
            </CardHeader>
            <CardContent className="p-5 flex-1">
                <CardTitle className="mb-3 text-lg capitalize">Product 1</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</CardDescription>
            </CardContent>
        </Card>
    );
}


export default memo(Item)
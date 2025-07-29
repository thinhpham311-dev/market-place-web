"use client"

import * as React from "react"

import { Card, CardContent, Skeleton } from "@/components/ui"


const Loading = () => {

    return (
        <Card className="flex flex-col justify-start h-full w-full col-span-1">
            <Skeleton className="aspect-square rounded-t-lg " />
            <CardContent className="p-3 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
        </Card>
    )
}

export default Loading

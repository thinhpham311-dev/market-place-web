"use client"

import * as React from "react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/molecules"
import { Label } from "@/components/ui/atoms"
import { cn } from "@/lib/utils"

interface IButtonOptionsListProps {
    label?: string,
    data: Array<string>,
    className?: HTMLDivElement | string
}

export const ButtonTagsList = ({ label, data, className }: IButtonOptionsListProps) => {

    const handleToggleItem = (item: string) => {
        console.log(item)
    }

    return (
        <div className={cn("font-semibold leading-none tracking-tight mb-5", className)}>
            <Label className="block mb-3 font-bold" htmlFor="terms">{label}:</Label>
            <ToggleGroup type="single" className="justify-start flex-wrap">
                {data.map((item) => (
                    <ToggleGroupItem
                        variant="outline"
                        key={item?.split("").join("-")}
                        value={item?.split("").join("-")}
                        onClick={() => handleToggleItem(item)}
                        className="capitalize"
                        size="sm"
                    >
                        {item}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

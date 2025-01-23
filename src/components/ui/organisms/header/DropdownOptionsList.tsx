"use client"

import * as React from "react"

import { Button } from "@/components/ui/atoms"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/molecules"

interface IDropdownOptionsListProps {
    btnTitle?: string;
    children: React.ReactNode
}

export default function DropdownOptionsList({ btnTitle, children }: IDropdownOptionsListProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link"><span className="text-xs">{btnTitle}</span></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-4 p-3 mx-2">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

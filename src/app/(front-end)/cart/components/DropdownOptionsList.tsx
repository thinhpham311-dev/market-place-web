"use client"

import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/molecules"
import { ChevronDown } from "lucide-react"

interface IDropdownOptionsListProps {
    btnTitle?: string | React.ReactNode;
    children: React.ReactNode
}

export default function DropdownOptionsList({ btnTitle, children }: IDropdownOptionsListProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="inline-flex items-center border justify-between p-1 rounded-lg">
                    <div className="flex flex-1 flex-wrap items-center gap-1 cursor-pointer rounded-lg">
                        {btnTitle}
                    </div>

                    <ChevronDown size={15} />

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-4 p-3 mx-2">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

"use client"
import * as React from "react"
import { useRouter } from "next/navigation"

//components
import { Button } from "@/components/ui/atoms"
import { TooltipWrapper } from "@/components/ui/molecules"

//icons
import { Search } from "lucide-react"

export const ButtonSearch = () => {
    const router = useRouter()
    return (
        <TooltipWrapper content="Search Button">
            <Button onClick={() => router.push("/search")} enterKeyHint="search" variant="outline" type="submit" size="icon"><Search className="h-[2rem] w-[2rem]" /></Button>
        </TooltipWrapper>
    )
}

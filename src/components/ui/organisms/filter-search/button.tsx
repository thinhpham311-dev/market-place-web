import * as React from "react"

//components
import { Button } from "@/components/ui/atoms"
import { TooltipWrapper } from "@/components/ui/molecules"

//icons
import { Search } from "lucide-react"

export const ButtonSearch = () => {
    return (
        <TooltipWrapper content="Search Button">
            <Button enterKeyHint="search" variant="outline" type="submit" size="icon"><Search className="h-[2rem] w-[2rem]" /></Button>
        </TooltipWrapper>
    )
}

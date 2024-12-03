import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactHTML } from "react"

interface ITooltipElementProps {
    children: React.ReactNode, content?: string
}

const TooltipElement = ({ children, content }: ITooltipElementProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default TooltipElement
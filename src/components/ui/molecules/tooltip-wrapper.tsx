import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/atoms/tooltip"

interface ITooltipWrapperProps {
    children: React.ReactNode, content?: string
}

export const TooltipWrapper = ({ children, content }: ITooltipWrapperProps) => {
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


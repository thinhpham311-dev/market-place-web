import * as React from "react";
import { useRouter } from "next/navigation"

//ui
import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
    Button
} from "@/components/ui/button";

//types
import { IOrder } from "@/interfaces/order";

//icons
import { MoreHorizontal, Copy, Receipt } from "lucide-react";

// Assuming IOrder is your data type
interface IDropDownMenuOfItemProps {
    order: IOrder;  // Type the table prop correctly
}

export default function DropDownMenuOfItem({ order }: IDropDownMenuOfItemProps) {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/user/purchase/orders/${order._id}`)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(order._id)}
                >
                    <Copy /> <span> Copy payment ID</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleRouterLinkToDetail}><Receipt /><span>View order detail</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui";
import MiniCartTrigger from "./components/MiniCartTrigger";
import MiniCartHeader from "./components/MiniCartHeader";
import MiniCartContent from "./components/MiniCartContent";
import MiniCartFooter from "./components/MiniCartFooter";

export default function MiniCart() {

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MiniCartTrigger />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[400px] p-3 space-y-3">
                <DropdownMenuLabel className="p-0">
                    <MiniCartHeader />
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mt-0" />
                <DropdownMenuGroup>
                    <MiniCartContent />
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="mt-0" />
                <DropdownMenuGroup>
                    <MiniCartFooter />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

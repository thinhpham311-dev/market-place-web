"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui";
import MiniCartTrigger from "./components/MiniCartTrigger";
import MiniCartHeader from "./components/MiniCartHeader";
import MiniCartContent from "./components/MiniCartContent";

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

                <MiniCartContent />

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

"use client";

import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import CartListView from "@/features/cart/components/CartListView";

export default function MiniCartContent() {
    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
                <CartListView />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
        </>
    );
}

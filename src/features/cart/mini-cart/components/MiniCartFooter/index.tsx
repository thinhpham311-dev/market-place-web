import React from "react";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import MiniCartTotal from "./MiniCartTotal";
import MiniCartCheckoutButton from "./MiniCartCheckoutButton";

const MiniCartFooter = () => {

    return (
        <DropdownMenuGroup className="flex justify-between items-center p-0">
            <MiniCartTotal />
            <MiniCartCheckoutButton />
        </DropdownMenuGroup>
    );
};

export default MiniCartFooter;

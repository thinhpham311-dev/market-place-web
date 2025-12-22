import * as React from "react";

//ui
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Button
} from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

//icons
import { ChevronDown } from "lucide-react";

//types
import { IOrderModel } from "@/models/order";

// Assuming IOrder is your data type
interface ToolbarProps {
    table: Table<IOrderModel>;  // Type the table prop correctly
}

export default function Toolbar({ table }: ToolbarProps) {
    return (
        <div className="flex items-center py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

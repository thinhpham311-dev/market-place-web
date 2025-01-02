import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/atoms";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/molecules";
import { Table } from "@tanstack/react-table";
import { IOrder } from "@/types/order";

// Assuming IOrder is your data type
interface ToolbarProps {
    table: Table<IOrder>;  // Type the table prop correctly
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

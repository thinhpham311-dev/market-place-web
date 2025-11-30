import * as React from "react";

//ui
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

//types
import { IOrder } from "@/interfaces/order";

//icons
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ToolbarProps {
    table: Table<IOrder>;
}

export default function Pagination({ table }: ToolbarProps) {
    return (
        <>
            {
                table.getPageCount() > 0 &&
                <div className="flex items-center justify-between space-x-2 py-4 w-full">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeft />
                        </Button>
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <Button
                                key={i}
                                variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
                                size="icon"
                                onClick={() => table.setPageIndex(i)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            }
        </>
    );
}

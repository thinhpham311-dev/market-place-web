import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { IOrderModel } from "@/models/order";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  table: Table<IOrderModel>;
}

export default function Pagination({ table }: PaginationProps) {
  return (
    <>
      {table.getPageCount() > 0 && (
        <div className="flex w-full items-center justify-between space-x-2 py-4">
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
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <Button
                key={index}
                variant={table.getState().pagination.pageIndex === index ? "default" : "outline"}
                size="icon"
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
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
      )}
    </>
  );
}

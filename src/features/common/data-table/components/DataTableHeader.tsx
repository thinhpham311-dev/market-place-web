"use client";

import { flexRender } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { useDataTableContext } from "@/features/common/data-table/hooks";

const CartTableHeader = () => {
  const { table } = useDataTableContext();
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="bg-transparent">
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} className="font-semibold text-gray-700 py-3">
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default CartTableHeader;

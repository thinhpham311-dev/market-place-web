"use client"

import { flexRender } from "@tanstack/react-table"
import { TableHeader, TableRow, TableHead } from "@/components/ui"
import { useCartDataTableContext } from "./hooks"

const CartTableHeader = () => {
    const { getHeaderGroups } = useCartDataTableContext()
    return (
        <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50">
                    {headerGroup.headers.map((header) => (
                        <TableHead
                            key={header.id}
                            className="font-semibold text-gray-700 py-3"
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    )
}

export default CartTableHeader

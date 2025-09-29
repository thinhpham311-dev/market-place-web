"use client"

import { flexRender, Row } from "@tanstack/react-table"
import { TableBody, TableRow, TableCell, Button, Checkbox } from "@/components/ui"
import { ChevronDown } from "lucide-react"
import { useCartDataTableContext } from "./hooks"

const CartTableBody = () => {
    const { getRowModel, getAllColumns } = useCartDataTableContext()
    return (
        <TableBody>
            {getRowModel().rows?.length ? (
                getRowModel().rows.map((row: Row<any>) => {
                    const subRows = row.subRows || []
                    const selectedCount = subRows.filter((r) => r.getIsSelected()).length
                    const isAllSelected = subRows.length > 0 && selectedCount === subRows.length
                    const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length
                    if (row.getIsGrouped()) {
                        return (
                            <TableRow key={row.id} className="bg-gray-100 font-medium cursor-pointer">
                                <TableCell>
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={() => {
                                            const newValue = !(isAllSelected || isSomeSelected)
                                            subRows.forEach((r) => r.toggleSelected(newValue))
                                        }} />
                                </TableCell>
                                <TableCell colSpan={row.getVisibleCells().length} className="p-0">
                                    <div className="flex items-center gap-2">
                                        <Button className="p-0" variant="link" onClick={() => row.toggleExpanded()}>
                                            <ChevronDown
                                                className={`transition-transform ${row.getIsExpanded() ? "rotate-90" : ""}`}
                                                size={16}
                                            />
                                            <span className="font-bold">{row.getValue(row.groupingColumnId!)}</span>{" "}
                                            ({row.subRows.length})
                                        </Button>
                                        <Button variant="link">View More</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }

                    return (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    )
                })
            ) : (
                <TableRow>
                    <TableCell colSpan={getAllColumns().length} className="h-24 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

export default CartTableBody

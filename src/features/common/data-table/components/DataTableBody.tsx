"use client"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, useMemo } from "react"
import { flexRender } from "@tanstack/react-table"
import { TableBody, TableRow, TableCell, Button, Checkbox } from "@/components/ui"
import { ChevronDown, ChevronRight, MessagesSquare, Tickets } from "lucide-react"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { formatToCurrency } from "@/lib/formats"

const CartTableBody = () => {
    const router = useRouter()
    const { table } = useDataTableContext()

    // ⚡ mounted guard để tránh warning
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    // ⚡ cache row model sau khi mounted
    const rows = useMemo(() => {
        if (!mounted) return []
        return table.getRowModel().rows
    }, [mounted, table])

    return (
        <TableBody>
            {mounted && rows.length ? (
                rows.map(row => {
                    const subRows = row.subRows || []
                    const selectedCount = subRows.filter(r => r.getIsSelected()).length
                    const isAllSelected = subRows.length > 0 && selectedCount === subRows.length
                    const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length

                    if (row.getIsGrouped()) {
                        return (
                            <React.Fragment key={row.id}>
                                {/* Group Row */}
                                <TableRow className="font-medium cursor-pointer">
                                    <TableCell>
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={() => {
                                                const newValue = !(isAllSelected || isSomeSelected)
                                                subRows.forEach(r => r.toggleSelected(newValue))
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell colSpan={row.getVisibleCells().length - 4} className="px-3 py-0">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={e => { e.stopPropagation(); row.toggleExpanded() }}
                                            >
                                                <span className="font-bold">{row.original.itemShopName}</span>
                                                <ChevronDown className={`transition-transform ${row.getIsExpanded() ? "rotate-90" : ""}`} size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <MessagesSquare />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-3 py-0 text-center">
                                        <strong>Qty:</strong><span>  ({subRows.length} item)</span>
                                    </TableCell>
                                    <TableCell className="px-3 py-0 text-center">
                                        <strong>Total:</strong><span> {formatToCurrency(row.subRows.reduce((sum, r) => sum + (Number(r.original.itemSkuPrice || 0) * Number(r.original.itemQuantity || 0)), 0))}</span>
                                    </TableCell>
                                    <TableCell className="px-3 py-0">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" onClick={() => router.push(`/shop/${row.original.itemShopSlug}-s.${row.original.itemShopId}`)}>
                                                <span>View More</span>
                                                <ChevronRight />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* Render subRows khi expanded */}
                                {row.getIsExpanded() && (
                                    <>
                                        {subRows.map(subRow => (
                                            <TableRow key={subRow.id} data-state={subRow.getIsSelected() ? "selected" : undefined}>
                                                {subRow.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                        {/* Voucher row */}
                                        <TableRow>
                                            <TableCell colSpan={row.getVisibleCells().length} className="py-0 bg-black text-white">
                                                <div className="text-md flex items-center justify-between gap-2">


                                                    <strong className="inline-flex items-center space-x-3"> <Tickets /><span>Voucher Code:</span></strong>
                                                    <Button variant="ghost" size="sm">
                                                        <span>View More</span>
                                                        <ChevronRight />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </React.Fragment>
                        )
                    }

                    // Normal row
                    return (
                        <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    )
                })
            ) : (
                <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="h-52 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

export default CartTableBody
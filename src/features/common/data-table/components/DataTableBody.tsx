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
    const { table, cart_total_items } = useDataTableContext()

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    /** Cached rows */
    const rows = useMemo(() => {
        if (!mounted) return []
        return table.getRowModel().rows
    }, [mounted, table, cart_total_items])

    const totalColumns = table.getAllColumns().length

    return (
        <TableBody>
            {mounted && rows.length > 0 ? (
                rows.map(row => {
                    const subRows = row.subRows ?? []

                    const selectedCount = subRows.filter(r => r.getIsSelected()).length
                    const isAllSelected = selectedCount === subRows.length && subRows.length > 0
                    const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length

                    // GROUP ROW
                    if (row.getIsGrouped()) {
                        const groupTotal = subRows.reduce(
                            (sum, r) =>
                                sum +
                                Number(r.original.itemSkuPrice || 0) *
                                Number(r.original.itemQuantity || 0),
                            0
                        )

                        return (
                            <React.Fragment key={row.id}>
                                {/* GROUP HEADER */}

                                <TableRow className="font-medium cursor-pointer mb-3">
                                    {/* Checkbox */}
                                    <TableCell>
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={() => {
                                                const newValue = !(isAllSelected || isSomeSelected)
                                                subRows.forEach(r => r.toggleSelected(newValue))
                                            }}
                                        />
                                    </TableCell>

                                    {/* Group Title */}
                                    <TableCell colSpan={row.getVisibleCells().length - 4} className="px-3 py-0">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    row.toggleExpanded()
                                                }}
                                            >
                                                <span className="font-bold">{row.original.itemShopName}</span>
                                                <ChevronDown
                                                    className={`transition-transform ${row.getIsExpanded() ? "rotate-90" : ""
                                                        }`}
                                                    size={16}
                                                />
                                            </Button>

                                            <Button variant="ghost" size="icon">
                                                <MessagesSquare />
                                            </Button>
                                        </div>
                                    </TableCell>

                                    {/* Item Count */}
                                    <TableCell className="px-3 py-0 text-center">
                                        ({subRows.length} item)
                                    </TableCell>

                                    {/* Total Price */}
                                    <TableCell className="px-3 py-0 text-center">
                                        <strong>{formatToCurrency(groupTotal)}</strong>
                                    </TableCell>

                                    {/* View More */}
                                    <TableCell className="px-3 py-0">
                                        <div className="flex items-center justify-end">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    router.push(
                                                        `/shop/${row.original.itemShopSlug}-s.${row.original.itemShopId}`
                                                    )
                                                }
                                            >
                                                View More
                                                <ChevronRight />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>

                                {/* SUB ROWS */}
                                {row.getIsExpanded() && (
                                    <>
                                        {subRows.map(subRow => (
                                            <TableRow
                                                key={subRow.id}
                                                data-state={subRow.getIsSelected() ? "selected" : undefined}
                                            >
                                                {subRow.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}

                                        {/* VOUCHER ROW */}
                                        <TableRow >
                                            <TableCell colSpan={totalColumns} className="py-1">
                                                <div className="flex items-center justify-between text-md">
                                                    <strong className="inline-flex items-center gap-2">
                                                        <Tickets />
                                                        Voucher Code:
                                                    </strong>

                                                    <Button variant="ghost" size="sm">
                                                        View More
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

                    // Non-group rows are not rendered (handled inside group)
                    return null
                })
            ) : (
                <TableRow>
                    <TableCell colSpan={totalColumns} className="h-52 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

export default CartTableBody

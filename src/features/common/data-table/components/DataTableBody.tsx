"use client"

import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { flexRender } from "@tanstack/react-table"
import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"


import { Truck, ChevronRight, MessagesSquare, Tickets } from "lucide-react"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { formatToCurrency } from "@/lib/formats"

// ------------------- Sub-components -------------------

const GroupHeaderRow = ({ row, subRows, router }: any) => {
    const selectedCount = subRows.filter((r: any) => r.getIsSelected()).length
    const isAllSelected = selectedCount === subRows.length && subRows.length > 0
    const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length

    const groupTotal = subRows.reduce(
        (sum: number, r: any) => sum + Number(r.original.itemSkuPrice || 0) * Number(r.original.itemQuantity || 0),
        0
    )

    return (
        <TableRow className="font-medium cursor-pointer">

            <TableCell colSpan={row.getVisibleCells().length - 3} className="py-2">
                <div className="flex items-center gap-2">
                    <Label htmlFor={`group-${row.id}`}
                        className="font-semibold text-sm whitespace-nowrap inline-flex items-center space-x-4"
                    >
                        <Checkbox
                            checked={isAllSelected}
                            id={`group-${row.id}`}
                            onCheckedChange={() => {
                                const newValue = !(isAllSelected || isSomeSelected)
                                subRows.forEach((r: any) => r.toggleSelected(newValue))
                            }}
                        />
                        <span className="font-bold cursor-pointer">{row.original.itemShopName}</span>
                    </Label>
                    <Button variant="ghost" size="icon">
                        <MessagesSquare />
                    </Button>
                </div>
            </TableCell>

            <TableCell className="px-3 py-2 text-center">({subRows.length} item)</TableCell>
            <TableCell className="px-3 py-2 text-center">
                <strong>{formatToCurrency(groupTotal)}</strong>
            </TableCell>

            <TableCell className="px-3 py-2">
                <div className="flex items-center justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                            router.push(`/shop/${row.original.itemShopSlug}-s.${row.original.itemShopId}`)
                        }
                    >
                        View More
                        <ChevronRight />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

const SubRow = ({ subRow }: any) => (
    <TableRow data-state={subRow.getIsSelected() ? "selected" : undefined}>
        {subRow.getVisibleCells().map((cell: any) => (
            <TableCell className="py-2" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
        ))}
    </TableRow>
)

const InfoRow = ({ icon: Icon, label, description, totalColumns }: any) => (
    <TableRow>
        <TableCell colSpan={totalColumns} className="py-2 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <strong className="inline-flex items-center gap-4">
                        <Icon />
                        <span className="text-md">{label}</span>
                    </strong>
                    <span>{description}</span>
                </div>
                <Button variant="ghost" size="sm">
                    View More
                    <ChevronRight />
                </Button>
            </div>
        </TableCell>
    </TableRow>
)


const CartTableBody = () => {
    const router = useRouter()
    const { table } = useDataTableContext()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const rows = mounted ? table.getRowModel().rows : []
    const totalColumns = table.getAllColumns().length

    if (!mounted || rows.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={totalColumns} className="h-52 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    }

    return (
        <TableBody>
            {rows.map(row => {
                if (!row.getIsGrouped()) return null
                const subRows = row.subRows ?? []

                return (
                    <React.Fragment key={row.id}>
                        <GroupHeaderRow row={row} subRows={subRows} totalColumns={totalColumns} router={router} />
                        {subRows.map(subRow => <SubRow key={subRow.id} subRow={subRow} />)}

                        <InfoRow icon={Tickets} label="Voucher:" description="Voucher giảm đến 40k₫" totalColumns={totalColumns} />
                        <InfoRow icon={Truck} label="Shipping:" description="Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫" totalColumns={totalColumns} />
                    </React.Fragment>
                )
            })}
        </TableBody>
    )
}

export default CartTableBody

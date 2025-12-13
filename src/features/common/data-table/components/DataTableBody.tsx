"use client"

import { useRouter } from "next/navigation"
import React, { useMemo } from "react"
import { flexRender } from "@tanstack/react-table"
import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import type { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ICartItem } from "@/interfaces/cart"

import { Truck, ChevronRight, Tickets, MessagesSquare } from "lucide-react"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { formatToCurrency } from "@/lib/formats"

// ------------------- Sub-components -------------------
interface IGroupHeaderRowProps {
    row: Row<ICartItem>
    subRows: Row<ICartItem>[]
}

const GroupHeaderRow = React.forwardRef<
    HTMLTableRowElement,
    IGroupHeaderRowProps
>(({ row, subRows }, ref) => {
    const router = useRouter()

    const selectedCount = subRows.filter(r => r.getIsSelected()).length
    const isAllSelected = selectedCount === subRows.length && subRows.length > 0
    const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length

    const groupTotal = useMemo(
        () =>
            subRows.reduce(
                (sum, r) =>
                    sum +
                    Number(r.original.itemSkuPrice || 0) *
                    Number(r.original.itemQuantity || 0),
                0
            ),
        [subRows]
    )

    return (
        <TableRow ref={ref} className="font-medium cursor-pointer">

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
})

GroupHeaderRow.displayName = "GroupHeaderRow"

interface ISubRowProps {
    subRow: Row<ICartItem>
}

const SubRow = React.forwardRef<
    HTMLTableRowElement,
    ISubRowProps
>(({ subRow }, ref) => (
    <TableRow
        ref={ref}
        data-state={subRow.getIsSelected() ? "selected" : undefined}
    >
        {subRow.getVisibleCells().map((cell) => (
            <TableCell className="py-2" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
        ))}
    </TableRow>
))

SubRow.displayName = "SubRow"


interface IInfoRowProps {
    icon: React.ReactNode
    label: string,
    description: string,
    totalColumns: number
}

const InfoRow = React.forwardRef<
    HTMLTableRowElement,
    IInfoRowProps
>(({ icon, label, description, totalColumns }, ref) => {
    return (
        <TableRow ref={ref}>
            <TableCell colSpan={totalColumns} className="py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <strong className="inline-flex items-center gap-4">
                            {icon}
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
})

InfoRow.displayName = "InfoRow"



const CartTableBody = () => {
    const { table } = useDataTableContext()


    const rows = table.getRowModel().rows
    const totalColumns = table.getAllColumns().length

    if (rows.length === 0) {
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
                        <GroupHeaderRow row={row} subRows={subRows} />
                        {subRows.map(subRow => <SubRow key={subRow.id} subRow={subRow} />)}

                        <InfoRow icon={<Tickets />} label="Voucher:" description="Voucher giảm đến 40k₫" totalColumns={totalColumns} />
                        <InfoRow icon={<Truck />} label="Shipping:" description="Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫" totalColumns={totalColumns} />
                    </React.Fragment>
                )
            })}
        </TableBody>
    )
}

export default CartTableBody

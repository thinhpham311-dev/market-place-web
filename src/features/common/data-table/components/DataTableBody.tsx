"use client"
import { useRouter } from "next/navigation"
import { flexRender, Row } from "@tanstack/react-table"
import { TableBody, TableRow, TableCell, Button, Checkbox } from "@/components/ui"
import { ChevronDown, ChevronRight, MessagesSquare } from "lucide-react"
import { useDataTableContext } from "@/features/common/data-table/hooks"

const CartTableBody = () => {
    const router = useRouter()
    const { getRowModel, getAllColumns } = useDataTableContext()

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
                            <TableRow key={row.id} className=" font-medium cursor-pointer space-x-3">
                                <TableCell>
                                    <Checkbox
                                        checked={isAllSelected}
                                        onCheckedChange={() => {
                                            const newValue = !(isAllSelected || isSomeSelected)
                                            subRows.forEach((r) => r.toggleSelected(newValue))
                                        }} />
                                </TableCell>
                                <TableCell colSpan={row.getVisibleCells().length} className="px-3">
                                    <div className="flex items-center gap-2">
                                        <Button className="p-0" variant="link" onClick={(e) => {
                                            e.stopPropagation()
                                            row.toggleExpanded()
                                        }}>
                                            <ChevronDown
                                                className={`transition-transform ${row.getIsExpanded() ? "rotate-90" : ""}`}
                                                size={16}
                                            />
                                            <span className="font-bold">{row.original.itemShopName}</span>
                                            ({row.subRows.length})
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <MessagesSquare />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => router.push(`/shop/${row.original.itemShopSlug}-s.${row.original.itemShopId}`)}>
                                            <span>View More</span>
                                            <ChevronRight />

                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    }

                    return (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
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
                    <TableCell colSpan={getAllColumns().length} className="h-52 text-center">
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody >
    )
}

export default CartTableBody

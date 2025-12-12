"use client"

import { TableFooter, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { formatToCurrency } from "@/lib/formats"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { useShoppingCartContext } from "@/features/cart/hooks"
import { Trash } from "lucide-react"
import { toast } from "sonner"

const CartTableFooter = () => {
    const { deleteItemsSelected } = useShoppingCartContext()

    const {
        items_selected,
        total_items,
        total_items_selected,
        total_price_items_selected,
        table
    } = useDataTableContext()

    const handleDeleteSelectedItems = () => {
        if (items_selected.length > 0) {
            deleteItemsSelected(items_selected)
            const id = toast.success("Deleted All Product out cart!", {
                description: (
                    <p>
                        All product has been added to your cart.
                    </p>
                ),
                action: {
                    label: "Close",
                    onClick: () => toast.dismiss(id),
                },
            });
            table.toggleAllRowsSelected(false)
        }
    }

    return (
        <TableFooter className="sticky bottom-0 bg-white border-t border-gray-200">
            <TableRow>
                <TableCell colSpan={table.getAllLeafColumns().length - 4} >
                    <Label
                        htmlFor="selected-all"
                        className="font-semibold text-sm whitespace-nowrap inline-flex items-center space-x-4"
                    >
                        <Checkbox
                            id="selected-all"
                            disabled={total_items === 0}
                            checked={table.getIsAllRowsSelected()}
                            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                        />
                        <span>Selected All ({items_selected.length}/{total_items})</span>
                    </Label>
                </TableCell>
                <TableCell >
                    <div className="text-center text-sm font-medium min-w-[150px]">
                        ({items_selected.length} item)
                    </div>
                </TableCell>
                <TableCell >
                    <div className="text-center text-sm font-semibold min-w-[150px]">
                        {formatToCurrency(total_price_items_selected)}
                    </div>
                </TableCell>
                <TableCell >
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={total_price_items_selected === 0}
                            onClick={handleDeleteSelectedItems}
                            className="gap-2"
                        >
                            <Trash className="w-4 h-4" /> Delete ({total_items_selected}) Item
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter >
    )
}

export default CartTableFooter

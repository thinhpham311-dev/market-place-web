"use client"

import { Button, Checkbox, Label, TableFooter, TableRow, TableCell } from "@/components/ui"
import { formatToCurrency } from "@/lib/formats"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { useShoppingCartContext } from "@/features/cart/hooks"
import { Trash } from "lucide-react"

const CartTableFooter = () => {
    const { removeSelectedItems } = useShoppingCartContext()

    const {
        cart_selected_items,
        cart_total_items,
        cart_selected_items_total,
        getIsAllRowsSelected,
        toggleAllRowsSelected,
        getAllLeafColumns,
    } = useDataTableContext()

    const handleDeleteSelectedItems = () => {
        if (cart_selected_items.length > 0) {
            removeSelectedItems(cart_selected_items)
            toggleAllRowsSelected(false)
        }
    }

    return (
        <TableFooter className="sticky bottom-0 bg-white border-t border-gray-200">
            <TableRow>
                <TableCell colSpan={getAllLeafColumns().length - 4} >
                    <Label
                        htmlFor="pro_selected"
                        className="font-semibold text-sm whitespace-nowrap flex items-center gap-2"
                    >
                        <Checkbox
                            id="pro_selected"
                            disabled={cart_total_items === 0}
                            checked={getIsAllRowsSelected()}
                            onCheckedChange={(value) => toggleAllRowsSelected(!!value)}
                        />
                        <span>Selected All ({cart_selected_items.length}/{cart_total_items})</span>
                    </Label>
                </TableCell>
                <TableCell>
                    <div className="text-center text-sm font-medium min-w-[150px]">
                        ({cart_selected_items.length} item)
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-center text-sm font-semibold min-w-[150px]">
                        Total: {formatToCurrency(cart_selected_items_total)}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-end text-sm font-semibold min-w-[150px]">
                        {/* Actions */}
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={cart_total_items === 0}
                            onClick={handleDeleteSelectedItems}
                            className="gap-2"
                        >
                            <Trash className="w-4 h-4" /> Delete All
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter >
    )
}

export default CartTableFooter

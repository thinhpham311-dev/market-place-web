"use client"

import { Button, Checkbox, Label, TableFooter, TableRow, TableCell } from "@/components/ui"
import { formatToCurrency } from "@/lib/formats"
import { useDataTableContext } from "@/features/common/data-table/hooks"
import { useShoppingCartContext } from "@/features/cart/hooks"

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
        <TableFooter className="sticky bottom-0 bg-white">
            <TableRow>
                <TableCell>
                    <Checkbox
                        id="pro_selected"
                        disabled={cart_total_items === 0}
                        checked={getIsAllRowsSelected()}
                        onCheckedChange={(value) => toggleAllRowsSelected(!!value)}
                    />
                </TableCell>
                <TableCell colSpan={getAllLeafColumns().length} className="p-0">
                    <div className="flex items-center justify-between p-4 bg-transparent rounded-lg">
                        {/* Left */}
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="pro_selected" className="font-bold">
                                Selected All ({cart_selected_items.length}/{cart_total_items})
                            </Label>
                        </div>

                        {/* Middle */}
                        <div className="flex-1">
                            <Button variant="link" disabled={cart_total_items === 0} onClick={handleDeleteSelectedItems}>
                                Delete
                            </Button>
                        </div>

                        {/* Right */}
                        <div className="flex items-center space-x-5">
                            {/* <span className="text-sm text-gray-600">
                                Đã chọn {selectedItems.length} sản phẩm
                            </span> */}
                            <span className="text-md font-semibold">
                                Total: {formatToCurrency(cart_selected_items_total)} ({cart_selected_items.length} item)
                            </span>

                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

export default CartTableFooter

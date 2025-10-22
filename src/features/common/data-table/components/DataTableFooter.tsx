"use client"

import { Button, Checkbox, Label, TableFooter, TableRow, TableCell } from "@/components/ui"
import { formatToCurrency } from "@/lib/formats"
import { useDataTableContext } from "@/features/common/data-table/hooks"


const CartTableFooter = () => {
    const {
        cart_selected_items,
        cart_total_items,
        cart_total_selected_amount,
        getIsAllRowsSelected,
        toggleAllRowsSelected,
        getAllLeafColumns,
        removeSelectedItems
    } = useDataTableContext()


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
                            <Button variant="link" disabled={cart_total_items === 0} onClick={() => removeSelectedItems(cart_selected_items)}>
                                Delete
                            </Button>
                        </div>

                        {/* Right */}
                        <div className="flex items-center space-x-5">
                            {/* <span className="text-sm text-gray-600">
                                Đã chọn {selectedItems.length} sản phẩm
                            </span> */}
                            <span className="text-md font-semibold">
                                Total: {formatToCurrency(cart_total_selected_amount)} ({cart_selected_items.length} item)
                            </span>
                            <Button size="lg" disabled={cart_total_items === 0}>Checkout</Button>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

export default CartTableFooter

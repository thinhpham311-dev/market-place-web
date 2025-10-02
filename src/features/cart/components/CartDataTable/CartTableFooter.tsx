"use client"

import { Button, Checkbox, Label, TableFooter, TableRow, TableCell } from "@/components/ui"
import { formatToCurrency } from "@/lib/formats"
import { useCartDataTableContext } from "./hooks"


const CartTableFooter = () => {
    const {
        selectedItems,
        totalItems,
        totalSelectedAmount,
        getIsAllRowsSelected,
        toggleAllRowsSelected,
        getAllLeafColumns,
        removeSelectedItems
    } = useCartDataTableContext()

    return (
        <TableFooter className="sticky bottom-0 bg-white">
            <TableRow>
                <TableCell>
                    <Checkbox
                        id="pro_selected"
                        disabled={totalItems === 0}
                        checked={getIsAllRowsSelected()}
                        onCheckedChange={(value) => toggleAllRowsSelected(!!value)}
                    />
                </TableCell>
                <TableCell colSpan={getAllLeafColumns().length} className="p-0">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border-t">
                        {/* Left */}
                        <div className="flex items-center space-x-4">
                            <Label htmlFor="pro_selected" className="font-bold">
                                Selected All ({selectedItems.length}/{totalItems})
                            </Label>
                        </div>

                        {/* Middle */}
                        <div className="flex-1">
                            <Button variant="link" disabled={totalItems === 0} onClick={() => removeSelectedItems(selectedItems)}>
                                Delete
                            </Button>
                        </div>

                        {/* Right */}
                        <div className="flex items-center space-x-5">
                            <span className="text-sm text-gray-600">
                                Đã chọn {selectedItems.length} sản phẩm
                            </span>
                            <span className="text-md font-semibold">
                                Tổng thanh toán: {formatToCurrency(totalSelectedAmount)}
                            </span>
                            <Button size="lg" disabled={totalItems === 0}>Checkout</Button>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

export default CartTableFooter

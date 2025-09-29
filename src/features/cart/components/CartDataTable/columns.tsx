
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui"
import { ICartItem } from "@/interfaces/cart"
import CartItemPrice from "../CartItem/CartItemPrice"
import CartItemName from "../CartItem/CartItemName"
import CartItemImage from "../CartItem/CartItemImage"
import CartItemVariantsSelector from "../CartItem/CartItemVariantsSelector"
import CartItemActions from "../CartItem/CartItemActions"
import CartItemQuantitySelector from "../CartItem/CartItemQuantitySelector"

export const columns: ColumnDef<ICartItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox checked={table.getIsAllRowsSelected()} onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} aria-label="Select all products" />
        ),
        cell: ({ row }) => {
            if (row.getIsGrouped()) {
                const subRows = row.subRows || []
                const selectedCount = subRows.filter((r) => r.getIsSelected()).length
                const isAllSelected = subRows.length > 0 && selectedCount === subRows.length
                const isSomeSelected = selectedCount > 0 && selectedCount < subRows.length
                return (
                    <Checkbox checked={isAllSelected} onCheckedChange={() => {
                        const newValue = !(isAllSelected || isSomeSelected)
                        subRows.forEach((r) => r.toggleSelected(newValue))
                    }} aria-label="Select all products in shop" />)
            }
            return (
                <Checkbox checked={
                    row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select product" />
            )
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
    },
    {
        accessorKey: "itemImage",
        header: "Image",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemImage
                    src={item.itemImage}
                    className="w-16 h-16 border rounded-md"
                    _w={64}
                    _h={64}
                    alt={row.getValue("itemName")}
                />
            )
        },
        size: 64,
    },
    {
        accessorKey: "itemName",
        header: "Name",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return <CartItemName itemName={item.itemName} />
        },
        size: 400,
    },
    {
        accessorKey: "itemVariations",
        header: "Variants",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemVariantsSelector
                    itemVariants={item.itemVariations}
                    itemTierIdx={item.itemTierIdx}
                />
            )
        },
    },
    {
        accessorKey: "itemPrice",
        header: "Price",
        cell: ({ row }) => {
            const itemPrice = parseFloat(row.getValue("itemPrice"))
            return (
                <div className="text-right">
                    <CartItemPrice itemPrice={itemPrice} />
                </div>
            )
        },
        size: 120,
    },
    {
        accessorKey: "quantity",
        header: () => <p className="text-center">Quantity</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="flex justify-center">
                    <CartItemQuantitySelector
                        currentQuantity={item.quantity}
                        maxQuantity={item.itemStock}
                    />
                </div>
            )
        },
        size: 120,
    },
    {
        id: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return <CartItemPrice itemPrice={item.itemPrice * item.quantity} />
        },
        size: 150,
    },
    {
        accessorKey: "itemId",
        header: () => <p className="text-right">Features</p>,
        cell: ({ row }) => <CartItemActions itemId={row.getValue("itemId")} />,
        size: 150,
    },
    {
        accessorKey: "itemShopId",
        cell: () => null,
        enableGrouping: true,
        enableHiding: true,
    }

]

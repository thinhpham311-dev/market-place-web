
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui"
import { ICartItem } from "@/interfaces/cart"
import CartItemPrice from "../../components/CartItem/CartItemPrice"
import CartItemName from "../../components/CartItem/CartItemName"
import CartItemImage from "../../components/CartItem/CartItemImage"
import CartItemVariantsSelector from "../../components/CartItem/CartItemVariantsSelector"
import CartItemActions from "../../components/CartItem/CartItemActions"
import CartItemQuantitySelector from "../../components/CartItem/CartItemQuantitySelector"

export const initialColumns: ColumnDef<ICartItem>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                disabled={table.getPreFilteredRowModel().rows.length === 0}
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)} aria-label="Select all products" />
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
        accessorKey: "itemSpuImage",
        header: "Image",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemImage
                    src={item.itemSpuImage}
                    className="w-16 h-16 border rounded-md"
                    _w={64}
                    _h={64}
                    alt={item.itemSpuName}
                />
            )
        },
        size: 64,
    },
    {
        accessorKey: "itemSpuName",
        header: "Name",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return <CartItemName itemName={item.itemSpuName} />
        },
        size: 400,
    },
    {
        accessorKey: "itemSpuVariations",
        header: "Variants",
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemVariantsSelector
                    itemVariants={item.itemSpuVariations}
                    itemTierIdx={item.itemSkuTierIdx}
                />
            )
        },
    },
    {
        accessorKey: "itemSkuPrice",
        header: "Price",
        cell: ({ row }) => {
            const itemSkuPrice = parseFloat(row.getValue("itemSkuPrice"))
            return (
                <div className="text-right">
                    <CartItemPrice itemPrice={itemSkuPrice} />
                </div>
            )
        },
        size: 120,
    },
    {
        accessorKey: "itemQuantity",
        header: () => <p className="text-center">Quantity</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="flex justify-center">
                    <CartItemQuantitySelector
                        currentQuantity={item.itemQuantity}
                        maxQuantity={item.itemSkuStock}
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
            return <CartItemPrice itemPrice={item.itemSkuPrice * item.itemQuantity} />
        },
        size: 150,
    },
    {
        accessorKey: "itemSkuId",
        header: () => <p className="text-right">Features</p>,
        cell: ({ row }) => <CartItemActions itemId={row.getValue("itemSkuId")} />,
        size: 150,
    },
    {
        accessorKey: "itemShopId",
        cell: () => null,
        enableGrouping: true,
        enableHiding: true,
    }

]

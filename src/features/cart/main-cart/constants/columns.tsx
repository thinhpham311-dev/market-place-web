"use client";
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { ICartItem } from "@/interfaces/cart"
import { Button } from "@/components/ui/button"
import CartItemCheckbox from "@/features/cart/components/CartItem/CartItemCheckbox"
import CartItemPrice from "@/features/cart/components/CartItem/CartItemPrice"
import CartItemName from "@/features/cart/components/CartItem/CartItemName"
import CartItemImage from "@/features/cart/components/CartItem/CartItemImage"
import CartItemRemove from "@/features/cart/components/CartItem/CartItemActions/CartItemRemove"
import { CartItemVariantsDrawer } from "@/features/cart/components/CartItem/CartItemVariantsSelector"
import { CartItemQuantityCounter } from "@/features/cart/components/CartItem/CartItemQuantitySelector"


export const initialColumns: ColumnDef<ICartItem>[] = [
    {
        id: "select",
        header: ({ table }) => {
            const items = table.getSelectedRowModel().rows.map((r) => r.original as ICartItem)
            return (
                <CartItemCheckbox
                    data={items}
                    checked={table.getIsAllRowsSelected()}
                    ariaLabel="Select all products"
                    onCheckedChange={(val) => table.toggleAllRowsSelected(val)}
                />)
        },
        cell: ({ row }) => {
            const item = row.original as ICartItem; // 👈 dữ liệu dòng hiện tại
            return (
                <CartItemCheckbox
                    data={[item]}
                    checked={row.getIsSelected()}
                    ariaLabel="Select all products"
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                />

            )
        },
        enableSorting: false,
        enableHiding: false,
        size: 50,
    },
    {
        accessorKey: "itemSpuImage",
        header: () => <p className="text-left">Image</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div >
                    <CartItemImage
                        src={item.itemSpuImage}
                        className="w-16 h-16 border rounded-md"
                        _w={64}
                        _h={64}
                        alt={item.itemSpuName}
                    />
                </div>
            )
        },
        size: 64,
    },
    {
        accessorKey: "itemSpuName",
        header: () => <p className="text-left ">Name</p>,
        cell: ({ row }) => {
            const router = useRouter()
            const handleRouterLinkToDetail = () => {
                router.push(`/products/${item.itemSpuSlug}-i.${item.itemShopId}.${item.itemSpuId}`)
            }
            const item = row.original as ICartItem
            return <Button variant="link" onClick={handleRouterLinkToDetail} className="cursor-pointer px-0">
                <CartItemName itemName={item.itemSpuName} />
            </Button>
        },
        size: 150,
    },
    {
        accessorKey: "itemSpuVariations",
        header: () => <p className="text-left px-2.5">Variants</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemVariantsDrawer data={item} />
            )
        },
        size: 120,
    },
    {
        accessorKey: "itemSkuPrice",
        header: () => <p className="text-center ">Unit</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="flex justify-center">
                    <CartItemPrice itemPrice={item.itemSkuPrice} />
                </div>
            )
        },
        size: 100,
    },
    {
        accessorKey: "itemQuantity",
        header: () => <p className="text-center">Quantity</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="flex justify-center">
                    <CartItemQuantityCounter
                        data={item}
                    />
                </div>
            )
        },
        size: 150,
    },
    {
        id: "totalPrice",
        header: () => <p className="text-center ">Total</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return <div className="flex justify-center">
                <CartItemPrice itemPrice={item.itemTotalPrice} />
            </div>
        },
        size: 120,
    },
    {
        accessorKey: "actions",
        header: () => <p className="text-right  px-3">Features</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="float-end">
                    <CartItemRemove
                        data={item} />
                </div>
            )
        },
        size: 120,
    },
    {
        accessorKey: "itemShopId",
        cell: () => {
            return <p>shop Id</p>
        },
        enableGrouping: true,
        enableHiding: true,
    }
]

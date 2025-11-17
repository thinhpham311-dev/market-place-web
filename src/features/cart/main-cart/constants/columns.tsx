import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { ICartItem } from "@/interfaces/cart"
import { Button } from "@/components/ui"
import CartItemCheckbox from "../../components/CartItem/CartItemCheckbox"
import CartItemPrice from "../../components/CartItem/CartItemPrice"
import CartItemName from "../../components/CartItem/CartItemName"
import CartItemImage from "../../components/CartItem/CartItemImage"
import CartItemVariantsSelector from "../../components/CartItem/CartItemVariantsSelector"
import CartItemActions from "../../components/CartItem/CartItemActions"
import CartItemQuantitySelector from "../../components/CartItem/CartItemQuantitySelector"


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
        header: () => <p className="text-left w-[64px]">Image</p>,
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
        header: () => <p className="text-left w-[200px]">Name</p>,
        cell: ({ row }) => {
            const router = useRouter()
            const handleRouterLinkToDetail = () => {
                router.push(`/products/${item.itemSpuSlug}-i.${item.itemShopId}.${item.itemSpuId}`)
            }
            const item = row.original as ICartItem
            return <Button variant="link" onClick={handleRouterLinkToDetail} className="cursor-pointer">
                <CartItemName itemName={item.itemSpuName} />
            </Button>
        },
        size: 200,


    },
    {
        accessorKey: "itemSpuVariations",
        header: () => <p className="text-left w-[120px]">Variants</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <CartItemVariantsSelector
                    itemVariants={item.itemSpuVariations}
                    itemTierIdx={item.itemSkuTierIdx}
                />
            )
        },
        size: 120,


    },
    {
        accessorKey: "itemSkuPrice",
        header: () => <p className="text-left w-[120px]">Price</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div className="text-right">
                    <CartItemPrice itemPrice={item.itemSkuPrice} />
                </div>
            )
        },
        size: 120,


    },
    {
        accessorKey: "itemQuantity",
        header: () => <p className="text-center w-[150px]">Quantity</p>,
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
        size: 150,


    },
    {
        id: "totalPrice",
        header: () => <p className="text-center w-[150px]">Total Price</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return <div className="flex justify-center">
                <CartItemPrice itemPrice={item.itemSkuPrice * item.itemQuantity} />
            </div>
        },
        size: 150,


    },
    {
        accessorKey: "actions",
        header: () => <p className="text-right w-[150px]">Features</p>,
        cell: ({ row }) => {
            const item = row.original as ICartItem
            return (
                <div onClick={() => row.toggleExpanded(true)}>
                    <CartItemActions itemSkuId={item.itemSkuId} itemShopId={item.itemShopId} />
                </div>
            )
        },
        size: 150,


    },
    {
        accessorKey: "itemShopId",
        cell: () => {
            return <p>shop Id</p>
        },
        enableGrouping: true,
        enableHiding: false,

    }

]

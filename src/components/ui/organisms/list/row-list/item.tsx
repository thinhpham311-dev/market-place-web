'use client'
import { useCallback } from "react"
import { useRouter } from "next/navigation"

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { toggleItemSelection, updateItemQuantity } from "@/store/cart/stateSlice"

//components
import { Card, CardContent, CardDescription, CardImage, CardTitle, Counter } from "@/components/ui/molecules"
import { Checkbox } from "@/components/ui/atoms/checkbox"

//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"

type IItemProps = {
    item: IProduct
    isCheckBox?: boolean,
    totalItems?: number
};

export const RowListItem = ({ item: { name, image, article, price, discountPrice, id, quantity }, isCheckBox, totalItems }: IItemProps) => {
    const dispatch = useAppDispatch()
    const { selectedItems } = useAppSelector((state) => state.cart.state); // Giả sử bạn có root state
    const router = useRouter()

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${id}`)
    }

    const handleCheckboxChange = (id: string, checked: boolean) => {
        dispatch(toggleItemSelection({ id, checked }))
    };

    const handleQuantityChange = useCallback((newQuantity: number) => {
        if (newQuantity >= 0) {
            dispatch(updateItemQuantity({ id, quantity: newQuantity }));
        }
    }, [dispatch]);

    return (
        <Card layout="horizontal" className="relative mb-3  last:mb-0 items-center grid grid-cols-3 gap-3">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className=" rounded-l-lg h-full bg-slate-600 cursor-pointer p-0 col-span-1"
            />
            <CardContent className=" p-0  h-full col-span-2 content-center">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className="mb-2 text-lg capitalize cursor-pointer">
                    {name}
                </CardTitle>
                {article && <CardDescription className="mb-3">
                    <p className="line-clamp-1">{article}</p>
                </CardDescription>
                }
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs">
                        <CircleDollarSign size={10} />
                        <span className="font-bold "> {discountPrice}</span>
                    </p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs">
                        <CircleDollarSign size={10} />
                        <span>{price}</span>
                    </p>
                </CardDescription>
                <Counter value={quantity} onQuantityChange={handleQuantityChange} />
            </CardContent>
            {
                totalItems && totalItems > 1 && isCheckBox &&
                <Checkbox
                    id={id}
                    checked={selectedItems.includes(id)}
                    className="absolute top-3 right-3"
                    onCheckedChange={(checked) => handleCheckboxChange(id, Boolean(checked))}
                />
            }
        </Card>
    );
}


